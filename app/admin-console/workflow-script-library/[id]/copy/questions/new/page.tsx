'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddNewQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    question: '',
    popupTooltip: '',
    additionalNotes: '',
    isZoomApplicable: 'no',
    category: '',
    questionType: ''
  })

  const handleAddQuestion = () => {
    // Add the new question and navigate to review
    console.log('Adding new question:', formData)
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
      <div className="max-w-4xl mx-auto p-8 pt-6">
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
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-medium">
                5
              </div>
              <span className="text-gray-500">Scoring</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Enter Question Details</h1>
            <p className="text-gray-600 mb-6">
              Please enter the following information in order to add your question.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Question:
              </label>
              <Textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full h-24 resize-none"
                placeholder="Enter your question here..."
              />
            </div>

            {/* Popup Tooltip */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Popup tooltip text for this question:
              </label>
              <Textarea
                value={formData.popupTooltip}
                onChange={(e) => setFormData({ ...formData, popupTooltip: e.target.value })}
                className="w-full h-24 resize-none"
                placeholder="Enter tooltip text here..."
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Additional notes for this question:
              </label>
              <Textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full h-24 resize-none"
                placeholder="Enter additional notes here..."
              />
            </div>

            {/* Zoom Applicable */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                * Is zoom applicable for the image in this question?
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="zoom-yes"
                    name="zoomApplicable"
                    value="yes"
                    checked={formData.isZoomApplicable === 'yes'}
                    onChange={(e) => setFormData({ ...formData, isZoomApplicable: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="zoom-yes" className="text-sm text-gray-700">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="zoom-no"
                    name="zoomApplicable"
                    value="no"
                    checked={formData.isZoomApplicable === 'no'}
                    onChange={(e) => setFormData({ ...formData, isZoomApplicable: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="zoom-no" className="text-sm text-gray-700">No</label>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Category:
              </label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="choose one..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offer-letter">Offer Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Question Type:
              </label>
              <Select value={formData.questionType} onValueChange={(value) => setFormData({ ...formData, questionType: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="choose one..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="formatted-input">Formatted Input</SelectItem>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="numeric">Numeric</SelectItem>
                  <SelectItem value="page-break">Page Break (System)</SelectItem>
                  <SelectItem value="statement">Statement</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                  <SelectItem value="yes-no">Yes/No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Question Button */}
          <div className="pt-6">
            <Button 
              onClick={handleAddQuestion}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
            >
              ➕ Add Question
            </Button>
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
    </div>
  )
}
