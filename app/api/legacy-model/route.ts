import { NextRequest, NextResponse } from 'next/server'

// This route proxies any GET/POST to the legacy PageModelServlet so that
// all upgraded-UI code can rely on a single JSON backend, never scraping HTML.

// Legacy servlet base URL (can be overridden with ENV just like other calls)
const LEGACY_BASE = process.env.LEGACY_BASE || 'http://localhost:8080/atao'
const PAGE_MODEL_URL = `${LEGACY_BASE}/api/page-model`

export async function GET(req: NextRequest) {
  return proxy(req, 'GET')
}

export async function POST(req: NextRequest) {
  return proxy(req, 'POST')
}

async function proxy(req: NextRequest, method: 'GET' | 'POST') {
  try {
    // Forward legacy session cookies
    const jsid = req.cookies.get('JSESSIONID')?.value
    const legacyCookie = req.cookies.get('ConsolidatedJAFTestClientINT')?.value

    if (!jsid) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }

    let cookieHeader = `JSESSIONID=${jsid}`
    if (legacyCookie) cookieHeader += `; ConsolidatedJAFTestClientINT=${legacyCookie}`

    // Compose target URL
    const url = new URL(PAGE_MODEL_URL)
    // Copy search params from incoming request
    req.nextUrl.searchParams.forEach((v, k) => url.searchParams.append(k, v))

    // Prepare fetch init
    const init: RequestInit = {
      method,
      headers: {
        cookie: cookieHeader,
        Accept: 'application/json',
      },
    }

    if (method === 'POST') {
      const body = await req.text()
      init.body = body
      // Preserve content-type if caller set it (form-urlencoded)
      const ct = req.headers.get('content-type') || 'application/x-www-form-urlencoded'
      ;(init.headers as any)['Content-Type'] = ct
    }

    const res = await fetch(url.toString(), init)

    const ct = res.headers.get('content-type') || ''
    let outResponse: NextResponse

    if (ct.includes('application/json')) {
      // Safe to parse as JSON
      let data: any
      try {
        data = await res.json()
      } catch (e) {
        // Parsing failed – treat as plain text error
        const txt = await res.text()
        return NextResponse.json({ error: 'Invalid JSON from legacy', body: txt.slice(0, 500) }, { status: 502 })
      }

      // Detect legacy servlet redirect structure { redirect: "index.jsp?..." }
      if (data && typeof data === 'object' && data.redirect) {
        return NextResponse.json({ redirect: data.redirect }, { status: 401 })
      }

      outResponse = NextResponse.json(data, { status: res.status })
    } else {
      // Non-JSON response – likely HTML login or error page
      const txt = await res.text()

      // Try to detect if it is actually JSON mis-labelled
      let parsed: any = null
      try { parsed = JSON.parse(txt) } catch {}
      if (parsed && parsed.redirect) {
        return NextResponse.json({ redirect: parsed.redirect }, { status: 401 })
      }

      return NextResponse.json({ error: 'Legacy returned non-JSON', body: txt.slice(0, 500) }, { status: res.status === 200 ? 502 : res.status })
    }

    // Forward any session cookies from legacy system
    const setCookie = res.headers.get('set-cookie')
    if (setCookie) {
      // The legacy servlet sets cookies with Path=/atao which the browser will NOT
      // send on our /api/* calls.  Rewrite the path attribute to root so that
      // subsequent API requests automatically forward the session.
      const rewritten = setCookie
        .split(',')
        .map(c => c.replace(/;\s*Path=\/atao/gi, '; Path=/'))
        .join(',')
      outResponse.headers.set('set-cookie', rewritten)
    }
    return outResponse
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Gateway failure' }, { status: 500 })
  }
}

export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
