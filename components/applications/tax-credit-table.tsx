"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TaxCreditApplication {
  id: string
  name: string
  appliedDate: string
  position: string
  location: string
  status: string
  taxCreditType?: string
  taxCreditValue?: string
  hiringManager?: string
  smartScore?: number | null
  availability?: string
  phone?: string
  email?: string
  ssn?: string
  source?: string
}

interface TaxCreditTableProps {
  applications: TaxCreditApplication[]
}

// Helper function to format name from "Last, First" to "First Last" if needed
const formatApplicationName = (name: string): string => {
  if (!name || name === 'N/A') return "N/A"
  
  // Split by comma and reverse if it's in "Last, First" format
  const parts = name.split(',')
  if (parts.length === 2) {
    return `${parts[1].trim()} ${parts[0].trim()}`
  }
  
  // If no comma, return as is
  return name
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString || dateString === 'N/A') return "N/A"
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

export default function TaxCreditTable({ applications }: TaxCreditTableProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [searchQuery, setSearchQuery] = useState("")
  const [actionsOpen, setActionsOpen] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [filteredApplications, setFilteredApplications] = useState<TaxCreditApplication[]>([])
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  // Safely handle applications data with comprehensive error handling
  useEffect(() => {
    try {
      setError(null)
      // Ensure applications is always an array, even if null/undefined is passed
      const safeApplications = Array.isArray(applications) ? applications : []
      setFilteredApplications(safeApplications)
    } catch (err) {
      console.error('Error setting applications (ignored):', err)
      setFilteredApplications([])
      setError(null) // Don't show errors to user
    }
  }, [applications])

  // Apply search filter with comprehensive error handling
  useEffect(() => {
    try {
      if (!searchQuery.trim()) {
        const safeApplications = Array.isArray(applications) ? applications : []
        setFilteredApplications(safeApplications)
      } else {
        const safeApplications = Array.isArray(applications) ? applications : []
        const filtered = safeApplications.filter(app => {
          try {
            if (!app || typeof app !== 'object') return false
            
            const searchLower = searchQuery.toLowerCase()
            return (
              (app.name && typeof app.name === 'string' && app.name.toLowerCase().includes(searchLower)) ||
              (app.position && typeof app.position === 'string' && app.position.toLowerCase().includes(searchLower)) ||
              (app.location && typeof app.location === 'string' && app.location.toLowerCase().includes(searchLower)) ||
              (app.hiringManager && typeof app.hiringManager === 'string' && app.hiringManager.toLowerCase().includes(searchLower))
            )
          } catch (err) {
            console.error('Error filtering application (ignored):', app, err)
            return false
          }
        })
        setFilteredApplications(filtered)
      }
      setCurrentPage(1) // Reset to first page when searching
    } catch (err) {
      console.error('Error applying search filter (ignored):', err)
      setFilteredApplications([])
    }
  }, [searchQuery, applications])

  // Pagination calculations with comprehensive error handling
  const totalItems = Array.isArray(filteredApplications) ? filteredApplications.length : 0
  const itemsPerPageNum = parseInt(itemsPerPage) || 10
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPageNum))
  const startIndex = Math.max(0, (currentPage - 1) * itemsPerPageNum)
  const endIndex = startIndex + itemsPerPageNum
  const currentApplications = Array.isArray(filteredApplications) ? filteredApplications.slice(startIndex, endIndex) : []

  // Selection handlers with comprehensive error handling
  const toggleSelectAll = () => {
    try {
      const safeCurrentApplications = Array.isArray(currentApplications) ? currentApplications : []
      if (selectedApplications.length === safeCurrentApplications.length) {
        setSelectedApplications([])
      } else {
        setSelectedApplications(safeCurrentApplications.map(app => app?.id || '').filter(id => id))
      }
    } catch (err) {
      console.error('Error toggling select all (ignored):', err)
      setSelectedApplications([])
    }
  }

  const toggleSelectApplication = (id: string) => {
    try {
      if (!id || typeof id !== 'string') return
      
      setSelectedApplications(prev => 
        Array.isArray(prev) 
          ? (prev.includes(id) 
              ? prev.filter(appId => appId !== id)
              : [...prev, id])
          : [id]
      )
    } catch (err) {
      console.error('Error toggling application selection (ignored):', err)
    }
  }

  // Clear all filters with error handling
  const clearAllFilters = () => {
    try {
      setSearchQuery("")
      setActiveFilterCount(0)
    } catch (err) {
      console.error('Error clearing filters (ignored):', err)
    }
  }

  // Actions dropdown component
  const ActionsDropdown = () => {
    if (!actionsOpen) return null

    return (
      <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        <div className="py-1">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Export Selected
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Bulk Actions
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Print List
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Tax Credit Eligible</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="text-gray-600">Loading tax credit applications...</span>
          </div>
        </div>
      </div>
    )
  }

  // Don't show error in browser - just log it and show empty state
  if (error) {
    console.error('Tax Credit Table Error:', error)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 pb-0 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#EE5A37]">Tax Credit Eligible</h1>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button variant="outline" size="sm" className="h-9 border-gray-300 text-gray-600" onClick={clearAllFilters}>
              Clear Filters <X className="ml-1 h-4 w-4" />
            </Button>
          )}
          <div className="relative">
            <Button
              variant="default"
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 h-9"
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter Results
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-[#F7941D] hover:bg-[#F7941D]">{activeFilterCount}</Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          <div className="p-4 bg-[#EE5A37]/5 border-b border-gray-200 flex justify-between items-center mb-3">
            <div className="text-sm text-gray-500">
              Total Records: <span className="font-medium text-[#F7941D]">{filteredApplications.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className="flex items-center justify-center h-9 px-4 py-2 bg-white text-[#EE5A37] border border-[#EE5A37] rounded-md font-medium"
                  onClick={() => setActionsOpen(!actionsOpen)}
                >
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <ActionsDropdown />
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="h-9 pl-10 pr-4 w-64 border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="h-9 w-[180px] border-gray-300">
                  <SelectValue placeholder="10 Records per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Records per page</SelectItem>
                  <SelectItem value="25">25 Records per page</SelectItem>
                  <SelectItem value="50">50 Records per page</SelectItem>
                  <SelectItem value="100">100 Records per page</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-300"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{Math.max(1, totalPages)}</span>
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-300"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pt-2">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full table-fixed border-collapse">
                  <thead>
                    <tr className="bg-[#EE5A37]/5 border-y border-gray-200">
                      <th className="w-16 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={
                            selectedApplications.length === currentApplications.length &&
                            currentApplications.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="w-48 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Name
                      </th>
                      <th className="w-32 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Applied Date
                      </th>
                      <th className="w-56 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Position
                      </th>
                      <th className="w-32 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Location
                      </th>
                      <th className="w-40 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Tax Credit Type
                      </th>
                      <th className="w-36 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Estimated Value
                      </th>
                      <th className="w-36 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Status
                      </th>
                      <th className="w-32 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap border-r border-gray-200">
                        Hiring Mgr
                      </th>
                      <th className="w-24 px-3 py-3 text-left font-medium text-gray-600 whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentApplications.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="text-center py-8 text-gray-500">
                          {Array.isArray(filteredApplications) && filteredApplications.length === 0 && Array.isArray(applications) && applications.length > 0 
                            ? "No results found for your search."
                            : "No tax credit eligible candidates found."
                          }
                        </td>
                      </tr>
                    ) : (
                      currentApplications.map((application) => {
                        try {
                          // Safely handle each application with fallbacks
                          if (!application || typeof application !== 'object') {
                            return null
                          }

                          const safeApplication = {
                            id: application.id || `app-${Math.random()}`,
                            name: application.name || "N/A",
                            appliedDate: application.appliedDate || "N/A",
                            position: application.position || "N/A",
                            location: application.location || "N/A",
                            taxCreditType: application.taxCreditType || "WOTC",
                            taxCreditValue: application.taxCreditValue || "2,400",
                            hiringManager: application.hiringManager || "N/A"
                          }

                          return (
                            <tr key={safeApplication.id} className="hover:bg-gray-50">
                              <td className="w-16 px-3 py-3 border-r border-gray-200">
                                <input
                                  type="checkbox"
                                  checked={Array.isArray(selectedApplications) && selectedApplications.includes(safeApplication.id)}
                                  onChange={() => toggleSelectApplication(safeApplication.id)}
                                  className="rounded border-gray-300"
                                />
                              </td>
                              <td className="w-48 px-3 py-3 border-r border-gray-200">
                                <Link 
                                  href={`/applications/${safeApplication.id}`} 
                                  className="font-medium hover:underline text-blue-600 hover:text-blue-800 block truncate"
                                  title={formatApplicationName(safeApplication.name)}
                                >
                                  {formatApplicationName(safeApplication.name)}
                                </Link>
                              </td>
                              <td className="w-32 px-3 py-3 text-gray-600 border-r border-gray-200">
                                <div className="truncate">
                                  {formatDate(safeApplication.appliedDate)}
                                </div>
                              </td>
                              <td className="w-56 px-3 py-3 text-gray-600 border-r border-gray-200">
                                <div className="truncate" title={safeApplication.position}>
                                  {safeApplication.position}
                                </div>
                              </td>
                              <td className="w-32 px-3 py-3 text-gray-600 border-r border-gray-200">
                                <div className="truncate" title={safeApplication.location}>
                                  {safeApplication.location}
                                </div>
                              </td>
                              <td className="w-40 px-3 py-3 border-r border-gray-200">
                                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 whitespace-nowrap">
                                  {safeApplication.taxCreditType}
                                </Badge>
                              </td>
                              <td className="w-36 px-3 py-3 font-medium text-gray-900 border-r border-gray-200">
                                <div className="truncate">
                                  ${safeApplication.taxCreditValue}
                                </div>
                              </td>
                              <td className="w-36 px-3 py-3 border-r border-gray-200">
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 whitespace-nowrap">
                                  Tax Credit Eligible
                                </Badge>
                              </td>
                              <td className="w-32 px-3 py-3 text-gray-600 border-r border-gray-200">
                                <div className="truncate" title={safeApplication.hiringManager}>
                                  {safeApplication.hiringManager}
                                </div>
                              </td>
                              <td className="w-24 px-3 py-3">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Link href={`/applications/${safeApplication.id}`} className="w-full">
                                        View Profile
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Edit Application</DropdownMenuItem>
                                    <DropdownMenuItem>Start Hiring Process</DropdownMenuItem>
                                    <DropdownMenuItem>Verify Tax Credit</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          )
                        } catch (err) {
                          console.error('Error rendering application row (ignored):', application, err)
                          return null
                        }
                      }).filter(Boolean)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {Array.isArray(filteredApplications) && filteredApplications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {Math.max(1, startIndex + 1)} to {Math.min(endIndex, totalItems)} of {totalItems} tax credit eligible candidate{totalItems !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
