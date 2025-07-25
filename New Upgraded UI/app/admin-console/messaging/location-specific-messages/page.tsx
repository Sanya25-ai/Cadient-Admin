'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const locationMessages = [
  {
    id: 'location-details-page',
    message: "Location Details Page",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Inactive",
    type: "Application Page",
    description: "This page provides a view of all of the available jobs for a specific location. It also serves as the \"home page\" for the specific location."
  },
  {
    id: 'knockout-message-failed-prescreener',
    message: "Knockout Message: Failed Prescreener",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Inactive",
    type: "Application Page",
    description: "This message is displayed when a candidate fails the prescreening questions and is not eligible to continue with the application process."
  },
  {
    id: 'application-confirmation-page',
    message: "Application Confirmation Page",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Inactive",
    type: "Application Page",
    description: "This page confirms that the candidate's application has been successfully submitted and provides next steps information."
  },
  {
    id: 'knockout-message-not-eligible',
    message: "Knockout Message: Not Eligible for Re-Hire",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Inactive",
    type: "Application Page",
    description: "This message is shown to candidates who are not eligible for re-hire based on their previous employment history."
  },
  {
    id: 'knockout-message-failed-assessment',
    message: "Knockout Message: Failed Assessment",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Inactive",
    type: "Application Page",
    description: "This message appears when a candidate does not meet the minimum requirements based on their assessment results."
  }
]

const siteOptions = [
  '-------------------',
  'Sales Demo Retail Omega Canada Req External Seeker',
  'Sales Demo Retail Omega Non-Req External Seeker Site',
  'Sales Demo Retail Omega Non-Req HireNow',
  'Sales Demo Retail Omega Non-Req Internal Seeker Site',
  'Sales Demo Retail Omega Req External Seeker Site',
  'Sales Demo Retail Omega Req Internal Seeker Site'
]

const statusOptions = [
  '-------------------',
  'Active',
  'Inactive'
]

const typeOptions = [
  '-------------------',
  'Application Page',
  'Base Product Email',
  'Custom Email'
]

const locationTree = {
  usa: {
    name: 'USA',
    expanded: true,
    children: {
      'cadient-talent': {
        name: 'Cadient Talent',
        expanded: false,
        children: {}
      },
      'central-region': {
        name: 'Central Region',
        expanded: true,
        children: {
          'chicago-headquarters': { name: 'Chicago—Headquarters', expanded: false, children: {} },
          'cincinnati': { name: 'Cincinnati', expanded: false, children: {} },
          'franklin': { name: 'Franklin', expanded: false, children: {} },
          'nashville': { name: 'Nashville', expanded: false, children: {} },
          'ohio-plant-205': { name: 'Ohio Plant 205', expanded: false, children: {} },
          'springfield': { name: 'Springfield', expanded: false, children: {} },
          'st-louis': { name: 'St. Louis', expanded: false, children: {} }
        }
      },
      'eastern-region': {
        name: 'Eastern Region',
        expanded: false,
        children: {}
      },
      'western-region': {
        name: 'Western Region',
        expanded: false,
        children: {}
      }
    }
  },
  headquarters: {
    name: 'HeadQuarters',
    expanded: false,
    children: {}
  }
}

