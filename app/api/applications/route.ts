import { NextRequest, NextResponse } from "next/server"
import { 
  mapPositionToLegacyFormat, 
  mapLocationToLegacyFormat, 
  mapStatusToLegacyFormat,
  mapWorkPreferenceToLegacyFormat,
  mapApplicantTypeToLegacyFormat,
  mapExclusiveToLegacyFormat,
  mapVeteranStatusToLegacyFormat
} from "@/lib/dynamic-position-mapping"

export async function GET(request: NextRequest) {
  try {
    // Get cookies from the request
    const jsessionid = request.cookies.get('JSESSIONID')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value;
    
    console.log("🔍 Filter API: Available cookies:", {
      JSESSIONID: jsessionid ? `${jsessionid.substring(0, 10)}...` : 'MISSING',
      ConsolidatedJAFTestClientINT: consolidatedCookie ? `${consolidatedCookie.substring(0, 20)}...` : 'MISSING'
    })
    
    if (!jsessionid) {
      console.log("🔍 Filter API: No JSESSIONID found - returning 401")
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    // Build cookie header
    let cookieHeader = `JSESSIONID=${jsessionid}`
    if (consolidatedCookie) {
      cookieHeader += `; ConsolidatedJAFTestClientINT=${consolidatedCookie}`
    }

    // Extract filter parameters from URL
    const { searchParams } = new URL(request.url)
    const position = searchParams.get('position')
    const location = searchParams.get('location')
    const status = searchParams.get('status')
    const workPreference = searchParams.get('workPreference')
    const applicantType = searchParams.get('applicantType')
    const exclusive = searchParams.get('exclusive')
    const veteranStatus = searchParams.get('veteranStatus')
    const hiringWorkflow = searchParams.get('hiringWorkflow')
    const dataChannel = searchParams.get('dataChannel')
    const appliedFrom = searchParams.get('appliedFrom')
    const appliedTo = searchParams.get('appliedTo')
    const debugFlag = searchParams.get('debug')

    console.log("🔍 Filter API: Raw filter parameters received:", {
      position,
      location,
      status,
      workPreference,
      applicantType,
      exclusive,
      veteranStatus,
      hiringWorkflow,
      dataChannel,
      appliedFrom,
      appliedTo
    })

    // Check if any filters are actually applied
    const hasFilters = position || location || status || workPreference || applicantType || exclusive || veteranStatus || hiringWorkflow || dataChannel || appliedFrom || appliedTo
    console.log("🔍 Filter API: Has filters applied:", hasFilters)

    // Map filters to legacy format using dynamic mapping
    let positionMapping = null
    let locationMapping = null
    let statusMapping = null
    let workPrefMapping = null
    let applicantTypeMapping = null
    let exclusiveMapping = null
    let veteranStatusMapping = null

    try {
      if (position && position !== 'all') {
        console.log("🔍 Filter API: Mapping position:", position)
        positionMapping = await mapPositionToLegacyFormat(position)
        console.log("🔍 Filter API: Position mapping result:", positionMapping)
      }

      if (location && location !== 'all') {
        console.log("🔍 Filter API: Mapping location:", location)
        locationMapping = await mapLocationToLegacyFormat(location)
        console.log("🔍 Filter API: Location mapping result:", locationMapping)
      }

      if (status && status !== 'all') {
        console.log("🔍 Filter API: Mapping status:", status)
        statusMapping = await mapStatusToLegacyFormat(status)
        console.log("🔍 Filter API: Status mapping result:", statusMapping)
      }

      if (workPreference && workPreference !== 'all') {
        console.log("🔍 Filter API: Mapping work preference:", workPreference)
        workPrefMapping = await mapWorkPreferenceToLegacyFormat(workPreference)
        console.log("🔍 Filter API: Work preference mapping result:", workPrefMapping)
      }

      if (applicantType && applicantType !== 'all') {
        console.log("🔍 Filter API: Mapping applicant type:", applicantType)
        applicantTypeMapping = await mapApplicantTypeToLegacyFormat(applicantType)
        console.log("🔍 Filter API: Applicant type mapping result:", applicantTypeMapping)
      }

      if (exclusive && exclusive !== 'all') {
        console.log("🔍 Filter API: Mapping exclusive:", exclusive)
        exclusiveMapping = await mapExclusiveToLegacyFormat(exclusive)
        console.log("🔍 Filter API: Exclusive mapping result:", exclusiveMapping)
      }

      if (veteranStatus && veteranStatus !== 'all') {
        console.log("🔍 Filter API: Mapping veteran status:", veteranStatus)
        veteranStatusMapping = await mapVeteranStatusToLegacyFormat(veteranStatus)
        console.log("🔍 Filter API: Veteran status mapping result:", veteranStatusMapping)
      }
    } catch (mappingError) {
      console.error("🔍 Filter API: Error during mapping:", mappingError)
      return NextResponse.json({ 
        error: "Filter mapping failed", 
        details: mappingError instanceof Error ? mappingError.message : "Unknown mapping error"
      }, { status: 500 })
    }

    console.log("🔍 Filter API: All dynamic mappings completed:", {
      positionMapping,
      locationMapping,
      statusMapping,
      workPrefMapping,
      applicantTypeMapping,
      exclusiveMapping,
      veteranStatusMapping
    })

    // Build the legacy URL for SEARCH RESULTS – direct HTML response
    const legacyUrl = `${process.env.LEGACY_BASE || 'http://localhost:8080/atao'}/index.jsp`
    const queryParams = new URLSearchParams({
      seq: 'applicantGridResults',  // SEARCH RESULTS - not applicantGrid
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      locale: 'en_US',
      reportType: 'AllApplicants',
      event: 'com.deploy.application.hmc.plugin.ApplicantGrid.search',
      validateData: 'false',
      skipRequiredCheck: 'false',
      divName: 'div2',
      INDEX: '0',
      REPORTTYPE: 'AllApplicants',
      
      // Date parameters added later depending on user input
      
      // Plugin model value
      'PLUGINMODELVALUE': 'STEP_NOTSELECTED',
      
      // CSRF token placeholder (would need to be obtained from session)
      'CSRF_TOKEN': ''
    });

    // Add position filter parameters if mapped
    if (positionMapping) {
      queryParams.set('search.bidPosting.value', positionMapping['search.bidPosting.value'])
      queryParams.set('search.bidPosting.field', positionMapping['search.bidPosting.field'])
      queryParams.set('search.bidPosting.op', positionMapping['search.bidPosting.op'])
    } else {
      // Send empty values for position filter
      queryParams.set('search.bidPosting.value', '')
      queryParams.set('search.bidPosting.field', 'posting.jobOpening.id')
      queryParams.set('search.bidPosting.op', 'eq')
    }

    // Add location filter parameters if mapped
    if (locationMapping) {
      queryParams.set('search.bidLocation.value', locationMapping['search.bidLocation.value'])
      queryParams.set('search.bidLocation.field', locationMapping['search.bidLocation.field'])
      queryParams.set('search.bidLocation.op', locationMapping['search.bidLocation.op'])
    } else {
      queryParams.set('search.bidLocation.value', '')
      queryParams.set('search.bidLocation.field', 'location.id')
      queryParams.set('search.bidLocation.op', 'in')
    }

    // Add status filter parameters if mapped
    if (statusMapping) {
      queryParams.set('search.hmcBidStatus.value', statusMapping['search.hmcBidStatus.value'])
      queryParams.set('search.hmcBidStatus.field', statusMapping['search.hmcBidStatus.field'])
      queryParams.set('search.hmcBidStatus.op', statusMapping['search.hmcBidStatus.op'])
    } else {
      // Send empty values for status filter
      queryParams.set('search.hmcBidStatus.value', '')
      queryParams.set('search.hmcBidStatus.field', 'hmcBidStatus')
      queryParams.set('search.hmcBidStatus.op', 'in')
    }

    // Add work preference filter parameters if mapped
    if (workPrefMapping) {
      queryParams.set('search.workPreference.value', workPrefMapping['search.workPreference.value'])
      queryParams.set('search.workPreference.field', workPrefMapping['search.workPreference.field'])
      queryParams.set('search.workPreference.op', workPrefMapping['search.workPreference.op'])
    } else {
      // Send empty values for work preference filter
      queryParams.set('search.workPreference.value', '')
      queryParams.set('search.workPreference.field', 'workPreference')
      queryParams.set('search.workPreference.op', 'in')
    }

    // Add applicant type filter parameters if mapped
    if (applicantTypeMapping) {
      queryParams.set('search.applicantType.value', applicantTypeMapping['search.applicantType.value'])
      queryParams.set('search.applicantType.field', applicantTypeMapping['search.applicantType.field'])
      queryParams.set('search.applicantType.op', applicantTypeMapping['search.applicantType.op'])
    } else {
      // Send empty values for applicant type filter
      queryParams.set('search.applicantType.value', '')
      queryParams.set('search.applicantType.field', 'isExternal')
      queryParams.set('search.applicantType.op', 'in')
    }

    // Add exclusive filter parameter if mapped
    if (exclusiveMapping) {
      queryParams.set('exclusive', exclusiveMapping['exclusive'])
    } else {
      queryParams.set('exclusive', '')
    }

    // Add veteran status filter parameter if mapped
    if (veteranStatusMapping) {
      queryParams.set('veteranStatus', veteranStatusMapping['veteranStatus'])
    } else {
      queryParams.set('veteranStatus', '')
    }

    // Add data channel filter parameters if provided
    if (dataChannel && dataChannel !== 'all') {
      queryParams.set('search.dataChannel.value', dataChannel)
      queryParams.set('search.dataChannel.field', 'dataChannel')
      queryParams.set('search.dataChannel.op', 'eq')
    } else {
      queryParams.set('search.dataChannel.value', '')
      queryParams.set('search.dataChannel.field', 'dataChannel')
      queryParams.set('search.dataChannel.op', 'eq')
    }

    // Add workflow activation parameter if provided
    if (hiringWorkflow && hiringWorkflow !== 'all') {
      queryParams.set('flowActivation', hiringWorkflow)
    } else {
      queryParams.set('flowActivation', '')
    }

    // Date logic
    if (appliedFrom || appliedTo) {
      // Use explicit dateFrom/dateTo (format already YYYY-MM-DD from UI)
      const from = appliedFrom || appliedTo // if only one side provided
      const to = appliedTo || appliedFrom
      const fmt = (iso: string) => {
        const [y, m, d] = iso.split('-')
        return `${m.padStart(2,'0')}/${d.padStart(2,'0')}/${y}`
      }
      const disp = (iso: string) => {
        const [y, m, d] = iso.split('-')
        return `${parseInt(m)}/${parseInt(d)}/${y}`
      }
      queryParams.set('dateFrom', fmt(from!))
      queryParams.set('dateTo', fmt(to!))
      queryParams.set('dateFrom__DateText', disp(from!))
      queryParams.set('dateTo__DateText', disp(to!))
    } else {
      // Less panel default – last 7 days
      queryParams.set('showDays', '7')
      queryParams.set('search.dateFromDays.field', 'bidDate')
      queryParams.set('search.dateFromDays.op', 'dt_ge_st')
      queryParams.set('search.dateToDays.field', 'bidDate')
      queryParams.set('search.dateToDays.op', 'dt_le_ed')
    }

    // Log the exact parameters being sent to legacy system
    console.log("🔍 Filter API: Legacy parameters being sent:")
    for (const [key, value] of queryParams.entries()) {
      if (value) { // Only log non-empty values
        console.log(`  ${key}: "${value}"`)
      }
    }

    console.log("🔍 Filter API: Final query parameters being sent to legacy system:")
    console.log("🔍 Filter API: URL:", `${legacyUrl}?${queryParams.toString()}`)
    console.log("🔍 Filter API: Query string length:", queryParams.toString().length)
    
    // Log each parameter for debugging
    const paramEntries = Array.from(queryParams.entries())
    paramEntries.forEach(([key, value]) => {
      console.log(`🔍 Filter API: ${key} = "${value}"`)
    })
    
    // Specifically log search parameters
    const searchParamEntries = paramEntries.filter(([key]) => key.startsWith('search.'))
    console.log("🔍 Filter API: Search parameters count:", searchParamEntries.length)
    searchParamEntries.forEach(([key, value]) => {
      console.log(`🔍 Filter API: SEARCH PARAM: ${key} = "${value}"`)
    })

    // Build the legacy POST body (form-urlencoded)
    const formBody = queryParams.toString()

    if (debugFlag === '1') {
      return NextResponse.json({
        debug: true,
        formBody: formBody.split('&').sort(),
        raw: formBody
      })
    }

    const response = await fetch(legacyUrl, {
      method: 'POST',
      headers: {
        cookie: cookieHeader,
        Accept: 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'NextJS-Filter-API/1.0'
      },
      body: formBody,
      credentials: 'include'
    })

    console.log("🔍 Filter API: Legacy system response status:", response.status)
    console.log("🔍 Filter API: Legacy system response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      console.error("🔍 Filter API: Legacy system returned error:", response.status, response.statusText)
      return NextResponse.json({ 
        error: 'Legacy system error', 
        status: response.status,
        statusText: response.statusText,
        url: `${legacyUrl}?${formBody}`
      }, { status: response.status })
    }

    const html = await response.text()

    const outHeaders = new Headers({ 'content-type': 'text/html' })
    const setCookie = response.headers.get('set-cookie')
    if (setCookie) outHeaders.set('set-cookie', setCookie)

    return new NextResponse(html, { status: response.status, headers: outHeaders })

  } catch (error) {
    console.error("🔍 Filter API: Error occurred:", error)
    console.error("🔍 Filter API: Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

// Add HEAD handler for completeness
export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
