'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for existing questions
const existingQuestions = [
  {
    id: 1,
    status: 'active',
    question: 'Orientation Date',
    type: 'Date',
    key: '8',
    category: 'Offer Letter',
    modified: '9/15/2020'
  }
]

export default function AddQuestionsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showKeywordModal, setShowKeywordModal] = useState(false)
  const [keywordSearch, setKeywordSearch] = useState('')

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const handleAddQuestions = () => {
    // Add selected questions and navigate to review
    console.log('Adding questions:', selectedQuestions)
    router.push(`/admin-console/workflow-script-library/${params.id}/copy/review`)
  }

  const handleReviewQuestions = () => {
    // Navigate to review step
    router.push(`/admin-console/workflow-script-library/${params.id}/copy/review`)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📋</span>
            <h1 className="text-2xl font-semibold text-gray-900">Baseline Offer Letter Script</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 text-sm mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center font-medium">
                ✓
              </div>
              <span className="text-green-600">Choose Site</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center font-medium">
                ✓
              </div>
              <span className="text-green-600">Enter Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 text-white rounded flex items-center justify-center font-medium">
                3
              </div>
              <span className="font-medium text-orange-600">Add Questions</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-medium">
                4
              </div>
              <span className="text-gray-500">Review Questions</span>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Add Existing Questions</h2>
            <p className="text-gray-600 mb-4">
              There are <strong>1</strong> questions in the Question Library that meet the following criteria:
            </p>
            <ul className="text-sm text-gray-700 mb-6">
              <li>• <strong>Status:</strong> Active</li>
            </ul>
          </div>



          {/* Add Questions Button */}
          <div className="mb-4">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              onClick={handleAddQuestions}
            >
              ➕ Add Questions
            </Button>
          </div>

          {/* Search the Library */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Search the Library</h3>
            <div className="flex gap-3 mb-6">
              <Button 
                onClick={() => setShowKeywordModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                🔍 By Keyword
              </Button>
              <Button 
                onClick={() => setShowStatusModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                📊 By Status
              </Button>
              <Button 
                onClick={() => setShowQuestionTypeModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                ❓ By Question Type:
              </Button>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Results: 1-1 of 1
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 1</option>
              </select>
            </div>
          </div>

          {/* Questions Table */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 w-16 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900">Question</TableHead>
                  <TableHead className="font-semibold text-gray-900">Type</TableHead>
                  <TableHead className="font-semibold text-gray-900">Key</TableHead>
                  <TableHead className="font-semibold text-gray-900">Category</TableHead>
                  <TableHead className="font-semibold text-gray-900">Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {existingQuestions.map((question) => (
                  <TableRow key={question.id} className="border-b border-gray-200">
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(question.id)}
                        onChange={() => handleQuestionSelect(question.id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 py-3">
                      {question.question}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {question.type}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {question.key}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {question.category}
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      {question.modified}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-gray-600">
              Next Step: <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Review Questions</span>
            </div>
            <Button 
              onClick={handleReviewQuestions}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Review Questions
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
          </div>
        </div>
      </div>

      {/* Modal Dialogs */}
      {/* By Question Type Modal */}
      <Dialog open={showQuestionTypeModal} onOpenChange={setShowQuestionTypeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              By Question Type:
              <Button variant="ghost" size="sm" onClick={() => setShowQuestionTypeModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-orange-100 text-orange-800 hover:bg-orange-200">All Types</Button>
              <Button size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Date</Button>
              <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200">Formatted Input</Button>
              <Button size="sm" className="bg-purple-100 text-purple-800 hover:bg-purple-200">Multiple Choice</Button>
              <Button size="sm" className="bg-red-100 text-red-800 hover:bg-red-200">Numeric</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Page Break (System)</Button>
              <Button size="sm" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Statement</Button>
              <Button size="sm" className="bg-pink-100 text-pink-800 hover:bg-pink-200">Text</Button>
              <Button size="sm" className="bg-teal-100 text-teal-800 hover:bg-teal-200">Time</Button>
              <Button size="sm" className="bg-gray-100 text-gray-800 hover:bg-gray-200">Yes/No</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* By Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              By Status:
              <Button variant="ghost" size="sm" onClick={() => setShowStatusModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200">
              Active
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* By Keyword Modal */}
      <Dialog open={showKeywordModal} onOpenChange={setShowKeywordModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              By Question Text:
              <Button variant="ghost" size="sm" onClick={() => setShowKeywordModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              placeholder="Enter search text..."
              className="w-full"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
              🔍 Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
