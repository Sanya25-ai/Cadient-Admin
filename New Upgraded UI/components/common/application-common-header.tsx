"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FilterDialog from "@/components/applications/filter-dialog"

interface ActionItem {
  label: string
  onClick?: () => void
  className?: string
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

interface ApplicationCommonHeaderProps {
  title: string
  total: number
  actions?: ActionItem[]
  theme?: ThemeConfig
}

const defaultTheme: ThemeConfig = {
  titleColor: "text-orange-600",
  buttonBg: "bg-orange-500",
  buttonHover: "hover:bg-orange-600",
  controlsBg: "bg-orange-50",
  controlsBorder: "border-orange-100",
  dropdownBorder: "border-orange-500",
  dropdownText: "text-orange-600"
}

const defaultActions: ActionItem[] = [
  { label: "Bulk Move" },
  { label: "Export CSV" },
  { label: "Archive" }
]

export default function ApplicationCommonHeader({ 
  title, 
  total, 
  actions = defaultActions,
  theme = defaultTheme
}: ApplicationCommonHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    // Handle search internally
    console.log("Searching for:", query)
  }

  const handleActionClick = (action: ActionItem) => {
    // Handle action clicks internally
    console.log("Action clicked:", action.label)
    action.onClick?.()
  }

  const handlePageChange = (page: number) => {
    console.log("Page change:", page)
    // Implement pagination logic here
  }

  const handleRecordsPerPageChange = (recordsPerPage: number) => {
    console.log("Records per page:", recordsPerPage)
    // Implement records per page logic here
  }

  return (
    <header className="bg-card">
      {/* Title row with Filter button */}
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className={`text-xl font-semibold ${theme.titleColor} whitespace-nowrap`}>
          {title}
        </h1>
        <FilterDialog
          trigger={
            <Button variant="default" className={`${theme.buttonBg} ${theme.buttonHover} flex items-center gap-1`}>
              <Filter className="h-4 w-4" />
              Filter Results
            </Button>
          }
        />
      </div>

      {/* Controls row */}
      <div className={`flex items-center flex-wrap gap-3 ${theme.controlsBg}  border-b border-gray-200 ${theme.controlsBorder} rounded-md mx-4 mt-2 mb-3 px-3 py-2`}>
        {/* Total records chip */}
        <span className="rounded-md px-3 py-0.5 text-sm test-gray-500 font-medium">
          Total Records: <span className="font-medium text-[#F7941D]">{total}</span>
        </span>

        {/* spacer pushes group right */}
        <div className="flex-1" />

        {/* Controls group */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Actions dropdown */}
          {actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`min-w-[110px] justify-between gap-2 ${theme.dropdownBorder} ${theme.dropdownText}`}>
                  Actions <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                  <DropdownMenuItem 
                    key={index}
                    onClick={() => handleActionClick(action)}
                    className={action.className}
                  >
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search…"
              className="pl-9 w-48 sm:w-56 md:w-72" />
          </div>

          {/* Records per page selector (static for mock) */}
          <select 
            className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-2"
            onChange={(e) => handleRecordsPerPageChange(parseInt(e.target.value))}
          >
            <option value={10}>10 Records per page</option>
            <option value={25}>25 Records per page</option>
            <option value={50}>50 Records per page</option>
            <option value={100}>100 Records per page</option>
          </select>

          {/* Page navigation */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 border-gray-300 cursor-pointer" 
              aria-label="Previous page"
              onClick={() => handlePageChange(1)} // Mock previous page
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>Page 1 of 2</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 border-gray-300 cursor-pointer" 
              aria-label="Next page"
              onClick={() => handlePageChange(2)} // Mock next page
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* end group */}
        </div>
      </div>
    </header>
  )
}

// Export types for external use
export type { ActionItem, ThemeConfig, ApplicationCommonHeaderProps }
