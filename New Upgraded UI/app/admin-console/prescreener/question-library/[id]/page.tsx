'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function QuestionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState<'details' | 'whereUsed'>('details')

  // Mock question data - in real app, this would be fetched based on the ID
  const questionData = {
    id: params?.id || '1657393',
    question: "Do you have a valid driver's license?",
    category: 'Driving History',
    questionType: 'Yes/No',
    isSensitive: 'No',
    status: 'Active',
    created: {
      date: '4/5/2025',
      by: 'Kyle Bidwell'
    },
    modified: {
      date: '4/5/2025',
      by: 'Kyle Bidwell'
    },
    responses: ['Yes', 'No'],
    prescreeners: [
      {
        id: 1,
        title: 'prescreener',
        status: 'Incomplete'
      },
      {
        id: 2,
        title: "Driver's License Confirmation",
        status: 'Active'
      }
    ]
  }

  const handleCopy = () => {
    console.log('Copying question...')
  }

  const handleArchive = () => {
    console.log('Archiving question...')
  }

  const handleBackToLibrary = () => {
    router.push('/admin-console/prescreener?tab=questionLibrary')
  }

  const renderQuestionDetails = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Question Details */}
      <div className="lg:col-span-2">
        <div className="bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Question Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Question:</label>
              <div className="text-sm text-gray-700">{questionData.question}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Category:</label>
              <div className="text-sm text-gray-700">{questionData.category}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Question Type:</label>
              <div className="text-sm text-gray-700">{questionData.questionType}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Is Sensitive Data Question?:</label>
              <div className="text-sm text-gray-700">{questionData.isSensitive}</div>
            </div>
          </div>

          {/* How will this question be displayed */}
          <div className="mt-8">
            <h3 className="text-base font-medium text-gray-900 mb-4 bg-gray-100 p-3 rounded">
              How will this question be displayed
            </h3>
            <div className="border border-gray-300 p-4 rounded bg-gray-50">
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-900">{questionData.question}</div>
              </div>
              <div className="space-y-2">
                {questionData.responses.map((response, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="preview"
                      className="mr-2"
                      disabled
                    />
                    <span className="text-sm text-gray-700">{response}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Status and Actions */}
      <div className="space-y-6">
        {/* Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800">Active</span>
          </div>
          <div className="text-sm text-green-700">
            This question is available for use on prescreeners.
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-medium mb-4">Actions</h3>
          <div className="mb-4">
            <div className="text-white text-sm mb-2">Question In-Use</div>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleCopy}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              📄 Copy
            </button>
            <button
              onClick={handleArchive}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              📦 Archive
            </button>
            <button
              onClick={handleBackToLibrary}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              ↩️ Back to Library
            </button>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-medium mb-4">Audit Details</h3>
          <div className="space-y-3">
            <div>
              <div className="text-white text-sm font-medium">Created:</div>
              <div className="text-gray-300 text-sm">On {questionData.created.date} by</div>
              <div className="text-gray-300 text-sm">{questionData.created.by}</div>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Modified:</div>
              <div className="text-gray-300 text-sm">On {questionData.modified.date} by</div>
              <div className="text-gray-300 text-sm">{questionData.modified.by}</div>
            </div>
          </div>
        </div>

        {/* Multi-Language */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-medium mb-4">🌐 Multi-Language</h3>
          <div className="mb-3">
            <div className="text-white text-sm">View and edit content in a different language.</div>
          </div>
          <div>
            <div className="text-white text-sm font-medium mb-2">Language Versions</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">English (CA)</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">English</span>
              </div>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">Español</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">Français</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderWhereUsed = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Prescreener Templates */}
      <div className="lg:col-span-2">
        <div className="bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Prescreener Templates That Use This Question</h2>
          <p className="text-sm text-gray-600 mb-6">The following Prescreener templates contain this question.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {questionData.prescreeners.map((prescreener, index) => (
                  <tr key={prescreener.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          prescreener.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <button 
                          onClick={() => router.push(`/admin-console/prescreener/${prescreener.id}`)}
                          className="text-orange-600 hover:underline text-sm"
                        >
                          {prescreener.title}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {prescreener.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column - Same as Question Details */}
      <div className="space-y-6">
        {/* Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800">Active</span>
          </div>
          <div className="text-sm text-green-700">
            This question is available for use on prescreeners.
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-medium mb-4">Actions</h3>
          <div className="mb-4">
            <div className="text-white text-sm mb-2">Question In-Use</div>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleCopy}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              📄 Copy
            </button>
            <button
              onClick={handleArchive}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              📦 Archive
            </button>
            <button
              onClick={handleBackToLibrary}
              className="flex items-center text-orange-400 hover:text-orange-300 text-sm"
            >
              ↩️ Back to Library
            </button>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-medium mb-4">Audit Details</h3>
          <div className="space-y-3">
            <div>
              <div className="text-white text-sm font-medium">Created:</div>
              <div className="text-gray-300 text-sm">On {questionData.created.date} by</div>
              <div className="text-gray-300 text-sm">{questionData.created.by}</div>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Modified:</div>
              <div className="text-gray-300 text-sm">On {questionData.modified.date} by</div>
              <div className="text-gray-300 text-sm">{questionData.modified.by}</div>
            </div>
          </div>
        </div>

        {/* Multi-Language */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-orange-400 font-medium mb-4">🌐 Multi-Language</h3>
          <div className="mb-3">
            <div className="text-white text-sm">View and edit content in a different language.</div>
          </div>
          <div>
            <div className="text-white text-sm font-medium mb-2">Language Versions</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">English (CA)</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">English</span>
              </div>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">Español</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
              <div className="flex items-center">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mr-2">Français</span>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
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
          <h1 className="text-2xl font-semibold text-gray-900">{questionData.question}</h1>
        </div>

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="text-orange-600">Overview</span> | 
          <span className="text-orange-600"> General Qualifying Prescreeners</span> | 
          <span className="text-orange-600"> Job Specific Prescreeners</span> | 
          <span className="text-gray-900"> Question Library</span>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'details'
                    ? 'text-white bg-orange-500 px-3 rounded-t'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                Question Details
              </button>
              <button
                onClick={() => setActiveTab('whereUsed')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'whereUsed'
                    ? 'text-white bg-orange-500 px-3 rounded-t'
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                Where This Question Is Used
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'details' && renderQuestionDetails()}
          {activeTab === 'whereUsed' && renderWhereUsed()}
        </div>
      </div>
    </div>
  )
}
