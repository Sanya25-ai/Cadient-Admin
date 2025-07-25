'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock base product message data
const getBaseProductMessageData = (id: string) => {
  const messages = {
    'applicant-interview-reminder-email': {
      id: 'applicant-interview-reminder-email',
      name: 'Applicant Interview Reminder Email',
      description: 'This email is sent as a reminder for interview or phone screen. It is sent to the candidate when a interview or phone screen is scheduled on the ADR Hiring process tab.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      created: '10/2/2020',
      createdBy: 'Shirley Recruiter',
      lastModified: '10/2/2020',
      lastModifiedBy: 'Shirley Recruiter',
      emailContent: {
        to: '[[Candidate:First Name]] [[Candidate:Last Name]]',
        from: 'User',
        subject: 'Job Interview at [[Company Name]]',
        body: 'Dear [[Candidate: First Name]], An interview has been scheduled for you as per below details [[Interview: Additional Instructions]]'
      },
      textingContent: {
        content: 'You have an interview invite for [[Interview: Start Time]]. Check your email for more details. STOPtoOptOut'
      },
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    },
    'application-confirmation-email': {
      id: 'application-confirmation-email',
      name: 'Application Confirmation Email',
      description: 'This email confirms that the application has been received and is being processed.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      created: '10/2/2020',
      createdBy: 'Shirley Recruiter',
      lastModified: '10/2/2020',
      lastModifiedBy: 'Shirley Recruiter',
      emailContent: {
        to: '[[Candidate:First Name]] [[Candidate:Last Name]]',
        from: 'System',
        subject: 'Application Confirmation',
        body: 'Thank you for your application. We have received your information and will review it shortly.'
      },
      textingContent: {
        content: 'Your application has been received. Thank you for your interest!'
      },
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    }
  }
  
  return messages[id as keyof typeof messages] || messages['applicant-interview-reminder-email']
}

export default function BaseProductMessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = getBaseProductMessageData(params.id)
  const [activeTab, setActiveTab] = useState<'overview' | 'email' | 'texting'>('overview')
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleDeactivateMessage = () => {
    setShowDeactivateModal(true)
  }

  const handleConfirmDeactivate = () => {
    // Handle deactivate logic
    console.log('Deactivating message...')
    setShowDeactivateModal(false)
    // Could redirect or show success message
  }

  const handleCancelDeactivate = () => {
    setShowDeactivateModal(false)
  }

  const handleEditOverview = () => {
    router.push(`/admin-console/messaging/base-product-messages/${params.id}/edit`)
  }

  const handleEditEmailContent = () => {
    router.push(`/admin-console/messaging/base-product-messages/${params.id}/edit-email`)
  }

  const handleEditTextContent = () => {
    router.push(`/admin-console/messaging/base-product-messages/${params.id}/edit-text`)
  }

  useEffect(() => {
    if (searchParams) {
      const success = searchParams.get('success')
      if (success === 'overview' || success === 'email' || success === 'text') {
        setShowSuccessMessage(true)
        // Update last modified info when coming back from edit
        message.lastModified = '6/6/2025'
        message.lastModifiedBy = 'Pratham Jain'
        // Clear the URL parameter
        const url = new URL(window.location.href)
        url.searchParams.delete('success')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [searchParams])

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

        {/* Page Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📧</span>
            <h1 className="text-2xl font-semibold text-gray-900">{message.name}</h1>
          </div>
          
          {/* Breadcrumb */}
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

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-100 border border-green-300 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <h3 className="font-medium text-green-800">Confirmation</h3>
                <p className="text-sm text-green-700">
                  You have successfully <strong>edited</strong> the {message.name} base product message. Please review the details below.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-1 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'overview'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'email'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300'
                }`}
              >
                Email Content
              </button>
              <button
                onClick={() => setActiveTab('texting')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'texting'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300'
                }`}
              >
                Texting Content
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black">Template Details</h1>
                    <Button 
                      onClick={handleEditOverview}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ✏️ Edit Overview
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Template Name:</label>
                      <div className="text-sm text-gray-700">{message.name}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Description:</label>
                      <div className="text-sm text-gray-700">{message.description}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Site:</label>
                      <div className="text-sm text-gray-700">{message.site}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black">Email Content</h1>
                    <Button 
                      onClick={handleEditEmailContent}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ✏️ Edit Email Content
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">To:</label>
                      <div className="text-sm text-gray-700">{message.emailContent.to}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">From:</label>
                      <div className="text-sm text-gray-700">{message.emailContent.from}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Subject:</label>
                      <div className="text-sm text-gray-700">{message.emailContent.subject}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Email Body:</label>
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded border">
                        <h3 className="font-medium mb-2">Job Interview at [[Company Name]]</h3>
                        <p>{message.emailContent.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'texting' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black">Texting Content</h1>
                    <Button 
                      onClick={handleEditTextContent}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ✏️ Edit Text Content
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Texting Content:</label>
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded border">
                        {message.textingContent.content}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Status */}
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Active</span>
              </div>
              <p className="text-sm text-green-700">This message is available for use.</p>
            </div>

            {/* Actions */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-400">⚙️</span>
                <h3 className="font-medium text-orange-400">Actions</h3>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={handleDeactivateMessage}
                  className="flex items-center gap-2 text-white hover:text-gray-300 text-sm w-full text-left"
                >
                  <span>🚫</span>
                  Deactivate Message
                </button>
              </div>
            </div>

            {/* Audit Details */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-400">📋</span>
                <h3 className="font-medium text-orange-400">Audit Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white font-medium">Created:</div>
                  <div className="text-gray-300">On {message.created}</div>
                  <div className="text-gray-300">By {message.createdBy}</div>
                </div>
                <div>
                  <div className="text-white font-medium">Last Modified:</div>
                  <div className="text-gray-300">On {message.lastModified}</div>
                  <div className="text-gray-300">By {message.lastModifiedBy}</div>
                </div>
              </div>
            </div>

            {/* Multi-Language */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-400">🌐</span>
                <h3 className="font-medium text-orange-400">Multi-Language</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                View and edit content in a different language.
              </p>
              <div>
                <div className="text-white font-medium text-sm mb-2">Language Versions</div>
                <div className="space-y-2">
                  {message.languageVersions.map((lang) => (
                    <div key={lang.code} className="flex items-center gap-2">
                      <button className={`px-3 py-1 rounded text-xs ${
                        lang.isDefault 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-yellow-400 text-black hover:bg-yellow-500'
                      }`}>
                        {lang.name}
                        {lang.isDefault && (
                          <span className="ml-1 text-xs">ℹ️</span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deactivate Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="mb-4">
                <div className="text-white text-sm mb-2">uat-cta.cadienttalent.com says</div>
                <div className="text-white text-lg mb-6">
                  Are you sure you want to deactivate this message?
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={handleCancelDeactivate}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDeactivate}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6"
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
