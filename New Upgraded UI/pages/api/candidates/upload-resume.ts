import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
// @ts-ignore
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data' });
      return;
    }

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
    // Use regex to extract relayData and CSRF_TOKEN as in add-candidate/route.ts
    const relayDataMatch = formHtml.match(/name="relayData"\s+value="([^"]*)"/);
    const csrfTokenMatch = formHtml.match(/name="CSRF_TOKEN"\s+value="([^"]*)"/);
    const relayData = relayDataMatch ? relayDataMatch[1] : '';
    const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : '';

    // Build the backend form-data in the same order as the working curl
    const backendForm = new FormData();
    const fieldOrder = [
      "AnchorName_addCandidateForm",
      "seq",
      "relayData",
      "event",
      "validateData",
      "skipRequiredCheck",
      "resumeFile",
      "fileName",
      "resumeDoc",
      "selectResume", // file
      "TAOO_PersonContact_firstName",
      "TAOO_PersonContact_lastName",
      "TAOO_PersonContact_emailAddress",
      "TAOO_PersonContact_address1",
      "TAOO_PersonContact_address2",
      "TAOO_PersonContact_country",
      "TAOO_PersonContact_city",
      "TAOO_PersonContact_state_#$#_34",
      "TAOO_PersonContact_zipCode",
      "TAOO_PersonContact_homePhone",
      "TAOO_PersonContact_city_#$#_1",
      "TAOO_PersonContact_state_#$#_37",
      "TAOO_PersonContact_homePhone_#$#_1",
      "TAOO_PersonContact_city_#$#_2",
      "TAOO_PersonContact_state",
      "TAOO_PersonContact_zipCode_#$#_1",
      "TAOO_PersonContact_homePhone_#$#_2",
      "TAOO_PersonContact_city_#$#_3",
      "TAOO_PersonContact_state_#$#_40",
      "TAOO_PersonContact_zipCode_#$#_2",
      "TAOO_PersonContact_homePhone_#$#_3",
      "TAOO_PersonContact_city",
      "TAOO_PersonContact_state",
      "TAOO_PersonContact_zipCode",
      "TAOO_PersonContact_homePhone_#$#_4",
      "TAOO_PersonContact_city_#$#_5",
      "TAOO_PersonContact_state_#$#_46",
      "TAOO_PersonContact_zipCode_#$#_4",
      "TAOO_PersonContact_homePhone_#$#_5",
      "applicationLocator",
      "CSRF_TOKEN"
    ];

    for (const key of fieldOrder) {
      if (key === "relayData") {
        backendForm.append("relayData", relayData);
      } else if (key === "CSRF_TOKEN") {
        backendForm.append("CSRF_TOKEN", csrfToken);
      } else if (key === "selectResume" && files.selectResume) {
        backendForm.append(
          "selectResume",
          fs.createReadStream(files.selectResume[0].filepath),
          files.selectResume[0].originalFilename
        );
      } else if (key in fields) {
        const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        backendForm.append(key, value ?? "");
      } else {
        backendForm.append(key, "");
      }
    }

    // Forward the request to your Java backend
    let backendResponse;
    try {
      backendResponse = await fetch(
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
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'cookie': backendCookie,
          },
          redirect: 'manual', // Prevent following redirects with streams
        }
      );
    } catch (fetchErr) {
      res.status(502).json({ error: 'Failed to connect to backend', details: String(fetchErr) });
      return;
    }

    // Handle backend redirect (3xx)
    if (backendResponse.status >= 300 && backendResponse.status < 400) {
      res.status(502).json({ error: 'Backend responded with a redirect, which is not supported for file uploads.' });
      return;
    }

    // Forward backend response
    try {
      const text = await backendResponse.text();
      res.status(backendResponse.status).send(text);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read backend response', details: String(err) });
    }
  });
}
