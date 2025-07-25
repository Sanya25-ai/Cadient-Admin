import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // disable caching

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log("🔐 JSP Login attempt for user:", username);

    if (!username || !password) {
      console.log("❌ Missing credentials");
      return NextResponse.json(
        { status: "error", message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Step 1: Get the login page to obtain CSRF token and initial session cookie
    const loginPageUrl = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?` +
      `locale=en_US&` +
      `applicationName=ConsolidatedJAFTestClientdsiRAT&` +
      `seq=login&` +
      `referralURL=deviceMode%3Ddesktop%26locale%3Den_US%26applicationName%3DConsolidatedJAFTestClientdsiRAT%26seq%3Dhomepage.hybrid&` +
      `deviceMode=desktop&` +
      `notAuthorized=true`;

    console.log("📄 Step 1: Fetching login page:", loginPageUrl);

    const loginPageResponse = await fetch(loginPageUrl, {
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

    console.log("📄 Login page response status:", loginPageResponse.status);
    console.log("📄 Login page response headers:", Object.fromEntries(loginPageResponse.headers.entries()));

    if (!loginPageResponse.ok) {
      console.log("❌ Failed to get login page:", loginPageResponse.status);
      return NextResponse.json(
        { status: "error", message: `Failed to get login page: ${loginPageResponse.status}` },
        { status: 500 }
      );
    }

    // Get the session cookie from the response
    const cookies = loginPageResponse.headers.get('set-cookie');
    console.log("🍪 Initial session cookies received:", cookies);
    
    if (!cookies) {
      console.log("❌ No session cookie received from login page");
      return NextResponse.json(
        { status: "error", message: "No session cookie received from login page" },
        { status: 500 }
      );
    }

    // Extract CSRF token from the response HTML
    const html = await loginPageResponse.text();
    console.log("📝 Login page HTML length:", html.length);
    
    const csrfTokenMatch = html.match(/name="CSRF_TOKEN" value="([^"]+)"/);
    if (!csrfTokenMatch) {
      console.log("❌ Could not find CSRF token in login page");
      console.log("📝 HTML snippet around CSRF:", html.substring(html.indexOf('CSRF') - 100, html.indexOf('CSRF') + 200));
      return NextResponse.json(
        { status: "error", message: "Could not find CSRF token in login page" },
        { status: 500 }
      );
    }
    const csrfToken = csrfTokenMatch[1];
    console.log("🔑 CSRF token extracted:", csrfToken);

    // Step 2: Perform the login with form data
    const formData = new URLSearchParams();
    formData.append('seq', 'login');
    formData.append('applicationName', 'ConsolidatedJAFTestClientdsiRAT');
    formData.append('locale', 'en_US');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('CSRF_TOKEN', csrfToken);
    formData.append('event', 'com.deploy.application.hmc.plugin.HMCLogin.userLogin');

    console.log("🚀 Step 2: Submitting login credentials");
    console.log("📋 Form data:", Object.fromEntries(formData.entries()));

    const loginResponse = await fetch(`${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Origin': process.env.LEGACY_BASE || "http://localhost:8080/atao",
        'Connection': 'keep-alive',
        'Referer': loginPageUrl,
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

    console.log("🚀 Login submission response status:", loginResponse.status);
    console.log("🚀 Login submission response headers:", Object.fromEntries(loginResponse.headers.entries()));

    // Step 3: Check if login was successful
    const location = loginResponse.headers.get('location');
    console.log("📍 Redirect location:", location);
    
    // If redirected back to login page, authentication failed
    if (location && location.includes('seq=login')) {
      console.log("❌ Authentication failed - redirected back to login");
      return NextResponse.json(
        { status: "error", message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Get the new session cookie from the response
    const newCookies = loginResponse.headers.get('set-cookie');
    console.log("🍪 New session cookies after login:", newCookies);
    
    if (!newCookies) {
      console.log("❌ No session cookie received after login");
      return NextResponse.json(
        { status: "error", message: "No session cookie received after login" },
        { status: 500 }
      );
    }

    // Extract JSESSIONID for logging
    const jsessionMatch = newCookies.match(/JSESSIONID=([^;]+)/);
    if (jsessionMatch) {
      console.log("🔑 JSESSIONID extracted:", jsessionMatch[1]);
    }

    // Step 4: Verify the session is valid by making a test request
    const testUrl = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?` +
      `seq=applicantGrid&` +
      `applicationName=ConsolidatedJAFTestClientdsiRAT&` +
      `locale=en_US`;
    
    console.log("✅ Step 4: Validating session with test request:", testUrl);

    const testResponse = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Cookie': newCookies,
        'Upgrade-Insecure-Requests': '1'
      },
      redirect: 'manual'
    });

    console.log("✅ Session validation response status:", testResponse.status);
    console.log("✅ Session validation response headers:", Object.fromEntries(testResponse.headers.entries()));

    // If redirected to login, session validation failed
    if (testResponse.status === 302 && testResponse.headers.get('location')?.includes('seq=login')) {
      console.log("❌ Session validation failed - redirected to login");
      return NextResponse.json(
        { status: "error", message: "Session validation failed" },
        { status: 500 }
      );
    }

    // Step 5: Return success response with session cookie
    console.log("🎉 Authentication successful! Creating response with session cookie");
    
    const response = NextResponse.json({ 
      status: "success",
      sessionInfo: {
        jsessionId: jsessionMatch ? jsessionMatch[1] : "not_found",
        cookieCount: newCookies.split(',').length
      }
    });
    
    // ------------------------------------------------------------------
    // Propagate ALL important cookies (JSESSIONID + INT token) to browser
    // ------------------------------------------------------------------
    if (newCookies) {
      // Helper to safely add multiple Set-Cookie headers
      const appendCookie = (cookieStr: string) => {
        if (!response.headers.has("set-cookie")) {
          response.headers.set("set-cookie", cookieStr);
        } else {
          response.headers.append("set-cookie", cookieStr);
        }
      };

      // 1) JSESSIONID
      if (jsessionMatch) {
        const jsessionId = jsessionMatch[1];
        const cookieValue = `JSESSIONID=${jsessionId}; Path=/; SameSite=Lax`;
        appendCookie(cookieValue);
        console.log("🍪 Session cookie set with corrected path:", cookieValue);
      }

      // 2) ConsolidatedJAFTestClientINT – contains CSRF/token needed by ATAO
      const intMatch = newCookies.match(/ConsolidatedJAFTestClientINT=([^;,]+)/);
      if (intMatch) {
        const intVal = intMatch[1];
        const intCookie = `ConsolidatedJAFTestClientINT=${intVal}; Path=/; SameSite=Lax`;
        appendCookie(intCookie);
        console.log("🍪 INT token cookie set with corrected path:", intCookie);
      } else {
        console.log("⚠️ ConsolidatedJAFTestClientINT cookie not found in response");
      }
    }

    console.log("✅ Login flow completed successfully");
    return response;

  } catch (error) {
    console.error('❌ JSP Login error:', error);
    return NextResponse.json(
      { status: "error", message: "Authentication failed" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
