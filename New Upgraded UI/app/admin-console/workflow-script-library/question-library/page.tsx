'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Plus,
  Filter,
  FileText,
  X
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const sampleQuestions = [
  {
    id: 1,
    status: "Active",
    question: "Orientation Date",
    type: "Date",
    key: "8",
    category: "Offer Letter",
    modified: "9/15/2020"
  }
]

export default function QuestionLibraryPage() {
  const [selectedStatus, setSelectedStatus] = useState('Active')
  const [selectedKeyword, setSelectedKeyword] = useState('')
  const [selectedQuestionType, setSelectedQuestionType] = useState('')
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false)
  const [isQuestionTypeModalOpen, setIsQuestionTypeModalOpen] = useState(false)

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-[#EE5A37]" />
            <h1 className="text-2xl font-semibold text-gray-900">Question Library</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/admin-console/workflow-script-library/question-library/new">
              <Button className="bg-[#F5A623] hover:bg-[#E09612] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Question
              </Button>
            </Link>
            <Link href="/admin-console/workflow-script-library">
              <Button variant="outline" className="border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-white">
                <FileText className="h-4 w-4 mr-2" />
                Script Library
              </Button>
            </Link>
          </div>
        </div>

        {/* Details Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-medium mb-2">Details</h2>
          <p className="text-sm text-gray-600">
            There are <span className="font-semibold">1</span> questions in the Question Library that meet the following criteria:
          </p>
          <ul className="mt-2 text-sm text-gray-600">
            <li>• <span className="font-medium">Status:</span> {selectedStatus}</li>
            {selectedKeyword && (
              <li>• <span className="font-medium">Keyword:</span> {selectedKeyword}</li>
            )}
            {selectedQuestionType && (
              <li>• <span className="font-medium">Type:</span> {selectedQuestionType}</li>
            )}
          </ul>
        </div>

        {/* Search the Library Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Search the Library</h3>
          <div className="flex gap-4 flex-wrap">
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
                  <DialogTitle>By Question Text:</DialogTitle>
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
                    placeholder=""
                    value={selectedKeyword}
                    onChange={(e) => setSelectedKeyword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A37]"
                  />
                  <div className="text-sm text-gray-600 mb-4">By Question Key:</div>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EE5A37]"
                  />
                  <div className="flex justify-end">
                    <Button
                      className="bg-[#EE5A37] hover:bg-[#D54E2A] text-white rounded-full px-6"
                      onClick={() => setIsKeywordModalOpen(false)}
                    >
                      →
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
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      All Statuses
                    </Button>
                    <Button
                      className="bg-orange-500 text-white rounded-full px-4 py-2"
                    >
                      Active
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Archived
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* By Question Type Modal */}
            <Dialog open={isQuestionTypeModalOpen} onOpenChange={setIsQuestionTypeModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5A623] hover:bg-[#E09612] text-white flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  By Question Type
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader className="flex flex-row items-center justify-between">
                  <DialogTitle>By Question Type:</DialogTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsQuestionTypeModalOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      className="bg-orange-500 text-white rounded-full px-4 py-2"
                    >
                      All Types
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Date
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Formatted Input
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Multiple Choice
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Numeric
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Page Break (System)
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Statement
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Text
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Time
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
                    >
                      Yes/No
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Results Table */}
        <div className="border border-gray-200 rounded-lg">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Results: 1-1 of 1
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 1</option>
              </select>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      <Link href={`/admin-console/workflow-script-library/question-library/${question.id}`} className="text-[#EE5A37] hover:underline">
                        {question.question}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {question.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {question.key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {question.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {question.modified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
