import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // disable caching on Vercel edge

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") ?? "";
  console.log("🔍 Saved searches request - incoming cookies:", cookie);

  // Parse and analyze individual cookies
  const cookies = cookie.split(';').map(c => c.trim());
  const cookieMap: Record<string, string> = {};
  cookies.forEach(c => {
    const [key, value] = c.split('=');
    if (key && value) {
      cookieMap[key] = value;
    }
  });
  
  console.log("🍪 Parsed cookies:", cookieMap);
  console.log("🔑 JSESSIONID present:", !!cookieMap.JSESSIONID);
  console.log("🔑 ConsolidatedJAFTestClientINT present:", !!cookieMap.ConsolidatedJAFTestClientINT);
  
  // Require authentication cookies for ATAO access
  if (!cookieMap.JSESSIONID) {
    console.log("❌ Missing JSESSIONID cookie - authentication required");
    return NextResponse.json({ error: "Authentication required. Please log in to ATAO first." }, { status: 401 });
  }

  // Try the traditional JSP approach to get saved searches
  const qs =
    "?seq=savedApplicantSearches.list" +
    "&applicationName=ConsolidatedJAFTestClientdsiRAT" +
    "&locale=en_US";
  const url = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp${qs}`;
  
  console.log("📡 Making request to ATAO JSP:", url);
  console.log("🍪 Sending cookies to ATAO:", cookie);

  try {
    const res = await fetch(url, {
      headers: {
        cookie,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
    });

    console.log("📡 ATAO JSP response status:", res.status);
    console.log("📡 ATAO JSP response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      console.error("❌ Legacy JSP error:", res.status, res.statusText);
      return NextResponse.json({ 
        error: "Failed to fetch saved searches from ATAO", 
        status: res.status 
      }, { status: res.status });
    }

    // Parse HTML response to extract saved searches data
    const html = await res.text();
    console.log("📄 JSP response HTML length:", html.length);
    
    // Check if this is a login redirect
    if (html.includes("Login - Hiring Management Console") || html.includes("adminLogin")) {
      console.log("❌ ATAO redirected to login - session expired or invalid");
      return NextResponse.json({ 
        error: "Session expired. Please log in to ATAO again." 
      }, { status: 401 });
    }
    
    // Enhanced HTML analysis
    console.log("🔍 HTML Analysis:");
    console.log("- Contains 'savedTextSearches':", html.includes("savedTextSearches"));
    console.log("- Contains 'NoSavedSearches':", html.includes("NoSavedSearches"));
    console.log("- Contains 'SavedTextSearch':", html.includes("SavedTextSearch"));
    
    // Debug: Log a sample of the HTML to see the actual structure
    const htmlSample = html.substring(0, 3000);
    console.log("📄 HTML Sample (first 3000 chars):", htmlSample);
    
    // Look for table structures
    const tableMatches = html.match(/<table[^>]*>/gi);
    const gridMatches = html.match(/<.*?grid.*?>/gi);
    console.log("- Table elements found:", tableMatches ? tableMatches.length : 0);
    console.log("- Grid elements found:", gridMatches ? gridMatches.length : 0);
    
    // Look for specific ATAO patterns
    const ataoSearchGrids = html.match(/<atao:searchResultsGrid[^>]*>/gi);
    const ataoDisplayFields = html.match(/<atao:displayField[^>]*>/gi);
    const followLinks = html.match(/followLink/gi);
    const runSavedSearch = html.match(/runSavedSearch/gi);
    console.log("- ATAO searchResultsGrid tags:", ataoSearchGrids ? ataoSearchGrids.length : 0);
    console.log("- ATAO displayField tags:", ataoDisplayFields ? ataoDisplayFields.length : 0);
    console.log("- followLink references:", followLinks ? followLinks.length : 0);
    console.log("- runSavedSearch references:", runSavedSearch ? runSavedSearch.length : 0);
    
    // Look for rendered HTML patterns
    const linkTags = html.match(/<a[^>]*>/gi);
    const tdTags = html.match(/<td[^>]*>/gi);
    console.log("- Link tags found:", linkTags ? linkTags.length : 0);
    console.log("- TD tags found:", tdTags ? tdTags.length : 0);
    
    // Look for saved searches data in the HTML
    const savedSearches = extractSavedSearchesFromHTML(html);
    
    console.log("📋 Extracted saved searches count:", savedSearches.length);

    // Relay legacy session cookie back to browser so next call carries it
    const legacySetCookie = res.headers.get("set-cookie");
    console.log("🍪 Legacy set-cookie header:", legacySetCookie);

    const response = NextResponse.json(savedSearches);
    if (legacySetCookie) {
      response.headers.set("set-cookie", legacySetCookie);
      console.log("🍪 Relaying session cookie back to browser");
    }
    
    console.log("✅ Saved searches request completed successfully");
    return response;

  } catch (error) {
    console.error("❌ Error fetching from legacy system:", error);
    return NextResponse.json({ 
      error: "Network error connecting to ATAO system",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// Enhanced helper function to extract saved searches from HTML
function extractSavedSearchesFromHTML(html: string): Array<{id: number, searchName: string, searchDate: string}> {
  const savedSearches: Array<{id: number, searchName: string, searchDate: string}> = [];
  
  try {
    // Check if there are no saved searches
    if (html.includes("BodyText.NoSavedSearches") || html.includes("No saved searches")) {
      console.log("📋 No saved searches found in HTML (NoSavedSearches message detected)");
      return [];
    }
    
    // Method 1: Look for ATAO grid data structures
    // ATAO uses specific patterns for rendering grid data
    const ataoGridPattern = /<atao:searchResultsGrid[^>]*name="savedTextSearches"[^>]*>[\s\S]*?<\/atao:searchResultsGrid>/gi;
    const gridMatches = html.match(ataoGridPattern);
    if (gridMatches) {
      console.log("📋 Found ATAO savedTextSearches grid structures:", gridMatches.length);
      for (const grid of gridMatches) {
        // Look for rows in the grid - each row contains search data
        const rowPattern = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
        const rows = grid.match(rowPattern) || [];
        
        for (const row of rows) {
          // Skip header rows
          if (row.includes('<th') || row.includes('gridHeader')) continue;
          
          // Look for the search name in displayField
          const searchNameMatch = row.match(/<atao:displayField[^>]*name="SavedTextSearch"[^>]*property="searchName"[^>]*\/>([^<]*)/i) ||
                                 row.match(/<atao:displayField[^>]*property="searchName"[^>]*name="SavedTextSearch"[^>]*\/>([^<]*)/i) ||
                                 row.match(/property="searchName"[^>]*>([^<]+)</i);
          
          // Look for the search date in displayField  
          const searchDateMatch = row.match(/<atao:displayField[^>]*name="SavedTextSearch"[^>]*property="searchDate"[^>]*\/>([^<]*)/i) ||
                                 row.match(/<atao:displayField[^>]*property="searchDate"[^>]*name="SavedTextSearch"[^>]*\/>([^<]*)/i) ||
                                 row.match(/property="searchDate"[^>]*>([^<]+)</i) ||
                                 row.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
          
          if (searchNameMatch && searchNameMatch[1] && searchNameMatch[1].trim()) {
            const searchName = searchNameMatch[1].trim();
            let searchDate = new Date().toISOString();
            
            if (searchDateMatch && searchDateMatch[1]) {
              const dateStr = searchDateMatch[1].trim();
              if (dateStr.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                const [month, day, year] = dateStr.split('/');
                searchDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
              } else if (dateStr.match(/\d{4}-\d{2}-\d{2}/)) {
                searchDate = new Date(dateStr).toISOString();
              }
            }
            
            savedSearches.push({
              id: savedSearches.length + 1,
              searchName: searchName,
              searchDate: searchDate
            });
          }
        }
      }
    }
    
    // Method 2: Look for followLink events with search names
    if (savedSearches.length === 0) {
      const followLinkPattern = /<atao:eventDiv[^>]*event="followLink"[^>]*arguments="runSavedSearch"[^>]*>[\s\S]*?<atao:displayField[^>]*>([^<]+)</gi;
      let match;
      while ((match = followLinkPattern.exec(html)) !== null) {
        const searchName = match[1].trim();
        if (searchName && searchName.length > 0) {
          savedSearches.push({
            id: savedSearches.length + 1,
            searchName: searchName,
            searchDate: new Date().toISOString()
          });
        }
      }
    }
    
    // Method 2.5: Look for rendered HTML from ATAO tags (since tags get converted to HTML)
    if (savedSearches.length === 0) {
      console.log("📋 Looking for rendered HTML patterns...");
      
      // Look for links with runSavedSearch in onclick or href
      const renderedLinkPattern = /<a[^>]*(?:onclick|href)[^>]*runSavedSearch[^>]*>([^<]+)<\/a>/gi;
      let match;
      while ((match = renderedLinkPattern.exec(html)) !== null) {
        const searchName = match[1].trim();
        if (searchName && searchName.length > 0 && !searchName.includes('&nbsp;')) {
          console.log("📋 Found rendered search link:", searchName);
          savedSearches.push({
            id: savedSearches.length + 1,
            searchName: searchName,
            searchDate: new Date().toISOString()
          });
        }
      }
      
      // Look for table cells that might contain search names
      if (savedSearches.length === 0) {
        const tableCellPattern = /<td[^>]*class="[^"]*pct45[^"]*"[^>]*>[\s\S]*?<\/td>/gi;
        while ((match = tableCellPattern.exec(html)) !== null) {
          const cellContent = match[0];
          // Look for links or text within this cell
          const linkMatch = cellContent.match(/<a[^>]*>([^<]+)<\/a>/) || 
                           cellContent.match(/>([A-Za-z0-9_\s]+)</);
          if (linkMatch && linkMatch[1]) {
            const searchName = linkMatch[1].trim();
            if (searchName.length > 2 && !searchName.includes('&nbsp;')) {
              console.log("📋 Found search in table cell:", searchName);
              savedSearches.push({
                id: savedSearches.length + 1,
                searchName: searchName,
                searchDate: new Date().toISOString()
              });
            }
          }
        }
      }
    }
    
    // Method 3: Look for table rows with search data
    if (savedSearches.length === 0) {
      const tableRowPattern = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
      const tableRows = html.match(tableRowPattern) || [];
      
      for (const row of tableRows) {
        // Skip header rows
        if (row.includes('<th') || row.includes('gridHeader')) continue;
        
        // Look for search name in various patterns
        const namePatterns = [
          /event="followLink"[^>]*>[\s\S]*?<[^>]*>([^<]+)</i,
          /SavedTextSearch[^>]*>([^<]+)</i,
          /<td[^>]*>[\s\S]*?<[^>]*>([A-Za-z0-9_]+)</i
        ];
        
        let searchName = null;
        for (const pattern of namePatterns) {
          const nameMatch = row.match(pattern);
          if (nameMatch && nameMatch[1] && nameMatch[1].trim()) {
            const candidate = nameMatch[1].trim();
            // Filter out common non-search text
            if (!candidate.includes('&nbsp;') && 
                !candidate.includes('Delete') && 
                !candidate.includes('Edit') &&
                candidate.length > 2) {
              searchName = candidate;
              break;
            }
          }
        }
        
        if (searchName) {
          // Look for date in the same row
          const dateMatch = row.match(/\d{1,2}\/\d{1,2}\/\d{4}/) || 
                           row.match(/\d{4}-\d{2}-\d{2}/);
          
          let formattedDate = new Date().toISOString();
          if (dateMatch) {
            const dateStr = dateMatch[0];
            if (dateStr.includes('/')) {
              const [month, day, year] = dateStr.split('/');
              formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
            } else {
              formattedDate = new Date(dateStr).toISOString();
            }
          }
          
          savedSearches.push({
            id: savedSearches.length + 1,
            searchName: searchName,
            searchDate: formattedDate
          });
        }
      }
    }
    
    // Method 4: Look for JavaScript data or JSON embedded in the page
    if (savedSearches.length === 0) {
      const jsDataMatch = html.match(/savedTextSearches\s*[=:]\s*(\[[\s\S]*?\])/);
      if (jsDataMatch) {
        try {
          const data = JSON.parse(jsDataMatch[1]);
          console.log("📋 Found savedTextSearches JavaScript data:", data.length, "items");
          return data.map((item: any, index: number) => ({
            id: item.id || index + 1,
            searchName: item.searchName || item.name || `Search ${index + 1}`,
            searchDate: item.searchDate || new Date().toISOString()
          }));
        } catch (e) {
          console.log("⚠️ Could not parse JavaScript savedTextSearches data");
        }
      }
    }
    
    // Method 5: Look for any text that might be search names in specific contexts
    if (savedSearches.length === 0) {
      const searchNamePatterns = [
        /followLink[^>]*>([^<]+)</gi,
        /searchName[^>]*>([^<]+)</gi,
        /"searchName"\s*:\s*"([^"]+)"/gi,
        /SavedTextSearch[^>]*property="searchName"[^>]*>([^<]+)</gi
      ];
      
      for (const pattern of searchNamePatterns) {
        let match;
        while ((match = pattern.exec(html)) !== null) {
          const searchName = match[1].trim();
          if (searchName && 
              searchName.length > 0 && 
              !searchName.includes('<') &&
              !searchName.includes('&nbsp;') &&
              searchName !== 'searchName') {
            savedSearches.push({
              id: savedSearches.length + 1,
              searchName: searchName,
              searchDate: new Date().toISOString()
            });
          }
        }
        if (savedSearches.length > 0) break;
      }
    }
    
    console.log("📋 Extracted search data using HTML parsing:", savedSearches.length, "items");
    if (savedSearches.length > 0) {
      console.log("📋 Sample extracted searches:", savedSearches.slice(0, 3));
    }
    
  } catch (error) {
    console.error("❌ Error parsing HTML for saved searches:", error);
  }
  
  return savedSearches;
}

export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
