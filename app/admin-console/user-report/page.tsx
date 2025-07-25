"use client"

import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Plus, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function UserReportPage() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [accountStatus, setAccountStatus] = useState('all-users')
  const [allLocationsChecked, setAllLocationsChecked] = useState(false)
  const [noAccessChecked, setNoAccessChecked] = useState(false)
  const [showLocationFinderModal, setShowLocationFinderModal] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['USA (USA1)'])
  const [expandedNodes, setExpandedNodes] = useState<string[]>([])
  const [showRoleDetailsModal, setShowRoleDetailsModal] = useState(false)
  const [selectedRoleDetails, setSelectedRoleDetails] = useState<any>(null)

  // Location tree data structure
  const locationTree = {
    'USA (USA1)': {
      'Cadient Talent (CadientTalentCorp)': {
        'Central Region (801)': {},
        'Eastern Region (700)': {
          'Atlanta (Store 2)': {},
          'New York City (580)': {},
          'Philadelphia (451)': {},
          'Pittsburg (Store 5)': {},
          'Raleigh (Store 101)': {}
        },
        'Western Region (901)': {}
      },
      'HeadQuarters (7)': {}
    }
  }

  const userRoles = [
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

  // Role details data
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

  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, role])
    } else {
      setSelectedRoles(selectedRoles.filter(r => r !== role))
    }
  }

  const handleGenerateReport = () => {
    console.log('Generating report with criteria:', {
      selectedRoles,
      accountStatus,
      allLocationsChecked,
      noAccessChecked
    })
    // Here you would typically call an API to generate the report
    alert('Report generation started! You will receive an email when the report is ready.')
  }

  const handleLocationFinderClick = () => {
    setShowLocationFinderModal(true)
  }

  const handleAddLocation = () => {
    console.log('Adding location')
    // Here you would add a new location to the filter
  }

  const toggleNodeExpansion = (nodePath: string) => {
    if (expandedNodes.includes(nodePath)) {
      setExpandedNodes(expandedNodes.filter(path => path !== nodePath))
    } else {
      setExpandedNodes([...expandedNodes, nodePath])
    }
  }

  const renderLocationTree = (tree: any, level: number = 0, parentPath: string = '') => {
    return Object.keys(tree).map((key) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key
      const hasChildren = Object.keys(tree[key]).length > 0
      const isExpanded = expandedNodes.includes(currentPath)
      const indentLevel = level * 20

      return (
        <div key={currentPath}>
          <div 
            className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-100"
            style={{ paddingLeft: `${indentLevel + 10}px` }}
            onClick={() => hasChildren && toggleNodeExpansion(currentPath)}
          >
            {hasChildren ? (
              <span className="text-orange-500 font-bold">
                {isExpanded ? '−' : '+'}
              </span>
            ) : (
              <span className="text-orange-500 font-bold">+</span>
            )}
            <span className="text-orange-500">{key}</span>
          </div>
          {hasChildren && isExpanded && (
            <div>
              {renderLocationTree(tree[key], level + 1, currentPath)}
            </div>
          )}
        </div>
      )
    })
  }

  const removeLocation = (locationToRemove: string) => {
    setSelectedLocations(selectedLocations.filter(loc => loc !== locationToRemove))
  }

  const handleRoleClick = (role: string) => {
    const details = roleDetails[role as keyof typeof roleDetails]
    if (details) {
      setSelectedRoleDetails(details)
      setShowRoleDetailsModal(true)
    }
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/admin-console/users-roles">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#EE5A37] mb-2">User Report</h1>
          <p className="text-sm text-gray-600">
            Export all users within a specified criteria to a spreadsheet.
          </p>
        </div>

        {/* Filter Criteria Card */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h2 className="text-lg font-medium mb-6 text-gray-900">Filter Criteria</h2>
          
          {/* User's Creation Date */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-gray-900">User's Creation Date:</h3>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div>
                <Label htmlFor="from-date" className="text-sm font-medium text-gray-700">From:</Label>
                <div className="mt-1 relative">
                  <Input 
                    id="from-date" 
                    type="date" 
                    className="pr-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-gray-400">📅</span>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="to-date" className="text-sm font-medium text-gray-700">To:</Label>
                <div className="mt-1 relative">
                  <Input 
                    id="to-date" 
                    type="date" 
                    className="pr-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-gray-400">📅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User's Location */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-gray-900">User's Location:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="all-locations" 
                  checked={allLocationsChecked}
                  onCheckedChange={(checked) => setAllLocationsChecked(checked as boolean)}
                />
                <Label htmlFor="all-locations" className="text-sm">All Locations</Label>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-orange-500">📍</span>
                <button
                  onClick={handleLocationFinderClick}
                  className="text-sm text-orange-600 hover:text-orange-700 underline cursor-pointer"
                >
                  Location Finder
                </button>
                <span className="text-xs text-gray-500">- Use the finder to select from a tree of locations</span>
              </div>

              <div>
                <Label htmlFor="location-input" className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Location:
                </Label>
                <div className="mt-1 border border-gray-300 rounded p-4 min-h-32 bg-white">
                  {selectedLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between bg-yellow-100 p-2 mb-2 rounded">
                      <span className="text-sm">{index + 1}. {location}</span>
                      <button
                        onClick={() => removeLocation(location)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Start typing to show a list"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <button
                      onClick={handleAddLocation}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User's Role */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-gray-900">User's Role:</h3>
            <div className="border border-gray-300 rounded p-4 max-h-48 overflow-y-auto bg-gray-50">
              <div className="grid grid-cols-2 gap-2">
                {userRoles.map((role, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`role-${index}`}
                      checked={selectedRoles.includes(role)}
                      onCheckedChange={(checked) => handleRoleChange(role, checked as boolean)}
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
            <div className="mt-2 text-xs text-gray-500">
              Selected: {selectedRoles.length} role(s)
            </div>
          </div>

          {/* User's Last Login Activity */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-gray-900">User's Last Login Activity:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="no-access" 
                  checked={noAccessChecked}
                  onCheckedChange={(checked) => setNoAccessChecked(checked as boolean)}
                />
                <Label htmlFor="no-access" className="text-sm">No Access</Label>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <Label htmlFor="login-from-date" className="text-sm font-medium text-gray-700">From:</Label>
                  <div className="mt-1 relative">
                    <Input 
                      id="login-from-date" 
                      type="date" 
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-400">📅</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="login-to-date" className="text-sm font-medium text-gray-700">To:</Label>
                  <div className="mt-1 relative">
                    <Input 
                      id="login-to-date" 
                      type="date" 
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-400">📅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User's Account Status */}
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-gray-900">User's Account Status:</h3>
            <RadioGroup 
              value={accountStatus} 
              onValueChange={setAccountStatus}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-users" id="all-users" />
                <Label htmlFor="all-users" className="text-sm cursor-pointer">All Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active-users" id="active-users" />
                <Label htmlFor="active-users" className="text-sm cursor-pointer">Active Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-active-users" id="non-active-users" />
                <Label htmlFor="non-active-users" className="text-sm cursor-pointer">Non-Active Users</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start items-center">
          <Button 
            onClick={handleGenerateReport}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            Generate Report
          </Button>
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
                {renderLocationTree(locationTree)}
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
