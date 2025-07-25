"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { useState } from 'react'

// Mock data matching the screenshot
const importStatusData = [
  {
    id: '1',
    fileName: 'PEM-Candidate_Database_FULL.11.4.14.PART4.xml',
    status: 'Completed',
    userName: 'NAVEEN_OMEGA',
    recordCount: 1,
    failedCount: 0,
    requestedOn: '05/26/2025 06:56:34',
    completedOn: '05/26/2025 06:56:35'
  },
  {
    id: '2',
    fileName: 'PEM-Candidate_Database_FULL.11.4.14.PART4.xml',
    status: 'Completed',
    userName: 'NAVEEN_OMEGA',
    recordCount: 1,
    failedCount: 1,
    requestedOn: '05/26/2025 06:54:41',
    completedOn: '05/26/2025 06:54:41'
  },
  {
    id: '3',
    fileName: 'PEM-Candidate_Database_FULL.11.4.14.PART4.xml',
    status: 'Completed',
    userName: 'NAVEEN_OMEGA',
    recordCount: 1,
    failedCount: 0,
    requestedOn: '05/26/2025 06:45:54',
    completedOn: '05/26/2025 06:45:55'
  }
]

export default function CandidateImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
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
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Candidate Import</h1>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            This tool enables users to upload XML files, which contain candidate data and resume information. New general apply candidates are created and their resumes parsed for keyword searches. Data should comply with Cadient Talent XML standards and file size. The uploaded feed is processed at a scheduled time.
          </p>
        </div>

        {/* Upload Form */}
        <div className="mb-8 space-y-4">
          {/* Select Application */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Select an Application:
            </label>
            <Select>
              <SelectTrigger className="w-full max-w-2xl">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="canada-req">Sales Demo Retail Omega Canada Req External Seeker</SelectItem>
                <SelectItem value="req-site">Sales Demo Retail Omega Req External Seeker Site</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Choose File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Choose Candidate Import file:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".xml,.csv"
                className="block w-full max-w-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>
          </div>

          {/* Upload Button */}
          <div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              Upload
            </Button>
          </div>
        </div>

        {/* Candidate Import Status Section */}
        <div className="border border-gray-300 rounded-lg">
          {/* Status Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Candidate Import Status</h2>
              <button className="text-orange-600 text-sm hover:underline">
                🔄 Click Here To Refresh Candidate Import Status
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="px-6 py-3 bg-gray-100 border-b border-gray-300">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Results: 1-3 of 3</span>
              <div className="flex items-center gap-2">
                <span>Page:</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>1 of 1</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">File Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">User Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">Record Count</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">Failed Count</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">Requested On</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">Completed On</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-left px-6 py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importStatusData.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-200">
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.fileName}</TableCell>
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.status}</TableCell>
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.userName}</TableCell>
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.recordCount}</TableCell>
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.failedCount}</TableCell>
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.requestedOn}</TableCell>
                    <TableCell className="px-6 py-3 text-sm text-gray-900">{item.completedOn}</TableCell>
                    <TableCell className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-blue-600 hover:underline mr-4">
                          📥 Download
                        </button>
                        <button className="text-sm text-red-600 hover:underline">
                          🗑️ Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
