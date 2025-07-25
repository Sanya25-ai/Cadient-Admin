'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Filter, X } from 'lucide-react'

// Mock data matching the HMC interface
const workflowScriptsData = [
  {
    id: '1',
    status: 'active',
    scriptName: 'Baseline Offer Letter',
    siteName: 'KTMD NonReq External',
    description: 'Baseline Offer Letter',
    category: 'Offer',
    modified: '4/15/2025',
    details: {
      site: 'KTMD NonReq External',
      numberOfQuestions: 12
    }
  }
]

export default function WorkflowScriptLibraryPage() {
  const [selectedStatus, setSelectedStatus] = useState('Active')
  const [selectedKeyword, setSelectedKeyword] = useState('')
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Statuses', color: 'bg-gray-100 text-gray-800' },
    { value: 'active', label: 'Active', color: 'bg-orange-500 text-white' },
    { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-800' },
    { value: 'deprecated', label: 'Deprecated', color: 'bg-gray-100 text-gray-800' },
    { value: 'incomplete', label: 'Incomplete', color: 'bg-gray-100 text-gray-800' }
  ]

  return (
    <TooltipProvider>
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/admin-console/hiring-behavior">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <h1 className="text-2xl font-semibold text-[#EE5A37]">Workflow Scripts</h1>
            </div>
            <Link href="/admin-console/workflow-script-library/question-library">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                ❓ Question Library
              </Button>
            </Link>
          </div>

          {/* Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <p className="text-sm text-gray-700">
              There are <strong>0</strong> scripts in the Workflow Script Library that meet the following criteria:
            </p>
            <ul className="mt-2 ml-4">
              <li className="text-sm text-gray-700">• <strong>Status:</strong> {selectedStatus}</li>
              {selectedKeyword && (
                <li className="text-sm text-gray-700">• <strong>Name:</strong> {selectedKeyword}</li>
              )}
            </ul>
          </div>

          {/* Search the Library Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search the Library</h3>
            <div className="flex gap-4">
              {/* By Keyword Modal */}
              <Dialog open={isKeywordModalOpen} onOpenChange={setIsKeywordModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#F5A623] hover:bg-[#E09612] text-white flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    By Keyword
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>By Keyword:</DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsKeywordModalOpen(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogHeader>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter keyword..."
                      value={selectedKeyword}
                      onChange={(e) => setSelectedKeyword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A37]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsKeywordModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#EE5A37] hover:bg-[#D54E2A] text-white"
                        onClick={() => setIsKeywordModalOpen(false)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* By Status Modal */}
              <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#F5A623] hover:bg-[#E09612] text-white flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    By Status
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>By Status:</DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsStatusModalOpen(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={selectedStatus === option.label ? "default" : "outline"}
                          className={`${
                            selectedStatus === option.label 
                              ? option.color 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          } rounded-full px-4 py-2`}
                          onClick={() => setSelectedStatus(option.label)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsStatusModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#EE5A37] hover:bg-[#D54E2A] text-white"
                        onClick={() => setIsStatusModalOpen(false)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Scripts Table */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900 w-16 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-1/5">Script Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-1/5">Site Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-1/4">Description</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-1/6">Category</TableHead>
                  <TableHead className="font-semibold text-gray-900 w-1/6">Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflowScriptsData.map((script) => (
                  <TableRow key={script.id} className="border-b border-gray-200">
                    <TableCell className="text-center py-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 py-3">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link 
                            href={`/admin-console/workflow-script-library/${script.id}`}
                            className="hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-200"
                          >
                            {script.scriptName}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm p-4 bg-white border border-gray-200 shadow-lg">
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-900">{script.scriptName}</div>
                            <div className="text-sm text-gray-600">
                              <div><strong>Site:</strong> {script.details.site}</div>
                              <div><strong>Number of Questions:</strong> {script.details.numberOfQuestions}</div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {script.siteName}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {script.description}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {script.category}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {script.modified}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
