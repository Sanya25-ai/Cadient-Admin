"use client"

import { Filter, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useState, useRef, useEffect } from "react"

// Type definition for imported candidate
interface ImportedCandidate {
  id: number
  name: string
  appliedDate: string
  status: string
  source: string
  requisition?: string
  location?: string
}

export function ImportedCandidatesPage() {
  const [importedCandidates, setImportedCandidates] = useState<ImportedCandidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    applicationFromDate: "",
    applicationToDate: "",
    requisition: "",
    source: "All",
    jobCategory: "All",
    status: "All",
    bookmark: "All",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  // Fetch imported candidates data from API
  useEffect(() => {
    fetchImportedCandidates()
  }, [])

  const fetchImportedCandidates = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/imported-candidates', {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in to ATAO first.')
        }
        throw new Error(`Failed to fetch imported candidates: ${response.status}`)
      }

      const data = await response.json()
      console.log('📋 Fetched imported candidates:', data)
      
      // Transform the data to match our interface
      const transformedData: ImportedCandidate[] = data.map((candidate: any) => ({
        id: candidate.id,
        name: candidate.name,
        appliedDate: candidate.appliedDate ? new Date(candidate.appliedDate).toLocaleDateString() : 'N/A',
        status: candidate.status || 'Unknown',
        source: candidate.source || 'Import',
        requisition: candidate.requisition,
        location: candidate.location
      }))
      
      setImportedCandidates(transformedData)
    } catch (err) {
      console.error('❌ Error fetching imported candidates:', err)
      setError(err instanceof Error ? err.message : 'Failed to load imported candidates')
    } finally {
      setLoading(false)
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Toggle selection of all candidates
  const toggleSelectAll = () => {
    if (selectedCandidates.length === importedCandidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(importedCandidates.map((candidate) => candidate.id))
    }
  }

  // Toggle selection of a single candidate
  const toggleSelectCandidate = (id: number) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter((candidateId) => candidateId !== id))
    } else {
      setSelectedCandidates([...selectedCandidates, id])
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !filters.tags.includes(newTag.trim())) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSearch = () => {
    console.log("Applying filters:", filters)
    // Apply filter logic here
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({
      applicationFromDate: "",
      applicationToDate: "",
      requisition: "",
      source: "All",
      jobCategory: "All",
      status: "All",
      tags: [],
      bookmark: "All",
    })
  }

  // Handle action selection
  const handleAction = (action: string) => {
    if (selectedCandidates.length === 0) {
      alert("Please select at least one candidate")
      return
    }

    switch (action) {
      case "export-all-results":
        alert(`Export All Results action for candidates: ${selectedCandidates.join(", ")}`)
        break
      default:
        break
    }

    setShowDropdown(false)
  }

  const handleGoAction = () => {
    if (selectedCandidates.length === 0) {
      alert("Please select at least one candidate and an action")
      return
    }
    // Handle the selected action
    console.log("Go action for candidates:", selectedCandidates)
  }

  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-orange-500">
                Imported Candidates
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-10 px-4"
                  onClick={fetchImportedCandidates}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                  ) : (
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  Refresh
                </Button>
                <Button
                  variant="default"
                  className="bg-orange-500 hover:bg-orange-600 h-10 px-4 text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Results
                </Button>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
                onClick={() => setShowFilters(false)}
              >
                <div
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Filter</h3>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Application Date Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Application From Date:</Label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={filters.applicationFromDate || "4/27/2025"}
                            onChange={(e) => handleFilterChange("applicationFromDate", e.target.value)}
                            className="h-10 pr-10"
                            placeholder="mm/dd/yyyy"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Application To Date:</Label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={filters.applicationToDate || "5/27/2025"}
                            onChange={(e) => handleFilterChange("applicationToDate", e.target.value)}
                            className="h-10 pr-10"
                            placeholder="mm/dd/yyyy"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Application Type Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Status:</Label>
                        <select className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>-- All --</option>
                          <option>Pre-Screened</option>
                          <option>Incomplete</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Application Type:</Label>
                        <select className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>-- All --</option>
                          <option>Online Application</option>
                          <option>Manual Entry</option>
                        </select>
                      </div>
                    </div>

                    {/* Requisition and Location Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Requisition:</Label>
                        <div className="text-[#F7941D] font-medium">General Apply</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Location:</Label>
                        <div className="text-[#F7941D] font-medium">HeadQuarters</div>
                      </div>
                    </div>

                    {/* Source Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Source:</Label>
                        <select className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>choose one...</option>
                          <option>Import</option>
                          <option>Manual Entry</option>
                          <option>Online Application</option>
                        </select>
                      </div>
                      <div></div>
                    </div>

                    {/* Tag Row */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Tag:</Label>
                      <div className="border border-gray-300 rounded-md p-4 bg-white">
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Start typing to show a list"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addTag()}
                            className="h-10 flex-1"
                          />
                          <Button
                            onClick={addTag}
                            size="sm"
                            className="h-10 w-10 p-0 bg-gray-600 hover:bg-gray-700 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-500">Start typing to show a list</div>
                        {filters.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {filters.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                                <button
                                  onClick={() => removeTag(tag)}
                                  className="ml-1 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="pt-4">
                      <Button onClick={handleSearch} className="bg-[#EE5A37] hover:bg-[#EE5A37]/90">
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Header - New Design */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">
                  Total Records: <span className="text-[#EE5A37] font-medium">
                    {loading ? "Loading..." : importedCandidates.length}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Actions Dropdown */}
                <div className="relative">
                  <select
                    className="border border-gray-300 rounded px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                    onChange={(e) => {
                      if (e.target.value && selectedCandidates.length > 0) {
                        handleGoAction()
                      } else if (e.target.value && selectedCandidates.length === 0) {
                        alert("Please select at least one candidate to perform an action")
                      }
                      e.target.value = "" // Reset selection
                    }}
                  >
                    <option value="">select an action...</option>
                    <option value="bookmark">Bookmark</option>
                    <option value="change-status">Change Status</option>
                    <option value="send-message">Send a Message</option>
                    <option value="forward-interview">Forward Interview Guide</option>
                    <option value="forward-application">Forward Application Details</option>
                    <option value="add-tag">Add Tag</option>
                    <option value="export-all-results">Export All Results</option>
                  </select>
                </div>

                {/* Search Box */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#EE5A37]/20 focus:border-[#EE5A37]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={loading}
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Records per page */}
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EE5A37]/20"
                  disabled={loading}
                >
                  <option>10 Records per page</option>
                  <option>25 Records per page</option>
                  <option>50 Records per page</option>
                  <option>100 Records per page</option>
                </select>

                {/* Pagination */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <button className="p-1 hover:bg-gray-100 rounded" disabled={loading}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span>Page 1 of 1</span>
                  <button className="p-1 hover:bg-gray-100 rounded" disabled={loading}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading imported candidates...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-white border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-red-800">Error Loading Data</h3>
                </div>
                <p className="text-red-700 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-500 hover:bg-red-600"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Table */}
            {!loading && !error && (
              <div className="bg-white border border-gray-200 border-t-0 rounded-b-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-medium text-gray-700 w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedCandidates.length === importedCandidates.length && importedCandidates.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Applied</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importedCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          No imported candidates found
                        </td>
                      </tr>
                    ) : (
                      importedCandidates.map((candidate, index) => (
                        <tr
                          key={candidate.id}
                          className={`border-b border-gray-200 hover:bg-gray-50 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.includes(candidate.id)}
                              onChange={() => toggleSelectCandidate(candidate.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-900 font-medium hover:text-[#EE5A37] cursor-pointer">
                              {candidate.name}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{candidate.appliedDate}</td>
                          <td className="px-4 py-3 text-gray-600">{candidate.status}</td>
                          <td className="px-4 py-3 text-gray-600">{candidate.source}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
