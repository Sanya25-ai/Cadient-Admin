import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 [Your Active Reqs API] API called');
    
    // Get cookies from the request - same pattern as working APIs
    const cookieHeader = req.headers.get('cookie') || '';
    console.log('🍪 [Your Active Reqs API] Cookie header:', cookieHeader ? 'present' : 'missing');

    if (!cookieHeader) {
      console.log('❌ [Your Active Reqs API] Missing cookie header');
      return NextResponse.json({ 
        error: 'Authentication required',
        requisitions: []
      }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    
    // Extract search parameters with defaults matching legacy behavior
    const title = searchParams.get('title') || '';
    const requisitionNumber = searchParams.get('requisitionNumber') || '';
    const requisitionStatus = searchParams.get('requisitionStatus') || '';
    const jobCategory = searchParams.get('jobCategory') || '';
    const userLocation = searchParams.get('userLocation') || '';
    const recruiterInput = searchParams.get('recruiterInput') || '';
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    const showAllReqs = searchParams.get('showAllReqs') || 'ShowAllRequisitions.Yours';
    const sortColumn = searchParams.get('sortColumn') || 'dateCreated';
    const sortDirection = searchParams.get('sortDirection') || 'desc';
    
    console.log('🔍 [Your Active Reqs API] Search parameters:', {
      title, requisitionNumber, requisitionStatus, jobCategory, userLocation, 
      recruiterInput, firstName, lastName, showAllReqs, sortColumn, sortDirection
    });
    
    // First, get the search form page to extract CSRF token
    const formUrl = `${process.env.LEGACY_BASE || 'http://localhost:8080/atao'}/index.jsp?seq=reqSearch&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US`;
    console.log('🔍 [Your Active Reqs API] Getting CSRF token from:', formUrl);
    
    const formResponse = await fetch(formUrl, {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    
    if (!formResponse.ok) {
      console.log('❌ [Your Active Reqs API] Failed to get form page:', formResponse.status);
      return NextResponse.json({ 
        error: 'Failed to access search form',
        requisitions: []
      }, { status: 500 });
    }
    
    const formHtml = await formResponse.text();
    
    // Extract CSRF token from the form
    const csrfMatch = formHtml.match(/name="CSRF_TOKEN"[^>]*value="([^"]*)"/) || 
                      formHtml.match(/CSRF_TOKEN[^>]*value="([^"]*)"/) ||
                      formHtml.match(/"CSRF_TOKEN":"([^"]*)"/) ||
                      formHtml.match(/CSRF_TOKEN[^>]*=\s*"([^"]*)"/) ||
                      formHtml.match(/CSRF_TOKEN[^>]*:\s*"([^"]*)"/) ||
                      formHtml.match(/CSRF_TOKEN[^>]*=\s*'([^']*)'/) ||
                      formHtml.match(/CSRF_TOKEN[^>]*:\s*'([^']*)'/) ||
                      formHtml.match(/CSRF_TOKEN[^>]*=\s*([^&\s]*)/);
    
    const csrfToken = csrfMatch ? csrfMatch[1] : '';
    console.log('🔍 [Your Active Reqs API] Extracted CSRF token:', csrfToken ? 'found' : 'not found');
    
    // Build the legacy system URL - exactly as shown in the HAR files
    const baseUrl = `${process.env.LEGACY_BASE || 'http://localhost:8080/atao'}/index.jsp`;
    
    // Build query parameters exactly as in the HAR files
    const queryParams = new URLSearchParams({
      AnchorName_reqSearchForm: '',
      locale: 'en_US',
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      seq: 'reqSearch',
      INDEX: '0',
      event: 'com.deploy.application.twm.plugin.ReqSearch.doSearch',
      validateData: 'true',
      skipRequiredCheck: 'false'
    });

    // Add search parameters exactly as they appear in the legacy system
    queryParams.set('requisitionNumber', requisitionNumber);
    queryParams.set('title', title);
    queryParams.set('jobCategory', jobCategory);
    queryParams.set('userLocation', userLocation);
    queryParams.set('requisitionStatus', requisitionStatus);
    queryParams.set('recruiterInput', recruiterInput);
    queryParams.set('firstName', firstName);
    queryParams.set('lastName', lastName);
    queryParams.set('showAllReqs', showAllReqs);
    
    // Add CSRF token placeholder (will be handled by the legacy system)
    queryParams.set('CSRF_TOKEN', csrfToken);

    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    console.log('🌐 [Your Active Reqs API] Making GET request to:', fullUrl);
    console.log('🔍 [Your Active Reqs API] Query parameters:', Object.fromEntries(queryParams.entries()));

    // Call legacy system directly (same pattern as job-templates)
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    console.log('📡 [Your Active Reqs API] Response status:', response.status);
    console.log('📡 [Your Active Reqs API] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.log('❌ [Your Active Reqs API] Response not OK:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('❌ [Your Active Reqs API] Error response body:', errorText.substring(0, 500));
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({ 
          error: 'Authentication failed. Please log in again.',
          requisitions: []
        }, { status: 401 });
      }
      
      return NextResponse.json({ 
        error: 'Failed to fetch data from legacy system',
        requisitions: []
      }, { status: 500 });
    }

    const html = await response.text();
    console.log('📄 [Your Active Reqs API] Response length:', html.length);
    console.log('📄 [Your Active Reqs API] Response preview:', html.substring(0, 200));
    
    // Check for login redirect - be more specific to avoid false positives
    if (html.includes('seq=login') || html.includes('authentication required') || html.includes('Please log in')) {
      console.log('❌ [Your Active Reqs API] Authentication failed - redirected to login');
      return NextResponse.json({ 
        error: 'Authentication failed. Please log in again.',
        requisitions: []
      }, { status: 401 });
    }

    // Parse the HTML to extract requisition data
    const requisitions = parseRequisitionsFromHTML(html);
    console.log('✅ [Your Active Reqs API] Parsed requisitions:', requisitions.length);
    
    // Create response with clean data structure
    const responseData = {
      requisitions: requisitions,
      totalCount: requisitions.length,
      searchParams: {
        title, requisitionNumber, requisitionStatus, jobCategory, userLocation,
        recruiterInput, firstName, lastName, showAllReqs, sortColumn, sortDirection
      },
      hasSearchResults: requisitions.length > 0
    };

    // Forward any session cookies from legacy system
    const legacyResponse = NextResponse.json(responseData);
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      legacyResponse.headers.set('set-cookie', setCookie);
    }
    
    return legacyResponse;
    
  } catch (error) {
    console.error('❌ [Your Active Reqs API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({
      error: 'Failed to fetch requisitions',
      message: errorMessage,
      requisitions: []
    }, { status: 500 });
  }
}

