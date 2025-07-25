import { ApplicationPoolCandidate } from "../types";
import {
  validateLegacyAuth,
  buildLegacyQueryString,
  makeLegacyRequest,
  parseHtmlTable,
  extractIdFromCheckbox,
  extractDetailInfo,
  getFallbackData
} from "../legacy-api-utils";

// Pool type definitions
export type PoolType = 'Pool' | 'PoolPassed' | 'PoolFailed';

// Helper function to build legacy request options based on pool type
function buildPoolRequestOptions(poolType: PoolType) {
  return {
    seq: 'applicantGridResults',
    reportType: poolType,
    additionalParams: {
      hmcBidStatus: 'JobBidStatusesForHMC.Prescreened',
      exclusive: 'Exclusive.pool',
      event: 'com.deploy.application.hmc.plugin.ApplicantGrid.search'
    }
  };
}

export async function getApplicationPool(
  poolType: PoolType = 'Pool',
  filters?: { 
    fromDate?: string;
    toDate?: string;
    clientId?: string;
    userId?: string;
  },
  cookieString?: string
): Promise<ApplicationPoolCandidate[]> {
    console.log('🔄 === getApplicationPool FUNCTION CALLED ===');
    console.log('📊 Pool Type:', poolType);
    console.log('🔧 Filters:', filters);
    console.log('🍪 Cookie String provided:', !!cookieString);
    console.log('⏰ Function call timestamp:', new Date().toISOString());
    
    try {
      // If no cookie string provided, return empty array
      if (!cookieString) {
        console.warn('⚠️ No authentication cookies provided');
        console.log('📊 Returning empty array due to missing authentication');
        return [];
      }

      console.log('🔧 Building pool request options...');
      
      try {
        // Build query string using shared utility
        const requestOptions = buildPoolRequestOptions(poolType);
        console.log('⚙️ Request options built:', requestOptions);
        
        const queryString = buildLegacyQueryString(requestOptions);
        console.log('🔗 Query string built:', queryString);
        console.log('🎯 Full backend URL will be: [LEGACY_BASE]/index.jsp' + queryString);
      } catch (buildError: unknown) {
        const errorMessage = buildError instanceof Error ? buildError.message : String(buildError);
        console.error('❌ Error building request options:', errorMessage);
        console.log('📊 Returning empty array due to request building error');
        return [];
      }

      console.log('📡 Making legacy request to backend...');
      
      let response: Response;
      try {
        // Make request using shared utility
        const requestOptions = buildPoolRequestOptions(poolType);
        const queryString = buildLegacyQueryString(requestOptions);
        response = await makeLegacyRequest(queryString, cookieString, `application pool ${poolType}`);
        console.log('📡 Backend response received, status:', response.status);
      } catch (requestError: unknown) {
        const errorMessage = requestError instanceof Error ? requestError.message : String(requestError);
        console.error('❌ Network error making request to backend:', errorMessage);
        console.log('📊 Returning empty array due to network error');
        return [];
      }
  
      // Check if we got redirected to login
      if (response.status === 302) {
        const location = response.headers.get('location');
        console.log('🔄 Received redirect (302), location:', location);
        if (location?.includes('seq=login')) {
          console.warn('🔒 Session expired for application pool request');
          console.log('📊 Returning empty array due to session expiry');
          return [];
        }
      }
  
      if (!response.ok) {
        console.error(`❌ HTTP error from backend - Status: ${response.status}, Message: ${response.statusText}`);
        
        // Try to get more error details from response
        try {
          const errorText = await response.text();
          console.error('❌ Backend error response body:', errorText.substring(0, 500));
        } catch (textError) {
          console.error('❌ Could not read error response body');
        }
        
        console.log('📊 Returning empty array due to HTTP error');
        return [];
      }
  
      let html: string;
      try {
        console.log('📄 Reading HTML response from backend...');
        html = await response.text();
        console.log('📏 HTML response length:', html.length);
        console.log('🔍 HTML preview (first 500 chars):', html.substring(0, 500));
      } catch (readError: unknown) {
        const errorMessage = readError instanceof Error ? readError.message : String(readError);
        console.error('❌ Error reading HTML response:', errorMessage);
        console.log('📊 Returning empty array due to response reading error');
        return [];
      }
      
      console.log(`🔄 Parsing ${poolType} applications with DOMParser extraction...`);
      
      // Comprehensive error handling for table parsing
      try {
        // Parse the HTML table using shared utility - try multiple selectors
        let tableData;
        let tableSelector = '';
        
        // Try different table selectors in order of preference
        const selectors = [
          'table#data-table',
          'table.ui.table', 
          'table',
          '#gridResults table',
          '.dgGrid table'
        ];
        
        console.log(`🔍 Attempting to parse table from HTML...`);
        
        // Try each selector but suppress individual errors
        for (const selector of selectors) {
          try {
            // Attempt to parse silently
            const parseResult = parseHtmlTable(html, selector);
            
            if (parseResult && !parseResult.isEmpty && parseResult.headers && parseResult.headers.length > 0 && parseResult.rows.length > 0) {
              tableData = parseResult;
              tableSelector = selector;
              console.log(`✅ Successfully parsed table with selector: ${selector}`);
              console.log(`📊 Found ${parseResult.headers.length} headers and ${parseResult.rows.length} rows`);
              break;
            }
          } catch {
            // Silently continue to next selector
            continue;
          }
        }
        
        // If no table was successfully parsed, return empty array immediately
        if (!tableData) {
          console.log('ℹ️ No valid table structure found in response - returning empty array');
          return [];
        }
        
        // Extract header information dynamically
        const headers = tableData.headers || [];
        
        if (headers.length === 0 || tableData.rows.length === 0) {
          console.log('ℹ️ Table structure found but no data available - returning empty array');
          return [];
        }
        
        console.log(`🎯 Successfully found table with selector "${tableSelector}"`);
        console.log(`📊 Table has ${headers.length} columns and ${tableData.rows.length} rows`);
        
        // Process each row dynamically based on the actual headers
        const applications = tableData.rows.map((cells, rowIndex) => {
          console.log(`\n🔄 === TRANSFORMING ROW ${rowIndex} ===`);
          console.log(`📊 Row ${rowIndex} input: ${cells.length} cells`);
          
          // Create dynamic candidate object
          const candidate: any = {
            id: `row-${rowIndex}`,
            rawData: {
              headers: headers,
              cells: cells.map(cell => ({
                text: cell?.text || '',
                html: cell?.element?.innerHTML || ''
              })),
              extractedFields: {}
            }
          };
          
          console.log(`🏗️ Initial candidate object created for row ${rowIndex}`);
          console.log(`📋 Candidate ID: ${candidate.id}`);
          
          // Extract data for each header-cell pair
          headers.forEach((header, headerIndex) => {
            console.log(`\n  🔍 Processing header ${headerIndex}: "${header}"`);
            
            const cell = cells[headerIndex];
            const cellText = cell?.text?.trim() || '';
            const cellElement = cell?.element;
            
            console.log(`    📝 Cell text: "${cellText}"`);
            console.log(`    🏷️ Header: "${header}" -> Cell: "${cellText}"`);
            console.log(`    📊 Cell index: ${headerIndex}, Available cells: ${cells.length}`);
            
            // Store the raw header-value mapping
            const headerKey = header.trim();
            const normalizedKey = headerKey.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
            
            console.log(`    🔄 Mapping: "${headerKey}" -> "${normalizedKey}"`);
            
            candidate[headerKey] = cellText;
            candidate[normalizedKey] = cellText;
            candidate.rawData.extractedFields[headerKey] = cellText;
            candidate.rawData.extractedFields[normalizedKey] = cellText;
            
            console.log(`    ✅ Stored: candidate["${headerKey}"] = "${cellText}"`);
            console.log(`    ✅ Stored: candidate["${normalizedKey}"] = "${cellText}"`);
            
            // Extract ID from checkbox if this is the first column
            if (headerIndex === 0 && cellElement) {
              console.log(`    🔍 Checking first column for ID extraction`);
              try {
                const extractedId = extractIdFromCheckbox(cellElement, 'candidate', rowIndex);
                if (extractedId !== `candidate-${rowIndex + 1}`) {
                  console.log(`    🆔 Extracted ID: ${extractedId} (replacing ${candidate.id})`);
                  candidate.id = extractedId;
                } else {
                  console.log(`    🆔 Using default ID: ${candidate.id}`);
                }
              } catch {
                // Silently use default ID if extraction fails
                console.log(`    🆔 Using default ID: ${candidate.id}`);
              }
            }
            
            // Extract additional details from any cell that contains detail containers
            if (cellElement) {
              try {
                const detailContainers = cellElement.querySelectorAll('.dgDetail-inner, .jobDetailContainer, .dgDetailContainer');
                if (detailContainers.length > 0) {
                  console.log(`    🔍 Found ${detailContainers.length} detail containers in cell for header "${header}"`);
                  
                  detailContainers.forEach((container: any, containerIndex: number) => {
                    console.log(`      🔧 Processing detail container ${containerIndex}`);
                    try {
                      const details = extractDetailInfo(container);
                      console.log(`      📊 Detail container ${containerIndex} extracted:`, details);
                      
                      // Merge detail information into candidate object
                      Object.keys(details).forEach(detailKey => {
                        if (details[detailKey] && details[detailKey] !== '--') {
                          console.log(`        ➕ Adding detail: ${detailKey} = "${details[detailKey]}"`);
                          candidate[detailKey] = details[detailKey];
                          candidate.rawData.extractedFields[detailKey] = details[detailKey];
                        } else {
                          console.log(`        ⏭️ Skipping empty detail: ${detailKey} = "${details[detailKey]}"`);
                        }
                      });
                    } catch {
                      // Silently continue if detail extraction fails
                      console.log(`      ⚠️ Failed to extract details from container ${containerIndex}`);
                    }
                  });
                } else {
                  console.log(`    ℹ️ No detail containers found in cell for header "${header}"`);
                }
                
                // Check for specific hiring steps span (like SPAN_DC100033)
                const hiringStepsSpan = cellElement.querySelector('span[id^="SPAN_DC"]');
                if (hiringStepsSpan) {
                  try {
                    const hiringStepsText = (hiringStepsSpan.textContent || hiringStepsSpan.text || '').trim();
                    console.log(`    🎯 Found hiring steps span: ${hiringStepsSpan.id || 'unknown'}`);
                    console.log(`    📋 Hiring steps content: "${hiringStepsText.substring(0, 200)}..."`);
                    
                    if (hiringStepsText && hiringStepsText.length > 0) {
                      candidate.hiringStepsRaw = hiringStepsText;
                      candidate.rawData.extractedFields.hiringStepsRaw = hiringStepsText;
                      
                      // Parse the hiring steps from the HTML structure
                      // Look for workflow step patterns: "StepName ( status )"
                      const stepMatches = hiringStepsText.match(/([A-Z][^(]+)\s*\(\s*([^)]+)\s*\)/g);
                      
                      if (stepMatches && stepMatches.length > 0) {
                        const steps = stepMatches.map((match: string) => {
                          const stepMatch = match.match(/([A-Z][^(]+)\s*\(\s*([^)]+)\s*\)/);
                          if (stepMatch) {
                            const stepName = stepMatch[1].trim();
                            const stepStatus = stepMatch[2].trim();
                            // Keep the original format: "StepName ( Status )"
                            return `${stepName} ( ${stepStatus} )`;
                          }
                          return match.trim();
                        }).slice(0, 15); // Reasonable limit
                        
                        candidate.hiringSteps = steps.join(', ');
                        candidate.hiringStepsCount = steps.length;
                        candidate.rawData.extractedFields.hiringSteps = candidate.hiringSteps;
                        
                        console.log(`    ✅ Parsed ${steps.length} hiring steps`);
                        console.log(`    📋 First 3 steps: ${steps.slice(0, 3).join(', ')}${steps.length > 3 ? '...' : ''}`);
                        
                        // Find the first step that's not "Workflow has not started" for current hiring step
                        const activeStep = steps.find((step: string) => 
                          !step.toLowerCase().includes('workflow has not started') && 
                          !step.toLowerCase().includes('not started')
                        );
                        
                        // Don't set individual hiringStep here - let post-processing handle it
                        // so we can use the full workflow list instead of just one step
                        console.log(`    📊 Parsed complete workflow with ${steps.length} steps`);
                      } else {
                        // Fallback: try to extract step names by splitting on common patterns
                        const fallbackSteps = hiringStepsText
                          .split(/(?=Contact|Drug Screening|Externally|Interview|New Hire|Offer|Onboarding|Phone Screen|Review Application)/)
                          .filter((step: string) => step.trim().length > 5)
                          .map((step: string) => {
                            const cleanStep = step.trim().replace(/\s+/g, ' ');
                            // Try to extract step name and status
                            const stepMatch = cleanStep.match(/^([^(]+?)\s*\(\s*([^)]+?)\s*\)/);
                            if (stepMatch) {
                              const stepName = stepMatch[1].trim();
                              const stepStatus = stepMatch[2].trim();
                              return `${stepName} ( ${stepStatus} )`;
                            }
                            return cleanStep;
                          })
                          .slice(0, 10);
                        
                        if (fallbackSteps.length > 0) {
                          candidate.hiringSteps = fallbackSteps.join(', ');
                          candidate.hiringStepsCount = fallbackSteps.length;
                          console.log(`    ⚡ Fallback parsing found ${fallbackSteps.length} steps`);
                        }
                      }
                    }
                  } catch {
                    // Silently continue if hiring steps parsing fails
                    console.log(`    ⚠️ Failed to parse hiring steps`);
                  }
                }
                
                // Also check for anchor tags (names/links) - extract clean name from anchor
                const anchor = cellElement.querySelector('a');
                if (anchor && anchor.textContent?.trim()) {
                  const anchorText = anchor.textContent.trim();
                  console.log(`    🔗 Found anchor in "${header}": "${anchorText}"`);
                  
                  // If this is a name column, use the anchor text as the clean name
                  if (header.toLowerCase().includes('name')) {
                    candidate.name = anchorText;
                    candidate.rawData.extractedFields.cleanName = anchorText;
                    console.log(`    ✅ Set clean name from anchor: "${anchorText}"`);
                  }
                  
                  const anchorKey = `${normalizedKey}_link`;
                  candidate[anchorKey] = anchorText;
                  candidate.rawData.extractedFields[anchorKey] = anchorText;
                  console.log(`    ✅ Stored anchor: candidate["${anchorKey}"] = "${anchorText}"`);
                }
              } catch {
                // Silently continue if any cell element processing fails
                console.log(`    ⚠️ Failed to process cell element for header "${header}"`);
              }
            }
          });
          
          // Post-processing: Clean up and prioritize the best values
          console.log(`\n🧹 === POST-PROCESSING ROW ${rowIndex} ===`);
          
          // Prioritize clean name from detail extraction or anchor over messy cell text
          if (candidate.name && candidate.name !== 'N/A') {
            // Keep the clean name from detail extraction
            console.log(`    ✅ Using clean name from details: "${candidate.name}"`);
          } else if (candidate.Name && !candidate.Name.includes('\n') && !candidate.Name.includes('\t')) {
            // Use Name field if it's clean
            candidate.name = candidate.Name;
            console.log(`    ✅ Using clean Name field: "${candidate.name}"`);
          } else {
            // Try to extract clean name from the messy Name field
            const messyName = candidate.Name || '';
            const nameMatch = messyName.match(/Name:\s*([^\n\r\t]+)/);
            if (nameMatch && nameMatch[1]) {
              candidate.name = nameMatch[1].trim();
              console.log(`    ✅ Extracted clean name from messy field: "${candidate.name}"`);
            } else {
              candidate.name = 'N/A';
              console.log(`    ❌ Could not extract clean name, using N/A`);
            }
          }
          
          // Clean up applied date
          if (candidate.applied && candidate.applied !== candidate.appliedDate) {
            candidate.appliedDate = candidate.applied;
            console.log(`    ✅ Set appliedDate from applied: "${candidate.appliedDate}"`);
          }
          
          // Clean up position
          if (candidate.Position && !candidate.position) {
            candidate.position = candidate.Position;
            console.log(`    ✅ Set position from Position: "${candidate.position}"`);
          }
          
          // Clean up location
          if (candidate.Location && !candidate.location) {
            candidate.location = candidate.Location;
            console.log(`    ✅ Set location from Location: "${candidate.location}"`);
          }
          
          // Clean up WOTC status
          if (candidate['WOTC Status'] && !candidate.wotcStatus) {
            candidate.wotcStatus = candidate['WOTC Status'];
            console.log(`    ✅ Set wotcStatus from WOTC Status: "${candidate.wotcStatus}"`);
          }
          
          // Clean up former employee status
          if (candidate['Former \nEmployee?'] && !candidate.former) {
            candidate.former = candidate['Former \nEmployee?'];
            console.log(`    ✅ Set former from Former Employee: "${candidate.former}"`);
          }
          
          // Clean up rehire eligible status
          if (candidate['Rehire \nEligible?'] && !candidate.rehire) {
            candidate.rehire = candidate['Rehire \nEligible?'];
            console.log(`    ✅ Set rehire from Rehire Eligible: "${candidate.rehire}"`);
          }
          
          // Clean up score and percentage
          if (candidate.Score && !candidate.score) {
            candidate.score = candidate.Score;
            console.log(`    ✅ Set score from Score: "${candidate.score}"`);
          }
          
          if (candidate['% Score'] && !candidate.scorePercent) {
            candidate.scorePercent = candidate['% Score'];
            const smartScore = parseInt(candidate['% Score'].replace('%', ''), 10);
            candidate.smartScore = isNaN(smartScore) ? 0 : smartScore;
            console.log(`    ✅ Set scorePercent and smartScore: "${candidate.scorePercent}" -> ${candidate.smartScore}`);
          }
          
          // Clean up availability
          if (candidate.Availability && !candidate.availability) {
            candidate.availability = candidate.Availability;
            console.log(`    ✅ Set availability from Availability: "${candidate.availability}"`);
          }
          
          // Clean up hiring step - prioritize specifically extracted data
          if (candidate.hiringStep) {
            // Already set from span parsing - keep it if it's the full workflow
            console.log(`    ✅ Using hiring step from span parsing: "${candidate.hiringStep}"`);
          } else if (candidate.hiringSteps) {
            // Use the full parsed hiring steps instead of just the first one
            candidate.hiringStep = candidate.hiringSteps;
            console.log(`    ✅ Set hiringStep to full workflow: "${candidate.hiringStep}"`);
          } else if (candidate['Hiring Step'] && !candidate.hiringStep) {
            candidate.hiringStep = candidate['Hiring Step'];
            console.log(`    ✅ Set hiringStep from Hiring Step column: "${candidate.hiringStep}"`);
          } else if (!candidate.hiringStep && candidate.workflowSteps) {
            // Use the full workflow steps instead of just the first one
            candidate.hiringStep = candidate.workflowSteps;
            console.log(`    ✅ Set hiringStep to full workflow from workflowSteps: "${candidate.hiringStep}"`);
          }
          
          // Set default values for required fields if still empty
          candidate.name = candidate.name || 'N/A';
          candidate.position = candidate.position || 'Not specified';
          candidate.appliedDate = candidate.appliedDate || '';
          candidate.location = candidate.location || 'N/A';
          candidate.smartScore = candidate.smartScore || 0;
          candidate.availability = candidate.availability || 'Not specified';
          candidate.wotcStatus = candidate.wotcStatus || 'Not Screened';
          candidate.former = candidate.former || '--';
          candidate.rehire = candidate.rehire || '--';
          candidate.score = candidate.score || '';
          candidate.scorePercent = candidate.scorePercent || '--';
          candidate.hiringStep = candidate.hiringStep || 'Contact ( Workflow has not started )';
          
          console.log(`\n🎯 FINAL CANDIDATE DATA FOR ROW ${rowIndex}:`);
          console.log(`  🆔 ID: ${candidate.id}`);
          console.log(`  👤 Name: ${candidate.name}`);
          console.log(`  📧 Email: ${candidate.email || 'N/A'}`);
          console.log(`  📞 Phone: ${candidate.phone || 'N/A'}`);
          console.log(`  🏙️ City: ${candidate.city || 'N/A'}`);
          console.log(`  🗺️ State: ${candidate.state || 'N/A'}`);
          console.log(`  💼 Position: ${candidate.position}`);
          console.log(`  📍 Location: ${candidate.location}`);
          console.log(`  📅 Applied: ${candidate.appliedDate}`);
          console.log(`  📊 Smart Score: ${candidate.smartScore}`);
          console.log(`  📊 Total fields: ${Object.keys(candidate).length}`);
          
          return candidate;
        });
        
        console.log(`\n🎉 === TRANSFORMATION COMPLETE ===`);
        console.log(`✅ Successfully parsed ${applications.length} applications with dynamic structure`);
        console.log(`📊 All extracted headers:`, headers);
        console.log(`🔍 Sample application structure (first app):`, applications[0]);
        console.log(`📋 Sample raw data from first application:`, applications[0]?.rawData);
        
        // Log summary of all extracted fields across all applications
        const allFieldNames = new Set<string>();
        applications.forEach((app: any) => {
          Object.keys(app).forEach(key => {
            if (key !== 'rawData') {
              allFieldNames.add(key);
            }
          });
        });
        console.log(`🏷️ All unique field names extracted (${allFieldNames.size}):`, Array.from(allFieldNames).sort());
        
        // Log sample data for debugging
        console.log(`\n📊 SAMPLE DATA FROM FIRST 3 APPLICATIONS:`);
        applications.slice(0, 3).forEach((app, index) => {
          console.log(`  App ${index}: ID=${app.id}, Name=${app.name || app.Name}, Email=${app.email}, Phone=${app.phone}`);
        });
        
        return applications;
        
      } catch (parseError: unknown) {
        // Immediately return empty array on any parsing error
        console.log('ℹ️ Table parsing encountered an issue - returning empty array');
        return [];
      }
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      console.error('❌ Critical error in getApplicationPool:', errorMessage);
      if (errorStack) {
        console.error('❌ Error stack trace:', errorStack);
      }
      console.log('📊 Returning empty array due to critical error');
      
      // Return empty array instead of dummy data
      return [];
    } finally {
      console.log('🏁 === getApplicationPool FUNCTION COMPLETED ===');
      console.log('⏰ Completion timestamp:', new Date().toISOString());
    }
}


