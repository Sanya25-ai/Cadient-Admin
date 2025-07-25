"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function UserEditorPage() {
  const params = useParams()
  const username = params?.username as string || 'CADIENT_MGUNN'
  
  const [showRoleDetailsModal, setShowRoleDetailsModal] = useState(false)
  const [selectedRoleDetails, setSelectedRoleDetails] = useState<any>(null)
  const [showLocationFinderModal, setShowLocationFinderModal] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  // User data based on username
  const getUserData = (username: string) => {
    const users = {
      'CADIENT_MGUNN': {
        username: 'CADIENT_MGUNN',
        employeeId: '',
        firstName: 'Megan',
        lastName: 'Gunn',
        email: 'megan.gunn@cadienttalent.com',
        workPhone: '',
        location: 'USA (USA1)',
        userLocale: 'English (US)',
        isActive: true,
        roles: [
          'Calendar Integration Interview Scheduling',
          'Regional Manager Organizer',
          'Sales Demo Retail Omega Supervisor',
          'Sales Demo Retail Omega eGuest Manager',
          'Sales Demo Retail Omega Hiring Manager',
          'Sales Demo Retail Omega Recruiter County',
          'Sales Demo Retail Omega Hourly Recruiter',
          'Sales Demo Retail Omega Hourly Recruiter County',
          'Sales Demo Retail Omega Hourly System Admin',
          'Sales Demo Retail Omega Recruiter',
          'Sales Demo Retail Omega Recruiter County',
          'Sales Demo Retail Omega Recruiter Equity',
          'Site Hybrid Recruiter',
          'SELF USER ASSOCIATION',
          'Workforce Hiring Analytics - Advanced',
          'Workforce Hiring Analytics',
          'Workforce Hiring Analytics - Legal',
          'Workforce Hiring Analytics - Translation'
        ]
      }
    }
    return users[username as keyof typeof users] || users['CADIENT_MGUNN']
  }

  const userData = getUserData(username)

  // Role details data (same as user-report page)
  const roleDetails = {
    'Calendar Integration Interview Scheduling': {
      title: 'Calendar Integration Interview Scheduling',
      description: 'This permission allows users to use the CTX Interview Scheduling Calendar Integration through Nylas so that they can sync the users calendar free/busy time.',
      permissions: {
        'CTX-ClientAdmin': 'Allows Users to Add/View all Contacts, View all users and their message history and Create, Read, and Send all messages.',
        'CTX-Recruiter': 'Allows users to Create, Read and Send Messages and Add, View Contacts created by Self. This permission is added through the feature tool.'
      }
    },
    'Regional Manager Organizer': {
      title: 'Regional Manager Organizer',
      description: 'This role provides regional management capabilities and organizational oversight.',
      permissions: {
        'CTX-ClientAdmin': 'Full administrative access to regional data and user management.',
        'CTX-Recruiter': 'Regional recruiting oversight and coordination capabilities.'
      }
    },
    'Sales Demo Retail Omega Supervisor': {
      title: 'Sales Demo Retail Omega Supervisor',
      description: 'Supervisory role for retail operations with demo and sales capabilities.',
      permissions: {
        'CTX-ClientAdmin': 'Administrative oversight of retail operations and demo management.',
        'CTX-Recruiter': 'Recruiting supervision for retail positions and demo coordination.'
      }
    }
  }

  const handleRoleClick = (role: string) => {
    const details = roleDetails[role as keyof typeof roleDetails]
    if (details) {
      setSelectedRoleDetails(details)
      setShowRoleDetailsModal(true)
    }
  }

  const handleSave = () => {
    console.log('Saving user data...')
    // Here you would typically save the user data
    alert('User data saved successfully!')
  }

  const handleCancel = () => {
    console.log('Cancelling changes...')
    // Here you would typically navigate back or reset form
    window.history.back()
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#EE5A37] mb-2">User Editor</h1>
          <p className="text-sm text-gray-600">Create a new user or edit an existing user</p>
        </div>

        {/* User Form */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username:</Label>
            <Input 
              id="username" 
              value={userData.username}
              className="mt-1 bg-gray-100"
              readOnly
            />
          </div>

          {/* Employee ID */}
          <div>
            <Label htmlFor="employeeId" className="text-sm font-medium text-gray-700">Employee ID:</Label>
            <Input 
              id="employeeId" 
              value={userData.employeeId}
              className="mt-1"
            />
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> First Name:
            </Label>
            <Input 
              id="firstName" 
              value={userData.firstName}
              className="mt-1"
            />
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Last Name:
            </Label>
            <Input 
              id="lastName" 
              value={userData.lastName}
              className="mt-1"
            />
          </div>

          {/* Email Address */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address:</Label>
            <Input 
              id="email" 
              value={userData.email}
              className="mt-1"
            />
          </div>

          {/* Work Phone */}
          <div>
            <Label htmlFor="workPhone" className="text-sm font-medium text-gray-700">Work Phone:</Label>
            <Input 
              id="workPhone" 
              value={userData.workPhone}
              className="mt-1"
            />
          </div>

          {/* Location */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Location:
            </Label>
            <p className="text-sm mb-2">
              <button
                onClick={() => setShowLocationFinderModal(true)}
                className="text-orange-600 hover:text-orange-700 underline cursor-pointer"
              >
                Location Finder
              </button>
              <span className="text-gray-600"> - Use the finder to select from a tree of locations</span>
            </p>
            <div className="border border-gray-300 rounded p-4 bg-yellow-100">
              <div className="flex items-center justify-between">
                <span className="text-sm">1. {userData.location}</span>
                <div className="flex items-center gap-2">
                  <button className="text-gray-600 hover:text-red-600">🗑️</button>
                  <button className="text-gray-600 hover:text-green-600">➕</button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Start typing to show a list</p>
            </div>
          </div>

          {/* User's Locale */}
          <div>
            <Label className="text-sm font-medium text-gray-700">User's Locale:</Label>
            <Select defaultValue="english-us">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english-ca">English (CA)</SelectItem>
                <SelectItem value="english-us">English (US)</SelectItem>
                <SelectItem value="spanish-modern">Spanish (MODERN)</SelectItem>
                <SelectItem value="french-canadian">French (Canadian)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Change Password */}
          <div className="border border-gray-300 rounded p-4">
            <button 
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              <span className="mr-2">{showChangePassword ? '▼' : '▶'}</span>
              🔑 Change Password
            </button>
            
            {showChangePassword && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> New Password:
                  </Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="retypePassword" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Re-Type New Password:
                  </Label>
                  <Input 
                    id="retypePassword" 
                    type="password"
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Is Active */}
          <div className="border border-gray-300 rounded p-4">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Is Active?</Label>
            <RadioGroup defaultValue={userData.isActive ? "yes" : "no"} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="active-yes" />
                <Label htmlFor="active-yes" className="text-sm cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="active-no" />
                <Label htmlFor="active-no" className="text-sm cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* User's Role(s) */}
          <div className="border border-gray-300 rounded p-4">
            <Label className="text-sm font-medium text-gray-700 mb-4 block">
              <span className="text-red-500">*</span> User's Role(s):
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {userData.roles.map((role, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`role-${index}`}
                    defaultChecked={true}
                  />
                  <button
                    onClick={() => handleRoleClick(role)}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left"
                  >
                    {role}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button 
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              Save
            </Button>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Location Finder Modal */}
      {showLocationFinderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-black">Location Finder</h2>
              <button
                onClick={() => setShowLocationFinderModal(false)}
                className="text-black hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-lg text-gray-900 mb-6">Select a location from the tree below.</p>
              
              {/* Location Tree */}
              <div className="bg-gray-100 border border-gray-300 rounded p-4 min-h-64">
                <div className="text-orange-500 cursor-pointer hover:bg-gray-200 p-2 rounded">
                  <span className="font-bold">+ USA (USA1)</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => setShowLocationFinderModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Details Modal */}
      {showRoleDetailsModal && selectedRoleDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-black">{selectedRoleDetails.title}</h2>
              <button
                onClick={() => setShowRoleDetailsModal(false)}
                className="text-black hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-lg text-gray-900 mb-6">{selectedRoleDetails.description}</p>
              
              {/* List of Permissions Header */}
              <div className="bg-yellow-200 p-3 rounded-t mb-0">
                <h3 className="text-lg font-semibold text-black">List of Permissions</h3>
              </div>

              {/* Permissions Content */}
              <div className="bg-gray-100 p-6 rounded-b">
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(selectedRoleDetails.permissions).map(([permissionType, description]) => (
                    <div key={permissionType}>
                      <h4 className="text-lg font-semibold text-black mb-3">{permissionType}</h4>
                      <p className="text-sm text-gray-800">{description as string}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => setShowRoleDetailsModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
