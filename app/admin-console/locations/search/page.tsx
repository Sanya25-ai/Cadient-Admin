"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'

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
            }
          ]
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

export default function LocationSearchPage() {
  const router = useRouter()
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['usa', 'cadient-talent', 'eastern-region'])
  const [searchTerm, setSearchTerm] = useState('')

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const isExpanded = (nodeId: string) => expandedNodes.includes(nodeId)

  const handleLocationNameClick = (locationResult: any) => {
    // Navigate to location details page
    router.push('/admin-console/locations/search/details')
  }

  const handleSearch = () => {
    // Refresh search results or perform new search
    console.log('Searching for:', searchTerm)
  }

  const renderLocationNode = (node: LocationNode, level: number = 0): JSX.Element => {
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id}>
        <div 
          className="flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100"
          style={{ marginLeft: `${level * 16}px` }}
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
        </div>
        
        {hasChildren && isExpanded(node.id) && (
          <div>
            {node.children!.map(child => renderLocationNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Back to Admin Console Button */}
        <div className="mb-4">
          <Button
            onClick={() => router.push('/admin-console')}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0"
          >
            ← Back to Admin Console
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Left Panel - Location Tree */}
          <div className="w-64 bg-gray-50 p-4 rounded-lg border">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">📍 Location Manager</h3>
            </div>
            <div className="space-y-1">
              {renderLocationNode(locationData)}
            </div>
          </div>

          {/* Right Panel - Search Results */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Find Location:</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter location name..."
                      className="w-64"
                    />
                    <Button 
                      onClick={handleSearch}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Search
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => router.push('/admin-console/locations/create')}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Create New Location
                </Button>
              </div>
            </div>

            {/* Search Results */}
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

              {/* Back to Locations Button */}
              <div className="flex justify-start">
                <Button
                  onClick={() => router.push('/admin-console/locations')}
                  variant="outline"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Location Manager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