export default function LocationSpecificMessagesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedLocation, setSelectedLocation] = useState<string | null>('central-region')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['usa', 'central-region']))
  const [showFilterMessages, setShowFilterMessages] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [filterValues, setFilterValues] = useState({
    site: '-------------------',
    status: '-------------------',
    type: '-------------------'
  })

  useEffect(() => {
    if (searchParams) {
      const success = searchParams.get('success')
      if (success === 'edit') {
        setShowSuccessMessage(true)
        const url = new URL(window.location.href)
        url.searchParams.delete('success')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [searchParams])

  const handleLocationSelect = (locationKey: string) => {
    setSelectedLocation(locationKey)
  }

  const toggleExpanded = (nodeKey: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeKey)) {
      newExpanded.delete(nodeKey)
    } else {
      newExpanded.add(nodeKey)
    }
    setExpandedNodes(newExpanded)
  }

  const renderLocationTree = (nodes: any, level = 0) => {
    return Object.entries(nodes).map(([key, node]: [string, any]) => (
      <div key={key} style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center py-1">
          {Object.keys(node.children).length > 0 && (
            <button
              onClick={() => toggleExpanded(key)}
              className="mr-1 text-orange-500 hover:text-orange-600"
            >
              {expandedNodes.has(key) ? '−' : '+'}
            </button>
          )}
          <button
            onClick={() => handleLocationSelect(key)}
            className={`text-sm hover:underline ${
              selectedLocation === key ? 'text-black font-medium' : 'text-orange-500'
            }`}
          >
            {node.name}
          </button>
        </div>
        {expandedNodes.has(key) && Object.keys(node.children).length > 0 && (
          <div>
            {renderLocationTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  const getLocationDisplayName = () => {
    if (selectedLocation === 'central-region') return 'Central Region'
    return 'No Location is selected.'
  }

  const handleMessageClick = (messageId: string) => {
    router.push(`/admin-console/messaging/location-specific-messages/${messageId}`)
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
          <h1 className="text-2xl font-semibold text-black mb-4">Location Specific Messages</h1>
          
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
            <span className="text-black font-medium">Location Specific Messages</span>
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
                  You have successfully <strong>edited</strong> the Location Details Page location specific message.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-2">Details</h2>
          <p className="text-sm text-gray-600">
            You can create, edit and manage Location Specific Messages for each location you have permission to access. All of the the Location Specific Messages for the selected location are listed below.
          </p>
        </div>

        {/* Filter Messages Button */}
        {selectedLocation && (
          <div className="mb-6">
            <Button 
              onClick={() => setShowFilterMessages(!showFilterMessages)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2"
            >
              🔽 Filter These Messages
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Left Sidebar - Location Tree */}
          <div className="w-80">
            <div className="bg-gray-100 rounded p-4">
              <h3 className="font-medium text-black mb-2">Select a Location</h3>
              <p className="text-sm text-gray-600 mb-4">
                Modify the Location Specific Messages for a location.
              </p>
              <div className="space-y-1">
                {renderLocationTree(locationTree)}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {selectedLocation ? (
              <div>
                {/* Location Header */}
                <div className="bg-gray-100 p-4 rounded mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">📍</span>
                    <h2 className="text-lg font-medium text-black">{getLocationDisplayName()}</h2>
                  </div>
                  
                  {/* Results Table */}
                  <div className="bg-white border border-gray-200 rounded">
                    {/* Table Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Results: 1-5 of 5
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
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Message | Site
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Message Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Message Type
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {locationMessages.map((message) => (
                            <tr 
                              key={message.id}
                              onClick={() => handleMessageClick(message.id)}
                              onMouseEnter={() => setHoveredMessage(message.id)}
                              onMouseLeave={() => setHoveredMessage(null)}
                              className="hover:bg-gray-50 cursor-pointer relative"
                            >
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">📄</span>
                                  <div>
                                    <div className="text-orange-500 hover:text-orange-600 hover:underline">
                                      {message.message}
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                      {message.site}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Hover Description Tooltip */}
                                {hoveredMessage === message.id && (
                                  <div className="absolute z-50 bg-white border border-gray-300 rounded shadow-lg p-3 mt-2 w-80 left-4">
                                    <div className="text-sm">
                                      <span className="font-medium">Description: </span>
                                      <span className="text-gray-700">{message.description}</span>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">
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
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {message.type}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-8 rounded text-center">
                <span className="text-lg">📍</span>
                <p className="text-gray-600 mt-2">No Location is selected.</p>
              </div>
            )}
          </div>
        </div>

        {/* Filter Modal */}
        {showFilterMessages && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowFilterMessages(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Refine Button */}
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black mb-6"
                onClick={() => {
                  // Apply filters logic here
                  setShowFilterMessages(false)
                }}
              >
                Refine
              </Button>

              {/* Site Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">Site:</label>
                <select
                  value={filterValues.site}
                  onChange={(e) => setFilterValues({ ...filterValues, site: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                >
                  {siteOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">Status:</label>
                <select
                  value={filterValues.status}
                  onChange={(e) => setFilterValues({ ...filterValues, status: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">Type:</label>
                <select
                  value={filterValues.type}
                  onChange={(e) => setFilterValues({ ...filterValues, type: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                >
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
