"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FilterResultsPanel, type FilterState } from "./filter-results-panel"
import Link from "next/link"

interface AllApplicationsListProps {
  title: string
}

function getScoreClass(score: number) {
  if (score >= 70) return "bg-green-500 text-white"
  if (score >= 40) return "bg-yellow-500 text-white"
  return "bg-red-500 text-white"
}

function getStatusClass(status: string) {
  if (status === "Offered") return "text-green-600"
  if (status === "Disqualified") return "text-red-600"
  return "text-blue-600"
}

// Function to count active filters with new structure
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
  if (filterState.dateFilterRange && filterState.dateFilterRange !== "30") count++
  if (filterState.jobOpeningId) count++
  if (filterState.positionKey) count++
  if (filterState.veteranStatus && filterState.veteranStatus !== "all") count++
  
  return count
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

// Helper function to format name from "Last, First" to "First Last"
const formatApplicationName = (name: string): string => {
  if (!name) return "N/A"
  
  // Split by comma and take the first part (last name, first name -> last name)
  const parts = name.split(',')
  if (parts.length > 1) {
    return parts[0].trim()
  }
  
  // If no comma, return as is
  return name
}

// Function to truncate hiring step text to show only first word
const truncateHiringStep = (text: string): string => {
  if (!text) return "N/A"
  
  // Remove extra whitespace and newlines
  const cleanText = text.replace(/\s+/g, ' ').trim()
  
  // Get only the first word
  const firstWord = cleanText.split(' ')[0]
  
  return firstWord || "N/A"
}

