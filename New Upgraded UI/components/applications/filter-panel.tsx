"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import { getFilterOptions, type FilterOptions, type FilterOption } from "@/lib/filter-cache"

export default function FilterPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize form values from URL parameters or defaults
  const [fromDate, setFromDate] = useState<Date | undefined>(
    searchParams?.get('fromDate') ? new Date(searchParams.get('fromDate')!) : undefined
  )
  const [toDate, setToDate] = useState<Date | undefined>(
    searchParams?.get('toDate') ? new Date(searchParams.get('toDate')!) : undefined
  )
  const [status, setStatus] = useState(searchParams?.get('status') || "All")
  const [location, setLocation] = useState(searchParams?.get('location') || "All")
  const [position, setPosition] = useState(searchParams?.get('position') || "All")
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Advanced fields
  const [workPref, setWorkPref] = useState("All")
  const [appType, setAppType] = useState("All")
  const [exclusive, setExclusive] = useState("All")
  const [hiringWorkflow, setHiringWorkflow] = useState("All")
  const [dataChannel, setDataChannel] = useState("All")
  const [veteranStatus, setVeteranStatus] = useState("All")
  
  // Dynamic filter options from cache
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load filter options from cache on component mount
  useEffect(() => {
    async function loadOptions() {
      try {
        setLoading(true)
        setError(null)
        
        console.log("🔍 FilterPanel: Loading filter options from cache...")
        const options = await getFilterOptions()
        setFilterOptions(options)
        console.log("🔍 FilterPanel: Filter options loaded successfully")
      } catch (error) {
        console.error("🔍 FilterPanel: Failed to load filter options:", error)
        setError(error instanceof Error ? error.message : "Failed to load filter options")
        
        // Set empty options on error
        setFilterOptions({
          positions: [],
          locations: [],
          statuses: [],
          workPreferences: [],
          applicantTypes: [],
          exclusiveOptions: [],
          veteranStatuses: [],
          workflows: [],
          dataChannels: [],
          bookmarks: []
        })
      } finally {
        setLoading(false)
      }
    }
    
    loadOptions()
  }, [])

  // Apply filters and update URL
  const applyFilters = () => {
    const params = new URLSearchParams()
    
    // Add date filters
    if (fromDate) {
      params.set('fromDate', dayjs(fromDate).format('YYYY-MM-DD'))
    }
    if (toDate) {
      params.set('toDate', dayjs(toDate).format('YYYY-MM-DD'))
    }
    
    // Add status and location if not "All"
    if (status !== "All") {
      params.set('status', status)
    }
    if (location !== "All") {
      params.set('location', location)
    }
    if (position !== "All") {
      params.set('position', position)
    }
    
    // Navigate to same route with updated query parameters
    router.push(`/applications?${params.toString()}`)
  }

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4 text-sm">
      <h2 className="text-lg font-semibold text-orange-600">Filter Applications</h2>

      {/* Show error message if filter loading failed */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-2 text-red-700 text-xs">
          {error}
        </div>
      )}

      {/* Application Date */}
      <h3 className="text-xs font-semibold text-muted-foreground">Application Date</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs">From</label>
          <DatePicker date={fromDate} onChange={setFromDate} />
        </div>
        <div>
          <label className="block mb-1 text-xs">To</label>
          <DatePicker date={toDate} onChange={setToDate} />
        </div>
      </div>

      {/* Status & Location */}
      <h3 className="text-xs font-semibold text-muted-foreground">Status & Location</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="All">All</SelectItem>
              {loading ? (
                <SelectItem key="loading" value="loading" disabled>Loading...</SelectItem>
              ) : (
                filterOptions?.statuses.map((s: FilterOption) => (
                  <SelectItem key={s.id} value={s.value}>{s.name}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 text-xs">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="All">All Locations</SelectItem>
              {loading ? (
                <SelectItem key="loading" value="loading" disabled>Loading...</SelectItem>
              ) : (
                filterOptions?.locations.map((loc: FilterOption) => (
                  <SelectItem key={loc.id} value={loc.value}>{loc.name}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        className="text-xs text-orange-600 hover:underline flex items-center gap-1"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? "Hide Advanced Filters" : "Show Advanced Filters"}
        <ChevronDown className={cn("h-4 w-4 transition-transform", showAdvanced && "rotate-180")} />
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-2 gap-3 border-t pt-3">
          <SelectField 
            label="Work Preference" 
            value={workPref} 
            onChange={setWorkPref} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.workPreferences.map((wp: FilterOption) => wp.name) || [])]} 
          />
          <SelectField 
            label="Application Type" 
            value={appType} 
            onChange={setAppType} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.applicantTypes.map((at: FilterOption) => at.name) || [])]} 
          />
          <SelectField 
            label="Position" 
            value={position} 
            onChange={setPosition} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.positions.map((p: FilterOption) => p.name) || [])]} 
          />
          <SelectField 
            label="Exclusive?" 
            value={exclusive} 
            onChange={setExclusive} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.exclusiveOptions.map((ex: FilterOption) => ex.name) || [])]} 
          />
          <SelectField 
            label="Hiring Workflow" 
            value={hiringWorkflow} 
            onChange={setHiringWorkflow} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.workflows.map((wf: FilterOption) => wf.name) || [])]} 
          />
          <SelectField 
            label="Data Channel" 
            value={dataChannel} 
            onChange={setDataChannel} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.dataChannels.map((dc: FilterOption) => dc.name) || [])]} 
          />
          <SelectField 
            label="Veteran Status" 
            value={veteranStatus} 
            onChange={setVeteranStatus} 
            options={loading ? ["Loading..."] : ["All", ...(filterOptions?.veteranStatuses.map((vs: FilterOption) => vs.name) || [])]} 
          />
        </div>
      )}

      <Button onClick={applyFilters} className="w-full bg-orange-600 hover:bg-orange-700">
        Apply Filters
      </Button>
    </div>
  )
}

function DatePicker({ date, onChange }: { date?: Date; onChange: (d: Date | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {date ? dayjs(date).format("MM/DD/YYYY") : <span className="text-muted-foreground">Select Date</span>}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar mode="single" selected={date} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

function SelectField({ label, value, onChange, options = ["All", "Option1"] }: { label: string; value: string; onChange: (v: string) => void; options?: string[] }) {
  return (
    <div>
      <label className="block mb-1 text-xs text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
