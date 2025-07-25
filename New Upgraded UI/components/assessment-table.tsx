"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { ApplicationPoolCandidate } from "@/lib/types"

interface DropdownAction {
  label: string
  className?: string
}

interface AssessmentTableTheme {
  headerBg: string
  headerText: string
  avatarBg: string
}

interface AssessmentTableProps {
  applications: ApplicationPoolCandidate[]
  theme: AssessmentTableTheme
  dropdownActions: DropdownAction[]
  emptyMessage?: string
}

export default function AssessmentTable({ 
  applications, 
  theme, 
  dropdownActions,
  emptyMessage = "No applications found. Try adjusting your filters."
}: AssessmentTableProps) {
  const [filteredApplications, setFilteredApplications] = useState(applications)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map(app => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId])
    } else {
      setSelectedApplications(selectedApplications.filter(id => id !== applicationId))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pre-Screened':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">Pre-Screened</Badge>
      case 'Application Pool':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Application Pool</Badge>
      case 'Hired':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs">Hired</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  const getWOTCBadge = (wotcStatus: string) => {
    switch (wotcStatus) {
      case 'Eligible':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Eligible</Badge>
      case 'Not Eligible':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">Not Eligible</Badge>
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">Pending</Badge>
      case 'Not Screened':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-xs">Not Screened</Badge>
      default:
        return <span className="text-gray-500 text-xs">{wotcStatus}</span>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHeader>
              <TableRow className={`${theme.headerBg} ${theme.headerText} hover:${theme.headerBg}`}>
                <TableHead className="w-8 sm:w-10">
                  <Checkbox
                    checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all applications"
                    className="scale-75 sm:scale-100"
                  />
                </TableHead>
                <TableHead className="w-8 sm:w-10 hidden sm:table-cell"></TableHead>
                <TableHead className="min-w-[120px] sm:min-w-[160px] font-semibold text-xs sm:text-sm">Name</TableHead>
                <TableHead className="w-16 sm:w-20 md:w-24 font-semibold text-xs sm:text-sm">Applied</TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[140px] font-semibold text-xs sm:text-sm">Position</TableHead>
                <TableHead className="w-20 sm:w-24 md:w-32 font-semibold text-xs sm:text-sm hidden md:table-cell">Location</TableHead>
                <TableHead className="w-20 sm:w-24 lg:w-32 font-semibold text-xs sm:text-sm hidden lg:table-cell">WOTC Status</TableHead>
                <TableHead className="w-12 sm:w-16 text-center font-semibold text-xs sm:text-sm hidden xl:table-cell">
                  Former
                </TableHead>
                <TableHead className="w-12 sm:w-16 text-center font-semibold text-xs sm:text-sm hidden xl:table-cell">
                  Rehire
                </TableHead>
                <TableHead className="w-12 sm:w-20 font-semibold text-xs sm:text-sm">%Score</TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[140px] lg:min-w-[180px] font-semibold text-xs sm:text-sm hidden lg:table-cell">Hiring Step</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application, index) => (
                  <TableRow key={application.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="py-2 sm:py-3">
                      <Checkbox
                        checked={selectedApplications.includes(application.id)}
                        onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                        aria-label={`Select ${application.name}`}
                        className="scale-75 sm:scale-100"
                      />
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 hidden sm:table-cell">
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${theme.avatarBg} flex items-center justify-center`}>
                        <span className="text-white text-xs">👤</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3">
                      <div className="min-w-[120px] sm:min-w-[140px]">
                        <Link href={`/applications/${application.id}`} className="font-medium hover:underline text-blue-600 block truncate text-xs sm:text-sm">
                          {application.name}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {getStatusBadge(application.status || 'Application Pool')}
                        </div>
                        {/* Show additional info on mobile */}
                        <div className="md:hidden mt-1 space-y-1">
                          <div className="text-xs text-gray-600 truncate" title={application.location}>
                            📍 {application.location}
                          </div>
                          <div className="lg:hidden">
                            {getWOTCBadge(application.wotcStatus)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">{application.appliedDate}</TableCell>
                    <TableCell className="py-2 sm:py-3">
                      <div className="truncate text-xs sm:text-sm" title={application.position}>
                        {application.position}
                      </div>
                      {/* Show hiring step info on mobile/tablet */}
                      <div className="lg:hidden mt-1">
                        {application.hiringStep && (
                          <div className="text-xs text-gray-500 truncate" title={application.hiringStep}>
                            {application.hiringStep.split(', ')[0]}
                            {application.hiringStep.split(', ').length > 1 && '...'}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm hidden md:table-cell">{application.location}</TableCell>
                    <TableCell className="py-2 sm:py-3 hidden lg:table-cell">
                      <div className="whitespace-nowrap">
                        {getWOTCBadge(application.wotcStatus)}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 text-center whitespace-nowrap text-xs sm:text-sm hidden xl:table-cell">
                      <span className={application.formerEmployee === 'Yes' ? 'text-green-600 font-medium' : 'text-gray-400'}>
                        {application.formerEmployee}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 text-center whitespace-nowrap text-xs sm:text-sm hidden xl:table-cell">
                      <span className={application.rehireEligible === 'Yes' ? 'text-green-600 font-medium' : 'text-gray-400'}>
                        {application.rehireEligible}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3">
                      <div className="flex items-center justify-center">
                        {application.smartScore > 0 ? (
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${getScoreColor(application.smartScore)} flex items-center justify-center text-white text-xs font-medium shrink-0`}>
                            {application.smartScore}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs sm:text-sm">--</span>
                        )}
                      </div>
                      {/* Show Former/Rehire info on mobile */}
                      <div className="xl:hidden mt-1 text-xs text-gray-500 text-center">
                        <div>F: {application.formerEmployee === 'Yes' ? '✓' : '✗'}</div>
                        <div>R: {application.rehireEligible === 'Yes' ? '✓' : '✗'}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 hidden lg:table-cell">
                      <div className="max-w-[140px] lg:max-w-[180px]">
                        {application.hiringStep ? (
                          <div className="text-xs text-gray-600 leading-relaxed overflow-hidden">
                            {application.hiringStep.split(', ').slice(0, 2).map((step, index) => (
                              <div key={index} className="mb-1 truncate" title={step}>
                                {step.includes('(Completed)') ? (
                                  <span className="text-green-600 font-medium">{step}</span>
                                ) : step.includes('(In Progress)') ? (
                                  <span className="text-blue-600 font-medium">{step}</span>
                                ) : step.includes('(Workflow has not started)') ? (
                                  <span className="text-gray-500">{step}</span>
                                ) : (
                                  <span>{step}</span>
                                )}
                              </div>
                            ))}
                            {application.hiringStep.split(', ').length > 2 && (
                              <div className="text-gray-400 text-xs">
                                +{application.hiringStep.split(', ').length - 2} more...
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">--</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-6 text-gray-500 text-sm">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {selectedApplications.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-50 p-3 sm:p-4 rounded-md gap-3">
          <span className="text-xs sm:text-sm text-blue-800">
            {selectedApplications.length} application(s) selected
          </span>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">Bulk Action</Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">Export Selected</Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setSelectedApplications([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}
      
      {/* Responsive info indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <div className="flex items-center justify-center text-blue-700 text-xs sm:text-sm">
          <span className="mr-2">ℹ️</span>
          <span className="md:hidden">Some columns hidden on mobile - scroll horizontally or use larger screen</span>
          <span className="hidden md:block lg:hidden">Some columns hidden on tablet - use larger screen for full view</span>
          <span className="hidden lg:block xl:hidden">Former/Rehire columns hidden - use larger screen for full view</span>
          <span className="hidden xl:block">All columns visible</span>
        </div>
      </div>
    </div>
  )
}
