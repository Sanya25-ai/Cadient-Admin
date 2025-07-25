'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock message template data
const getMessageTemplateData = (id: string) => {
  const templates = {
    'demonstrate-text-notify': {
      id: 'demonstrate-text-notify',
      name: 'Demonstrate Text Notify',
      description: 'A sample template that has been built to demonstrate the messaging tools inclusion of Text Notify messages, even for manually send messages.',
      category: 'Other',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      deliveryType: 'Manual',
      status: 'Active',
      created: '5/22/2025',
      createdBy: 'Kyle Bidwell',
      lastModified: '5/22/2025',
      lastModifiedBy: 'Kyle Bidwell',
      emailContent: {
        to: 'Candidate',
        from: 'System',
        subject: 'Demonstrating the Text Notify feature',
        body: 'A brief message intended only to help demonstrate the Text Notify feature. A parallel text will be sent to the candidate along with this email.'
      },
      textingContent: {
        content: '[[Company Name]]: This is the text that will be sent. Be sure to check your email for details.'
      },
      workflowSteps: [],
      applicationStatus: [],
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    },
    'test': {
      id: 'test',
      name: 'test',
      description: '',
      category: 'Other',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      deliveryType: 'Manual',
      status: 'Active',
      created: '1/26/2023',
      createdBy: 'Kyle Bidwell',
      lastModified: '1/26/2023',
      lastModifiedBy: 'Kyle Bidwell',
      emailContent: {
        to: 'Candidate',
        from: 'System',
        subject: 'Test Message',
        body: 'This is a test message template.'
      },
      textingContent: {
        content: 'Test text message content.'
      },
      workflowSteps: [],
      applicationStatus: [],
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    }
  }
  
  return templates[id as keyof typeof templates] || templates['demonstrate-text-notify']
}

export default function MessageTemplateDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const template = getMessageTemplateData(params.id)
  const [activeTab, setActiveTab] = useState<'overview' | 'email' | 'texting'>('overview')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [associatedApplicationStatus, setAssociatedApplicationStatus] = useState<string | null>(null)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)

  useEffect(() => {
    if (searchParams) {
      const success = searchParams.get('success')
      if (success === 'workflow' || success === 'application-status' || success === 'email-content' || success === 'text-content') {
        setShowSuccessMessage(true)
        if (success === 'application-status') {
          // Simulate setting an application status (in real app, this would come from the save)
          setAssociatedApplicationStatus('Non-Hireable')
        }
        // Clear the URL parameter
        const url = new URL(window.location.href)
        url.searchParams.delete('success')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [searchParams])

  const handleBackToTemplates = () => {
    router.push('/admin-console/messaging/custom-message-templates')
  }

  const handleDeactivateMessage = () => {
    setShowDeactivateModal(true)
  }

  const handleDeleteMessage = () => {
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}/delete`)
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
            <h1 className="text-2xl font-semibold text-gray-900">Demonstrate Text Notify</h1>
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
                  You have successfully <strong>edited</strong> workflow steps associated to <strong>Demonstrate Text Notify</strong> custom message. Please review the details below.
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
                      onClick={() => router.push(`/admin-console/messaging/custom-message-templates/${params.id}/edit`)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ✏️ Edit Overview
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Template Name:</label>
                      <div className="text-sm text-gray-700">{template.name}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Description:</label>
                      <div className="text-sm text-gray-700">{template.description || 'No description provided'}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Category:</label>
                      <div className="text-sm text-gray-700">{template.category}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Site:</label>
                      <div className="text-sm text-gray-700">{template.site}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Delivery Type:</label>
                      <div className="text-sm text-gray-700">
                        {associatedApplicationStatus 
                          ? `Auto Send - This message has been associated with the following [workflows/application status].`
                          : `${template.deliveryType} - This message has not been associated with a workflow step or an application status.`
                        }
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button 
                        onClick={() => router.push(`/admin-console/messaging/custom-message-templates/${params.id}/workflow`)}
                        className="text-orange-500 hover:text-orange-600 text-sm"
                      >
                        »Edit association with workflow steps
                      </button>
                      <br />
                      <button 
                        onClick={() => router.push(`/admin-console/messaging/custom-message-templates/${params.id}/application-status`)}
                        className="text-orange-500 hover:text-orange-600 text-sm"
                      >
                        »Edit association with application status
                      </button>
                      
                      {/* Show associated application status */}
                      {associatedApplicationStatus && (
                        <div className="mt-4 ml-8">
                          <div className="text-sm text-gray-700">
                            {associatedApplicationStatus} ( <button className="text-orange-500 hover:text-orange-600">Edit</button> )
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black">Email Content</h1>
                    <Button 
                      onClick={() => router.push(`/admin-console/messaging/custom-message-templates/${params.id}/email`)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ✏️ Edit Email Content
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">To:</label>
                      <div className="text-sm text-gray-700">{template.emailContent.to}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">From:</label>
                      <div className="text-sm text-gray-700">{template.emailContent.from}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Subject:</label>
                      <div className="text-sm text-gray-700">{template.emailContent.subject}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Email Body:</label>
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded border">
                        {template.emailContent.body}
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
                      onClick={() => router.push(`/admin-console/messaging/custom-message-templates/${params.id}/text`)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ✏️ Edit Text Content
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Texting Content:</label>
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded border">
                        {template.textingContent.content}
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
                <button 
                  onClick={handleDeleteMessage}
                  className="flex items-center gap-2 text-white hover:text-gray-300 text-sm w-full text-left"
                >
                  <span>🗑️</span>
                  Delete Message
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
                  <div className="text-gray-300">On {template.created}</div>
                  <div className="text-gray-300">By {template.createdBy}</div>
                </div>
                <div>
                  <div className="text-white font-medium">Last Modified:</div>
                  <div className="text-gray-300">On {template.lastModified}</div>
                  <div className="text-gray-300">By {template.lastModifiedBy}</div>
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
                  {template.languageVersions.map((lang) => (
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