export async function getApplicationPoolDummyCall(reason: string = 'unknown'): Promise<ApplicationPoolCandidate[]> {
    console.log('🔄 === USING DUMMY DATA FALLBACK ===');
    console.log('⚠️ Reason:', reason);
    console.log('📊 Returning empty array instead of dummy data');
    console.log('⏰ Dummy call timestamp:', new Date().toISOString());
    
    // Simulate API delay for consistency
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [];
}

// Helper functions for specific pool types
export async function getApplicationPoolGeneral(
  filters?: { 
    fromDate?: string;
    toDate?: string;
    clientId?: string;
    userId?: string;
  },
  cookieString?: string
): Promise<ApplicationPoolCandidate[]> {
  return getApplicationPool('Pool', filters, cookieString);
}

export async function getApplicationPoolPassed(
  filters?: { 
    fromDate?: string;
    toDate?: string;
    clientId?: string;
    userId?: string;
  },
  cookieString?: string
): Promise<ApplicationPoolCandidate[]> {
  return getApplicationPool('PoolPassed', filters, cookieString);
}

export async function getApplicationPoolFailed(
  filters?: { 
    fromDate?: string;
    toDate?: string;
    clientId?: string;
    userId?: string;
  },
  cookieString?: string
): Promise<ApplicationPoolCandidate[]> {
  return getApplicationPool('PoolFailed', filters, cookieString);
}

