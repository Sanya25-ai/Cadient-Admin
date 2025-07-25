import { NextRequest, NextResponse } from "next/server";
import type { Prospect } from "@/lib/types";
import { getProspectsData } from "@/lib/data";

export const dynamic = "force-dynamic"; 

export async function GET(req: NextRequest) {
  try {
    console.log('🚀 Fetching prospects data using shared function');
    
    // Use the shared function from data.ts
    const prospects = await getProspectsData();
    
    console.log(`✅ Successfully fetched ${prospects.length} prospects`);
    
    return NextResponse.json(prospects, {
      headers: {
        'X-Data-Source': 'legacy-system-shared'
      }
    });
    
  } catch (error) {
    console.error("❌ Error fetching prospects:", error);
    
    // Fall back to mock data
    try {
      const { getProspects } = await import("@/lib/data");
      const fallbackProspects = await getProspects();
      
      return NextResponse.json(fallbackProspects, {
        headers: {
          'X-Data-Source': 'mock-error-fallback'
        }
      });
    } catch (mockError) {
      console.error("❌ Error loading mock data:", mockError);
      return NextResponse.json(
        { error: "Failed to fetch prospects" },
        { status: 500 }
      );
    }
  }
}
