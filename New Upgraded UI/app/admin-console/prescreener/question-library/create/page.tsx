'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateQuestionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    question: '',
    popupTooltip: '',
    additionalNotes: '',
    zoomApplicable: 'no',
    objectMapping: '',
    category: '',
    makeEditable: 'no',
    questionType: '',
    isSensitive: 'no',
    questionContext: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    console.log('Saving question:', formData)
    // Here you would typically save to your backend
    router.push('/admin-console/prescreener?tab=questionLibrary')
  }

  const handleSaveAndAddAnother = () => {
    console.log('Saving question and adding another:', formData)
    // Here you would typically save to your backend
    // Reset form for next question
    setFormData({
      question: '',
      popupTooltip: '',
      additionalNotes: '',
      zoomApplicable: 'no',
      objectMapping: '',
      category: '',
      makeEditable: 'no',
      questionType: '',
      isSensitive: 'no',
      questionContext: ''
    })
  }

  const handleCancel = () => {
    router.push('/admin-console/prescreener?tab=questionLibrary')
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create a New Question</h1>
        </div>

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="text-orange-600">Overview</span> | 
          <span className="text-orange-600"> General Qualifying Prescreeners</span> | 
          <span className="text-orange-600"> Job Specific Prescreeners</span> | 
          <span className="text-gray-900"> Question Library</span>
        </div>

        {/* Form Section */}
        <div className="bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Enter Question Details</h2>
          <p className="text-sm text-gray-600 mb-6">Please enter the following information in order to add your question.</p>

          <div className="space-y-6">
            {/* Question Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Question:
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
                placeholder="Enter your question here..."
              />
            </div>

            {/* Popup Tooltip */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Popup tooltip text for this question:
              </label>
              <textarea
                value={formData.popupTooltip}
                onChange={(e) => handleInputChange('popupTooltip', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
                placeholder="Enter tooltip text..."
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Additional notes for this question:
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
                placeholder="Enter additional notes..."
              />
            </div>

            {/* Zoom Applicable */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Is zoom applicable for the image in this question?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="zoomApplicable"
                    value="yes"
                    checked={formData.zoomApplicable === 'yes'}
                    onChange={(e) => handleInputChange('zoomApplicable', e.target.value)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="zoomApplicable"
                    value="no"
                    checked={formData.zoomApplicable === 'no'}
                    onChange={(e) => handleInputChange('zoomApplicable', e.target.value)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Object Mapping */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Object Mapping:
              </label>
              <input
                type="text"
                value={formData.objectMapping}
                onChange={(e) => handleInputChange('objectMapping', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter object mapping..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Category:
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Choose one...</option>
                <option value="Accounting">Accounting</option>
                <option value="At Will">At Will</option>
                <option value="Availability">Availability</option>
                <option value="Criminal History">Criminal History</option>
                <option value="Driving History">Driving History</option>
                <option value="Drug">Drug</option>
                <option value="EEO Questions">EEO Questions</option>
                <option value="Education">Education</option>
                <option value="Eligibility">Eligibility</option>
                <option value="FCRA">FCRA</option>
                <option value="Finance">Finance</option>
                <option value="General">General</option>
                <option value="Government">Government</option>
                <option value="Hide In HMC">Hide In HMC</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Job Specific Questions">Job Specific Questions</option>
                <option value="NULL">NULL</option>
                <option value="Other">Other</option>
                <option value="PersonalInfo">PersonalInfo</option>
                <option value="Terms and Conditions">Terms and Conditions</option>
                <option value="WOTC">WOTC</option>
                <option value="Work History">Work History</option>
              </select>
            </div>

            {/* Make Candidate Responses Editable */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Make Candidate Responses to This Question Editable by Permission in the HMC?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="makeEditable"
                    value="yes"
                    checked={formData.makeEditable === 'yes'}
                    onChange={(e) => handleInputChange('makeEditable', e.target.value)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="makeEditable"
                    value="no"
                    checked={formData.makeEditable === 'no'}
                    onChange={(e) => handleInputChange('makeEditable', e.target.value)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Question Type:
              </label>
              <select
                value={formData.questionType}
                onChange={(e) => handleInputChange('questionType', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Choose one...</option>
                <option value="Date">Date</option>
                <option value="Formatted Input">Formatted Input</option>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="Numeric">Numeric</option>
                <option value="Page Break (System)">Page Break (System)</option>
                <option value="Statement">Statement</option>
                <option value="Text">Text</option>
                <option value="Time">Time</option>
                <option value="Yes/No">Yes/No</option>
              </select>
            </div>

            {/* Is Sensitive Data Question */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Is Sensitive Data Question?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isSensitive"
                    value="yes"
                    checked={formData.isSensitive === 'yes'}
                    onChange={(e) => handleInputChange('isSensitive', e.target.value)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isSensitive"
                    value="no"
                    checked={formData.isSensitive === 'no'}
                    onChange={(e) => handleInputChange('isSensitive', e.target.value)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Question Context */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Question Context:
              </label>
              <select
                value={formData.questionContext}
                onChange={(e) => handleInputChange('questionContext', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Choose one...</option>
                <option value="Application">Application</option>
                <option value="Assessment">Assessment</option>
                <option value="Interview">Interview</option>
                <option value="Background Check">Background Check</option>
                <option value="Reference Check">Reference Check</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={handleSaveAndAddAnother}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
            >
              Save and Add Another Question
            </Button>
            <Button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