export default function AllApplicationsList({ title }: AllApplicationsListProps) {
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [searchQuery, setSearchQuery] = useState("")
  const [actionsOpen, setActionsOpen] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [hoveredScoreId, setHoveredScoreId] = useState<string | null>(null)
  const [hoveredNameId, setHoveredNameId] = useState<string | null>(null)
  const [hoveredHiringStepId, setHoveredHiringStepId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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
    veteranStatus: "all",
    bidLocation: "all",
    currentLocations: [],
    hiringStep: "",
    availability: "",
    positionKey: "",
    jobOpeningId: "",
    dateFilterRange: "30"
  })
  const [applications, setApplications] = useState<any[]>([]) // Store real data from API
  const [filteredApplications, setFilteredApplications] = useState<any[]>([])
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Track mouse position for tooltip positioning
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
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

  // Apply filters whenever applications data changes
  useEffect(() => {
    applyFilters()
  }, [applications])

  // Load applications from backend API
  useEffect(() => {
    loadApplications()
  }, [])

  // Function to load applications with enhanced filter support
  async function loadApplications(filterParams?: FilterState) {
    try {
      setLoading(true)
      setError(null)

      let apiUrl: string
      let isFilteredRequest = false

      if (filterParams) {
        // Check if any actual filters are applied (not just default "all" values)
        const hasActiveFilters = (
          (filterParams.searchText && filterParams.searchText.trim() !== "") ||
          (filterParams.status && filterParams.status !== "all") ||
          (filterParams.location && filterParams.location !== "all") ||
          (filterParams.position && filterParams.position !== "all") ||
          (filterParams.applicationType && filterParams.applicationType !== "all") ||
          (filterParams.workPreference && filterParams.workPreference !== "all") ||
          (filterParams.exclusive && filterParams.exclusive !== "all") ||
          (filterParams.hiringWorkflow && filterParams.hiringWorkflow !== "all") ||
          (filterParams.dataChannel && filterParams.dataChannel !== "all") ||
          (filterParams.applied.from) ||
          (filterParams.applied.to) ||
          (filterParams.dateFilterRange && filterParams.dateFilterRange !== "30") ||
          (filterParams.jobOpeningId) ||
          (filterParams.positionKey) ||
          (filterParams.veteranStatus && filterParams.veteranStatus !== "all")
        )

        if (hasActiveFilters) {
          console.log("🔍 Frontend: Active filters detected - using filter API")
          isFilteredRequest = true
          
          const queryParams = new URLSearchParams()
          
          // Quick search text
          if (filterParams.searchText && filterParams.searchText.trim() !== "") {
            queryParams.append("searchText", filterParams.searchText.trim())
            console.log("🔍 Frontend: Adding searchText filter:", filterParams.searchText)
          }
          
          // Status filter
          if (filterParams.status && filterParams.status !== "all") {
            queryParams.append("status", filterParams.status)
            console.log("🔍 Frontend: Adding status filter:", filterParams.status)
          }
          
          // Location filter
          if (filterParams.location && filterParams.location !== "all") {
            queryParams.append("location", filterParams.location)
            console.log("🔍 Frontend: Adding location filter:", filterParams.location)
          }
          
          // Position filter
          if (filterParams.position && filterParams.position !== "all") {
            queryParams.append("position", filterParams.position)
            console.log("🔍 Frontend: Adding position filter:", filterParams.position)
          }
          
          // Application type filter
          if (filterParams.applicationType && filterParams.applicationType !== "all") {
            queryParams.append("applicationType", filterParams.applicationType)
            console.log("🔍 Frontend: Adding applicationType filter:", filterParams.applicationType)
          }
          
          // Work preference filter
          if (filterParams.workPreference && filterParams.workPreference !== "all") {
            queryParams.append("workPreference", filterParams.workPreference)
            console.log("🔍 Frontend: Adding workPreference filter:", filterParams.workPreference)
          }
          
          // Exclusive filter
          if (filterParams.exclusive && filterParams.exclusive !== "all") {
            queryParams.append("exclusive", filterParams.exclusive)
            console.log("🔍 Frontend: Adding exclusive filter:", filterParams.exclusive)
          }
          
          // Hiring workflow filter
          if (filterParams.hiringWorkflow && filterParams.hiringWorkflow !== "all") {
            queryParams.append("hiringWorkflow", filterParams.hiringWorkflow)
            console.log("🔍 Frontend: Adding hiringWorkflow filter:", filterParams.hiringWorkflow)
          }
          
          // Data channel filter
          if (filterParams.dataChannel && filterParams.dataChannel !== "all") {
            queryParams.append("dataChannel", filterParams.dataChannel)
            console.log("🔍 Frontend: Adding dataChannel filter:", filterParams.dataChannel)
          }
          
          // Date filters
          if (filterParams.applied.from) {
            queryParams.append("appliedFrom", filterParams.applied.from)
            console.log("🔍 Frontend: Adding appliedFrom filter:", filterParams.applied.from)
          }
          if (filterParams.applied.to) {
            queryParams.append("appliedTo", filterParams.applied.to)
            console.log("🔍 Frontend: Adding appliedTo filter:", filterParams.applied.to)
          }
          
          // Date filter range
          if (filterParams.dateFilterRange && filterParams.dateFilterRange !== "30") {
            queryParams.append("dateFilterRange", filterParams.dateFilterRange)
            console.log("🔍 Frontend: Adding dateFilterRange filter:", filterParams.dateFilterRange)
          }
          
          // Job Opening ID filter
          if (filterParams.jobOpeningId) {
            queryParams.append("jobOpeningId", filterParams.jobOpeningId)
            console.log("🔍 Frontend: Adding jobOpeningId filter:", filterParams.jobOpeningId)
          }
          
          // Position Key filter
          if (filterParams.positionKey) {
            queryParams.append("positionKey", filterParams.positionKey)
            console.log("🔍 Frontend: Adding positionKey filter:", filterParams.positionKey)
          }
          
          // Veteran Status filter
          if (filterParams.veteranStatus && filterParams.veteranStatus !== "all") {
            queryParams.append("veteranStatus", filterParams.veteranStatus)
            console.log("🔍 Frontend: Adding veteranStatus filter:", filterParams.veteranStatus)
          }

          const queryString = queryParams.toString()
          apiUrl = `/api/applications${queryString ? `?${queryString}` : ''}`
        } else {
          console.log("🔍 Frontend: No active filters - using initial load API")
          apiUrl = `/api/applications/initial`
        }
      } else {
        console.log("🔍 Frontend: Initial page load - using initial load API")
        apiUrl = `/api/applications/initial`
      }
      
      console.log("🔍 Frontend: Calling API with URL:", apiUrl)
      console.log("🔍 Frontend: Is filtered request:", isFilteredRequest)

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          // Prefer JSON – our API now returns JSON rows. Legacy HTML is fallback.
          "Accept": "application/json, text/html"
        }
      })

      console.log("🔍 Frontend: API response status:", response.status)

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please log in again.")
          return
        }
        throw new Error(`Failed to fetch applications: ${response.status}`)
      }

      const contentType = response.headers.get("content-type") || ""

      let applications: any[] = []

      if (contentType.includes("application/json")) {
        const json = await response.json()
        applications = Array.isArray(json) ? json : json.object?.APPLICATION_LIST || []
        console.log("🔍 Frontend: Received JSON applications:", applications.length)
      } else {
        const html = await response.text()
        console.log("🔍 Frontend: HTML response length:", html.length)
        applications = parseApplicationsFromHTML(html)
        console.log("🔍 Frontend: Parsed applications count:", applications.length)
      }

      setApplications(applications)
      setFilteredApplications(applications)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching applications:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch applications")
      setLoading(false)
    }
  }

  // Function to apply all filters (now only for search query, since server handles other filters)
  const applyFilters = () => {
    let result = [...applications]

    // Apply search query (across name, position, location) - client side for real-time search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query),
      )
    }

    setFilteredApplications(result)
  }

  // Handle filter changes - now triggers server-side filtering
  const handleFilterChange = async (newFilters: FilterState) => {
    setFilters(newFilters)
    setActiveFilterCount(countActiveFilters(newFilters))
    
    // Trigger server-side filtering by calling the API with filter parameters
    await loadApplications(newFilters)
  }

  // Clear all filters with new structure
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
      veteranStatus: "all",
      bidLocation: "all",
      currentLocations: [],
      hiringStep: "",
      availability: "",
      positionKey: "",
      jobOpeningId: "",
      dateFilterRange: "30"
    })
    setSearchQuery("")
    setActiveFilterCount(0)
    // Reload applications without filters
    loadApplications()
  }

  // Toggle selection of all applications
  const toggleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(filteredApplications.map((app) => app.id))
    }
  }

  // Toggle selection of a single application
  const toggleSelectApplication = (id: string) => {
    if (selectedApplications.includes(id)) {
      setSelectedApplications(selectedApplications.filter((appId) => appId !== id))
    } else {
      setSelectedApplications([...selectedApplications, id])
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const endIndex = startIndex + Number.parseInt(itemsPerPage)
  const displayedApplications = filteredApplications.slice(startIndex, endIndex)

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
        </div>
      </div>
    )
  }

  // Function to create a circular progress indicator
  const CircleProgress = ({ score, label }: { score: number | null; label: string }) => {
    const radius = 16
    const circumference = 2 * Math.PI * radius
    
    // Handle null/undefined scores by showing NA
    if (score === null || score === undefined) {
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
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">NA</span>
            </div>
          </div>
          <span className="text-xs text-gray-600 mt-1 text-center">{label}</span>
        </div>
      )
    }
    
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

  const renderSmartScoreTooltip = (application: any) => {
    // Use real smart score components from backend data
    const smartTenureScore = application.smartTenureScore
    const smartHireScore = application.smartHireScore
    const smartMatchScore = application.smartMatchScore
    const smartScreenScore = application.smartScreenScore

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
          <span className="text-[#EE5A37] font-bold text-lg">{application.score}%</span>
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
  const renderNameTooltip = (application: any) => {
    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 400
    const tooltipHeight = 400
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let left = mousePosition.x + 10
    let top = mousePosition.y + 10
    
    // Debug logging
    console.log('🔍 Name Tooltip Debug:', {
      mousePosition,
      viewportHeight,
      tooltipHeight,
      initialTop: top,
      wouldGoOffScreen: (top + tooltipHeight > viewportHeight),
      calculation: `${top} + ${tooltipHeight} = ${top + tooltipHeight} > ${viewportHeight}`
    })
    
    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10
      console.log('🔍 Name Tooltip: Positioned above cursor, new top:', top)
    }

    return (
      <div 
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] w-[400px] pointer-events-none"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
        {/* Name and Location */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">{formatApplicationName(application.name)}</h3>
          <p className="text-sm text-gray-600">
            {application.city !== 'NA' && application.state !== 'NA' 
              ? `${application.city} | ${application.state}` 
              : application.city !== 'NA' 
                ? application.city 
                : application.state !== 'NA' 
                  ? application.state 
                  : 'NA'}
          </p>
        </div>

        {/* Applied Date */}
        <div className="flex justify-between mb-3">
          <div></div>
          <div className="text-sm">
            <span className="font-medium">Applied:</span> {application.appliedFormatted}
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
            {application.tags && application.tags.length > 0 ? (
              application.tags.map((tag: string, index: number) => (
                <span key={index} className={`text-xs px-3 py-1 rounded-full ${getTagColor(tag)}`}>
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Application Details */}
        <div className="mb-3 border-t border-gray-200 pt-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Application Type:</span> {application.applicationType}
              </div>
            <div className="text-sm">
              <span className="font-medium">Exclusive:</span> {application.exclusive}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Status:</span> {application.status}
            </div>
            <div className="text-sm">
              <span className="font-medium">Esteem Status:</span> {application.esteemStatus}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">WOTC Status:</span> {application.wotcStatus}
              </div>
            <div className="text-sm">
              <span className="font-medium">Work Preference:</span> {application.workPreference}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm">
            <span className="font-medium">Start Date:</span> {application.startDate}
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
                {application.availabilitySchedule && application.availabilitySchedule.length > 0 ? (
                  application.availabilitySchedule.map((schedule: { day: string; time: string }, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-600">{schedule.day}</td>
                      <td className="px-4 py-2 text-gray-600">{schedule.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-gray-500 text-center">NA</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Render the Hiring Step tooltip
  const renderHiringStepTooltip = (application: any) => {
    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 350
    // Use 350px height for better visual appearance while maintaining smart positioning
    const tooltipHeight = 350
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let left = mousePosition.x + 10
    let top = mousePosition.y + 10
    
    // Debug logging
    console.log('🔍 Hiring Step Tooltip Debug:', {
      mousePosition,
      viewportHeight,
      tooltipHeight,
      initialTop: top,
      wouldGoOffScreen: (top + tooltipHeight > viewportHeight),
      calculation: `${top} + ${tooltipHeight} = ${top + tooltipHeight} > ${viewportHeight}`
    })
    
    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10
      console.log('🔍 Hiring Step Tooltip: Positioned above cursor, new top:', top)
    }

    return (
      <div 
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] w-[350px] pointer-events-none"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">Hiring Step</h3>
        </div>
        
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {application.hiringStep || 'No hiring step information available'}
        </div>
      </div>
    )
  }

  // Function to parse applications from HTML response
  const parseApplicationsFromHTML = (data: string): any[] => {
    console.log("🔍 Frontend: Starting HTML parsing...")
    console.log("🔍 Frontend: HTML length:", data.length)
    console.log("🔍 Frontend: HTML sample (first 1000 chars):", data.substring(0, 1000))
    
    // Check if this is a form view (initial load) or search results
    const isFormView = data.includes('seq=applicantGrid') || data.includes('applicantFilterAllApplicants')
    const isSearchResults = data.includes('seq=applicantGridResults') || data.includes('search results')
    
    console.log("🔍 Frontend: HTML type detection:", { isFormView, isSearchResults })
    
    // Parse the HTML response to extract application data
    const parser = new DOMParser()
    const doc = parser.parseFromString(data, 'text/html')
    
    // For form view (initial load), we might need to look for different table structures
    // or there might be no applications initially displayed
    if (isFormView) {
      console.log("🔍 Frontend: Detected form view - looking for initial data table...")
      
      // Look for various possible table structures in form view
      const possibleTables = [
        doc.querySelector('table#data-table'),
        doc.querySelector('table.data-table'),
        doc.querySelector('table[id*="grid"]'),
        doc.querySelector('table[class*="grid"]'),
        doc.querySelector('table[id*="applicant"]'),
        doc.querySelector('table[class*="applicant"]'),
        ...Array.from(doc.querySelectorAll('table')).filter(table => {
          const tableText = table.textContent || ''
          return tableText.includes('Name') && tableText.includes('Applied') && tableText.includes('Position')
        })
      ].filter(Boolean)
      
      console.log("🔍 Frontend: Found", possibleTables.length, "possible data tables in form view")
      
      if (possibleTables.length === 0) {
        console.log("🔍 Frontend: No data tables found in form view - this is normal for initial load")
        console.log("🔍 Frontend: Form view typically shows filter form, not data")
        return [] // Return empty array - this is expected for form view
      }
    }
    
    // Extract applications from the HTML table
    const tableRows = doc.querySelectorAll('table tr')
    console.log("🔍 Frontend: Found", tableRows.length, "table rows total")
    
    // Log details about tables found
    const tables = doc.querySelectorAll('table')
    console.log("🔍 Frontend: Found", tables.length, "tables total")
    tables.forEach((table, index) => {
      const rows = table.querySelectorAll('tr')
      const tableId = table.id || 'no-id'
      const tableClass = table.className || 'no-class'
      console.log(`🔍 Frontend: Table ${index + 1}: id="${tableId}", class="${tableClass}", rows=${rows.length}`)
      
      // Log first few cells of first data row to understand structure
      if (rows.length > 1) {
        const firstDataRow = rows[1] // Skip header row
        const cells = firstDataRow.querySelectorAll('td, th')
        console.log(`🔍 Frontend: Table ${index + 1} first data row has ${cells.length} cells:`)
        cells.forEach((cell, cellIndex) => {
          const cellText = cell.textContent?.trim().substring(0, 50) || ''
          console.log(`  Cell ${cellIndex + 1}: "${cellText}"`)
        })
      }
    })
    
    const parsedApplications: any[] = []
    
    tableRows.forEach((row, index) => {
      if (index === 0) return // Skip header row
      const cells = row.querySelectorAll('td')
      
      console.log(`🔍 Frontend: Row ${index} has ${cells.length} cells`)
      
      if (cells.length >= 6) { // Minimum columns for application data
        
        // Log cell contents for debugging
        console.log(`🔍 Frontend: Row ${index} cell contents:`)
        cells.forEach((cell, cellIndex) => {
          const cellText = cell.textContent?.trim().substring(0, 100) || ''
          console.log(`  Cell ${cellIndex}: "${cellText}"`)
        })
        
        // Extract detailed info from the Name column (index 2) which contains rich HTML
        const nameColumnHtml = cells[2]?.innerHTML || ''
        const nameColumnText = cells[2]?.textContent || ''
        
        // Extract just the name from the complex HTML structure
        const nameMatch = nameColumnText.match(/Name:\s*([^\n\r]+)/) || []
        const extractedName = nameMatch[1]?.trim() || nameColumnText.split('\n')[0]?.trim() || ''
        
        console.log(`🔍 Frontend: Row ${index} extracted name: "${extractedName}"`)
        
        // Skip rows without valid names
        if (!extractedName || extractedName.length < 2) {
          console.log(`🔍 Frontend: Skipping row ${index} - no valid name found`)
          return
        }
        
        // Extract additional details from the name column HTML for tooltips
        const getDetailValue = (label: string) => {
          const regex = new RegExp(`${label}:\\s*([^\\n\\r]+)`, 'i')
          const match = nameColumnText.match(regex)
          return match ? match[1].trim() : 'NA'
        }
        
        const email = getDetailValue('Email')
        const phone = getDetailValue('Phone')
        const city = getDetailValue('City')
        const state = getDetailValue('State')
        const applicationType = getDetailValue('Application Type')
        const exclusive = getDetailValue('Exclusive\\?')
        const wotcStatus = getDetailValue('WOTC Status')
        const esteemStatus = getDetailValue('Esteem Status')
        const workPreference = getDetailValue('Work Preference')
        const startDate = getDetailValue('Start Date')
        const availability = getDetailValue('Availability')
        
        // Parse score - check both Score and % Score fields
        const scoreText = getDetailValue('% Score') || getDetailValue('Score') || '0'
        const scoreValue = scoreText === '--' || scoreText === 'NA' ? 0 : parseInt(scoreText.replace(/[^\d]/g, '')) || 0
        
        // Extract smart score components if available from backend
        const smartTenureScore = getDetailValue('SmartTenure Score')
        const smartHireScore = getDetailValue('SmartHire Score')
        const smartMatchScore = getDetailValue('SmartMatch Score')
        const smartScreenScore = getDetailValue('SmartScreen Score')
        
        // Parse tags if available
        const tagsText = getDetailValue('Tags')
        const tags = tagsText !== 'NA' ? tagsText.split(',').map(tag => tag.trim()).filter(tag => tag) : []
        
        // Parse availability schedule if available
        const availabilityScheduleText = getDetailValue('Availability Schedule')
        let availabilitySchedule: { day: string; time: string }[] = []
        if (availabilityScheduleText !== 'NA') {
          // Try to parse schedule format if it exists
          // For now, if no specific format is found, show NA
          availabilitySchedule = []
        }
        
        // Parse hiring step - format multiple workflow items properly
        const hiringStepRaw = cells[9]?.textContent?.trim() || ''
        const formatHiringStep = (text: string) => {
          if (!text || text === '&nbsp;' || text === '-') return 'NA'
          
          // The hiring step contains multiple workflow items like:
          // "Contact\n\t\t\t\t(\n\t\t\t\tSend to Pool\n\t\t\t\t)\t\t\t\t\n\t\t\t\t\n\n\t\t\t\n\n\t\t\t\tDrug Screening..."
          
          // Split by double newlines to separate workflow items
          const sections = text.split(/\n\s*\n\s*/).filter(section => section.trim())
          
          const workflows: string[] = []
          
          for (const section of sections) {
            // Clean up excessive whitespace and tabs
            const cleaned = section.replace(/\t+/g, ' ').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
            
            // Look for pattern: "WorkflowName ( Status )" 
            const match = cleaned.match(/^([^(]+?)\s*\(\s*([^)]+?)\s*\)/)
            if (match) {
              const workflowName = match[1].trim()
              const status = match[2].trim()
              workflows.push(`${workflowName} ( ${status} )`)
            } else if (cleaned && cleaned.length > 2) {
              // If no parentheses found but we have content, add it as-is
              workflows.push(cleaned)
            }
          }
          
          return workflows.length > 0 ? workflows.join('\n') : 'NA'
        }
        
        const formattedHiringStep = formatHiringStep(hiringStepRaw)
        
        // Extract real applicant ID from checkbox in first cell
        const checkboxInput = cells[0]?.querySelector('input[type="checkbox"]') as HTMLInputElement
        const applicantId = checkboxInput?.id || checkboxInput?.value || `row_${index}`
        
        const application = {
          id: applicantId, // Use real applicant ID from checkbox
          // Map to correct backend columns
          name: extractedName,
          applied: cells[3]?.textContent?.trim() || 'NA', // Applied column
          position: cells[4]?.textContent?.trim() || 'NA', // Position column  
          location: cells[5]?.textContent?.trim() || 'NA', // Location column
          status: cells[6]?.textContent?.trim() || 'NA', // Status column
          score: scoreValue, // Parsed from Name column details
          availability: availability, // From Name column if available
          hiringStep: formattedHiringStep, // Properly formatted hiring step
          
          // Additional fields for tooltips (extracted from Name column)
          email: email,
          phone: phone,
          tags: tags, // Real tags from backend or empty array
          applicationType: applicationType,
          exclusive: exclusive,
          wotcStatus: wotcStatus,
          esteemStatus: esteemStatus,
          startDate: startDate, // Real start date from backend or NA
          workPreference: workPreference, // Real work preference from backend or NA
          city: city,
          state: state,
          availabilitySchedule: availabilitySchedule, // Real schedule from backend or empty array
          appliedFormatted: cells[3]?.textContent?.trim() || 'NA',
          appliedDate: cells[3]?.textContent?.trim() ? new Date(cells[3]?.textContent?.trim()) : null,
          
          // Smart score components from backend
          smartTenureScore: smartTenureScore !== 'NA' ? parseInt(smartTenureScore.replace(/[^\d]/g, '')) || 0 : null,
          smartHireScore: smartHireScore !== 'NA' ? parseInt(smartHireScore.replace(/[^\d]/g, '')) || 0 : null,
          smartMatchScore: smartMatchScore !== 'NA' ? parseInt(smartMatchScore.replace(/[^\d]/g, '')) || 0 : null,
          smartScreenScore: smartScreenScore !== 'NA' ? parseInt(smartScreenScore.replace(/[^\d]/g, '')) || 0 : null,
        }
        
        console.log(`🔍 Frontend: Row ${index} parsed application:`, application)
        parsedApplications.push(application)
      } else {
        console.log(`🔍 Frontend: Row ${index} skipped - only ${cells.length} cells (need at least 6)`)
      }
    })
    
    console.log('🔍 Frontend: Parsed applications count:', parsedApplications.length)
    console.log('🔍 Frontend: First few applications:', parsedApplications.slice(0, 3))
    return parsedApplications
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="text-gray-600">Loading applications...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <h3 className="font-semibold">Error Loading Applications</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#EE5A37]">All Application</h1>
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
              <table className="min-w-full divide-y divide-gray-200 table-fixed" onMouseMove={handleMouseMove}>
                <thead>
                  <tr className="bg-[#EE5A37]/5 border-y border-gray-200">
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[40px]">
                      <input
                        type="checkbox"
                        checked={
                          selectedApplications.length === filteredApplications.length &&
                          filteredApplications.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[100px]">
                      Applied
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
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[170px]">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                      Status
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
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[100px]">
                      SmartScore
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[120px]">
                      Availability
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap min-w-[190px]">
                      Hiring step
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedApplications.length > 0 ? (
                    displayedApplications.map((application) => (
                      <tr key={application.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-normal whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedApplications.includes(application.id)}
                            onChange={() => toggleSelectApplication(application.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap relative">
                          <div
                            className="relative inline-block cursor-pointer"
                            onMouseEnter={(e) => {
                              setHoveredNameId(application.id)
                              setMousePosition({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseMove={(e) => {
                              setMousePosition({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseLeave={() => setHoveredNameId(null)}
                          >
                            <Link 
                              href={`/applicant?id=${application.id}`} 
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                              {formatApplicationName(application.name)}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap">{application.applied}</td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap">{application.position}</td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap">{application.location}</td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap">
                          <span className={getStatusClass(application.status)}>{application.status}</span>
                        </td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap relative">
                          <div
                            className="relative inline-block"
                            onMouseEnter={(e) => {
                              setHoveredScoreId(application.id)
                              setMousePosition({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseMove={(e) => {
                              setMousePosition({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseLeave={() => setHoveredScoreId(null)}
                          >
                            <span
                              className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${getScoreClass(
                                application.score,
                              )}`}
                            >
                              {application.score}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap">{application.availability}</td>
                        <td className="px-4 py-3 font-normal whitespace-nowrap relative">
                          <div
                            className="relative inline-block cursor-pointer"
                            onMouseEnter={(e) => {
                              setHoveredHiringStepId(application.id)
                              setMousePosition({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseMove={(e) => {
                              setMousePosition({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseLeave={() => setHoveredHiringStepId(null)}
                          >
                            {truncateHiringStep(application.hiringStep)}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
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
      
      {/* Render tooltips outside of table container */}
      {hoveredScoreId && (
        renderSmartScoreTooltip(displayedApplications.find(app => app.id === hoveredScoreId)!)
      )}
      {hoveredNameId && (
        renderNameTooltip(displayedApplications.find(app => app.id === hoveredNameId)!)
      )}
      {hoveredHiringStepId && (
        renderHiringStepTooltip(displayedApplications.find(app => app.id === hoveredHiringStepId)!)
      )}
    </div>
  )
}
