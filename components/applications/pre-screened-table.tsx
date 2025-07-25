"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MoreHorizontal, UserCheck, X, ChevronUp, Search, ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Application } from "@/lib/types"
import { FilterResultsPanel, type FilterState } from "./filter-results-panel"

interface PreScreenedTableProps {
  applications: Application[]
}

// Helper functions for tooltips
function getScoreClass(score: number) {
  if (score >= 70) return "bg-green-500 text-white"
  if (score >= 40) return "bg-yellow-500 text-white"
  return "bg-red-500 text-white"
}

const getCircleColor = (score: number) => {
  if (score >= 70) return "#22c55e" // green-500
  if (score >= 40) return "#eab308" // yellow-500
  return "#ef4444" // red-500
}

const getTagColor = (tag: string) => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-yellow-100 text-yellow-800",
  ]
  return colors[tag.length % colors.length]
}

// Function to count active filters
const countActiveFilters = (filterState: FilterState): number => {
  let count = 0
  
  if (filterState.searchText && filterState.searchText.trim() !== "") count++
  if (filterState.status && filterState.status !== "all") count++
  if (filterState.location && filterState.location !== "all") count++
  if (filterState.position && filterState.position !== "all") count++
  if (filterState.applied.from) count++
  if (filterState.applied.to) count++
  if (filterState.workPreference && filterState.workPreference !== "all") count++
  if (filterState.applicationType && filterState.applicationType !== "all") count++
  if (filterState.exclusive && filterState.exclusive !== "all") count++
  if (filterState.hiringWorkflow && filterState.hiringWorkflow !== "all") count++
  if (filterState.dataChannel && filterState.dataChannel !== "all") count++
  if (filterState.smartTenure && filterState.smartTenure !== "all") count++
  if (filterState.wotcStatus && filterState.wotcStatus !== "all") count++
  if (filterState.bookmarkFilter && filterState.bookmarkFilter !== "all") count++
  if (filterState.tags && filterState.tags.trim() !== "") count++
  if (filterState.score.min) count++
  if (filterState.score.max) count++
  if (filterState.dateFilterRange && filterState.dateFilterRange !== "30") count++
  if (filterState.jobOpeningId) count++
  if (filterState.positionKey) count++
  
  return count
}

