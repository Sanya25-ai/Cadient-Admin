import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // disable caching on Vercel edge

interface BookmarkCandidate {
  id: string
  name: string
  applied: string
  status: string
  smartScore: number
  requisition: string
  location: string
  hiringManager: string
  score: string
  source: string
  safesLead: boolean
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Bookmarks API called');
    
    // Get cookies from the request
    const jsessionid = request.cookies.get('JSESSIONID')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value;
    
    console.log('🍪 Cookies:', { 
      jsessionid: jsessionid ? `${jsessionid.substring(0, 10)}...` : 'missing',
      consolidatedCookie: consolidatedCookie ? `${consolidatedCookie.substring(0, 10)}...` : 'missing'
    });

    if (!jsessionid || !consolidatedCookie) {
      console.log('❌ Missing required cookies');
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // The bookmarks sequence URL
    const baseUrl = 'http://localhost:8080/atao/index.jsp';
    const queryParams = new URLSearchParams({
      seq: 'requisitionApplicationGrid',
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      locale: 'en_US',
      searchType: 'reqSearch',
      reportType: 'Req.BookmarkNav'
    });

    const ajaxUrl = `${baseUrl}?${queryParams.toString()}`;
    
    console.log('🌐 Making request to bookmarks URL:', ajaxUrl);

    const response = await fetch(ajaxUrl, {
      method: 'GET',
      headers: {
        'Cookie': `JSESSIONID=${jsessionid}; ConsolidatedJAFTestClientINT=${consolidatedCookie}`,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      console.log('❌ Response not OK:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('❌ Error response body:', errorText.substring(0, 500));
      return NextResponse.json({ error: 'Failed to fetch data from ATAO' }, { status: 500 });
    }

    const html = await response.text();
    console.log('📄 Response length:', html.length);
    console.log('📄 Response preview:', html.substring(0, 200));

    // Check for login redirect
    if (html.includes('login') || html.includes('Login') || html.includes('authentication')) {
      console.log('❌ Authentication failed - redirected to login');
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    // Parse the HTML to extract bookmark data
    const bookmarks = parseBookmarkData(html);
    console.log('✅ Parsed bookmarks:', bookmarks.length);

    return NextResponse.json({ bookmarks });

  } catch (error) {
    console.error('❌ Error in bookmarks API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function parseBookmarkData(html: string): BookmarkCandidate[] {
  const bookmarks: BookmarkCandidate[] = [];
  
  try {
    console.log('🔍 Looking for ATAO bookmark grid structure...');
    
    // Look for tbody section which contains the actual data rows
    const tbodyMatch = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/);
    if (!tbodyMatch) {
      console.log('❌ No <tbody> section found');
      return [];
    }
    
    console.log('✅ Found <tbody> section');
    const tbodyContent = tbodyMatch[1];
    
    // Look for table rows in tbody - ATAO uses various row classes
    const rowRegex = /<tr[^>]*(?:class="[^"]*(?:altRow|rowHighlighted|rowSelected|evenStyle|oddStyle)[^"]*")?[^>]*>([\s\S]*?)<\/tr>/g;
    const rowMatches = tbodyContent.match(rowRegex) || [];
    
    console.log(`📊 Found ${rowMatches.length} potential data rows`);
    
    for (let i = 0; i < rowMatches.length; i++) {
      const rowMatch = rowMatches[i];
      console.log(`🔍 Processing row ${i + 1}:`, rowMatch.substring(0, 200));
      
      // Extract the content inside the tr tags
      const rowContentMatch = rowMatch.match(/<tr[^>]*>([\s\S]*?)<\/tr>/);
      if (!rowContentMatch) continue;
      
      const rowHtml = rowContentMatch[1];
      
      // Extract cell data - look for td elements
      const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
      const cellMatches = rowHtml.match(cellRegex) || [];
      
      console.log(`  📋 Found ${cellMatches.length} cells in row ${i + 1}`);
      
      const cells = cellMatches.map((cellMatch, cellIndex) => {
        const contentMatch = cellMatch.match(/<td[^>]*>([\s\S]*?)<\/td>/);
        if (!contentMatch) return '';
        
        // Clean up the cell content - remove HTML tags and decode entities
        let cellContent = contentMatch[1]
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
          .replace(/&amp;/g, '&') // Decode &amp;
          .replace(/&lt;/g, '<') // Decode &lt;
          .replace(/&gt;/g, '>') // Decode &gt;
          .trim();
        
        console.log(`    Cell ${cellIndex + 1}: "${cellContent}"`);
        return cellContent;
      });
      
      // Skip rows that don't have enough data or are header/empty rows
      if (cells.length < 8) {
        console.log(`  ⚠️ Skipping row ${i + 1} - not enough cells (${cells.length})`);
        continue;
      }
      
      // Skip rows that appear to be headers or empty
      const hasActualData = cells.some(cell => cell && cell.length > 0 && !cell.match(/^\s*$/));
      if (!hasActualData) {
        console.log(`  ⚠️ Skipping row ${i + 1} - no actual data`);
        continue;
      }
      
      // Extract candidate name from the appropriate cell
      let candidateName = 'Unknown';
      if (cells[1]) { // Assuming name is in the second cell
        candidateName = cells[1].trim();
      }
      
      // Helper function to parse score values
      const parseScoreValue = (value: string): number => {
        if (!value || value.trim() === '--' || value.trim() === '') {
          return 0;
        }
        const parsed = parseFloat(value.trim());
        return isNaN(parsed) ? 0 : parsed;
      };
      
      // Determine if this is a SafesLead candidate (you may need to adjust this logic)
      const safesLead = cells.some(cell => cell.toLowerCase().includes('safeslead') || cell.toLowerCase().includes('lead'));
      
      const bookmark: BookmarkCandidate = {
        id: `bookmark-${bookmarks.length + 1}`,
        name: candidateName,
        applied: cells[2] || '', // Applied date
        status: cells[3] || 'Pre-Screened', // Status
        smartScore: parseScoreValue(cells[4]) || 85, // SmartScore
        requisition: cells[5] || '', // Requisition
        location: cells[6] || '', // Location
        hiringManager: cells[7] || '', // Hiring Manager
        score: cells[8] || '--', // Score
        source: cells[9] || '', // Source
        safesLead: safesLead
      };
      
      console.log(`  ✅ Created bookmark: ${bookmark.name}`);
      bookmarks.push(bookmark);
    }
    
    console.log(`📊 Successfully extracted ${bookmarks.length} bookmarks`);
    
  } catch (error) {
    console.error('❌ Error parsing bookmark data:', error);
  }
  
  return bookmarks;
}

export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
