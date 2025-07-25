import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log("🛡️ Middleware checking path:", pathname, " - Authentication disabled, allowing access");

  // Authentication disabled - allow all requests
  console.log("✅ Authentication disabled - allowing access to all paths");

  // Add headers for API requests to the legacy backend
  if (pathname.startsWith('/api/applications') || pathname.startsWith('/api/job-templates')) {
    console.log("🔧 Adding headers for legacy API request");
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)
    
    // Add application locator header if not already present
    if (!requestHeaders.has('X-App-Locator')) {
      requestHeaders.set('X-App-Locator', 'ConsolidatedJAFTestClientdsiRAT')
    }
    
    // Forward the request with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

/* Match every route except static files handled above */
export const config = {
  matcher: "/((?!static).*)",
}
