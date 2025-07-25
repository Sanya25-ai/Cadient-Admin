import { NextRequest, NextResponse } from "next/server";
import type { Prospect } from "@/lib/types";
import { getProspectBookmarks } from "@/lib/data";

export const dynamic = "force-dynamic"; 

export async function GET(req: NextRequest) {
  try {
    console.log('🚀 Fetching prospect bookmarks data using shared function');
    
    // Use the shared function from data.ts
    const prospects = await getProspectBookmarks();
    
    console.log(`✅ Successfully fetched ${prospects.length} prospect bookmarks`);
    
    return NextResponse.json(prospects, {
      headers: {
        'X-Data-Source': 'legacy-system-shared'
      }
    });
    
  } catch (error) {
    console.error("❌ Error fetching prospect bookmarks:", error);
    
    // Fall back to mock data
    try {
      // Generate mock prospect bookmarks data
      const mockProspects: Prospect[] = [
        {
          id: "1",
          name: "John Doe",
          source: "LinkedIn",
          potentialPosition: "Software Engineer",
          location: "San Francisco, CA",
          status: "New Lead",
          matchScore: 85,
          lastContact: "2024-03-15",
          recruiter: "Sarah Johnson",
        },
        {
          id: "2",
          name: "Jane Smith",
          source: "Indeed",
          potentialPosition: "Product Manager",
          location: "Seattle, WA",
          status: "Contacted",
          matchScore: 92,
          lastContact: "2024-03-14",
          recruiter: "Mike Chen",
        },
        {
          id: "3",
          name: "Mike Johnson",
          source: "Referral",
          potentialPosition: "DevOps Engineer",
          location: "Austin, TX",
          status: "Interested",
          matchScore: 78,
          lastContact: "2024-03-13",
          recruiter: "Emily Davis",
        },
      ];
      
      return NextResponse.json(mockProspects, {
        headers: {
          'X-Data-Source': 'mock-error-fallback'
        }
      });
    } catch (mockError) {
      console.error("❌ Error loading mock data:", mockError);
      return NextResponse.json(
        { error: "Failed to fetch prospect bookmarks" },
        { status: 500 }
      );
    }
  }
}
