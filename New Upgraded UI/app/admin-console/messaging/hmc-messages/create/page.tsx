'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const roles = [
  'Calendar Integration Interview Scheduling',
  'Regional Manager Organizer',
  'Sales Demo Retail Omega Approver',
  'Sales Demo Retail Omega eQuest Manager',
  'Sales Demo Retail Omega Hiring Manager',
  'Sales Demo Retail Omega Hourly Recruiter',
  'Sales Demo Retail Omega Hourly Recruiter Everify',
  'Sales Demo Retail Omega Hourly Recruiter Everify',
  'Sales Demo Retail Omega Recruiter',
  'Sales Demo Retail Omega Recruiter Everify',
  'Sales Demo Retail Omega Recruiter Everify',
  'SD Hybrid Recruiter',
  'SELF USER ASSOCIATION',
  'Workforce Hiring Analytics',
  'Workforce Hiring Analytics - Advanced',
  'Workforce Hiring Analytics - Legal',
  'Workforce Hiring Analytics - Regional'
]

export default function CreateHMCMessagePage() {
  const router = useRouter()
  const [messageTitle, setMessageTitle] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, role])
    } else {
      setSelectedRoles(selectedRoles.filter(r => r !== role))
      setSelectAll(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedRoles([...roles])
    } else {
      setSelectedRoles([])
    }
  }

  const handleDeselectAll = () => {
    setSelectAll(false)
    setSelectedRoles([])
  }

  const handleSave = () => {
    // Here you would typically save the message
    console.log({
      messageTitle,
      messageContent,
      startDate,
      endDate,
      selectedRoles
    })
    alert('Message saved successfully!')
    router.push('/admin-console/messaging/hmc-messages')
  }

  const handleCancel = () => {
    router.push('/admin-console/messaging/hmc-messages')
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
          <h1 className="text-2xl font-semibold text-black mb-4">HMC Message Editor</h1>
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
          <Link href="/admin-console/messaging/hmc-messages" className="text-orange-500 hover:text-orange-600">
            HMC Messages
          </Link>
        </div>

        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Overview</h2>
          <p className="text-sm text-gray-700 mb-6">
            You may author and manage your HMC Messages here. Please make sure all required fields (marked with a red *) have been filled out before clicking Save.
          </p>
        </div>

        {/* Message Content Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Message Content</h2>
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-sm text-gray-700 mb-6">
              Enter a short, descriptive Message Title and enter the content of the message in the editing box. Note that Rich Text features may be applied to the message text.
              Note: Multi-language support is available after a message has been saved.
            </p>
            
            {/* Message Title */}
            <div className="mb-6">
              <Label htmlFor="messageTitle" className="text-sm font-medium text-black mb-2 block">
                * Message Title
              </Label>
              <Input
                id="messageTitle"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                className="w-full"
                placeholder="Enter message title"
              />
            </div>

            {/* Message Content */}
            <div className="mb-6">
              <Label htmlFor="messageContent" className="text-sm font-medium text-black mb-2 block">
                * Message
              </Label>
              <div className="border border-gray-300 rounded">
                {/* Rich Text Editor Toolbar */}
                <div className="border-b border-gray-300 p-2 bg-gray-50 flex items-center gap-2 text-sm">
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option>Font</option>
                  </select>
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option>Size</option>
                  </select>
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option>Styles</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded text-xs font-bold">B</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-xs italic">I</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-xs underline">U</button>
                  </div>
                </div>
                <Textarea
                  id="messageContent"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="min-h-[200px] border-0 rounded-none resize-none focus:ring-0"
                  placeholder="Enter your message content here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Message Properties Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Message Properties</h2>
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-sm text-gray-700 mb-6">
              You will also need to enter a Start Date and End Date for each new message. Messages will appear and disappear on the HMC accordingly. Finally, choose at least one Role to which the message applies. You may select multiple Roles by clicking on the check box next to each Role listed below.
            </p>
            
            {/* Date Fields */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-black mb-2 block">
                  * Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      📅 {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-black mb-2 block">
                  * End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      📅 {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Roles Section */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-black">* Role</span>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => handleSelectAll(true)}
                  className="text-orange-500 hover:text-orange-600 p-0 h-auto text-sm"
                >
                  Select All
                </Button>
                <span className="text-gray-400">|</span>
                <Button
                  type="button"
                  variant="link"
                  onClick={handleDeselectAll}
                  className="text-orange-500 hover:text-orange-600 p-0 h-auto text-sm"
                >
                  Deselect All
                </Button>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={role}
                        checked={selectedRoles.includes(role)}
                        onCheckedChange={(checked) => handleRoleChange(role, checked as boolean)}
                      />
                      <Label
                        htmlFor={role}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white px-6"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
