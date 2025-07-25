import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  console.log('🔍 Auth status check - authentication bypassed, always returning authenticated');
  
  // Always return authenticated status
  return NextResponse.json({ 
    isAuthenticated: true,
    user: {
      id: 'bypass-user-1',
      name: 'Bypass User',
      email: 'bypass@example.com'
    },
    message: 'Authentication bypassed'
  });
}
