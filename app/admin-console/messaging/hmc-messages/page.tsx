'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plus,
  Filter,
  Settings,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const sampleHMCMessages = [
  {
    id: 1,
    messageTitle: "New Manager Training",
    role: "Sales Demo Retail Omega Approver, Sales Demo Retail Omega eQuest Manager, Sales Demo Retail Omega Hiring Manager",
    status: "Inactive",
    startDate: "11/29/2023",
    endDate: "12/1/2023",
    modified: "12/2/2023"
  }
]

export default function HMCMessagesPage() {
  const router = useRouter()
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [hoveredRole, setHoveredRole] = useState<number | null>(null)

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(sampleHMCMessages.map(msg => msg.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectMessage = (id: number) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(msgId => msgId !== id))
    } else {
      setSelectedMessages([...selectedMessages, id])
    }
  }

  const handleDelete = () => {
    if (selectedMessages.length > 0) {
      // Here you would typically make an API call to delete the selected messages
      alert(`Deleting ${selectedMessages.length} message(s)`)
      setSelectedMessages([])
      setSelectAll(false)
    }
  }

  const handleMessageClick = (messageTitle: string) => {
    // Convert message title to URL-friendly format
    const urlId = messageTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    router.push(`/admin-console/messaging/hmc-messages/${urlId}`)
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
          <h1 className="text-2xl font-semibold text-black mb-4">HMC Messages</h1>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/admin-console/messaging/custom-message-templates" className="text-orange-500 hover:text-orange-600">
            Custom Message Templates
          </Link>
          <span className="mx-2">|</span>
          <Link href="/admin-console/messaging/base-product-messages" className="text-orange-500 hover:text-orange-600">
            Base Product Messages
          </Link>
          <span className="mx-2">|</span>
          <Link href="/admin-console/messaging/base-product-text-messages" className="text-orange-500 hover:text-orange-600">
            Base Product Text Messages
          </Link>
          <span className="mx-2">|</span>
          <Link href="/admin-console/messaging/location-specific-messages" className="text-orange-500 hover:text-orange-600">
            Location Specific Messages
          </Link>
          <span className="mx-2">|</span>
          <Link href="/admin-console/messaging/promotion-module" className="text-orange-500 hover:text-orange-600">
            Promotion Module
          </Link>
          <span className="mx-2">|</span>
          <Link href="/admin-console/messaging/admin-module-services-user" className="text-orange-500 hover:text-orange-600">
            Admin Module for Services User
          </Link>
          <span className="mx-2">|</span>
          <span className="text-black">HMC Messages</span>
        </div>

        {/* Details Section */}
        <div className="mb-8">
          <p className="text-sm text-gray-700 mb-6">
            HMC messages are displayed on home page. Messages are associated with roles and all users having those roles will see messages on home page.
          </p>
        </div>

        {/* Create HMC Message Button */}
        <div className="mb-6">
          <Button 
            onClick={() => router.push('/admin-console/messaging/hmc-messages/create')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create HMC Message
          </Button>
        </div>

        {/* Delete Button */}
        <div className="mb-4">
          <Button 
            onClick={handleDelete}
            disabled={selectedMessages.length === 0}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            🗑️ Delete
          </Button>
        </div>

        {/* Results Header */}
        <div className="bg-gray-200 px-4 py-3 flex justify-between items-center mb-0">
          <div className="text-sm text-gray-700">
            Results: 1-1 of 1
          </div>
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
                <th className="text-left p-3 font-medium text-black border-r border-gray-300 w-12">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Message Title</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Role</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Status</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">Start Date</th>
                <th className="text-left p-3 font-medium text-black border-r border-gray-300">End Date</th>
                <th className="text-left p-3 font-medium text-black">Modified</th>
              </tr>
            </thead>
            <tbody>
              {sampleHMCMessages.map((message) => (
                <tr key={message.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-3 border-r border-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => handleSelectMessage(message.id)}
                      className="rounded"
                    />
                  </td>
                  <td 
                    className="p-3 border-r border-gray-300 relative"
                    onMouseEnter={() => setHoveredMessage(message.id)}
                    onMouseLeave={() => setHoveredMessage(null)}
                  >
                    <span 
                      className="text-orange-500 cursor-pointer hover:underline"
                      onClick={() => handleMessageClick(message.messageTitle)}
                    >
                      {message.messageTitle}
                    </span>
                    
                    {/* Tooltip for Message Title */}
                    {hoveredMessage === message.id && (
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-80">
                        <div className="text-sm">
                          <div className="font-medium text-black mb-2">
                            <strong>Message Title:</strong> {message.messageTitle}
                          </div>
                          <div className="text-gray-700 mb-2">
                            <strong>Status:</strong> <span className={`inline-flex items-center ml-1`}>
                              <span className={`w-2 h-2 rounded-full mr-1 ${
                                message.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                              }`}></span>
                              {message.status}
                            </span>
                          </div>
                          <div className="text-gray-700 mb-2">
                            <strong>Start Date:</strong> {message.startDate}
                          </div>
                          <div className="text-gray-700 mb-2">
                            <strong>End Date:</strong> {message.endDate}
                          </div>
                          <div className="text-gray-700">
                            <strong>Role:</strong> {message.role}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td 
                    className="p-3 border-r border-gray-300 text-sm relative"
                    onMouseEnter={() => setHoveredRole(message.id)}
                    onMouseLeave={() => setHoveredRole(null)}
                  >
                    <span className="cursor-pointer">
                      {message.role}
                    </span>
                    
                    {/* Tooltip for Role */}
                    {hoveredRole === message.id && (
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-96">
                        <div className="text-sm">
                          <div className="font-medium text-black mb-2">
                            <strong>Role:</strong>
                          </div>
                          <div className="text-gray-700">
                            {message.role}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-3 border-r border-gray-300">
                    <span className="inline-flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        message.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span className="text-sm">{message.status}</span>
                    </span>
                  </td>
                  <td className="p-3 border-r border-gray-300 text-sm">{message.startDate}</td>
                  <td className="p-3 border-r border-gray-300 text-sm">{message.endDate}</td>
                  <td className="p-3 text-sm">{message.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
