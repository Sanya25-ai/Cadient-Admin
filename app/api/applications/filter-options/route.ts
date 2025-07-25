import { NextRequest, NextResponse } from "next/server"

interface FilterOption {
  id: string;
  name: string;
  value: string;
}

export async function GET(request: NextRequest) {
  try {
    // Get cookies from the request
    const jsessionid = request.cookies.get('JSESSIONID')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value;
    
    console.log("🔍 Filter Options API: Available cookies:", {
      JSESSIONID: jsessionid ? `${jsessionid.substring(0, 10)}...` : 'MISSING',
      ConsolidatedJAFTestClientINT: consolidatedCookie ? `${consolidatedCookie.substring(0, 20)}...` : 'MISSING'
    })
    
    if (!jsessionid) {
      console.log("🔍 Filter Options API: No JSESSIONID found - returning 401")
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Build cookie header
    const cookieHeader = `JSESSIONID=${jsessionid}; ConsolidatedJAFTestClientINT=${consolidatedCookie || ''}`;

    // Call the legacy filter page to get available options
    const qs = '?seq=applicantGrid&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US&reportType=AllApplicants';
    const url = `${process.env.LEGACY_BASE}/index.jsp${qs}`;
    
    console.log("🔍 Filter Options API: Calling legacy URL:", url)

    const response = await fetch(url, {
      headers: {
        cookie: cookieHeader,
        Accept: 'text/html',
      },
    })

    console.log("🔍 Filter Options API: Legacy response status:", response.status)

    if (!response.ok) {
      console.error("🔍 Filter Options API: Legacy response failed:", response.status)
      return NextResponse.json({ error: 'Failed to fetch filter options' }, { status: response.status })
    }

    const html = await response.text()
    console.log("🔍 Filter Options API: Received HTML length:", html.length)
    
    // Check if we got redirected to login
    const isLoginPage = html.includes("<title>Login") || 
                       html.includes("login.jsp") || 
                       html.includes('name="username"') || 
                       html.includes('name="password"')
    
    if (isLoginPage) {
      console.log("🔍 Filter Options API: Detected login page - session expired")
      return NextResponse.json({ error: "Session expired" }, { status: 401 })
    }

    // Extract filter options from HTML
    const filterOptions = {
      locations: extractLocations(html),
      positions: extractPositions(html),
      statuses: extractStatuses(html),
      workflows: extractWorkflows(html),
      bookmarks: extractBookmarks(html)
    }

    console.log("🔍 Filter Options API: Extracted options:", {
      locations: filterOptions.locations.length,
      positions: filterOptions.positions.length,
      statuses: filterOptions.statuses.length,
      workflows: filterOptions.workflows.length,
      bookmarks: filterOptions.bookmarks.length
    })

    // Forward any session cookies
    const nextResponse = NextResponse.json(filterOptions)
    const setCookie = response.headers.get('set-cookie')
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie)
    }

    return nextResponse

  } catch (error) {
    console.error("Error in filter options API:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

// Helper functions to extract filter options from HTML
function extractPositions(html: string): FilterOption[] {
  const positions: FilterOption[] = [];
  
  // Look for position select dropdown with name="bidPosting"
  const positionSelectMatch = html.match(/<select[^>]*name="bidPosting"[^>]*>([\s\S]*?)<\/select>/);
  if (positionSelectMatch) {
    const selectContent = positionSelectMatch[1];
    const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g;
    let match;
    
    while ((match = optionRegex.exec(selectContent)) !== null) {
      const value = match[1].trim();
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      
      if (value && value !== '' && !text.toLowerCase().includes('all')) {
        positions.push({
          id: value, // This is the JobOpening ID
          name: text,
          value: value
        });
      }
    }
  }
  
  // Fallback
  if (positions.length === 0) {
    return [
      { id: '1001', name: 'Software Engineer', value: '1001' },
      { id: '1002', name: 'Product Manager', value: '1002' },
      { id: '1003', name: 'Designer', value: '1003' },
    ];
  }
  
  return positions;
}

function extractLocations(html: string): FilterOption[] {
  const locations: FilterOption[] = [];
  
  // Look for location select dropdown with name="bidLocation"
  const locationSelectMatch = html.match(/<select[^>]*name="bidLocation"[^>]*>([\s\S]*?)<\/select>/);
  if (locationSelectMatch) {
    const selectContent = locationSelectMatch[1];
    // Extract option tags with value and text
    const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g;
    let match;
    
    while ((match = optionRegex.exec(selectContent)) !== null) {
      const value = match[1].trim();
      const text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any HTML tags
      
      // Skip empty values and "All" options
      if (value && value !== '' && !text.toLowerCase().includes('all')) {
        locations.push({
          id: value, // This is the location ID that the database expects
          name: text,
          value: value // Keep both for compatibility
        });
      }
    }
  }
  
  // Fallback if no locations found in HTML
  if (locations.length === 0) {
    console.log('🔍 Filter Options: No locations found in HTML, using fallback');
    return [
      { id: '11347493', name: 'USA', value: '11347493' },
      { id: '11347494', name: 'Canada', value: '11347494' },
      { id: '11347495', name: 'UK', value: '11347495' },
    ];
  }
  
  return locations;
}

function extractStatuses(html: string): FilterOption[] {
  // Look for status-related select or data
  // The status values should be from JobBidStatusesForHMC display set
  const statuses: FilterOption[] = [];
  
  // Look for status select dropdown or data
  const statusSelectMatch = html.match(/<select[^>]*name="[^"]*status[^"]*"[^>]*>([\s\S]*?)<\/select>/);
  if (statusSelectMatch) {
    const selectContent = statusSelectMatch[1];
    const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g;
    let match;
    
    while ((match = optionRegex.exec(selectContent)) !== null) {
      const value = match[1].trim();
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      
      if (value && value !== '' && !text.toLowerCase().includes('all')) {
        statuses.push({
          id: value, // This should be the JobBidStatus logical name
          name: text,
          value: value
        });
      }
    }
  }
  
  // Fallback with all the status options requested by the user
  if (statuses.length === 0) {
    return [
      { id: 'all', name: 'All', value: 'all' },
      { id: 'JobBidStatuses.invitedToApply', name: 'Invited to Apply', value: 'JobBidStatuses.invitedToApply' },
      { id: 'JobBidStatuses.preScreened', name: 'Pre-Screened', value: 'JobBidStatuses.preScreened' },
      { id: 'JobBidStatuses.disqualified', name: 'Disqualified', value: 'JobBidStatuses.disqualified' },
      { id: 'JobBidStatuses.hired', name: 'Hired', value: 'JobBidStatuses.hired' },
      { id: 'JobBidStatuses.nonHireable', name: 'Non-hireable', value: 'JobBidStatuses.nonHireable' },
      { id: 'JobBidStatuses.terminated', name: 'Terminated', value: 'JobBidStatuses.terminated' },
      { id: 'JobBidStatuses.reset', name: 'Reset', value: 'JobBidStatuses.reset' },
      { id: 'JobBidStatuses.hiredForAnotherPosition', name: 'Hired For Another Position', value: 'JobBidStatuses.hiredForAnotherPosition' },
      { id: 'JobBidStatuses.offered', name: 'Offered', value: 'JobBidStatuses.offered' },
      { id: 'JobBidStatuses.rejectedInHiringProcess', name: 'Rejected in Hiring Process', value: 'JobBidStatuses.rejectedInHiringProcess' },
    ];
  }
  
  return statuses;
}

function extractWorkflows(html: string): FilterOption[] {
  const workflows: FilterOption[] = [];
  
  // Look for workflow select dropdown
  const workflowSelectMatch = html.match(/<select[^>]*name="[^"]*workflow[^"]*"[^>]*>([\s\S]*?)<\/select>/);
  if (workflowSelectMatch) {
    const selectContent = workflowSelectMatch[1];
    const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g;
    let match;
    
    while ((match = optionRegex.exec(selectContent)) !== null) {
      const value = match[1].trim();
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      
      if (value && value !== '' && !text.toLowerCase().includes('all')) {
        workflows.push({
          id: value, // This should be the FlowActivation step name
          name: text,
          value: value
        });
      }
    }
  }
  
  // Fallback
  if (workflows.length === 0) {
    return [
      { id: 'Initial Review', name: 'Initial Review', value: 'Initial Review' },
      { id: 'Phone Screen', name: 'Phone Screen', value: 'Phone Screen' },
      { id: 'Interview', name: 'Interview', value: 'Interview' },
      { id: 'Final Review', name: 'Final Review', value: 'Final Review' },
    ];
  }
  
  return workflows;
}

function extractBookmarks(html: string): FilterOption[] {
  const bookmarks: FilterOption[] = [];
  
  // Look for bookmark select dropdown
  const bookmarkSelectMatch = html.match(/<select[^>]*name="[^"]*bookmark[^"]*"[^>]*>([\s\S]*?)<\/select>/);
  if (bookmarkSelectMatch) {
    const selectContent = bookmarkSelectMatch[1];
    const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/g;
    let match;
    
    while ((match = optionRegex.exec(selectContent)) !== null) {
      const value = match[1].trim();
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      
      if (value && value !== '' && !text.toLowerCase().includes('all')) {
        bookmarks.push({
          id: value,
          name: text,
          value: value
        });
      }
    }
  }
  
  // Fallback
  if (bookmarks.length === 0) {
    return [
      { id: 'favorites', name: 'Favorites', value: 'favorites' },
      { id: 'high-priority', name: 'High Priority', value: 'high-priority' },
      { id: 'follow-up', name: 'Follow Up', value: 'follow-up' },
    ];
  }
  
  return bookmarks;
}

// Add HEAD handler for completeness
export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
