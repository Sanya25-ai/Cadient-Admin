"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import HiresFilterPanel from "./hires-filter-panel"
import type { Hire } from "@/lib/types"

interface HiresTableProps {
  hires: Hire[]
  onApplyFilters?: (filters: {
    hireDateRange?: string
    applicationFromDate?: Date
    applicationToDate?: Date
    workPreference?: string
    location?: string
    position?: string
    applicationType?: string
    dataChannel?: string
    exclusive?: string
    hiringWorkflow?: string
    status?: string
    wotcStatus?: string
    veteranStatus?: string
    tag?: string
  }) => void
}

export default function HiresTable({ hires, onApplyFilters }: HiresTableProps) {
  const [selectedHires, setSelectedHires] = useState<string[]>([])
  const [showFilter, setShowFilter] = useState(false)

  const handleSelectHire = (hireId: string, checked: boolean) => {
    if (checked) {
      setSelectedHires([...selectedHires, hireId])
    } else {
      setSelectedHires(selectedHires.filter(id => id !== hireId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHires(hires.map(hire => hire.id))
    } else {
      setSelectedHires([])
    }
  }

  const handleApplyFilters = (filters: {
    hireDateRange?: string
    applicationFromDate?: Date
    applicationToDate?: Date
    workPreference?: string
    location?: string
    position?: string
    applicationType?: string
    dataChannel?: string
    exclusive?: string
    hiringWorkflow?: string
    status?: string
    wotcStatus?: string
    veteranStatus?: string
    tag?: string
  }) => {
    // Forward filters to parent component for server-side filtering
    onApplyFilters?.(filters)
    setShowFilter(false) // Close filter panel after applying
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Hires</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      <Collapsible open={showFilter} onOpenChange={setShowFilter}>
        <CollapsibleContent className="space-y-2">
          <div className="flex justify-start">
            <HiresFilterPanel onApplyFilters={handleApplyFilters} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedHires.length === hires.length && hires.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Hired</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Hired Location</TableHead>
              <TableHead>Former Employee?</TableHead>
              <TableHead>Rehire Eligible?</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>% Score</TableHead>
              <TableHead>E-Verify Status</TableHead>
              <TableHead>WOTC Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hires.map((hire) => (
              <TableRow key={hire.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedHires.includes(hire.id)}
                    onCheckedChange={(checked) => handleSelectHire(hire.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/applications/${hire.id}`} className="font-medium hover:underline">
                    {hire.name}
                  </Link>
                </TableCell>
                <TableCell>{hire.hired}</TableCell>
                <TableCell>{hire.position}</TableCell>
                <TableCell>{hire.hiredLocation}</TableCell>
                <TableCell>{hire.formerEmployee || "--"}</TableCell>
                <TableCell>{hire.rehireEligible || "--"}</TableCell>
                <TableCell>{hire.score || "--"}</TableCell>
                <TableCell>{hire.percentageScore || "--"}</TableCell>
                <TableCell>{hire.eVerifyStatus || "--"}</TableCell>
                <TableCell>{hire.wotcStatus || "Not Screened"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {hires.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hires found matching the current filters.
        </div>
      )}
    </div>
  )
}
