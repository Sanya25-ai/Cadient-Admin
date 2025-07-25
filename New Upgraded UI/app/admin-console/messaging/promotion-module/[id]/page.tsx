'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data for career site promotion details
const getCareerSiteData = (id: string) => {
  const sites = {
    'sales-demo-retail-omega-req-internal': {
      id: 'sales-demo-retail-omega-req-internal',
      name: 'Sales Demo Retail Omega Req Internal',
      hasMessage: false,
      status: 'Inactive',
      message: '',
      promotionHeader: '',
      promotionUrl: '',
      promotionUrlText: ''
    },
    'sales-demo-retail-omega-ktmd-nonreq-internal': {
      id: 'sales-demo-retail-omega-ktmd-nonreq-internal',
      name: 'Sales Demo Retail Omega KTMD NonReq Internal',
      hasMessage: false,
      status: 'Inactive',
      message: '',
      promotionHeader: '',
      promotionUrl: '',
      promotionUrlText: ''
    }
  }
  
  return sites[id as keyof typeof sites] || sites['sales-demo-retail-omega-req-internal']
}

export default function PromotionModuleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const siteData = getCareerSiteData(params.id)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    promotionHeader: '',
    promotionMessage: '',
    promotionUrl: '',
    promotionUrlText: ''
  })

  const handleCreateMessage = () => {
    setShowCreateForm(true)
  }

  const handleSave = () => {
    console.log('Saving promotion message...', formData)
    router.push('/admin-console/messaging/promotion-module')
  }

  const handleCancel = () => {
    if (showCreateForm) {
      setShowCreateForm(false)
    } else {
      router.back()
    }
  }

  if (showCreateForm) {
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
            <h1 className="text-2xl font-semibold text-black mb-4">Enter Promotion Message Details</h1>
            
            {/* Breadcrumb Navigation */}
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

          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-black mb-4">Overview</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Use this tool to modify the message that candidates will see on the home page. The example on the right provides an overview of what each field will look like. (Note: Text and images entered below are visible to candidates, and it is the HMC user's responsibility to ensure that they align with your company's business policies and adhere to any related compliance requirements.)
                </p>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Promotion Header */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      <span className="text-red-500">*</span> Promotion Header:
                    </label>
                    <input
                      type="text"
                      value={formData.promotionHeader}
                      onChange={(e) => setFormData({ ...formData, promotionHeader: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Enter promotion header"
                    />
                  </div>

                  {/* Promotion Message */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      <span className="text-red-500">*</span> Promotion Message:
                      <span className="ml-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                        You may enter up to 250 characters.
                      </span>
                    </label>
                    <div className="border border-gray-300 rounded">
                      {/* Rich Text Editor Toolbar */}
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
                        value={formData.promotionMessage}
                        onChange={(e) => setFormData({ ...formData, promotionMessage: e.target.value })}
                        className="w-full h-32 p-4 border-0 resize-none focus:outline-none"
                        placeholder="Enter your promotion message here..."
                        maxLength={250}
                      />
                    </div>
                  </div>

                  {/* Promotion URL */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Promotion URL:
                      <button className="ml-2 text-orange-500 hover:text-orange-600 text-xs underline">
                        (What's this?)
                      </button>
                    </label>
                    <input
                      type="url"
                      value={formData.promotionUrl}
                      onChange={(e) => setFormData({ ...formData, promotionUrl: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Enter promotion URL"
                    />
                    <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-gray-700">
                      This is the URL for the page where you want to direct candidates. To get this URL, access the career site as a candidate and locate the specific page you want to promote. Then, highlight the entire URL in the browser window, copy that URL and then paste it into this field.
                    </div>
                  </div>

                  {/* Promotion URL Text */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      <span className="text-red-500">*</span> Promotion URL Text:
                    </label>
                    <input
                      type="text"
                      value={formData.promotionUrlText}
                      onChange={(e) => setFormData({ ...formData, promotionUrlText: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder="Enter promotion URL text"
                    />
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

            {/* Right Sidebar - Example */}
            <div className="w-80">
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="text-center mb-4">
                  <span className="text-lg">-- Example --</span>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-bold">
                      8
                    </div>
                    <div>
                      <h3 className="font-medium text-black">Promotion Header</h3>
                      <p className="text-sm text-gray-600">
                        Promotion message goes in this area. You can use up to 250 characters for the body of the message.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded text-center font-medium">
                    Promotion URL Text
                  </div>
                </div>
              </div>
            </div>
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
          <h1 className="text-2xl font-semibold text-black mb-4">Promotion Module</h1>
          
          {/* Breadcrumb Navigation */}
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
            <span className="text-black font-medium">Promotion Module</span>
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

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Details Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-black mb-2">Details</h2>
              <p className="text-sm text-gray-600 mb-4">
                The candidate Promotion Module gives you the ability to promote any of the pages within CI to candidates. For example, you can promote a specific position, all positions at a specific location or even a specific position at a specific location.
              </p>

              {/* Current Status */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-black mb-2">Current Status:</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Inactive</span>
                </div>
              </div>

              {/* Current Message */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-2">Current Message:</h3>
                <p className="text-sm text-gray-600">You have not yet created a message.</p>
              </div>

              {/* Create Message Button */}
              <Button
                onClick={handleCreateMessage}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Create Message
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Multi-Language */}
          <div className="w-80">
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
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded text-xs hover:bg-yellow-500 flex items-center gap-1">
                    English
                    <span className="text-xs">ℹ️</span>
                  </button>
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded text-xs hover:bg-yellow-500 flex items-center gap-1">
                    Español
                    <span className="text-xs">ℹ️</span>
                  </button>
                  <button className="bg-yellow-400 text-black px-3 py-1 rounded text-xs hover:bg-yellow-500 flex items-center gap-1">
                    Français
                    <span className="text-xs">ℹ️</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
