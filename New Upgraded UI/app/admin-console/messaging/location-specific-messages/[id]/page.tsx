'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock location specific message data
const getLocationSpecificMessageData = (id: string) => {
  const messages = {
    'location-details-page': {
      id: 'location-details-page',
      name: 'Location Details Page',
      location: 'Central Region',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      description: 'This page provides a view of all of the available jobs for a specific location. It also serves as the "home page" for the specific location.',
      messageType: 'Application Page',
      status: 'Inactive',
      created: '10/2/2020',
      createdBy: 'System Admin',
      lastModified: '10/2/2020',
      lastModifiedBy: 'System Admin',
      content: '<p>Welcome to our location! Browse available positions and apply today.</p>',
      languageVersions: [
        { code: 'en-CA', name: 'English (CA)', isDefault: true },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' }
      ]
    }
  }
  
  return messages[id as keyof typeof messages] || messages['location-details-page']
}

export default function LocationSpecificMessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = getLocationSpecificMessageData(params.id)
  const [activeTab, setActiveTab] = useState<'overview' | 'content'>('overview')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [messageStatus, setMessageStatus] = useState(message.status)
  const [messageContent, setMessageContent] = useState(message.content)

  const handleSave = () => {
    console.log('Saving message content...', { messageContent, messageStatus })
    router.push('/admin-console/messaging/location-specific-messages?success=edit')
  }

  const handleCancel = () => {
    router.back()
  }

  useEffect(() => {
    if (searchParams) {
      const success = searchParams.get('success')
      if (success === 'edit') {
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
            <span className="text-2xl">📄</span>
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

        {/* Location Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-black">{message.location}</h2>
          <p className="text-sm text-gray-600 mt-2">
            You are viewing the Location Specific Message that will be used for the <strong>{message.name}</strong> message for the following location: <strong>{message.location}</strong>.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            (Note: Text and images entered below are visible to candidates, and it is the HMC user's responsibility to ensure that they align with your company's business policies and adhere to any related compliance requirements.)
          </p>
        </div>

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
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'content'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300'
                }`}
              >
                Message Content
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Name:</label>
                      <div className="text-sm text-gray-700">{message.name}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Site:</label>
                      <div className="text-sm text-gray-700">{message.site}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Description:</label>
                      <div className="text-sm text-gray-700">{message.description}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Message Type:</label>
                      <div className="text-sm text-gray-700">{message.messageType}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Message Status:</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={messageStatus === 'Active'}
                            onChange={(e) => setMessageStatus(e.target.value)}
                            className="mr-2"
                          />
                          Active
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="Inactive"
                            checked={messageStatus === 'Inactive'}
                            onChange={(e) => setMessageStatus(e.target.value)}
                            className="mr-2"
                          />
                          Inactive
                        </label>
                      </div>
                    </div>

                    {/* Rich Text Editor Placeholder */}
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Content:</label>
                      <div className="border border-gray-300 rounded">
                        {/* Toolbar */}
                        <div className="bg-gray-100 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">✕</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">📋</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">📄</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">📁</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">💾</button>
                          <span className="border-l border-gray-300 mx-1"></span>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">↶</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">↷</button>
                          <span className="border-l border-gray-300 mx-1"></span>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">🖨️</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">🔍</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">🔗</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">📊</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">🖼️</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">📹</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">🔧</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">Source</button>
                        </div>
                        <div className="bg-gray-100 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                          <button className="px-2 py-1 text-xs font-bold border border-gray-300 bg-white hover:bg-gray-50">B</button>
                          <button className="px-2 py-1 text-xs italic border border-gray-300 bg-white hover:bg-gray-50">I</button>
                          <button className="px-2 py-1 text-xs underline border border-gray-300 bg-white hover:bg-gray-50">U</button>
                          <button className="px-2 py-1 text-xs line-through border border-gray-300 bg-white hover:bg-gray-50">S</button>
                          <span className="border-l border-gray-300 mx-1"></span>
                          <select className="px-2 py-1 text-xs border border-gray-300 bg-white">
                            <option>Font</option>
                          </select>
                          <select className="px-2 py-1 text-xs border border-gray-300 bg-white">
                            <option>Size</option>
                          </select>
                          <select className="px-2 py-1 text-xs border border-gray-300 bg-white">
                            <option>Styles</option>
                          </select>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">A</button>
                          <button className="px-2 py-1 text-xs border border-gray-300 bg-white hover:bg-gray-50">🎨</button>
                        </div>
                        
                        {/* Content Area */}
                        <textarea
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          className="w-full h-64 p-4 border-0 resize-none focus:outline-none"
                          placeholder="Enter your message content here..."
                        />
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
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6"
                      >
                        Cancel
                      </Button>
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
              messageStatus === 'Active' 
                ? 'bg-green-100 border-green-300' 
                : 'bg-red-100 border-red-300'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  messageStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`font-medium ${
                  messageStatus === 'Active' ? 'text-green-800' : 'text-red-800'
                }`}>{messageStatus}</span>
              </div>
              <p className={`text-sm ${
                messageStatus === 'Active' ? 'text-green-700' : 'text-red-700'
              }`}>
                {messageStatus === 'Active' 
                  ? 'This message is available for use.' 
                  : 'This message will not be used.'
                }
              </p>
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
      </div>
    </div>
  )
}
