import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // never cache

export async function GET(req: NextRequest) {
  // Use traditional JSP logout approach
  const cookie = req.headers.get("cookie") ?? "";

  const logoutUrl = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?` +
    `logout=1&` +
    `applicationName=ConsolidatedJAFTestClientdsiRAT&` +
    `locale=en_US`;

  try {
    const res = await fetch(logoutUrl, {
      method: "GET",
      headers: {
        cookie,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      credentials: "include",
      redirect: "manual", // Handle redirects manually
    });

    const legacySetCookie = res.headers.get("set-cookie");

    // Create success response
    const response = NextResponse.json({ 
      success: true, 
      status: "logged_out",
      message: "Successfully logged out" 
    }, { status: 200 });

    // Propagate legacy cookie deletion to browser
    if (legacySetCookie) {
      response.headers.set("set-cookie", legacySetCookie);
    }

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ 
      success: false, 
      status: "error",
      message: "Logout failed" 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Reuse GET handler logic for POST requests
  return GET(req);
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
