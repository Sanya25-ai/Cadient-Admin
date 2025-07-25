'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JobSpecificPrescreenersPage() {
  const router = useRouter()
  const [showKeywordSearch, setShowKeywordSearch] = useState(false)
  const [showStatusSearch, setShowStatusSearch] = useState(false)
  const [showDataChannelSearch, setShowDataChannelSearch] = useState(false)
  const [showCategorySearch, setShowCategorySearch] = useState(false)
  const [hoveredPrescreener, setHoveredPrescreener] = useState<number | null>(null)

  const prescreeners = [
    {
      id: 1,
      status: 'active',
      name: "Driver's License Confirmation",
      siteName: '',
      dataChannel: 'Career Insite',
      category: 'Driving',
      modified: '4/5/2025',
      jobCodes: 'CSA',
      numberOfQuestions: 1
    },
    {
      id: 2,
      status: 'active',
      name: 'License Required',
      siteName: '',
      dataChannel: 'Career Insite',
      category: 'Driving',
      modified: '1/17/2023',
      jobCodes: 'DRV, TRK',
      numberOfQuestions: 2
    },
    {
      id: 3,
      status: 'active',
      name: 'Pharmacist prescreener',
      siteName: '',
      dataChannel: 'Career Insite',
      category: 'Other',
      modified: '11/22/2022',
      jobCodes: 'PHM',
      numberOfQuestions: 3
    },
    {
      id: 4,
      status: 'active',
      name: 'Accountant',
      siteName: '',
      dataChannel: 'Career Insite',
      category: 'Accounting',
      modified: '6/12/2020',
      jobCodes: 'ACC, FIN',
      numberOfQuestions: 4
    },
    {
      id: 5,
      status: 'active',
      name: 'License Required',
      siteName: '',
      dataChannel: 'Career Insite',
      category: 'Driving',
      modified: '6/12/2020',
      jobCodes: 'CDL',
      numberOfQuestions: 2
    }
  ]

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📋</span>
              <h1 className="text-2xl font-semibold text-gray-900">Job Code Prescreener Templates</h1>
            </div>
            <Button 
              onClick={() => router.push('/admin-console/prescreener/create')}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
            >
              <span>➕</span>
              Add New Prescreener
            </Button>
          </div>
          <div className="h-1 bg-orange-500 w-full mt-2"></div>
        </div>

        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <button 
            onClick={() => router.push('/admin-console/prescreener?tab=overview')}
            className="text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
          >
            Overview
          </button>
          <span className="mx-2">|</span>
          <button 
            onClick={() => router.push('/admin-console/prescreener?tab=general')}
            className="text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
          >
            General Qualifying Prescreeners
          </button>
          <span className="mx-2">|</span>
          <span className="text-gray-700">Job Specific Prescreeners</span>
          <span className="mx-2">|</span>
          <button 
            onClick={() => router.push('/admin-console/workflow-script-library/question-library')}
            className="text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
          >
            Question Library
          </button>
        </div>

        {/* Prescreener Library Info */}
        <div className="bg-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Prescreener Library</h2>
          <p className="text-sm text-gray-700 mb-2">
            There are <strong>5</strong> prescreeners in the Prescreener Library that meet the following criteria:
          </p>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li><strong>Status:</strong> Active</li>
            <li><strong>Data Channel:</strong> Career Insite</li>
          </ul>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search the Library</h3>
          <div className="flex gap-3 flex-wrap">
            <Button 
              onClick={() => setShowKeywordSearch(true)}
              className="bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2"
            >
              <span>🔍</span>
              By Keyword
            </Button>
            <Button 
              onClick={() => setShowStatusSearch(true)}
              className="bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2"
            >
              <span>🔍</span>
              By Status
            </Button>
            <Button 
              onClick={() => setShowDataChannelSearch(true)}
              className="bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2"
            >
              <span>🔍</span>
              By Data Channel:
            </Button>
            <Button 
              onClick={() => setShowCategorySearch(true)}
              className="bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2"
            >
              <span>🔍</span>
              By Category
            </Button>
          </div>
        </div>

        {/* Results and Pagination */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">Results: 1-5 of 5</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>1 of 1</option>
            </select>
          </div>
        </div>

        {/* Prescreeners Table */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Prescreener Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Site Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Data Channel</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {prescreeners.map((prescreener, index) => (
                <tr key={prescreener.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </td>
                  <td className="px-4 py-3 relative">
                    <button 
                      onClick={() => router.push(`/admin-console/prescreener/${prescreener.id}`)}
                      onMouseEnter={() => setHoveredPrescreener(prescreener.id)}
                      onMouseLeave={() => setHoveredPrescreener(null)}
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      {prescreener.name}
                    </button>
                    
                    {/* Hover Tooltip */}
                    {hoveredPrescreener === prescreener.id && (
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 min-w-64">
                        <div className="space-y-3">
                          <div>
                            <span className="font-semibold text-gray-900">Job Codes:</span>
                            <div className="text-gray-700">{prescreener.jobCodes}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Number of Questions:</span>
                            <div className="text-gray-700">{prescreener.numberOfQuestions}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Data Channel:</span>
                            <div className="text-gray-700">{prescreener.dataChannel}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{prescreener.siteName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{prescreener.dataChannel}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{prescreener.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{prescreener.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Keyword Search Modal */}
        {showKeywordSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Search by Keyword</h2>
                <button 
                  onClick={() => setShowKeywordSearch(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Prescreener Name:
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter prescreener name..."
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
                      ➤
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Code:
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 border border-blue-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter job code..."
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
                      ➤
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Search Modal */}
        {showStatusSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">By Status:</h2>
                <button 
                  onClick={() => setShowStatusSearch(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  All Statuses
                </Button>
                <Button className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-full">
                  Active
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Archived
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Deprecated
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Incomplete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Data Channel Search Modal */}
        {showDataChannelSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">By Data Channel:</h2>
                <button 
                  onClick={() => setShowDataChannelSearch(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  All Data Channels
                </Button>
                <Button className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-full">
                  Career Insite
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  TelApp
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Kiosk
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Import
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Manually Entered
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Prospect Import
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  ZipRecruiter Import
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Indeed Import
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Monster Import
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Category Search Modal */}
        {showCategorySearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">By Category:</h2>
                <button 
                  onClick={() => setShowCategorySearch(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-full">
                  All Categories
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Accounting
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Biddle
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Driving
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  EEO Questions
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  FCRA
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Finance
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Government
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Information Technology
                </Button>
                <Button className="border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 px-4 py-2 rounded-full">
                  Other
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
