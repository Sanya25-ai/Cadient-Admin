"use client"

import { useState } from "react"
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

// Mock data for imported candidates
const importedCandidates = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    source: "LinkedIn",
    importDate: "2024-01-15",
    status: "Pending Review",
    position: "Software Engineer",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 987-6543",
    source: "Indeed",
    importDate: "2024-01-14",
    status: "Reviewed",
    position: "Marketing Manager",
    location: "New York, NY",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "(555) 456-7890",
    source: "CSV Import",
    importDate: "2024-01-13",
    status: "Approved",
    position: "Sales Representative",
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.w@email.com",
    phone: "(555) 321-0987",
    source: "Monster",
    importDate: "2024-01-12",
    status: "Pending Review",
    position: "Data Analyst",
    location: "Austin, TX",
  },
]

export function ImportedCandidatesTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCandidates, setFilteredCandidates] = useState(importedCandidates)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = importedCandidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.email.toLowerCase().includes(query.toLowerCase()) ||
        candidate.position.toLowerCase().includes(query.toLowerCase()) ||
        candidate.source.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCandidates(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Review":
        return <Badge variant="secondary">{status}</Badge>
      case "Reviewed":
        return <Badge variant="outline">{status}</Badge>
      case "Approved":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAction = (action: string, candidateId: number) => {
    console.log(`${action} candidate with ID: ${candidateId}`)
    // Handle actions here
    alert(`${action} candidate with ID: ${candidateId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Imported Candidates</h2>
          <p className="text-sm text-gray-500">
            {filteredCandidates.length} candidates imported from external sources
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-64"
          />
          <Button className="bg-orange-500 hover:bg-orange-600">
            Import New Candidates
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Import Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.phone}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>
                  <Badge variant="outline">{candidate.source}</Badge>
                </TableCell>
                <TableCell>{candidate.importDate}</TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleAction("View", candidate.id)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Approve", candidate.id)}
                      >
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Reject", candidate.id)}
                      >
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Edit", candidate.id)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Delete", candidate.id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No imported candidates found.</p>
        </div>
      )}
    </div>
  )
}
