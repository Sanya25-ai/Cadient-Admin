import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

// Helper function to authenticate with the legacy system
async function authenticateWithLegacySystem(): Promise<string> {
  const LEGACY_BASE_URL = 'http://localhost:8080/atao';
  const LEGACY_CREDENTIALS = {
    username: 'TESTUSER',
    password: 'TestPass@1'
  };

  try {
    // First, get the login page to obtain the CSRF token and initial session cookie
    const loginPageResponse = await fetch(`${LEGACY_BASE_URL}/index.jsp?seq=login&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
      },
      credentials: 'include'
    });

    if (!loginPageResponse.ok) {
      throw new Error(`Failed to get login page: ${loginPageResponse.status} ${loginPageResponse.statusText}`);
    }

    // Get the session cookie from the response
    const cookies = loginPageResponse.headers.get('set-cookie');
    if (!cookies) {
      throw new Error('No session cookie received from login page');
    }

    // Extract CSRF token from the response HTML
    const html = await loginPageResponse.text();
    const csrfTokenMatch = html.match(/name="CSRF_TOKEN" value="([^"]+)"/);
    if (!csrfTokenMatch) {
      throw new Error('Could not find CSRF token in login page');
    }
    const csrfToken = csrfTokenMatch[1];

    // Now perform the login
    const formData = new URLSearchParams();
    formData.append('seq', 'login');
    formData.append('applicationName', 'ConsolidatedJAFTestClientdsiRAT');
    formData.append('locale', 'en_US');
    formData.append('username', LEGACY_CREDENTIALS.username);
    formData.append('password', LEGACY_CREDENTIALS.password);
    formData.append('CSRF_TOKEN', csrfToken);
    formData.append('event', 'com.deploy.application.hmc.plugin.HMCLogin.userLogin');

    const loginResponse = await fetch(`${LEGACY_BASE_URL}/index.jsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Origin': LEGACY_BASE_URL,
        'Connection': 'keep-alive',
        'Referer': `${LEGACY_BASE_URL}/index.jsp?seq=login&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US`,
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Cookie': cookies
      },
      body: formData.toString(),
      credentials: 'include',
      redirect: 'manual' // Don't automatically follow redirects
    });

    // Check if we got a redirect to the home page (success) or back to login (failure)
    const location = loginResponse.headers.get('location');
    if (!location || location.includes('seq=login')) {
      throw new Error('Login failed - redirected back to login page');
    }

    // Get the new session cookie from the response
    const newCookies = loginResponse.headers.get('set-cookie');
    if (!newCookies) {
      throw new Error('No session cookie received after login');
    }

    return newCookies;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    // First authenticate to get the session cookie
    const sessionCookie = await authenticateWithLegacySystem();
    const LEGACY_BASE_URL = 'http://localhost:8080/atao';

    // Now fetch the passed assessment applications (directly from the grid results endpoint)
    const legacyResponse = await fetch(`${LEGACY_BASE_URL}/index.jsp?seq=applicantGridResults&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US&reportType=PreScreenedPassed&exclusive=Exclusive.exclusive&hmcBidStatus=JobBidStatusesForHMC.Prescreened&event=com.deploy.application.hmc.plugin.ApplicantGrid.search`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Cookie': sessionCookie,
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1'
      },
      redirect: 'manual' // Don't automatically follow redirects
    });

    // Check if we got redirected to login
    if (legacyResponse.status === 302) {
      const location = legacyResponse.headers.get('location');
      if (location?.includes('seq=login')) {
        return NextResponse.json(
          { error: 'Session expired, please try again' }, 
          { status: 401 }
        );
      }
    }

    if (!legacyResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch applications: ${legacyResponse.status} ${legacyResponse.statusText}` }, 
        { status: legacyResponse.status }
      );
    }

    const html = await legacyResponse.text();
    
    // Parse the HTML to extract application data
    const root = parse(html);
    
    // Find the table containing application data
    // The grid is in a table with id="data-table"
    const table = root.querySelector('table#data-table');
    if (!table) {
      console.log('Could not find applications table in HTML response - likely no data available');
      // Instead of returning an error, return an empty array
      return NextResponse.json([]);
    }

    // Get table headers first to understand the column structure
    const headers = table.querySelectorAll('thead th');
    const headerTexts = headers.map(th => th.text.trim());
    
    // Extract rows from the table
    const rows = table.querySelectorAll('tbody > tr');
    
    if (rows.length === 0) {
      return NextResponse.json([]);
    }
    
    // Map each row to an Application object
    const applications = rows.map((row, index) => {
      const cells = row.querySelectorAll('td');
      
      // Extract data from cells based on header positions
      // Skip the first two cells (checkbox and empty cell)
      
      // For the name cell, extract just the name (usually first line or before the first colon)
      const nameCell = cells[2];
      let name = 'N/A';
      
      if (nameCell) {
        // Try to find an anchor tag which usually contains just the name
        const anchor = nameCell.querySelector('a');
        if (anchor) {
          name = anchor.text.trim();
        } else {
          // If no anchor, take the first line or text before details
          const fullText = nameCell.text.trim();
          // Extract just the name - either first line or text before details
          const nameMatch = fullText.match(/^([^:\n]+)(?:$|[\n:])/);
          name = nameMatch ? nameMatch[1].trim() : fullText.split('\n')[0].trim();
        }
      }
      
      const appliedDate = cells[3]?.text?.trim() || '';
      const position = cells[4]?.text?.trim() || 'Not specified';
      const location = cells[5]?.text?.trim() || 'N/A';
      const wotcStatus = cells[6]?.text?.trim() || '';
      const former = cells[7]?.text?.trim() || '';
      const rehire = cells[8]?.text?.trim() || '';
      const score = cells[9]?.text?.trim() || '0';
      const scorePercent = cells[10]?.text?.trim() || '0%';
      
      // Extract ID from the checkbox input
      const idInput = cells[0]?.querySelector('input[type="checkbox"]');
      const id = idInput?.attributes.id || `legacy-${index + 1}`;

      // Calculate smartScore from percentage (remove % sign and convert to number)
      const smartScore = parseInt(scorePercent.replace('%', ''), 10);

      // Transform the data to match our Application interface
      return {
        id,
        name,
        position,
        status: 'Pre-screened',
        appliedDate,
        location,
        smartScore: isNaN(smartScore) ? 0 : smartScore,
        availability: 'Full-time', // Default value
        hiringManager: '', // Not available in legacy system
        phone: '', // Not available in legacy system
        email: '', // Not available in legacy system
        ssn: '', // Not available in legacy system
        source: '',
        assessmentStatus: 'Passed',
        assessmentScore: parseInt(score, 10) || 0,
        assessmentDate: '',
        assessmentNotes: '',
        wotcStatus,
        former,
        rehire
      };
    });

    // Forward any session cookies
    const apiResponse = NextResponse.json(applications);
    const setCookie = legacyResponse.headers.get('set-cookie');
    if (setCookie) {
      apiResponse.headers.set('set-cookie', setCookie);
    }
    
    return apiResponse;
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' }, 
      { status: 500 }
    );
  }
}

export function HEAD() {
  return NextResponse.json({}, { status: 200 });
}
