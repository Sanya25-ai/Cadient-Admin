export async function fetchLegacyModel(qs: string, cookie?: string) {
  // In development, we can call the legacy system directly
  // In production, we use the rewrite rules to proxy through Next.js
  const isDevelopment = process.env.NODE_ENV === 'development';
  const legacyBase = process.env.LEGACY_BASE || 'http://localhost:8080/atao';
  
  let url: string;
  if (isDevelopment) {
    // Direct call to legacy system in development
    url = `${legacyBase}/api/page-model${qs}`;
  } else {
    // Use Next.js rewrite rules in production
    url = `/api/page-model${qs}`;
  }

  console.log(`[fetchLegacyModel] Calling: ${url}`);
  console.log(`[fetchLegacyModel] Cookie: ${cookie ? 'present' : 'none'}`);

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        cookie: cookie ?? "",
        Accept: "application/json",
        'User-Agent': 'Next.js-Upgraded-UI/1.0',
      },
      // Always go to origin server; we don't want ISR caching here
      cache: "no-store",
    });
  } catch (e) {
    console.error("Legacy API unreachable:", e);
    console.error(`[fetchLegacyModel] Failed to reach: ${url}`);
    
    // Provide more specific error information
    if (e instanceof TypeError && e.message.includes('Failed to parse URL')) {
      throw new Error(`Invalid URL constructed: ${url}. Check LEGACY_BASE environment variable.`);
    } else if (e instanceof TypeError && e.message.includes('fetch')) {
      throw new Error(`Network error: Cannot reach legacy system at ${url}. Ensure legacy server is running.`);
    }
    
    throw new Error("Legacy server offline");
  }

  console.log(`[fetchLegacyModel] Response status: ${res.status}`);

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    console.error(`[fetchLegacyModel] Error response: ${errorText}`);
    throw new Error(`Legacy fetch failed ${res.status}: ${errorText}`);
  }

  try {
    const jsonData = await res.json();
    console.log(`[fetchLegacyModel] Success: received ${JSON.stringify(jsonData).length} characters`);
    return jsonData;
  } catch (e) {
    console.error(`[fetchLegacyModel] Failed to parse JSON response:`, e);
    throw new Error(`Invalid JSON response from legacy system`);
  }
}