function parseRequisitionsFromHTML(html: string): any[] {
  const requisitions: any[] = [];
  
  try {
    console.log('🔍 [Requisitions Parser] Starting to parse HTML...');
    
    // Look for the specific data-table used in aTAO requisitions
    const tableMatch = html.match(/<table[^>]*id="data-table"[^>]*>([\s\S]*?)<\/table>/i);
    
    if (!tableMatch) {
      console.log('❌ [Requisitions Parser] No data-table found');
      return requisitions;
    }
    
    console.log('✅ [Requisitions Parser] Found data-table');
    
    // Extract table body
    const tbodyMatch = tableMatch[1].match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
    if (!tbodyMatch) {
      console.log('❌ [Requisitions Parser] No tbody found');
      return requisitions;
    }
    
    console.log('✅ [Requisitions Parser] Found tbody');
    
    // Extract all table rows
    const rowMatches = tbodyMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
    if (!rowMatches) {
      console.log('❌ [Requisitions Parser] No table rows found');
      return requisitions;
    }
    
    console.log(`🔍 [Requisitions Parser] Found ${rowMatches.length} table rows`);
    
    rowMatches.forEach((row, index) => {
      try {
        const requisition = parseRequisitionRow(row, index);
        if (requisition) {
          requisitions.push(requisition);
          console.log(`✅ [Requisitions Parser] Parsed requisition: ${requisition.position} (${requisition.requisitionNumber})`);
        }
      } catch (error) {
        console.error(`❌ [Requisitions Parser] Error parsing row ${index}:`, error);
      }
    });
    
  } catch (error) {
    console.error('❌ [Requisitions Parser] Error parsing HTML:', error);
  }
  
  return requisitions;
}

