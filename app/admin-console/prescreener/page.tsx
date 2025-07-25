'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PrescreenerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'general' | 'jobSpecific' | 'questionLibrary'>('overview')

  // Handle URL parameters to set the correct tab
  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab && ['overview', 'general', 'jobSpecific', 'questionLibrary'].includes(tab)) {
      setActiveTab(tab as 'overview' | 'general' | 'jobSpecific' | 'questionLibrary')
    }
  }, [searchParams])
  const [showKeywordModal, setShowKeywordModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showDataChannelModal, setShowDataChannelModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false)
  const [keywordSearch, setKeywordSearch] = useState('')
  const [hoveredPrescreener, setHoveredPrescreener] = useState<number | null>(null)

  const handleCreatePrescreener = () => {
    // Pass type parameter based on current tab
    const typeParam = activeTab === 'jobSpecific' ? '?type=job-specific' : ''
    router.push(`/admin-console/prescreener/create${typeParam}`)
  }

  const handleCreateQuestion = () => {
    router.push('/admin-console/prescreener/question-library/create')
  }

  const renderOverviewContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Prescreeners Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gray-600 rounded mr-3 flex items-center justify-center">
            <span className="text-white text-sm">📋</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Prescreeners</h2>
        </div>
        
        <p className="text-sm text-gray-700 mb-4">
          A prescreener is a set of questions that you can ask of all candidates for a specific position.
        </p>
        
        <div className="space-y-2">
          <div>
            <button 
              onClick={() => setActiveTab('general')}
              className="text-orange-600 hover:underline text-sm"
            >
              » View the general qualifying prescreeners
            </button>
          </div>
          <div>
            <button 
              onClick={() => setActiveTab('jobSpecific')}
              className="text-orange-600 hover:underline text-sm"
            >
              » View the job code prescreeners
            </button>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gray-600 rounded mr-3 flex items-center justify-center">
            <span className="text-white text-sm">❓</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
        </div>
        
        <p className="text-sm text-gray-700 mb-4">
          Questions serve as the building block for prescreeners. You can re-use questions from previous prescreeners.
        </p>
        
        <div>
          <button 
            onClick={() => setActiveTab('questionLibrary')}
            className="text-orange-600 hover:underline text-sm"
          >
            » View the question library
          </button>
        </div>
      </div>

      {/* Understanding Prescreening Section */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Understanding Prescreening</h2>
        
        <p className="text-sm text-gray-700 mb-4">
          Prescreeners can help you <strong>more efficiently manage</strong> your incoming stream of candidates. With prescreeners, you can:
        </p>
        
        <ul className="text-sm text-gray-700 space-y-2 mb-4">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            collect consistent information
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            assign values to desired responses
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            flag candidates who don't qualify
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            pre-rank candidates by overall score
          </li>
        </ul>
        
        <div>
          <button 
            onClick={() => console.log('Learn more clicked')}
            className="text-orange-600 hover:underline text-sm"
          >
            » Learn more
          </button>
        </div>
      </div>
    </div>
  )

  const renderGeneralContent = () => (
    <div>
      {/* Add New Prescreener Button */}
      <div className="flex justify-end mb-6">
        <Button 
          onClick={handleCreatePrescreener}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          ➕ Add New Prescreener
        </Button>
      </div>

      {/* Prescreener Library Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Prescreener Library</h2>
        <p className="text-sm text-gray-700 mb-2">
          There are <strong>4</strong> prescreeners in the Prescreener Library that meet the following criteria:
        </p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Status:</strong> Active</li>
          <li><strong>Data Channel:</strong> Career Insite</li>
        </ul>
      </div>

      {/* Search Filters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Search the Library</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setShowKeywordModal(true)}
            variant="outline" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            🔍 By Keyword
          </Button>
          <Button 
            onClick={() => setShowStatusModal(true)}
            variant="outline" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            📊 By Status
          </Button>
          <Button 
            onClick={() => setShowDataChannelModal(true)}
            variant="outline" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            📡 By Data Channel
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Results: 1-4 of 4</span>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>1 of 1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Prescreener Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Site Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Data Channel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Modified
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap relative">
                <div className="group">
                  <button 
                    onClick={() => router.push('/admin-console/prescreener/1')}
                    className="text-orange-600 hover:underline cursor-pointer"
                  >
                    Minimum Qualifications
                  </button>
                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Site:</span>
                        <div>Sales Demo Retail Omega Non-Req HireNow</div>
                      </div>
                      <div>
                        <span className="font-semibold">Number of Questions:</span>
                        <div>5</div>
                      </div>
                      <div>
                        <span className="font-semibold">Data Channel:</span>
                        <div>Career Insite</div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Sales Demo Retail Omega Non-Req HireNow
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Career Insite
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                3/10/2022
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button 
                  onClick={() => router.push('/admin-console/prescreener/2')}
                  className="text-orange-600 hover:underline cursor-pointer"
                >
                  Minimum Qualifications
                </button>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Sales Demo Retail Omega KTMD NonReq Internal
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Career Insite
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                2/2/2021
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button 
                  onClick={() => router.push('/admin-console/prescreener/3')}
                  className="text-orange-600 hover:underline cursor-pointer"
                >
                  General Prescreeners NonReq External
                </button>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Sales Demo Retail Omega Req External
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Career Insite
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                5/7/2020
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <button 
                  onClick={() => router.push('/admin-console/prescreener/4')}
                  className="text-orange-600 hover:underline cursor-pointer"
                >
                  General Prescreeners NonReq External
                </button>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Sales Demo Retail Omega NonReq External
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                Career Insite
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                5/7/2020
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderJobSpecificContent = () => {
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
      <div>
        {/* Add New Prescreener Button */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleCreatePrescreener}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            ➕ Add New Prescreener
          </Button>
        </div>

        {/* Prescreener Library Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Prescreener Library</h2>
          <p className="text-sm text-gray-700 mb-2">
            There are <strong>5</strong> prescreeners in the Prescreener Library that meet the following criteria:
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Status:</strong> Active</li>
            <li><strong>Data Channel:</strong> Career Insite</li>
          </ul>
        </div>

        {/* Search Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Search the Library</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowKeywordModal(true)}
              variant="outline" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              🔍 By Keyword
            </Button>
            <Button 
              onClick={() => setShowStatusModal(true)}
              variant="outline" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              📊 By Status
            </Button>
            <Button 
              onClick={() => setShowDataChannelModal(true)}
              variant="outline" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              📡 By Data Channel
            </Button>
            <Button 
              onClick={() => setShowCategoryModal(true)}
              variant="outline" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              📂 By Category
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Results: 1-5 of 5</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 1</option>
              </select>
            </div>
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
      </div>
    )
  }

  const renderQuestionLibraryContent = () => {
    const questions = [
      {
        id: '1657393',
        text: 'Do you have a valid driver\'s license?',
        type: 'Yes/No',
        category: 'Driving History',
        modified: '4/5/2025',
        responses: ['Yes', 'No']
      },
      {
        id: '1657392',
        text: 'What is your age range?',
        type: 'Multiple Choice',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['18-25', '26-35', '36-45', '46-55', '55+']
      },
      {
        id: '1657391',
        text: 'Are you fluent in reading, writing, and speaking English?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657390',
        text: 'Do you have six months of experience in a retail environment?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657389',
        text: 'Are you willing to work flexible schedules, including evening and weekend hours?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657388',
        text: 'Will you now, or in the future, require sponsorship for employment Visa status (for example, H-1B visa status)?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657387',
        text: 'Are you a current student?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657386',
        text: 'Are you 18 years of age or older?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657385',
        text: 'Are you bilingual?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657384',
        text: 'Are you a previous employee of Walgreens, Duane Reade, Take Care Health or its subsidiaries?',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '11/22/2022',
        responses: ['Yes', 'No']
      },
      {
        id: '1657383',
        text: 'Are you willing to work in other areas of the warehouse when needed with little or no advance notice? For example, to help out while employees are on their lunch break, or when short-staffed.',
        type: 'Yes/No',
        category: 'Job Specific Questions',
        modified: '3/10/2022',
        responses: ['Yes', 'No']
      }
    ]

    return (
      <div>
        {/* Add New Question Button */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleCreateQuestion}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            ➕ Add New Question
          </Button>
        </div>

        {/* Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Details</h2>
          <p className="text-sm text-gray-700 mb-2">
            There are <strong>22</strong> questions in the Question Library that meet the following criteria:
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Status:</strong> Active</li>
          </ul>
        </div>

        {/* Search Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Search the Library</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setShowKeywordModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              🔍 By Keyword
            </Button>
            <Button 
              onClick={() => setShowStatusModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              📊 By Status
            </Button>
            <Button 
              onClick={() => setShowQuestionTypeModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ❓ By Question Type
            </Button>
            <Button 
              onClick={() => setShowCategoryModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              📂 By Category
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Results: 1-22 of 22</span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 1</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Question
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Key
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Modified
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question, index) => (
                <tr key={question.id} className="hover:bg-gray-50 relative group">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-md relative">
                    <div className="cursor-pointer">
                      <button
                        onClick={() => router.push(`/admin-console/prescreener/question-library/${question.id}`)}
                        className="text-left hover:underline"
                      >
                        {question.text}
                      </button>
                      {/* Hover Tooltip */}
                      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-64">
                        <div className="space-y-3">
                          <div>
                            <span className="font-semibold text-gray-900">Question Key:</span>
                            <div className="text-gray-700">{question.id}</div>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">Responses:</span>
                            <div className="text-gray-700">
                              {question.responses.map((response, idx) => (
                                <div key={idx}>[{response}]</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.category}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.modified}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Prescreening</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'general'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                General Qualifying Prescreeners
              </button>
              <button
                onClick={() => setActiveTab('jobSpecific')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'jobSpecific'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                Job Specific Prescreeners
              </button>
              <button
                onClick={() => setActiveTab('questionLibrary')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'questionLibrary'
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                Question Library
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && renderOverviewContent()}
          {activeTab === 'general' && renderGeneralContent()}
          {activeTab === 'jobSpecific' && renderJobSpecificContent()}
          {activeTab === 'questionLibrary' && renderQuestionLibraryContent()}
        </div>

        {/* Keyword Search Modal */}
        {showKeywordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Prescreener Name:</h3>
                <button 
                  onClick={() => setShowKeywordModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter prescreener name..."
                />
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => {
                    console.log('Searching for:', keywordSearch)
                    setShowKeywordModal(false)
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Filter Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">By Status:</h3>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  All Statuses
                </button>
                <button className="w-full text-left px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">
                  Active
                </button>
                <button className="w-full text-left px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Archived
                </button>
                <button className="w-full text-left px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Deprecated
                </button>
                <button className="w-full text-left px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Incomplete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Channel Filter Modal */}
        {showDataChannelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">By Data Channel:</h3>
                <button 
                  onClick={() => setShowDataChannelModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    All Data Channels
                  </button>
                  <button className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">
                    Career Insite
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    TelApp
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Kiosk
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Import
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Manually Entered
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Prospect Import
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    ZipRecruiter Import
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Indeed Import
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Monster Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">By Category:</h3>
                <button 
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">
                  All Categories
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Accounting
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  At Will
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Availability
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Criminal History
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Driving History
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Drug
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  EEO Questions
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Education
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Eligibility
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  FCRA
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Finance
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  General
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Government
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Hide In HMC
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Information Technology
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Job Specific Questions
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  NULL
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Other
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  PersonalInfo
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Terms and Conditions
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  WOTC
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Work History
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Question Type Filter Modal */}
        {showQuestionTypeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">By Question Type:</h3>
                <button 
                  onClick={() => setShowQuestionTypeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">
                  All Types
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Date
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Formatted Input
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Multiple Choice
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Numeric
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Page Break (System)
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Statement
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Text
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Time
                </button>
                <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                  Yes/No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
