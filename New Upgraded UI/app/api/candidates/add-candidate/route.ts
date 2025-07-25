import { NextRequest, NextResponse } from 'next/server'
import { validateLegacyAuth } from "@/lib/legacy-api-utils"

export async function POST(request: NextRequest) {
  try {
    // Validate authentication first
    const authResult = validateLegacyAuth(request);
    if (!authResult.isValid) {
      console.error('❌ Authentication failed:', authResult.error);
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('✅ Authentication successful, proceeding with candidate submission');
    

    
    // Step 1: Get CSRF token from addCandidate form page
    // const csrfTokenUrl = new URL('http://localhost:8080/atao/index.jsp')
    const csrfTokenUrl = new URL(`${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp`)
    csrfTokenUrl.searchParams.append('seq', 'addCandidate')
    csrfTokenUrl.searchParams.append('applicationName', 'ConsolidatedJAFTestClientdsiRAT')
    csrfTokenUrl.searchParams.append('locale', 'en_US')

    console.log('🔑 Getting CSRF token from:', csrfTokenUrl.toString())

    const csrfResponse = await fetch(csrfTokenUrl.toString(), {
      method: 'GET',
      headers: {
        'Cookie': authResult.cookieString,
        'X-App-Locator': 'ConsolidatedJAFTestClientdsiRAT',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      credentials: 'include'
    })

    if (!csrfResponse.ok) {
      console.error('❌ Failed to get CSRF token:', csrfResponse.status)
      return NextResponse.json(
        { error: 'Failed to get CSRF token' }, 
        { status: 500 }
      )
    }

    const csrfHtml = await csrfResponse.text()
    
    // Extract CSRF token from the form HTML
    const csrfTokenMatch = csrfHtml.match(/name="CSRF_TOKEN"\s+value="([^"]+)"/)
    if (!csrfTokenMatch) {
      console.error('❌ Could not find CSRF token in response')
      return NextResponse.json(
        { error: 'Could not find CSRF token' }, 
        { status: 500 }
      )
    }

    const csrfToken = csrfTokenMatch[1]
    console.log('🔑 CSRF token obtained:', csrfToken.substring(0, 10) + '...')
    
    // Extract relayData from the form HTML (dynamic value from backend)
    const relayDataMatch = csrfHtml.match(/name="relayData"\s+value="([^"]+)"/)
    let relayData = ''
    if (relayDataMatch) {
      relayData = relayDataMatch[1]
      console.log('🔗 RelayData obtained from backend:', relayData.substring(0, 50) + '...')
    } else {
      console.log('⚠️ No relayData found in form, using empty value')
    }
    console.log('🍪 Session cookies being used:', authResult.cookieString)
    console.log('🍪 Parsed cookies:', authResult.cookies)
    
    // Check if the CSRF token retrieval response indicates session is still valid
    if (csrfHtml.includes('<title>Login') || csrfHtml.includes('name="username"')) {
      console.log('❌ Session already expired during CSRF token retrieval')
      return NextResponse.json(
        { error: 'Session expired during CSRF token retrieval' }, 
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Extract the form data
    const {
      firstName,
      lastName,
      email,
      homePhone,
      address,
      apartment,
      city,
      state,
      zipCode,
      country,
      seekerSite,
      seq,
      applicationName,
      locale
    } = body

    // Validate required fields (matching JSP validation)
    if (!firstName || !lastName || !email || !state || !zipCode || !country || !seekerSite) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    // Transform data to JSP format using URLSearchParams (application/x-www-form-urlencoded)
    // instead of FormData (multipart/form-data) which might be causing the issue
    const jspFormData = new URLSearchParams()
    
    // Add JSP-specific parameters exactly as in your working example
    jspFormData.append('AnchorName_addCandidateForm', '')
    jspFormData.append('seq', 'addCandidate')
    jspFormData.append('relayData', relayData) // Use dynamic relayData from backend
    jspFormData.append('event', 'com.deploy.application.hmc.plugin.AddCandidate.save')
    jspFormData.append('validateData', 'false')
    jspFormData.append('skipRequiredCheck', 'true')
    
    // Resume file fields
    jspFormData.append('resumeFile', '')
    jspFormData.append('fileName', '')
    jspFormData.append('resumeDoc', '')
    jspFormData.append('selectResume', '')
    
    // Contact information exactly as in your working example
    jspFormData.append('TAOO_PersonContact_firstName', firstName)
    jspFormData.append('TAOO_PersonContact_lastName', lastName)
    jspFormData.append('TAOO_PersonContact_emailAddress', email)
    jspFormData.append('TAOO_PersonContact_address1', address || '')
    jspFormData.append('TAOO_PersonContact_address2', apartment || '')
    
    // Transform country to JSP format
    let jspCountry = 'Countries.USA'
    if (country === 'Canada') jspCountry = 'Countries.CA'
    else if (country === 'United Kingdom') jspCountry = 'Countries.GB'
    jspFormData.append('TAOO_PersonContact_country', jspCountry)
    
    // Add main city/state/zip/phone
    jspFormData.append('TAOO_PersonContact_city', city || '')
    
    // Transform state to JSP format
    let jspState = state
    if (state && state.length === 2) {
      jspState = `Countries.USA.States.${state}`
    }
    jspFormData.append('TAOO_PersonContact_state', jspState)
    
    jspFormData.append('TAOO_PersonContact_zipCode', zipCode)
    jspFormData.append('TAOO_PersonContact_homePhone', homePhone || '')
    
    // Add all the numbered fields exactly as in your working example
    jspFormData.append('TAOO_PersonContact_city_#$#_1', '')
    jspFormData.append('TAOO_PersonContact_state_#$#_34', '')
    jspFormData.append('TAOO_PersonContact_zipCode_#$#_1', '')
    jspFormData.append('TAOO_PersonContact_homePhone_#$#_1', '')
    jspFormData.append('TAOO_PersonContact_city_#$#_2', '')
    jspFormData.append('TAOO_PersonContact_state_#$#_37', '')
    jspFormData.append('TAOO_PersonContact_zipCode_#$#_2', '')
    jspFormData.append('TAOO_PersonContact_homePhone_#$#_2', '')
    jspFormData.append('TAOO_PersonContact_city_#$#_3', '')
    jspFormData.append('TAOO_PersonContact_state_#$#_40', '')
    jspFormData.append('TAOO_PersonContact_zipCode_#$#_3', '')
    jspFormData.append('TAOO_PersonContact_homePhone_#$#_3', '')
    jspFormData.append('TAOO_PersonContact_city_#$#_5', '')
    jspFormData.append('TAOO_PersonContact_state_#$#_46', '')
    jspFormData.append('TAOO_PersonContact_zipCode_#$#_4', '')
    jspFormData.append('TAOO_PersonContact_homePhone_#$#_5', '')
    
    // Add application locator based on seekerSite selection
    let applicationLocator = 'ConsolidatedJAFTestClientIrelandReqExt'
    if (seekerSite === 'application2') {
      applicationLocator = 'ConsoliJAFReqExternal'
    }
    jspFormData.append('applicationLocator', applicationLocator)
    
    // Add real CSRF token
    jspFormData.append('CSRF_TOKEN', csrfToken)

    // Build JSP URL exactly like makeLegacyRequest does (matching working patterns)
    const jspUrl = new URL('http://localhost:8080/atao/index.jsp')
    jspUrl.searchParams.append('applicationName', applicationName)
    jspUrl.searchParams.append('locale', locale)

    console.log('🚀 Calling JSP backend:', jspUrl.toString())
    console.log('📋 Form data being sent:', Object.fromEntries(jspFormData.entries()))
    console.log('📋 Form data as string:', jspFormData.toString())

    // Extract session cookies manually like working examples
    const sessionId = authResult.cookies.JSESSIONID
    const intToken = authResult.cookies.ConsolidatedJAFTestClientINT
    
    if (!sessionId || !intToken) {
      console.log('❌ Missing required session cookies:', { sessionId: !!sessionId, intToken: !!intToken })
      return NextResponse.json(
        { error: 'Missing session cookies' }, 
        { status: 401 }
      )
    }

    // Make the actual call to JSP backend using same pattern as working hires POST
    const jspResponse = await fetch(jspUrl.toString(), {
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
      body: jspFormData.toString(),
      credentials: 'include'
    })

    console.log('📡 JSP Response Status:', jspResponse.status, jspResponse.statusText)

    if (!jspResponse.ok) {
      const errorText = await jspResponse.text()
      console.error('❌ JSP backend error:', errorText.substring(0, 500))
      return NextResponse.json(
        { error: `JSP backend error: ${jspResponse.status}`, details: errorText.substring(0, 500) }, 
        { status: jspResponse.status }
      )
    }

    // Get the response from JSP
    const jspResponseText = await jspResponse.text()
    console.log('✅ JSP Response received (first 200 chars):', jspResponseText.substring(0, 200))
    
    // Check if this is a login page redirect
    const isLoginRedirect = jspResponseText.includes('<title>Login') || 
                           jspResponseText.includes('login.jsp') || 
                           jspResponseText.includes('name="username"') || 
                           jspResponseText.includes('name="password"')
    
    if (isLoginRedirect) {
      console.log('❌ DETECTED LOGIN PAGE REDIRECT')
      console.log('🔍 Response status:', jspResponse.status)
      console.log('🔍 Response headers:', Object.fromEntries(jspResponse.headers.entries()))
      console.log('🔍 Response body (first 1000 chars):', jspResponseText.substring(0, 1000))
      
      return NextResponse.json(
        { 
          error: 'Authentication failed - redirected to login page',
          debug: {
            status: jspResponse.status,
            headers: Object.fromEntries(jspResponse.headers.entries()),
            bodyPreview: jspResponseText.substring(0, 500)
          }
        }, 
        { status: 401 }
      )
    }

    // Check if response contains success indicators
    const isSuccess = jspResponseText.includes('APPLICANTID=') || 
                     jspResponseText.includes('candidateProfileResume') ||
                     jspResponseText.includes('SEQ=candidateProfileResume') ||
                     (jspResponse.status === 200 && !jspResponseText.includes('error'))

    if (isSuccess) {
      // Extract applicant ID if available
      const applicantIdMatch = jspResponseText.match(/APPLICANTID=(\d+)/)
      const applicantId = applicantIdMatch ? applicantIdMatch[1] : null

      // Extract redirect URL if available
      const redirectMatch = jspResponseText.match(/location\.href\s*=\s*['"]([^'"]+)['"]/) ||
                           jspResponseText.match(/window\.location\s*=\s*['"]([^'"]+)['"]/)
      const redirectUrl = redirectMatch ? redirectMatch[1] : null

      console.log('🎉 Success! Applicant ID:', applicantId)

    return NextResponse.json({
      success: true,
        message: 'Candidate added successfully to JSP backend',
        applicantId,
        redirectUrl,
        jspResponse: jspResponseText.substring(0, 1000) // First 1000 chars for debugging
      })
    } else {
      console.log('⚠️ JSP processing may have failed')
    return NextResponse.json(
        { 
          error: 'JSP backend processing failed', 
          details: jspResponseText.substring(0, 1000),
          fullResponse: jspResponseText
        }, 
      { status: 500 }
    )
  }

  } catch (error) {
    console.error('💥 Error calling JSP backend:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { error: 'Failed to communicate with JSP backend', details: errorMessage }, 
      { status: 500 }
    )
  }
}

// Handle JSP-style GET requests with parameters
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const seq = searchParams.get('seq')
  const applicationName = searchParams.get('applicationName')
  const locale = searchParams.get('locale')

  if (seq === 'addCandidate') {
    // Return form configuration similar to JSP
    return NextResponse.json({
      formConfig: {
        applicationName,
        locale,
        fields: {
          firstName: { required: true },
          lastName: { required: true },
          email: { required: true },
          state: { required: true },
          zipCode: { required: true },
          country: { required: true },
          seekerSite: { required: true }
        }
      }
    })
  }

  return NextResponse.json({ error: 'Invalid sequence' }, { status: 400 })
}
