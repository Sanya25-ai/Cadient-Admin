e'use client'

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
      status: 'Active'
    },
    'application-confirmation-email': {
      id: 'application-confirmation-email',
      name: 'Application Confirmation Email',
      description: 'This email confirms that the application has been received and is being processed.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active'
    }
  }
  
  return messages[id as keyof typeof messages] || messages['applicant-interview-reminder-email']
}

export default function EditBaseProductMessagePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const message = getBaseProductMessageData(params.id)
  
  const [formData, setFormData] = useState({
    name: message.name,
    description: message.description,
    site: message.site,
    status: message.status
  })

  const handleSave = () => {
    // Handle save logic
    console.log('Saving message...', formData)
    // Redirect back to detail page with success parameter
    router.push(`/admin-console/messaging/base-product-messages/${params.id}?success=overview`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
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

        {/* Form Section */}
        <div className="bg-white">
          <h2 className="text-lg font-medium text-black mb-4">Overview</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please enter the Message Overview information below.
          </p>

          <div className="space-y-6">
            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Template Name
              </label>
              <div className="text-sm text-gray-700">
                {formData.name}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Description
              </label>
              <div className="text-sm text-gray-700">
                {formData.description}
              </div>
            </div>

            {/* Site */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Site:
              </label>
              <div className="text-sm text-gray-700">
                {formData.site}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                * Status
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === 'Active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === 'Inactive'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Inactive</span>
                </label>
              </div>
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
      </div>
    </div>
  )
}
