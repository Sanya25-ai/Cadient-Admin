'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Filter,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const sampleMessages = [
  {
    id: 1,
    message: "Applicant Interview Reminder Email",
    urlId: "applicant-interview-reminder-email",
    status: "Active",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020",
    description: "This email is sent as a reminder for interview or phone screen. It is sent to the candidate when a interview or phone screen is scheduled on the ADR H..."
  },
  {
    id: 2,
    message: "Application Confirmation Email",
    urlId: "application-confirmation-email",
    status: "Active",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020",
    description: "This email confirms that the application has been received and is being processed."
  },
  {
    id: 3,
    message: "Saved Application - Initial Email",
    urlId: "saved-application-initial-email",
    status: "Active",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020",
    description: "This email is sent when a candidate saves their application for the first time."
  },
  {
    id: 4,
    message: "Application Confirmation Email For Submit Resume",
    urlId: "application-confirmation-email-for-submit-resume",
    status: "Active",
    site: "Sales Demo Retail Omega Non-Req External Seeker Site",
    modified: "10/2/2020",
    description: "This email confirms that the resume has been submitted successfully."
  },
  {
    id: 5,
    message: "Job Alert Mail",
    urlId: "job-alert-mail",
    status: "Inactive",
    site: "Sales Demo Retail Omega CMS",
    modified: "10/2/2020",
    description: "This email sends job alerts to candidates based on their preferences."
  }
]

const statusOptions = [
  "All Statuses",
  "Active", 
  "Inactive"
]

const siteOptions = [
  "All Sites",
  "Sales Demo Retail Omega CMS",
  "Sales Demo Retail Omega Req Internal Seeker Site",
  "Sales Demo Retail Omega Canada Req External Seeker",
  "Sales Demo Retail Omega HMC",
  "Sales Demo Retail Omega Non-Req Internal Seeker Site",
  "Sales Demo Retail Omega Req Life and Tools",
  "Sales Demo Retail Omega New Employee Onboarding",
  "Sales Demo Retail Omega New Manager Onboarding",
  "Sales Demo Retail Omega Non-Req External Seeker Site",
  "Sales Demo Retail Omega Req External Seeker Site",
  "Sales Demo Retail Omega Non-Req HireNow"
]

export default function BaseProductMessagesPage() {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [selectedSite, setSelectedSite] = useState("All Sites")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showSiteDropdown, setShowSiteDropdown] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)

  const handleMessageClick = (urlId: string) => {
    router.push(`/admin-console/messaging/base-product-messages/${urlId}`)
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-4">
          <Link href="/admin-console/communications">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0"
            >
              ← Back
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Base Product Messages</h1>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm">
          <Link href="/admin-console/messaging/custom-message-templates" className="text-[#EE5A37] hover:underline">
            Custom Message Templates
          </Link>
          <span className="text-gray-600"> | Base Product Messages | </span>
          <Link href="/admin-console/messaging/base-product-text-messages" className="text-[#EE5A37] hover:underline">
            Base Product Text Messages
          </Link>
          <span className="text-gray-600"> | </span>
          <Link href="/admin-console/messaging/location-specific-messages" className="text-[#EE5A37] hover:underline">
            Location Specific Messages
          </Link>
          <span className="text-gray-600"> | </span>
          <Link href="/admin-console/messaging/promotion-module" className="text-[#EE5A37] hover:underline">
            Promotion Module
          </Link>
          <span className="text-gray-600"> | </span>
          <Link href="/admin-console/messaging/admin-module-services-user" className="text-[#EE5A37] hover:underline">
            Admin Module for Services User
          </Link>
          <span className="text-gray-600"> | </span>
          <Link href="/admin-console/messaging/hmc-messages" className="text-[#EE5A37] hover:underline">
            HMC Messages
          </Link>
        </div>

        {/* Filter Results Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Filter Results</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <Button 
                variant="outline" 
                className="bg-[#F5A623] text-white border-[#F5A623] hover:bg-[#E09612]"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <Filter className="h-4 w-4 mr-2" />
                By Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {showStatusDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                  <div className="p-4">
                    <h4 className="font-medium text-black mb-3">By Status</h4>
                    <div className="space-y-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status)
                            setShowStatusDropdown(false)
                          }}
                          className={`block w-full text-left px-3 py-2 rounded text-sm ${
                            selectedStatus === status
                              ? 'bg-yellow-400 text-black'
                              : status === 'Active'
                              ? 'bg-yellow-400 text-black'
                              : status === 'Inactive'
                              ? 'border border-orange-500 text-orange-500'
                              : 'border border-orange-500 text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowStatusDropdown(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                className="bg-[#F5A623] text-white border-[#F5A623] hover:bg-[#E09612]"
                onClick={() => setShowSiteDropdown(!showSiteDropdown)}
              >
                <Filter className="h-4 w-4 mr-2" />
                By Site
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {showSiteDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[400px]">
                  <div className="p-4">
                    <h4 className="font-medium text-black mb-3">By Site</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {siteOptions.map((site) => (
                        <button
                          key={site}
                          onClick={() => {
                            setSelectedSite(site)
                            setShowSiteDropdown(false)
                          }}
                          className={`block w-full text-left px-3 py-2 rounded text-sm ${
                            selectedSite === site
                              ? 'bg-yellow-400 text-black'
                              : site === 'All Sites'
                              ? 'bg-yellow-400 text-black'
                              : 'border border-orange-500 text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {site}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowSiteDropdown(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
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
              Results: 1-50 of 89
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>1 of 2</option>
                <option>2 of 2</option>
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
                {sampleMessages.map((message) => (
                  <tr 
                    key={message.id} 
                    className="hover:bg-gray-50 cursor-pointer relative"
                    onMouseEnter={() => setHoveredMessage(message.id)}
                    onMouseLeave={() => setHoveredMessage(null)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                      <button 
                        onClick={() => handleMessageClick(message.urlId)}
                        className="text-orange-500 hover:underline text-left"
                      >
                        {message.message}
                      </button>
                      {hoveredMessage === message.id && (
                        <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-4 w-80">
                          <div className="text-sm">
                            <div className="font-medium text-black mb-2">
                              <strong>Site:</strong> {message.site}
                            </div>
                            <div className="text-gray-700">
                              <strong>Description:</strong> {message.description}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          message.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        } hover:bg-green-100`}
                      >
                        {message.status}
                      </Badge>
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
      </div>
    </div>
  )
}
