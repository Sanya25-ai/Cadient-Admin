import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
// @ts-ignore
import fetch from 'node-fetch';

export const config = {
  api: {
    maxDuration: 20, // 20 second max duration
  },
};

// Reuse the same global token cache from upload-ultra
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
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout for delete

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
    const { fileName } = req.body;

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
    console.log(`Delete tokens retrieved in ${Date.now() - tokenStart}ms`);

    // Minimal form data for delete operation
    const backendForm = new FormData();
    backendForm.append("seq", "addCandidate");
    backendForm.append("relayData", relayData);
    backendForm.append("event", "com.deploy.application.hmc.plugin.AddCandidate.deleteResume");
    backendForm.append("validateData", "false");
    backendForm.append("skipRequiredCheck", "true");
    backendForm.append("CSRF_TOKEN", csrfToken);
    
    // Only essential delete fields
    backendForm.append("resumeFile", fileName || "");
    backendForm.append("fileName", "");
    backendForm.append("resumeDoc", "");
    backendForm.append("selectResume", "");

    // Ultra-fast backend request
    const deleteStart = Date.now();
    const controller = new AbortController();
    const deleteTimeout = setTimeout(() => controller.abort(), 10000); // 10 second delete timeout

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

    clearTimeout(deleteTimeout);
    console.log(`Delete completed in ${Date.now() - deleteStart}ms`);
    console.log(`Total delete request time: ${Date.now() - startTime}ms`);

    if (backendResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Resume deleted successfully',
        timing: {
          total: Date.now() - startTime,
          tokens: 'logged above',
          delete: 'logged above'
        }
      });
    } else {
      return res.status(backendResponse.status).json({ 
        error: 'Delete failed', 
        status: backendResponse.status,
        timing: Date.now() - startTime
      });
    }

  } catch (error) {
    console.error('Delete error:', error);
    console.log(`Failed delete request time: ${Date.now() - startTime}ms`);
    
    if ((error as any).name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Delete timeout',
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
