"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TopApplicant } from "@/lib/types"

interface TopApplicantsTableProps {
  applicants: TopApplicant[]
}

export default function TopApplicantsTable({ applicants }: TopApplicantsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const totalRecords = applicants.length
  const totalPages = Math.ceil(totalRecords / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentApplicants = applicants.slice(startIndex, endIndex)

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pre-screened':
        return 'bg-yellow-100 text-yellow-800'
      case 'offered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSmartScoreColor = (score: number | null) => {
    if (!score) return 'bg-gray-400'
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-yellow-500'
    if (score >= 70) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const formatScore = (score: number | null): string => {
    return score !== null ? score.toString() : '--'
  }

  const formatPercentageScore = (score: number | null): string => {
    return score !== null ? `${score}%` : '--'
  }

  const formatHiringStep = (hiringStep: string): string => {
    if (!hiringStep) return '--'
    
    // Split the hiring step text into individual workflow steps
    // Each step follows the pattern: "StepName (Status)"
    const stepPattern = /([^(]+)\s*\(\s*([^)]+)\s*\)/g;
    const steps = [];
    let match;
    
    while ((match = stepPattern.exec(hiringStep)) !== null) {
      const stepName = match[1].trim();
      const stepStatus = match[2].trim();
      steps.push({ name: stepName, status: stepStatus });
    }
    
    // Find the first step that is not "Workflow has not started"
    const activeStep = steps.find(step => 
      step.status !== 'Workflow has not started' && 
      !step.status.includes('has not started')
    );
    
    if (activeStep) {
      // Show both step name and status like "Contact (Send to Pool)"
      return `${activeStep.name} (${activeStep.status})`;
    }
    
    // If no active step found, return the first step name only
    if (steps.length > 0) {
      return steps[0].name;
    }
    
    // Fallback
    return 'Contact';
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead className="font-semibold text-gray-900">Name</TableHead>
              <TableHead className="font-semibold text-gray-900">Applied</TableHead>
              <TableHead className="font-semibold text-gray-900">Position</TableHead>
              <TableHead className="font-semibold text-gray-900">Location</TableHead>
              <TableHead className="font-semibold text-gray-900">Status</TableHead>
              <TableHead className="font-semibold text-gray-900">Score</TableHead>
              <TableHead className="font-semibold text-gray-900">% Score</TableHead>
              <TableHead className="font-semibold text-gray-900">Availability</TableHead>
              <TableHead className="font-semibold text-gray-900">WOTC Status</TableHead>
              <TableHead className="font-semibold text-gray-900">Hiring Step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentApplicants.map((applicant) => (
              <TableRow key={applicant.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-left">
                    {applicant.name}
                  </button>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{applicant.appliedDate}</TableCell>
                <TableCell className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  {applicant.position}
                </TableCell>
                <TableCell className="text-sm text-gray-600">{applicant.location}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(applicant.status)}`}>
                    {applicant.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{formatScore(applicant.score)}</TableCell>
                <TableCell className="text-sm text-gray-600">{formatPercentageScore(applicant.percentageScore)}</TableCell>
                <TableCell className="text-sm text-gray-600">{applicant.availability}</TableCell>
                <TableCell className="text-sm text-gray-600">{applicant.wotcStatus}</TableCell>
                <TableCell className="text-sm text-blue-600">
                  {formatHiringStep(applicant.hiringStep)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
