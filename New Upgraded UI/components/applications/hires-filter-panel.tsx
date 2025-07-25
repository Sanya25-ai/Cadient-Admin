"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import type { HiresFilterState } from "./hires-client"

interface HiresFilterPanelProps {
  filters?: HiresFilterState
  onFilterChange?: (filters: HiresFilterState) => void
  onClose?: () => void
  onApplyFilters?: (filters: {
    hireDateRange?: string
    applicationFromDate?: Date
    applicationToDate?: Date
    workPreference?: string
    location?: string
    position?: string
    applicationType?: string
    dataChannel?: string
    exclusive?: string
    hiringWorkflow?: string
    status?: string
    wotcStatus?: string
    veteranStatus?: string
    tag?: string
  }) => void
}

export default function HiresFilterPanel({ 
  filters, 
  onFilterChange, 
  onClose, 
  onApplyFilters 
}: HiresFilterPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  
  // Basic fields
  const [applicationDateRange, setApplicationDateRange] = useState("Last 30 Days")
  const [locationBasic, setLocationBasic] = useState("Headquarters")
  const [exclusiveBasic, setExclusiveBasic] = useState("All")
  
  // Advanced fields
  const [applicationFromDate, setApplicationFromDate] = useState<Date | undefined>(new Date("2010-04-23"))
  const [applicationToDate, setApplicationToDate] = useState<Date | undefined>(new Date("2025-05-23"))
  const [workPreference, setWorkPreference] = useState("All")
  const [location, setLocation] = useState("All")
  const [position, setPosition] = useState("All")
  const [applicationType, setApplicationType] = useState("All")
  const [dataChannel, setDataChannel] = useState("All")
  const [exclusive, setExclusive] = useState("All")
  const [hiringWorkflow, setHiringWorkflow] = useState("All")
  const [status, setStatus] = useState("All")
  const [veteranStatus, setVeteranStatus] = useState("All")
  const [tag, setTag] = useState("")

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const applicationDateRanges = [
    "Last 30 Days",
    "Last 60 Days", 
    "Last 90 Days",
    "Last 6 Months",
    "Last Year",
    "All Time"
  ]

  const workPreferences = [
    "All",
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Flexible"
  ]

  const locations = [
    "All",
    "Headquarters",
    "United States", 
    "Portland",
    "Remote",
    "Chicago",
    "New York",
    "San Francisco",
    "Los Angeles"
  ]

  const positions = [
    "All",
    "Program Manager",
    "Zomato Delivery",
    "Senior Technology Manager",
    "Analyst",
    "MERN Stack Developer",
    "SQL developer",
    "Product Manager",
    "Software Engineer",
    "Marketing Specialist",
    "Sales Representative",
    "Customer Service Rep"
  ]

  const applicationTypes = [
    "All",
    "External",
    "Internal",
    "Referral",
    "Direct",
    "Career Site",
    "Job Board"
  ]

  const dataChannels = [
    "All",
    "Web Site",
    "Mobile App",
    "Kiosk",
    "Phone",
    "Email",
    "Walk-in"
  ]

  const exclusiveOptions = [
    "All",
    "Yes",
    "No"
  ]

  const hiringWorkflows = [
    "All",
    "Standard Workflow",
    "Fast Track",
    "Executive Hiring",
    "Seasonal Hiring",
    "Bulk Hiring"
  ]

  const statusOptions = [
    "All",
    "Active",
    "Hired",
    "Inactive",
    "On Hold"
  ]

  const veteranStatusOptions = [
    "All",
    "Veteran",
    "Non-Veteran",
    "Disabled Veteran",
    "Protected Veteran"
  ]

  const applyFilters = () => {
    const legacyFilters = {
      hireDateRange: showAdvanced ? undefined : applicationDateRange,
      applicationFromDate: showAdvanced ? applicationFromDate : undefined,
      applicationToDate: showAdvanced ? applicationToDate : undefined,
      workPreference: showAdvanced ? workPreference : undefined,
      location: showAdvanced ? location : locationBasic,
      position: showAdvanced ? position : undefined,
      applicationType: showAdvanced ? applicationType : undefined,
      dataChannel: showAdvanced ? dataChannel : undefined,
      exclusive: showAdvanced ? exclusive : exclusiveBasic,
      hiringWorkflow: showAdvanced ? hiringWorkflow : undefined,
      status: showAdvanced ? status : undefined,
      veteranStatus: showAdvanced ? veteranStatus : undefined,
      tag: showAdvanced ? tag : undefined
    }
    
    onApplyFilters?.(legacyFilters)
  }

  return (
    <div 
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-[500px] bg-white rounded-md shadow-lg border border-gray-200 z-20"
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#EE5A37] mb-6">Filter</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Hired Date</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">From</p>
                <Input
                  type="date"
                  value={filters?.hired.from || ""}
                  onChange={(e) => onFilterChange?.({
                    ...filters!,
                    hired: { ...filters!.hired, from: e.target.value }
                  })}
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">To</p>
                <Input
                  type="date"
                  value={filters?.hired.to || ""}
                  onChange={(e) => onFilterChange?.({
                    ...filters!,
                    hired: { ...filters!.hired, to: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Position</h3>
              <Input
                placeholder="Enter position..."
                value={filters?.position || ""}
                onChange={(e) => onFilterChange?.({
                  ...filters!,
                  position: e.target.value
                })}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Location</h3>
              <Input
                placeholder="Enter location..."
                value={filters?.location || ""}
                onChange={(e) => onFilterChange?.({
                  ...filters!,
                  location: e.target.value
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">SmartScore (Min)</h3>
              <Input
                type="number"
                placeholder="Enter minimum score..."
                value={filters?.smartScore || ""}
                onChange={(e) => onFilterChange?.({
                  ...filters!,
                  smartScore: e.target.value
                })}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Name</h3>
              <Input
                placeholder="Enter name..."
                value={filters?.name || ""}
                onChange={(e) => onFilterChange?.({
                  ...filters!,
                  name: e.target.value
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">E-Verify Status</h3>
              <Select 
                value={filters?.eVerifyStatus || ""} 
                onValueChange={(value) => onFilterChange?.({
                  ...filters!,
                  eVerifyStatus: value
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Not Screened">Not Screened</SelectItem>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">WOTC Status</h3>
              <Select 
                value={filters?.wotcStatus || ""} 
                onValueChange={(value) => onFilterChange?.({
                  ...filters!,
                  wotcStatus: value
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Not Screened">Not Screened</SelectItem>
                  <SelectItem value="Eligible">Eligible</SelectItem>
                  <SelectItem value="Not Eligible">Not Eligible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="former"
                checked={filters?.former || false}
                onChange={(e) => onFilterChange?.({
                  ...filters!,
                  former: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <label htmlFor="former" className="text-sm font-medium">Former Employee</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rehire"
                checked={filters?.rehire || false}
                onChange={(e) => onFilterChange?.({
                  ...filters!,
                  rehire: e.target.checked
                })}
                className="rounded border-gray-300"
              />
              <label htmlFor="rehire" className="text-sm font-medium">Rehire Eligible</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-[#EE5A37] hover:bg-[#EE5A37]/90"
            onClick={() => {
              applyFilters()
              onClose?.()
            }}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
