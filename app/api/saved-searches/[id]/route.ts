import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const cookie = req.headers.get("cookie") ?? "";
  const { id } = params;
  
  console.log("🗑️ Delete saved search request for ID:", id);
  console.log("🍪 Using session cookies:", cookie);

  const qs = new URLSearchParams({
    seq: "savedApplicantSearches.list",
    savedSearchID: id,
    event: "com.deploy.application.textsearch.plugin.SavedTextSearches.delete",
  }).toString();

  const url = `${process.env.LEGACY_BASE || "http://localhost:8080/atao"}/index.jsp?${qs}`;
  console.log("📡 Making delete request to:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      cookie,
      Accept: "application/json",
    },
  });

  console.log("📡 Delete response status:", res.status);
  console.log("📡 Delete response headers:", Object.fromEntries(res.headers.entries()));

  if (!res.ok) {
    console.log("❌ Delete failed with status:", res.status);
    return NextResponse.json({ error: "Legacy delete failed" }, { status: res.status });
  }

  console.log("✅ Delete successful");
  return NextResponse.json({ ok: true });
}
