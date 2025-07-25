'use client'

import { Button } from '@/components/ui/button'
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

export default function PreviewEmailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const message = getBaseProductMessageData(params.id)

  const handleSave = () => {
    console.log('Saving email content...')
    router.push(`/admin-console/messaging/base-product-messages/${params.id}?success=email`)
  }

  const handleCancel = () => {
    router.push(`/admin-console/messaging/base-product-messages/${params.id}/edit-email`)
  }

  const handleBack = () => {
    router.push(`/admin-console/messaging/base-product-messages/${params.id}/edit-email`)
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0"
          >
            ← Back
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Preview {message.name} Message
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

        {/* Preview Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Preview Message</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please review the information below before saving the message.
          </p>

          {/* Email Preview */}
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="space-y-4 mb-6">
              <div className="flex">
                <span className="font-medium text-black w-16">To:</span>
                <span className="text-gray-700">{message.emailContent.to}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-black w-16">From:</span>
                <span className="text-gray-700">{message.emailContent.from}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-black w-16">Subject:</span>
                <span className="text-gray-700">{message.emailContent.subject}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <div className="text-sm text-gray-500 italic mb-4">
                your site's logo goes here
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h3 className="font-medium text-black mb-4">
                  Job Interview at [[Company Name]]
                </h3>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Dear [[Candidate: First Name]],</p>
                  <p>An interview has been scheduled for you as per below details</p>
                  <p>[[Interview: Additional Instructions]]</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 italic mt-4">
                your site's footer statement goes here
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 flex items-center gap-2"
          >
            📄 Back
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
