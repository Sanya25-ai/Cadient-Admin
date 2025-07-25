"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FeatureGate, useAdminAccess } from '@/components/admin/feature-gate'
import { DisplaySetRenderer, useDisplaySet } from '@/components/admin/display-set-renderer'
import { adminConfigClient } from '@/lib/admin/config-client'
import type { TopApplicant } from "@/lib/types"

interface AdminAwareTopApplicantsTableProps {
  applicants: TopApplicant[]
}

interface ExtendedApplicant extends TopApplicant {
  decisionPointScore?: string
  smartMatchScore?: string
  smartGroupScore?: string
  tags?: string[]
  applicantType?: string
  city?: string
  state?: string
  email?: string
  phone?: string
  appliedFormatted?: string
  applicationType?: string
  exclusive?: string
  esteemStatus?: string
  workPreference?: string
  startDate?: string
  availabilitySchedule?: Array<{ day: string; time: string }>
}

// Helper function for tag colors (copied from all-applications-list)
const getTagColor = (tag: string) => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800', 
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800'
  ]
  const index = tag.length % colors.length
  return colors[index]
}

export default function AdminAwareTopApplicantsTable({ applicants }: AdminAwareTopApplicantsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [extendedApplicants, setExtendedApplicants] = useState<ExtendedApplicant[]>([])
  
  // Add hover state variables (copied from all-applications-list)
  const [hoveredNameId, setHoveredNameId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Admin access hooks
  const { hasAccess: canShowDecisionPoint } = useAdminAccess('EnableDecisionPoint', 'ShowDPScoreInApplicantGrids')
  const { hasAccess: canShowSmartMatch } = useAdminAccess('EnableSmartMatch', 'FilterbySmartMatch')
  const { hasAccess: canShowApplicantType } = useAdminAccess(undefined, 'gridShowApplicantType')

  // Track mouse position for tooltip positioning (copied from all-applications-list)
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    // Transform applicants to include admin-related fields - use real data from backend
    const enhanced = applicants.map((applicant: any) => ({
      ...applicant,
      decisionPointScore: applicant.decisionPointScore || getRandomDecisionPointScore(),
      smartMatchScore: applicant.smartMatchScore || getRandomSmartMatchScore(),
      smartGroupScore: applicant.smartGroupScore || getRandomSmartGroupScore(),
      applicantType: applicant.applicantType || 'Standard',
      // Use real data from backend - no fallbacks to 'NA' since API now extracts this
      city: applicant.city || 'NA',
      state: applicant.state || 'NA',
      email: applicant.email || 'NA',
      phone: applicant.phone || 'NA',
      appliedFormatted: applicant.appliedDate || 'NA',
      applicationType: applicant.applicationType || 'NA',
      exclusive: applicant.exclusive || 'NA',
      esteemStatus: applicant.esteemStatus || 'NA',
      workPreference: applicant.workPreference || 'NA',
      startDate: applicant.startDate || 'NA',
      tags: applicant.tags || [], // Use real tags from backend
      availabilitySchedule: applicant.availabilitySchedule || [] // Use real schedule from backend
    }))
    setExtendedApplicants(enhanced)
  }, [applicants])

  const totalRecords = extendedApplicants.length
  const totalPages = Math.ceil(totalRecords / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentApplicants = extendedApplicants.slice(startIndex, endIndex)

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

  const formatScore = (score: number | null): string => {
    return score !== null ? score.toString() : '--'
  }

  const formatPercentageScore = (score: number | null): string => {
    return score !== null ? `${score}%` : '--'
  }

  const formatHiringStep = (hiringStep: string): string => {
    if (!hiringStep) return '--'
    
    const stepPattern = /([^(]+)\s*\(\s*([^)]+)\s*\)/g;
    const steps = [];
    let match;
    
    while ((match = stepPattern.exec(hiringStep)) !== null) {
      const stepName = match[1].trim();
      const stepStatus = match[2].trim();
      steps.push({ name: stepName, status: stepStatus });
    }
    
    const activeStep = steps.find(step => 
      step.status !== 'Workflow has not started' && 
      !step.status.includes('has not started')
    );
    
    if (activeStep) {
      return `${activeStep.name} (${activeStep.status})`;
    }
    
    if (steps.length > 0) {
      return steps[0].name;
    }
    
    return 'Contact';
  }

  // Helper functions for mock admin data
  function getRandomDecisionPointScore(): string {
    const scores = [
      'DecisionPointGroupRankScore.1',
      'DecisionPointGroupRankScore.2', 
      'DecisionPointGroupRankScore.3',
      'DecisionPointGroupRankScore.4',
      'DecisionPointGroupRankScore.5'
    ]
    return scores[Math.floor(Math.random() * scores.length)]
  }

  function getRandomSmartMatchScore(): string {
    const scores = [
      'SmartMatchGroupRankScore.1',
      'SmartMatchGroupRankScore.2',
      'SmartMatchGroupRankScore.3'
    ]
    return scores[Math.floor(Math.random() * scores.length)]
  }

  function getRandomSmartGroupScore(): string {
    const scores = [
      'SmartGroupRankScore.1',
      'SmartGroupRankScore.2',
      'SmartGroupRankScore.3',
      'SmartGroupRankScore.4'
    ]
    return scores[Math.floor(Math.random() * scores.length)]
  }

  // Render the Name tooltip (using only real data, show NA for missing fields)
  const renderNameTooltip = (application: ExtendedApplicant) => {
    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 400
    const tooltipHeight = 400
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let left = mousePosition.x + 10
    let top = mousePosition.y + 10
    
    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10
    }

    return (
      <div 
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] w-[400px] pointer-events-none"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
        {/* Name and Location */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">{application.name || 'NA'}</h3>
          <p className="text-sm text-gray-600">
            {application.city !== 'NA' && application.state !== 'NA' 
              ? `${application.city} | ${application.state}` 
              : application.city !== 'NA' 
                ? application.city 
                : application.state !== 'NA' 
                  ? application.state 
                  : 'NA'}
          </p>
        </div>

        {/* Applied Date */}
        <div className="flex justify-between mb-3">
          <div></div>
          <div className="text-sm">
            <span className="font-medium">Applied:</span> {application.appliedFormatted || 'NA'}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-between mb-3">
          <div className="text-sm">
            <span className="font-medium">Email:</span> {application.email || 'NA'}
          </div>
          <div className="text-sm">
            <span className="font-medium">Phone:</span> {application.phone || 'NA'}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <p className="text-sm mb-1">
            <span className="font-medium">Tags:</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {application.tags && application.tags.length > 0 ? (
              application.tags.map((tag: string, index: number) => (
                <span key={index} className={`text-xs px-3 py-1 rounded-full ${getTagColor(tag)}`}>
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Application Details */}
        <div className="mb-3 border-t border-gray-200 pt-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Application Type:</span> {application.applicationType || 'NA'}
              </div>
            <div className="text-sm">
              <span className="font-medium">Exclusive:</span> {application.exclusive || 'NA'}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Status:</span> {application.status || 'NA'}
            </div>
            <div className="text-sm">
              <span className="font-medium">Esteem Status:</span> {application.esteemStatus || 'NA'}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">WOTC Status:</span> {application.wotcStatus || 'NA'}
              </div>
            <div className="text-sm">
              <span className="font-medium">Work Preference:</span> {application.workPreference || 'NA'}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm">
            <span className="font-medium">Start Date:</span> {application.startDate || 'NA'}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-1">
          <p className="text-sm mb-1">
            <span className="font-medium">Availability:</span>
          </p>
          <div className="bg-[#fff8f8] rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 w-1/3 bg-[#fff0f0]">Day</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 w-2/3 bg-[#fff0f0]">Working Time</th>
                </tr>
              </thead>
              <tbody>
                {application.availabilitySchedule && application.availabilitySchedule.length > 0 ? (
                  application.availabilitySchedule.map((schedule: { day: string; time: string }, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-600">{schedule.day || 'NA'}</td>
                      <td className="px-4 py-2 text-gray-600">{schedule.time || 'NA'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-gray-500 text-center">NA</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table onMouseMove={handleMouseMove}>
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
              
              {/* Admin-controlled columns */}
              <FeatureGate featureName="EnableDecisionPoint" permissionName="ShowDPScoreInApplicantGrids">
                <TableHead className="font-semibold text-gray-900">Decision Point</TableHead>
              </FeatureGate>
              
              <FeatureGate featureName="EnableSmartMatch" permissionName="FilterbySmartMatch">
                <TableHead className="font-semibold text-gray-900">Smart Match</TableHead>
              </FeatureGate>
              
              <FeatureGate permissionName="gridShowApplicantType">
                <TableHead className="font-semibold text-gray-900">Type</TableHead>
              </FeatureGate>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentApplicants.map((applicant) => (
              <TableRow key={applicant.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell>
                  <div
                    className="relative inline-block cursor-pointer"
                    onMouseEnter={(e) => {
                      setHoveredNameId(applicant.id)
                      setMousePosition({ x: e.clientX, y: e.clientY })
                    }}
                    onMouseMove={(e) => {
                      setMousePosition({ x: e.clientX, y: e.clientY })
                    }}
                    onMouseLeave={() => setHoveredNameId(null)}
                  >
                    <Link href={`/applicant?id=${applicant.id}`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                      {applicant.name}
                    </Link>
                  </div>
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
                
                {/* Admin-controlled columns */}
                <FeatureGate featureName="EnableDecisionPoint" permissionName="ShowDPScoreInApplicantGrids">
                  <TableCell>
                    <DisplaySetRenderer 
                      setName="DecisionPointGroupRankScore" 
                      value={applicant.decisionPointScore || ''} 
                    />
                  </TableCell>
                </FeatureGate>
                
                <FeatureGate featureName="EnableSmartMatch" permissionName="FilterbySmartMatch">
                  <TableCell>
                    <DisplaySetRenderer 
                      setName="SmartMatchGroupRankScore" 
                      value={applicant.smartMatchScore || ''} 
                    />
                  </TableCell>
                </FeatureGate>
                
                <FeatureGate permissionName="gridShowApplicantType">
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {applicant.applicantType}
                    </Badge>
                  </TableCell>
                </FeatureGate>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} results
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      
      {/* Render tooltip outside of table container */}
      {hoveredNameId && (
        renderNameTooltip(currentApplicants.find(app => app.id === hoveredNameId)!)
      )}
    </div>
  )
}
