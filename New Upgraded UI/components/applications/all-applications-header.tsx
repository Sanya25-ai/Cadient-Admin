"use client"

import { useState } from "react"
import {
  SearchIcon,
  BellIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserMenu from "@/components/user-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FilterDialog from "@/components/applications/filter-dialog"

export default function AllApplicationsHeader({ total, title }: { total: number; title?: string }) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-card pt-3 pb-1">
      {/* Notification + user icons */}
      {/* <div className="flex justify-end px-3 pt-1.5">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <BellIcon className="h-4 w-4" />
        </Button>
        <UserMenu />
      </div> */}

      {/* Title row with Filter button */}
      <div className="flex items-center justify-between px-3 mt-1">
        <h1 className="text-lg font-semibold text-orange-600 whitespace-nowrap">
          {title ?? "All Applications"}
        </h1>
        <FilterDialog
          trigger={
            <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1 text-xs">
              <FilterIcon className="h-3 w-3" />
              Filter Results
            </Button>
          }
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center flex-wrap gap-2 bg-orange-50 border border-orange-100 rounded-md mx-3 mt-1.5 mb-2 px-2 py-1.5">
        {/* Total records chip */}
        <span className="border border-border rounded-md px-2 py-0.5 bg-background text-xs text-foreground font-medium">
          Total Records: {total}
        </span>

        {/* spacer pushes group right */}
        <div className="flex-1" />

        {/* Controls group */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="min-w-[90px] justify-between gap-1 border-orange-500 text-orange-600 text-xs h-7">
                Actions <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-xs">Bulk Move</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Export CSV</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className="pl-7 w-40 sm:w-48 md:w-64 h-7 text-xs" />
          </div>

          {/* Records per page selector (static for mock) */}
          <select className="h-7 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
            <option>10 Records per page</option>
            <option>20 Records per page</option>
            <option>50 Records per page</option>
          </select>

          {/* Page navigation */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Previous page">
              <ChevronLeftIcon className="h-3 w-3" />
            </Button>
            <span>Page 1 of 2</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Next page">
              <ChevronRightIcon className="h-3 w-3" />
            </Button>
          </div>

          {/* end group */}
        </div>
      </div>
    </header>
  )
}
