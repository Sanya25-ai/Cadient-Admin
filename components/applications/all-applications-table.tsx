"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Application } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AllApplicationsTableProps {
  applications: Application[]
}

export default function AllApplicationsTable({ applications }: AllApplicationsTableProps) {
  const [filtered, setFiltered] = useState(applications)

  // Function to determine score color class
  const getScoreColorClass = (score: number | null | undefined) => {
    if (!score) return "";
    if (score >= 70) return "bg-green-500"; // High score (green)
    if (score >= 40) return "bg-yellow-500"; // Medium score (yellow)
    return "bg-red-500"; // Low score (red)
  }

  // Function to format availability
  const formatAvailability = (availability: string | null | undefined) => {
    if (!availability) return "-";
    return availability;
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-orange-50 text-orange-600 hover:bg-orange-50">
            <TableHead className="w-[30px] px-2 py-2 text-xs">
              <input type="checkbox" className="rounded border-gray-300 h-3 w-3" />
            </TableHead>
            <TableHead className="px-2 py-2 text-xs">Name</TableHead>
            <TableHead className="px-2 py-2 text-xs">Applied</TableHead>
            <TableHead className="px-2 py-2 text-xs">Position</TableHead>
            <TableHead className="px-2 py-2 text-xs">Location</TableHead>
            <TableHead className="px-2 py-2 text-xs">Status</TableHead>
            <TableHead className="px-2 py-2 text-xs">SmartScore</TableHead>
            <TableHead className="px-2 py-2 text-xs">Availability</TableHead>
            <TableHead className="px-2 py-2 text-xs">Hiring step</TableHead>
            <TableHead className="px-2 py-2 text-xs w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length > 0 ? (
            filtered.map((app) => (
              <TableRow key={app.id} className="text-xs">
                <TableCell className="px-2 py-1.5">
                  <input type="checkbox" className="rounded border-gray-300 h-3 w-3" />
                </TableCell>
                <TableCell className="px-2 py-1.5">
                  <Link href={`/applicant?id=${app.id}`} className="font-medium hover:underline text-xs">
                    {app.name}
                  </Link>
                </TableCell>
                <TableCell className="px-2 py-1.5">{app.appliedDate}</TableCell>
                <TableCell className="px-2 py-1.5 min-w-[120px]">{app.position}</TableCell>
                <TableCell className="px-2 py-1.5">{app.location}</TableCell>
                <TableCell className="px-2 py-1.5">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-medium",
                    app.status === "Offered" ? "bg-green-100 text-green-800" :
                    app.status === "Disqualified" ? "bg-red-100 text-red-800" :
                    "bg-blue-100 text-blue-800"
                  )}>
                    {app.status || "Pre-screened"}
                  </span>
                </TableCell>
                <TableCell className="px-2 py-1.5">
                  {app.smartScore && app.smartScore > 0 ? (
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium",
                      getScoreColorClass(app.smartScore)
                    )}>
                      {app.smartScore}%
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="px-2 py-1.5">{formatAvailability(app.availability)}</TableCell>
                <TableCell className="px-2 py-1.5">{app.hiringStep || "-"}</TableCell>
                <TableCell className="px-2 py-1.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-xs">
                      <DropdownMenuItem className="text-xs">View Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">Start Hiring Process</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">Move to Pool</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">Disqualify</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-4 text-xs text-gray-500">
                No applications found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
