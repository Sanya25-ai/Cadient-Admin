'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data matching the HMC interface
const locationGroupsData = [
  {
    id: '1',
    name: 'North America',
    description: '',
    locations: [
      { id: '1', name: 'Cincinnati', count: 77 },
      { id: '2', name: 'Denver', count: 9 },
      { id: '3', name: 'New York', count: 7 },
      { id: '4', name: 'Vermeer Pella', count: '00002' },
      { id: '5', name: 'Wildcat', count: '654788' }
    ]
  }
]

export default function LocationGroupsPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'create'>('list')
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [locations, setLocations] = useState<any[]>([])
  const [newLocationSearch, setNewLocationSearch] = useState('')
  const [showLocationFinder, setShowLocationFinder] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const handleGroupClick = (group: any) => {
    setSelectedGroup(group)
    setEditedName(group.name)
    setEditedDescription(group.description)
    setLocations([...group.locations])
    setCurrentView('edit')
  }

  const handleCreateNew = () => {
    setSelectedGroup(null)
    setEditedName('')
    setEditedDescription('')
    setLocations([])
    setNewLocationSearch('')
    setCurrentView('create')
  }

  const handleSave = () => {
    console.log('Saving location group:', {
      name: editedName,
      description: editedDescription,
      locations: locations
    })
    setCurrentView('list')
  }

  const handleCancel = () => {
    setCurrentView('list')
    setSelectedGroup(null)
    setEditedName('')
    setEditedDescription('')
    setLocations([])
    setNewLocationSearch('')
  }

  const handleDeleteLocation = (locationId: string) => {
    setLocations(locations.filter(location => location.id !== locationId))
  }

  const handleAddLocation = () => {
    if (newLocationSearch.trim()) {
      const newLocation = {
        id: Date.now().toString(),
        name: newLocationSearch,
        count: Math.floor(Math.random() * 100)
      }
      setLocations([...locations, newLocation])
      setNewLocationSearch('')
    }
  }

  const handleDeleteGroup = (groupId: string) => {
    console.log('Deleting group:', groupId)
  }

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const handleLocationSelect = (location: any) => {
    const newLocation = {
      id: Date.now().toString(),
      name: location.name,
      count: location.count || Math.floor(Math.random() * 100)
    }
    setLocations([...locations, newLocation])
    setShowLocationFinder(false)
  }

  // Mock location tree data
  const locationTree = [
    {
      id: 'usa',
      name: 'USA (USA1)',
      type: 'country',
      children: [
        {
          id: 'alabama',
          name: 'Alabama',
          type: 'state',
          children: [
            { id: 'birmingham', name: 'Birmingham', type: 'city', count: 15 },
            { id: 'montgomery', name: 'Montgomery', type: 'city', count: 8 },
            { id: 'mobile', name: 'Mobile', type: 'city', count: 12 }
          ]
        },
        {
          id: 'california',
          name: 'California',
          type: 'state',
          children: [
            { id: 'los-angeles', name: 'Los Angeles', type: 'city', count: 45 },
            { id: 'san-francisco', name: 'San Francisco', type: 'city', count: 32 },
            { id: 'san-diego', name: 'San Diego', type: 'city', count: 28 }
          ]
        },
        {
          id: 'florida',
          name: 'Florida',
          type: 'state',
          children: [
            { id: 'miami', name: 'Miami', type: 'city', count: 38 },
            { id: 'orlando', name: 'Orlando', type: 'city', count: 22 },
            { id: 'tampa', name: 'Tampa', type: 'city', count: 19 }
          ]
        },
        {
          id: 'new-york',
          name: 'New York',
          type: 'state',
          children: [
            { id: 'new-york-city', name: 'New York City', type: 'city', count: 67 },
            { id: 'buffalo', name: 'Buffalo', type: 'city', count: 14 },
            { id: 'rochester', name: 'Rochester', type: 'city', count: 11 }
          ]
        },
        {
          id: 'texas',
          name: 'Texas',
          type: 'state',
          children: [
            { id: 'houston', name: 'Houston', type: 'city', count: 52 },
            { id: 'dallas', name: 'Dallas', type: 'city', count: 41 },
            { id: 'austin', name: 'Austin', type: 'city', count: 29 }
          ]
        }
      ]
    }
  ]

  const renderLocationTree = (nodes: any[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center py-1">
          {node.children && (
            <button
              onClick={() => toggleNode(node.id)}
              className="mr-2 text-gray-600 hover:text-gray-800 w-4 h-4 flex items-center justify-center"
            >
              {expandedNodes.has(node.id) ? '−' : '+'}
            </button>
          )}
          {!node.children && <div className="w-6"></div>}
          <button
            onClick={() => handleLocationSelect(node)}
            className="text-orange-600 hover:text-orange-800 hover:underline text-left"
          >
            {node.name}
          </button>
        </div>
        {node.children && expandedNodes.has(node.id) && (
          <div className="ml-2">
            {renderLocationTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  if (currentView === 'edit' || currentView === 'create') {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Location Group Editor</h1>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Name:
              </label>
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="max-w-md"
                placeholder="Enter location group name"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description:
              </label>
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="max-w-md"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            {/* Location Finder */}
            <div 
              onClick={() => setShowLocationFinder(true)}
              className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-center text-orange-600 text-sm">
                <span className="mr-2">📍</span>
                <span className="font-medium">Location Finder</span>
                <span className="ml-2 text-gray-600">- Use the finder to select from a tree of locations</span>
              </div>
            </div>

            {/* List of Locations */}
            <div className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">List of Locations for this Group</h3>
              
              {/* Current Locations */}
              <div className="space-y-2 mb-4">
                {locations.map((location, index) => (
                  <div key={location.id} className="flex items-center justify-between bg-yellow-100 p-3 rounded">
                    <span className="text-sm">
                      {index + 1}. {location.name} ({location.count})
                    </span>
                    <Button
                      onClick={() => handleDeleteLocation(location.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      🗑️
                    </Button>
                  </div>
                ))}
                {locations.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No locations added yet</p>
                )}
              </div>

              {/* Add New Location */}
              <div className="flex items-center gap-2 mb-4">
                <Input
                  value={newLocationSearch}
                  onChange={(e) => setNewLocationSearch(e.target.value)}
                  placeholder="Start typing to show a list"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                />
                <Button
                  onClick={handleAddLocation}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-700"
                >
                  ➕
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleSave}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Save
              </Button>
              <Button 
                onClick={handleCancel}
                variant="destructive"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Location Finder Modal */}
          {showLocationFinder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Location Finder</h2>
                  <button
                    onClick={() => setShowLocationFinder(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-6">Select a location from the tree below.</p>
                  
                  {/* Location Tree */}
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    {renderLocationTree(locationTree)}
                  </div>
                </div>
              </div>
            </div>
          )}
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Location Group List</h1>
          </div>
          <Button 
            onClick={handleCreateNew}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            + Create a Location Group
          </Button>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Results: 1-1 of 1
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>1 of 1</option>
            </select>
          </div>
        </div>

        {/* Location Groups Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 w-1/2">Name</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/2">Description</TableHead>
                <TableHead className="font-semibold text-gray-900 w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locationGroupsData.map((group) => (
                <TableRow key={group.id} className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-900 align-top py-3">
                    <button
                      onClick={() => handleGroupClick(group)}
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      {group.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-700 align-top py-3">
                    {group.description}
                  </TableCell>
                  <TableCell className="text-center align-top py-3">
                    <button 
                      onClick={() => handleDeleteGroup(group.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Location Finder Modal */}
        {showLocationFinder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Location Finder</h2>
                <button
                  onClick={() => setShowLocationFinder(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">Select a location from the tree below.</p>
                
                {/* Location Tree */}
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                  {renderLocationTree(locationTree)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
