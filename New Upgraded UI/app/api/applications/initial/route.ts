import { NextRequest, NextResponse } from "next/server"

// This endpoint mirrors the legacy "Less" filter initial load.
// It POSTs directly to /atao/index.jsp, accepts HTML, and forwards that to the frontend.

export async function GET(req: NextRequest) {
  // --- Build payload identical to legacy HAR (showDays = 7) ---
  const params = new URLSearchParams({
    // form metadata
    AnchorName_lessOptionForm: '',
    locale: 'en_US',
    applicationName: 'ConsolidatedJAFTestClientdsiRAT',
    seq: 'applicantGridResults',
    INDEX: '0',
    REPORTTYPE: 'AllApplicants',
    reportType: 'AllApplicants',
    event: 'com.deploy.application.hmc.plugin.ApplicantGrid.search',
    validateData: 'false',
    skipRequiredCheck: 'false',
    divName: 'div2',

    // Less-panel date shortcut – last 7 days
    showDays: '7',
    'search.dateFromDays.field': 'bidDate',
    'search.dateFromDays.op': 'dt_ge_st',
    'search.dateToDays.field': 'bidDate',
    'search.dateToDays.op': 'dt_le_ed',

    // plugin model
    PLUGINMODELVALUE: 'STEP_NOTSELECTED',
    CSRF_TOKEN: ''
  })

  // --- Prepare cookie header ---
  const cookieHeader = req.headers.get('cookie') || ''

  const legacyUrl = `${process.env.LEGACY_BASE || 'http://localhost:8080/atao'}/index.jsp`

  const legacyRes = await fetch(legacyUrl, {
    method: 'POST',
    headers: {
      cookie: cookieHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html'
    },
    body: params.toString(),
    credentials: 'include'
  })

  const text = await legacyRes.text()

  // Forward cookies if any
  const out = new NextResponse(text, {
    status: legacyRes.status,
    headers: { 'content-type': 'text/html' }
  })
  const setCookie = legacyRes.headers.get('set-cookie')
  if (setCookie) out.headers.set('set-cookie', setCookie)
  return out
}

// Add HEAD handler for completeness
export function HEAD() {
  return NextResponse.json({}, { status: 200 })
}
