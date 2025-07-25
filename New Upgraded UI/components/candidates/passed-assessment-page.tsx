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

interface PassedAssessmentCandidate {
  id: string
  name: string
  email: string
  phone: string
  assessmentType: string
  score: number
  datePassed: string
  status: "pending" | "contacted" | "scheduled"
}

// Mock data for passed assessment candidates
const passedAssessmentCandidates: PassedAssessmentCandidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    assessmentType: "Technical Assessment",
    score: 85,
    datePassed: "2024-03-15",
    status: "pending",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 234-5678",
    assessmentType: "Behavioral Assessment",
    score: 92,
    datePassed: "2024-03-14",
    status: "contacted",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "(555) 345-6789",
    assessmentType: "Technical Assessment",
    score: 78,
    datePassed: "2024-03-13",
    status: "scheduled",
  },
]

export function PassedAssessmentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [candidatesList, setCandidatesList] = useState(passedAssessmentCandidates)

  const getStatusColor = (status: PassedAssessmentCandidate["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "contacted":
        return "bg-blue-500"
      case "scheduled":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredCandidates = candidatesList.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.phone.includes(searchQuery) ||
      candidate.assessmentType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Assessment Type</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date Passed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.phone}</TableCell>
                <TableCell>{candidate.assessmentType}</TableCell>
                <TableCell>{candidate.score}%</TableCell>
                <TableCell>{new Date(candidate.datePassed).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCandidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  {searchQuery ? "No candidates found matching your search." : "No passed assessment candidates yet."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
