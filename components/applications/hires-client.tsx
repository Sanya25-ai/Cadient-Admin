"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import HiresFilterPanel from "./hires-filter-panel"
import type { Hire } from "@/lib/types"

// Define filter types for hires
export type HiresFilterState = {
  name: string
  position: string
  location: string
  hired: {
    from: string
    to: string
  }
  smartScore: string
  former: boolean
  rehire: boolean
  eVerifyStatus: string
  wotcStatus: string
}

interface HiresClientProps {
  onFiltersChange?: (filters: any) => void
}

// Function to determine score class based on score value
function getScoreClass(score: number) {
  if (score < 50) return "bg-amber-100 text-amber-800"
  if (score < 75) return "bg-amber-100 text-amber-800" // Yellow for scores below 75
  if (score >= 75 && score < 85) return "bg-green-100 text-green-800" // Green for scores 75-84
  if (score >= 85) return "bg-red-100 text-red-800" // Red for scores 85+
  return "bg-gray-100 text-gray-800" // Default
}

// Function to count active filters
function countActiveFilters(filters: HiresFilterState): number {
  let count = 0
  if (filters.name) count++
  if (filters.position) count++
  if (filters.location) count++
  if (filters.hired.from) count++
  if (filters.hired.to) count++
  if (filters.smartScore) count++
  if (filters.former) count++
  if (filters.rehire) count++
  if (filters.eVerifyStatus) count++
  if (filters.wotcStatus) count++
  return count
}

// Function to determine circle color based on score
const getCircleColor = (score: number) => {
  if (score >= 75) return "#22c55e" // Green for high scores
  if (score >= 50) return "#f59e0b" // Amber for medium scores
  return "#ef4444" // Red for low scores
}

// Function to get tag color based on tag content
const getTagColor = (tag: string) => {
  if (tag.includes("Experience")) return "bg-[#f8e9dd] text-[#b06b32] border-[#f8e9dd]"
  if (tag.includes("Management")) return "bg-[#f5f5f5] text-[#666666] border-[#e0e0e0]"
  if (tag.includes("Sales")) return "bg-[#fef2e6] text-[#e67e22] border-[#fef2e6]"
  return "bg-gray-100 text-gray-800 border-gray-200"
}

