"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateCustomMessagePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFieldType, setSelectedFieldType] = useState('')
  const [selectedSpecificField, setSelectedSpecificField] = useState('')
  const [formData, setFormData] = useState({
    templateName: '',
    description: '',
    category: '',
    site: '',
    status: 'Active',
    to: '',
    from: 'System',
    subject: '',
    headline: '',
    message: '',
    testingContent: '[Company Name]'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCancel = () => {
    router.push('/admin-console/messaging/custom-message-templates')
  }

  const handleSaveForLater = () => {
    console.log('Saving for later...')
    alert('Message saved for later!')
  }

  const handlePreview = () => {
    setCurrentStep(3)
  }

  // Field mappings for database fields
  const getSpecificFieldsForType = (fieldType: string) => {
    const fieldMappings = {
      'additional-fields': [
        '[[Company Name]]',
        '[[Email Sender: Email]]',
        '[[Email Sender: First Name]]',
        '[[Email Sender: Last Name]]',
        '[[Hiring Workflow Current Node Name]]',
        '[[Hiring Workflow Name]]',
        '[[Hiring Workflow Previous Node Name]]'
      ],
      'application': [
        '[[Application: Application Date]]',
        '[[Application: Apply Now]]'
      ],
      'candidate': [
        '[[Candidate: Signature]]',
        '[[Candidate: SignatureDate]]'
      ],
      'job': [
        '[[Job Title]]'
      ],
      'links': [
        '[[Link: Additional Info]]'
      ],
      'location': [
        '[[Location: Name]]',
        '[[Location: Address]]'
      ],
      'position': [
        '[[Position: Title]]',
        '[[Position: Description]]'
      ]
    }
    return fieldMappings[fieldType as keyof typeof fieldMappings] || []
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-end mb-8">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center ${currentStep === 1 ? 'text-black font-medium' : 'text-gray-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 1 ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-white'}`}>
            1
          </div>
          <span className="ml-2">Message Overview</span>
        </div>
        <div className={`flex items-center ${currentStep === 2 ? 'text-black font-medium' : 'text-gray-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 2 ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-white'}`}>
            2
          </div>
          <span className="ml-2">Message Content</span>
        </div>
        <div className={`flex items-center ${currentStep === 3 ? 'text-black font-medium' : 'text-gray-400'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 3 ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-white'}`}>
            3
          </div>
          <span className="ml-2">Message Preview</span>
        </div>
      </div>
    </div>
  )

  const renderOverviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-black mb-4">Overview</h2>
        <p className="text-sm text-gray-700 mb-6">
          Please enter the Message Overview information below.
        </p>
      </div>

      <div>
        <Label htmlFor="templateName" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Template Name
        </Label>
        <Input
          id="templateName"
          value={formData.templateName}
          onChange={(e) => handleInputChange('templateName', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="mt-1 h-32"
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Category
        </Label>
        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="choose one..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="sourcing">Sourcing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="site" className="text-sm font-medium text-black">Site:</Label>
        <Select value={formData.site} onValueChange={(value) => handleInputChange('site', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="choose one..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales-demo-retail-omega-canada">Sales Demo Retail Omega Canada Req External Seeker</SelectItem>
            <SelectItem value="sales-demo-retail-omega-cms">Sales Demo Retail Omega CMS</SelectItem>
            <SelectItem value="sales-demo-retail-omega-hmc">Sales Demo Retail Omega HMC</SelectItem>
            <SelectItem value="sales-demo-retail-omega-new-employee">Sales Demo Retail Omega New Employee Onboarding</SelectItem>
            <SelectItem value="sales-demo-retail-omega-new-manager">Sales Demo Retail Omega New Manager Onboarding</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Status
        </Label>
        <RadioGroup 
          value={formData.status} 
          onValueChange={(value) => handleInputChange('status', value)}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Active" id="active" />
            <Label htmlFor="active" className="text-sm cursor-pointer">Active</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Inactive" id="inactive" />
            <Label htmlFor="inactive" className="text-sm cursor-pointer">Inactive</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-4 pt-6">
        <span className="text-sm font-medium">Next Step:</span>
        <Button 
          onClick={handleNext}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6"
        >
          Message Content
        </Button>
        <Button 
          onClick={handleCancel}
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50 px-6"
        >
          Cancel
        </Button>
      </div>

      <div className="pt-4">
        <Button 
          onClick={handleSaveForLater}
          variant="outline"
          className="bg-gray-800 text-white hover:bg-gray-700 px-6"
        >
          💾 Save for Later
        </Button>
      </div>
    </div>
  )

  const renderContentStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-black mb-4">Message Content</h2>
        <p className="text-sm text-gray-700 mb-6">
          Enter the content of the custom message that you want to create below.
        </p>
      </div>

      <div>
        <Label htmlFor="to" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> To: ℹ️
        </Label>
        <Select value={formData.to} onValueChange={(value) => handleInputChange('to', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="choose one..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="candidate">Candidate</SelectItem>
            <SelectItem value="hmc-user">HMC User</SelectItem>
            <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
            <SelectItem value="recruiter">Recruiter</SelectItem>
            <SelectItem value="location-email">Location Email</SelectItem>
            <SelectItem value="parent-location-email">Parent Location Email</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> From:
        </Label>
        <RadioGroup 
          value={formData.from} 
          onValueChange={(value) => handleInputChange('from', value)}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="System" id="system" />
            <Label htmlFor="system" className="text-sm cursor-pointer">System</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="User" id="user" />
            <Label htmlFor="user" className="text-sm cursor-pointer">User</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="subject" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Subject:
        </Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="headline" className="text-sm font-medium text-black">Headline:</Label>
        <Input
          id="headline"
          value={formData.headline}
          onChange={(e) => handleInputChange('headline', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Message:
        </Label>
        <p className="text-xs text-gray-600 mb-2">
          Note: You can create various forms, use tables to customize, and it is the HTML user's responsibility to ensure that they comply with your company's business practices and policies in any related compliance requirements.
        </p>
        
        {/* Rich Text Editor Toolbar */}
        <div className="border border-gray-300 rounded-t bg-gray-100 p-2 flex items-center gap-1 text-sm">
          <button className="p-1 hover:bg-gray-200 rounded">📄</button>
          <button className="p-1 hover:bg-gray-200 rounded">📁</button>
          <button className="p-1 hover:bg-gray-200 rounded">💾</button>
          <button className="p-1 hover:bg-gray-200 rounded">🖨️</button>
          <span className="mx-1">|</span>
          <button className="p-1 hover:bg-gray-200 rounded">↶</button>
          <button className="p-1 hover:bg-gray-200 rounded">↷</button>
          <span className="mx-1">|</span>
          <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
          <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
          <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
          <span className="mx-1">|</span>
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
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="mt-0 h-64 rounded-t-none border-t-0"
          placeholder="Enter your message content here..."
        />
      </div>

      <div>
        <Label htmlFor="testingContent" className="text-sm font-medium text-black">
          <span className="text-red-500">*</span> Testing Content:
        </Label>
        <Input
          id="testingContent"
          value={formData.testingContent}
          onChange={(e) => handleInputChange('testingContent', e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex items-center gap-4 pt-6">
        <span className="text-sm font-medium">Next Step:</span>
        <Button 
          onClick={handlePreview}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6"
        >
          Preview
        </Button>
        <Button 
          onClick={handleCancel}
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50 px-6"
        >
          Cancel
        </Button>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button 
          onClick={handlePrevious}
          variant="outline"
          className="bg-gray-600 text-white hover:bg-gray-700 px-6"
        >
          ← Back
        </Button>
        <Button 
          onClick={handleSaveForLater}
          variant="outline"
          className="bg-gray-800 text-white hover:bg-gray-700 px-6"
        >
          💾 Save for Later
        </Button>
      </div>

      {/* Sidebar Panels */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4">
        {/* Insert Database Fields */}
        <div className="bg-gray-800 text-white p-4 rounded-lg w-80">
          <h3 className="font-medium mb-3">Insert Database Fields</h3>
          <p className="text-sm mb-3">Select the specific fields that you would like to add to this email.</p>
          <div className="mb-3">
            <Label className="text-sm">Choose Field Type:</Label>
            <Select value={selectedFieldType} onValueChange={(value) => {
              setSelectedFieldType(value)
              setSelectedSpecificField('')
            }}>
              <SelectTrigger className="mt-1 bg-white text-black">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="additional-fields">Additional Fields</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="candidate">Candidate</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="links">Links</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="position">Position</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedFieldType && (
            <div className="mb-3">
              <Label className="text-sm">Choose Specific Field:</Label>
              <Select value={selectedSpecificField} onValueChange={setSelectedSpecificField}>
                <SelectTrigger className="mt-1 bg-white text-black">
                  <SelectValue placeholder="choose one..." />
                </SelectTrigger>
                <SelectContent>
                  {getSpecificFieldsForType(selectedFieldType).map((field, index) => (
                    <SelectItem key={index} value={field}>{field}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black w-full">
            ← Insert
          </Button>
        </div>

        {/* Insert Dynamic Fields */}
        <div className="bg-gray-800 text-white p-4 rounded-lg w-80">
          <h3 className="font-medium mb-3">Insert Dynamic Fields</h3>
          <p className="text-sm mb-3">Select the specific fields that you would like to add to the text content.</p>
          <div className="mb-3">
            <Label className="text-sm">Choose Specific Field:</Label>
            <Select>
              <SelectTrigger className="mt-1 bg-white text-black">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="application-date">[[Application: Application Date]]</SelectItem>
                <SelectItem value="apply-now">[[Application: Apply Now]]</SelectItem>
                <SelectItem value="candidate-signature">[[Candidate: Signature]]</SelectItem>
                <SelectItem value="candidate-signature-date">[[Candidate: SignatureDate]]</SelectItem>
                <SelectItem value="interview-start-time">[[Interview: Start Time]]</SelectItem>
                <SelectItem value="job-title">[[Job Title]]</SelectItem>
                <SelectItem value="link-additional-info">[[Link: Additional Info]]</SelectItem>
                <SelectItem value="company-name">[[Company Name]]</SelectItem>
                <SelectItem value="email-sender-email">[[Email Sender: Email]]</SelectItem>
                <SelectItem value="email-sender-first-name">[[Email Sender: First Name]]</SelectItem>
                <SelectItem value="email-sender-last-name">[[Email Sender: Last Name]]</SelectItem>
                <SelectItem value="hiring-workflow-current-node">[[Hiring Workflow Current Node Name]]</SelectItem>
                <SelectItem value="hiring-workflow-name">[[Hiring Workflow Name]]</SelectItem>
                <SelectItem value="hiring-workflow-previous-node">[[Hiring Workflow Previous Node Name]]</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black w-full">
            ← Insert
          </Button>
        </div>
      </div>
    </div>
  )

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-black mb-4">Preview demo Message</h2>
        <hr className="border-gray-300 mb-6" />
      </div>

      <div>
        <h3 className="text-lg font-medium text-black mb-4">Preview Message</h3>
        <p className="text-sm text-gray-700 mb-6">
          Please review the information below before saving the message.
        </p>
      </div>

      {/* Message Details */}
      <div className="space-y-2 mb-6">
        <div className="flex">
          <span className="font-medium text-black w-16">To:</span>
          <span className="text-black">{formData.to || 'Candidate'}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-black w-16">From:</span>
          <span className="text-black">{formData.from || 'System'}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-black w-16">Subject:</span>
          <span className="text-black">{formData.subject || 'nm'}</span>
        </div>
      </div>

      {/* Message Content */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 italic mb-2">your site's logo goes here</p>
        <p className="text-black mb-4">{formData.testingContent || '[[Company Name]]'}</p>
      </div>

      {/* Texting Content Section */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-black mb-2">Texting Content</h4>
        <p className="text-black mb-2">
          {formData.testingContent || '[[Company Name]]'}{formData.message && formData.message.includes('[[Application: Application Date]]') ? '[[Application: Application Date]]' : ''}
        </p>
        <p className="text-sm text-gray-600 italic">your site's footer statement goes here</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-6">
        <Button 
          onClick={handlePrevious}
          variant="outline"
          className="bg-gray-600 text-white hover:bg-gray-700 px-6"
        >
          ← Back
        </Button>
        <Button 
          onClick={() => {
            console.log('Saving message...', formData)
            alert('Custom message saved successfully!')
            router.push('/admin-console/messaging/custom-message-templates')
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6"
        >
          Save
        </Button>
        <Button 
          onClick={handleCancel}
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50 px-6"
        >
          Cancel
        </Button>
      </div>

      <div className="pt-4">
        <Button 
          onClick={() => {
            console.log('Saving for later...', formData)
            alert('Message saved for later!')
          }}
          variant="outline"
          className="bg-gray-800 text-white hover:bg-gray-700 px-6"
        >
          💾 Save for Later
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-black mb-4">Create Custom Message</h1>
          
          {/* Breadcrumb Navigation */}
          <div className="text-sm text-gray-600 mb-6">
            <Link href="/admin-console/messaging/custom-message-templates" className="text-black">Custom Message Templates</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/base-product-messages" className="text-orange-500 hover:text-orange-600">Base Product Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/base-product-text-messages" className="text-orange-500 hover:text-orange-600">Base Product Text Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/location-specific-messages" className="text-orange-500 hover:text-orange-600">Location Specific Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/promotion-module" className="text-orange-500 hover:text-orange-600">Promotion Module</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/admin-module-services-user" className="text-orange-500 hover:text-orange-600">Admin Module for Services User</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/hmc-messages" className="text-orange-500 hover:text-orange-600">HMC Messages</Link>
          </div>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <div className="max-w-4xl">
          {currentStep === 1 && renderOverviewStep()}
          {currentStep === 2 && renderContentStep()}
          {currentStep === 3 && renderPreviewStep()}
        </div>
      </div>
    </div>
  )
}
