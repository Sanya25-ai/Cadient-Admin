"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { MoreHorizontal, UserCheck, X, ChevronUp, Search, ChevronDown, ChevronLeft, ChevronRight, Filter, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import type { Prospect } from "@/lib/types"

// Smart Tooltip Hook and Component
interface SmartTooltipState {
  isVisible: boolean
  mousePosition: { x: number; y: number }
  setIsVisible: (visible: boolean) => void
  calculatePosition: (width: number, height: number) => { left: number; top: number }
}

const useSmartTooltip = (): SmartTooltipState => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const calculatePosition = (width: number, height: number) => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const padding = 10 // Padding from screen edges

    let left = mousePosition.x + padding
    let top = mousePosition.y + padding

    // Check if tooltip would go off the right edge
    if (left + width > viewportWidth) {
      left = mousePosition.x - width - padding
    }

    // Check if tooltip would go off the bottom edge  
    if (top + height > viewportHeight) {
      top = mousePosition.y - height - padding
    }

    // Ensure tooltip doesn't go off the left edge
    if (left < padding) {
      left = padding
    }

    // Ensure tooltip doesn't go off the top edge
    if (top < padding) {
      top = padding
    }

    return { left, top }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (isVisible) {
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isVisible])

  return {
    isVisible,
    mousePosition,
    setIsVisible,
    calculatePosition
  }
}

interface SmartTooltipProps {
  isVisible: boolean
  children: React.ReactNode
  width?: number
  height?: number
  mousePosition: { x: number; y: number }
  calculatePosition: (width: number, height: number) => { left: number; top: number }
}

const SmartTooltip: React.FC<SmartTooltipProps> = ({
  isVisible,
  children,
  width = 320,
  height = 250,
  mousePosition,
  calculatePosition
}) => {
  if (!isVisible) return null

  const position = calculatePosition(width, height)

  return (
    <div
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 pointer-events-none"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${width}px`,
        zIndex: 9999,
        maxHeight: `${height}px`
      }}
    >
      {children}
    </div>
  )
}

interface ThemeConfig {
  titleColor: string
  buttonBg: string
  buttonHover: string
  controlsBg: string
  controlsBorder: string
  dropdownBorder: string
  dropdownText: string
}

interface ActionItem {
  label: string
  className?: string
}

interface CommonProspectsTableProps {
  prospects: Prospect[]
  title: string
  theme?: ThemeConfig
  actions?: ActionItem[]
  emptyMessage?: string
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

// Helper functions to get prospect data
const getProspectName = (prospect: Prospect): string => prospect.name
const getProspectId = (prospect: Prospect): string => prospect.id
const getProspectLastContact = (prospect: Prospect): string => prospect.lastContact || ''
const getProspectPotentialPosition = (prospect: Prospect): string => prospect.potentialPosition || ''
const getProspectLocation = (prospect: Prospect): string => prospect.location || ''
const getProspectMatchScore = (prospect: Prospect): number => prospect.matchScore || 0
const getProspectSource = (prospect: Prospect): string => prospect.source || ''
const getProspectStatus = (prospect: Prospect): string => prospect.status || ''
const getProspectRecruiter = (prospect: Prospect): string => prospect.recruiter || ''

// Default theme (orange)
const defaultTheme: ThemeConfig = {
  titleColor: "text-[#EE5A37]",
  buttonBg: "bg-[#EE5A37]",
  buttonHover: "hover:bg-[#EE5A37]/90",
  controlsBg: "bg-[#EE5A37]/5",
  controlsBorder: "border-[#EE5A37]",
  dropdownBorder: "border-[#EE5A37]",
  dropdownText: "text-[#EE5A37]"
}

// Predefined themes
export const themes = {
  orange: defaultTheme,
  green: {
    titleColor: "text-green-600",
    buttonBg: "bg-green-600",
    buttonHover: "hover:bg-green-600/90",
    controlsBg: "bg-green-50",
    controlsBorder: "border-green-600",
    dropdownBorder: "border-green-600",
    dropdownText: "text-green-600"
  },
  red: {
    titleColor: "text-red-600",
    buttonBg: "bg-red-600",
    buttonHover: "hover:bg-red-600/90",
    controlsBg: "bg-red-50",
    controlsBorder: "border-red-600",
    dropdownBorder: "border-red-600",
    dropdownText: "text-red-600"
  }
}

// Default actions for prospects
const defaultActions: ActionItem[] = [
  { label: "Bookmark" },
  { label: "Send a Message" },
  { label: "Add Tag" },
  { label: "Change Status" },
  { label: "Assign Recruiter" },
  { label: "Schedule Contact" },
  { label: "Export Selected" },
  { label: "Remove from List" },
]

export default function CommonProspectsTable({ 
  prospects, 
  title, 
  theme = defaultTheme, 
  actions = defaultActions,
  emptyMessage = "No prospects found"
}: CommonProspectsTableProps) {
  const [selectedProspects, setSelectedProspects] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewProspect, setViewProspect] = useState<Prospect | null>(null)
  const [hoveredNameId, setHoveredNameId] = useState<string | null>(null)
  const [hoveredScoreId, setHoveredScoreId] = useState<string | null>(null)

