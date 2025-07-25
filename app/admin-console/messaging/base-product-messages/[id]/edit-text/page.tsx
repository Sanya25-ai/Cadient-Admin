'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock base product message data
const getBaseProductMessageData = (id: string) => {
  const messages = {
    'applicant-interview-reminder-email': {
      id: 'applicant-interview-reminder-email',
      name: 'Applicant Interview Reminder Email',
      description: 'This email is sent as a reminder for interview or phone screen. It is sent to the candidate when a interview or phone screen is scheduled on the ADR Hiring process tab.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      textingContent: {
        content: '[[Company Name]]\nYou have an interview invite for [[Interview: Start Time]]. Check your email for more details.\nSTOPtoOptOut'
      }
    }
  }
  
  return messages[id as keyof typeof messages] || messages['applicant-interview-reminder-email']
}

const textSpecificFields = [
  '[[Application: Application Date]]',
  '[[Application: Apply Now]]',
  '[[Candidate: Password Hint]]',
  '[[Candidate: Signature]]',
  '[[Candidate: SignatureDate]]',
  '[[Candidate: User Name]]',
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

export default function EditTextContentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const message = getBaseProductMessageData(params.id)
  
  const [formData, setFormData] = useState({
    content: message.textingContent.content
  })

  const [selectedSpecificField, setSelectedSpecificField] = useState('')
  const [showSpecificFieldDropdown, setShowSpecificFieldDropdown] = useState(false)

  const handleSave = () => {
    console.log('Saving text content...', formData)
    router.push(`/admin-console/messaging/base-product-messages/${params.id}?success=text`)
  }

  const handleCancel = () => {
    router.back()
  }

  const handleInsertField = () => {
    if (selectedSpecificField) {
      setFormData({
        ...formData,
        content: formData.content + ' ' + selectedSpecificField
      })
      setSelectedSpecificField('')
      setShowSpecificFieldDropdown(false)
    }
  }

  const handleSpecificFieldSelect = (field: string) => {
    setSelectedSpecificField(field)
    setShowSpecificFieldDropdown(false)
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Edit Message ({message.name})
          </h1>
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600">
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
            <h2 className="text-lg font-medium text-black mb-4">Edit Texting Content</h2>
            <p className="text-sm text-gray-600 mb-6">
              Edit the content of text message below.
            </p>

            <div className="space-y-6">
              {/* Texting Content Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  * Texting Content:
                </label>
                
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-64 resize-none"
                  placeholder="Enter your text message content here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
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
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Insert Dynamic Fields</h3>
              <p className="text-gray-300 text-sm mb-4">
                Select the specific fields that you would like to add to the text content.
              </p>

              <div className="space-y-4">
                {/* Choose Specific Field */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2">
                    Choose Specific Field:
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowSpecificFieldDropdown(!showSpecificFieldDropdown)}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-left text-sm flex items-center justify-between"
                    >
                      {selectedSpecificField || 'choose one...'}
                      <span>▼</span>
                    </button>
                    {showSpecificFieldDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 max-h-64 overflow-y-auto">
                        <div className="p-2">
                          <div className="text-white text-sm mb-2">✓ choose one...</div>
                          {textSpecificFields.map((field) => (
                            <button
                              key={field}
                              onClick={() => handleSpecificFieldSelect(field)}
                              className={`block w-full text-left px-2 py-1 text-gray-300 hover:bg-blue-600 rounded text-sm ${
                                selectedSpecificField === field ? 'bg-blue-600 text-white' : ''
                              }`}
                            >
                              {field}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Insert Button */}
                <Button
                  onClick={handleInsertField}
                  disabled={!selectedSpecificField}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 text-sm disabled:opacity-50 flex items-center gap-2"
                >
                  ↵ Insert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
