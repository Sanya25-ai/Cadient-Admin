'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronUp, X, Plus } from 'lucide-react'

// Mock data for questions
const questions = [
  {
    id: 1,
    number: 1001,
    title: 'Job Code',
    type: 'Text (Short Answer)',
    content: 'Job Code',
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 2,
    number: 1002,
    title: 'Offer Date',
    type: 'Date',
    content: 'Offer Date',
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 3,
    number: 1003,
    title: 'GENERAL Employee ID',
    type: 'Text (Short Answer)',
    content: 'Employee ID',
    hasStateSpecific: true,
    hasJobSpecific: true
  },
  {
    id: 4,
    number: 1004,
    title: 'Offer Type',
    type: 'Multiple Choice',
    content: 'Please select the offer type that best describes your offer:',
    options: [
      'Contingent Modification',
      'Offer',
      'Offer Modification'
    ],
    hasStateSpecific: true,
    hasJobSpecific: true
  },
  {
    id: 5,
    number: 1005,
    title: 'Offered By',
    type: 'Text (Short Answer)',
    content: 'Offered By',
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 6,
    number: 1006,
    title: 'Start Date',
    type: 'Date',
    content: 'Start Date',
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 7,
    number: 1007,
    title: 'PTOF',
    type: 'Multiple Choice',
    content: 'Please select the employment type that best describes your offer:',
    options: [
      'Full Time',
      'Part Time',
      'Per Diem'
    ],
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 8,
    number: 1008,
    title: 'Reports To',
    type: 'Text (Short Answer)',
    content: 'Reports To',
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 9,
    number: 1009,
    title: 'Base Pay',
    type: 'Text',
    content: 'Any other response',
    hasStateSpecific: false,
    hasJobSpecific: false
  },
  {
    id: 10,
    number: 1010,
    title: 'GENERAL Bonus or Incentive Pay Terms',
    type: 'Text (Short Answer)',
    content: 'Bonus or Incentive Pay Terms',
    hasStateSpecific: true,
    hasJobSpecific: true
  },
  {
    id: 11,
    number: 1011,
    title: 'Pay Cycle',
    type: 'Text',
    content: 'Annual',
    hasStateSpecific: true,
    hasJobSpecific: true
  },
  {
    id: 12,
    number: 1012,
    title: 'GENERAL Pay Period',
    type: 'Text (Short Answer)',
    content: 'Pay Period',
    hasStateSpecific: true,
    hasJobSpecific: true
  },
  {
    id: 13,
    number: 1013,
    title: 'Orientation Date',
    type: 'Date',
    content: 'Orientation Date',
    hasStateSpecific: true,
    hasJobSpecific: true
  }
]

export default function ReviewQuestionsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])
  const [showStateModal, setShowStateModal] = useState(false)
  const [showJobCodeModal, setShowJobCodeModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [jobCodeText, setJobCodeText] = useState('')

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const handleMakeStateSpecific = (questionId: number) => {
    setSelectedQuestion(questionId)
    setShowStateModal(true)
  }

  const handleMakeJobSpecific = (questionId: number) => {
    setSelectedQuestion(questionId)
    setShowJobCodeModal(true)
  }

  const handleAddQuestion = () => {
    // Navigate back to add questions
    router.push(`/admin-console/workflow-script-library/${params.id}/copy/questions`)
  }

  const handleNext = () => {
    // Navigate to preview step
    router.push(`/admin-console/workflow-script-library/${params.id}/copy/preview`)
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
              <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center font-medium">
                ✓
              </div>
              <span className="text-green-600">Add Questions</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 text-white rounded flex items-center justify-center font-medium">
                4
              </div>
              <span className="font-medium text-orange-600">Review Questions</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Questions</h2>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              <Button 
                onClick={handleAddQuestion}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                ➕ Add Existing Questions
              </Button>
              <Button 
                onClick={handleAddQuestion}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                ➕ Add New Questions
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="border border-gray-300 rounded-lg">
                {/* Question Header */}
                <div 
                  className="flex items-center justify-between p-4 bg-gray-100 cursor-pointer hover:bg-gray-200"
                  onClick={() => toggleQuestion(question.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">
                      {question.number}. {question.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      {question.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs w-8 h-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle increment question number
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs w-8 h-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle decrement question number
                      }}
                    >
                      <span className="text-lg font-bold">−</span>
                    </Button>
                    {expandedQuestions.includes(question.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Question Content */}
                {expandedQuestions.includes(question.id) && (
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question:
                        </label>
                        <div className="text-gray-900">{question.content}</div>
                      </div>

                      {question.options && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Options:
                          </label>
                          <ul className="list-disc list-inside text-gray-900 space-y-1">
                            {question.options.map((option, index) => (
                              <li key={index}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons - Only show for certain questions */}
                      {(question.hasStateSpecific || question.hasJobSpecific) && (
                        <div className="flex gap-2 pt-2">
                          {question.hasStateSpecific && (
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={() => handleMakeStateSpecific(question.id)}
                            >
                              Make Position State Specific
                            </Button>
                          )}
                          {question.hasJobSpecific && (
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={() => handleMakeJobSpecific(question.id)}
                            >
                              Make Job Code Specific
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Step */}
          <div className="pt-6">
            <div className="text-sm text-gray-600 mb-4">
              Next Step: <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Preview</span>
            </div>
            <Button 
              onClick={handleNext}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Next Step
            </Button>
          </div>

          {/* Back Button */}
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

      {/* State Specific Modal */}
      <Dialog open={showStateModal} onOpenChange={setShowStateModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Edit Question States
              <Button variant="ghost" size="sm" onClick={() => setShowStateModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-gray-900 mb-2">Please select the specific state or states:</h3>
              
              {/* Countries and States */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-orange-600 font-medium mb-2">United States of America ▼</h4>
                </div>
                
                <div>
                  <h4 className="text-orange-600 font-medium mb-2">Australia ▼</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Australian Capital Territory</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>New South Wales</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Northern Territory</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Queensland</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>South Australia</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Tasmania</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Victoria</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Western Australia</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-orange-600 font-medium mb-2">Canada ▼</h4>
                </div>
                
                <div>
                  <h4 className="text-orange-600 font-medium mb-2">United Kingdom of Great Britain and Northern Ireland ▼</h4>
                </div>
                
                <div>
                  <h4 className="text-orange-600 font-medium mb-2">Republic of Ireland ▼</h4>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <strong>Note:</strong> Only data from expanded country selectors will be added or retained when saved.
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Save
              </Button>
              <Button variant="outline" onClick={() => setShowStateModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Code Specific Modal */}
      <Dialog open={showJobCodeModal} onOpenChange={setShowJobCodeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Make Job Code Specific
              <Button variant="ghost" size="sm" onClick={() => setShowJobCodeModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-orange-100 p-3 rounded">
              <span className="text-orange-800 font-medium">▶ Make Job Code Specific</span>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">
                Please enter the job codes for this question.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                (separate multiple entries with a comma)
              </p>
              
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Code Specific:
              </label>
              <Textarea
                value={jobCodeText}
                onChange={(e) => setJobCodeText(e.target.value)}
                className="w-full h-32 resize-none"
                placeholder="Enter job codes separated by commas..."
              />
            </div>

            <div className="flex gap-2">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Save
              </Button>
              <Button variant="outline" onClick={() => setShowJobCodeModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
