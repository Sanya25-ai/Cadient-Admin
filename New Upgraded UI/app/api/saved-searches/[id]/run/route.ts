import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const cookie = req.headers.get("cookie") ?? "";
  const { id } = params;
  
  console.log("🏃 Run saved search request for ID:", id);
  console.log("🍪 Using session cookies:", cookie);

  const qs = new URLSearchParams({
    seq: "savedApplicantSearches.list",
    savedSearchID: id,
    event: "com.deploy.application.textsearch.plugin.TextSearch.runSavedQuery",
  }).toString();

  const url = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?${qs}`;
  console.log("📡 Making run request to:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      cookie,
      Accept: "application/json",
    },
  });

  console.log("📡 Run response status:", res.status);
  console.log("📡 Run response headers:", Object.fromEntries(res.headers.entries()));

  if (!res.ok) {
    console.log("❌ Run failed with status:", res.status);
    return NextResponse.json({ error: "Legacy run failed" }, { status: res.status });
  }

  const data = await res.json();
  console.log("📊 Run response data keys:", Object.keys(data || {}));
  
  const redirect = data.nextPage || data.redirect || data.nav || "/";
  console.log("🔄 Redirecting to:", redirect);

  console.log("✅ Run successful");
  return NextResponse.json({ redirect });
}
