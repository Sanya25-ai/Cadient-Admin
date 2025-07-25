import { NextRequest, NextResponse } from "next/server"

interface FilterOption {
  id: string
  name: string
  value: string
}

interface RequisitionsFilterOptions {
  [filterName: string]: FilterOption[]
}

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Requisitions Filter Options API: API called")
    
    // Get cookies from the request - same pattern as working APIs
    const cookieHeader = request.headers.get('cookie') || '';
    console.log('🍪 Requisitions Filter Options API: Cookie header:', cookieHeader ? 'present' : 'missing');

    if (!cookieHeader) {
      console.log('❌ Requisitions Filter Options API: Missing cookie header');
      return NextResponse.json({ 
        error: 'Authentication required'
      }, { status: 401 });
    }

    // Call the legacy system to get the initial requisitions search page
    // This loads the form with all the filter options populated
    const legacyUrl = "http://localhost:8080/atao/index.jsp"
    const queryParams = new URLSearchParams({
      seq: 'reqSearch',
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      locale: 'en_US'
    });

    const fullUrl = legacyUrl + "?" + queryParams.toString()
    
    console.log("🔍 Requisitions Filter Options API: Calling legacy URL:", fullUrl)

    // Forward the request to the legacy system
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Cookie": cookieHeader,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      credentials: "include"
    })

    console.log("🔍 Requisitions Filter Options API: Legacy response status:", response.status)

    if (!response.ok) {
      console.log('❌ Requisitions Filter Options API: Response not OK:', response.status, response.statusText);
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({ 
          error: 'Authentication failed. Please log in again.'
        }, { status: 401 });
      }
      
      return NextResponse.json({ 
        error: 'Failed to fetch data from legacy system'
      }, { status: 500 });
    }

    // Get the response data
    const data = await response.text()
    console.log("🔍 Requisitions Filter Options API: Legacy response length:", data.length)
    
    // Check if we got redirected to login
    const isLoginPage = data.includes('seq=login') || 
                       data.includes('authentication required') || 
                       data.includes('Please log in') ||
                       data.includes("<title>Login") || 
                       data.includes("login.jsp") || 
                       data.includes('name="username"') || 
                       data.includes('name="password"')
    
    if (isLoginPage) {
      console.log("🔍 Requisitions Filter Options API: Detected login page - session expired")
      return NextResponse.json({ error: "Authentication failed. Please log in again." }, { status: 401 })
    }

    // Parse the HTML to extract filter options
    const filterOptions = parseRequisitionsFilterOptionsFromHTML(data)
    
    console.log("🔍 Requisitions Filter Options API: Extracted filter options:", {
      categories: filterOptions.categories?.length || 0,
      locations: filterOptions.locations?.length || 0,
      statuses: filterOptions.statuses?.length || 0,
      recruiters: filterOptions.recruiters?.length || 0,
      showRequisitionsOptions: filterOptions.showRequisitionsOptions?.length || 0
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
    console.error("Error in requisitions filter options API:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

/**
 * Parse filter options from the legacy HTML response for requisitions
 * This dynamically extracts any filter parameters found in the HTML
 */
function parseRequisitionsFilterOptionsFromHTML(html: string): RequisitionsFilterOptions {
  const filterOptions: RequisitionsFilterOptions = {}

  try {
    console.log("🔍 Requisitions Filter Options API: Starting dynamic HTML parsing...")
    console.log("🔍 Requisitions Filter Options API: HTML length:", html.length)

    // Debug: Look for specific field patterns in the HTML
    const debugFields = ['userLocation', 'firstName', 'lastName', 'recruiterInput']
    debugFields.forEach(field => {
      const regex = new RegExp(`name="${field}"`, 'gi')
      const matches = html.match(regex)
      console.log(`🔍 Requisitions Filter Options API: Field "${field}" found ${matches ? matches.length : 0} times`)
      
      if (matches) {
        // Find the context around each match
        const contextRegex = new RegExp(`.{0,100}name="${field}".{0,100}`, 'gi')
        const contexts = html.match(contextRegex)
        contexts?.forEach((context, index) => {
          console.log(`🔍 Requisitions Filter Options API: Context ${index + 1} for "${field}":`, context)
        })
      }
    })

    // Look for all select elements in the HTML
    const allSelectMatches = html.match(/<select[^>]*>[\s\S]*?<\/select>/gi) || []
    console.log("🔍 Requisitions Filter Options API: Found", allSelectMatches.length, "total select elements")
    
    // Map of known field names to their display names
    const fieldNameMapping: Record<string, string> = {
      'jobCategory': 'categories',
      'userLocation': 'locations', 
      'requisitionStatus': 'statuses',
      'recruiterInput': 'recruiters',
      'showAllReqs': 'showRequisitionsOptions',
      'requisitionNumber': 'requisitionNumber',
      'title': 'jobTitle',
      'firstName': 'creatorFirstName',
      'lastName': 'creatorLastName'
    }

    // Whitelist of legitimate filter field names (case-insensitive)
    const allowedFilterFields = [
      'jobCategory',
      'userLocation', 
      'requisitionStatus',
      'recruiterInput',
      'showAllReqs',
      'requisitionNumber',
      'title',
      'firstName',
      'lastName'
      // Add any other legitimate filter fields here
    ]

    // Parse each select element
    allSelectMatches.forEach((selectHtml, index) => {
      const nameMatch = selectHtml.match(/name="([^"]*)"/)
      const idMatch = selectHtml.match(/id="([^"]*)"/)
      const fieldName = nameMatch ? nameMatch[1] : (idMatch ? idMatch[1] : null)
      
      if (!fieldName) {
        console.log(`🔍 Requisitions Filter Options API: Select ${index + 1}: No name or id found`)
        return
      }

      console.log(`🔍 Requisitions Filter Options API: Select ${index + 1}: Processing field "${fieldName}"`)

      // Skip internal/control fields that are not user-facing filters
      const isInternalField = (
        fieldName.toLowerCase().includes('flag') ||
        fieldName.toLowerCase().includes('form') ||
        fieldName.toLowerCase().includes('anchor') ||
        fieldName.toLowerCase().includes('application') ||
        fieldName.toLowerCase().includes('searchtext') ||
        fieldName.toLowerCase().includes('searchbox') ||
        fieldName.toLowerCase().includes('entered') ||
        fieldName.toLowerCase().includes('val') ||
        fieldName.toLowerCase().includes('quicksearchtype') ||
        fieldName.toLowerCase().includes('reporttype') ||
        fieldName.toLowerCase().startsWith('search') && !fieldName.toLowerCase().includes('type')
      )
      
      if (isInternalField) {
        console.log(`🔍 Requisitions Filter Options API: Skipping internal select field "${fieldName}"`)
        return
      }
      
      // Check if this field is in our whitelist of allowed filter fields
      const isAllowedField = allowedFilterFields.some(allowed => 
        allowed.toLowerCase() === fieldName.toLowerCase()
      )
      
      if (!isAllowedField) {
        console.log(`🔍 Requisitions Filter Options API: Skipping non-whitelisted select field "${fieldName}"`)
        return
      }

      // Get the display name for this field
      const displayName = fieldNameMapping[fieldName] || fieldName

      // Extract options from this select
      const optionsHtml = selectHtml.match(/<select[^>]*>([\s\S]*?)<\/select>/i)?.[1]
      if (!optionsHtml) {
        console.log(`🔍 Requisitions Filter Options API: No options found for field "${fieldName}"`)
        return
      }

      const options: FilterOption[] = []
      const optionRegex = /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      let optionMatch

      while ((optionMatch = optionRegex.exec(optionsHtml)) !== null) {
        const value = optionMatch[1].trim()
        const text = optionMatch[2].trim()
        
        // Skip empty values and generic "all" options for most fields
        if (text && !text.toLowerCase().includes("select")) {
          // Special handling for status field to map display names
          let displayText = text
          let optionValue = value
          
          if (fieldName === 'requisitionStatus') {
            if (value === "RequisitionStatuses.Open") {
              displayText = "Active"
              optionValue = "RequisitionStatuses.Open"
            } else if (value === "RequisitionStatuses.Closed") {
              displayText = "Inactive"
              optionValue = "RequisitionStatuses.Closed"
            } else if (value === "" || text.toLowerCase().includes("all")) {
              displayText = "All"
              optionValue = "__ALL__" // Use special value instead of empty string
            } else {
              optionValue = value
            }
          }
          // Special handling for showAllReqs field
          else if (fieldName === 'showAllReqs') {
            if (value === "ShowAllRequisitions.Yours") {
              displayText = "Yours"
              optionValue = "ShowAllRequisitions.Yours"
            } else if (value === "ShowAllRequisitions.All") {
              displayText = "All"
              optionValue = "ShowAllRequisitions.All"
            } else if (value === "ShowAllRequisitions.Team") {
              displayText = "Team"
              optionValue = "ShowAllRequisitions.Team"
            } else {
              optionValue = value
            }
          }
          // For other fields, skip if value is empty
          else if (value && value !== "") {
            optionValue = value
          } else {
            continue // Skip this option if value is empty
          }

          // Only add if we have a valid value
          if (optionValue && optionValue !== "") {
            options.push({
              id: optionValue,
              name: displayText,
              value: optionValue
            })
          }
        }
      }

      if (options.length > 0) {
        filterOptions[displayName] = options
        console.log(`🔍 Requisitions Filter Options API: Extracted ${options.length} options for "${displayName}"`)
      } else {
        // Even if no options, include empty array to indicate the field exists
        filterOptions[displayName] = []
        console.log(`🔍 Requisitions Filter Options API: Field "${displayName}" exists but has no options`)
      }
    })

    // Parse Recruiters from RECRUITERSARRAY in JavaScript (special case)
    const recruitersArrayMatch = html.match(/"RECRUITERSARRAY":"([^"]*)"/)
    if (recruitersArrayMatch && recruitersArrayMatch[1]) {
      console.log("🔍 Requisitions Filter Options API: Found RECRUITERSARRAY")
      const recruitersString = recruitersArrayMatch[1]
      
      try {
        const recruitersArray = recruitersString.split('", "').map(recruiter => {
          return recruiter.replace(/^"/, '').replace(/"$/, '').replace(/\\"/g, '"')
        })
        
        const recruiterOptions: FilterOption[] = []
        recruitersArray.forEach((recruiterStr) => {
          const match = recruiterStr.match(/^(.+?)\s*\(([^)]+)\)$/)
          if (match) {
            const name = match[1].trim()
            const email = match[2].trim()
            
            recruiterOptions.push({
              id: email,
              name: name,
              value: email
            })
          }
        })
        
        if (recruiterOptions.length > 0) {
          filterOptions['recruiters'] = recruiterOptions
          console.log("🔍 Requisitions Filter Options API: Extracted", recruiterOptions.length, "recruiters from RECRUITERSARRAY")
        }
      } catch (error) {
        console.error("🔍 Requisitions Filter Options API: Error parsing RECRUITERSARRAY:", error)
      }
    }

    // Look for ALL input fields (more comprehensive search)
    const inputMatches = html.match(/<input[^>]*>/gi) || []
    console.log("🔍 Requisitions Filter Options API: Found", inputMatches.length, "input elements")
    
    inputMatches.forEach((inputHtml, index) => {
      const nameMatch = inputHtml.match(/name="([^"]*)"/)
      const typeMatch = inputHtml.match(/type="([^"]*)"/)
      const idMatch = inputHtml.match(/id="([^"]*)"/)
      
      if (nameMatch) {
        const fieldName = nameMatch[1]
        const inputType = typeMatch ? typeMatch[1] : 'text'
        const fieldId = idMatch ? idMatch[1] : ''
        
        console.log(`🔍 Requisitions Filter Options API: Input ${index + 1}: name="${fieldName}", type="${inputType}", id="${fieldId}"`)
        
        // Skip internal/control fields that are not user-facing filters
        const isInternalField = (
          inputType === 'hidden' ||
          inputType === 'submit' ||
          inputType === 'button' ||
          fieldName.toLowerCase().includes('flag') ||
          fieldName.toLowerCase().includes('form') ||
          fieldName.toLowerCase().includes('anchor') ||
          fieldName.toLowerCase().includes('application') ||
          fieldName.toLowerCase().includes('searchtext') ||
          fieldName.toLowerCase().includes('searchbox') ||
          fieldName.toLowerCase().includes('entered') ||
          fieldName.toLowerCase().includes('val') ||
          fieldName.toLowerCase().includes('quicksearchtype') ||
          fieldName.toLowerCase().startsWith('search') && !fieldName.toLowerCase().includes('type')
        )
        
        if (isInternalField) {
          console.log(`🔍 Requisitions Filter Options API: Skipping internal field "${fieldName}" (type: ${inputType})`)
          return
        }
        
        // Include only relevant input types for user filters
        if (inputType === 'text' || inputType === 'search' || inputType === 'email') {
          // Check if this field is in our whitelist of allowed filter fields
          const isAllowedField = allowedFilterFields.some(allowed => 
            allowed.toLowerCase() === fieldName.toLowerCase()
          )
          
          if (isAllowedField) {
            const displayName = fieldNameMapping[fieldName] || fieldName
            
            // Only add if not already added from select elements
            if (!filterOptions[displayName]) {
              filterOptions[displayName] = [] // Empty array indicates text input field
              console.log(`🔍 Requisitions Filter Options API: Added whitelisted text input field "${displayName}" (${fieldName})`)
            }
          } else {
            console.log(`🔍 Requisitions Filter Options API: Skipping non-whitelisted field "${fieldName}"`)
          }
        }
      }
    })

    // Look for custom form elements and other potential filter fields
    // Search for any element with name attribute that might be a filter
    const allNamedElements = html.match(/name="([^"]*)"[^>]*>/gi) || []
    console.log("🔍 Requisitions Filter Options API: Found", allNamedElements.length, "elements with name attributes")
    
    allNamedElements.forEach((elementHtml, index) => {
      const nameMatch = elementHtml.match(/name="([^"]*)"/)
      if (nameMatch) {
        const fieldName = nameMatch[1]
        const displayName = fieldNameMapping[fieldName] || fieldName
        
        // Skip internal/control fields
        const isInternalField = (
          fieldName.toLowerCase().includes('flag') ||
          fieldName.toLowerCase().includes('form') ||
          fieldName.toLowerCase().includes('anchor') ||
          fieldName.toLowerCase().includes('application') ||
          fieldName.toLowerCase().includes('searchtext') ||
          fieldName.toLowerCase().includes('searchbox') ||
          fieldName.toLowerCase().includes('entered') ||
          fieldName.toLowerCase().includes('val') ||
          fieldName.toLowerCase().includes('quicksearchtype') ||
          fieldName.toLowerCase().startsWith('search') && !fieldName.toLowerCase().includes('type')
        )
        
        if (isInternalField) {
          console.log(`🔍 Requisitions Filter Options API: Skipping internal named element "${fieldName}"`)
          return
        }
        
        // Skip if we already processed this field
        if (!filterOptions[displayName]) {
          // Check if this field is in our whitelist of allowed filter fields
          const isAllowedField = allowedFilterFields.some(allowed => 
            allowed.toLowerCase() === fieldName.toLowerCase()
          )
          
          if (isAllowedField) {
            filterOptions[displayName] = [] // Empty array indicates input field
            console.log(`🔍 Requisitions Filter Options API: Added whitelisted potential filter field "${displayName}" (${fieldName})`)
          } else {
            console.log(`🔍 Requisitions Filter Options API: Skipping non-whitelisted named element "${fieldName}"`)
          }
        }
      }
    })

    // Ensure specific fields are always included if they exist in the form
    const requiredFields = [
      'userLocation',
      'firstName', 
      'lastName',
      'recruiterInput',
      'requisitionNumber',
      'title'
    ]
    
    requiredFields.forEach(fieldName => {
      const displayName = fieldNameMapping[fieldName] || fieldName
      
      // Check if this field exists in the HTML but wasn't captured
      const fieldRegex = new RegExp(`name="${fieldName}"`, 'i')
      if (fieldRegex.test(html) && !filterOptions[displayName]) {
        filterOptions[displayName] = []
        console.log(`🔍 Requisitions Filter Options API: Added required field "${displayName}" (${fieldName})`)
      }
    })

    console.log("🔍 Requisitions Filter Options API: Final filter options:", {
      totalFilters: Object.keys(filterOptions).length,
      filterNames: Object.keys(filterOptions),
      filterCounts: Object.entries(filterOptions).reduce((acc, [key, value]) => {
        acc[key] = value?.length || 0
        return acc
      }, {} as Record<string, number>)
    })

    return filterOptions

  } catch (error) {
    console.error("🔍 Requisitions Filter Options API: Error parsing HTML:", error)
    
    // Return empty object on error - let the frontend handle it
    return {}
  }
}

// Add DELETE method to clear cache
export async function DELETE(request: NextRequest) {
  try {
    // Import the cache service
    const { requisitionsFilterCache } = await import('@/lib/requisitions-filter-cache')
    
    // Clear the cache
    requisitionsFilterCache.clearCache()
    
    return NextResponse.json({ success: true, message: 'Cache cleared successfully' })
  } catch (error) {
    console.error("🔍 Requisitions Filter Options API: Error clearing cache:", error)
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}
