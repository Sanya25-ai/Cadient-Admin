'use client'

import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const sampleTextMessages = [
  {
    id: 'interview-confirmation-text',
    message: "Interview Confirmation Text",
    status: "Active",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020"
  },
  {
    id: 'application-status-update-text',
    message: "Application Status Update Text",
    status: "Active",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020"
  },
  {
    id: 'welcome-message-text',
    message: "Welcome Message Text",
    status: "Inactive",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020"
  }
]

const statusOptions = ['All Statuses', 'Active', 'Inactive']
const siteOptions = [
  'All Sites',
  'Sales Demo Retail Omega CMS',
  'Sales Demo Retail Omega Req Internal Seeker Site',
  'Sales Demo Retail Omega Canada Req External Seeker',
  'Sales Demo Retail Omega HMC',
  'Sales Demo Retail Omega Non-Req Internal Seeker Site',
  'Sales Demo Retail Omega Req Lite and Tools',
  'Sales Demo Retail Omega New Employee Onboarding',
  'Sales Demo Retail Omega New Manager Onboarding',
  'Sales Demo Retail Omega Non-Req External Seeker Site',
  'Sales Demo Retail Omega Req External Seeker Site',
  'Sales Demo Retail Omega Non-Req HireNow'
]

export default function BaseProductTextMessagesPage() {
  const router = useRouter()
  const [showStatusFilter, setShowStatusFilter] = useState(false)
  const [showSiteFilter, setShowSiteFilter] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')
  const [selectedSite, setSelectedSite] = useState('All Sites')

  const handleMessageClick = (messageId: string) => {
    router.push(`/admin-console/messaging/base-product-text-messages/${messageId}`)
  }

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status)
    setShowStatusFilter(false)
  }

  const handleSiteSelect = (site: string) => {
    setSelectedSite(site)
    setShowSiteFilter(false)
  }

  const filteredMessages = sampleTextMessages.filter(message => {
    const statusMatch = selectedStatus === 'All Statuses' || message.status === selectedStatus
    const siteMatch = selectedSite === 'All Sites' || message.site.includes(selectedSite.replace('Sales Demo Retail Omega ', ''))
    return statusMatch && siteMatch
  })

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
          <h1 className="text-2xl font-semibold text-black mb-4">Base Product Text Messages</h1>
          
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
            <span className="text-black font-medium">Base Product Text Messages</span>
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

        {/* Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-2">Details</h2>
          <p className="text-sm text-gray-600">
            These Base Product Text Messages are the initial messages included in the system which exist only as text (and not email) messages. You can modify the text included in the messages by clicking the specific message you would like to edit. (NOTE: Text messaging is not available for internal candidates.)
          </p>
        </div>

        {/* Filter Results Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-black mb-4">Filter Results</h3>
          <div className="flex gap-4 flex-wrap">
            {/* By Status Filter */}
            <div className="relative">
              <Button 
                onClick={() => setShowStatusFilter(!showStatusFilter)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 flex items-center gap-2"
              >
                🔽 By Status
              </Button>
              {showStatusFilter && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-48">
                  <div className="p-4">
                    <h4 className="font-medium text-black mb-3">By Status</h4>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusSelect(status)}
                          className={`block w-full text-left px-3 py-2 rounded text-sm ${
                            selectedStatus === status
                              ? 'bg-yellow-500 text-black'
                              : 'text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* By Site Filter */}
            <div className="relative">
              <Button 
                onClick={() => setShowSiteFilter(!showSiteFilter)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 flex items-center gap-2"
              >
                🔽 By Site
              </Button>
              {showSiteFilter && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-80">
                  <div className="p-4">
                    <h4 className="font-medium text-black mb-3">By Site</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {siteOptions.map((site) => (
                        <button
                          key={site}
                          onClick={() => handleSiteSelect(site)}
                          className={`block w-full text-left px-3 py-2 rounded text-sm ${
                            selectedSite === site
                              ? 'bg-yellow-500 text-black'
                              : 'text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {site}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="border border-gray-200 rounded-lg">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Results: 1-{filteredMessages.length} of {filteredMessages.length}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>1 of 1</option>
              </select>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <tr 
                    key={message.id} 
                    onClick={() => handleMessageClick(message.id)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 hover:underline">
                      {message.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          message.status === 'Active' 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {message.site}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {message.modified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Click outside to close filters */}
        {(showStatusFilter || showSiteFilter) && (
          <div 
            className="fixed inset-0 z-5"
            onClick={() => {
              setShowStatusFilter(false)
              setShowSiteFilter(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
