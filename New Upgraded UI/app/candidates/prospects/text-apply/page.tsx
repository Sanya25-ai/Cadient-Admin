"use client"

import { useState, useEffect } from "react"
import ProspectsTable from "@/components/prospects/prospects-table"
import { Button } from "@/components/ui/button"
import type { Prospect } from "@/lib/types"

interface TextApplyPageProps {
  fallbackMode?: boolean;
}

export default function CandidateTextApplyPage({ fallbackMode = false }: TextApplyPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchTextApplyProspects() {
      try {
        // Fetch prospects filtered by Text Apply source
        const res = await fetch('/api/applications/prospects/text-apply')
        if (!res.ok) throw new Error(`Failed to fetch text apply prospects: ${res.status}`)
        console.log("Text Apply prospects fetched successfully")
        console.log(res)
        const data = await res.json()
        setProspects(data)
        
        // Check response headers to see data source
        const dataSource = res.headers.get('X-Data-Source')
        if (dataSource && dataSource.includes('mock')) {
          console.log("Using mock data from API")
        }
      } catch (error) {
        console.error("Error fetching text apply prospects:", error)
        setError("Could not load text apply prospects data")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTextApplyProspects()
  }, [])
  
  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="bg-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-orange-600 mr-8">Text Apply</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Filter Results
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {fallbackMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 mx-6 mt-6 rounded">
            <p className="font-medium">Fallback Mode Active</p>
            <p className="text-sm">Unable to connect to the legacy system. Using mock data.</p>
          </div>
        )}
        
        {error ? (
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center m-6">
            <p className="text-red-500">{error}</p>
            <p className="mt-2">Please try again later or contact support.</p>
          </div>
        ) : isLoading ? (
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center m-6">
            <p>Loading text apply prospects...</p>
          </div>
        ) : (
          <ProspectsTable prospects={prospects} title="Text Apply" />
        )}
      </div>
    </div>
  )
}
