import { NextRequest } from "next/server";
import { parse } from 'node-html-parser';

export interface LegacyAuthResult {
  isValid: boolean;
  cookies: Record<string, string>;
  cookieString: string;
  error?: string;
}

export interface LegacyRequestOptions {
  seq: string;
  reportType?: string;
  searchType?: string;
  event?: string;
  additionalParams?: Record<string, string>;
}

export interface ParsedTableData {
  headers: string[];
  rows: any[][];
  isEmpty: boolean;
}

/**
 * Parse and validate authentication cookies from NextRequest
 */
export function validateLegacyAuth(req: NextRequest): LegacyAuthResult {
  const cookie = req.headers.get("cookie") ?? "";
  console.log("🔍 Request - incoming cookies:", cookie);

  // Parse cookies into a map
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
  
  if (!cookieMap.JSESSIONID) {
    console.log("❌ Missing JSESSIONID cookie");
    return {
      isValid: false,
      cookies: cookieMap,
      cookieString: cookie,
      error: "Missing session cookie"
    };
  }
  
  if (!cookieMap.ConsolidatedJAFTestClientINT) {
    console.log("❌ Missing ConsolidatedJAFTestClientINT cookie");
    return {
      isValid: false,
      cookies: cookieMap,
      cookieString: cookie,
      error: "Missing authentication token cookie"
    };
  }

  return {
    isValid: true,
    cookies: cookieMap,
    cookieString: cookie
  };
}

/**
 * Build query string for legacy system requests
 */
