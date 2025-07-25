import { NextRequest, NextResponse } from "next/server"

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
    let cookieHeader = `JSESSIONID=${jsessionid}`
    if (consolidatedCookie) {
      cookieHeader += `; ConsolidatedJAFTestClientINT=${consolidatedCookie}`
    }

    // Call the legacy system to get filter options
    // This calls the same sequence that populates the filter form in legacy UI
    const legacyUrl = "http://localhost:8080/atao/index.jsp"
    const queryParams = new URLSearchParams({
      seq: 'applicantGrid',
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      locale: 'en_US',
      reportType: 'AllApplicants'
    });

    const fullUrl = legacyUrl + "?" + queryParams.toString()
    
    console.log("🔍 Filter Options API: Calling legacy URL:", fullUrl)

    // Forward the request to the legacy system
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Cookie": cookieHeader,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      },
      credentials: "include"
    })

    console.log("🔍 Filter Options API: Legacy response status:", response.status)

    // Get the response data
    const data = await response.text()
    console.log("🔍 Filter Options API: Legacy response length:", data.length)
    
    // Check if we got redirected to login
    const isLoginPage = data.includes("<title>Login") || 
                       data.includes("login.jsp") || 
                       data.includes('name="username"') || 
                       data.includes('name="password"')
    
    if (isLoginPage) {
      console.log("🔍 Filter Options API: Detected login page - session expired")
      return NextResponse.json({ error: "Session expired" }, { status: 401 })
    }

    // Parse the HTML to extract filter options
    const filterOptions = parseFilterOptionsFromHTML(data)
    
    console.log("🔍 Filter Options API: Extracted filter options:", {
      positions: filterOptions.positions?.length || 0,
      locations: filterOptions.locations?.length || 0,
      statuses: filterOptions.statuses?.length || 0,
      workPreferences: filterOptions.workPreferences?.length || 0,
      applicantTypes: filterOptions.applicantTypes?.length || 0,
      exclusiveOptions: filterOptions.exclusiveOptions?.length || 0,
      veteranStatuses: filterOptions.veteranStatuses?.length || 0,
      workflows: filterOptions.workflows?.length || 0,
      dataChannels: filterOptions.dataChannels?.length || 0
    })

    // Forward any session cookies from the legacy response
    const nextResponse = NextResponse.json(filterOptions)

    // Forward set-cookie headers if they exist
    const setCookieHeader = response.headers.get('set-cookie')
    if (setCookieHeader) {
      nextResponse.headers.set('set-cookie', setCookieHeader)
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

/**
 * Parse filter options from the legacy HTML response
 * This extracts the same data that the legacy JSP tags populate
 */
function parseFilterOptionsFromHTML(html: string): FilterOptions {
  const filterOptions: FilterOptions = {
    positions: [],
    locations: [],
    statuses: [],
    workPreferences: [],
    applicantTypes: [],
    exclusiveOptions: [],
    veteranStatuses: [],
    workflows: [],
    dataChannels: [],
    bookmarks: []
  }

  try {
    console.log("🔍 Filter Options API: Starting comprehensive HTML parsing...")
    console.log("🔍 Filter Options API: HTML length:", html.length)
    
    // Debug: Save a sample of the HTML to understand the structure
    const htmlSample = html.substring(0, 5000)
    console.log("🔍 Filter Options API: HTML sample (first 5000 chars):", htmlSample)

    // Look for all select elements in the HTML and log them for debugging
    const allSelectMatches = html.match(/<select[^>]*>[\s\S]*?<\/select>/gi) || []
    console.log("🔍 Filter Options API: Found", allSelectMatches.length, "total select elements")
    
    allSelectMatches.forEach((selectHtml, index) => {
      const nameMatch = selectHtml.match(/name="([^"]*)"/)
      const idMatch = selectHtml.match(/id="([^"]*)"/)
      const name = nameMatch ? nameMatch[1] : 'unknown'
      const id = idMatch ? idMatch[1] : 'unknown'
      console.log(`🔍 Filter Options API: Select ${index + 1}: name="${name}", id="${id}"`)
      
      // Log a sample of the options for debugging
      const optionMatches = selectHtml.match(/<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi) || []
      console.log(`🔍 Filter Options API: Select ${index + 1} has ${optionMatches.length} options`)
      if (optionMatches.length > 0) {
        console.log(`🔍 Filter Options API: First few options:`, optionMatches.slice(0, 3))
      }
    })

    // Enhanced position parsing - look for bidPosting, jobOpening, or position-related selects
    const positionPatterns = [
      /<select[^>]*name="bidPosting"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Pp]osting[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Jj]ob[Oo]pening[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Pp]osition[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let positionMatch = null
    for (const pattern of positionPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      positionMatch = pattern.exec(html)
      if (positionMatch) {
        console.log("🔍 Filter Options API: Found position select with pattern:", pattern.source)
        break
      }
    }
    
    if (positionMatch && positionMatch[1]) {
      console.log("🔍 Filter Options API: Found position select")
      const optionsHtml = positionMatch[1]
      console.log("🔍 Filter Options API: Position options HTML length:", optionsHtml.length)
      
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let positionCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        console.log("🔍 Filter Options API: Position option found:", { value, text })
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.positions.push({
            id: value,
            name: text,
            value: text
          })
          positionCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", positionCount, "positions")
    } else {
      console.log("🔍 Filter Options API: No position select found")
    }

    // Enhanced location parsing
    const locationPatterns = [
      /<select[^>]*name="bidLocation"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Ll]ocation[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Ll]ocation[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let locationMatch = null
    for (const pattern of locationPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      locationMatch = pattern.exec(html)
      if (locationMatch) {
        console.log("🔍 Filter Options API: Found location select with pattern:", pattern.source)
        break
      }
    }
    
    if (locationMatch && locationMatch[1]) {
      console.log("🔍 Filter Options API: Found location select")
      const optionsHtml = locationMatch[1]
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let locationCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.locations.push({
            id: value,
            name: text,
            value: value
          })
          locationCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", locationCount, "locations")
    } else {
      console.log("🔍 Filter Options API: No location select found")
    }

    // Enhanced status parsing - look for hmcBidStatus or status-related selects
    const statusPatterns = [
      /<select[^>]*name="hmcBidStatus"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Ss]tatus[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Ss]tatus[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let statusMatch = null
    for (const pattern of statusPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      statusMatch = pattern.exec(html)
      if (statusMatch) {
        console.log("🔍 Filter Options API: Found status select with pattern:", pattern.source)
        break
      }
    }
    
    if (statusMatch && statusMatch[1]) {
      console.log("🔍 Filter Options API: Found status select")
      const optionsHtml = statusMatch[1]
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let statusCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        console.log("🔍 Filter Options API: Status option found:", { value, text })
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.statuses = filterOptions.statuses ? [...filterOptions.statuses, { id: value, name: text, value }] : [{ id: value, name: text, value }]
          statusCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", statusCount, "statuses")
    } else {
      console.log("🔍 Filter Options API: No status select found")
    }

    // Enhanced work preference parsing - look for workPreference selects
    const workPrefPatterns = [
      /<select[^>]*name="workPreference"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Ww]ork[Pp]reference[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Ww]ork[Pp]reference[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let workPrefMatch = null
    for (const pattern of workPrefPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      workPrefMatch = pattern.exec(html)
      if (workPrefMatch) {
        console.log("🔍 Filter Options API: Found work preference select with pattern:", pattern.source)
        break
      }
    }
    
    if (workPrefMatch && workPrefMatch[1]) {
      console.log("🔍 Filter Options API: Found work preference select")
      const optionsHtml = workPrefMatch[1]
      console.log("🔍 Filter Options API: Work preference options HTML length:", optionsHtml.length)
      console.log("🔍 Filter Options API: Work preference options HTML sample:", optionsHtml.substring(0, 500))
      
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let workPrefCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        console.log("🔍 Filter Options API: Work preference option found:", { value, text })
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.workPreferences = filterOptions.workPreferences ? [...filterOptions.workPreferences, { id: value, name: text, value }] : [{ id: value, name: text, value }]
          workPrefCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", workPrefCount, "work preferences")
    } else {
      console.log("🔍 Filter Options API: No work preference select found")
      // Debug: Search for any mention of workPreference in the HTML
      const workPrefMentions = html.match(/workPreference/gi) || []
      console.log("🔍 Filter Options API: Found", workPrefMentions.length, "mentions of 'workPreference' in HTML")
      
      // Look for displaySetValueList tags that might not have been rendered yet
      const displaySetMatches: string[] = html.match(/displaySetValueList[\s\S]*?setName="WorkPreference"/gi) || []
      console.log("🔍 Filter Options API: Found", displaySetMatches.length, "displaySetValueList tags with WorkPreference")
      if (displaySetMatches.length > 0 && displaySetMatches[0]) {
        console.log("🔍 Filter Options API: DisplaySetValueList sample:", displaySetMatches[0].substring(0, 200))
      }
    }

    // Enhanced applicant type parsing - look for applicantType or isExternal selects
    const applicantTypePatterns = [
      /<select[^>]*name="applicantType"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Aa]pplicant[Tt]ype[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Aa]pplicant[Tt]ype[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="isExternal"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let applicantTypeMatch = null
    for (const pattern of applicantTypePatterns) {
      pattern.lastIndex = 0 // Reset regex state
      applicantTypeMatch = pattern.exec(html)
      if (applicantTypeMatch) {
        console.log("🔍 Filter Options API: Found applicant type select with pattern:", pattern.source)
        break
      }
    }
    
    if (applicantTypeMatch && applicantTypeMatch[1]) {
      console.log("🔍 Filter Options API: Found applicant type select")
      const optionsHtml = applicantTypeMatch[1]
      console.log("🔍 Filter Options API: Applicant type options HTML length:", optionsHtml.length)
      console.log("🔍 Filter Options API: Applicant type options HTML sample:", optionsHtml.substring(0, 500))
      
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let applicantTypeCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        console.log("🔍 Filter Options API: Applicant type option found:", { value, text })
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.applicantTypes = filterOptions.applicantTypes ? [...filterOptions.applicantTypes, { id: value, name: text, value }] : [{ id: value, name: text, value }]
          applicantTypeCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", applicantTypeCount, "applicant types")
    } else {
      console.log("🔍 Filter Options API: No applicant type select found")
      // Debug: Search for any mention of applicantType in the HTML
      const applicantTypeMentions = html.match(/applicantType|isExternal/gi) || []
      console.log("🔍 Filter Options API: Found", applicantTypeMentions.length, "mentions of 'applicantType' or 'isExternal' in HTML")
      
      // Look for displaySetValueList tags
      const displaySetMatches: string[] = html.match(/displaySetValueList[\s\S]*?setName="ApplicantType"/gi) || []
      console.log("🔍 Filter Options API: Found", displaySetMatches.length, "displaySetValueList tags with ApplicantType")
      if (displaySetMatches.length > 0 && displaySetMatches[0]) {
        console.log("🔍 Filter Options API: DisplaySetValueList sample:", displaySetMatches[0].substring(0, 200))
      }
    }

    // Enhanced exclusive options parsing
    const exclusivePatterns = [
      /<select[^>]*name="exclusive"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Ee]xclusive[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Ee]xclusive[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let exclusiveMatch = null
    for (const pattern of exclusivePatterns) {
      pattern.lastIndex = 0 // Reset regex state
      exclusiveMatch = pattern.exec(html)
      if (exclusiveMatch) {
        console.log("🔍 Filter Options API: Found exclusive select with pattern:", pattern.source)
        break
      }
    }
    
    if (exclusiveMatch && exclusiveMatch[1]) {
      console.log("🔍 Filter Options API: Found exclusive select")
      const optionsHtml = exclusiveMatch[1]
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let exclusiveCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.exclusiveOptions = filterOptions.exclusiveOptions ? [...filterOptions.exclusiveOptions, { id: value, name: text, value }] : [{ id: value, name: text, value }]
          exclusiveCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", exclusiveCount, "exclusive options")
    } else {
      console.log("🔍 Filter Options API: No exclusive select found")
    }

    // Enhanced veteran status parsing
    const veteranStatusPatterns = [
      /<select[^>]*name="veteranStatus"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Vv]eteran[Ss]tatus[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Vv]eteran[Ss]tatus[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let veteranStatusMatch = null
    for (const pattern of veteranStatusPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      veteranStatusMatch = pattern.exec(html)
      if (veteranStatusMatch) {
        console.log("🔍 Filter Options API: Found veteran status select with pattern:", pattern.source)
        break
      }
    }
    
    if (veteranStatusMatch && veteranStatusMatch[1]) {
      console.log("🔍 Filter Options API: Found veteran status select")
      const optionsHtml = veteranStatusMatch[1]
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let veteranStatusCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.veteranStatuses = filterOptions.veteranStatuses ? [...filterOptions.veteranStatuses, { id: value, name: text, value }] : [{ id: value, name: text, value }]
          veteranStatusCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", veteranStatusCount, "veteran statuses")
    } else {
      console.log("🔍 Filter Options API: No veteran status select found")
    }

    // Enhanced workflow parsing - look for flowActivation and workflow-related selects
    const workflowPatterns = [
      /<select[^>]*name="flowActivation"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Ww]orkflow[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Ff]low[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Ww]orkflow[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let workflowCount = 0
    for (const pattern of workflowPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      let workflowMatch
      while ((workflowMatch = pattern.exec(html)) !== null) {
        console.log("🔍 Filter Options API: Found workflow select with pattern:", pattern.source)
        if (workflowMatch[1]) {
          const optionsHtml = workflowMatch[1]
          const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
          let optionMatch
          
          while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
            const value = optionMatch[1].trim()
            const text = optionMatch[2].trim()
            
            if (value && value !== "" && value !== "-1" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select") && !text.toLowerCase().includes("no")) {
              // Avoid duplicates
              const exists = filterOptions.workflows.some(w => w.id === value && w.name === text)
              if (!exists) {
                filterOptions.workflows.push({
                  id: value,
                  name: text,
                  value: value
                })
                workflowCount++
              }
            }
          }
        }
      }
    }
    console.log("🔍 Filter Options API: Extracted", workflowCount, "workflow options")

    // Enhanced data channel parsing
    const dataChannelPatterns = [
      /<select[^>]*name="dataChannel"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*name="[^"]*[Dd]ata[Cc]hannel[^"]*"[^>]*>([\s\S]*?)<\/select>/gi,
      /<select[^>]*id="[^"]*[Dd]ata[Cc]hannel[^"]*"[^>]*>([\s\S]*?)<\/select>/gi
    ]
    
    let dataChannelMatch = null
    for (const pattern of dataChannelPatterns) {
      pattern.lastIndex = 0 // Reset regex state
      dataChannelMatch = pattern.exec(html)
      if (dataChannelMatch) {
        console.log("🔍 Filter Options API: Found data channel select with pattern:", pattern.source)
        break
      }
    }
    
    if (dataChannelMatch && dataChannelMatch[1]) {
      console.log("🔍 Filter Options API: Found data channel select")
      const optionsHtml = dataChannelMatch[1]
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch
      let dataChannelCount = 0
      
      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        if (value && value !== "" && !text.toLowerCase().includes("all") && !text.toLowerCase().includes("select")) {
          filterOptions.dataChannels.push({
            id: value,
            name: text,
            value: value
          })
          dataChannelCount++
        }
      }
      console.log("🔍 Filter Options API: Extracted", dataChannelCount, "data channels")
    } else {
      console.log("🔍 Filter Options API: No data channel select found")
    }

    console.log("🔍 Filter Options API: Final extraction summary:", {
      positions: filterOptions.positions.length,
      locations: filterOptions.locations.length,
      statuses: filterOptions.statuses.length,
      workPreferences: filterOptions.workPreferences.length,
      applicantTypes: filterOptions.applicantTypes.length,
      exclusiveOptions: filterOptions.exclusiveOptions.length,
      veteranStatuses: filterOptions.veteranStatuses.length,
      workflows: filterOptions.workflows.length,
      dataChannels: filterOptions.dataChannels.length
    })

    // ------------------------------------------------------------------
    // Parse <atao:displaySetValueList> custom tags for multiple filters
    // ------------------------------------------------------------------
    const listTagRegex = /<atao:displaySetValueList[^>]*setName="([^"]+)"[\s\S]*?<\/atao:displaySetValueList>/gi
    let listMatch: RegExpExecArray | null
    while ((listMatch = listTagRegex.exec(html)) !== null) {
      const setName = listMatch[1]
      const inner = listMatch[0]
      // Extract <option> tags inside the custom tag
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let opt: RegExpExecArray | null
      const options: FilterOption[] = []
      while ((opt = optionRegex.exec(inner)) !== null) {
        const value = opt[1].trim()
        const text = opt[2].trim()
        if (value === "" || text.toLowerCase().includes("all") || text === "-- All --") continue
        options.push({ id: value, name: text, value })
      }
      if (options.length === 0) continue
      switch (setName) {
        case 'JobBidStatusesForHMC':
          filterOptions.statuses = filterOptions.statuses ? [...filterOptions.statuses, ...options] : options
          break
        case 'WorkPreference':
          filterOptions.workPreferences = filterOptions.workPreferences ? [...filterOptions.workPreferences, ...options] : options
          break
        case 'ApplicantType':
          filterOptions.applicantTypes = filterOptions.applicantTypes ? [...filterOptions.applicantTypes, ...options] : options
          break
        case 'Exclusive':
          filterOptions.exclusiveOptions = filterOptions.exclusiveOptions ? [...filterOptions.exclusiveOptions, ...options] : options
          break
        case 'VeteranStatus':
          filterOptions.veteranStatuses = filterOptions.veteranStatuses ? [...filterOptions.veteranStatuses, ...options] : options
          break
        case 'DataChannels':
          filterOptions.dataChannels = filterOptions.dataChannels ? [...filterOptions.dataChannels, ...options] : options
          break
        default:
          break
      }
    }

  } catch (error) {
    console.error("🔍 Filter Options API: Error during HTML parsing:", error)
  }

  return filterOptions
}

interface FilterOption {
  id: string
  name: string
  value: string
}

interface FilterOptions {
  positions: FilterOption[]
  locations: FilterOption[]
  statuses: FilterOption[]
  workPreferences: FilterOption[]
  applicantTypes: FilterOption[]
  exclusiveOptions: FilterOption[]
  veteranStatuses: FilterOption[]
  workflows: FilterOption[]
  dataChannels: FilterOption[]
  bookmarks: FilterOption[]
}

// Add HEAD handler for completeness
export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
