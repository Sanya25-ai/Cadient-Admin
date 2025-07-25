"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LocationNode {
  id: string
  name: string
  type: 'country' | 'company' | 'region' | 'city' | 'office'
  description?: string
  address?: string
  phone?: string
  email?: string
  children?: LocationNode[]
}

const locationData: LocationNode = {
  id: 'usa',
  name: 'USA',
  type: 'country',
  children: [
    {
      id: 'cadient-talent',
      name: 'Cadient Talent',
      type: 'company',
      description: 'Main company headquarters and operations',
      children: [
        {
          id: 'central-region',
          name: 'Central Region',
          type: 'region',
          description: 'Central United States operations',
          children: []
        },
        {
          id: 'eastern-region',
          name: 'Eastern Region',
          type: 'region',
          description: 'Eastern United States operations',
          children: [
            {
              id: 'atlanta',
              name: 'Atlanta',
              type: 'city',
              description: 'Atlanta office location',
              address: '123 Peachtree St, Atlanta, GA 30309',
              phone: '(404) 555-0123',
              email: 'atlanta@cadienttalent.com',
              children: []
            },
            {
              id: 'new-york-city',
              name: 'New York City',
              type: 'city',
              description: 'New York City office location',
              address: '456 Broadway, New York, NY 10013',
              phone: '(212) 555-0456',
              email: 'nyc@cadienttalent.com',
              children: []
            },
            {
              id: 'philadelphia',
              name: 'Philadelphia',
              type: 'city',
              description: 'Philadelphia office location',
              address: '789 Market St, Philadelphia, PA 19107',
              phone: '(215) 555-0789',
              email: 'philly@cadienttalent.com',
              children: []
            },
            {
              id: 'pittsburg',
              name: 'Pittsburg',
              type: 'city',
              description: 'Pittsburgh office location',
              address: '321 Liberty Ave, Pittsburgh, PA 15222',
              phone: '(412) 555-0321',
              email: 'pittsburgh@cadienttalent.com',
              children: []
            },
            {
              id: 'raleigh',
              name: 'Raleigh',
              type: 'city',
              description: 'Raleigh office location',
              address: '654 Glenwood Ave, Raleigh, NC 27603',
              phone: '(919) 555-0654',
              email: 'raleigh@cadienttalent.com',
              children: []
            }
          ]
        },
        {
          id: 'western-region',
          name: 'Western Region',
          type: 'region',
          description: 'Western United States operations',
          children: []
        },
        {
          id: 'headquarters',
          name: 'HeadQuarters',
          type: 'office',
          description: 'Corporate headquarters',
          address: '100 Corporate Blvd, Suite 500, Corporate City, CC 12345',
          phone: '(555) 123-4567',
          email: 'headquarters@cadienttalent.com',
          children: []
        }
      ]
    }
  ]
}

// Sample search results data matching the screenshot
const searchResultsData = [
  {
    id: '297821076',
    name: 'Atlanta',
    locationId: '297821076',
    locationNumber: 'Store 2'
  },
  {
    id: '297818513',
    name: 'Cadient Talent',
    locationId: '297818513',
    locationNumber: 'CadientTalentCorp'
  },
  {
    id: '298403189',
    name: 'Central Region',
    locationId: '298403189',
    locationNumber: '801'
  },
  {
    id: '299557715',
    name: 'Chicago–Headquarters',
    locationId: '299557715',
    locationNumber: 'Store 6'
  },
  {
    id: '299557844',
    name: 'Cincinnati',
    locationId: '299557844',
    locationNumber: 'store 8'
  },
  {
    id: '298633142',
    name: 'Denver',
    locationId: '298633142',
    locationNumber: '342'
  }
]

