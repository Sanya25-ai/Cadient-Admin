import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // disable caching on Vercel edge

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") ?? "";
  console.log("🔍 Imported candidates request - incoming cookies:", cookie);

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

  // Use the provided ATAO URL for imported candidates
  const qs =
    "?seq=requisitionApplicationGrid" +
    "&applicationName=ConsolidatedJAFTestClientdsiRAT" +
    "&locale=en_US" +
    "&searchType=reqSearch" +
    "&reportType=Req.GeneralApply" +
    "&subReportType=Import";
  const url = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp${qs}`;
  
  console.log("📡 Making request to ATAO for imported candidates:", url);
  console.log("🍪 Sending cookies to ATAO:", cookie);

  // Try the direct AJAX endpoint first as a workaround for 500 errors
  const directAjaxUrl = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?seq=requisitionApplicationsGridResults&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US&searchType=reqSearch&reportType=Req.GeneralApply&subReportType=Import&event=com.deploy.application.hmc.plugin.RequisitionApplicationsGrid.search`;
  
  console.log("🔄 Trying direct AJAX endpoint first:", directAjaxUrl);
  
  try {
    const directRes = await fetch(directAjaxUrl, {
      headers: {
        cookie,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "X-Requested-With": "XMLHttpRequest"
      },
    });

    console.log("📡 Direct AJAX response status:", directRes.status);

    if (directRes.ok) {
      const directHtml = await directRes.text();
      console.log("📄 Direct AJAX response HTML length:", directHtml.length);
      
      const directCandidates = extractImportedCandidatesFromHTML(directHtml);
      
      if (directCandidates.length > 0) {
        console.log("✅ Successfully extracted candidates from direct AJAX call");
        
        const legacySetCookie = directRes.headers.get("set-cookie");
        const response = NextResponse.json(directCandidates);
        if (legacySetCookie) {
          response.headers.set("set-cookie", legacySetCookie);
        }
        return response;
      } else {
        console.log("📋 No candidates found in direct AJAX response, falling back to original method");
      }
    } else {
      console.log("❌ Direct AJAX request failed:", directRes.status, directRes.statusText);
    }
  } catch (directError) {
    console.error("❌ Error with direct AJAX request:", directError);
  }

  // Fall back to original method
  console.log("🔄 Falling back to original page load method");

  try {
    const res = await fetch(url, {
      headers: {
        cookie,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
    });

    console.log("📡 ATAO imported candidates response status:", res.status);
    console.log("📡 ATAO imported candidates response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      console.error("❌ Legacy imported candidates error:", res.status, res.statusText);
      
      // Log the error response body for debugging
      try {
        const errorHtml = await res.text();
        console.error("❌ ATAO error response body (first 2000 chars):", errorHtml.substring(0, 2000));
        
        // Look for specific error patterns in the response
        if (errorHtml.includes("Exception") || errorHtml.includes("Error")) {
          const exceptionMatch = errorHtml.match(/(Exception|Error)[^<]*[^>]*>/i);
          if (exceptionMatch) {
            console.error("❌ Found exception in response:", exceptionMatch[0]);
          }
        }
        
        // Check if it's a specific ATAO error
        if (errorHtml.includes("ATAO") || errorHtml.includes("Deploy")) {
          console.error("❌ This appears to be an ATAO-specific error");
        }
        
      } catch (e) {
        console.error("❌ Could not read error response body:", e);
      }
      
      return NextResponse.json({ 
        error: "Failed to fetch imported candidates from ATAO", 
        status: res.status 
      }, { status: res.status });
    }

    // Parse HTML response to extract imported candidates data
    const html = await res.text();
    console.log("📄 Imported candidates HTML length:", html.length);
    
    // Check if this is a login redirect
    if (html.includes("Login - Hiring Management Console") || html.includes("adminLogin")) {
      console.log("❌ ATAO redirected to login - session expired or invalid");
      return NextResponse.json({ 
        error: "Session expired. Please log in to ATAO again." 
      }, { status: 401 });
    }
    
    // Enhanced HTML analysis
    console.log("🔍 Imported Candidates HTML Analysis:");
    console.log("- Contains 'requisitionApplicationGrid':", html.includes("requisitionApplicationGrid"));
    console.log("- Contains 'Import':", html.includes("Import"));
    console.log("- Contains 'runQueryOnLoad':", html.includes("runQueryOnLoad"));
    console.log("- Contains 'Deploy.showWait':", html.includes("Deploy.showWait"));
    console.log("- Contains 'gridResults':", html.includes("gridResults"));
    
    // Check if this page uses AJAX loading
    if (html.includes("runQueryOnLoad") && html.includes("Deploy.showWait")) {
      console.log("📡 Detected AJAX loading pattern - extracting query URL");
      
      // Extract the AJAX query URL
      const ajaxPattern = /runQueryOnLoad[^"]*"([^"]+)"/;
      const ajaxMatch = html.match(ajaxPattern);
      
      if (ajaxMatch) {
        const ajaxUrl = ajaxMatch[1];
        console.log(`📡 Found AJAX endpoint: ${ajaxUrl}`);
        
        // Make a follow-up request to get the actual grid data
        const fullAjaxUrl = ajaxUrl.startsWith('http') ? ajaxUrl : `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?${ajaxUrl}`;
        console.log(`📡 Making AJAX request to: ${fullAjaxUrl}`);
        
        try {
          const ajaxRes = await fetch(fullAjaxUrl, {
            headers: {
              cookie,
              Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              "X-Requested-With": "XMLHttpRequest" // Indicate this is an AJAX request
            },
          });
          
          console.log("📡 AJAX response status:", ajaxRes.status);
          
          if (ajaxRes.ok) {
            const ajaxHtml = await ajaxRes.text();
            console.log("📄 AJAX response HTML length:", ajaxHtml.length);
            
            // Parse the AJAX response for candidate data
            const ajaxCandidates = extractImportedCandidatesFromHTML(ajaxHtml);
            
            if (ajaxCandidates.length > 0) {
              console.log("✅ Successfully extracted candidates from AJAX response");
              
              // Relay legacy session cookie back to browser
              const legacySetCookie = res.headers.get("set-cookie");
              const response = NextResponse.json(ajaxCandidates);
              if (legacySetCookie) {
                response.headers.set("set-cookie", legacySetCookie);
              }
              return response;
            } else {
              console.log("📋 No candidates found in AJAX response, trying original HTML");
            }
          } else {
            console.log("❌ AJAX request failed:", ajaxRes.status, ajaxRes.statusText);
          }
        } catch (ajaxError) {
          console.error("❌ Error making AJAX request:", ajaxError);
        }
      }
    }
    
    // Debug: Log a larger sample of the HTML to see the actual structure
    const htmlSample = html.substring(0, 5000);
    console.log("📄 HTML Sample (first 5000 chars):", htmlSample);
    
    // Look for specific patterns in the HTML
    const scriptMatches = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
    const divMatches = html.match(/<div[^>]*>/gi);
    const spanMatches = html.match(/<span[^>]*>/gi);
    console.log("- Script tags found:", scriptMatches ? scriptMatches.length : 0);
    console.log("- Div tags found:", divMatches ? divMatches.length : 0);
    console.log("- Span tags found:", spanMatches ? spanMatches.length : 0);
    
    // Look for table structures
    const tableMatches = html.match(/<table[^>]*>/gi);
    const gridMatches = html.match(/<.*?grid.*?>/gi);
    console.log("- Table elements found:", tableMatches ? tableMatches.length : 0);
    console.log("- Grid elements found:", gridMatches ? gridMatches.length : 0);
    
    // Look for specific ATAO patterns
    const ataoSearchGrids = html.match(/<atao:searchResultsGrid[^>]*>/gi);
    const ataoDisplayFields = html.match(/<atao:displayField[^>]*>/gi);
    const followLinks = html.match(/followLink/gi);
    console.log("- ATAO searchResultsGrid tags:", ataoSearchGrids ? ataoSearchGrids.length : 0);
    console.log("- ATAO displayField tags:", ataoDisplayFields ? ataoDisplayFields.length : 0);
    console.log("- followLink references:", followLinks ? followLinks.length : 0);
    
    // Look for rendered HTML patterns
    const linkTags = html.match(/<a[^>]*>/gi);
    const tdTags = html.match(/<td[^>]*>/gi);
    console.log("- Link tags found:", linkTags ? linkTags.length : 0);
    console.log("- TD tags found:", tdTags ? tdTags.length : 0);
    
    // Look for JavaScript data structures
    const jsDataMatches = html.match(/var\s+\w+\s*=\s*[\[\{][^;]*;/gi);
    const jsonMatches = html.match(/\{[^}]*"[^"]*"[^}]*\}/gi);
    console.log("- JavaScript data structures found:", jsDataMatches ? jsDataMatches.length : 0);
    console.log("- JSON-like structures found:", jsonMatches ? jsonMatches.length : 0);
    
    // Look for specific content patterns
    const namePatterns = html.match(/[A-Z][a-z]+,\s*[A-Z][a-z]+/g);
    const datePatterns = html.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
    console.log("- Name patterns found:", namePatterns ? namePatterns.length : 0);
    console.log("- Date patterns found:", datePatterns ? datePatterns.length : 0);
    
    if (namePatterns && namePatterns.length > 0) {
      console.log("- Sample name patterns:", namePatterns.slice(0, 5));
    }
    if (datePatterns && datePatterns.length > 0) {
      console.log("- Sample date patterns:", datePatterns.slice(0, 5));
    }
    
    // Look for imported candidates data in the HTML (fallback)
    const importedCandidates = extractImportedCandidatesFromHTML(html);
    
    console.log("📋 Extracted imported candidates count:", importedCandidates.length);

    // Relay legacy session cookie back to browser so next call carries it
    const legacySetCookie = res.headers.get("set-cookie");
    console.log("🍪 Legacy set-cookie header:", legacySetCookie);

    const response = NextResponse.json(importedCandidates);
    if (legacySetCookie) {
      response.headers.set("set-cookie", legacySetCookie);
      console.log("🍪 Relaying session cookie back to browser");
    }
    
    console.log("✅ Imported candidates request completed successfully");
    return response;

  } catch (error) {
    console.error("❌ Error fetching imported candidates from legacy system:", error);
    return NextResponse.json({ 
      error: "Network error connecting to ATAO system",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// Helper function to extract imported candidates from HTML
function extractImportedCandidatesFromHTML(html: string): Array<{
  id: number, 
  name: string, 
  appliedDate: string, 
  status: string, 
  source: string,
  requisition?: string,
  location?: string
}> {
  const candidates: Array<{
    id: number, 
    name: string, 
    appliedDate: string, 
    status: string, 
    source: string,
    requisition?: string,
    location?: string
  }> = [];
  
  try {
    // Check if there are no imported candidates
    if (html.includes("No candidates found") || html.includes("No results") || html.includes("No data")) {
      console.log("📋 No imported candidates found in HTML");
      return [];
    }
    
    // Method 1: Priority method - Look for name patterns first and extract all context
    console.log("📋 Method 1: Looking for name patterns with full context extraction...");
    
    const namePattern = /([A-Z][a-z]+,\s*[A-Z][a-z]+)/g;
    const nameMatches = html.match(namePattern);
    
    if (nameMatches && nameMatches.length > 0) {
      console.log(`📋 Found ${nameMatches.length} name patterns:`, nameMatches.slice(0, 5));
      
      // Use Set to avoid duplicates
      const uniqueNames = [...new Set(nameMatches)];
      console.log(`📋 Unique names found:`, uniqueNames);
      
      for (const name of uniqueNames) {
        // Find all occurrences of this name in the HTML
        const nameIndex = html.indexOf(name);
        if (nameIndex !== -1) {
          // Extract a larger context around the name (1000 chars before and after)
          const contextStart = Math.max(0, nameIndex - 1000);
          const contextEnd = Math.min(html.length, nameIndex + 1000);
          const context = html.substring(contextStart, contextEnd);
          
          console.log(`📋 Analyzing context for ${name}:`, context.substring(0, 200) + "...");
          
          // Look for date patterns in the context
          const datePatterns = [
            /\d{1,2}\/\d{1,2}\/\d{4}/g,
            /\d{4}-\d{2}-\d{2}/g,
            /\d{1,2}-\d{1,2}-\d{4}/g
          ];
          
          let foundDate = null;
          for (const pattern of datePatterns) {
            const dateMatches = context.match(pattern);
            if (dateMatches && dateMatches.length > 0) {
              // Use the first valid date found
              foundDate = dateMatches[0];
              console.log(`📋 Found date for ${name}: ${foundDate}`);
              break;
            }
          }
          
          // Look for status patterns in the context
          const statusPatterns = [
            /(Active|Inactive|Pending|Imported|New|Pre-Screened|Complete|Incomplete|Hired|Available)/gi,
            /(Import|Manual|Upload|External|Internal)/gi
          ];
          
          let foundStatus = "Unknown";
          for (const pattern of statusPatterns) {
            const statusMatches = context.match(pattern);
            if (statusMatches && statusMatches.length > 0) {
              foundStatus = statusMatches[0];
              console.log(`📋 Found status for ${name}: ${foundStatus}`);
              break;
            }
          }
          
          // Parse the date
          let appliedDate = new Date().toISOString();
          if (foundDate) {
            try {
              if (foundDate.includes('/')) {
                const [month, day, year] = foundDate.split('/');
                appliedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
              } else if (foundDate.includes('-')) {
                appliedDate = new Date(foundDate).toISOString();
              }
            } catch (e) {
              console.log(`📋 Could not parse date ${foundDate}, using current date`);
            }
          }
          
          console.log(`📋 Adding candidate: ${name} with date ${appliedDate} and status ${foundStatus}`);
          
          candidates.push({
            id: candidates.length + 1,
            name: name,
            appliedDate: appliedDate,
            status: foundStatus,
            source: "Import"
          });
        }
      }
    }
    
    // If we found candidates using Method 1, return them immediately
    if (candidates.length > 0) {
      console.log("✅ Method 1 successful - extracted candidates:", candidates.length);
      return candidates;
    }
    
    // Method 2: Look for ATAO grid table structures (most common in AJAX responses)
    console.log("📋 Method 2: Looking for ATAO grid table structures...");
    
    // Look for table rows that might contain candidate data
    const tableRowPattern = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
    const tableRows = html.match(tableRowPattern) || [];
    
    console.log(`📋 Found ${tableRows.length} table rows`);
    
    for (const row of tableRows) {
      if (row.includes('<th') || row.includes('gridHeader') || row.includes('header')) continue;
      
      const candidateData = extractCandidateDataFromRow(row);
      if (candidateData) {
        console.log(`📋 Extracted candidate from table row:`, candidateData);
        candidates.push({
          id: candidates.length + 1,
          ...candidateData
        });
      }
    }
    
    if (candidates.length > 0) {
      console.log("✅ Method 2 successful - extracted candidates:", candidates.length);
      return candidates;
    }
    
    // Method 3: Look for div-based grid structures
    console.log("📋 Method 3: Looking for div-based grid structures...");
    
    const divRowPattern = /<div[^>]*class="[^"]*row[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
    const divRows = html.match(divRowPattern) || [];
    
    console.log(`📋 Found ${divRows.length} div rows`);
    
    for (const row of divRows) {
      const candidateData = extractCandidateDataFromDiv(row);
      if (candidateData) {
        console.log(`📋 Extracted candidate from div row:`, candidateData);
        candidates.push({
          id: candidates.length + 1,
          ...candidateData
        });
      }
    }
    
    if (candidates.length > 0) {
      console.log("✅ Method 3 successful - extracted candidates:", candidates.length);
      return candidates;
    }
    
    // Method 4: Look for JavaScript data structures
    console.log("📋 Method 4: Looking for JavaScript data structures...");
    
    const jsVarPatterns = [
      /var\s+gridData\s*=\s*(\[[\s\S]*?\]);/gi,
      /var\s+applicantData\s*=\s*(\[[\s\S]*?\]);/gi,
      /var\s+candidateData\s*=\s*(\[[\s\S]*?\]);/gi,
      /var\s+importedData\s*=\s*(\[[\s\S]*?\]);/gi,
      /gridData\s*:\s*(\[[\s\S]*?\])/gi,
      /applicants\s*:\s*(\[[\s\S]*?\])/gi
    ];
    
    for (const pattern of jsVarPatterns) {
      let jsMatch;
      while ((jsMatch = pattern.exec(html)) !== null) {
        const varData = jsMatch[1];
        console.log(`📋 Found potential grid data variable`);
        
        try {
          const parsedData = JSON.parse(varData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log(`📋 JavaScript array has ${parsedData.length} items`);
            for (const item of parsedData) {
              if (typeof item === 'object' && (item.name || item.firstName || item.lastName || item.candidateName)) {
                const candidateData = extractCandidateFromObject(item);
                if (candidateData) {
                  candidates.push({
                    id: candidates.length + 1,
                    ...candidateData
                  });
                }
              }
            }
          }
        } catch (e) {
          console.log(`📋 Could not parse JavaScript data`);
        }
      }
    }
    
    if (candidates.length > 0) {
      console.log("✅ Method 4 successful - extracted candidates:", candidates.length);
      return candidates;
    }
    
    console.log("📋 All extraction methods failed - no candidates found");
    
  } catch (error) {
    console.error("❌ Error parsing HTML for imported candidates:", error);
  }
  
  return candidates;
}

// Helper function to extract candidates from grid content
function extractCandidatesFromGridContent(gridContent: string): Array<{
  id: number, 
  name: string, 
  appliedDate: string, 
  status: string, 
  source: string,
  requisition?: string,
  location?: string
}> {
  const candidates: Array<{
    id: number, 
    name: string, 
    appliedDate: string, 
    status: string, 
    source: string,
    requisition?: string,
    location?: string
  }> = [];
  
  try {
    // Look for table rows in grid content
    const rowPattern = /<tr[^>]*>[\s\S]*?<\/tr>/gi;
    const rows = gridContent.match(rowPattern) || [];
    
    for (const row of rows) {
      if (row.includes('<th') || row.includes('gridHeader')) continue;
      
      const candidateData = extractCandidateDataFromRow(row);
      if (candidateData) {
        candidates.push({
          id: candidates.length + 1,
          ...candidateData
        });
      }
    }
    
    // Look for div-based rows
    const divRowPattern = /<div[^>]*class="[^"]*row[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
    const divRows = gridContent.match(divRowPattern) || [];
    
    for (const row of divRows) {
      const candidateData = extractCandidateDataFromDiv(row);
      if (candidateData) {
        candidates.push({
          id: candidates.length + 1,
          ...candidateData
        });
      }
    }
    
  } catch (error) {
    console.error("❌ Error extracting candidates from grid content:", error);
  }
  
  return candidates;
}

// Helper function to extract candidate data from JavaScript object
function extractCandidateFromObject(obj: any): {
  name: string, 
  appliedDate: string, 
  status: string, 
  source: string,
  requisition?: string,
  location?: string
} | null {
  try {
    let name = '';
    if (obj.name) {
      name = obj.name;
    } else if (obj.firstName && obj.lastName) {
      name = `${obj.lastName}, ${obj.firstName}`;
    } else if (obj.fullName) {
      name = obj.fullName;
    }
    
    if (!name) return null;
    
    let appliedDate = new Date().toISOString();
    if (obj.appliedDate || obj.bidDate || obj.dateApplied) {
      const dateStr = obj.appliedDate || obj.bidDate || obj.dateApplied;
      appliedDate = new Date(dateStr).toISOString();
    }
    
    const status = obj.status || obj.hmcBidStatus || obj.applicationStatus || "Unknown";
    const source = obj.source || "Import";
    
    return {
      name: name,
      appliedDate: appliedDate,
      status: status,
      source: source,
      requisition: obj.requisition,
      location: obj.location
    };
    
  } catch (error) {
    console.error("❌ Error extracting candidate from object:", error);
    return null;
  }
}

// Helper function to extract candidate data from a div element
function extractCandidateDataFromDiv(div: string): {
  name: string, 
  appliedDate: string, 
  status: string, 
  source: string,
  requisition?: string,
  location?: string
} | null {
  try {
    // Look for candidate name in the div
    const namePatterns = [
      /<span[^>]*>([A-Za-z]+,\s*[A-Za-z]+)<\/span>/i,
      /<div[^>]*>([A-Za-z]+,\s*[A-Za-z]+)<\/div>/i,
      />([A-Za-z]+,\s*[A-Za-z]+)</i
    ];
    
    let candidateName = null;
    for (const pattern of namePatterns) {
      const nameMatch = div.match(pattern);
      if (nameMatch && nameMatch[1] && nameMatch[1].trim()) {
        candidateName = nameMatch[1].trim();
        break;
      }
    }
    
    if (!candidateName) return null;
    
    // Look for applied date
    const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/;
    const dateMatch = div.match(datePattern);
    
    let appliedDate = new Date().toISOString();
    if (dateMatch) {
      const dateStr = dateMatch[0];
      const [month, day, year] = dateStr.split('/');
      appliedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
    }
    
    // Look for status
    const statusPattern = /(Active|Inactive|Pending|Imported|New|Pre-Screened)/i;
    const statusMatch = div.match(statusPattern);
    const status = statusMatch ? statusMatch[1] : "Unknown";
    
    return {
      name: candidateName,
      appliedDate: appliedDate,
      status: status,
      source: "Import"
    };
    
  } catch (error) {
    console.error("❌ Error extracting candidate data from div:", error);
    return null;
  }
}

// Helper function to extract candidate data from a table row
function extractCandidateDataFromRow(row: string): {
  name: string, 
  appliedDate: string, 
  status: string, 
  source: string,
  requisition?: string,
  location?: string
} | null {
  try {
    // Look for candidate name (usually in a link or first column)
    const namePatterns = [
      /<a[^>]*>([^<]+)<\/a>/i,
      /<atao:displayField[^>]*property="candidateName"[^>]*>([^<]+)/i,
      /<td[^>]*>[\s\S]*?>([A-Za-z]+,\s*[A-Za-z]+)</i, // Last, First format
      /<td[^>]*>([A-Za-z]+\s+[A-Za-z]+)</i // First Last format
    ];
    
    let candidateName = null;
    for (const pattern of namePatterns) {
      const nameMatch = row.match(pattern);
      if (nameMatch && nameMatch[1] && nameMatch[1].trim()) {
        const candidate = nameMatch[1].trim();
        if (candidate.length > 2 && !candidate.includes('&nbsp;') && !candidate.includes('Delete')) {
          candidateName = candidate;
          break;
        }
      }
    }
    
    if (!candidateName) return null;
    
    // Look for applied date
    const datePatterns = [
      /\d{1,2}\/\d{1,2}\/\d{4}/,
      /\d{4}-\d{2}-\d{2}/,
      /<atao:displayField[^>]*property="appliedDate"[^>]*>([^<]+)/i
    ];
    
    let appliedDate = new Date().toISOString();
    for (const pattern of datePatterns) {
      const dateMatch = row.match(pattern);
      if (dateMatch) {
        const dateStr = dateMatch[0] || dateMatch[1];
        if (dateStr.includes('/')) {
          const [month, day, year] = dateStr.split('/');
          appliedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
        } else if (dateStr.includes('-')) {
          appliedDate = new Date(dateStr).toISOString();
        }
        break;
      }
    }
    
    // Look for status
    const statusPatterns = [
      /<atao:displayField[^>]*property="status"[^>]*>([^<]+)/i,
      /status[^>]*>([^<]+)</i,
      /(Active|Inactive|Pending|Imported|New)/i
    ];
    
    let status = "Unknown";
    for (const pattern of statusPatterns) {
      const statusMatch = row.match(pattern);
      if (statusMatch && statusMatch[1]) {
        status = statusMatch[1].trim();
        break;
      }
    }
    
    // Look for source
    const sourcePatterns = [
      /<atao:displayField[^>]*property="source"[^>]*>([^<]+)/i,
      /source[^>]*>([^<]+)</i,
      /(Import|Manual|Upload|External)/i
    ];
    
    let source = "Import";
    for (const pattern of sourcePatterns) {
      const sourceMatch = row.match(pattern);
      if (sourceMatch && sourceMatch[1]) {
        source = sourceMatch[1].trim();
        break;
      }
    }
    
    return {
      name: candidateName,
      appliedDate: appliedDate,
      status: status,
      source: source
    };
    
  } catch (error) {
    console.error("❌ Error extracting candidate data from row:", error);
    return null;
  }
}

export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
