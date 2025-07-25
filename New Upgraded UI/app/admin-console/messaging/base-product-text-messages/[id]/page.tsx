'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock base product text message data
const getBaseProductTextMessageData = (id: string) => {
  const messages = {
    'interview-confirmation-text': {
      id: 'interview-confirmation-text',
      name: 'Interview Confirmation Text',
      description: 'This text message is sent to confirm interview appointments with candidates.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      created: '10/2/2020',
      createdBy: 'Shirley Recruiter',
      lastModified: '10/2/2020',
      lastModifiedBy: 'Shirley Recruiter',
      textingContent: {
        content: 'You have an interview scheduled for [[Interview: Start Time]]. Please confirm your attendance. Reply STOP to opt out.'
      },
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    },
    'application-status-update-text': {
      id: 'application-status-update-text',
      name: 'Application Status Update Text',
      description: 'This text message provides status updates on application progress.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      created: '10/2/2020',
      createdBy: 'Shirley Recruiter',
      lastModified: '10/2/2020',
      lastModifiedBy: 'Shirley Recruiter',
      textingContent: {
        content: 'Your application status has been updated. Please check your email for details. Reply STOP to opt out.'
      },
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    },
    'welcome-message-text': {
      id: 'welcome-message-text',
      name: 'Welcome Message Text',
      description: 'This text message welcomes new candidates to the application process.',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Inactive',
      created: '10/2/2020',
      createdBy: 'Shirley Recruiter',
      lastModified: '10/2/2020',
      lastModifiedBy: 'Shirley Recruiter',
      textingContent: {
        content: 'Welcome to [[Company Name]]! Thank you for your interest in joining our team. Reply STOP to opt out.'
      },
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    }
  }
  
  return messages[id as keyof typeof messages] || messages['interview-confirmation-text']
}

export default function BaseProductTextMessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = getBaseProductTextMessageData(params.id)
  const [activeTab, setActiveTab] = useState<'overview' | 'texting'>('overview')
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleDeactivateMessage = () => {
    setShowDeactivateModal(true)
  }

  const handleConfirmDeactivate = () => {
    console.log('Deactivating text message...')
    setShowDeactivateModal(false)
  }

  const handleCancelDeactivate = () => {
    setShowDeactivateModal(false)
  }

  const handleEditOverview = () => {
    router.push(`/admin-console/messaging/base-product-text-messages/${params.id}/edit`)
  }

  const handleEditTextContent = () => {
    router.push(`/admin-console/messaging/base-product-text-messages/${params.id}/edit-text`)
  }

  useEffect(() => {
    if (searchParams) {
      const success = searchParams.get('success')
      if (success === 'overview' || success === 'text') {
        setShowSuccessMessage(true)
        message.lastModified = '6/6/2025'
        message.lastModifiedBy = 'Pratham Jain'
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
            <span className="text-2xl">📱</span>
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
                  You have successfully <strong>edited</strong> the {message.name} base product text message. Please review the details below.
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
            <div className={`border rounded-lg p-4 ${
              message.status === 'Active' 
                ? 'bg-green-100 border-green-300' 
                : 'bg-red-100 border-red-300'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  message.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`font-medium ${
                  message.status === 'Active' ? 'text-green-800' : 'text-red-800'
                }`}>{message.status}</span>
              </div>
              <p className={`text-sm ${
                message.status === 'Active' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message.status === 'Active' 
                  ? 'This message is available for use.' 
                  : 'This message is not currently available for use.'
                }
              </p>
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
                  {message.status === 'Active' ? 'Deactivate Message' : 'Activate Message'}
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
                  Are you sure you want to {message.status === 'Active' ? 'deactivate' : 'activate'} this text message?
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
