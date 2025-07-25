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

export default function EnterDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    scriptName: 'Baseline Offer Letter Script',
    category: 'Offer Letter',
    introductoryText: 'Baseline Offer Letter Script',
    showOptOut: 'yes'
  })

  const handleAddExistingQuestions = () => {
    // Navigate to add existing questions
    router.push(`/admin-console/workflow-script-library/${params.id}/copy/questions`)
  }

  const handleAddNewQuestions = () => {
    // Navigate to add new questions
    router.push(`/admin-console/workflow-script-library/${params.id}/copy/questions/new`)
  }

  const handleCancel = () => {
    // Navigate back to library
    router.push('/admin-console/workflow-script-library')
  }

  const handleBack = () => {
    // Navigate back to choose site
    router.back()
  }

  const handleSaveAndFinish = () => {
    // Save and finish workflow
    console.log('Saving workflow script:', formData)
    router.push('/admin-console/workflow-script-library')
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create a New Workflow Script</h1>
          
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
              <div className="w-8 h-8 bg-orange-500 text-white rounded flex items-center justify-center font-medium">
                2
              </div>
              <span className="font-medium text-orange-600">Enter Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-medium">
                3
              </div>
              <span className="text-gray-500">Add Questions</span>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter Workflow Script Details</h2>
            <p className="text-gray-600 mb-6">
              Enter a name for the Workflow Script, choose a category, and add any introductory text. Note: the Workflow Script name is for internal use and will not be visible to the candidate.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Script Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Script Name: <span className="text-gray-500">(Max: 100 characters)</span>
              </label>
              <Input
                value={formData.scriptName}
                onChange={(e) => setFormData({ ...formData, scriptName: e.target.value })}
                className="w-full"
                maxLength={100}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Category:
              </label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Offer Letter">Offer Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Introductory Text */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Introductory Text: <span className="text-gray-500">(Max: 1,000 characters)</span>
              </label>
              <Textarea
                value={formData.introductoryText}
                onChange={(e) => setFormData({ ...formData, introductoryText: e.target.value })}
                className="w-full h-32"
                maxLength={1000}
                placeholder="Enter introductory text here..."
              />
            </div>

            {/* Opt-out Option */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                * Show an opt-out option for voluntary Yes/No questions: 
                <span className="text-gray-500 font-normal"> (Opt-out option is "I do not wish to provide this information")</span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="yes"
                    name="optOut"
                    value="yes"
                    checked={formData.showOptOut === 'yes'}
                    onChange={(e) => setFormData({ ...formData, showOptOut: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="yes" className="text-sm text-gray-700">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="no"
                    name="optOut"
                    value="no"
                    checked={formData.showOptOut === 'no'}
                    onChange={(e) => setFormData({ ...formData, showOptOut: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="no" className="text-sm text-gray-700">No</label>
                </div>
              </div>
            </div>
          </div>

          {/* Next Step Actions */}
          <div className="pt-6 border-t">
            <div className="text-sm text-gray-600 mb-4">
              Next Step: 
              <button 
                onClick={handleAddExistingQuestions}
                className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium ml-1 hover:bg-orange-200 cursor-pointer"
              >
                Add Existing Questions
              </button>
              <button 
                onClick={handleAddNewQuestions}
                className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium ml-1 hover:bg-orange-200 cursor-pointer"
              >
                Add New Questions
              </button>
              <button 
                onClick={handleCancel}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium ml-1 hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
            <Button
              onClick={handleSaveAndFinish}
              className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
            >
              💾 Save and Finish Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