export function buildLegacyQueryString(options: LegacyRequestOptions): string {
  const params = new URLSearchParams({
    seq: options.seq,
    applicationName: 'ConsolidatedJAFTestClientdsiRAT',
    locale: 'en_US'
  });

  if (options.reportType) {
    params.set('reportType', options.reportType);
  }
  
  if (options.searchType) {
    params.set('searchType', options.searchType);
  }
  
  if (options.event) {
    params.set('event', options.event);
  }

  // Add any additional parameters
  if (options.additionalParams) {
    Object.entries(options.additionalParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }

  return `?${params.toString()}`;
}

/**
 * Make a request to the legacy system with proper headers and authentication
 */
export async function makeLegacyRequest(
  queryString: string, 
  cookieString: string,
  requestName: string = "legacy"
): Promise<Response> {
  const url = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp${queryString}`;
  
  console.log('🚀 === MAKING BACKEND API REQUEST ===');
  console.log('📡 Request Name:', requestName);
  console.log('🎯 Full URL:', url);
  console.log('🍪 Cookie String:', cookieString ? '[PRESENT]' : '[MISSING]');
  console.log('🔧 Query String:', queryString);
  console.log('⏰ Request timestamp:', new Date().toISOString());
  console.log('🌐 Legacy Base URL:', process.env.LEGACY_BASE || "http://localhost:8080/atao");

  const response = await fetch(url, {
    headers: {
      cookie: cookieString,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    },
  });

  console.log('📡 === BACKEND API RESPONSE RECEIVED ===');
  console.log('📊 Response Status:', response.status);
  console.log('📋 Response Status Text:', response.statusText);
  console.log('🔗 Response URL:', response.url);
  console.log('📏 Response Headers:', Object.fromEntries(response.headers.entries()));
  console.log('⏰ Response timestamp:', new Date().toISOString());
  
  return response;
}

/**
 * Parse HTML table from legacy system response using cross-platform HTML parser
 */
export function parseHtmlTable(html: string, tableSelector: string = 'table'): ParsedTableData {
  console.log(`📄 HTML response length: ${html.length}`);
  console.log(`🔍 Looking for table with selector: ${tableSelector}`);

  // Use cross-platform HTML parser
  const doc = parseHTML(html);
  console.log(`📋 Parsed HTML document successfully`);

  const table = querySelector(doc, tableSelector);
  if (!table) {
    console.error(`❌ Could not find table with selector '${tableSelector}' in HTML response`);
    const allTables = querySelectorAll(doc, 'table');
    console.log('🔍 Available tables in document:', allTables.map((t: any) => t.id || t.getAttribute?.('class') || t.attrs?.class || 'unnamed'));
    console.log('📄 HTML content preview:', html);
    throw new Error('Invalid response format from legacy system');
  }

  console.log(`✅ Found table with selector '${tableSelector}'`);
  
  // Get table headers using cross-platform approach - be more specific about header selection
  // Only get headers from the actual header row, not from detail containers
  let headerElements = [];
  
  // First try to find headers in thead
  const thead = querySelector(table, 'thead');
  if (thead) {
    headerElements = querySelectorAll(thead, 'th, td');
    console.log(`🏷️ Found ${headerElements.length} header elements in thead`);
  }
  
  // If no thead or empty, try the first tr that contains mostly th elements
  if (headerElements.length === 0) {
    const allRows = querySelectorAll(table, 'tr');
    for (const row of allRows) {
      const thElements = querySelectorAll(row, 'th');
      const tdElements = querySelectorAll(row, 'td');
      
      // If this row has more th than td elements, it's likely a header row
      if (thElements.length > tdElements.length && thElements.length > 5) { // At least 5 headers
        headerElements = [...thElements, ...tdElements];
        console.log(`🏷️ Found ${headerElements.length} header elements in header row`);
        break;
      }
    }
  }
  
  // Fallback: if still no headers, look for a row that looks like headers based on content
  if (headerElements.length === 0) {
    const allRows = querySelectorAll(table, 'tr');
    for (const row of allRows) {
      const cells = querySelectorAll(row, 'th, td');
      if (cells.length > 5) { // Must have reasonable number of cells
        const cellTexts = cells.map((cell: any) => (cell.textContent || cell.text || '').trim().toLowerCase());
        // Check if this looks like a header row based on common header terms
        const hasHeaderTerms = cellTexts.some((text: string) => 
          ['name', 'applied', 'position', 'location', 'status', 'score', 'hiring'].some(term => text.includes(term))
        );
        if (hasHeaderTerms) {
          headerElements = cells;
          console.log(`🏷️ Found ${headerElements.length} header elements based on content matching`);
          break;
        }
      }
    }
  }
  
  // Last resort: take first row
  if (headerElements.length === 0) {
    const firstRow = querySelector(table, 'tr');
    if (firstRow) {
      headerElements = querySelectorAll(firstRow, 'th, td');
      console.log(`🏷️ Found ${headerElements.length} header elements in first row (fallback)`);
    }
  }
  
  // CRITICAL FIX: Get actual data row to verify cell count matches headers
  // Find a sample data row to check structure
  let sampleDataRow = null;
  const allRowElements = querySelectorAll(table, 'tr');
  for (const row of allRowElements) {
    const hasCheckbox = querySelector(row, 'input[type="checkbox"]') !== null;
    const hasNameLink = querySelector(row, 'a[href*="APPLICANTID"]') !== null;
    if (hasCheckbox || hasNameLink) {
      sampleDataRow = row;
      break;
    }
  }
  
  let actualCellCount = 0;
  if (sampleDataRow) {
    // Use the same logic we'll use later to count actual cells
    let sampleDirectCells = [];
    if (sampleDataRow.childNodes) {
      for (let i = 0; i < sampleDataRow.childNodes.length; i++) {
        const child = sampleDataRow.childNodes[i];
        if (child.nodeType === 1 && (child.tagName?.toLowerCase() === 'td' || child.tagName?.toLowerCase() === 'th')) {
          sampleDirectCells.push(child);
        }
      }
    }
    
    if (sampleDirectCells.length === 0) {
      const allCells = querySelectorAll(sampleDataRow, 'td, th');
      sampleDirectCells = allCells.filter((cell: any) => {
        const cellParent = cell.parentNode;
        return cellParent === sampleDataRow;
      });
    }
    
    actualCellCount = sampleDirectCells.length;
    console.log(`🔍 Sample data row has ${actualCellCount} actual cells`);
  }
  
  const headers = headerElements.map((th: any, index: number) => {
    const headerText = (th.textContent || th.text || '').trim();
    // Clean up header text - remove extra whitespace and newlines
    const cleanHeaderText = headerText.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`📋 Header ${index}: "${cleanHeaderText}" (original: "${headerText.substring(0, 100)}")`);
    return cleanHeaderText;
  }).filter((header: string) => header && header.length > 0 && header.length < 100); // Filter out empty or very long headers
  
  console.log('🎯 Final cleaned headers array:', headers);
  console.log('📊 Total headers after filtering:', headers.length);
  console.log(`⚖️ Header count (${headers.length}) vs Actual cell count (${actualCellCount})`);
  
  // CRITICAL FIX: If header count doesn't match actual cell count, adjust headers
  if (actualCellCount > 0 && headers.length !== actualCellCount) {
    console.log(`⚠️ Header/cell mismatch detected! Headers: ${headers.length}, Actual cells: ${actualCellCount}`);
    
    if (actualCellCount > headers.length) {
      // More cells than headers - likely missing headers for icon/image columns
      const missingCount = actualCellCount - headers.length;
      console.log(`📈 Adding ${missingCount} placeholder headers for extra columns`);
      
      // Insert placeholder headers at the beginning for icon/image columns
      for (let i = 0; i < missingCount; i++) {
        if (i === 0 && headers[0] !== "Select All Items") {
          headers.unshift("Select All Items");
        } else {
          headers.splice(1 + i, 0, `Column ${i + 2}`);
        }
      }
    } else if (headers.length > actualCellCount) {
      // More headers than cells - trim excess headers
      const excessCount = headers.length - actualCellCount;
      console.log(`📉 Removing ${excessCount} excess headers`);
      headers.splice(actualCellCount);
    }
    
    console.log('🔧 Adjusted headers array:', headers);
    console.log('📊 New header count after adjustment:', headers.length);
  }

  // Extract data rows using cross-platform approach
  // Be more selective about which rows to include as data rows
  console.log(`🔍 Total rows found in table: ${allRowElements.length}`);
  
  // Filter out header rows and empty/invalid rows
  const dataRowElements = allRowElements.filter((row: any, index: number) => {
    const cells = querySelectorAll(row, 'td, th');
    const rowText = (row.textContent || row.text || '').trim();
    
    // Skip rows that are clearly headers (contains mostly TH elements)
    const thCount = querySelectorAll(row, 'th').length;
    const tdCount = querySelectorAll(row, 'td').length;
    
    // Skip if this row is mostly headers
    if (thCount > tdCount && thCount > 0) {
      console.log(`⏭️ Skipping header row ${index}: ${thCount} TH vs ${tdCount} TD`);
      return false;
    }
    
    // Skip rows that are inside nested tables (like availability grids)
    const parentTable = row.parentNode?.parentNode; // tr -> tbody/table -> table
    if (parentTable && parentTable !== table) {
      // Check if this row is inside a nested table
      const parentTableClasses = parentTable.className || parentTable.getAttribute?.('class') || '';
      if (parentTableClasses.includes('availabiltyGrid') || parentTableClasses.includes('ui') || 
          parentTable.id !== table.id) {
        console.log(`⏭️ Skipping nested table row ${index}: inside ${parentTableClasses || 'nested table'}`);
        return false;
      }
    }
    
    // Skip rows with too few cells (less than expected header count)
    if (cells.length > 0 && headers.length > 0 && cells.length < Math.max(5, Math.floor(headers.length * 0.5))) {
      console.log(`⏭️ Skipping malformed row ${index}: ${cells.length} cells (expected at least ${Math.floor(headers.length * 0.5)} out of ${headers.length})`);
      return false;
    }
    
    // Skip completely empty rows
    if (cells.length === 0 || !rowText) {
      console.log(`⏭️ Skipping empty row ${index}`);
      return false;
    }
    
    // Skip rows that look like they contain only day names or time values
    const dayNamePattern = /^(mon|tue|wed|thu|fri|sat|sun|any time|from:|to:|--)$/i;
    const cellTexts = cells.map((cell: any) => (cell.textContent || cell.text || '').trim().toLowerCase());
    const isScheduleRow = cellTexts.length > 0 && cellTexts.every((text: string) => !text || dayNamePattern.test(text));
    
    if (isScheduleRow && cellTexts.some((text: string) => text && text !== '--')) {
      console.log(`⏭️ Skipping schedule/availability row ${index}: ${cellTexts.join(', ')}`);
      return false;
    }
    
    // Only include rows that have a checkbox or a name link (actual applicant rows)
    const hasCheckbox = querySelector(row, 'input[type="checkbox"]') !== null;
    const hasNameLink = querySelector(row, 'a[href*="APPLICANTID"]') !== null;
    const hasApplicantData = hasCheckbox || hasNameLink;
    
    if (!hasApplicantData && cells.length < headers.length) {
      console.log(`⏭️ Skipping non-applicant row ${index}: no checkbox or name link`);
      return false;
    }
    
    console.log(`✅ Including data row ${index}: ${cells.length} cells (headers: ${headers.length})`);
    return true;
  });
  
  console.log(`📊 Filtered to ${dataRowElements.length} data rows from ${allRowElements.length} total rows`);
  
  const rows = dataRowElements.map((row: any, rowIndex: number) => {
    console.log(`\n🔄 Processing data row ${rowIndex}:`);
    
    // CRITICAL FIX: Only get direct child cells, not cells from nested tables
    // First, try to get direct child td/th elements
    let directCells = [];
    
    // Check if the row has child nodes we can iterate
    if (row.childNodes) {
      for (let i = 0; i < row.childNodes.length; i++) {
        const child = row.childNodes[i];
        // Check if this is a td or th element (nodeType 1 = element)
        if (child.nodeType === 1 && (child.tagName?.toLowerCase() === 'td' || child.tagName?.toLowerCase() === 'th')) {
          directCells.push(child);
        }
      }
    }
    
    // Fallback: if no direct cells found, use querySelectorAll but filter out cells from nested tables
    if (directCells.length === 0) {
      const allCells = querySelectorAll(row, 'td, th');
      directCells = allCells.filter((cell: any) => {
        // Make sure this cell is a direct child of the row (not nested in another table)
        const cellParent = cell.parentNode;
        return cellParent === row;
      });
    }
    
    // Final fallback: if still no cells, use all cells but limit to expected count
    if (directCells.length === 0) {
      const allCells = querySelectorAll(row, 'td, th');
      // Take only the first N cells that match expected header count
      const expectedCellCount = headers.length || 12;
      directCells = allCells.slice(0, expectedCellCount);
      console.log(`⚠️ Row ${rowIndex} fallback: using first ${directCells.length} of ${allCells.length} total cells`);
    }
    
    console.log(`  📱 Row ${rowIndex} has ${directCells.length} direct cells (filtered from potential nested cells)`);
    
    const cellData = directCells.map((cell: any, cellIndex: number) => {
      const cellText = (cell.textContent || cell.text || '').trim();
      const cellHtml = cell.innerHTML || cell.outerHTML || '';
      
      console.log(`    📝 Cell ${cellIndex}: text="${cellText.substring(0, 50)}${cellText.length > 50 ? '...' : ''}", html length=${cellHtml.length}`);
      
      // Check for special elements in cell using cross-platform approach
      const hasAnchor = querySelector(cell, 'a') !== null;
      const hasInput = querySelector(cell, 'input') !== null;
      const hasDetailContainer = querySelector(cell, '.dgDetail-inner, .jobDetailContainer, .dgDetailContainer') !== null;
      
      if (hasAnchor || hasInput || hasDetailContainer) {
        console.log(`    🔍 Cell ${cellIndex} special elements: anchor=${hasAnchor}, input=${hasInput}, detailContainer=${hasDetailContainer}`);
      }
      
      // Log more details about specific cells that should contain key data
      if (cellIndex < 10) { // Log first 10 cells in detail
        console.log(`    🔍 Cell ${cellIndex} detailed text: "${cellText}"`);
        if (hasAnchor) {
          const anchor = querySelector(cell, 'a');
          const anchorText = anchor ? (anchor.textContent || anchor.text || '').trim() : '';
          console.log(`    🔗 Cell ${cellIndex} anchor text: "${anchorText}"`);
        }
      }
      
      return {
        text: cellText,
        html: cellHtml,
      element: cell
      };
    });
    
    console.log(`  ✅ Row ${rowIndex} processed with ${cellData.length} cells`);
    return cellData;
  });

  console.log(`🎯 Final parsing results: ${headers.length} headers, ${rows.length} data rows`);
  console.log(`📊 Sample row data structure:`, rows[0]?.map((cell: any, i: number) => `${i}: "${cell.text.substring(0, 30)}"`));

  return {
    headers,
    rows,
    isEmpty: rows.length === 0
  };
}

/**
 * Extract text from HTML using regex pattern
 */
export function extractTextByPattern(html: string, pattern: RegExp): string {
  const match = html.match(pattern);
  return match ? match[1].trim() : '';
}

/**
 * Extract ID from checkbox input element
 */
export function extractIdFromCheckbox(cellElement: any, fallbackPrefix: string, index: number): string {
  console.log(`🔍 === EXTRACTING ID FROM CHECKBOX ===`);
  console.log(`📄 Cell element:`, cellElement);
  
  // Try multiple approaches to find the checkbox
  let checkboxInput = null;
  
  // 1. Direct search for checkbox input
  checkboxInput = querySelector(cellElement, 'input[type="checkbox"]');
  
  // 2. If not found, search for any input with checkbox-related attributes
  if (!checkboxInput) {
    checkboxInput = querySelector(cellElement, 'input[class*="check"], input[name*="selected"]');
  }
  
  // 3. If still not found, search for any input element
  if (!checkboxInput) {
    checkboxInput = querySelector(cellElement, 'input');
  }
  
  if (checkboxInput) {
    console.log(`✅ Found checkbox input element`);
    
    // Try different ways to get the ID/value
    const value = checkboxInput.getAttribute?.('value') || 
                  checkboxInput.getAttribute?.('id') || 
                  checkboxInput.attrs?.value ||
                  checkboxInput.attrs?.id ||
                  checkboxInput.value ||
                  checkboxInput.id;
    
    console.log(`🆔 Checkbox attributes:`, {
      value: checkboxInput.getAttribute?.('value') || checkboxInput.attrs?.value,
      id: checkboxInput.getAttribute?.('id') || checkboxInput.attrs?.id,
      name: checkboxInput.getAttribute?.('name') || checkboxInput.attrs?.name,
      class: checkboxInput.getAttribute?.('class') || checkboxInput.attrs?.class
    });
    
    if (value && value !== `${fallbackPrefix}-${index + 1}`) {
      console.log(`🎯 Extracted ID from checkbox: ${value}`);
      return value;
    }
  } else {
    console.log(`❌ No checkbox input found in cell`);
    console.log(`📄 Cell HTML:`, cellElement.innerHTML || cellElement.outerHTML || '');
  }
  
  // Fallback to index-based ID
  const fallbackId = `${fallbackPrefix}-${index + 1}`;
  console.log(`🔄 Using fallback ID: ${fallbackId}`);
  return fallbackId;
}

/**
 * Extract detailed information from popup/detail containers using cross-platform HTML parser
 */
export function extractDetailInfo(container: any): Record<string, string> {
  console.log(`\n🔍 === EXTRACTING DETAIL INFO ===`);
  const details: Record<string, string> = {};
  
  if (!container) {
    console.log(`❌ No container provided for detail extraction`);
    return details;
  }
  
  // Get the HTML content
  const html = container.innerHTML || container.outerHTML || '';
  
  console.log(`📄 Container HTML length: ${html.length}`);
  console.log(`🔍 Container HTML preview:`, html.substring(0, 500));
  
  // Use cross-platform HTML parser
  const doc = parseHTML(`<div>${html}</div>`);
  const containerElement = querySelector(doc, 'div');
  
  if (!containerElement) {
    console.log(`❌ Could not parse container HTML`);
    return details;
  }
  
  console.log(`✅ Successfully parsed container with cross-platform parser`);
  
  // 1. Extract availability grid data
  const availabilityTable = querySelector(containerElement, '.availabiltyGrid, table.availabiltyGrid');
  if (availabilityTable) {
    console.log(`📅 Found availability table`);
    const availabilityData: any = {};
    
    // Extract day-wise availability
    const dayHeaders = querySelectorAll(availabilityTable, 'th');
    const fromRow = querySelector(availabilityTable, 'tr.from');
    const toRow = querySelector(availabilityTable, 'tr.to');
    
    if (fromRow && toRow) {
      const fromCells = querySelectorAll(fromRow, 'td');
      const toCells = querySelectorAll(toRow, 'td');
      
      dayHeaders.forEach((header: any, index: number) => {
        const day = (header.textContent || header.text || '').trim();
        if (day && index > 0 && index <= fromCells.length) { // Skip first header "From:"
          const fromTime = fromCells[index - 1] ? (fromCells[index - 1].textContent || fromCells[index - 1].text || '').trim() : '--';
          const toTime = toCells[index - 1] ? (toCells[index - 1].textContent || toCells[index - 1].text || '').trim() : '--';
          
          if (day.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/)) {
            availabilityData[`availability_${day.toLowerCase()}_from`] = fromTime;
            availabilityData[`availability_${day.toLowerCase()}_to`] = toTime;
            console.log(`📅 ${day}: ${fromTime} - ${toTime}`);
          }
        }
      });
      
      // Add summary of availability
      const availableDays = Object.keys(availabilityData).filter(key => 
        key.includes('_from') && availabilityData[key] !== '--' && availabilityData[key] !== ''
      ).map(key => key.replace('availability_', '').replace('_from', '')).join(', ');
      
      if (availableDays) {
        details.availableDays = availableDays;
        details.availability = availableDays;
        console.log(`📅 Available days summary: ${availableDays}`);
      }
      
      // Merge all availability data
      Object.assign(details, availabilityData);
    }
  }
  
  // 2. Look for formRow divs which contain the structured data
  const formRows = querySelectorAll(containerElement, '.formRow');
  
  if (formRows && formRows.length > 0) {
    console.log(`️ Found ${formRows.length} form rows`);
    
    formRows.forEach((row: any, index: number) => {
      console.log(`\n  🔄 Processing form row ${index}:`);
      try {
        // Get the label and value from each form row
        const labelElement = querySelector(row, '.emphasized.label, label, .label');
        
        if (labelElement) {
          const labelText = (labelElement.textContent || labelElement.text || '').trim().replace(':', '').toLowerCase();
          let valueText = '';
          
          console.log(`    🏷️ Found label: "${labelText}"`);
          
          // Get all text content from the row and extract the value part
          const rowText = row.textContent || row.text || '';
          const labelTextInRow = (labelElement.textContent || labelElement.text || '').trim();
          
          console.log(`    📝 Row text: "${rowText}"`);
          console.log(`    🏷️ Label text in row: "${labelTextInRow}"`);
          
          // Try to find value in various ways
          // 1. Look for span with field class
          const fieldSpan = querySelector(row, '.field, .readOnly, span:not(.label)');
          if (fieldSpan) {
            valueText = (fieldSpan.textContent || fieldSpan.text || '').trim();
            console.log(`    🎯 Found field span: "${valueText}"`);
          } else {
            // 2. Remove the label text to get the value
          valueText = rowText.replace(labelTextInRow, '').trim();
          // Clean up the value text - remove leading colons and whitespace
          valueText = valueText.replace(/^\s*:\s*/, '').trim();
          }
          
          console.log(`    ✅ Extracted value: "${valueText}"`);
          
          // Map the labels to our expected field names
          let mappedField = '';
          switch (labelText) {
            case 'name':
              const cleanName = valueText.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
              details.name = cleanName;
              mappedField = 'name';
              break;
            case 'applied':
              details.appliedDate = valueText;
              mappedField = 'appliedDate';
              break;
            case 'phone':
              details.phone = valueText === '--' ? '' : valueText;
              mappedField = 'phone';
              break;
            case 'email':
              details.email = valueText === '--' ? '' : valueText;
              mappedField = 'email';
              break;
            case 'work preference':
              details.workPreference = valueText === '--' ? '' : valueText;
              mappedField = 'workPreference';
              break;
            case 'city':
              details.city = valueText === '--' ? '' : valueText;
              mappedField = 'city';
              break;
            case 'state':
              details.state = valueText === '--' ? '' : valueText;
              mappedField = 'state';
              break;
            case 'status':
              details.status = valueText;
              mappedField = 'status';
              break;
            case 'esteem status':
              details.esteemStatus = valueText;
              mappedField = 'esteemStatus';
              break;
            case 'exclusive?':
            case 'exclusive':
              details.exclusive = valueText;
              mappedField = 'exclusive';
              break;
            case 'date available to start':
              details.dateAvailableToStart = valueText;
              mappedField = 'dateAvailableToStart';
              break;
            case 'application type':
              // For application type, we might need to look for the span text
              const appTypeSpan = querySelector(row, 'span:not(.label)');
              if (appTypeSpan) {
                details.applicationType = (appTypeSpan.textContent || appTypeSpan.text || '').trim() || valueText;
                console.log(`    🔍 Found span for application type: "${(appTypeSpan.textContent || appTypeSpan.text || '').trim()}"`);
              } else {
                details.applicationType = valueText;
              }
              mappedField = 'applicationType';
              break;
            default:
              // Store any other fields we find
              if (labelText && valueText && valueText !== '--') {
                const fieldName = labelText.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                const cleanValue = valueText.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
                details[fieldName] = cleanValue;
                mappedField = fieldName;
              }
              break;
          }
          
          if (mappedField) {
            console.log(`    ✅ Mapped to field: "${mappedField}" = "${details[mappedField]}"`);
          } else {
            console.log(`    ⏭️ No mapping for label: "${labelText}"`);
          }
        } else {
          console.log(`    ❌ No label element found in form row ${index}`);
        }
      } catch (error) {
        console.error(`    ❌ Error processing form row ${index}:`, error);
      }
    });
  } else {
    console.log(`ℹ️ No form rows found, trying alternative extraction methods`);
  }
  
  // 3. Extract workflow information
  const workflowElements = querySelectorAll(containerElement, '*');
  const workflowSteps: string[] = [];
  
  workflowElements.forEach((element: any) => {
    const text = (element.textContent || element.text || '').trim();
    // Look for workflow patterns like "Contact (Workflow has not started)"
    const workflowMatch = text.match(/^([A-Z][a-zA-Z\s]+)\s*\(\s*(.*?)\s*\)$/);
    if (workflowMatch) {
      const stepName = workflowMatch[1].trim();
      const stepStatus = workflowMatch[2].trim();
      const stepInfo = `${stepName}: ${stepStatus}`;
      
      if (!workflowSteps.includes(stepInfo) && stepName.length < 50) {
        workflowSteps.push(stepInfo);
        console.log(`🔄 Found workflow step: ${stepInfo}`);
      }
    }
  });
  
  if (workflowSteps.length > 0) {
    details.workflowSteps = workflowSteps.join('; ');
    details.totalWorkflowSteps = workflowSteps.length.toString();
    console.log(`🔄 Total workflow steps: ${workflowSteps.length}`);
  }
  
  // 4. Also try regex extraction as well to catch anything we missed
  console.log('Also trying regex patterns for comprehensive extraction');
  
  // Enhanced regex patterns to handle the specific HTML structure
  const patterns = {
    phone: /<div class="emphasized label">Phone:<\/div>\s*([^<\n]+)/i,
    email: /<div class="emphasized label">Email:<\/div>\s*([^<\n]+)/i,
    workPreference: /<div class="emphasized label">Work Preference:<\/div>\s*([^<\n]+)/i,
    city: /<div class="emphasized label">City:<\/div>\s*([^<\n]+)/i,
    state: /<div class="emphasized label">State:<\/div>\s*([^<\n]+)/i,
    status: /<div class="emphasized label">Status:<\/div>\s*([^<\n]+)/i,
    esteemStatus: /<div class="emphasized label">Esteem Status:<\/div>\s*([^<\n]+)/i,
    exclusive: /<div class="emphasized label">Exclusive\?:<\/div>\s*([^<\n]+)/i,
    applicationType: /<label>Application Type:<\/label>[^<]*<span[^>]*>([^<]+)<\/span>/i,
    dateAvailableToStart: /<div class="emphasized label">Date Available to Start:<\/div>\s*<span[^>]*>([^<]+)<\/span>/i,
    // Additional patterns for other possible fields
    genericSource: /<div class="emphasized label">Generic Source:<\/div>\s*([^<\n]+)/i,
    specificSource: /<div class="emphasized label">Specific Source:<\/div>\s*([^<\n]+)/i,
    ssn: /<div class="emphasized label">SSN:<\/div>\s*([^<\n]+)/i,
    address: /<div class="emphasized label">Address:<\/div>\s*([^<\n]+)/i,
    zipCode: /<div class="emphasized label">Zip Code:<\/div>\s*([^<\n]+)/i
  };
  
  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = html.match(pattern);
    if (match && match[1] && !details[key]) {
      const value = match[1].trim();
      details[key] = value === '--' ? '' : value;
      console.log(`Regex extracted: ${key} = ${value}`);
    }
  });
  
  // 5. Extract any other labeled data we might have missed
  const allLabels = querySelectorAll(containerElement, '.emphasized.label, label, .label');
  allLabels.forEach((label: any) => {
    const labelText = (label.textContent || label.text || '').trim().replace(':', '').toLowerCase();
    if (labelText && !details[labelText] && labelText.length < 30) {
      // Try to find the value after this label
      const parent = label.parentElement || label.parentNode;
      if (parent) {
        const parentText = parent.textContent || parent.text || '';
        const labelTextInParent = (label.textContent || label.text || '').trim();
        let valueText = parentText.replace(labelTextInParent, '').trim();
        valueText = valueText.replace(/^\s*:\s*/, '').trim();
        
        if (valueText && valueText !== '--' && valueText.length < 100 && valueText.length > 0) {
          const fieldName = labelText.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
          details[fieldName] = valueText;
          console.log(`Additional extraction: ${fieldName} = ${valueText}`);
        }
      }
    }
  });

  console.log(`🎯 Final extracted details:`, details);
  return details;
}

/**
 * Generate fallback data with proper error handling
 */
export async function getFallbackData<T>(
  mockDataLoader: () => Promise<T>,
  dataSourceLabel: string = 'mock-fallback'
): Promise<{ data: T; headers: Record<string, string> }> {
  try {
    const data = await mockDataLoader();
    return {
      data,
      headers: {
        'X-Data-Source': dataSourceLabel
      }
    };
  } catch (mockError) {
    console.error("❌ Error loading fallback data:", mockError);
    throw new Error("Failed to load fallback data");
  }
}

// Cross-platform HTML parsing function
function parseHTML(html: string) {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.DOMParser) {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html');
  } else {
    // Use node-html-parser for server-side
    return parse(html);
  }
}

// Cross-platform element querying
function querySelector(doc: any, selector: string) {
  if (!doc) {
    console.error('querySelector: doc is null or undefined');
    return null;
  }
  
  if (doc.querySelector) {
    return doc.querySelector(selector);
  } else {
    // node-html-parser syntax
    return doc.querySelector(selector);
  }
}

function querySelectorAll(doc: any, selector: string) {
  if (!doc) {
    console.error('querySelectorAll: doc is null or undefined');
    return [];
  }
  
  if (doc.querySelectorAll) {
    return Array.from(doc.querySelectorAll(selector));
  } else {
    // node-html-parser syntax
    return doc.querySelectorAll(selector) || [];
  }
}
