"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Filter, Search, ChevronDown } from "lucide-react"

interface BookmarkCandidate {
  id: string
  name: string
  applied: string
  status: string
  smartScore: number
  requisition: string
  location: string
  hiringManager: string
  score: string
  source: string
  safesLead: boolean
}

interface BookmarksTableProps {
  bookmarks: BookmarkCandidate[]
}

export function BookmarksTable({ bookmarks }: BookmarksTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredCandidates, setFilteredCandidates] = useState(bookmarks)

  // Update filtered candidates when bookmarks prop changes
  useEffect(() => {
    setFilteredCandidates(bookmarks)
  }, [bookmarks])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = bookmarks.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.requisition.toLowerCase().includes(query.toLowerCase()) ||
        candidate.location.toLowerCase().includes(query.toLowerCase()) ||
        candidate.hiringManager.toLowerCase().includes(query.toLowerCase()) ||
        candidate.source.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCandidates(filtered)
    setCurrentPage(1)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pre-Screened":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>
      case "Interviewing":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>
      case "Hired":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSmartScoreBadge = (score: number) => {
    if (score >= 80) {
      return <Badge className="bg-green-500 text-white hover:bg-green-600">{score}</Badge>
    } else if (score >= 60) {
      return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">{score}</Badge>
    } else {
      return <Badge className="bg-red-500 text-white hover:bg-red-600">{score}</Badge>
    }
  }

  const totalRecords = filteredCandidates.length
  const totalPages = Math.ceil(totalRecords / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = filteredCandidates.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      {/* Controls Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total Records: <span className="text-orange-500 font-medium">{totalRecords}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Actions
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Change Hiring Step</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Send a Message</DropdownMenuItem>
              <DropdownMenuItem>Extend Application</DropdownMenuItem>
              <DropdownMenuItem>Forward Interview Guide</DropdownMenuItem>
              <DropdownMenuItem>Forward Application Details</DropdownMenuItem>
              <DropdownMenuItem>Initiate Hiring Process</DropdownMenuItem>
              <DropdownMenuItem>Remove Bookmark</DropdownMenuItem>
              <DropdownMenuItem>Resend Invite for Job Board</DropdownMenuItem>
              <DropdownMenuItem>Add Tag</DropdownMenuItem>
              <DropdownMenuItem>Export All Results</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Records per page */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-fit">
                  {recordsPerPage} Records per...
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setRecordsPerPage(10)}>10</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecordsPerPage(25)}>25</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecordsPerPage(50)}>50</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecordsPerPage(100)}>100</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Pagination Info */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button 
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SmartScore</TableHead>
              <TableHead>Requisition (Req #)</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Hiring Manager</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookmarks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-12">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
                    <p className="text-gray-500">You haven't bookmarked any candidates yet.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentRecords.map((candidate) => (
                <TableRow key={candidate.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {candidate.safesLead && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full" title="SafesLead" />
                      )}
                      <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                        {candidate.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{candidate.applied}</TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                  <TableCell>{getSmartScoreBadge(candidate.smartScore)}</TableCell>
                  <TableCell className="text-sm">{candidate.requisition}</TableCell>
                  <TableCell className="text-sm">{candidate.location}</TableCell>
                  <TableCell className="text-sm">{candidate.hiringManager}</TableCell>
                  <TableCell className="text-sm">{candidate.score}</TableCell>
                  <TableCell className="text-sm max-w-xs truncate" title={candidate.source}>
                    {candidate.source}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - only show if there are bookmarks */}
      {bookmarks.length > 0 && (
        <div className="flex items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page)
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
