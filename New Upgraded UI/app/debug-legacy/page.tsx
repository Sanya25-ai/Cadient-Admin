'use client'

import { useState } from 'react'

export default function DebugLegacyPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testUrls = [
    {
      name: "No Filters (applicantGridResults)",
      url: "/api/applications",
    },
    {
      name: "No Filters (test-filter endpoint)",
      url: "/api/test-filter",
    },
    {
      name: "With Status Filter (offered)",
      url: "/api/applications?status=offered",
    },
    {
      name: "With Location Filter",
      url: "/api/applications?location=atlanta",
    },
    {
      name: "Test Filter with Status",
      url: "/api/test-filter?status=offered&location=atlanta",
    }
  ]

  const testUrl = async (url: string, name: string) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = response.headers.get('content-type')?.includes('application/json') 
        ? await response.json() 
        : await response.text()
      
      setResults({
        name,
        url,
        status: response.status,
        data: typeof data === 'string' ? data.substring(0, 1000) : data,
        headers: Object.fromEntries(response.headers.entries())
      })
    } catch (error) {
      setResults({
        name,
        url,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    setLoading(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Legacy System Debug</h1>
      
      <div className="space-y-2 mb-6">
        {testUrls.map((test, index) => (
          <button
            key={index}
            onClick={() => testUrl(test.url, test.name)}
            disabled={loading}
            className="block w-full text-left p-3 bg-blue-100 hover:bg-blue-200 rounded border"
          >
            {test.name}: {test.url}
          </button>
        ))}
      </div>

      {results && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Results for: {results.name}</h2>
          <p><strong>URL:</strong> {results.url}</p>
          {results.status && <p><strong>Status:</strong> {results.status}</p>}
          {results.error && <p className="text-red-600"><strong>Error:</strong> {results.error}</p>}
          {results.headers && (
            <div className="mt-2">
              <strong>Headers:</strong>
              <pre className="text-xs">{JSON.stringify(results.headers, null, 2)}</pre>
            </div>
          )}
          {results.data && (
            <div className="mt-2">
              <strong>Data:</strong>
              <pre className="text-xs max-h-96 overflow-auto">{
                typeof results.data === 'string' 
                  ? results.data 
                  : JSON.stringify(results.data, null, 2)
              }</pre>
            </div>
          )}
        </div>
      )}
      
      {loading && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p>Testing...</p>
        </div>
      )}
    </div>
  )
}
