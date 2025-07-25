import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // Get all relevant session cookies
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")?.value
    const intToken = cookieStore.get("ConsolidatedJAFTestClientINT")?.value
    
    if (!sessionId) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Construct the URL for the legacy system
    const legacyUrl = new URL("http://localhost:8080/atao/index.jsp")
    legacyUrl.searchParams.append("seq", "applicantGridResults")
    legacyUrl.searchParams.append("applicationName", "ConsolidatedJAFTestClientdsiRAT")
    legacyUrl.searchParams.append("locale", "en_US")
    legacyUrl.searchParams.append("reportType", "AllApplicants")
    legacyUrl.searchParams.append("event", "com.deploy.application.hmc.plugin.ApplicantGrid.search")

    // Build cookie header with all necessary cookies
    let cookieHeader = `JSESSIONID=${sessionId}`
    if (intToken) {
      cookieHeader += `; ConsolidatedJAFTestClientINT=${intToken}`
    }

    // Forward the request to the legacy system
    const response = await fetch(legacyUrl.toString(), {
      method: "GET",
      headers: {
        "Cookie": cookieHeader,
        "X-App-Locator": "ConsolidatedJAFTestClientdsiRAT",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      },
      credentials: "include"
    })

    // Get the response data
    const data = await response.text()
    
    // Check if we got redirected to login
    const isLoginPage = data.includes("<title>Login") || 
                       data.includes("login.jsp") || 
                       data.includes('name="username"') || 
                       data.includes('name="password"')
    
    if (isLoginPage) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 })
    }

    // Parse the HTML and extract table information
    const analysisResult = analyzeTableStructure(data)

    return NextResponse.json({
      status: "success",
      responseLength: data.length,
      analysis: analysisResult,
      rawHtmlSample: data.substring(0, 2000) // First 2000 chars for inspection
    })

  } catch (error) {
    console.error("Error in debug endpoint:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 })
  }
}

function analyzeTableStructure(htmlContent: string) {
  const analysis: any = {
    tables: [],
    totalTables: 0,
    potentialDataTables: []
  }

  try {
    // Simple regex-based parsing since we're in a server environment
    const tableMatches = htmlContent.match(/<table[^>]*>[\s\S]*?<\/table>/gi) || []
    analysis.totalTables = tableMatches.length

    tableMatches.forEach((tableHtml, tableIndex) => {
      const tableInfo: any = {
        index: tableIndex,
        headers: [],
        sampleRows: [],
        rowCount: 0
      }

      // Extract headers (th elements)
      const headerMatches = tableHtml.match(/<th[^>]*>([\s\S]*?)<\/th>/gi) || []
      tableInfo.headers = headerMatches.map(th => {
        const content = th.replace(/<[^>]*>/g, '').trim()
        return content || '[empty]'
      })

      // Extract rows (tr elements)
      const rowMatches = tableHtml.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || []
      tableInfo.rowCount = rowMatches.length

      // Get sample data rows (skip header row)
      const dataRows = rowMatches.slice(1, 4) // Take first 3 data rows
      tableInfo.sampleRows = dataRows.map(rowHtml => {
        const cellMatches = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []
        return cellMatches.map(td => {
          const content = td.replace(/<[^>]*>/g, '').trim()
          return content || '[empty]'
        })
      })

      analysis.tables.push(tableInfo)

      // Consider it a potential data table if it has headers and multiple rows
      if (tableInfo.headers.length > 0 && tableInfo.rowCount > 1) {
        analysis.potentialDataTables.push(tableInfo)
      }
    })

    // Look for the most likely applications table
    const applicationsTable = analysis.potentialDataTables.find((table: any) => 
      table.headers.some((header: string) => 
        header.toLowerCase().includes('name') || 
        header.toLowerCase().includes('applicant') ||
        header.toLowerCase().includes('status') ||
        header.toLowerCase().includes('position')
      )
    ) || analysis.potentialDataTables[0] // Fallback to first table with data

    if (applicationsTable) {
      analysis.recommendedTable = applicationsTable
    }

  } catch (error) {
    analysis.parsingError = error instanceof Error ? error.message : "Unknown parsing error"
  }

  return analysis
}