export default function LocationsPage() {
  const router = useRouter()
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['usa', 'cadient-talent', 'eastern-region'])
  const [selectedLocation, setSelectedLocation] = useState<LocationNode | null>(null)
  const [showContextMenu, setShowContextMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null)
  const [currentView, setCurrentView] = useState<'tree' | 'edit' | 'create' | 'search'>('tree')
  const [editingLocation, setEditingLocation] = useState<LocationNode | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const isExpanded = (nodeId: string) => expandedNodes.includes(nodeId)

  const handleLocationClick = (location: LocationNode) => {
    setSelectedLocation(location)
    setEditingLocation(location)
    setCurrentView('edit')
  }

  const handleContextMenu = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    setShowContextMenu({ nodeId, x: e.clientX, y: e.clientY })
  }

  const handleEdit = (location: LocationNode) => {
    setEditingLocation(location)
    setCurrentView('edit')
    setShowContextMenu(null)
  }

  const handleDelete = (nodeId: string) => {
    console.log('Deleting location:', nodeId)
    setShowContextMenu(null)
  }

  const handleAddChild = (parentId: string) => {
    console.log('Adding child to:', parentId)
    setCurrentView('create')
    setShowContextMenu(null)
  }

  const handleCreateNew = () => {
    router.push('/admin-console/locations/create')
  }

  const handleSave = () => {
    console.log('Saving location')
    setCurrentView('tree')
  }

  const handleCancel = () => {
    setCurrentView('tree')
    setEditingLocation(null)
  }

  const handleSearch = () => {
    router.push('/admin-console/locations/search')
  }

  const handleLocationNameClick = (locationResult: any) => {
    // Navigate to detailed location view
    router.push(`/admin-console/locations/${locationResult.id}`)
  }

  const findLocationById = (node: LocationNode, id: string): LocationNode | null => {
    if (node.id === id) return node
    if (node.children) {
      for (const child of node.children) {
        const found = findLocationById(child, id)
        if (found) return found
      }
    }
    return null
  }

  const renderLocationNode = (node: LocationNode, level: number = 0): JSX.Element => {
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedLocation?.id === node.id

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 ${
            isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
          }`}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => handleLocationClick(node)}
          onContextMenu={(e) => handleContextMenu(e, node.id)}
        >
          {hasChildren && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                toggleNode(node.id)
              }}
              className="mr-1 p-0.5 hover:bg-gray-200 rounded"
            >
              {isExpanded(node.id) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}
          {!hasChildren && <div className="w-4 mr-1" />}
          <span className={`font-medium ${node.type === 'company' ? 'text-orange-600' : node.type === 'region' ? 'text-orange-600' : node.type === 'city' ? 'text-orange-600' : 'text-gray-900'}`}>
            {node.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleContextMenu(e, node.id)
            }}
            className="ml-auto p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded"
          >
            ⋮
          </button>
        </div>
        
        {hasChildren && isExpanded(node.id) && (
          <div>
            {node.children!.map(child => renderLocationNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (currentView === 'edit' || currentView === 'create') {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          <div className="flex gap-8">
            {/* Left Panel - Location Tree (smaller) */}
            <div className="w-64 bg-gray-50 p-4 rounded-lg border">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Location Hierarchy</h3>
              </div>
              <div className="space-y-1">
                {renderLocationNode(locationData)}
              </div>
            </div>

            {/* Right Panel - Location Form */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold text-[#EE5A37]">Location Manager</h1>
                  <Button 
                    onClick={handleCreateNew}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Create New Location
                  </Button>
                </div>
              </div>

              {/* Search Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Find Location:</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter location name..."
                      className="w-64"
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Location Form */}
              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        * Location Type:
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="">--------------------</option>
                        <option value="country">Country</option>
                        <option value="corporate">Corporate</option>
                        <option value="region">Region</option>
                        <option value="division">Division</option>
                        <option value="territory">Territory</option>
                        <option value="store">Store</option>
                        <option value="member">Member</option>
                        <option value="zone">Zone</option>
                        <option value="cost-center">Cost Center</option>
                        <option value="district">District</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        * Location Name:
                      </label>
                      <Input
                        defaultValue={editingLocation?.name || (currentView === 'edit' ? 'Cadient Talent' : '')}
                        placeholder="Enter location name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        * Location Number:
                      </label>
                      <Input
                        defaultValue={currentView === 'edit' ? 'CadientTalentCO1' : ''}
                        placeholder="Enter location number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        FEIN code:
                      </label>
                      <Input placeholder="Enter FEIN code" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DHS code:
                      </label>
                      <Input placeholder="Enter DHS code" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        * Parent Location:
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="usa">USA</option>
                        <option value="cadient-talent">Cadient Talent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1:
                      </label>
                      <Input
                        defaultValue="123 Corporate Dr"
                        placeholder="Enter address line 1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2:
                      </label>
                      <Input placeholder="Enter address line 2" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City:
                      </label>
                      <Input
                        defaultValue="Raleigh"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        * Country:
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="">--------------------</option>
                        <option value="us">United States of America</option>
                        <option value="au">Australia</option>
                        <option value="ca">Canada</option>
                        <option value="gb">United Kingdom of Great Britain and Northern Ireland</option>
                        <option value="ie">Republic of Ireland</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State:
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option value="">choose one...</option>
                        <option value="al">Alabama</option>
                        <option value="ak">Alaska</option>
                        <option value="as">American Samoa</option>
                        <option value="az">Arizona</option>
                        <option value="ar">Arkansas</option>
                        <option value="ca">California</option>
                        <option value="co">Colorado</option>
                        <option value="ct">Connecticut</option>
                        <option value="de">Delaware</option>
                        <option value="dc">District of Columbia</option>
                        <option value="fl">Florida</option>
                        <option value="ga">Georgia</option>
                        <option value="gu">Guam</option>
                        <option value="hi">Hawaii</option>
                        <option value="id">Idaho</option>
                        <option value="il">Illinois</option>
                        <option value="in">Indiana</option>
                        <option value="ia">Iowa</option>
                        <option value="ks">Kansas</option>
                        <option value="ky">Kentucky</option>
                        <option value="la">Louisiana</option>
                        <option value="me">Maine</option>
                        <option value="md">Maryland</option>
                        <option value="ma">Massachusetts</option>
                        <option value="mi">Michigan</option>
                        <option value="mn">Minnesota</option>
                        <option value="ms">Mississippi</option>
                        <option value="mo">Missouri</option>
                        <option value="mt">Montana</option>
                        <option value="ne">Nebraska</option>
                        <option value="nv">Nevada</option>
                        <option value="nh">New Hampshire</option>
                        <option value="nj">New Jersey</option>
                        <option value="nm">New Mexico</option>
                        <option value="ny">New York</option>
                        <option value="nc">North Carolina</option>
                        <option value="nd">North Dakota</option>
                        <option value="mp">Northern Mariana Islands</option>
                        <option value="oh">Ohio</option>
                        <option value="ok">Oklahoma</option>
                        <option value="or">Oregon</option>
                        <option value="pa">Pennsylvania</option>
                        <option value="pr">Puerto Rico</option>
                        <option value="ri">Rhode Island</option>
                        <option value="sc">South Carolina</option>
                        <option value="sd">South Dakota</option>
                        <option value="tn">Tennessee</option>
                        <option value="tx">Texas</option>
                        <option value="ut">Utah</option>
                        <option value="vt">Vermont</option>
                        <option value="vi">Virgin Islands</option>
                        <option value="va">Virginia</option>
                        <option value="wa">Washington</option>
                        <option value="wv">West Virginia</option>
                        <option value="wi">Wisconsin</option>
                        <option value="wy">Wyoming</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip/Postal Code:
                      </label>
                      <Input
                        defaultValue="27603"
                        placeholder="Enter zip/postal code"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone:
                      </label>
                      <Input placeholder="Enter phone number" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fax:
                      </label>
                      <Input placeholder="Enter fax number" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                      </label>
                      <Input placeholder="Enter email address" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grand Opening Date:
                      </label>
                      <Input type="date" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location is Active?
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="active" value="yes" className="mr-2" defaultChecked />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="active" value="no" className="mr-2" />
                          No
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Which Positions are available for this location? Note: Internal/Hiring names are italicized
                      </label>
                      <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded p-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Customer Service Associate
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="italic">Shift Sales Associate</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Pharmacist
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="italic">Pharmacy Technician</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="italic">Shift Sales Associate</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Senior
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Which Departments are available for this location?
                      </label>
                      <div className="space-y-2 max-h-24 overflow-y-auto border border-gray-300 rounded p-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Career Intake
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Allow null assessment hires?
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="nullAssessment" value="yes" className="mr-2" />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="nullAssessment" value="no" className="mr-2" defaultChecked />
                          No
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Checking this box means setting will apply this setting to all descendant locations in hierarchy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button 
                    onClick={handleSave}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Save
                  </Button>
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
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Location Manager</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleCreateNew}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Location
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <label htmlFor="location-search" className="text-sm font-medium text-gray-700">
              Find Location:
            </label>
            <div className="flex items-center gap-2">
              <Input 
                id="location-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter location name..."
                className="w-64"
              />
              <Button 
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Panel - Location Tree */}
          <div className="w-80 bg-gray-50 p-4 rounded-lg border">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Location Hierarchy</h3>
              <div className="text-xs text-gray-500 mb-3">
                Right-click on any location for more options
              </div>
            </div>
            <div className="space-y-1 group">
              {renderLocationNode(locationData)}
            </div>
          </div>

        {/* Right Panel - Location Details or Search Results */}
        <div className="flex-1">
          {showSearchResults ? (
            <div className="space-y-4">
              {/* Search Results Header */}
              <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Results: 1-{searchResultsData.length} of {searchResultsData.length}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Page:</span>
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>1 of 1</option>
                  </select>
                </div>
              </div>

              {/* Search Results Table */}
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-300">
                      <th className="text-left p-4 font-semibold text-gray-900">Location Name</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Location Id</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Location Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResultsData.map((location, index) => (
                      <tr key={location.id} className={index < searchResultsData.length - 1 ? "border-b border-gray-200" : ""}>
                        <td className="p-4">
                          <button
                            onClick={() => handleLocationNameClick(location)}
                            className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                          >
                            {location.name}
                          </button>
                        </td>
                        <td className="p-4 text-gray-900">{location.locationId}</td>
                        <td className="p-4 text-gray-900">{location.locationNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Back to Tree Button */}
              <div className="flex justify-start">
                <Button
                  onClick={() => setShowSearchResults(false)}
                  variant="outline"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Location Tree
                </Button>
              </div>
            </div>
          ) : selectedLocation ? (
              <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedLocation.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleEdit(selectedLocation)}
                      size="sm"
                      variant="outline"
                    >
                      ✏️
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(selectedLocation.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      🗑️
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Type:</label>
                    <p className="text-gray-900 capitalize">{selectedLocation.type}</p>
                  </div>
                  
                  {selectedLocation.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Description:</label>
                      <p className="text-gray-900">{selectedLocation.description}</p>
                    </div>
                  )}
                  
                  {selectedLocation.address && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address:</label>
                      <p className="text-gray-900">{selectedLocation.address}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLocation.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone:</label>
                        <p className="text-gray-900">{selectedLocation.phone}</p>
                      </div>
                    )}
                    
                    {selectedLocation.email && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email:</label>
                        <p className="text-gray-900">{selectedLocation.email}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedLocation.children && selectedLocation.children.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sub-locations:</label>
                      <p className="text-gray-900">{selectedLocation.children.length} location(s)</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500 border">
                <p>Select a location from the tree to view details</p>
                <p className="text-sm mt-2">Click on any location name or use the search function</p>
              </div>
            )}
          </div>
        </div>

        {/* Context Menu */}
        {showContextMenu && (
          <div
            className="fixed bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50"
            style={{ left: showContextMenu.x, top: showContextMenu.y }}
            onMouseLeave={() => setShowContextMenu(null)}
          >
            <button
              onClick={() => {
                const location = findLocationById(locationData, showContextMenu.nodeId)
                if (location) handleEdit(location)
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
            >
              ✏️
              Edit Location
            </button>
            <button
              onClick={() => handleAddChild(showContextMenu.nodeId)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Sub-location
            </button>
            <button
              onClick={() => handleDelete(showContextMenu.nodeId)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 flex items-center"
            >
              🗑️
              Delete Location
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
