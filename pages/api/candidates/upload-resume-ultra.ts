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
    maxDuration: 30, // 30 second max duration
  },
};

// Global token cache with longer duration
let globalTokenCache: { relayData: string; csrfToken: string; timestamp: number; cookie: string } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Helper to parse cookies
function parseCookies(cookieHeader: string | undefined) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    cookies[name] = rest.join('=');
  });
  return cookies;
}

// Ultra-fast token retrieval with aggressive caching
async function getTokensUltraFast(backendCookie: string) {
  // Check if we have valid cached tokens for this session
  if (globalTokenCache && 
      (Date.now() - globalTokenCache.timestamp) < CACHE_DURATION &&
      globalTokenCache.cookie === backendCookie) {
    return { 
      relayData: globalTokenCache.relayData, 
      csrfToken: globalTokenCache.csrfToken 
    };
  }

  // Fetch with minimal headers and aggressive timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const formResponse = await fetch(
      'http://localhost:8080/atao/index.jsp?seq=addCandidate&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US',
      {
        method: 'GET',
        headers: {
          'Cookie': backendCookie,
          'Accept': 'text/html',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!formResponse.ok) {
      throw new Error(`Token fetch failed: ${formResponse.status}`);
    }

    const formHtml = await formResponse.text();
    const relayDataMatch = formHtml.match(/name="relayData"\s+value="([^"]*)"/);
    const csrfTokenMatch = formHtml.match(/name="CSRF_TOKEN"\s+value="([^"]*)"/);
    
    const relayData = relayDataMatch ? relayDataMatch[1] : '';
    const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : '';

    // Cache globally for reuse
    globalTokenCache = { 
      relayData, 
      csrfToken, 
      timestamp: Date.now(), 
      cookie: backendCookie 
    };

    return { relayData, csrfToken };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    // Ultra-fast form parsing with strict limits
    const { fields, files } = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      const form = formidable({ 
        multiples: false, 
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB limit for speed
        maxFields: 20, // Limit fields
        maxFieldsSize: 2 * 1024 * 1024 // 2MB max field size
      });
      
      const parseTimeout = setTimeout(() => {
        reject(new Error('Form parsing timeout'));
      }, 3000); // 3 second parse timeout
      
      form.parse(req, (err: any, fields: Fields, files: Files) => {
        clearTimeout(parseTimeout);
        if (err) {
          reject(new Error(`Form parsing failed: ${err.message}`));
        } else {
          resolve({ fields, files });
        }
      });
    });

    console.log(`Form parsed in ${Date.now() - startTime}ms`);

    // Quick cookie validation
    const cookiesObj = parseCookies(req.headers.cookie);
    const sessionId = cookiesObj['JSESSIONID'];
    const intToken = cookiesObj['ConsolidatedJAFTestClientINT'];
    
    if (!sessionId || !intToken) {
      return res.status(401).json({ error: 'Missing session cookies' });
    }
    
    const backendCookie = `JSESSIONID=${sessionId}; ConsolidatedJAFTestClientINT=${intToken}`;

    // Ultra-fast token retrieval
    const tokenStart = Date.now();
    const { relayData, csrfToken } = await getTokensUltraFast(backendCookie);
    console.log(`Tokens retrieved in ${Date.now() - tokenStart}ms`);

    // Minimal form data - only absolutely essential fields
    const backendForm = new FormData();
    backendForm.append("seq", "addCandidate");
    backendForm.append("relayData", relayData);
    backendForm.append("event", "com.deploy.application.hmc.plugin.AddCandidate.uploadResume");
    backendForm.append("validateData", "false");
    backendForm.append("skipRequiredCheck", "true");
    backendForm.append("CSRF_TOKEN", csrfToken);
    
    // File only
    if (files.selectResume) {
      const fileArray = Array.isArray(files.selectResume) ? files.selectResume : [files.selectResume];
      const file = fileArray[0];
      backendForm.append(
        "selectResume",
        fs.createReadStream(file.filepath),
        file.originalFilename || 'resume'
      );
    }

    // Minimal contact data
    const firstName = Array.isArray(fields.TAOO_PersonContact_firstName) ? fields.TAOO_PersonContact_firstName[0] : fields.TAOO_PersonContact_firstName || "";
    const lastName = Array.isArray(fields.TAOO_PersonContact_lastName) ? fields.TAOO_PersonContact_lastName[0] : fields.TAOO_PersonContact_lastName || "";
    
    if (firstName) backendForm.append("TAOO_PersonContact_firstName", firstName);
    if (lastName) backendForm.append("TAOO_PersonContact_lastName", lastName);

    // Ultra-fast backend request
    const uploadStart = Date.now();
    const controller = new AbortController();
    const uploadTimeout = setTimeout(() => controller.abort(), 15000); // 15 second upload timeout

    const backendResponse = await fetch(
      'http://localhost:8080/atao/index.jsp?applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US',
      {
        method: 'POST',
        body: backendForm as any,
        headers: {
          ...backendForm.getHeaders(),
          'cookie': backendCookie,
          'Connection': 'keep-alive'
        },
        signal: controller.signal
      }
    );

    clearTimeout(uploadTimeout);
    console.log(`Upload completed in ${Date.now() - uploadStart}ms`);
    console.log(`Total request time: ${Date.now() - startTime}ms`);

    if (backendResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Resume uploaded successfully',
        fileName: files.selectResume ? (Array.isArray(files.selectResume) ? files.selectResume[0].originalFilename : files.selectResume.originalFilename) : '',
        timing: {
          total: Date.now() - startTime,
          parse: 'logged above',
          tokens: 'logged above',
          upload: 'logged above'
        }
      });
    } else {
      return res.status(backendResponse.status).json({ 
        error: 'Upload failed', 
        status: backendResponse.status,
        timing: Date.now() - startTime
      });
    }

  } catch (error) {
    console.error('Upload error:', error);
    console.log(`Failed request time: ${Date.now() - startTime}ms`);
    
    if ((error as any).name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Request timeout',
        timing: Date.now() - startTime
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: String(error),
      timing: Date.now() - startTime
    });
  }
}
