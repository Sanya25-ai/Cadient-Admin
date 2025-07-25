import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get cookies from the request
    const jsessionid = request.cookies.get('JSESSIONID')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value;
    
    console.log("🏆 Tax Credit API: Available cookies:", {
      JSESSIONID: jsessionid ? `${jsessionid.substring(0, 10)}...` : 'MISSING',
      ConsolidatedJAFTestClientINT: consolidatedCookie ? `${consolidatedCookie.substring(0, 20)}...` : 'MISSING'
    })
    
    if (!jsessionid) {
      console.log("🏆 Tax Credit API: No JSESSIONID found - returning 401")
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Build cookie header
    let cookieHeader = `JSESSIONID=${jsessionid}`
    if (consolidatedCookie) {
      cookieHeader += `; ConsolidatedJAFTestClientINT=${consolidatedCookie}`
    }

    // Build the legacy URL for Tax Credit (WOTC) applications
    const legacyUrl = `${process.env.LEGACY_BASE || 'http://localhost:8080/atao'}/index.jsp`
    const queryParams = new URLSearchParams({
      seq: 'applicantGrid',
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      locale: 'en_US',
      reportType: 'WOTC',
      exclusive: 'Exclusive.exclusive'
    });

    const fullUrl = `${legacyUrl}?${queryParams.toString()}`
    console.log("🏆 Tax Credit API: Calling legacy URL:", fullUrl)

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Cookie': cookieHeader,
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1'
      },
      redirect: 'manual'
    })

    console.log("🏆 Tax Credit API: Legacy response status:", response.status)

    // Check if we got redirected to login
    if (response.status === 302) {
      const location = response.headers.get('location');
      if (location?.includes('seq=login')) {
        console.log("🏆 Tax Credit API: Redirected to login - session expired")
        return NextResponse.json({ error: "Session expired" }, { status: 401 })
      }
    }

    if (!response.ok) {
      console.error("🏆 Tax Credit API: Legacy request failed:", response.status, response.statusText)
      return NextResponse.json({ 
        error: `Failed to fetch tax credit applications: ${response.status} ${response.statusText}` 
      }, { status: response.status })
    }

    const html = await response.text()
    console.log("🏆 Tax Credit API: Received HTML response, length:", html.length)
    
    // Parse the HTML to extract tax credit applications
    const applications = parseApplicationsFromHTML(html)
    console.log("🏆 Tax Credit API: Parsed applications count:", applications.length)

    // Forward any session cookies from the legacy response
    const nextResponse = NextResponse.json(applications)
    const setCookie = response.headers.get('set-cookie')
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie)
    }

    return nextResponse

  } catch (error) {
    console.error("🏆 Tax Credit API: Error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Failed to fetch tax credit applications" 
    }, { status: 500 })
  }
}

// Function to parse HTML and extract application data
function parseApplicationsFromHTML(html: string): any[] {
  try {
    console.log("🏆 Tax Credit API: Starting HTML parsing")
    
    // Use a simple regex approach to find table data since we're in a server environment
    // Look for the data table - replace newlines with spaces first to handle multiline content
    const normalizedHtml = html.replace(/\r?\n/g, ' ')
    const tableMatch = normalizedHtml.match(/<table[^>]*id=["']data-table["'][^>]*>(.*?)<\/table>/i)
    if (!tableMatch) {
      console.log("🏆 Tax Credit API: No data-table found in HTML")
      return []
    }

    const tableContent = tableMatch[1]
    console.log("🏆 Tax Credit API: Found data table")

    // Extract table rows
    const rowMatches = tableContent.match(/<tr[^>]*>(.*?)<\/tr>/gi)
    if (!rowMatches || rowMatches.length <= 1) {
      console.log("🏆 Tax Credit API: No data rows found")
      return []
    }

    // Skip header row, process data rows
    const dataRows = rowMatches.slice(1)
    console.log("🏆 Tax Credit API: Processing", dataRows.length, "data rows")

    const applications = dataRows.map((row, index) => {
      // Extract cell contents
      const cellMatches = row.match(/<td[^>]*>(.*?)<\/td>/gi)
      if (!cellMatches) {
        return null
      }

      const cells = cellMatches.map(cell => {
        // Remove HTML tags and clean up text
        return cell.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
      })

      // Map cells to application structure (adjust based on actual table structure)
      const application = {
        id: `tax-credit-${index + 1}`,
        name: cells[0] || 'N/A',
        appliedDate: cells[1] || 'N/A',
        position: cells[2] || 'N/A',
        location: cells[3] || 'N/A',
        status: 'Tax Credit Eligible',
        taxCreditType: 'WOTC',
        taxCreditValue: '2,400', // Default WOTC value
        hiringManager: cells[4] || 'N/A',
        smartScore: null,
        availability: 'Full-time',
        phone: '',
        email: '',
        ssn: '',
        source: 'Web Site'
      }

      console.log("🏆 Tax Credit API: Mapped application:", application.name)
      return application
    }).filter(Boolean)

    console.log("🏆 Tax Credit API: Successfully parsed", applications.length, "applications")
    return applications

  } catch (error) {
    console.error("🏆 Tax Credit API: Error parsing HTML:", error)
    return []
  }
}

export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
