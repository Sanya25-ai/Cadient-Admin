"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { getFilterOptions, type FilterOptions } from "@/lib/filter-cache"

export type FilterState = {
  // Basic filters
  searchText: string
  status: string
  location: string
  position: string
  applied: {
    from: string
    to: string
  }
  
  // Advanced filters matching legacy system (only those available from backend)
  workPreference: string
  applicationType: string
  exclusive: string
  hiringWorkflow: string
  dataChannel: string
  veteranStatus: string
  
  // Additional legacy filters that are used
  bidLocation: string
  currentLocations: string[]
  hiringStep: string
  availability: string
  positionKey: string
  jobOpeningId: string
  
  // Date range filters
  dateFilterRange: string
}

interface FilterResultsPanelProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClose: () => void
}

export function FilterResultsPanel({ filters, onFilterChange, onClose }: FilterResultsPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    locations: [],
    positions: [],
    statuses: [],
    workPreferences: [],
    applicantTypes: [],
    exclusiveOptions: [],
    veteranStatuses: [],
    workflows: [],
    dataChannels: [],
    bookmarks: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load dynamic filter options from cache on component mount
  useEffect(() => {
    loadFilterOptions()
  }, [])

  const loadFilterOptions = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("🔍 FilterResultsPanel: Loading filter options from cache...")
      
      const data = await getFilterOptions()
      console.log("🔍 FilterResultsPanel: Loaded filter options from cache:", {
        positions: data.positions?.length || 0,
        locations: data.locations?.length || 0,
        statuses: data.statuses?.length || 0,
        workPreferences: data.workPreferences?.length || 0,
        applicantTypes: data.applicantTypes?.length || 0,
        exclusiveOptions: data.exclusiveOptions?.length || 0,
        veteranStatuses: data.veteranStatuses?.length || 0,
        workflows: data.workflows?.length || 0,
        dataChannels: data.dataChannels?.length || 0
      })

      // Add static bookmark options since they're not from legacy system
      const staticBookmarks = [
        { id: 'favorites', name: 'Favorites', value: 'favorites' },
        { id: 'high-priority', name: 'High Priority', value: 'high-priority' },
        { id: 'follow-up', name: 'Follow Up', value: 'follow-up' },
        { id: 'interview-ready', name: 'Interview Ready', value: 'interview-ready' },
        { id: 'top-candidates', name: 'Top Candidates', value: 'top-candidates' },
      ]

      setFilterOptions({
        locations: data.locations || [],
        positions: data.positions || [],
        statuses: data.statuses || [],
        workPreferences: data.workPreferences || [],
        applicantTypes: data.applicantTypes || [],
        exclusiveOptions: data.exclusiveOptions || [],
        veteranStatuses: data.veteranStatuses || [],
        workflows: data.workflows || [],
        dataChannels: data.dataChannels || [],
        bookmarks: staticBookmarks
      })
      
      setLoading(false)
    } catch (err) {
      console.error("🔍 FilterResultsPanel: Error loading filter options:", err)
      setError(err instanceof Error ? err.message : 'Failed to load filter options')
      setLoading(false)
    }
  }

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      
      // Don't close if clicking inside the panel
      if (panelRef.current && panelRef.current.contains(target)) {
        return
      }
      
      // Don't close if clicking on Radix UI portal elements (Select dropdowns, etc.)
      // Radix UI portals typically have data-radix-* attributes or are direct children of body
      const element = target as Element
      if (element) {
        // Check if the clicked element or any of its parents has Radix UI attributes
        let currentElement: Element | null = element
        while (currentElement) {
          // Check for Radix UI portal attributes
          if (currentElement.hasAttribute && (
            currentElement.hasAttribute('data-radix-select-content') ||
            currentElement.hasAttribute('data-radix-select-item') ||
            currentElement.hasAttribute('data-radix-select-trigger') ||
            currentElement.hasAttribute('data-radix-select-viewport') ||
            currentElement.hasAttribute('data-radix-popper-content-wrapper') ||
            currentElement.hasAttribute('data-radix-portal') ||
            currentElement.getAttribute('data-state') === 'open' ||
            currentElement.getAttribute('data-state') === 'closed' ||
            currentElement.classList?.contains('radix-select-content') ||
            currentElement.classList?.contains('radix-select-item')
          )) {
            return // Don't close the panel
          }
          currentElement = currentElement.parentElement
        }
      }
      
      // Close the panel if we get here (genuine outside click)
      onClose()
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleFilterChange = (field: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedFilterChange = (parent: string, field: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof FilterState] as any,
        [field]: value,
      },
    }))
  }

  const handleArrayFilterChange = (field: string, value: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const currentArray = prev[field as keyof FilterState] as string[]
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, value]
        }
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item !== value)
        }
      }
    })
  }

  const handleSearch = () => {
    console.log('🔍 Filter Panel: Applying filters:', localFilters)
    onFilterChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      searchText: "",
      status: "all",
      location: "all",
      position: "all",
      applied: {
        from: "",
        to: "",
      },
      workPreference: "all",
      applicationType: "all",
      exclusive: "all",
      hiringWorkflow: "all",
      dataChannel: "all",
      veteranStatus: "all",
      bidLocation: "all",
      currentLocations: [],
      hiringStep: "",
      availability: "",
      positionKey: "",
      jobOpeningId: "",
      dateFilterRange: "30",
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
    onClose()
  }

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-[600px] bg-white rounded-md shadow-lg border border-gray-200 z-20 max-h-[80vh] overflow-y-auto"
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#EE5A37] mb-6">Filter Applications</h2>

        <div className="space-y-6">
          {/* Quick Search */}
          <div>
            <h3 className="text-sm font-medium mb-2">Quick Search</h3>
            <Input
              type="text"
              placeholder="Search by name, position, or keywords..."
              value={localFilters.searchText}
              onChange={(e) => handleFilterChange("searchText", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Application Date Range */}
          <div>
            <h3 className="text-sm font-medium mb-2">Application Date</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">From</p>
                <div className="relative">
                  <Input
                    type="date"
                    value={localFilters.applied.from}
                    onChange={(e) => handleNestedFilterChange("applied", "from", e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">To</p>
                <div className="relative">
                  <Input
                    type="date"
                    value={localFilters.applied.to}
                    onChange={(e) => handleNestedFilterChange("applied", "to", e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Basic Filters Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <Select 
                value={localFilters.status || "all"} 
                onValueChange={(value) => handleFilterChange("status", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading..." : "All"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {filterOptions.statuses.map((status) => (
                    <SelectItem key={status.id} value={status.value}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Location</h3>
              <Select 
                value={localFilters.location || "all"} 
                onValueChange={(value) => handleFilterChange("location", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading..." : "All Locations"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {filterOptions.locations.map((location) => (
                    <SelectItem key={location.id} value={location.value}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Position Filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">Position</h3>
            <Select 
              value={localFilters.position || "all"} 
              onValueChange={(value) => handleFilterChange("position", value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Loading..." : "All Positions"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {filterOptions.positions.map((position) => (
                  <SelectItem key={position.id} value={position.value}>
                    {position.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Loading State for Main Filters */}
          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#EE5A37]"></div>
              <span className="ml-2 text-sm text-gray-600">Loading filter options...</span>
            </div>
          )}

          {/* Error State for Main Filters */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Filter Options Unavailable</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="bg-red-100 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                      onClick={loadFilterOptions}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Filters Toggle */}
          <div className="border-t border-b border-gray-200 py-2">
            <button
              className="flex items-center justify-between w-full text-sm text-[#EE5A37] font-medium"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{showAdvanced ? "Hide Advanced Filters" : "Show Advanced Filters"}</span>
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-4">
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#EE5A37]"></div>
                  <span className="ml-2 text-sm text-gray-600">Loading filter options...</span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Filter Options Unavailable</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                      <div className="mt-3">
                        <button
                          type="button"
                          className="bg-red-100 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                          onClick={loadFilterOptions}
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Work Preference and Application Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Work Preference</h3>
                  <Select
                    value={localFilters.workPreference || "all"}
                    onValueChange={(value) => handleFilterChange("workPreference", value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? "Loading..." : "All"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {filterOptions.workPreferences.map((workPref) => (
                        <SelectItem key={workPref.id} value={workPref.value}>
                          {workPref.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Application Type</h3>
                  <Select
                    value={localFilters.applicationType || "all"}
                    onValueChange={(value) => handleFilterChange("applicationType", value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? "Loading..." : "All"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {filterOptions.applicantTypes.map((appType) => (
                        <SelectItem key={appType.id} value={appType.value}>
                          {appType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exclusive and Hiring Workflow */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Exclusive?</h3>
                  <Select
                    value={localFilters.exclusive || "all"}
                    onValueChange={(value) => handleFilterChange("exclusive", value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? "Loading..." : "All"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {filterOptions.exclusiveOptions.map((exclusive) => (
                        <SelectItem key={exclusive.id} value={exclusive.value}>
                          {exclusive.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Hiring Workflow</h3>
                  <Select
                    value={localFilters.hiringWorkflow || "all"}
                    onValueChange={(value) => handleFilterChange("hiringWorkflow", value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? "Loading..." : "All"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {filterOptions.workflows.map((workflow) => (
                        <SelectItem key={workflow.id} value={workflow.value}>
                          {workflow.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Data Channel */}
              <div>
                <h3 className="text-sm font-medium mb-2">Data Channel</h3>
                <Select 
                  value={localFilters.dataChannel || "all"} 
                  onValueChange={(value) => handleFilterChange("dataChannel", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loading ? "Loading..." : "All"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {filterOptions.dataChannels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.value}>
                        {channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Veteran Status */}
              <div>
                <h3 className="text-sm font-medium mb-2">Veteran Status</h3>
                <Select 
                  value={localFilters.veteranStatus || "all"} 
                  onValueChange={(value) => handleFilterChange("veteranStatus", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loading ? "Loading..." : "All"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {filterOptions.veteranStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.value}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button 
              className="flex-1 bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white" 
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Loading..." : "Apply Filters"}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleReset}
              disabled={loading}
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
