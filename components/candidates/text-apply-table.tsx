"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TextApplyCandidate {
  id: string
  name: string
  phone: string
  status: "new" | "reviewed" | "contacted"
  dateApplied: string
  jobTitle: string
}

// Mock data for text apply candidates
const textApplyCandidates: TextApplyCandidate[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "(555) 123-4567",
    status: "new",
    dateApplied: "2024-03-15",
    jobTitle: "Software Engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "(555) 234-5678",
    status: "reviewed",
    dateApplied: "2024-03-14",
    jobTitle: "Product Manager",
  },
  {
    id: "3",
    name: "Mike Johnson",
    phone: "(555) 345-6789",
    status: "contacted",
    dateApplied: "2024-03-13",
    jobTitle: "UX Designer",
  },
]

export function TextApplyTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCandidates, setFilteredCandidates] = useState(textApplyCandidates)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = textApplyCandidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.phone.includes(query) ||
        candidate.jobTitle.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCandidates(filtered)
  }

  const getStatusColor = (status: TextApplyCandidate["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "reviewed":
        return "bg-yellow-500"
      case "contacted":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.phone}</TableCell>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(candidate.dateApplied).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Contact</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Reviewed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCandidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {searchQuery ? "No candidates found matching your search." : "No text apply candidates yet."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
