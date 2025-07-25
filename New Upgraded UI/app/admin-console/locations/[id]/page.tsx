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

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['usa', 'cadient-talent', 'eastern-region'])
  const [showPositionModal, setShowPositionModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    )
  }

  const isExpanded = (nodeId: string) => expandedNodes.includes(nodeId)

  const renderLocationNode = (node: LocationNode, level: number = 0): JSX.Element => {
    const hasChildren = node.children && node.children.length > 0
    const isSelected = params.id === node.id

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 ${
            isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
          }`}
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

          {/* Right Panel - Location Details */}
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
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Search
                    </Button>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Create New Location
                </Button>
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
                      <option value="store">Store</option>
                      <option value="country">Country</option>
                      <option value="corporate">Corporate</option>
                      <option value="region">Region</option>
                      <option value="division">Division</option>
                      <option value="territory">Territory</option>
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
                    <Input defaultValue="Atlanta" placeholder="Enter location name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      * Location Number:
                    </label>
                    <Input defaultValue="Store 2" placeholder="Enter location number" />
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
                      <option value="eastern-region">Eastern Region</option>
                      <option value="usa">USA</option>
                      <option value="cadient-talent">Cadient Talent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1:
                    </label>
                    <Input defaultValue="123 County Road" placeholder="Enter address line 1" />
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
                    <Input defaultValue="Atlanta" placeholder="Enter city" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      * Country:
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
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
                      <option value="ga">Georgia</option>
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
                    <Input placeholder="Enter zip/postal code" />
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
                    <Input type="date" defaultValue="2020-06-01" />
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
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <button 
                          onClick={() => setShowPositionModal(true)}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                        >
                          Customer Service Associate
                        </button>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="italic text-red-600">Shift Sales Associate</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-red-600">Pharmacist</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-red-600">Senior</span>
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
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Save
                </Button>
              </div>
            </div>

            {/* Bottom Form Section */}
            <div className="mt-6 bg-white border border-gray-300 rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    * Location Name:
                  </label>
                  <Input defaultValue="Atlanta" placeholder="Enter location name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1:
                  </label>
                  <Input defaultValue="123 County Road" placeholder="Enter address line 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2:
                  </label>
                  <Input placeholder="Enter address line 2" />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City:
                  </label>
                  <Input defaultValue="Atlanta" placeholder="Enter city" />
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Save
                </Button>
              </div>
            </div>

            {/* Multi-Language Section */}
            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <h3 className="text-orange-400 font-medium mb-4 flex items-center">
                🌐 Multi-Language
              </h3>
              <div className="mb-3">
                <div className="text-white text-sm">View and edit content in a different language.</div>
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-2">Language Versions</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">English (CA)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">English</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">Español</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">Français</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position Details Modal */}
        {showPositionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Customer Service Associate</h2>
                  <p className="text-sm text-gray-600 mt-1">Job Code: Associate</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
                    <p className="text-gray-700">Customer Experience</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customer Experience</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Engages customers and patients by greeting them and offering assistance with products and services. Resolves customer issues and answers questions to ensure a positive customer experience.</li>
                      <li>Models and shares customer service best practices with all team members to deliver a distinctive and delightful customer experience, including interpersonal habits (e.g., greeting, eye contact, courtesy, etc.) and Walgreens service traits (e.g., offering help proactively, identifying needs, servicing until satisfied, etc.).</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Operations</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Provides customers with courteous, friendly, fast, and efficient service.</li>
                      <li>Recommends items for sale to customer and recommends trade-up and/or companion items.</li>
                      <li>Registers customer purchases on assigned cash register, collects cash and distributes change as requested; processes voids, returns, rain checks, refunds, and exchanges as needed.</li>
                      <li>Keeps counters and shelves clean and well merchandised, takes inventory, and maintains records. Checks in and prices merchandise as required or as directed by the shift leader.</li>
                      <li>Implements Company asset protection procedures to identify and minimize profit loss.</li>
                      <li>Ensures compliance with state and local laws regarding regulated products (e.g., alcoholic beverages and tobacco products).</li>
                      <li>Constructs and maintains displays, including promotional, seasonal, super structures, and sale merchandise. Completes resets and revisions as directed.</li>
                      <li>Assists with separation of food items (e.g., raw foods from pre-cooked) and product placement as specified by policies/procedures (e.g., raw and frozen meats on bottom shelves). For consumable items, assists in stock rotation, using the first in, first out method and restock outs.</li>
                      <li>Has working knowledge of store systems and store equipment.</li>
                      <li>Provides customer service in the photo area, including digital passport photo service, poster print and creative machine, suggestive sell of promotional photo products.</li>
                      <li>Assumes web pick-up responsibilities (monitors orders in Picture Care Plus, fills orders (pick items), delivers orders to customers as they arrive at store).</li>
                      <li>Assists with exterior and interior maintenance by ensuring clean, neat, orderly store condition and appearance.</li>
                      <li>Complies with all company policies and procedures; maintains respectful relationships with coworkers.</li>
                      <li>Completes special assignments and other tasks as assigned.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Training & Personal Development</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Attends training and completes PPLs requested by Manager or assigned by corporate.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <div className="mb-3">
                      <h5 className="font-medium text-gray-800">Basic Qualifications</h5>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Must be fluent in reading, writing, and speaking English. (Except in Puerto Rico)</li>
                        <li>Requires willingness to work flexible schedule, including evenings and weekend hours.</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Preferred Qualifications</h5>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Prefer six months of experience in a retail environment.</li>
                        <li>Prefer to have prior work experience with Walgreens.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>The following information is applicable for San Francisco, CA applicants: Pursuant to the San Francisco Fair Chance Ordinance, we will consider for employment qualified applicants with arrest and conviction records.</p>
                    <p className="mt-2">An Equal Opportunity Employer, including disability/veterans.</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setShowPositionModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
