import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const legacyBase = process.env.LEGACY_BASE || 'http://localhost:8080/atao';
  
  // Test comprehensive connectivity to legacy system
  const tests = [
    {
      name: 'Legacy System Health Check',
      url: `${legacyBase}/index.jsp`,
      description: 'Test if legacy system is accessible'
    },
    {
      name: 'Job Templates API Test',
      url: `${legacyBase}/index.jsp?seq=autoTemplate&viewPlugin=jobTool.list&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US&event=com.deploy.application.twm.plugin.JobTool.list`,
      description: 'Test job templates endpoint specifically'
    },
    {
      name: 'Authentication Test',
      url: `${legacyBase}/index.jsp?seq=login`,
      description: 'Test if authentication system is responding'
    }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name} - ${test.url}`);
      
      const startTime = Date.now();
      const response = await fetch(test.url, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'User-Agent': 'Next.js-Diagnostic/1.0'
        },
        // Timeout for testing
        signal: AbortSignal.timeout(15000)
      });
      const responseTime = Date.now() - startTime;
      
      const contentType = response.headers.get('content-type') || '';
      const isHtml = contentType.includes('text/html');
      
      let responseData = '';
      let hasJobTemplateData = false;
      let hasLoginForm = false;
      let hasAuthError = false;
      
      try {
        const text = await response.text();
        responseData = text.substring(0, 500) + (text.length > 500 ? '...' : '');
        
        // Check for specific indicators
        hasJobTemplateData = text.includes('id="data-table"') || text.includes('JobCategories.');
        hasLoginForm = text.includes('seq=login') || text.includes('password');
        hasAuthError = text.includes('authentication required') || text.includes('Please log in');
        
      } catch (e) {
        responseData = 'Failed to read response body';
      }
      
      results.push({
        name: test.name,
        url: test.url,
        status: response.status,
        statusText: response.statusText,
        contentType,
        isHtml,
        responseTime: `${responseTime}ms`,
        success: response.ok,
        responsePreview: responseData,
        indicators: {
          hasJobTemplateData,
          hasLoginForm,
          hasAuthError
        },
        error: null
      });
      
    } catch (error) {
      results.push({
        name: test.name,
        url: test.url,
        status: null,
        statusText: null,
        contentType: null,
        isHtml: false,
        responseTime: 'timeout/error',
        success: false,
        responsePreview: null,
        indicators: {
          hasJobTemplateData: false,
          hasLoginForm: false,
          hasAuthError: false
        },
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  // Analyze results and provide recommendations
  const analysis = {
    systemAccessible: results[0]?.success || false,
    jobTemplatesWorking: results[1]?.success && results[1]?.indicators?.hasJobTemplateData || false,
    authenticationRequired: results.some(r => r.indicators?.hasLoginForm || r.indicators?.hasAuthError),
    recommendations: [] as string[]
  };
  
  if (!analysis.systemAccessible) {
    analysis.recommendations.push("Legacy system appears to be down or unreachable. Check if the server is running.");
  } else if (analysis.authenticationRequired) {
    analysis.recommendations.push("Authentication is required. Please log in to the legacy system first.");
  } else if (!analysis.jobTemplatesWorking) {
    analysis.recommendations.push("Job templates endpoint is not responding correctly. Check system configuration.");
  } else {
    analysis.recommendations.push("System appears to be working correctly.");
  }
  
  return NextResponse.json({
    legacyBase,
    timestamp: new Date().toISOString(),
    tests: results,
    analysis,
    summary: {
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    }
  });
}