  // Smart tooltip hooks
  const nameTooltip = useSmartTooltip()
  const scoreTooltip = useSmartTooltip()

  const filterButtonRef = useRef<HTMLButtonElement>(null)

  console.log(prospects)

  // Filter prospects based on search query
  const filteredProspects = prospects.filter((prospect) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      getProspectName(prospect).toLowerCase().includes(searchLower) ||
      getProspectPotentialPosition(prospect).toLowerCase().includes(searchLower) ||
      getProspectLocation(prospect).toLowerCase().includes(searchLower) ||
      getProspectSource(prospect).toLowerCase().includes(searchLower) ||
      getProspectStatus(prospect).toLowerCase().includes(searchLower)
    )
  })

  // Sort prospects
  const sortedProspects = [...filteredProspects].sort((a, b) => {
    if (!sortConfig) return 0

    const aValue = (() => {
      switch (sortConfig.key) {
        case "name": return getProspectName(a)
        case "lastContact": return getProspectLastContact(a)
        case "matchScore": return getProspectMatchScore(a)
        case "status": return getProspectStatus(a)
        case "potentialPosition": return getProspectPotentialPosition(a)
        case "location": return getProspectLocation(a)
        case "source": return getProspectSource(a)
        default: return ""
      }
    })()

    const bValue = (() => {
      switch (sortConfig.key) {
        case "name": return getProspectName(b)
        case "lastContact": return getProspectLastContact(b)
        case "matchScore": return getProspectMatchScore(b)
        case "status": return getProspectStatus(b)
        case "potentialPosition": return getProspectPotentialPosition(b)
        case "location": return getProspectLocation(b)
        case "source": return getProspectSource(b)
        default: return ""
      }
    })()

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    const aStr = String(aValue).toLowerCase()
    const bStr = String(bValue).toLowerCase()
    
    if (sortConfig.direction === "asc") {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0
    }
  })

  const renderNameTooltip = (prospect: Prospect) => {
    return (
      <SmartTooltip
        isVisible={nameTooltip.isVisible}
        width={320}
        height={280}
        mousePosition={nameTooltip.mousePosition}
        calculatePosition={nameTooltip.calculatePosition}
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
            {getProspectName(prospect)
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{getProspectName(prospect)}</h3>
            <p className="text-sm text-gray-500">{getProspectPotentialPosition(prospect)}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className="font-medium">{getProspectStatus(prospect)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Source:</span>
            <span className="font-medium">{getProspectSource(prospect)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium">{getProspectLocation(prospect)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Contact:</span>
            <span className="font-medium">{getProspectLastContact(prospect) || 'Never'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Match Score:</span>
            <span className="font-medium">{getProspectMatchScore(prospect)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Recruiter:</span>
            <span className="font-medium">{getProspectRecruiter(prospect) || 'Unassigned'}</span>
          </div>
        </div>
      </SmartTooltip>
    )
  }

  const renderMatchScoreTooltip = (score: number) => {
    return (
      <SmartTooltip
        isVisible={scoreTooltip.isVisible}
        width={256}
        height={180}
        mousePosition={scoreTooltip.mousePosition}
        calculatePosition={scoreTooltip.calculatePosition}
      >
        <h4 className="font-semibold text-gray-900 mb-2">Match Score Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Overall Match:</span>
            <span className="font-medium">{score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreClass(score).split(' ')[0]}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {score >= 80 ? "Excellent match for the position" :
             score >= 60 ? "Good match with some potential" :
             score >= 40 ? "Fair match, may need development" :
             "Low match, requires significant development"}
          </p>
        </div>
      </SmartTooltip>
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProspects(sortedProspects.map(p => getProspectId(p)))
    } else {
      setSelectedProspects([])
    }
  }

  const handleSelectProspect = (prospectId: string, checked: boolean) => {
    if (checked) {
      setSelectedProspects(prev => [...prev, prospectId])
    } else {
      setSelectedProspects(prev => prev.filter(id => id !== prospectId))
    }
  }

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === "asc" ? "desc" : "asc" }
      }
      return { key, direction: "asc" }
    })
  }

  const viewProspectDetails = (prospect: Prospect) => {
    setViewProspect(prospect)
    setIsViewDialogOpen(true)
  }

  // Actions dropdown component
  const ActionsDropdown = () => {
    if (!actionsOpen) return null

    return (
      <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
        <div className="py-1">
          {actions.map((action, index) => (
            <button 
              key={index}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors table-text ${action.className || 'text-gray-700'}`}
              style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4' }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Calculate pagination
  const totalPages = Math.ceil(sortedProspects.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const endIndex = startIndex + Number.parseInt(itemsPerPage)
  const displayedProspects = sortedProspects.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col min-h-full">
      <style jsx global>{`
        input, select, textarea, button, span, div, p {
          font-family: 'Open Sans', sans-serif !important;
        }
        
        .table-input {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        
        .table-button {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        
        .table-text {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
      `}</style>
      {/* <div className="flex justify-between items-center">
        <h1 className="font-semibold" style={{ color: '#EE5A37', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '24px', lineHeight: '1.4', letterSpacing: '0%' }}>{title}</h1>
      </div> */}

      <div>
        <div className="bg-white rounded-md shadow-sm border border-gray-200 mb-6">
          <div className={`p-4 ${theme.controlsBg} border-b border-gray-200 flex justify-between items-center mb-3`}>
            <div className="text-gray-700" style={{ fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}>
              Total Records: <span className="font-medium text-[#F7941D]">{sortedProspects.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className={`flex items-center justify-center h-10 px-4 py-2 bg-white ${theme.dropdownText} border ${theme.dropdownBorder} rounded-md table-button`}
                  onClick={() => setActionsOpen(!actionsOpen)}
                  style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px' }}
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
                  className="h-10 pl-10 pr-4 w-64 border-gray-300 table-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px' }}
                />
              </div>

              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger 
                  className="h-10 w-[180px] border-gray-300 table-button"
                  style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px' }}
                >
                  <SelectValue placeholder="25 Records per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10" className="table-text">10 Records per page</SelectItem>
                  <SelectItem value="25" className="table-text">25 Records per page</SelectItem>
                  <SelectItem value="50" className="table-text">50 Records per page</SelectItem>
                  <SelectItem value="100" className="table-text">100 Records per page</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-gray-300 table-button"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="table-text" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px' }}>
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{Math.max(1, totalPages)}</span>
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-gray-300 table-button"
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
                  <TableHeader className="sticky top-0 bg-background z-10" style={{ background: '#EE5A370D' }}>
                    <TableRow>
                      <TableHead className="w-12 px-4 h-12" style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}>
                        <input
                          type="checkbox"
                          checked={selectedProspects.length === sortedProspects.length && sortedProspects.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300 w-4 h-4"
                        />
                      </TableHead>
                      <TableHead className="cursor-pointer px-6 w-48 h-12" onClick={() => handleSort("name")} style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}>
                        <div className="flex items-center w-48">
                          Name
                          {sortConfig?.key === "name" && (
                            <ChevronUp
                              className={cn("ml-2 h-4 w-4", sortConfig.direction === "desc" && "transform rotate-180")}
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer px-6 h-12" onClick={() => handleSort("lastContact")} style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}>
                        <div className="flex items-center">
                          Applied
                          {sortConfig?.key === "lastContact" && (
                            <ChevronUp
                              className={cn("ml-2 h-4 w-4", sortConfig.direction === "desc" && "transform rotate-180")}
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer px-6 h-12" onClick={() => handleSort("status")} style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}>
                        <div className="flex items-center">
                          Status
                          {sortConfig?.key === "status" && (
                            <ChevronUp
                              className={cn("ml-2 h-4 w-4", sortConfig.direction === "desc" && "transform rotate-180")}
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="px-6 h-12" style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}><div className="w-40">Job Category</div></TableHead>
                      <TableHead className="px-6 w-40 h-12" style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}><div className="w-40">Location</div></TableHead>
                      <TableHead className="px-6 w-36 h-12" style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}><div className="w-40">Source</div></TableHead>
                      <TableHead className="w-20 px-4 h-12" style={{ color: '#000000', fontFamily: 'Open Sans', fontWeight: 600, fontSize: '16px', lineHeight: '1.4', letterSpacing: '0%' }}></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProspects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-gray-400 text-lg">📋</div>
                            <p className="text-gray-500 font-medium">{emptyMessage}</p>
                            <p className="text-gray-400 text-sm">Try adjusting your search criteria.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedProspects.map((prospect) => (
                        <TableRow key={getProspectId(prospect)} className="h-14">
                          <TableCell className="px-4 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>
                            <input
                              type="checkbox"
                              checked={selectedProspects.includes(getProspectId(prospect))}
                              onChange={(e) => handleSelectProspect(getProspectId(prospect), e.target.checked)}
                              className="rounded border-gray-300 w-4 h-4"
                            />
                          </TableCell>
                          <TableCell className="px-6 relative text-black h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>
                            <div className="flex items-center gap-2">
                              {/* Icon indicators */}
                              <div className="flex items-center">
                                {getProspectStatus(prospect) === "Pre-Screened" && (
                                  <div className="w-3 h-3 bg-orange-500 rounded-sm mr-1"></div>
                                )}
                                {/* Bookmark indicator */}
                                <span className="text-orange-500">📋</span>
                              </div>
                              <div
                                className="relative inline-block cursor-pointer"
                                onMouseEnter={() => {
                                  setHoveredNameId(getProspectId(prospect))
                                  nameTooltip.setIsVisible(true)
                                }}
                                onMouseLeave={() => {
                                  setHoveredNameId(null)
                                  nameTooltip.setIsVisible(false)
                                }}
                              >
                                <Link href={`/applicant?id=${getProspectId(prospect)}`} className="font-medium text-black hover:underline hover:text-[#EE5A37]" style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>
                                  {getProspectName(prospect)}
                                </Link>
                              </div>
                              {/* Priority indicator */}
                              {getProspectMatchScore(prospect) && getProspectMatchScore(prospect) > 90 && (
                                <span className="text-red-500 font-bold">🔴</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-black px-6 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>{getProspectLastContact(prospect) || "--"}</TableCell>
                          <TableCell className="text-black px-6 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>{getProspectStatus(prospect) || "Pre-Screened"}</TableCell>
                          <TableCell className="text-black px-6 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>{getProspectPotentialPosition(prospect) || "--"}</TableCell>
                          <TableCell className="text-black px-6 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>{getProspectLocation(prospect) || "--"}</TableCell>
                          <TableCell className="text-black px-6 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>{getProspectSource(prospect) || "Text Apply"}</TableCell>
                          <TableCell className="px-4 h-14" style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '14px', lineHeight: '1.4', letterSpacing: '0%' }}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {actions.map((action, index) => (
                                  <DropdownMenuItem key={index} className={action.className}>
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
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

      {/* View Prospect Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prospect Details</DialogTitle>
            <DialogDescription>Viewing prospect details for {viewProspect ? getProspectName(viewProspect) : ''}</DialogDescription>
          </DialogHeader>

          {viewProspect && (
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contact">Contact History</TabsTrigger>
                <TabsTrigger value="notes">Notes & Tags</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium text-xl">
                    {getProspectName(viewProspect)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{getProspectName(viewProspect)}</h2>
                    <p className="text-gray-500">{getProspectPotentialPosition(viewProspect)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Prospect Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            {getProspectStatus(viewProspect)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Source:</span>
                          <span>{getProspectSource(viewProspect)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{getProspectLocation(viewProspect)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Contact:</span>
                          <span>{getProspectLastContact(viewProspect) || 'Never'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Match Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Overall Match:</span>
                          <div
                            className="relative inline-block"
                            onMouseEnter={() => {
                              setHoveredScoreId(getProspectId(viewProspect))
                              scoreTooltip.setIsVisible(true)
                            }}
                            onMouseLeave={() => {
                              setHoveredScoreId(null)
                              scoreTooltip.setIsVisible(false)
                            }}
                          >
                            <span className={`inline-flex items-center justify-center rounded text-xs font-medium text-white cursor-pointer ${
                              getProspectMatchScore(viewProspect) === 0 ? 'bg-red-600' :
                              getProspectMatchScore(viewProspect) >= 80 ? 'bg-green-500' : 
                              getProspectMatchScore(viewProspect) >= 60 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`} style={{ fontFamily: 'Open Sans', fontWeight: 500, fontSize: '12px', lineHeight: '1.2', letterSpacing: '0%', width: '36px', height: '36px', borderRadius: '50%' }}>
                              {getProspectMatchScore(viewProspect)}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getScoreClass(getProspectMatchScore(viewProspect)).split(' ')[0]}`}
                            style={{ width: `${getProspectMatchScore(viewProspect)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Recruiter:</span>
                          <span>{getProspectRecruiter(viewProspect) || 'Unassigned'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact History</CardTitle>
                    <CardDescription>Recent interactions with this prospect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">No contact history available.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes & Tags</CardTitle>
                    <CardDescription>Additional information about this prospect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">No notes or tags available.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Smart Tooltips */}
      {hoveredNameId && (
        renderNameTooltip(sortedProspects.find(p => getProspectId(p) === hoveredNameId)!)
      )}
      
      {hoveredScoreId && (
        renderMatchScoreTooltip(getProspectMatchScore(sortedProspects.find(p => getProspectId(p) === hoveredScoreId) || viewProspect!))
      )}
    </div>
  )
}