export default function HiresClient({ onFiltersChange }: HiresClientProps) {
  const [hires, setHires] = useState<Hire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentFilters, setCurrentFilters] = useState<any>({})
  const [selectedHires, setSelectedHires] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [searchQuery, setSearchQuery] = useState("")
  const [actionsOpen, setActionsOpen] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [hoveredScoreId, setHoveredScoreId] = useState<string | null>(null)
  const [hoveredNameId, setHoveredNameId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [filters, setFilters] = useState<HiresFilterState>({
    name: "",
    position: "",
    location: "",
    hired: {
      from: "",
      to: "",
    },
    smartScore: "",
    former: false,
    rehire: false,
    eVerifyStatus: "",
    wotcStatus: "",
  })
  const [filteredHires, setFilteredHires] = useState<Hire[]>([])
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const router = useRouter()

  // Track mouse position for tooltip positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const fetchHires = async (filters: any = {}) => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔄 Fetching hires data from API with filters:', filters)
      
      // Build query string with filter parameters
      const queryParams = new URLSearchParams()
      
      // Handle date filters - differentiate between basic and advanced mode
      if (filters.hireDateRange && !filters.applicationFromDate) {
        // Basic mode - send the date range string
        queryParams.append('hireDateRange', filters.hireDateRange)
      } else if (filters.applicationFromDate && filters.applicationToDate) {
        // Advanced mode - send specific dates
        queryParams.append('applicationFromDate', filters.applicationFromDate.toISOString().split('T')[0])
        queryParams.append('applicationToDate', filters.applicationToDate.toISOString().split('T')[0])
      }
      
      // Add other filter parameters to query string
      if (filters.workPreference && filters.workPreference !== 'All') {
        queryParams.append('workPreference', filters.workPreference)
      }
      if (filters.location && filters.location !== 'All') {
        queryParams.append('location', filters.location)
      }
      if (filters.position && filters.position !== 'All') {
        queryParams.append('position', filters.position)
      }
      if (filters.applicationType && filters.applicationType !== 'All') {
        queryParams.append('applicationType', filters.applicationType)
      }
      if (filters.dataChannel && filters.dataChannel !== 'All') {
        queryParams.append('dataChannel', filters.dataChannel)
      }
      if (filters.exclusive && filters.exclusive !== 'All') {
        queryParams.append('exclusive', filters.exclusive)
      }
      if (filters.hiringWorkflow && filters.hiringWorkflow !== 'All') {
        queryParams.append('hiringWorkflow', filters.hiringWorkflow)
      }
      if (filters.status && filters.status !== 'All') {
        queryParams.append('status', filters.status)
      }
      if (filters.veteranStatus && filters.veteranStatus !== 'All') {
        queryParams.append('veteranStatus', filters.veteranStatus)
      }
      if (filters.tag && filters.tag.trim() !== '') {
        queryParams.append('tag', filters.tag)
      }

      const queryString = queryParams.toString()
      const url = `/api/applications/hires${queryString ? `?${queryString}` : ''}`
      
      console.log('📞 API URL:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (response.status === 401) {
        console.log('🔒 Session expired, redirecting to login')
        router.push('/login')
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch hires: ${response.status}`)
      }

      const data = await response.json()
      
      if (Array.isArray(data)) {
        console.log(`✅ Successfully loaded ${data.length} hire records`)
        setHires(data)
        setFilteredHires(data)
      } else {
        console.error('❌ Invalid response format:', data)
        setError('Invalid response format from server')
      }

    } catch (err) {
      console.error('❌ Error fetching hires:', err)
      setError(err instanceof Error ? err.message : 'Failed to load hires data')
    } finally {
      setLoading(false)
    }
  }

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters()
    setActiveFilterCount(countActiveFilters(filters))
  }, [filters])

  // Apply search query whenever searchQuery changes
  useEffect(() => {
    applyFilters()
  }, [searchQuery])

  // Initial load without filters
  useEffect(() => {
    fetchHires()
  }, [router])

  // Function to apply all filters
  const applyFilters = () => {
    let result = [...hires]

    // Apply search query (across name, position, location)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (hire) =>
          hire.name.toLowerCase().includes(query) ||
          hire.position.toLowerCase().includes(query) ||
          hire.hiredLocation.toLowerCase().includes(query),
      )
    }

    // Apply name filter
    if (filters.name) {
      result = result.filter((hire) => hire.name.toLowerCase().includes(filters.name.toLowerCase()))
    }

    // Apply position filter
    if (filters.position) {
      result = result.filter((hire) => hire.position.toLowerCase().includes(filters.position.toLowerCase()))
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter((hire) => hire.hiredLocation.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Apply hired date from filter
    if (filters.hired.from) {
      const fromDate = new Date(filters.hired.from)
      result = result.filter((hire) => new Date(hire.hired) >= fromDate)
    }

    // Apply hired date to filter
    if (filters.hired.to) {
      const toDate = new Date(filters.hired.to)
      toDate.setHours(23, 59, 59, 999)
      result = result.filter((hire) => new Date(hire.hired) <= toDate)
    }

    // Apply SmartScore filter
    if (filters.smartScore) {
      const minScore = Number.parseInt(filters.smartScore)
      result = result.filter((hire) => (hire.score || 0) >= minScore)
    }

    // Apply former filter
    if (filters.former) {
      result = result.filter((hire) => hire.formerEmployee === "Yes")
    }

    // Apply rehire filter
    if (filters.rehire) {
      result = result.filter((hire) => hire.rehireEligible === "Yes")
    }

    // Apply E-Verify status filter
    if (filters.eVerifyStatus) {
      result = result.filter((hire) => hire.eVerifyStatus?.toLowerCase() === filters.eVerifyStatus.toLowerCase())
    }

    // Apply WOTC status filter
    if (filters.wotcStatus) {
      result = result.filter((hire) => hire.wotcStatus?.toLowerCase() === filters.wotcStatus.toLowerCase())
    }

    setFilteredHires(result)
  }

  // Handle filter changes from the legacy filter panel
  const handleApplyFilters = (filters: any) => {
    console.log('🔧 Applying filters:', filters)
    setCurrentFilters(filters)
    fetchHires(filters)
    onFiltersChange?.(filters)
  }

  // Handle filter changes from the new filter panel
  const handleFilterChange = (newFilters: HiresFilterState) => {
    setFilters(newFilters)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      name: "",
      position: "",
      location: "",
      hired: {
        from: "",
        to: "",
      },
      smartScore: "",
      former: false,
      rehire: false,
      eVerifyStatus: "",
      wotcStatus: "",
    })
    setSearchQuery("")
  }

  // Toggle selection of all hires
  const toggleSelectAll = () => {
    if (selectedHires.length === filteredHires.length) {
      setSelectedHires([])
    } else {
      setSelectedHires(filteredHires.map((hire) => hire.id))
    }
  }

  // Toggle selection of a single hire
  const toggleSelectHire = (id: string) => {
    if (selectedHires.includes(id)) {
      setSelectedHires(selectedHires.filter((hireId) => hireId !== id))
    } else {
      setSelectedHires([...selectedHires, id])
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredHires.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const endIndex = startIndex + Number.parseInt(itemsPerPage)
  const displayedHires = filteredHires.slice(startIndex, endIndex)

  const ActionsDropdown = () => {
    if (!actionsOpen) return null

    return (
      <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
        <div className="py-1">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bookmark</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Send a Message</button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Forward Interview Guide
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Forward Application Details
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Tag</button>
        </div>
      </div>
    )
  }

  // Function to create a circular progress indicator
  const CircleProgress = ({ score, label }: { score: number; label: string }) => {
    const color = getCircleColor(score)
    const circumference = 2 * Math.PI * 30 // Circle radius is 30
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
      <div className="flex flex-row items-center gap-2">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            {/* Percentage text */}
            <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="500" fill="#374151">
              {score}%
            </text>
          </svg>
        </div>
        <span className="text-xs text-gray-600 w-24">{label}</span>
      </div>
    )
  }

  // Render the SmartScore tooltip
  const renderSmartScoreTooltip = (score: number) => {
    // Generate random but consistent component scores based on the main score
    const smartTenureScore = Math.round(score * 0.9 + Math.random() * 10)
    const smartHireScore = Math.round(score * 0.7 + Math.random() * 15)
    const smartMatchScore = Math.round(score * 0.5 + Math.random() * 20)
    const smartScreenScore = Math.round(score * 0.5 + Math.random() * 20)

    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 320
    const tooltipHeight = 200
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let left = mousePosition.x + 10
    let top = mousePosition.y + 10
    
    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10
    }

    return (
      <div 
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] w-[320px] pointer-events-none"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
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
  const renderNameTooltip = (hire: Hire) => {
    // Mock additional data for tooltip
    const mockData = {
      email: `${hire.name.toLowerCase().replace(/[^a-z]/g, '.')}@email.com`,
      phone: "555-123-4567",
      city: hire.hiredLocation.split('-')[0] || hire.hiredLocation,
      state: "CA",
      tags: ["3 Yrs Experience", "Customer Service"],
      applicationType: "External",
      exclusive: "Yes",
      startDate: hire.hired,
      workPreference: "Full-Time",
      availabilitySchedule: [
        { day: "Monday", time: "8:00 AM - 5:00 PM" },
        { day: "Tuesday", time: "8:00 AM - 5:00 PM" },
      ],
    }

    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 400
    const tooltipHeight = 400
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let left = mousePosition.x + 10
    let top = mousePosition.y + 10
    
    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10
    }

    return (
      <div 
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] w-[400px] pointer-events-none"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
        {/* Name and Location */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">{hire.name}</h3>
          <p className="text-sm text-gray-600">
            {mockData.city} | {mockData.state}
          </p>
        </div>

        {/* Hired Date */}
        <div className="flex justify-between mb-3">
          <div></div>
          <div className="text-sm">
            <span className="font-medium">Hired:</span> {hire.hired}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-between mb-3">
          <div className="text-sm">
            <span className="font-medium">Email:</span> {mockData.email}
          </div>
          <div className="text-sm">
            <span className="font-medium">Phone:</span> {mockData.phone}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <p className="text-sm mb-1">
            <span className="font-medium">Tags:</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {mockData.tags.map((tag, index) => (
              <span key={index} className={`text-xs px-3 py-1 rounded-full ${getTagColor(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Employee Details */}
        <div className="mb-3 border-t border-gray-200 pt-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Application Type:</span> {mockData.applicationType}
            </div>
            <div className="text-sm">
              <span className="font-medium">Exclusive:</span> {mockData.exclusive}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">E-Verify Status:</span> {hire.eVerifyStatus || "Not Screened"}
            </div>
            <div className="text-sm">
              <span className="font-medium">WOTC Status:</span> {hire.wotcStatus || "Not Screened"}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Work Preference:</span> {mockData.workPreference}
            </div>
            <div className="text-sm">
              <span className="font-medium">Start Date:</span> {mockData.startDate}
            </div>
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
                {mockData.availabilitySchedule.map((schedule, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-600">{schedule.day}</td>
                    <td className="px-4 py-2 text-gray-600">{schedule.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          <span className="text-gray-600">Loading hires data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Hires</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => fetchHires(currentFilters)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 pb-0 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#EE5A37]">Hires</h1>
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
            {filterPanelOpen && (
              <HiresFilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setFilterPanelOpen(false)}
                onApplyFilters={handleApplyFilters}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          <div className="p-4 bg-[#EE5A37]/5 border-b border-gray-200 flex justify-between items-center mb-3">
            <div className="text-sm text-gray-500">
              Total Records: <span className="font-medium text-[#F7941D]">{filteredHires.length}</span>
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
                <table className="min-w-full divide-y divide-gray-200 table-fixed" onMouseMove={handleMouseMove}>
                  <thead>
                    <tr className="bg-[#EE5A37]/5 border-y border-gray-200">
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[40px]">
                        <input
                          type="checkbox"
                          checked={selectedHires.length === filteredHires.length && filteredHires.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[100px]">
                        Hired
                        <button className="ml-1 inline-flex">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 2.5L9 6H3L6 2.5Z" fill="#666" />
                            <path d="M6 9.5L3 6H9L6 9.5Z" fill="#666" />
                          </svg>
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[180px]">
                        Position
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                        Hired Location
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[100px]">
                        SmartScore
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[80px]">
                        Former
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[80px]">
                        Rehire
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[80px]">
                        Score
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[80px]">
                        % Score
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                        E-Verify Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                        WOTC Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedHires.length > 0 ? (
                      displayedHires.map((hire) => (
                        <tr key={hire.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 font-normal whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedHires.includes(hire.id)}
                              onChange={() => toggleSelectHire(hire.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap relative">
                            <div
                              className="relative inline-block cursor-pointer"
                              onMouseEnter={(e) => {
                                setHoveredNameId(hire.id)
                                setMousePosition({ x: e.clientX, y: e.clientY })
                              }}
                              onMouseMove={(e) => {
                                setMousePosition({ x: e.clientX, y: e.clientY })
                              }}
                              onMouseLeave={() => setHoveredNameId(null)}
                            >
                              <span className="text-blue-600 hover:text-blue-800">{hire.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.hired}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.position}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.hiredLocation}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap relative">
                            <div
                              className="relative inline-block"
                              onMouseEnter={(e) => {
                                setHoveredScoreId(hire.id)
                                setMousePosition({ x: e.clientX, y: e.clientY })
                              }}
                              onMouseMove={(e) => {
                                setMousePosition({ x: e.clientX, y: e.clientY })
                              }}
                              onMouseLeave={() => setHoveredScoreId(null)}
                            >
                              <span
                                className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${getScoreClass(
                                  hire.score || 0,
                                )}`}
                              >
                                {hire.score || 0}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.formerEmployee || "--"}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.rehireEligible || "--"}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.score || "--"}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">
                            {hire.percentageScore ? `${hire.percentageScore}%` : "--"}
                          </td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.eVerifyStatus || "Not Screened"}</td>
                          <td className="px-4 py-3 font-normal whitespace-nowrap">{hire.wotcStatus || "Not Screened"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                          No results found. Try adjusting your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Render tooltips outside of table container */}
      {hoveredScoreId && (
        renderSmartScoreTooltip(displayedHires.find(h => h.id === hoveredScoreId)?.score || 0)
      )}
      {hoveredNameId && (
        renderNameTooltip(displayedHires.find(h => h.id === hoveredNameId)!)
      )}
    </div>
  )
}
