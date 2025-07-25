'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FeatureGate, useAdminAccess } from '@/components/admin/feature-gate'
import { DisplaySetRenderer, DisplaySetSelect, useDisplaySet } from '@/components/admin/display-set-renderer'
import { adminConfigClient } from '@/lib/admin/config-client'
import { Search, Filter, FileText, Star, Circle, Plus } from 'lucide-react'

interface Applicant {
  id: string
  name: string
  email: string
  position: string
  location: string
  appliedDate: string
  status: string
  decisionPointScore?: string
  smartMatchScore?: string
  smartGroupScore?: string
  tags?: string[]
  applicantType?: string
}

interface EnhancedTopApplicantsTableProps {
  applicants: Applicant[]
}

export default function EnhancedTopApplicantsTable({ applicants }: EnhancedTopApplicantsTableProps) {
  const [filteredApplicants, setFilteredApplicants] = useState(applicants)
  const [filters, setFilters] = useState({
    decisionPointScore: 'all',
    smartMatchScore: 'all',
    smartGroupScore: 'all',
    status: 'all',
    location: '',
    dateRange: 'all'
  })
  const [visibleColumns, setVisibleColumns] = useState({
    applicantType: true,
    name: true,
    appliedDate: true,
    position: true,
    location: true,
    status: true,
    decisionPointScore: false,
    smartMatchScore: false,
    smartGroupScore: false,
    tags: false
  })

  // Admin access hooks
  const { hasAccess: canFilterByDecisionPoint } = useAdminAccess('EnableDecisionPoint', 'FilterByDecisionPoint')
  const { hasAccess: canFilterBySmartMatch } = useAdminAccess('EnableSmartMatch', 'FilterbySmartMatch')
  const { hasAccess: canShowDPScore } = useAdminAccess(undefined, 'ShowDPScoreInApplicantGrids')
  const { hasAccess: canViewTags } = useAdminAccess(undefined, 'ViewTags')

  // Display set hooks
  const { values: dpScoreValues } = useDisplaySet('DecisionPointGroupRankScore')
  const { values: smartMatchValues } = useDisplaySet('SmartMatchGroupRankScore')
  const { values: smartGroupValues } = useDisplaySet('SmartGroupRankScore')

  // Update visible columns based on permissions
  useEffect(() => {
    async function updateColumnVisibility() {
      const config = await adminConfigClient.getAdminConfig()
      
      setVisibleColumns(prev => ({
        ...prev,
        applicantType: config.permissions['gridShowApplicantType'] || false,
        name: config.permissions['gridShowApplicantName'] || true,
        appliedDate: config.permissions['gridShowAppliedDate'] || true,
        position: config.permissions['gridShowPosition'] || true,
        location: config.permissions['gridShowLocation'] || true,
        status: config.permissions['gridShowApplicationStatus'] || true,
        decisionPointScore: canShowDPScore,
        smartMatchScore: canFilterBySmartMatch,
        smartGroupScore: canFilterBySmartMatch,
        tags: canViewTags
      }))
    }

    updateColumnVisibility()
  }, [canShowDPScore, canFilterBySmartMatch, canViewTags])

  // Filter applicants based on current filters
  useEffect(() => {
    let filtered = [...applicants]

    if (filters.decisionPointScore && filters.decisionPointScore !== 'all') {
      filtered = filtered.filter(app => app.decisionPointScore === filters.decisionPointScore)
    }

    if (filters.smartMatchScore && filters.smartMatchScore !== 'all') {
      filtered = filtered.filter(app => app.smartMatchScore === filters.smartMatchScore)
    }

    if (filters.smartGroupScore && filters.smartGroupScore !== 'all') {
      filtered = filtered.filter(app => app.smartGroupScore === filters.smartGroupScore)
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status)
    }

    if (filters.location) {
      filtered = filtered.filter(app => 
        app.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.dateRange && filters.dateRange !== 'all') {
      const days = parseInt(filters.dateRange)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      
      filtered = filtered.filter(app => {
        const appliedDate = new Date(app.appliedDate)
        return appliedDate >= cutoffDate
      })
    }

    setFilteredApplicants(filtered)
  }, [applicants, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      decisionPointScore: 'all',
      smartMatchScore: 'all',
      smartGroupScore: 'all',
      status: 'all',
      location: '',
      dateRange: 'all'
    })
  }

  const exportApplicants = async () => {
    const exportLimit = await adminConfigClient.getSystemVariable('ExportApplicantLimit')
    const limit = exportLimit ? parseInt(exportLimit) : 1000
    
    const dataToExport = filteredApplicants.slice(0, limit)
    
    // Create CSV content
    const headers = Object.keys(visibleColumns)
      .filter(key => visibleColumns[key as keyof typeof visibleColumns])
      .join(',')
    
    const csvContent = [
      headers,
      ...dataToExport.map(app => 
        Object.keys(visibleColumns)
          .filter(key => visibleColumns[key as keyof typeof visibleColumns])
          .map(key => app[key as keyof Applicant] || '')
          .join(',')
      )
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `top-applicants-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Decision Point Score Filter */}
          <FeatureGate featureName="EnableDecisionPoint" permissionName="FilterByDecisionPoint">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Circle className="h-3 w-3" />
                Decision Point Score
              </label>
              <DisplaySetSelect
                setName="DecisionPointGroupRankScore"
                value={filters.decisionPointScore}
                onChange={(value) => handleFilterChange('decisionPointScore', value)}
                placeholder="All Scores"
                className="w-full"
              />
            </div>
          </FeatureGate>

          {/* Smart Match Score Filter */}
          <FeatureGate featureName="EnableSmartMatch" permissionName="FilterbySmartMatch">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Circle className="h-3 w-3" />
                Smart Match Score
              </label>
              <DisplaySetSelect
                setName="SmartMatchGroupRankScore"
                value={filters.smartMatchScore}
                onChange={(value) => handleFilterChange('smartMatchScore', value)}
                placeholder="All Matches"
                className="w-full"
              />
            </div>
          </FeatureGate>

          {/* Smart Group Score Filter */}
          <FeatureGate featureName="EnableSmartMatch">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Star className="h-3 w-3" />
                Smart Group Score
              </label>
              <DisplaySetSelect
                setName="SmartGroupRankScore"
                value={filters.smartGroupScore}
                onChange={(value) => handleFilterChange('smartGroupScore', value)}
                placeholder="All Groups"
                className="w-full"
              />
            </div>
          </FeatureGate>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              placeholder="Filter by location..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Applied Within</label>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {filteredApplicants.length} of {applicants.length} applicants
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportApplicants}>
            <FileText className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.applicantType && (
                <TableHead>Type</TableHead>
              )}
              {visibleColumns.name && (
                <TableHead>Name</TableHead>
              )}
              {visibleColumns.position && (
                <TableHead>Position</TableHead>
              )}
              {visibleColumns.location && (
                <TableHead>Location</TableHead>
              )}
              {visibleColumns.appliedDate && (
                <TableHead>Applied Date</TableHead>
              )}
              {visibleColumns.status && (
                <TableHead>Status</TableHead>
              )}
              {visibleColumns.decisionPointScore && (
                <TableHead className="flex items-center gap-1">
                  <Circle className="h-3 w-3" />
                  DP Score
                </TableHead>
              )}
              {visibleColumns.smartMatchScore && (
                <TableHead className="flex items-center gap-1">
                  <Circle className="h-3 w-3" />
                  Smart Match
                </TableHead>
              )}
              {visibleColumns.smartGroupScore && (
                <TableHead className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Smart Group
                </TableHead>
              )}
              {visibleColumns.tags && (
                <TableHead>Tags</TableHead>
              )}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id}>
                {visibleColumns.applicantType && (
                  <TableCell>
                    <Badge variant="outline">{applicant.applicantType || 'Standard'}</Badge>
                  </TableCell>
                )}
                {visibleColumns.name && (
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                )}
                {visibleColumns.position && (
                  <TableCell>{applicant.position}</TableCell>
                )}
                {visibleColumns.location && (
                  <TableCell>{applicant.location}</TableCell>
                )}
                {visibleColumns.appliedDate && (
                  <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                )}
                {visibleColumns.status && (
                  <TableCell>
                    <Badge variant={applicant.status === 'Hired' ? 'default' : 'secondary'}>
                      {applicant.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.decisionPointScore && applicant.decisionPointScore && (
                  <TableCell>
                    <DisplaySetRenderer
                      setName="DecisionPointGroupRankScore"
                      value={applicant.decisionPointScore}
                      showIcon={true}
                    />
                  </TableCell>
                )}
                {visibleColumns.smartMatchScore && applicant.smartMatchScore && (
                  <TableCell>
                    <DisplaySetRenderer
                      setName="SmartMatchGroupRankScore"
                      value={applicant.smartMatchScore}
                      showIcon={true}
                    />
                  </TableCell>
                )}
                {visibleColumns.smartGroupScore && applicant.smartGroupScore && (
                  <TableCell>
                    <DisplaySetRenderer
                      setName="SmartGroupRankScore"
                      value={applicant.smartGroupScore}
                      showIcon={true}
                    />
                  </TableCell>
                )}
                {visibleColumns.tags && (
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {applicant.tags?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredApplicants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No applicants match the current filters.
        </div>
      )}
    </div>
  )
}
