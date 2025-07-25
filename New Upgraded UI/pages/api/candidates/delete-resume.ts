import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
// @ts-ignore
import fetch from 'node-fetch';

// Helper to parse cookies from the request header
function parseCookies(cookieHeader: string | undefined) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    cookies[name] = rest.join('=');
  });
  return cookies;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { fileName, formData: candidateData } = req.body;

    // Parse cookies from the incoming request
    const cookiesObj = parseCookies(req.headers.cookie);
    const sessionId = cookiesObj['JSESSIONID'];
    const intToken = cookiesObj['ConsolidatedJAFTestClientINT'];
    
    if (!sessionId || !intToken) {
      res.status(401).json({ error: 'Missing required session cookies' });
      return;
    }
    
    const backendCookie = `JSESSIONID=${sessionId}; ConsolidatedJAFTestClientINT=${intToken}`;

    // Step 1: Fetch the form page to get relayData and CSRF_TOKEN
    const formUrl = 'http://localhost:8080/atao/index.jsp?seq=addCandidate&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US';
    const formResponse = await fetch(formUrl, {
      method: 'GET',
      headers: {
        'Cookie': backendCookie,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!formResponse.ok) {
      res.status(500).json({ error: 'Failed to get relayData/CSRF_TOKEN from backend' });
      return;
    }

    const formHtml = await formResponse.text();
    
    // Extract relayData and CSRF_TOKEN
    const relayDataMatch = formHtml.match(/name="relayData"\s+value="([^"]*)"/);
    const csrfTokenMatch = formHtml.match(/name="CSRF_TOKEN"\s+value="([^"]*)"/);
    const relayData = relayDataMatch ? relayDataMatch[1] : '';
    const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : '';

    // Build the backend form-data for delete resume request
    const backendForm = new FormData();
    
    // Add form fields in the exact order from the cURL command
    backendForm.append("AnchorName_addCandidateForm", "");
    backendForm.append("seq", "addCandidate");
    backendForm.append("relayData", relayData);
    backendForm.append("event", "com.deploy.application.hmc.plugin.AddCandidate.deleteResume");
    backendForm.append("validateData", "false");
    backendForm.append("skipRequiredCheck", "false");
    backendForm.append("resumeFile", ""); // Empty for delete
    backendForm.append("fileName", fileName || "");
    backendForm.append("resumeDoc", ""); // Empty for delete
    
    // Add candidate contact information (empty for delete operation)
    backendForm.append("TAOO_PersonContact_firstName", candidateData?.firstName || "");
    backendForm.append("TAOO_PersonContact_lastName", candidateData?.lastName || "");
    backendForm.append("TAOO_PersonContact_emailAddress", candidateData?.email || "");
    backendForm.append("TAOO_PersonContact_address1", candidateData?.address || "");
    backendForm.append("TAOO_PersonContact_address2", candidateData?.apartment || "");
    backendForm.append("TAOO_PersonContact_country", candidateData?.country || "Countries.USA");
    backendForm.append("TAOO_PersonContact_city", candidateData?.city || "");
    backendForm.append("TAOO_PersonContact_state_#$#_28", "");
    backendForm.append("TAOO_PersonContact_zipCode", candidateData?.zipCode || "");
    backendForm.append("TAOO_PersonContact_homePhone", candidateData?.homePhone || "");
    
    // Add additional empty fields as per the cURL command
    backendForm.append("TAOO_PersonContact_city_#$#_1", "");
    backendForm.append("TAOO_PersonContact_state_#$#_31", "");
    backendForm.append("TAOO_PersonContact_homePhone_#$#_1", "");
    backendForm.append("TAOO_PersonContact_city_#$#_2", "");
    backendForm.append("TAOO_PersonContact_state", "");
    backendForm.append("TAOO_PersonContact_zipCode_#$#_1", "");
    backendForm.append("TAOO_PersonContact_homePhone_#$#_2", "");
    backendForm.append("TAOO_PersonContact_city_#$#_3", "");
    backendForm.append("TAOO_PersonContact_state_#$#_34", "");
    backendForm.append("TAOO_PersonContact_zipCode_#$#_2", "");
    backendForm.append("TAOO_PersonContact_homePhone_#$#_3", "");
    backendForm.append("TAOO_PersonContact_city", "");
    backendForm.append("TAOO_PersonContact_state", "");
    backendForm.append("TAOO_PersonContact_zipCode", "");
    backendForm.append("TAOO_PersonContact_homePhone_#$#_4", "");
    backendForm.append("TAOO_PersonContact_city_#$#_5", "");
    backendForm.append("TAOO_PersonContact_state_#$#_40", "");
    backendForm.append("TAOO_PersonContact_zipCode_#$#_4", "");
    backendForm.append("TAOO_PersonContact_homePhone_#$#_5", "");
    
    backendForm.append("applicationLocator", "");
    backendForm.append("CSRF_TOKEN", csrfToken);

    // Send the delete request to the backend
    const backendResponse = await fetch(
      'http://localhost:8080/atao/index.jsp?applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US',
      {
        method: 'POST',
        body: backendForm as any,
        headers: {
          ...backendForm.getHeaders(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Origin': 'http://localhost:8080',
          'Referer': 'http://localhost:8080/atao/index.jsp?applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'cookie': backendCookie,
        },
        redirect: 'manual',
      }
    );

    // Handle backend redirect (3xx)
    if (backendResponse.status >= 300 && backendResponse.status < 400) {
      res.status(502).json({ error: 'Backend responded with a redirect, which is not supported for delete operations.' });
      return;
    }

    // Forward backend response
    const responseText = await backendResponse.text();
    
    if (backendResponse.ok) {
      res.status(200).json({ 
        success: true, 
        message: 'Resume deleted successfully',
        response: responseText 
      });
    } else {
      res.status(backendResponse.status).json({ 
        error: 'Failed to delete resume', 
        details: responseText 
      });
    }

  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: String(error) 
    });
  }
}
