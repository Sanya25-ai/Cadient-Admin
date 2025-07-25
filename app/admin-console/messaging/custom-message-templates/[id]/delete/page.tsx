'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock message template data
const getMessageTemplateData = (id: string) => {
  const templates = {
    'demonstrate-text-notify': {
      id: 'demonstrate-text-notify',
      name: 'Demonstrate Text Notify',
      description: 'A sample template that has been built to demonstrate the messaging tools inclusion of Text Notify messages, even for manually send messages.',
      status: 'Active'
    }
  }
  
  return templates[id as keyof typeof templates] || templates['demonstrate-text-notify']
}

export default function DeleteMessagePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const template = getMessageTemplateData(params.id)

  const handleDelete = () => {
    // Handle delete logic
    console.log('Deleting message:', params.id)
    // Navigate back to templates list
    router.push('/admin-console/messaging/custom-message-templates')
  }

  const handleCancel = () => {
    router.back()
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
          <h1 className="text-2xl font-semibold text-black mb-4">Delete Custom Email</h1>
          
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

        {/* Warning Message */}
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="font-medium text-yellow-800 mb-2">Please Confirm Your Intent to Delete</h3>
              <p className="text-sm text-yellow-700">
                Are you sure want to permanently delete this custom message? If you proceed, the message will no longer be available for use in the system.
              </p>
            </div>
          </div>
        </div>

        {/* Template Details */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Template Name:</label>
            <div className="text-sm text-gray-700">{template.name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Description:</label>
            <div className="text-sm text-gray-700">{template.description}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Status:</label>
            <div className="text-sm text-gray-700">{template.status}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-6 flex items-center gap-2"
          >
            🗑️ Delete
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
