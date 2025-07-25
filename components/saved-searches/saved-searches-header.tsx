"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSavedSearchesContext } from "@/lib/saved-searches-context"

export default function SavedSearchesHeader() {
  const {
    totalRecords,
    currentPage,
    totalPages,
    recordsPerPage,
    searchQuery,
    onPageChange,
    onRecordsPerPageChange,
    onSearch,
  } = useSavedSearchesContext()

  const handleSearchChange = (value: string) => {
    onSearch(value)
  }

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Main Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-orange-500">Your Saved Searches</h1>
      </div>

      {/* Controls Bar */}
      <div className="px-6 py-3 bg-orange-50 border-t border-orange-100">
        <div className="flex items-center justify-between">
          {/* Left side - Total and Actions */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Total Records: <span className="font-medium text-orange-600">{totalRecords}</span>
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 border-orange-200 hover:bg-orange-100">
                  Actions
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Run Search</DropdownMenuItem>
                <DropdownMenuItem>Edit Search</DropdownMenuItem>
                <DropdownMenuItem>Delete Search</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side - Search and Pagination */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-8 w-64 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            {/* Records per page */}
            <div className="flex items-center gap-2">
              <Select
                value={recordsPerPage.toString()}
                onValueChange={(value) => onRecordsPerPageChange(parseInt(value))}
              >
                <SelectTrigger className="w-auto border-orange-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Records per page</SelectItem>
                  <SelectItem value="25">25 Records per page</SelectItem>
                  <SelectItem value="50">50 Records per page</SelectItem>
                  <SelectItem value="100">100 Records per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="border-orange-200 hover:bg-orange-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="border-orange-200 hover:bg-orange-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
