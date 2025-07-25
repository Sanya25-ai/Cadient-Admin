'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditApplicationStatusAssociationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedApplicationStatus, setSelectedApplicationStatus] = useState('None')

  const applicationStatuses = [
    'None',
    'Incomplete',
    'In Process',
    'Pre-Screened, All',
    'Pre-Screened, Did Not Pass Assessment',
    'Pre-Screened, Passed Assessment',
    'Hired',
    'Non-Hireable',
    'Already Applied',
    'Reset',
    'Terminated',
    'Disqualified',
    'Offered',
    'Rejected in Hiring Process'
  ]

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving application status association:', {
      applicationStatus: selectedApplicationStatus
    })
    // Navigate to the detail page with success parameter
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}?success=application-status`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex-1 bg-white">
      <div className="w-full p-8 pt-6">
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

        {/* Page Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Demonstrate Text Notify</h1>
          </div>
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            <span className="text-orange-500">Custom Message Templates</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Base Product Messages</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Base Product Text Messages</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Location Specific Messages</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Promotion Module</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Admin Module for Services User</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">HMC Messages</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Associate Message to Application Status</h2>
          
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-4">
              Once you associate an Active message to an Application Status, the message will be sent automatically to all recipients with that status.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Select the application status that you want to associate this custom message to:
            </p>
          </div>

          {/* Application Status Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              <span className="text-red-500">*</span> Application Status:
            </label>
            <div className="space-y-2">
              {applicationStatuses.map((status) => (
                <div key={status} className="flex items-center">
                  <input
                    type="radio"
                    id={status}
                    name="applicationStatus"
                    value={status}
                    checked={selectedApplicationStatus === status}
                    onChange={(e) => setSelectedApplicationStatus(e.target.value)}
                    className="mr-3"
                  />
                  <label htmlFor={status} className="text-sm text-gray-700">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
