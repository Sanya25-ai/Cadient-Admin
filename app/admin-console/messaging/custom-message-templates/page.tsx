"use client"

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CustomMessageTemplatesPage() {
  const router = useRouter()
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showSiteModal, setShowSiteModal] = useState(false)
  const [showDeliveryTypeModal, setShowDeliveryTypeModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null)

  // Function to convert message name to URL-friendly ID
  const getMessageId = (messageName: string) => {
    return messageName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  // Function to handle message click
  const handleMessageClick = (messageName: string) => {
    const messageId = getMessageId(messageName)
    router.push(`/admin-console/messaging/custom-message-templates/${messageId}`)
  }

  // Sample message data
  const messageTemplates = [
    {
      message: 'Demonstrate Text Notify',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      deliveryType: 'Manual',
      category: 'Other',
      modified: '5/22/2025',
      description: 'A sample template that has been built to demonstrate the messaging tools inclusion of Text Notify messages, even for manually send messages.'
    },
    {
      message: 'test',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active',
      deliveryType: 'Manual',
      category: 'Other',
      modified: '1/26/2023'
    },
    {
      message: 'Now Hiring for our new store in Nashville!',
      site: 'Sales Demo Retail Omega HMC',
      status: 'Active',
      deliveryType: 'Manual',
      category: 'Other',
      modified: '1/7/2021'
    },
    {
      message: 'Passed Background',
      site: 'Sales Demo Retail Omega Req External Seeker Site',
      status: 'Active',
      deliveryType: 'Manual',
      category: 'Other',
      modified: '10/2/2020'
    }
  ]

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
          <h1 className="text-2xl font-semibold text-black mb-4">Custom Message Templates</h1>
          
          {/* Breadcrumb Navigation */}
          <div className="text-sm text-gray-600 mb-6">
            <span className="text-black">Custom Message Templates</span>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/base-product-messages" className="text-orange-500 hover:text-orange-600">Base Product Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/base-product-text-messages" className="text-orange-500 hover:text-orange-600">Base Product Text Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/location-specific-messages" className="text-orange-500 hover:text-orange-600">Location Specific Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/promotion-module" className="text-orange-500 hover:text-orange-600">Promotion Module</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/admin-module-services-user" className="text-orange-500 hover:text-orange-600">Admin Module for Services User</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/hmc-messages" className="text-orange-500 hover:text-orange-600">HMC Messages</Link>
          </div>
        </div>

        {/* Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Details</h2>
          <p className="text-sm text-gray-700 mb-6">
            By creating custom messages, you can guarantee consistency in your communications. Additionally, you can assign a custom message to either a workflow step or to an application status, and have the system automatically send the message when the appropriate time comes. (NOTE: Text messaging is not available for internal candidates.)
          </p>
          
          {/* Create Custom Message Button */}
          <Button 
            onClick={() => window.location.href = '/admin-console/messaging/custom-message-templates/create'}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <span className="mr-2">+</span>
            Create Custom Message
          </Button>
        </div>

        {/* Filter Results Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-black mb-4">Filter Results</h3>
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => setShowStatusModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6"
            >
              🔽 By Status
            </Button>
            <Button
              onClick={() => setShowSiteModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6"
            >
              🔽 By Site
            </Button>
            <Button
              onClick={() => setShowDeliveryTypeModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6"
            >
              🔽 By Delivery Type
            </Button>
            <Button
              onClick={() => setShowCategoryModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6"
            >
              🔽 By Category
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-gray-200 p-4 flex items-center justify-between mb-0">
          <span className="text-sm text-gray-700">Results: 1-4 of 4</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Page:</span>
            <Select defaultValue="1">
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 of 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Table */}
        <div className="border border-gray-300 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Message</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Site</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Status</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Delivery Type</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Category</th>
                <th className="text-left p-3 font-medium text-black">Modified</th>
              </tr>
            </thead>
            <tbody>
              {messageTemplates.map((template, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-50 relative">
                  <td 
                    className="p-3 border-r border-gray-300 relative"
                    onMouseEnter={() => setHoveredMessage(template.message)}
                    onMouseLeave={() => setHoveredMessage(null)}
                  >
                    <span 
                      className="text-orange-500 cursor-pointer hover:underline"
                      onClick={() => handleMessageClick(template.message)}
                    >
                      {template.message}
                    </span>
                    
                    {/* Tooltip */}
                    {hoveredMessage === template.message && template.description && (
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-80">
                        <div className="text-sm">
                          <strong>Description:</strong> {template.description}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-3 border-r border-gray-300 text-sm">{template.site}</td>
                  <td className="p-3 border-r border-gray-300">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm">{template.status}</span>
                    </span>
                  </td>
                  <td className="p-3 border-r border-gray-300 text-sm">{template.deliveryType}</td>
                  <td className="p-3 border-r border-gray-300 text-sm">{template.category}</td>
                  <td className="p-3 text-sm">{template.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Filter Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">By Status</h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-black hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full">All Statuses</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Active</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Draft</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Inactive</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site Filter Modal */}
      {showSiteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">By Site</h2>
              <button
                onClick={() => setShowSiteModal(false)}
                className="text-black hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full">All Sites</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega CMS</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Req Internal Seeker Site</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Canada Req External Seeker</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega HMC</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Non-Req Internal Seeker Site</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Req Lite and Tools</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega New Employee Onboarding</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega New Manager Onboarding</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Non-Req External Seeker Site</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Req External Seeker Site</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sales Demo Retail Omega Non-Req HireNow</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Type Filter Modal */}
      {showDeliveryTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">By Delivery Type</h2>
              <button
                onClick={() => setShowDeliveryTypeModal(false)}
                className="text-black hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full">All Types</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Auto Send</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Manual</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">By Category</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-black hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white px-4 py-2 rounded-full">All Categories</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Offer</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Other</Button>
                <Button variant="outline" className="text-orange-500 border-orange-500 px-4 py-2 rounded-full">Sourcing</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
