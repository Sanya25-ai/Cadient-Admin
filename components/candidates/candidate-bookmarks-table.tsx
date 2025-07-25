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

// Mock data for bookmarked candidates
const bookmarkedCandidates = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "(555) 111-2222",
    position: "Senior Developer",
    location: "Seattle, WA",
    bookmarkDate: "2024-01-20",
    status: "Available",
    experience: "5+ years",
    skills: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "(555) 333-4444",
    position: "UX Designer",
    location: "Los Angeles, CA",
    bookmarkDate: "2024-01-18",
    status: "Interviewing",
    experience: "3+ years",
    skills: ["Figma", "Adobe XD", "User Research"],
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "(555) 555-6666",
    position: "Product Manager",
    location: "San Francisco, CA",
    bookmarkDate: "2024-01-15",
    status: "Available",
    experience: "7+ years",
    skills: ["Product Strategy", "Agile", "Analytics"],
  },
]

export function CandidateBookmarksTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCandidates, setFilteredCandidates] = useState(bookmarkedCandidates)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = bookmarkedCandidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query.toLowerCase()) ||
        candidate.email.toLowerCase().includes(query.toLowerCase()) ||
        candidate.position.toLowerCase().includes(query.toLowerCase()) ||
        candidate.location.toLowerCase().includes(query.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredCandidates(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "Interviewing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "Hired":
        return <Badge className="bg-purple-500 hover:bg-purple-600">{status}</Badge>
      case "Not Available":
        return <Badge variant="secondary">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAction = (action: string, candidateId: number) => {
    console.log(`${action} candidate with ID: ${candidateId}`)
    if (action === "Remove Bookmark") {
      setFilteredCandidates(prev => prev.filter(c => c.id !== candidateId))
    }
    alert(`${action} candidate with ID: ${candidateId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Your Bookmarked Candidates</h2>
          <p className="text-sm text-gray-500">
            {filteredCandidates.length} candidates in your bookmarks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search bookmarked candidates..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bookmarked</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-gray-500">{candidate.email}</div>
                    <div className="text-sm text-gray-500">{candidate.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{candidate.position}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {candidate.bookmarkDate}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleAction("View Profile", candidate.id)}
                      >
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Contact", candidate.id)}
                      >
                        Contact Candidate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Schedule Interview", candidate.id)}
                      >
                        Schedule Interview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Add Note", candidate.id)}
                      >
                        Add Note
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("Remove Bookmark", candidate.id)}
                        className="text-red-600"
                      >
                        Remove Bookmark
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
          <p className="text-gray-500">
            {searchQuery ? "No bookmarked candidates found matching your search." : "No bookmarked candidates yet."}
          </p>
          {!searchQuery && (
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
              Browse Candidates
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