function parseRequisitionRow(rowHtml: string, index: number): any | null {
  try {
    // Extract data from table cells
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells: string[] = [];
    let cellMatch;
    
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(cellMatch[1].trim());
    }
    
    if (cells.length < 6) {
      console.log(`⚠️ [Requisitions Parser] Row ${index} has only ${cells.length} cells, skipping`);
      return null;
    }
    
    console.log(`🔍 [Requisitions Parser] Row ${index} has ${cells.length} cells`);
    
    // Based on the actual HTML structure:
    // Cell 0: Position with link and location
    // Cell 1: Postings count
    // Cell 2: Primary Recruiter
    // Cell 3: Created By
    // Cell 4: Status
    // Cell 5: Created date
    
    const extractTextFromCell = (cellHtml: string): string => {
      // Remove HTML tags and clean up text
      return cellHtml
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
        .replace(/&amp;/g, '&') // Replace &amp; with &
        .replace(/&lt;/g, '<') // Replace &lt; with <
        .replace(/&gt;/g, '>') // Replace &gt; with >
        .replace(/&quot;/g, '"') // Replace &quot; with "
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
    };
    
    // Parse position cell (contains title, req number, and location)
    const positionCell = cells[0];
    
    // Extract position title and requisition number from the link
    const linkMatch = positionCell.match(/<a[^>]*>([\s\S]*?)<\/a>/);
    const linkText = linkMatch ? linkMatch[1] : '';
    
    // Clean the link text by removing HTML tags first
    const cleanLinkText = extractTextFromCell(linkText);
    
    // Extract position title and req number from clean text like "Manager (382)"
    const titleMatch = cleanLinkText.match(/^(.*?)\s*\(([^)]+)\)$/);
    const position = titleMatch ? titleMatch[1].trim() : cleanLinkText;
    const requisitionNumber = titleMatch ? titleMatch[2].trim() : '';
    
    // Extract location from the position cell (after the link)
    const locationMatch = positionCell.match(/<\/a>[\s\S]*?<span[^>]*>([^<]*)<\/span>[\s\S]*?<span[^>]*>([^<]*)<\/span>/);
    const location = locationMatch ? `${locationMatch[1].trim()}, ${locationMatch[2].trim()}`.replace(/,\s*,/, ',').replace(/,\s*$/, '') : 'Unknown Location';
    
    // Extract requisition ID from the link href
    const hrefMatch = positionCell.match(/href="[^"]*REQID=([^&"]*)/);
    const requisitionId = hrefMatch ? hrefMatch[1] : requisitionNumber || `req_${index}`;
    
    // Parse other cells
    const postingsText = extractTextFromCell(cells[1]);
    const postings = parseInt(postingsText) || 0;
    
    const primaryRecruiter = extractTextFromCell(cells[2]);
    const createdBy = extractTextFromCell(cells[3]);
    const status = extractTextFromCell(cells[4]);
    const created = extractTextFromCell(cells[5]);
    
    console.log(`🔍 [Requisitions Parser] Parsed data:`, {
      position,
      requisitionNumber,
      location,
      postings,
      primaryRecruiter,
      createdBy,
      status,
      created
    });
    
    return {
      id: requisitionId,
      position: position || 'Unknown Position',
      location: location,
      postings: postings,
      hasAlert: false, // Could be determined from HTML if needed
      primaryRecruiter: primaryRecruiter || 'Unknown',
      createdBy: createdBy || 'Unknown',
      status: status || 'Active',
      created: created || new Date().toLocaleDateString(),
      requisitionNumber: requisitionNumber || requisitionId,
      jobCategory: '', // Could be extracted from detail section if needed
      hiringManager: '', // Could be extracted if available
      department: '', // Could be extracted if available
      priority: 'Normal' // Default value
    };
    
  } catch (error) {
    console.error(`❌ [Requisitions Parser] Error parsing row ${index}:`, error);
    return null;
  }
}

// Add HEAD handler for preflight requests
export function HEAD() {
  return NextResponse.json({}, { status: 200 });
}
