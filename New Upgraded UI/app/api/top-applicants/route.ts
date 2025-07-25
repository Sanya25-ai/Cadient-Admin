import { NextRequest, NextResponse } from "next/server";
import { TopApplicant } from '@/lib/types';

export const dynamic = "force-dynamic"; // disable caching on Vercel edge

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Top Applicants API called');
    
    // Get all cookies from the request to see what's available
    const allCookies = request.cookies.getAll();
    console.log('🍪 All available cookies:', allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 10) + '...' })));
    
    // Check for various possible cookie names
    const jsessionid = request.cookies.get('JSESSIONID')?.value || 
                      request.cookies.get('jsessionid')?.value;
    const consolidatedCookie = request.cookies.get('ConsolidatedJAFTestClientINT')?.value ||
                              request.cookies.get('ConsolidatedJAFTestClientdsiRAT')?.value ||
                              request.cookies.get('KronosINT')?.value;
    
    console.log('🍪 Cookies:', { 
      jsessionid: jsessionid ? `${jsessionid.substring(0, 10)}...` : 'missing',
      consolidatedCookie: consolidatedCookie ? `${consolidatedCookie.substring(0, 10)}...` : 'missing'
    });

    // For development, allow requests without cookies but log a warning
    if (!jsessionid && !consolidatedCookie) {
      console.log('⚠️ No authentication cookies found - using development mode');
      // Return mock data for development
      return NextResponse.json({ 
        applicants: [
          {
            id: '1',
            name: 'John Doe',
            applicationDate: '2025-05-20',
            position: 'Software Engineer',
            location: 'New York',
            status: 'Under Review',
            decisionPointScore: 85,
            smartMatchScore: 92,
            tags: ['JavaScript', 'React', 'Node.js']
          },
          {
            id: '2', 
            name: 'Jane Smith',
            applicationDate: '2025-05-19',
            position: 'Product Manager',
            location: 'San Francisco',
            status: 'Interview Scheduled',
            decisionPointScore: 78,
            smartMatchScore: 88,
            tags: ['Product Strategy', 'Agile', 'Analytics']
          }
        ],
        message: 'Development mode - using mock data due to missing authentication cookies'
      });
    }

    // The original URL that works in the old UI
    const baseUrl = 'http://localhost:8080/atao/index.jsp';
    const queryParams = new URLSearchParams({
      seq: 'applicantGridResults', // Use the results sequence, not the form sequence
      applicationName: 'ConsolidatedJAFTestClientdsiRAT',
      locale: 'en_US',
      reportType: 'DecisionPointScore',
      groupRankScore: 'DecisionPointGroupRankScore.1',
      smartMatchGroupRankScore: 'SmartMatchGroupRankScore.1',
      smartGroupRankScore: 'SmartGroupRankScore.1',
      event: 'com.deploy.application.hmc.plugin.ApplicantGrid.search' // Add the search event to the URL
    });

    const ajaxUrl = `${baseUrl}?${queryParams.toString()}`;
    
    console.log('🌐 Making AJAX POST request to:', ajaxUrl);

    // Simulate what the JavaScript runQueryOnLoad function does:
    // The key insight is that the ajaxGridSearchURL already contains the search event and results sequence
    // We just need to make a POST request to trigger the search execution
    const formData = new URLSearchParams({
      // The form data should be minimal since the URL already contains the search parameters
      seq: 'applicantGridResults',
      event: 'com.deploy.application.hmc.plugin.ApplicantGrid.search'
    });

    const response = await fetch(ajaxUrl, {
      method: 'POST',
      headers: {
        'Cookie': [
          jsessionid ? `JSESSIONID=${jsessionid}` : '',
          consolidatedCookie ? `ConsolidatedJAFTestClientINT=${consolidatedCookie}` : ''
        ].filter(Boolean).join('; '),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-Requested-With': 'XMLHttpRequest' // Indicate this is an AJAX request
      },
      body: formData.toString()
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.log('❌ Response not OK:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('❌ Error response body:', errorText.substring(0, 500));
      return NextResponse.json({ error: 'Failed to fetch data from ATAO' }, { status: 500 });
    }

    const html = await response.text();
    console.log('📄 Response length:', html.length);
    console.log('📄 Response preview:', html.substring(0, 200));

    // Enhanced analysis of the response
    console.log('🔍 HTML Analysis:');
    console.log('- Contains "Application Date:":', html.includes('Application Date:'));
    console.log('- Contains "Last 7 Days":', html.includes('Last 7 Days'));
    console.log('- Contains "gridResults":', html.includes('gridResults'));
    console.log('- Contains "applicantGridResults":', html.includes('applicantGridResults'));
    console.log('- Contains "searchResultsGrid":', html.includes('searchResultsGrid'));
    console.log('- Contains "runQueryOnLoad":', html.includes('runQueryOnLoad'));
    console.log('- Contains "ajaxGridSearchURL":', html.includes('ajaxGridSearchURL'));
    console.log('- Contains table rows with class "gridRow":', /<tr[^>]*class="[^"]*gridRow[^"]*"/i.test(html));
    console.log('- Contains table rows with class "dataRow":', /<tr[^>]*class="[^"]*dataRow[^"]*"/i.test(html));
    
    // Look for specific patterns that indicate this is still the search form
    const isSearchForm = html.includes('Application Date:') && html.includes('Last 7 Days');
    const hasResults = html.includes('searchResultsGrid') || /<tr[^>]*class="[^"]*(?:gridRow|dataRow)[^"]*"/i.test(html);
    
    console.log('📊 Page type analysis:');
    console.log('- Is search form page:', isSearchForm);
    console.log('- Has search results:', hasResults);
    
    // Extract a larger sample to see the structure
    const htmlSample = html.substring(0, 10000);
    console.log('📄 HTML Sample (first 10000 chars):', htmlSample);
    
    // Look for different table patterns that might contain the data
    console.log('🔍 Table structure analysis:');
    console.log('- Contains <table>:', html.includes('<table'));
    console.log('- Contains <tbody>:', html.includes('<tbody'));
    console.log('- Contains <tr>:', html.includes('<tr'));
    console.log('- Contains <td>:', html.includes('<td'));
    console.log('- Contains "dataGrid":', html.includes('dataGrid'));
    console.log('- Contains "resultList":', html.includes('resultList'));
    console.log('- Contains "applicant":', html.includes('applicant'));
    console.log('- Contains "name":', html.includes('name'));
    console.log('- Contains "score":', html.includes('score'));
    
    // Look for specific grid patterns used in ATAO
    const tablePatterns = [
      /<table[^>]*id="[^"]*grid[^"]*"[^>]*>/gi,
      /<table[^>]*class="[^"]*grid[^"]*"[^>]*>/gi,
      /<table[^>]*class="[^"]*table[^"]*"[^>]*>/gi,
      /<div[^>]*id="[^"]*grid[^"]*"[^>]*>/gi,
      /<div[^>]*class="[^"]*grid[^"]*"[^>]*>/gi
    ];
    
    tablePatterns.forEach((pattern, index) => {
      const matches = html.match(pattern);
      console.log(`- Table pattern ${index + 1} matches:`, matches ? matches.length : 0);
      if (matches) {
        console.log(`  First match: ${matches[0]}`);
      }
    });
    
    // Look for any table rows
    const allTrMatches = html.match(/<tr[^>]*>/gi);
    console.log('- Total <tr> elements found:', allTrMatches ? allTrMatches.length : 0);
    
    if (allTrMatches && allTrMatches.length > 0) {
      console.log('- First few <tr> elements:');
      allTrMatches.slice(0, 5).forEach((tr, index) => {
        console.log(`  ${index + 1}: ${tr}`);
      });
    }
    
    // Look for the actual data content after the table structure
    const dataStartIndex = html.indexOf('</style>');
    if (dataStartIndex > 0) {
      const dataSection = html.substring(dataStartIndex + 8, dataStartIndex + 5000);
      console.log('📊 Data section after styles:', dataSection);
    }

    // Check if this is still the search form or actual results
    if (isSearchForm && !hasResults) {
      console.log('⚠️ Still getting search form page, not results');
      return NextResponse.json({ 
        applicants: [],
        message: 'Search form returned instead of results. The AJAX endpoint may require additional parameters.',
        debug: {
          responseLength: html.length,
          isSearchForm,
          hasResults,
          preview: html.substring(0, 500)
        }
      });
    }

    // Check for login redirect
    if (html.includes('login') || html.includes('Login') || html.includes('authentication')) {
      console.log('❌ Authentication failed - redirected to login');
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    // Parse the HTML to extract applicant data
    const applicants = parseApplicantData(html);
    console.log('✅ Parsed applicants:', applicants.length);

    return NextResponse.json({ applicants });

  } catch (error) {
    console.error('❌ Error in top-applicants API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function parseApplicantData(html: string): TopApplicant[] {
  const applicants: TopApplicant[] = [];
  
  try {
    // Look for the main data grid container
    console.log('🔍 Looking for ATAO grid structure...');
    
    // First, look for the #dataGrid container
    const dataGridMatch = html.match(/<div[^>]*id="dataGrid"[^>]*>([\s\S]*?)<\/div>/);
    if (!dataGridMatch) {
      console.log('❌ No #dataGrid container found');
      
      // Fallback: look for table with id="data-table"
      const dataTableMatch = html.match(/<table[^>]*id="data-table"[^>]*>([\s\S]*?)<\/table>/);
      if (!dataTableMatch) {
        console.log('❌ No #data-table found either');
        return [];
      }
      console.log('✅ Found #data-table as fallback');
    } else {
      console.log('✅ Found #dataGrid container');
    }
    
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
      if (cells.length < 6) {
        console.log(`  ⚠️ Skipping row ${i + 1} - not enough cells (${cells.length})`);
        continue;
      }
      
      // Skip rows that appear to be headers or empty
      const hasActualData = cells.some(cell => cell && cell.length > 0 && !cell.match(/^\s*$/));
      if (!hasActualData) {
        console.log(`  ⚠️ Skipping row ${i + 1} - no actual data`);
        continue;
      }
      
      // Create applicant object - adjust indices based on actual ATAO grid structure
      // Based on the logs: Cell 1=checkbox, Cell 2=empty, Cell 3=name+details, Cell 4=applied_date, etc.
      
      // Extract the actual name from Cell 3 which contains detailed info
      let applicantName = 'Unknown';
      let email = 'NA';
      let phone = 'NA';
      let city = 'NA';
      let state = 'NA';
      let applicationType = 'NA';
      let exclusive = 'NA';
      let esteemStatus = 'NA';
      let workPreference = 'NA';
      let startDate = 'NA';
      let tags: string[] = [];
      let availabilitySchedule: Array<{ day: string; time: string }> = [];
      
      // Helper function to extract detailed information from name column text
      const getDetailValue = (nameColumnText: string, label: string) => {
        const regex = new RegExp(`${label}:\\s*([^\\n\\r]+)`, 'i')
        const match = nameColumnText.match(regex)
        return match ? match[1].trim() : 'NA'
      }
      
      if (cells[2]) { // Cell 3 (index 2) contains the name and details
        const nameColumnText = cells[2];
        
        // Look for the name pattern in the detailed cell content
        const nameMatch = nameColumnText.match(/^([^,]+,\s*[^,\n]+)/);
        if (nameMatch) {
          applicantName = nameMatch[1].trim();
        }
        
        // Extract all the detailed information
        email = getDetailValue(nameColumnText, 'Email');
        phone = getDetailValue(nameColumnText, 'Phone');
        city = getDetailValue(nameColumnText, 'City');
        state = getDetailValue(nameColumnText, 'State');
        applicationType = getDetailValue(nameColumnText, 'Application Type');
        exclusive = getDetailValue(nameColumnText, 'Exclusive\\?');
        esteemStatus = getDetailValue(nameColumnText, 'Esteem Status');
        workPreference = getDetailValue(nameColumnText, 'Work Preference');
        startDate = getDetailValue(nameColumnText, 'Start Date');
        
        // Parse tags if available
        const tagsText = getDetailValue(nameColumnText, 'Tags');
        tags = tagsText !== 'NA' ? tagsText.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        
        // Parse availability schedule if available
        const availabilityScheduleText = getDetailValue(nameColumnText, 'Availability Schedule');
        if (availabilityScheduleText !== 'NA') {
          // Try to parse schedule format if it exists
          // For now, if no specific format is found, show empty array
          availabilitySchedule = [];
        }
      }
      
      // Helper function to parse score values that might be "--"
      const parseScoreValue = (value: string): number | null => {
        if (!value || value.trim() === '--' || value.trim() === '') {
          return null;
        }
        const parsed = parseFloat(value.trim());
        return isNaN(parsed) ? null : parsed;
      };
      
      // Helper function to clean up hiring step text
      const cleanHiringStep = (rawText: string): string => {
        if (!rawText) return '';
        
        return rawText
          .replace(/\r\n/g, ' ') // Replace line breaks with spaces
          .replace(/\t+/g, ' ') // Replace tabs with spaces
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/\(\s*([^)]+)\s*\)/g, '($1)') // Clean up parentheses spacing
          .trim();
      };
      
      // Extract WOTC status from the detailed cell content (Cell 3) - use extracted value or fallback
      let wotcStatus = 'Not Screened';
      if (cells[2]) {
        wotcStatus = getDetailValue(cells[2], 'WOTC Status');
        if (wotcStatus === 'NA') {
          wotcStatus = 'Not Screened'; // Fallback
        }
      }
      
      const applicant: TopApplicant = {
        id: `applicant-${applicants.length + 1}`,
        name: applicantName,
        appliedDate: cells[3] || '', // Cell 4 (index 3) has applied date
        position: cells[4] || '', // Cell 5 (index 4) has position
        location: cells[5] || '', // Cell 6 (index 5) has location
        status: cells[6] || '', // Cell 7 (index 6) has status
        smartScore: parseScoreValue(cells[7]) || null, // Cell 8 (index 7) - SmartScore (currently empty)
        score: parseScoreValue(cells[8]) || null, // Cell 9 (index 8) - Score (shows "--")
        percentageScore: parseScoreValue(cells[8]) || null, // Cell 9 shows "% Score" as "--"
        availability: cells[9] || 'Not Screened', // Cell 10 (index 9) - availability
        wotcStatus: wotcStatus, // Extracted from detailed cell content
        hiringStep: cleanHiringStep(cells[10] || ''), // Cell 11 (index 10) - cleaned hiring steps
        
        // Add the extracted detailed information
        email: email,
        phone: phone,
        city: city,
        state: state,
        applicationType: applicationType,
        exclusive: exclusive,
        esteemStatus: esteemStatus,
        workPreference: workPreference,
        startDate: startDate,
        tags: tags,
        availabilitySchedule: availabilitySchedule
      };
      
      console.log(`  ✅ Created applicant: ${applicant.name} with detailed info`);
      console.log(`    Email: ${email}, Phone: ${phone}, City: ${city}, State: ${state}`);
      applicants.push(applicant);
    }
    
    console.log(`📊 Successfully extracted ${applicants.length} applicants`);
    
  } catch (error) {
    console.error('❌ Error parsing applicant data:', error);
  }
  
  return applicants;
}

export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
