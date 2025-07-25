'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditEmailContentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showInsertFields, setShowInsertFields] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedFieldType, setSelectedFieldType] = useState('')
  const [selectedSpecificField, setSelectedSpecificField] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  
  const [formData, setFormData] = useState({
    to: 'Candidate',
    from: 'System',
    subject: 'Demonstrating the Text Notify feature',
    headline: '',
    message: 'A brief message intended only to help demonstrate the Text Notify feature. A parallel text will be sent to the candidate along with this email.'
  })

  const toOptions = [
    'Candidate',
    'HMC User',
    'Hiring Manager',
    'Recruiter',
    'Location Email',
    'Parent Location Email',
    'Other'
  ]

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
    ]
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInsertField = () => {
    if (selectedSpecificField) {
      // Insert the field into the message
      setFormData(prev => ({
        ...prev,
        message: prev.message + ' ' + selectedSpecificField
      }))
      setSelectedSpecificField('')
    }
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const handleSave = () => {
    // Handle save logic
    console.log('Saving email content:', formData)
    // Navigate back to detail view with success message
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}?success=email-content`)
  }

  const handleCancel = () => {
    router.back()
  }

  const handleBackFromPreview = () => {
    setShowPreview(false)
  }

  if (showPreview) {
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
            <h1 className="text-2xl font-semibold text-black mb-4">Preview Demonstrate Text Notify Message</h1>
            
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

          {/* Preview Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-black mb-4">Preview Message</h2>
            <p className="text-sm text-gray-700 mb-6">
              Please review the information below before saving the message.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="space-y-4">
                <div>
                  <span className="font-medium">To:</span> {formData.to}
                </div>
                <div>
                  <span className="font-medium">From:</span> {formData.from}
                </div>
                <div>
                  <span className="font-medium">Subject:</span> {formData.subject}
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500 italic mb-2">your site's logo goes here</div>
                  <div className="text-sm text-gray-800 mb-4">{formData.message}</div>
                  <div className="text-sm text-gray-500 italic">your site's footer statement goes here</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleBackFromPreview}
              variant="outline"
              className="bg-gray-600 hover:bg-gray-700 text-white border-gray-600 px-6"
            >
              ← Back
            </Button>
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
    )
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
          <h1 className="text-2xl font-semibold text-black mb-4">Email Content</h1>
          <p className="text-sm text-gray-700">
            Edit the content of custom message below.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* To Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <span className="text-red-500">*</span> To:
                  <span 
                    className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-gray-400 text-white rounded-full text-xs cursor-help relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    ?
                    {/* Tooltip */}
                    {showTooltip && (
                      <div className="absolute left-0 top-6 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-80">
                        <div className="text-sm text-gray-700">
                          <div className="font-medium mb-2">Can't E-mail recipient(s) options:</div>
                          <div className="space-y-1 text-xs">
                            <div><strong>Candidate:</strong> Send to the applicant/job seeker.</div>
                            <div><strong>HMC User:</strong> Send to the user starting the hiring process.</div>
                            <div><strong>Hiring Manager:</strong> Send to the Hiring Manager of a requisition.</div>
                            <div><strong>Recruiter:</strong> Send to the primary Recruiter of a requisition.</div>
                            <div><strong>Location Email:</strong> Send to the email address of job's location.</div>
                            <div><strong>Parent Location Email:</strong> Send to the email address of job's parent location.</div>
                            <div><strong>Other:</strong> Specify one or more e-mail addresses, separated by commas.</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </span>
                </label>
                <Select value={formData.to} onValueChange={(value) => handleInputChange('to', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* From Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <span className="text-red-500">*</span> From:
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="system"
                      name="from"
                      value="System"
                      checked={formData.from === 'System'}
                      onChange={(e) => handleInputChange('from', e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="system" className="text-sm text-gray-700">System</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="user"
                      name="from"
                      value="User"
                      checked={formData.from === 'User'}
                      onChange={(e) => handleInputChange('from', e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="user" className="text-sm text-gray-700">User</label>
                  </div>
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <span className="text-red-500">*</span> Subject:
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full"
                  placeholder="Enter email subject"
                />
              </div>

              {/* Headline Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Headline:
                </label>
                <Input
                  value={formData.headline}
                  onChange={(e) => handleInputChange('headline', e.target.value)}
                  className="w-full"
                  placeholder="Enter headline"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <span className="text-red-500">*</span> Message:
                </label>
                <div className="text-xs text-gray-600 mb-2">
                  (Note: Text and images entered below are visible to candidates, and it is the HMC user's responsibility to ensure that they align with your company's business policies and adhere to any related compliance requirements.)
                </div>
                
                {/* Rich Text Editor Toolbar */}
                <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">📁</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">💾</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">📄</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">🖨️</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">📋</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">✂️</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">📋</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">↩️</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">↪️</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">🔍</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">🔄</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">🖼️</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">📊</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">🔗</button>
                  <button className="p-1 hover:bg-gray-200 rounded text-sm">📝</button>
                  <div className="border-l mx-2"></div>
                  <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
                  <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
                  <button className="p-1 hover:bg-gray-200 rounded line-through">S</button>
                  <div className="border-l mx-2"></div>
                  <select className="text-xs border rounded px-1">
                    <option>Font</option>
                  </select>
                  <select className="text-xs border rounded px-1">
                    <option>Size</option>
                  </select>
                  <select className="text-xs border rounded px-1">
                    <option>Styles</option>
                  </select>
                </div>
                
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full h-64 border-t-0 rounded-t-none"
                  placeholder="Enter your message content"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
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
            <div className="bg-gray-800 rounded-lg p-4 text-white">
              <h3 className="font-medium text-white mb-4">Insert Database Fields</h3>
              <p className="text-gray-300 text-sm mb-4">
                Select the specific fields that you would like to add to this email.
              </p>

              <div className="space-y-4">
                {/* Choose Field Type */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2">
                    Choose Field Type:
                  </label>
                  <Select value={selectedFieldType} onValueChange={setSelectedFieldType}>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue placeholder="choose one..." />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Choose Specific Field */}
                {selectedFieldType && (
                  <div>
                    <label className="block text-white font-medium text-sm mb-2">
                      Choose Specific Field:
                    </label>
                    <Select value={selectedSpecificField} onValueChange={setSelectedSpecificField}>
                      <SelectTrigger className="w-full bg-white text-black">
                        <SelectValue placeholder="choose one..." />
                      </SelectTrigger>
                      <SelectContent>
                        {(specificFields[selectedFieldType as keyof typeof specificFields] || []).map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Insert Button */}
                <Button
                  onClick={handleInsertField}
                  disabled={!selectedSpecificField}
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
