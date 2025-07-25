'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Mock data for the script details
const scriptData = {
  id: '1',
  name: 'Baseline Offer Letter Script',
  category: 'Offer Letter',
  introductoryText: 'Baseline Offer Letter Script',
  showOptOutOption: true,
  optOutText: 'Opt-out option is "I do not wish to provide this information"',
  status: 'Active',
  statusMessage: 'This Script template is available for use on all new postings.',
  created: 'On 4/21/2011 by',
  modified: 'On 4/15/2025 by',
  questions: [
    {
      id: 31,
      code: 'Job Code',
      text: 'Job Code',
      type: 'KTMD Base Client',
      answer: 'Text - Short Answer'
    },
    {
      id: 32,
      code: 'Offer Date',
      text: 'Offer Date',
      type: 'KTMD Base Client',
      answer: '[Date]'
    },
    {
      id: 1142018,
      code: 'Employee ID',
      text: 'Employee ID',
      type: 'KTMD Base Client',
      answer: 'Text - Short Answer'
    },
    {
      id: 33,
      code: 'Offer Type',
      text: 'Offer Type',
      type: 'KTMD Base Client',
      responses: [
        { text: 'Counter Offer', id: '17262544' },
        { text: 'Original Modification', id: '17262545' },
        { text: 'Decline', id: '17262546' },
        { text: 'Special Offer', id: '17262547' },
        { text: 'Competitive Offer', id: '17262548' }
      ]
    },
    {
      id: 34,
      code: 'Offered By',
      text: 'Offered By',
      type: 'KTMD Base Client',
      answer: 'Text - Short Answer'
    },
    {
      id: 35,
      code: 'Start Date',
      text: 'Start Date',
      type: 'KTMD Base Client',
      answer: '[Date]'
    },
    {
      id: 36,
      code: 'Prngr',
      text: 'Prngr',
      type: 'KTMD Base Client',
      responses: [
        { text: 'Internal', id: '17262552' },
        { text: 'Full Time', id: '17262553' },
        { text: 'On Call', id: '17262554' }
      ]
    },
    {
      id: 37,
      code: 'Reports To',
      text: 'Reports To',
      type: 'KTMD Base Client',
      answer: 'Text - Short Answer'
    },
    {
      id: 38,
      code: 'Base Pay',
      text: 'Base Pay',
      type: 'KTMD Base Client',
      responses: [
        { text: 'Y or greater', id: '' },
        { text: 'Any other response', id: '' }
      ]
    },
    {
      id: 1142019,
      code: 'Bonus/Incentive Pay Terms',
      text: 'Bonus or Incentive Pay Terms',
      type: 'KTMD Base Client',
      answer: 'Text - Short Answer'
    },
    {
      id: 39,
      code: 'Pay Cycle',
      text: 'Pay Cycle',
      type: 'KTMD Base Client',
      responses: [
        { text: 'Hourly', id: '17262555' },
        { text: 'Monthly', id: '17262556' },
        { text: 'Annual', id: '17262557' }
      ]
    },
    {
      id: 1142017,
      code: 'Pay Period',
      text: 'Pay Period',
      type: 'KTMD Base Client',
      answer: 'Text - Short Answer'
    }
  ],
  languageVersions: [
    { name: 'English (Australia)', count: 0 },
    { name: 'English (CA)', count: 0 },
    { name: 'English (UK)', count: 0 },
    { name: 'English (Ireland)', count: 0 },
    { name: 'English', count: 0 },
    { name: 'Español', count: 0 },
    { name: 'Français', count: 0 }
  ]
}

export default function ScriptDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <h1 className="text-2xl font-semibold text-gray-900">{scriptData.name}</h1>
            </div>
          </div>
          
          {/* Top Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-800">Active</span>
                  </div>
                  <p className="text-sm text-green-700">{scriptData.statusMessage}</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Actions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={`/admin-console/workflow-script-library/${params.id}/copy`} className="flex items-center gap-2">
                    📋 Copy Script
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin-console/workflow-script-library" className="flex items-center gap-2">
                    ↗ Back to Library
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Audit Details Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  📊 Audit Details
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Audit Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <div className="text-gray-900">{scriptData.created}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Modified:</span>
                      <div className="text-gray-900">{scriptData.modified}</div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Multi-Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  🌐 Multi-Language
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    🌐 Multi-Language
                  </h3>
                  <p className="text-sm text-gray-600">View and edit content in a different language.</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Language Versions</h4>
                    <div className="space-y-1">
                      {scriptData.languageVersions.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-orange-600">{lang.name}</span>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                            {lang.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'questions'
                ? 'border-orange-500 text-orange-600 bg-orange-50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Questions
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Script Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                      <p className="text-sm text-gray-900">{scriptData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                      <p className="text-sm text-gray-900">{scriptData.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Introductory Text:</label>
                      <p className="text-sm text-gray-900">{scriptData.introductoryText}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Show an opt-out option for voluntary Yes/No questions:</label>
                      <p className="text-sm text-gray-900">{scriptData.optOutText}</p>
                      <p className="text-sm text-gray-600 mt-1">Yes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 mb-4">
                  The following questions are assigned to this Workflow Script:
                </p>
                {scriptData.questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="font-medium text-gray-900">
                        [{question.id}] {question.code} {question.text} ({question.type})
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-700">
                        <strong>Answer:</strong>
                      </div>
                      {question.answer && (
                        <div className="mt-1 text-sm text-gray-600">{question.answer}</div>
                      )}
                      {question.responses && (
                        <div className="mt-2 space-y-1">
                          {question.responses.map((response, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-700">{idx + 1}. {response.text}</span>
                              {response.id && <span className="text-gray-500">{response.id}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
