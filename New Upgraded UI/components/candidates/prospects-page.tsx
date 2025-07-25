"use client"

import { useState, useEffect } from "react"
import CommonProspectsTable from "@/components/prospects/common-prospects-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import type { Prospect } from "@/lib/types"

export function ProspectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

  // Filter prospects based on search query
  const filteredProspects = prospects.filter((prospect) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      prospect.name.toLowerCase().includes(searchLower) ||
      (prospect.potentialPosition || '').toLowerCase().includes(searchLower) ||
      (prospect.location || '').toLowerCase().includes(searchLower) ||
      (prospect.source || '').toLowerCase().includes(searchLower) ||
      (prospect.status || '').toLowerCase().includes(searchLower)
    )
  })

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mr-8">Prospects</h1>
            <p className="text-white/80 text-sm hidden md:block">View and manage candidate prospects</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-red-500">{error}</p>
          <p className="mt-2">Please try again later or contact support.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mr-8">Prospects</h1>
            <p className="text-white/80 text-sm hidden md:block">View and manage candidate prospects</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Loading prospects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white mr-8">Prospects</h1>
          <p className="text-white/80 text-sm hidden md:block">View and manage candidate prospects</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="flex items-center" style={{ backgroundColor: "#EE5A37" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Prospect
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prospects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <CommonProspectsTable 
          prospects={filteredProspects} 
          title=""
          emptyMessage="No prospects found"
        />
      </div>
    </div>
  )
}