export default function PreScreenedTable({ applications }: PreScreenedTableProps) {
  const [filteredApplications, setFilteredApplications] = useState(applications)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [viewApplication, setViewApplication] = useState<Application | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  // Add state for tooltip hover tracking
  const [hoveredScoreId, setHoveredScoreId] = useState<string | null>(null)
  const [hoveredNameId, setHoveredNameId] = useState<string | null>(null)
  // Add state for pagination and search
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [searchQuery, setSearchQuery] = useState("")
  const [actionsOpen, setActionsOpen] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const [filters, setFilters] = useState<FilterState>({
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
    smartTenure: "all",
    tags: "",
    score: {
      min: "",
      max: "",
    },
    bidLocation: "all",
    currentLocations: [],
    hiringStep: "",
    availability: "",
    wotcStatus: "all",
    bookmarkFilter: "all",
    positionKey: "",
    jobOpeningId: "",
    dateFilterRange: "30"
  })

  // Function to create a circular progress indicator
  const CircleProgress = ({ score, label }: { score: number; label: string }) => {
    const radius = 16
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="3"
              fill="transparent"
              className="opacity-20"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke={getCircleColor(score)}
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700">{score}%</span>
          </div>
        </div>
        <span className="text-xs text-gray-600 mt-1 text-center">{label}</span>
      </div>
    )
  }

  const renderSmartScoreTooltip = (score: number) => {
    // Generate random but consistent component scores based on the main score
    const smartTenureScore = Math.round(score * 0.9 + Math.random() * 10)
    const smartHireScore = Math.round(score * 0.7 + Math.random() * 15)
    const smartMatchScore = Math.round(score * 0.5 + Math.random() * 20)
    const smartScreenScore = Math.round(score * 0.5 + Math.random() * 20)

    return (
      <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 w-[320px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">SmartScore</h3>
          <span className="text-[#EE5A37] font-bold text-lg">{score}%</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CircleProgress score={smartTenureScore} label="SmartTenure" />
          <CircleProgress score={smartHireScore} label="SmartHire" />
          <CircleProgress score={smartMatchScore} label="SmartMatch" />
          <CircleProgress score={smartScreenScore} label="SmartScreen" />
        </div>
      </div>
    )
  }

  // Render the Name tooltip
  const renderNameTooltip = (application: Application) => {
    return (
      <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 w-[400px]">
        {/* Name and Location */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">{application.name}</h3>
          <p className="text-sm text-gray-600">
            {application.location}
          </p>
        </div>

        {/* Applied Date */}
        <div className="flex justify-between mb-3">
          <div></div>
          <div className="text-sm">
            <span className="font-medium">Applied:</span> {application.appliedDate}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-between mb-3">
          <div className="text-sm">
            <span className="font-medium">Email:</span> {application.email}
          </div>
          <div className="text-sm">
            <span className="font-medium">Phone:</span> {application.phone}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <p className="text-sm mb-1">
            <span className="font-medium">Tags:</span>
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500">No tags assigned</span>
          </div>
        </div>

        {/* Application Details */}
        <div className="mb-3 border-t border-gray-200 pt-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Status:</span> {application.status}
            </div>
            <div className="text-sm">
              <span className="font-medium">Source:</span> {application.source}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">WOTC Status:</span> {application.wotcStatus || 'Not screened'}
            </div>
            <div className="text-sm">
              <span className="font-medium">Former Employee:</span> {application.former || 'No'}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm">
            <span className="font-medium">Rehire Eligible:</span> {application.rehire || 'N/A'}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-1">
          <p className="text-sm mb-1">
            <span className="font-medium">Availability:</span>
          </p>
          <div className="bg-[#fff8f8] rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 w-1/3 bg-[#fff0f0]">Day</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 w-2/3 bg-[#fff0f0]">Working Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Monday</td>
                  <td className="px-4 py-2 text-gray-600">9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Tuesday</td>
                  <td className="px-4 py-2 text-gray-600">9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Wednesday</td>
                  <td className="px-4 py-2 text-gray-600">9:00 AM - 5:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map(app => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId])
    } else {
      setSelectedApplications(selectedApplications.filter(id => id !== applicationId))
    }
  }

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })

    const sortedApplications = [...filteredApplications].sort((a, b) => {
      const aValue = a[key as keyof Application]
      const bValue = b[key as keyof Application]
      
      if (aValue === undefined || bValue === undefined) return 0
      
      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1
      }
      return 0
    })

    setFilteredApplications(sortedApplications)
  }

  const viewApplicationDetails = (application: Application) => {
    setViewApplication(application)
    setIsViewDialogOpen(true)
  }

  // Actions dropdown component
  const ActionsDropdown = () => {
    if (!actionsOpen) return null

    return (
      <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
        <div className="py-1">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Assign</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bookmark</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Change Hiring Step
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Change Status</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Send a Message</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Extend Application
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Forward Interview Guide
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Forward Application Details
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Initiate Hiring Process
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Resend Invite for Job Board
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Tag</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export All Results</button>
        </div>
      </div>
    )
  }

  // Apply all filters
  const applyFilters = () => {
    let result = [...applications]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query),
      )
    }

    // Apply filters from FilterResultsPanel
    if (filters.status && filters.status !== "all") {
      result = result.filter(app => app.status?.toLowerCase().includes(filters.status.toLowerCase()))
    }

    if (filters.location && filters.location !== "all") {
      result = result.filter(app => app.location?.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.position && filters.position !== "all") {
      result = result.filter(app => app.position?.toLowerCase().includes(filters.position.toLowerCase()))
    }

    if (filters.wotcStatus && filters.wotcStatus !== "all") {
      result = result.filter(app => app.wotcStatus?.toLowerCase().includes(filters.wotcStatus.toLowerCase()))
    }

    setFilteredApplications(result)
  }

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters()
    setActiveFilterCount(countActiveFilters(filters))
  }, [filters])

  // Apply search whenever searchQuery changes
  useEffect(() => {
    applyFilters()
  }, [searchQuery, applications])

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setActiveFilterCount(countActiveFilters(newFilters))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
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
      smartTenure: "all",
      tags: "",
      score: {
        min: "",
        max: "",
      },
      bidLocation: "all",
      currentLocations: [],
      hiringStep: "",
      availability: "",
      wotcStatus: "all",
      bookmarkFilter: "all",
      positionKey: "",
      jobOpeningId: "",
      dateFilterRange: "30"
    })
    setSearchQuery("")
    setActiveFilterCount(0)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const endIndex = startIndex + Number.parseInt(itemsPerPage)
  const displayedApplications = filteredApplications.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col h-full">
              <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Pre-screened Applications</h1>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button variant="outline" size="sm" className="h-9 border-gray-300 text-gray-600" onClick={clearAllFilters}>
                Clear Filters <X className="ml-1 h-4 w-4" />
              </Button>
            )}
            <div className="relative">
              <button
                ref={filterButtonRef}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#EE5A37] hover:bg-[#EE5A37]/90 h-9 px-4 py-2 text-white"
                onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter Results
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 bg-[#F7941D] hover:bg-[#F7941D]">{activeFilterCount}</Badge>
                )}
              </button>
              {filterPanelOpen && (
                <FilterResultsPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClose={() => setFilterPanelOpen(false)}
                />
              )}
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
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-12 px-4">
                <input
                  type="checkbox"
                  checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="cursor-pointer px-6 w-48" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Name
                  {sortConfig?.key === "name" && (
                    <ChevronUp
                      className={cn("ml-2 h-4 w-4", sortConfig.direction === "desc" && "transform rotate-180")}
                    />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer px-6" onClick={() => handleSort("appliedDate")}>
                <div className="flex items-center">
                  Applied
                  {sortConfig?.key === "appliedDate" && (
                    <ChevronUp
                      className={cn("ml-2 h-4 w-4", sortConfig.direction === "desc" && "transform rotate-180")}
                    />
                  )}
                </div>
              </TableHead>
              <TableHead className="px-6">Position</TableHead>
              <TableHead className="px-6 w-40">Location</TableHead>
              <TableHead className="px-6 w-36">WOTC Status</TableHead>
              <TableHead className="cursor-pointer px-6" onClick={() => handleSort("smartScore")}>
                <div className="flex items-center">
                  SmartScore
                  {sortConfig?.key === "smartScore" && (
                    <ChevronUp
                      className={cn("ml-2 h-4 w-4", sortConfig.direction === "desc" && "transform rotate-180")}
                    />
                  )}
                </div>
              </TableHead>
              <TableHead className="px-6">Former</TableHead>
              <TableHead className="px-6">Rehire</TableHead>
              <TableHead className="px-6">Partner</TableHead>
              <TableHead className="px-6">Availability</TableHead>
              <TableHead className="px-6 w-52">Hiring Step</TableHead>
              <TableHead className="w-20 px-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-gray-400 text-lg">📋</div>
                    <p className="text-gray-500 font-medium">No pre-screened applications found</p>
                    <p className="text-gray-400 text-sm">There are currently no applications that have been pre-screened.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="px-4">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(application.id)}
                      onChange={(e) => handleSelectApplication(application.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="px-6 relative">
                    <div
                      className="relative inline-block cursor-pointer"
                      onMouseEnter={() => setHoveredNameId(application.id)}
                      onMouseLeave={() => setHoveredNameId(null)}
                    >
                      <Link href={`/applications/${application.id}`} className="font-medium text-blue-600 hover:underline">
                      {application.name}
                    </Link>
                      {hoveredNameId === application.id && renderNameTooltip(application)}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 px-6">{application.appliedDate}</TableCell>
                  <TableCell className="text-gray-600 px-6">{application.position}</TableCell>
                  <TableCell className="text-gray-600 px-6">{application.location}</TableCell>
                  <TableCell className="px-6">
                    <span className="text-gray-600">{application.wotcStatus || application.status || 'Pre-screened'}</span>
                  </TableCell>
                  <TableCell className="px-6 relative">
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => setHoveredScoreId(application.id)}
                      onMouseLeave={() => setHoveredScoreId(null)}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-6 rounded text-xs font-medium text-white cursor-pointer ${
                        application.smartScore >= 80 ? 'bg-green-500' : 
                        application.smartScore >= 60 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}>
                        {application.smartScore}%
                      </span>
                      {hoveredScoreId === application.id && renderSmartScoreTooltip(application.smartScore)}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 px-6">
                    {application.former || '-'}
                  </TableCell>
                  <TableCell className="text-gray-600 px-6">
                    {application.rehire || '-'}
                  </TableCell>
                  <TableCell className="text-gray-600 px-6">
                    {application.partner || '-'}
                  </TableCell>
                  <TableCell className="text-gray-600 px-6">
                    {application.availability || '-'}
                  </TableCell>
                  <TableCell className="text-gray-600 px-6">
                    {application.hiringStep || '-'}
                  </TableCell>
                  <TableCell className="px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/applications/${application.id}`} className="flex items-center w-full">
                            View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                          Edit Application
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Start Hiring Process
                          </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Disqualify
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>Viewing application for {viewApplication?.name}</DialogDescription>
          </DialogHeader>

          {viewApplication && (
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Application Details</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium text-xl">
                    {viewApplication.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{viewApplication.name}</h2>
                    <p className="text-gray-500">{viewApplication.position}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span>{viewApplication.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Phone:</span>
                          <span>{viewApplication.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{viewApplication.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Application Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {viewApplication.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Applied Date:</span>
                          <span>{viewApplication.appliedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Source:</span>
                          <span>{viewApplication.source}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Details</CardTitle>
                    <CardDescription>Detailed information about the application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Position Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Position:</span>
                              <span>{viewApplication.position}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location:</span>
                              <span>{viewApplication.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Availability:</span>
                              <span>{viewApplication.availability}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Assessment Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status:</span>
                              <span>{viewApplication.assessmentStatus}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Score:</span>
                              <span>{viewApplication.assessmentScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Date:</span>
                              <span>{viewApplication.assessmentDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Results</CardTitle>
                    <CardDescription>Detailed assessment information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Assessment Details</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status:</span>
                              <Badge
                                variant="secondary"
                                className={
                                  viewApplication.assessmentStatus === "Passed"
                                    ? "bg-green-100 text-green-800"
                                    : viewApplication.assessmentStatus === "Failed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              >
                                {viewApplication.assessmentStatus}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Score:</span>
                              <span>{viewApplication.assessmentScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Date:</span>
                              <span>{viewApplication.assessmentDate}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Notes</h3>
                          <p className="text-gray-600">{viewApplication.assessmentNotes || "No notes available"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Application related documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-gray-500">No documents available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
