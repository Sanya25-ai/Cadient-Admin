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
      emailContent: {
        to: '[[Candidate:First Name]] [[Candidate:Last Name]]',
        from: 'User',
        subject: 'Job Interview at [[Company Name]]',
        body: 'Dear [[Candidate: First Name]],\nAn interview has been scheduled for you as per below details\n[[Interview: Additional Instructions]]'
      }
    }
  }
  
  return messages[id as keyof typeof messages] || messages['applicant-interview-reminder-email']
}

const fieldTypes = [
  'Additional Fields',
  'Application',
  'Candidate', 
  'Job',
  'Links',
  'Location',
  'Position'
]

const specificFields = {
  'Additional Fields': [
    '[[Company Name]]',
    '[[Email Sender: Email]]',
    '[[Email Sender: First Name]]',
    '[[Email Sender: Last Name]]',
    '[[Hiring Workflow Current Node Name]]',
    '[[Hiring Workflow Name]]',
    '[[Hiring Workflow Previous Node Name]]',
    '[[Site Name]]',
    '[[System Date]]'
  ],
  'Application': [
    '[[Application: ID]]',
    '[[Application: Date]]',
    '[[Application: Status]]'
  ],
  'Candidate': [
    '[[Candidate: First Name]]',
    '[[Candidate: Last Name]]',
    '[[Candidate: Email]]',
    '[[Candidate: Phone]]'
  ],
  'Job': [
    '[[Job: Title]]',
    '[[Job: Description]]',
    '[[Job: Location]]'
  ],
  'Links': [
    '[[Link: Application]]',
    '[[Link: Job Details]]'
  ],
  'Location': [
    '[[Location: Name]]',
    '[[Location: Address]]'
  ],
  'Position': [
    '[[Position: Title]]',
    '[[Position: Department]]'
  ]
}

export default function EditEmailContentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const message = getBaseProductMessageData(params.id)
  
  const [formData, setFormData] = useState({
    to: message.emailContent.to,
    from: message.emailContent.from,
    subject: message.emailContent.subject,
    body: message.emailContent.body
  })

  const [showInsertModal, setShowInsertModal] = useState(false)
  const [selectedFieldType, setSelectedFieldType] = useState('Additional Fields')
  const [selectedSpecificField, setSelectedSpecificField] = useState('')
  const [showFieldTypeDropdown, setShowFieldTypeDropdown] = useState(false)
  const [showSpecificFieldDropdown, setShowSpecificFieldDropdown] = useState(false)

  const handleSave = () => {
    console.log('Saving email content...', formData)
    router.push(`/admin-console/messaging/base-product-messages/${params.id}?success=email`)
  }

  const handleCancel = () => {
    router.back()
  }

  const handlePreview = () => {
    router.push(`/admin-console/messaging/base-product-messages/${params.id}/preview-email`)
  }

  const handleInsertField = () => {
    if (selectedSpecificField) {
      setFormData({
        ...formData,
        body: formData.body + ' ' + selectedSpecificField
      })
      setShowInsertModal(false)
      setSelectedSpecificField('')
    }
  }

  const handleFieldTypeSelect = (fieldType: string) => {
    setSelectedFieldType(fieldType)
    setSelectedSpecificField('')
    setShowFieldTypeDropdown(false)
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
            <h2 className="text-lg font-medium text-black mb-4">Details</h2>
            <p className="text-sm text-gray-600 mb-6">
              Please make your desired changes below.
            </p>

            <div className="space-y-6">
              {/* To Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  To:
                </label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* From Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  * From:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="from"
                      value="System"
                      checked={formData.from === 'System'}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">System</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="from"
                      value="User"
                      checked={formData.from === 'User'}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">User</span>
                  </label>
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  * Subject:
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* Headline Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Headline:
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  * Message:
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Note: This message content below are visible to candidates, and it is the HM's direct responsibility to ensure that they align with your company's business policies and adhere to the relevant compliance requirements.
                </p>
                
                {/* Rich Text Editor Toolbar */}
                <div className="border border-gray-300 rounded-t bg-gray-50 p-2 flex items-center gap-2 text-sm">
                  <button className="px-2 py-1 hover:bg-gray-200 rounded font-bold">B</button>
                  <button className="px-2 py-1 hover:bg-gray-200 rounded italic">I</button>
                  <button className="px-2 py-1 hover:bg-gray-200 rounded underline">U</button>
                  <span className="text-gray-300">|</span>
                  <button className="px-2 py-1 hover:bg-gray-200 rounded">🔗</button>
                  <button className="px-2 py-1 hover:bg-gray-200 rounded">📎</button>
                  <span className="text-gray-300">|</span>
                  <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                    <option>Font</option>
                  </select>
                  <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                    <option>Size</option>
                  </select>
                  <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                    <option>Styles</option>
                  </select>
                </div>

                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full border border-gray-300 border-t-0 rounded-b px-3 py-2 text-sm h-64 resize-none"
                  placeholder="Enter your message content here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handlePreview}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6"
                >
                  Preview
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

          {/* Right Sidebar - Insert Database Fields */}
          <div className="w-80">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Insert Database Fields</h3>
              <p className="text-gray-300 text-sm mb-4">
                Select the specific fields that you would like to add to this email.
              </p>

              <div className="space-y-4">
                {/* Choose Field Type */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2">
                    Choose Field Type:
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowFieldTypeDropdown(!showFieldTypeDropdown)}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-left text-sm flex items-center justify-between"
                    >
                      {selectedFieldType}
                      <span>▼</span>
                    </button>
                    {showFieldTypeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
                        <div className="p-2">
                          <div className="text-white text-sm mb-2">✓ choose one...</div>
                          {fieldTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => handleFieldTypeSelect(type)}
                              className="block w-full text-left px-2 py-1 text-gray-300 hover:bg-gray-600 rounded text-sm"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

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
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
                        <div className="p-2">
                          <div className="text-white text-sm mb-2">✓ choose one...</div>
                          {specificFields[selectedFieldType as keyof typeof specificFields]?.map((field) => (
                            <button
                              key={field}
                              onClick={() => handleSpecificFieldSelect(field)}
                              className="block w-full text-left px-2 py-1 text-gray-300 hover:bg-gray-600 rounded text-sm"
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
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 text-sm disabled:opacity-50"
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
