'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditTextContentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedField, setSelectedField] = useState('')
  
  const [formData, setFormData] = useState({
    textContent: '[[Company Name]]: This is the text that will be sent. Be sure to check your email for details.[[Application: Apply Now]]'
  })

  const dynamicFields = [
    '[[Application: Application Date]]',
    '[[Application: Apply Now]]',
    '[[Candidate: Signature]]',
    '[[Candidate: SignatureDate]]',
    '[[Interview: Start Time]]',
    '[[Job Title]]',
    '[[Link: Additional Info]]',
    '[[Link: Application Home]]',
    '[[Link: Application Home For TextApply]]',
    '[[Link: Employee Onboarding]]',
    '[[Link: Incomplete]]',
    '[[Link: MEP Application]]',
    '[[Link: OfferLetterESign]]',
    '[[Link: Sign In]]',
    '[[Link: Third Party Interaction]]',
    '[[Posting: Title]]',
    '[[Requisition: Requisition Number]]'
  ]

  const CHARACTER_LIMIT = 150

  const handleInputChange = (value: string) => {
    if (value.length <= CHARACTER_LIMIT) {
      setFormData(prev => ({
        ...prev,
        textContent: value
      }))
    }
  }

  const handleInsertField = () => {
    if (selectedField) {
      const newContent = formData.textContent + selectedField
      if (newContent.length <= CHARACTER_LIMIT) {
        setFormData(prev => ({
          ...prev,
          textContent: newContent
        }))
      }
      setSelectedField('')
    }
  }

  const handleSave = () => {
    // Handle save logic
    console.log('Saving text content:', formData)
    // Navigate back to detail view with success message
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}?success=text-content`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0"
          >
            ← Back
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-black mb-4">Edit Custom Message</h1>
          
          {/* Breadcrumb Navigation */}
          <div className="text-sm text-gray-600 mb-6">
            <button 
              onClick={() => router.push('/admin-console/messaging/custom-message-templates')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Custom Message Templates
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/base-product-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Base Product Messages
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/base-product-text-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Base Product Text Messages
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/location-specific-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Location Specific Messages
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/promotion-module')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Promotion Module
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/admin-module-services-user')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Admin Module for Services User
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/hmc-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              HMC Messages
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Edit Texting Content</h2>
              <p className="text-sm text-gray-700">
                Edit the content of text message below
              </p>

              {/* Texting Content Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <span className="text-red-500">*</span> Texting Content:
                </label>
                
                <Textarea
                  value={formData.textContent}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full h-64 resize-none"
                  placeholder="Enter your text message content"
                />
                
                {/* Character Count */}
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Character limit is {CHARACTER_LIMIT}.</span>
                  <span>Character count: {formData.textContent.length}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="bg-red-600 hover:bg-red-700 text-white px-6"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Insert Dynamic Fields */}
          <div className="w-80">
            <div className="bg-gray-800 rounded-lg p-4 text-white">
              <h3 className="font-medium text-white mb-4">Insert Dynamic Fields</h3>
              <p className="text-gray-300 text-sm mb-4">
                Select the specific fields that you would like to add to the text content
              </p>

              <div className="space-y-4">
                {/* Choose Specific Field */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2">
                    Choose Specific Field:
                  </label>
                  <Select value={selectedField} onValueChange={setSelectedField}>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue placeholder="[[Application: Apply Now]]" />
                    </SelectTrigger>
                    <SelectContent>
                      {dynamicFields.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Insert Button */}
                <Button
                  onClick={handleInsertField}
                  disabled={!selectedField}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black w-full"
                >
                  ← Insert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
