import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { parse } from 'node-html-parser'
import type { Hire } from '@/lib/types'

const LEGACY_BASE = process.env.LEGACY_BASE || 'http://localhost:8080/atao'

export async function GET(request: NextRequest) {
  try {
    // Get session cookie from request
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")?.value
    const intToken = cookieStore.get("ConsolidatedJAFTestClientINT")?.value
    
    if (!sessionId) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Extract filter parameters from query string
    const { searchParams } = new URL(request.url)
    const applicationFromDate = searchParams.get('applicationFromDate')
    const applicationToDate = searchParams.get('applicationToDate')
    const hireDateRange = searchParams.get('hireDateRange')
    const workPreference = searchParams.get('workPreference')
    const location = searchParams.get('location')
    const position = searchParams.get('position')
    const applicationType = searchParams.get('applicationType')
    const dataChannel = searchParams.get('dataChannel')
    const exclusive = searchParams.get('exclusive')
    const hiringWorkflow = searchParams.get('hiringWorkflow')
    const status = searchParams.get('status')
    const veteranStatus = searchParams.get('veteranStatus')
    const tag = searchParams.get('tag')

    console.log('🔗 Fetching hires with filters:', {
      applicationFromDate,
      applicationToDate,
      hireDateRange,
      workPreference,
      location,
      position,
      applicationType,
      dataChannel,
      exclusive,
      hiringWorkflow,
      status,
      veteranStatus,
      tag
    })

    // Prepare form data for POST request (matching legacy AJAX calls)
    const formData = new URLSearchParams()
    
    // Core parameters 
    formData.append('locale', 'en_US')
    formData.append('applicationName', 'ConsolidatedJAFTestClientdsiRAT')
    formData.append('seq', 'applicantGridResults')
    formData.append('reportType', 'Hired')
    formData.append('hmcBidStatus', 'JobBidStatusesForHMC.Hired')
    formData.append('event', 'com.deploy.application.hmc.plugin.ApplicantGrid.search')
    formData.append('INDEX', '0')

    // Add date filters if provided as form data
    if (applicationFromDate && applicationToDate) {
      // Advanced mode - use specific dates in MM/dd/yyyy format
      const fromDate = new Date(applicationFromDate)
      const toDate = new Date(applicationToDate)
      const fromDateStr = `${(fromDate.getMonth() + 1).toString().padStart(2, '0')}/${fromDate.getDate().toString().padStart(2, '0')}/${fromDate.getFullYear()}`
      const toDateStr = `${(toDate.getMonth() + 1).toString().padStart(2, '0')}/${toDate.getDate().toString().padStart(2, '0')}/${toDate.getFullYear()}`
      
      formData.append("dateFrom", fromDateStr)
      formData.append("dateTo", toDateStr)
    } else if (hireDateRange && hireDateRange !== 'All') {
      // Basic mode - convert date range to actual dates
      const currentDate = new Date()
      let startDate: Date
      
      switch (hireDateRange) {
        case 'Last 7 Days':
          startDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000))
          break
        case 'Last 30 Days':
          startDate = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000))
          break
        case 'Last 60 Days':
          startDate = new Date(currentDate.getTime() - (60 * 24 * 60 * 60 * 1000))
          break
        case 'Last 90 Days':
          startDate = new Date(currentDate.getTime() - (90 * 24 * 60 * 60 * 1000))
          break
        case 'Last 180 Days':
          startDate = new Date(currentDate.getTime() - (180 * 24 * 60 * 60 * 1000))
          break
        case 'Last Year':
          startDate = new Date(currentDate.getTime() - (365 * 24 * 60 * 60 * 1000))
          break
        default:
          startDate = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000)) // Default to 30 days
      }
      
      const fromDateStr = `${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate.getDate().toString().padStart(2, '0')}/${startDate.getFullYear()}`
      const toDateStr = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`
      
      formData.append("dateFrom", fromDateStr)
      formData.append("dateTo", toDateStr)
    }

    // Add other filter parameters as form data
    if (location && location !== 'All' && location !== 'Headquarters') {
      formData.append("bidLocation", location)
    }

    if (position && position !== 'All') {
      formData.append("search.bidPosting.value", position)
      formData.append("search.bidPosting.field", "posting.jobOpening.id")
    }

    if (applicationType && applicationType !== 'All') {
      formData.append("search.applicantType.value", applicationType)
      formData.append("search.applicantType.field", "isExternal")
      formData.append("search.applicantType.op", "in")
    }

    if (dataChannel && dataChannel !== 'All') {
      formData.append("search.dataChannel.value", dataChannel)
      formData.append("search.dataChannel.field", "dataChannel")
      formData.append("search.dataChannel.op", "in")
    }

    if (exclusive && exclusive !== 'All') {
      formData.append("exclusive", exclusive)
    }

    console.log('📞 Calling legacy endpoint with form data:', Object.fromEntries(formData))

    // Make POST request to legacy system - matching the AJAX data calls
    const response = await fetch(`${LEGACY_BASE}/index.jsp`, {
      method: 'POST',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'Cookie': `JSESSIONID=${sessionId}; ConsolidatedJAFTestClientINT=${intToken}`,
        'X-App-Locator': 'ConsolidatedJAFTestClientdsiRAT',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
      },
      body: formData.toString(),
      credentials: 'include'
    })

    // Check for redirects (session expired)
    if (response.status === 302) {
      const location = response.headers.get('location')
      if (location?.includes('seq=login')) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 })
      }
    }

    if (!response.ok) {
      console.error('❌ Legacy request failed:', response.status, response.statusText)
      return NextResponse.json({ 
        error: `Legacy request failed: ${response.status}`,
        status: response.status,
        statusText: response.statusText
      }, { status: response.status })
    }

    const html = await response.text()
    console.log('📄 Received HTML response from legacy system')
    
    // Parse HTML response
    const root = parse(html)
    
    return await parseHiresFromHtml(root, response)

  } catch (error) {
    console.error('❌ Error fetching hires:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch hires data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function parseHiresFromHtml(root: any, response: Response) {
  // Find the application grid table
  const table = root.querySelector('table#data-table') || root.querySelector('table.data-table') || root.querySelector('table')
  
  if (!table) {
    console.log('⚠️ No data table found in response')
    return NextResponse.json([])
  }

  // Get table headers to understand column structure
  const headers = table.querySelectorAll('thead th, tr:first-child th, tr:first-child td')
  const headerTexts = headers.map((th: any) => th.text.trim())
  console.log('📊 Table headers:', headerTexts)

  // Extract data rows
  const rows = table.querySelectorAll('tbody tr, tr:not(:first-child)')
  console.log(`📋 Found ${rows.length} hire records`)

  if (rows.length === 0) {
    return NextResponse.json([])
  }

  // Map each row to a Hire object
  const hires: Hire[] = rows.map((row: any, index: number) => {
    const cells = row.querySelectorAll('td')
    
    // Extract ID from checkbox or generate one
    const idInput = cells[0]?.querySelector('input[type="checkbox"]')
    const id = idInput?.getAttribute('value') || idInput?.getAttribute('id') || `hire-${index + 1}`

    // Extract data from cells based on typical structure - using same pattern as other working APIs
    // Skip the first two cells (checkbox and empty cell), name is in cells[2]
    
    // For the name cell, extract just the name (usually first line or before the first colon)
    const nameCell = cells[2]
    let name = 'N/A'
    
    if (nameCell) {
      // Try to find an anchor tag which usually contains just the name
      const anchor = nameCell.querySelector('a')
      if (anchor) {
        name = anchor.text.trim()
      } else {
        // If no anchor, take the first line or text before details
        const fullText = nameCell.text.trim()
        // Extract just the name - either first line or text before details
        const nameMatch = fullText.match(/^([^:\n]+)(?:$|[\n:])/);
        name = nameMatch ? nameMatch[1].trim() : fullText.split('\n')[0].trim()
      }
    }
    
    const hired = cells[3]?.text?.trim() || ''
    const position = cells[4]?.text?.trim() || ''
    const hiredLocation = cells[5]?.text?.trim() || ''
    const formerEmployee = cells[6]?.text?.trim() || '--'
    const rehireEligible = cells[7]?.text?.trim() || '--'
    const scoreText = cells[8]?.text?.trim() || ''
    const percentageScoreText = cells[9]?.text?.trim() || ''
    const eVerifyStatus = cells[10]?.text?.trim() || '--'
    const wotcStatus = cells[11]?.text?.trim() || 'Not Screened'

    // Convert scores to numbers if they exist and are valid
    const score = scoreText && scoreText !== '--' && scoreText !== '' ? parseInt(scoreText, 10) : undefined
    const percentageScore = percentageScoreText && percentageScoreText !== '--' && percentageScoreText !== ''
      ? parseInt(percentageScoreText.replace('%', ''), 10) : undefined

    // Create Hire object
    const hire: Hire = {
      id,
      name,
      hired,
      position,
      hiredLocation,
      formerEmployee,
      rehireEligible,
      score: !isNaN(score as number) ? score : undefined,
      percentageScore: !isNaN(percentageScore as number) ? percentageScore : undefined,
      eVerifyStatus,
      wotcStatus,
      department: '', // Not typically available in grid
      status: 'Active', // Default for hired employees
      manager: '', // Not typically available in grid
      onboardingProgress: 100 // Default for hired employees
    }

    return hire
  }).filter((hire: Hire) => hire.name !== 'N/A' && hire.name !== '') // Filter out invalid entries

  console.log(`✅ Successfully parsed ${hires.length} hire records`)
  
  // Forward any session cookies from legacy response
  const legacySetCookie = response.headers.get('set-cookie')
  const apiResponse = NextResponse.json(hires)
  
  if (legacySetCookie) {
    apiResponse.headers.set('set-cookie', legacySetCookie)
  }

  return apiResponse
}

// Add HEAD handler for preflight requests
export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
