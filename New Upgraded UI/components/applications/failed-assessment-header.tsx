"use client"

import { useState } from "react"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
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

export default function FailedAssessmentHeader({ total, title }: { total: number; title?: string }) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="border-b border-border bg-card">
      {/* Title row with Filter button */}
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold text-orange-600 whitespace-nowrap">
          {title ?? "Application Pool: Failed Assessment"}
        </h1>
        <FilterDialog
          trigger={
            <Button variant="default" className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter Results
            </Button>
          }
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center flex-wrap gap-3 bg-orange-50 border border-orange-100 rounded-md mx-4 mt-2 mb-3 px-3 py-2">
        {/* Total records chip */}
        <span className="border border-border rounded-md px-3 py-0.5 bg-background text-sm text-foreground font-medium">
          Total Records: {total}
        </span>

        {/* spacer pushes group right */}
        <div className="flex-1" />

        {/* Controls group */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[110px] justify-between gap-2 border-orange-500 text-orange-600">
                Actions <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Bulk Move</DropdownMenuItem>
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className="pl-9 w-48 sm:w-56 md:w-72" />
          </div>

          {/* Records per page selector (static for mock) */}
          <select className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option>10 Records per page</option>
            <option>20 Records per page</option>
            <option>50 Records per page</option>
          </select>

          {/* Page navigation */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>Page 1 of 2</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* end group */}
        </div>
      </div>
    </header>
  )
}
