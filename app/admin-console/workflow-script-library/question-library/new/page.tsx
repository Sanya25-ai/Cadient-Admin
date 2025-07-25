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
import { FileText } from 'lucide-react'

export default function NewQuestionPage() {
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
    // Add the new question and navigate back to question library
    console.log('Adding new question:', formData)
    router.push('/admin-console/workflow-script-library/question-library')
  }

  const handleCancel = () => {
    // Navigate back to question library
    router.push('/admin-console/workflow-script-library/question-library')
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-[#EE5A37]" />
            <h1 className="text-2xl font-semibold text-gray-900">Add New Question</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter Question Details</h2>
            <p className="text-gray-600 mb-6">
              Please enter the following information in order to add your question to the Question Library.
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-6 border-t">
            <Button 
              onClick={handleAddQuestion}
              className="bg-[#F5A623] hover:bg-[#E09612] text-white flex items-center gap-2"
            >
              ➕ Add Question
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
