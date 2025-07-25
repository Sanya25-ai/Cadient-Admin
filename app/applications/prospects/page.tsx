"use client"

import { useState, useEffect } from "react"
import CommonProspectsTable from "@/components/prospects/common-prospects-table"
import { Button } from "@/components/ui/button"
import type { Prospect } from "@/lib/types"

interface ProspectsPageProps {
  fallbackMode?: boolean;
}

export default function ApplicationProspectsPage({ fallbackMode = false }: ProspectsPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchProspects = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/applications/prospects')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch prospects: ${response.status}`)
        }
        
        const data = await response.json()
        setProspects(data)
      } catch (err) {
        console.error('Error fetching prospects:', err)
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
            <h1 className="text-2xl font-semibold text-orange-600 mr-8">Prospects</h1>
            <p className="text-white/80 text-sm hidden md:block">View and manage prospects</p>
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
        <div className="bg-white py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-orange-600 mr-8">Prospects</h1>
            <p className="text-white/80 text-sm hidden md:block">View and manage prospects</p>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 text-center">
            <p>Loading prospects...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="bg-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-orange-600 mr-8">Prospects</h1>
          <p className="text-white/80 text-sm hidden md:block">View and manage prospects</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Filter Results
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 pt-0">
        {fallbackMode && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 mx-6 mt-6 rounded">
            <p className="font-medium">Fallback Mode Active</p>
            <p className="text-sm">Unable to connect to the legacy system. Using mock data.</p>
          </div>
        )}
        
        <CommonProspectsTable 
          prospects={prospects} 
          title="Prospects"
          emptyMessage="No prospects found"
        />
      </div>
    </div>
  )
}
