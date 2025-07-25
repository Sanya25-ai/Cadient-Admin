"use client"

import { useState, useEffect } from "react"
import CommonProspectsTable from "@/components/prospects/common-prospects-table"
import type { Prospect } from "@/lib/types"

interface ProspectsBookmarksPageProps {
  fallbackMode?: boolean;
}

export default function ProspectsBookmarksPage({ fallbackMode = false }: ProspectsBookmarksPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProspects = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/prospect-bookmarks')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch prospect bookmarks: ${response.status}`)
        }
        
        const data = await response.json()
        setProspects(data)
      } catch (err) {
        console.error('Error fetching prospect bookmarks:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProspects()
  }, [])

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white border-b border-orange-500/20 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-orange-600 mr-8">Prospect Bookmarks</h1>
            <p className="text-white/80 text-sm hidden md:block">View and manage bookmarked prospects</p>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-red-500">{error}</p>
            <p className="mt-2">Please try again later or contact support.</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white border-b border-orange-500/20 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-orange-600 mr-8">Prospect Bookmarks</h1>
            <p className="text-white/80 text-sm hidden md:block">View and manage bookmarked prospects</p>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
            <p>Loading prospect bookmarks...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {fallbackMode && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 mx-6 mt-6 rounded">
          <p className="font-medium">Fallback Mode Active</p>
          <p className="text-sm">Unable to connect to the legacy system. Using mock data.</p>
        </div>
      )}
      
      <CommonProspectsTable 
        prospects={prospects} 
        title="Prospect Bookmarks"
        emptyMessage="No bookmarked prospects found"
      />
    </div>
  )
}
