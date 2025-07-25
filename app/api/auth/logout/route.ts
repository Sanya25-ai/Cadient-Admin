import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    console.log('🚪 Logout request received');

    // Get cookies from the request
    const jsessionid = request.cookies.get('JSESSIONID')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value;

    // Try to call ATAO logout endpoint if we have valid cookies
    if (jsessionid && consolidatedCookie) {
      try {
        await fetch('http://localhost:8080/atao/index.jsp?seq=logout', {
          headers: {
            'Cookie': `JSESSIONID=${jsessionid}; ConsolidatedJAFTestClientINT=${consolidatedCookie}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
        });
        console.log('✅ ATAO logout called');
      } catch (error) {
        console.error('⚠️ ATAO logout failed (continuing anyway):', error);
      }
    }

    // Create response with cleared cookies
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully'
    });

    // Clear authentication cookies
    response.cookies.set('JSESSIONID', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true
    });

    response.cookies.set('ConsolidatedJAFTestClientINT', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true
    });

    console.log('✅ Logout completed - cookies cleared');
    return response;

  } catch (error) {
    console.error('❌ Error in logout:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Logout error'
    }, { status: 500 });
  }
}