// New function that can be used by API routes with authentication validation
export async function getApplicationPoolFromRequest(
  req: any, // NextRequest type
  poolType: PoolType = 'Pool',
  filters?: { 
    fromDate?: string;
    toDate?: string;
    clientId?: string;
    userId?: string;
  }
): Promise<{ data: ApplicationPoolCandidate[]; headers: Record<string, string> }> {
  console.log(`🔄 === getApplicationPoolFromRequest CALLED for ${poolType} ===`);
  
  try {
    // Validate authentication using shared utility
    const authResult = validateLegacyAuth(req);
    if (!authResult.isValid) {
      console.warn(`❌ Authentication failed for ${poolType} request:`, authResult.error);
      return {
        data: await getApplicationPoolDummyCall('authentication-failed'),
        headers: {
          'X-Data-Source': 'empty-auth-failed',
          'X-Error': 'Authentication failed'
        }
      };
    }

    console.log(`✅ Authentication valid for ${poolType} request`);
    
    const applications = await getApplicationPool(poolType, filters, authResult.cookieString);
    
    console.log(`📊 ${poolType} request completed with ${applications.length} applications`);
    
    return {
      data: applications,
      headers: {
        'X-Data-Source': applications.length > 0 ? 'legacy-system' : 'legacy-empty',
        'X-Record-Count': applications.length.toString()
      }
    };
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`❌ Critical error in getApplicationPoolFromRequest for ${poolType}:`, errorMessage);
    if (errorStack) {
      console.error('❌ Error stack trace:', errorStack);
    }
    
    return {
      data: await getApplicationPoolDummyCall('request-error'),
      headers: {
        'X-Data-Source': 'empty-error-fallback',
        'X-Error': errorMessage
      }
    };
  }
}
