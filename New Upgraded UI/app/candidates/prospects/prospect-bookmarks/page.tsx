"use client"

import { useState, useEffect } from "react"
import ProspectsTable from "@/components/prospects/prospects-table"
import { Button } from "@/components/ui/button"
import type { Prospect } from "@/lib/types"

interface ProspectsBookmarksPageProps {
  fallbackMode?: boolean;
}

export default function CandidateProspectBookmarksPage({ fallbackMode = false }: ProspectsBookmarksPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [bookmarks, setBookmarks] = useState<Prospect[]>([])
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const res = await fetch('/api/applications/prospects/prospect-bookmarks')
        if (!res.ok) throw new Error(`Failed to fetch prospect bookmarks: ${res.status}`)
        console.log("Prospect bookmarks fetched successfully")
        console.log(res)
        const data = await res.json()
        setBookmarks(data)
        
        // Check response headers to see data source
        const dataSource = res.headers.get('X-Data-Source')
        if (dataSource && dataSource.includes('mock')) {
          console.log("Using mock data from API")
        }
      } catch (error) {
        console.error("Error fetching prospect bookmarks:", error)
        setError("Could not load prospect bookmarks data")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchBookmarks()
  }, [])
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-orange-500/20 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-orange-600 mr-8">Prospect Bookmarks</h1>
          <p className="text-white/80 text-sm hidden md:block">Manage your bookmarked prospects</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Filter Results
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
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
            <p>Loading prospect bookmarks...</p>
          </div>
        ) : (
          <ProspectsTable prospects={bookmarks} title="Prospect Bookmarks" />
        )}
      </div>
    </div>
  )
}
