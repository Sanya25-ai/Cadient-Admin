"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Application } from "@/lib/types"

interface ApplicationsTableProps {
  applications: Application[]
}

export default function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [filteredApplications, setFilteredApplications] = useState(applications)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Applications</h2>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SmartScore</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Hiring Mgr</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Link href={`/applications/${application.id}`} className="font-medium hover:underline">
                    {application.name}
                  </Link>
                </TableCell>
                <TableCell>{application.appliedDate}</TableCell>
                <TableCell>{application.position}</TableCell>
                <TableCell>{application.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={application.status === "Pre-screened" ? "secondary" : "outline"}
                    className={
                      application.status === "Pre-screened" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" : ""
                    }
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                      {application.smartScore}%
                    </div>
                  </div>
                </TableCell>
                <TableCell>{application.availability}</TableCell>
                <TableCell>{application.hiringManager}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Application</DropdownMenuItem>
                      <DropdownMenuItem>Start Hiring Process</DropdownMenuItem>
                      <DropdownMenuItem>Disqualify</DropdownMenuItem>
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
