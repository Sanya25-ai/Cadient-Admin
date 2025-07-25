'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

export default function PrescreenerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'scoring' | 'interviewQuestions'>('overview')
  const [showReorderModal, setShowReorderModal] = useState(false)
  const [showMassEditModal, setShowMassEditModal] = useState(false)
  const [showStateSelector, setShowStateSelector] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])

  // Handle URL parameters to set the correct tab
  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab && ['overview', 'questions', 'scoring', 'interviewQuestions'].includes(tab)) {
      setActiveTab(tab as 'overview' | 'questions' | 'scoring' | 'interviewQuestions')
    }
  }, [searchParams])

  const prescreenerId = params?.id as string

  const questions = [
    {
      id: '1657381',
      text: 'Can you provide legal documentation establishing your identity and eligibility to be legally employed in the United States?',
      followupTo: '',
      responses: [
        { id: '319074024', text: 'Yes' },
        { id: '319074027', text: 'No' }
      ]
    },
    {
      id: '4',
      text: 'Are you willing to submit to a criminal background check?',
      followupTo: '',
      responses: [
        { id: '297818842', text: 'Yes' },
        { id: '297818845', text: 'No' }
      ]
    },
    {
      id: '3',
      text: 'Are you willing to submit to a random drug test upon request?',
      followupTo: '',
      responses: [
        { id: '297818822', text: 'Yes' },
        { id: '297818825', text: 'No' }
      ]
    },
    {
      id: '1657382',
      text: 'Are you willing to work in an environment where you must remain on your feet for several hours at a time, with or without reasonable accommodation?',
      followupTo: '',
      responses: [
        { id: '319074047', text: 'Yes' },
        { id: '319074050', text: 'No' }
      ]
    },
    {
      id: '1657383',
      text: 'Are you willing to work in other areas of the warehouse when needed with little or no advance notice? For example, to help out while employees are on their lunch break, or when short-staffed.',
      followupTo: '',
      responses: [
        { id: '319074082', text: 'Yes' },
        { id: '319074085', text: 'No' }
      ]
    }
  ]

  const renderOverviewContent = () => (
    <div className="flex gap-8">
      {/* Left Column - Prescreener Details */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Prescreener Details</h2>
        
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-900">Name:</span>
            <div className="text-gray-700">Minimum Qualifications</div>
          </div>
          
          <div>
            <span className="font-semibold text-gray-900">Data Channel:</span>
            <div className="text-gray-700">Career Insite</div>
          </div>
          
          <div>
            <span className="font-semibold text-gray-900">Use This Prescreener on the Following Sites:</span>
            <div className="text-gray-700">Sales Demo Retail Omega Non-Req HireNow</div>
          </div>
          
          <div>
            <span className="font-semibold text-gray-900">Introductory Text:</span>
            <div className="text-gray-700"></div>
          </div>
          
          <div>
            <span className="font-semibold text-gray-900">Show an opt-out option for voluntary Yes/No questions:</span>
            <span className="text-gray-600 text-sm">(Opt-out option is - "I do not wish to provide this information")</span>
            <div className="text-gray-700">Yes</div>
          </div>
        </div>
      </div>

      {/* Right Column - Status and Actions */}
      <div className="w-80 space-y-6">
        {/* Active Status */}
        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="font-semibold text-green-800">Active</span>
          </div>
          <p className="text-sm text-green-700">
            This Prescreener template is available for use on all new postings.
          </p>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => router.push('/admin-console/prescreener/create')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📋</span>
              Copy Prescreener
            </button>
            <button 
              onClick={() => setShowArchiveModal(true)}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📁</span>
              Archive Prescreener
            </button>
            <button 
              onClick={() => router.push('/admin-console/prescreener')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">⬅️</span>
              Back to Library
            </button>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Audit Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-white font-medium">Created:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
            <div>
              <span className="text-white font-medium">Modified:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
          </div>
        </div>

        {/* Multi-Language */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3 flex items-center">
            <span className="mr-2">🌐</span>
            Multi-Language
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            View and edit content in a different language.
          </p>
          <div>
            <span className="text-white font-medium text-sm">Language Versions</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                English (CA) <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                English
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Español <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Français <span className="ml-1">ℹ️</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderQuestionsContent = () => (
    <div className="flex gap-8">
      {/* Left Column - Questions */}
      <div className="flex-1">
        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            onClick={() => setShowReorderModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <span>✏️</span>
            Reorder questions
          </Button>
          <Button 
            onClick={() => setShowMassEditModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <span>✏️</span>
            Mass edit questions
          </Button>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions</h2>
        <p className="text-sm text-gray-700 mb-6">
          The following questions are assigned to this prescreener template. All "knock out" answers are displayed in red. All "Marginal" answers are displayed in orange.
        </p>

        {/* Questions List */}
        <div className="space-y-4">
          {/* Question 1 */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-red-500 font-bold mr-2">*</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">
                  [1657381] Can you provide legal documentation establishing your identity and eligibility to be legally employed in the United States? [Sales Demo Retail Omega]
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Answer</th>
                      <th className="px-3 py-2 text-left">Response Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2">1. Yes</td>
                      <td className="px-3 py-2">319074024</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-red-500">2. No</td>
                      <td className="px-3 py-2 text-red-500">319074027</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-red-500 font-bold mr-2">*</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">
                  [4] Are you willing to submit to a criminal background check? [Sales Demo Retail Omega]
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Answer</th>
                      <th className="px-3 py-2 text-left">Response Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2">1. Yes</td>
                      <td className="px-3 py-2">297818842</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-red-500">2. No</td>
                      <td className="px-3 py-2 text-red-500">297818845</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-red-500 font-bold mr-2">*</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">
                  [3] Are you willing to submit to a random drug test upon request? [Sales Demo Retail Omega]
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Answer</th>
                      <th className="px-3 py-2 text-left">Response Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2">1. Yes</td>
                      <td className="px-3 py-2">297818822</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-red-500">2. No</td>
                      <td className="px-3 py-2 text-red-500">297818825</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-red-500 font-bold mr-2">*</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">
                  [1657382] Are you willing to work in an environment where you must remain on your feet for several hours at a time, with or without reasonable accommodation? [Sales Demo Retail Omega]
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Answer</th>
                      <th className="px-3 py-2 text-left">Response Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2">1. Yes</td>
                      <td className="px-3 py-2">319074047</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">2. No</td>
                      <td className="px-3 py-2">319074050</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Question 5 */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-red-500 font-bold mr-2">*</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-2">
                  [1657383] Are you willing to work in other areas of the warehouse when needed with little or no advance notice? For example, to help out while employees are on their lunch break, or when short-staffed. [Sales Demo Retail Omega]
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Answer</th>
                      <th className="px-3 py-2 text-left">Response Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2">1. Yes</td>
                      <td className="px-3 py-2">319074082</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">2. No</td>
                      <td className="px-3 py-2">319074085</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Status and Actions */}
      <div className="w-80 space-y-6">
        {/* Active Status */}
        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="font-semibold text-green-800">Active</span>
          </div>
          <p className="text-sm text-green-700">
            This Prescreener template is available for use on all new postings.
          </p>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => router.push('/admin-console/prescreener/create')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📋</span>
              Copy Prescreener
            </button>
            <button 
              onClick={() => setShowArchiveModal(true)}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📁</span>
              Archive Prescreener
            </button>
            <button 
              onClick={() => router.push('/admin-console/prescreener')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">⬅️</span>
              Back to Library
            </button>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Audit Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-white font-medium">Created:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
            <div>
              <span className="text-white font-medium">Modified:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
          </div>
        </div>

        {/* Multi-Language */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3 flex items-center">
            <span className="mr-2">🌐</span>
            Multi-Language
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            View and edit content in a different language.
          </p>
          <div>
            <span className="text-white font-medium text-sm">Language Versions</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                English (CA) <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                English
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Español <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Français <span className="ml-1">ℹ️</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderScoringContent = () => (
    <div className="flex gap-8">
      {/* Left Column - Scoring */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Scoring</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Candidates Who Get Knocked Out</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>-Will fail the prescreener</li>
            <li>-Their disposition will automatically be set to Disqualified</li>
            <li>-They will not receive a prescreener-related email</li>
          </ul>
        </div>
      </div>

      {/* Right Column - Status and Actions */}
      <div className="w-80 space-y-6">
        {/* Active Status */}
        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="font-semibold text-green-800">Active</span>
          </div>
          <p className="text-sm text-green-700">
            This Prescreener template is available for use on all new postings.
          </p>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => router.push('/admin-console/prescreener/create')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📋</span>
              Copy Prescreener
            </button>
            <button 
              onClick={() => setShowArchiveModal(true)}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📁</span>
              Archive Prescreener
            </button>
            <button 
              onClick={() => router.push('/admin-console/prescreener')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">⬅️</span>
              Back to Library
            </button>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Audit Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-white font-medium">Created:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
            <div>
              <span className="text-white font-medium">Modified:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
          </div>
        </div>

        {/* Multi-Language */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3 flex items-center">
            <span className="mr-2">🌐</span>
            Multi-Language
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            View and edit content in a different language.
          </p>
          <div>
            <span className="text-white font-medium text-sm">Language Versions</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                English (CA) <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                English
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Español <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Français <span className="ml-1">ℹ️</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInterviewQuestionsContent = () => (
    <div className="flex gap-8">
      {/* Left Column - Interview Questions */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Questions</h2>
        
        <p className="text-sm text-gray-700">
          No follow up interview questions have been attached to the responses for this script.
        </p>
      </div>

      {/* Right Column - Status and Actions */}
      <div className="w-80 space-y-6">
        {/* Active Status */}
        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="font-semibold text-green-800">Active</span>
          </div>
          <p className="text-sm text-green-700">
            This Prescreener template is available for use on all new postings.
          </p>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Actions</h3>
          <div className="space-y-2">
            <button 
              onClick={() => router.push('/admin-console/prescreener/create')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📋</span>
              Copy Prescreener
            </button>
            <button 
              onClick={() => setShowArchiveModal(true)}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">📁</span>
              Archive Prescreener
            </button>
            <button 
              onClick={() => router.push('/admin-console/prescreener')}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              <span className="mr-2">⬅️</span>
              Back to Library
            </button>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3">Audit Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-white font-medium">Created:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
            <div>
              <span className="text-white font-medium">Modified:</span>
              <div className="text-gray-300">On 3/10/2022 by</div>
              <div className="text-gray-300">Melissa Moser</div>
            </div>
          </div>
        </div>

        {/* Multi-Language */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-semibold mb-3 flex items-center">
            <span className="mr-2">🌐</span>
            Multi-Language
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            View and edit content in a different language.
          </p>
          <div>
            <span className="text-white font-medium text-sm">Language Versions</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                English (CA) <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                English
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Español <span className="ml-1">ℹ️</span>
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center">
                Français <span className="ml-1">ℹ️</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">📋</span>
            <h1 className="text-2xl font-semibold text-gray-900">Minimum Qualifications</h1>
          </div>
          <div className="h-1 bg-orange-500 w-full"></div>
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
            className="text-gray-700 hover:text-orange-600 hover:underline cursor-pointer"
          >
            General Qualifying Prescreeners
          </button>
          <span className="mx-2">|</span>
          <button 
            onClick={() => router.push('/admin-console/prescreener?tab=jobSpecific')}
            className="text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
          >
            Job Specific Prescreeners
          </button>
          <span className="mx-2">|</span>
          <button 
            onClick={() => router.push('/admin-console/prescreener?tab=questionLibrary')}
            className="text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
          >
            Question Library
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded ${
                activeTab === 'overview'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 text-sm font-medium rounded ${
                activeTab === 'questions'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setActiveTab('scoring')}
              className={`px-4 py-2 text-sm font-medium rounded ${
                activeTab === 'scoring'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Scoring
            </button>
            <button
              onClick={() => setActiveTab('interviewQuestions')}
              className={`px-4 py-2 text-sm font-medium rounded ${
                activeTab === 'interviewQuestions'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Interview Questions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && renderOverviewContent()}
          {activeTab === 'questions' && renderQuestionsContent()}
          {activeTab === 'scoring' && renderScoringContent()}
          {activeTab === 'interviewQuestions' && renderInterviewQuestionsContent()}
        </div>

        {/* Reorder Questions Modal */}
        {showReorderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
                  <p className="text-sm text-gray-700">
                    The following questions are assigned to this prescreener template. All "knock out" answers are displayed in red. All "Marginal" answers are displayed in orange.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-700 p-3 rounded-lg mb-4 flex gap-3">
                  <Button className="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1">
                    ⬆️ Move Up
                  </Button>
                  <Button className="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1">
                    ⬇️ Move Down
                  </Button>
                  <Button className="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1">
                    ➖ Remove
                  </Button>
                  <Button className="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1">
                    ▶️ Save
                  </Button>
                  <Button 
                    onClick={() => setShowReorderModal(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1"
                  >
                    ❌ Cancel
                  </Button>
                </div>

                {/* Questions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-12">
                          <input type="checkbox" className="w-4 h-4" />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                          Key
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                          Question
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                          Followup to
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {questions.map((question, index) => (
                        <tr key={question.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input type="checkbox" className="w-4 h-4" />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {question.id}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 max-w-md">
                            {question.text.length > 50 ? `${question.text.substring(0, 50)}...` : question.text}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {question.followupTo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mass Edit Questions Modal */}
        {showMassEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
                  <p className="text-sm text-gray-700">
                    The following questions are assigned to this prescreener template. All "knock out" answers are displayed in red. All "Marginal" answers are displayed in orange.
                  </p>
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border border-orange-300 rounded-lg p-4 bg-orange-50">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-600 font-semibold">Filter Up By:</span>
                          <input 
                            type="text" 
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-32"
                            defaultValue=""
                          />
                        </div>
                        
                        <div className="bg-white border border-gray-300 rounded p-3 mb-3">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-sm font-medium">Required:</span>
                            <span className="text-sm">[{question.id}]</span>
                            <span className="text-sm">{question.text}</span>
                            <span className="text-sm text-gray-600">[Sales Demo Retail Omega]</span>
                          </div>
                        </div>

                        <table className="w-full text-sm border border-gray-300">
                          <thead className="bg-gray-600 text-white">
                            <tr>
                              <th className="px-3 py-2 text-left">ResponseId</th>
                              <th className="px-3 py-2 text-left">Answer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {question.responses.map((response, responseIndex) => (
                              <tr key={response.id} className={responseIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-3 py-2 border-b border-gray-200">
                                  {responseIndex + 1}. {response.id}
                                </td>
                                <td className="px-3 py-2 border-b border-gray-200 text-red-500">
                                  {response.text}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="mt-3">
                          <div className="text-sm mb-2">
                            <span className="font-medium">Position State Specific:</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            This question will only be asked of candidates applying to locations in the following states
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            (separate multiple entries with a comma)
                          </div>
                          <Button 
                            onClick={() => setShowStateSelector(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1"
                          >
                            Use State Selector
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Save
                  </Button>
                  <Button 
                    onClick={() => setShowMassEditModal(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State Selector Modal */}
        {showStateSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Question States</h2>
                  <button 
                    onClick={() => setShowStateSelector(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Please select the specific state or states:
                  </h3>

                  {/* Country Sections */}
                  <div className="space-y-6">
                    {/* United States */}
                    <div>
                      <div className="flex items-center text-orange-600 font-semibold mb-3">
                        <span>United States of America</span>
                        <span className="ml-2">▼</span>
                      </div>
                    </div>

                    {/* Australia */}
                    <div>
                      <div className="flex items-center text-orange-600 font-semibold mb-3">
                        <span>Australia</span>
                        <span className="ml-2">▼</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 ml-4">
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Australian Capital Territory</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>New South Wales</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Northern Territory</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Queensland</span>
                          </label>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>South Australia</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Tasmania</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Victoria</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Western Australia</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Canada */}
                    <div>
                      <div className="flex items-center text-orange-600 font-semibold mb-3">
                        <span>Canada</span>
                        <span className="ml-2">▼</span>
                      </div>
                    </div>

                    {/* United Kingdom */}
                    <div>
                      <div className="flex items-center text-orange-600 font-semibold mb-3">
                        <span>United Kingdom of Great Britain and Northern Ireland</span>
                        <span className="ml-2">▼</span>
                      </div>
                    </div>

                    {/* Republic of Ireland */}
                    <div>
                      <div className="flex items-center text-orange-600 font-semibold mb-3">
                        <span>Republic of Ireland</span>
                        <span className="ml-2">▼</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-8">
                    <Button 
                      onClick={() => setShowStateSelector(false)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                    >
                      Select
                    </Button>
                    <Button 
                      onClick={() => setShowStateSelector(false)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Archive Confirmation Modal */}
        {showArchiveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl p-8">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📋</span>
                  <h1 className="text-2xl font-semibold text-gray-900">Minimum Qualifications</h1>
                </div>
                <div className="h-1 bg-orange-500 w-full"></div>
              </div>

              {/* Breadcrumb */}
              <div className="mb-6 text-sm">
                <span className="text-orange-600">Overview</span>
                <span className="mx-2">|</span>
                <span className="text-gray-700">General Qualifying Prescreeners</span>
                <span className="mx-2">|</span>
                <span className="text-orange-600">Job Specific Prescreeners</span>
                <span className="mx-2">|</span>
                <span className="text-orange-600">Question Library</span>
              </div>

              {/* Confirmation Content */}
              <div className="bg-gray-200 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Please Confirm</h2>
                
                <p className="text-gray-900 mb-4">
                  Are you sure you want to archive this general qualifying prescreener template?
                </p>
                
                <p className="text-gray-900 mb-6">
                  If you archive this prescreener template, it will not be available to be used on any postings created in the future.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      // Handle archive action here
                      setShowArchiveModal(false)
                      // You could add actual archive logic here
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                  >
                    Archive
                  </Button>
                  <Button 
                    onClick={() => setShowArchiveModal(false)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                  >
                    Cancel
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
