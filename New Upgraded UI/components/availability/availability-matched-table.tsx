"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { AvailabilityCandidate } from "@/lib/types"

interface AvailabilityMatchedTableProps {
  candidates: AvailabilityCandidate[]
}

export default function AvailabilityMatchedTable({ candidates }: AvailabilityMatchedTableProps) {
  const [filteredCandidates, setFilteredCandidates] = useState(candidates)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Availability Matched Candidates</h2>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hiring Mgr</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Link href={`/applications/${candidate.id}`} className="font-medium hover:underline">
                    {candidate.name}
                  </Link>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>{candidate.availability}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                      {candidate.matchScore}%
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.startDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    Availability Matched
                  </Badge>
                </TableCell>
                <TableCell>{candidate.hiringManager}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Availability</DropdownMenuItem>
                      <DropdownMenuItem>Start Hiring Process</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
