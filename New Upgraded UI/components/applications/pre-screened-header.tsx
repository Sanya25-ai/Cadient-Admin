"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Filter, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SearchResult {
  id: string
  name: string
  position: string
  location: string
  status: string
  smartScore: number
}

interface PreScreenedHeaderProps {
  total?: number;
  title?: string;
}

export default function PreScreenedHeader({ total = 0, title = "Pre-screened Applications" }: PreScreenedHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Form state for new application
  const [newApplication, setNewApplication] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    location: "",
    source: "Web Site",
    resume: null as File | null,
  })

  // Filter state
  const [filters, setFilters] = useState({
    locations: [] as string[],
    positions: [] as string[],
    smartScoreMin: "",
    smartScoreMax: "",
    dateRange: "all",
  })

  // Available filter options
  const locationOptions = ["San Diego", "Chicago", "New York", "Phoenix", "Remote", "Miami", "Dallas", "Houston"]
  const positionOptions = [
    "Sales Associate",
    "Marketing Specialist",
    "Software Developer",
    "Customer Service Representative",
    "Financial Analyst",
    "Administrative Assistant",
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      // Simulate search results
      const results: SearchResult[] = [
        {
          id: "1",
          name: "Kyle Boyd",
          position: "Sales Demo Retail",
          location: "San Diego",
          status: "Pre-screened",
          smartScore: 85,
        },
        {
          id: "4",
          name: "Emily Davis",
          position: "Customer Service Representative",
          location: "Phoenix",
          status: "Pre-screened",
          smartScore: 81,
        },
        {
          id: "12",
          name: "Jennifer Wilson",
          position: "Administrative Assistant",
          location: "Chicago",
          status: "Pre-screened",
          smartScore: 80,
        },
      ].filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.position.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewApplication((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewApplication((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewApplication((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit to the server
    console.log("Submitting new application:", newApplication)
    alert("Application added successfully!")
    setIsDialogOpen(false)
    // Reset form
    setNewApplication({
      name: "",
      email: "",
      phone: "",
      position: "",
      location: "",
      source: "Web Site",
      resume: null,
    })
  }

  const handleFilterChange = (type: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
  }

  const toggleLocationFilter = (location: string) => {
    setFilters((prev) => {
      if (prev.locations.includes(location)) {
        return { ...prev, locations: prev.locations.filter((l) => l !== location) }
      } else {
        return { ...prev, locations: [...prev.locations, location] }
      }
    })
  }

  const togglePositionFilter = (position: string) => {
    setFilters((prev) => {
      if (prev.positions.includes(position)) {
        return { ...prev, positions: prev.positions.filter((p) => p !== position) }
      } else {
        return { ...prev, positions: [...prev.positions, position] }
      }
    })
  }

  const applyFilters = () => {
    // In a real app, this would filter the data
    console.log("Applying filters:", filters)
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    setFilters({
      locations: [],
      positions: [],
      smartScoreMin: "",
      smartScoreMax: "",
      dateRange: "all",
    })
  }

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b border-border bg-card">
      {/* Title row with action buttons */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-muted-foreground">Total Records:</span>
            <Badge variant="secondary" className="text-sm font-normal">
              {total}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter button */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filters
                {(filters.locations.length > 0 || filters.positions.length > 0) && (
                  <Badge variant="secondary" className="ml-1 px-1 py-0 h-5 min-w-5 flex items-center justify-center rounded-full text-xs">
                    {filters.locations.length + filters.positions.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {locationOptions.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location}`}
                          checked={filters.locations.includes(location)}
                          onCheckedChange={() => toggleLocationFilter(location)}
                        />
                        <Label htmlFor={`location-${location}`} className="text-sm">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Position</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {positionOptions.map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox
                          id={`position-${position}`}
                          checked={filters.positions.includes(position)}
                          onCheckedChange={() => togglePositionFilter(position)}
                        />
                        <Label htmlFor={`position-${position}`} className="text-sm">
                          {position}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">SmartScore Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="smartScoreMin" className="text-sm">
                        Min
                      </Label>
                      <Input
                        id="smartScoreMin"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Min"
                        value={filters.smartScoreMin}
                        onChange={(e) => handleFilterChange("smartScoreMin", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smartScoreMax" className="text-sm">
                        Max
                      </Label>
                      <Input
                        id="smartScoreMax"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Max"
                        value={filters.smartScoreMax}
                        onChange={(e) => handleFilterChange("smartScoreMax", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Date Range</h4>
                  <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                      <SelectItem value="quarter">Last 3 Months</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Add new application button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Application</DialogTitle>
                <DialogDescription>Enter applicant information to create a new application.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="col-span-2">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newApplication.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newApplication.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newApplication.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="position" className="text-right">
                    Position
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    value={newApplication.position}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={newApplication.location}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="source" className="text-right">
                    Source
                  </Label>
                  <Select value={newApplication.source} onValueChange={(value) => handleSelectChange("source", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Site">Web Site</SelectItem>
                      <SelectItem value="Job Board">Job Board</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Walk In">Walk In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="resume" className="text-right">
                    Resume
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!newApplication.name || !newApplication.email || !newApplication.position}
                >
                  Add Application
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-3 pt-1 relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, position, location..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover shadow-md">
            <div className="p-2 border-b">
              <p className="text-sm text-muted-foreground">
                Search results for "{searchQuery}" ({searchResults.length})
              </p>
            </div>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="hover:bg-muted">
                  <Link href={`/applications/${result.id}`} className="block p-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.position} - {result.location}
                        </div>
                      </div>
                      <Badge variant={result.smartScore > 80 ? "success" : "default"} className="ml-2">
                        {result.smartScore}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
