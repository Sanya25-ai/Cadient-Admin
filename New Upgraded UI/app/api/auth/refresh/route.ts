import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Get cookies from the request
    const jsessionid = request.cookies.get('JSESSIONID')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value;
    
    console.log('🔄 Session refresh - cookies present:', { 
      jsessionid: !!jsessionid,
      consolidatedCookie: !!consolidatedCookie
    });

    if (!jsessionid || !consolidatedCookie) {
      return NextResponse.json({ 
        isAuthenticated: false,
        message: 'Missing authentication cookies'
      }, { status: 401 });
    }

    // Make a lightweight request to ATAO to refresh the session
    try {
      const response = await fetch('http://localhost:8080/atao/index.jsp?seq=dashboard', {
        headers: {
          'Cookie': `JSESSIONID=${jsessionid}; ConsolidatedJAFTestClientINT=${consolidatedCookie}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
      });

      if (response.ok) {
        const html = await response.text();
        
        // Check if we're redirected to login (indicates invalid session)
        if (html.includes('login') || html.includes('Login') || html.includes('authentication')) {
          console.log('❌ Session refresh failed - redirected to login');
          return NextResponse.json({ 
            isAuthenticated: false,
            message: 'Session expired'
          }, { status: 401 });
        }

        // Session refreshed successfully
        console.log('✅ Session refreshed successfully');
        
        // Relay any updated cookies from ATAO
        const responseHeaders = new Headers();
        const legacySetCookie = response.headers.get("set-cookie");
        if (legacySetCookie) {
          responseHeaders.set("set-cookie", legacySetCookie);
        }

        return NextResponse.json({ 
          isAuthenticated: true,
          message: 'Session refreshed'
        }, { headers: responseHeaders });
      } else {
        console.log('❌ ATAO refresh request failed:', response.status);
        return NextResponse.json({ 
          isAuthenticated: false,
          message: 'Session refresh failed'
        }, { status: 401 });
      }
    } catch (error) {
      console.error('❌ Error refreshing session with ATAO:', error);
      return NextResponse.json({ 
        isAuthenticated: false,
        message: 'Session refresh error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Error in session refresh:', error);
    return NextResponse.json({ 
      isAuthenticated: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
