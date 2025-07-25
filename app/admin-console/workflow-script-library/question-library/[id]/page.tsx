'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useState } from 'react'
import { 
  ChevronLeft,
  ChevronDown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface QuestionDetailPageProps {
  params: {
    id: string
  }
}

// Sample data - in a real app this would come from an API
const questionData: Record<string, {
  id: number
  question: string
  category: string
  identifier: string
  type: string
  dateFormat: string
  dateValidation: string
  key: string
  responses: string
  status: string
  created: string
  modified: string
  scriptTemplates: Array<{ title: string; status: string }>
}> = {
  "1": {
    id: 1,
    question: "Orientation Date",
    category: "Offer Letter",
    identifier: "OrientationDate",
    type: "Date",
    dateFormat: "Ask for Month, Date and Year",
    dateValidation: "Future Date",
    key: "8",
    responses: "Date Response",
    status: "Active",
    created: "On 9/15/2020 by",
    modified: "On 9/15/2020 by",
    scriptTemplates: [
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" },
      { title: "Baseline Offer Letter Script", status: "Incomplete" }
    ]
  }
}

export default function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const [activeTab, setActiveTab] = useState('details')
  const question = questionData[params.id]

  if (!question) {
    return <div>Question not found</div>
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">{question.question}</h1>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#F5A623] hover:bg-[#E09612] text-white">
              Quick Links
            </Button>
            <Button variant="outline" className="border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-white">
              Your Account
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-1 mb-6">
              <Button
                variant={activeTab === 'details' ? 'default' : 'outline'}
                className={activeTab === 'details' 
                  ? 'bg-[#F5A623] text-white' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }
                onClick={() => setActiveTab('details')}
              >
                Question Details
              </Button>
              <Button
                variant={activeTab === 'usage' ? 'default' : 'outline'}
                className={activeTab === 'usage' 
                  ? 'bg-[#F5A623] text-white' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }
                onClick={() => setActiveTab('usage')}
              >
                Where This Question Is Used
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Question Details Section */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Question Details</h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Question:</span>
                      <div className="mt-1">{question.question}</div>
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>
                      <div className="mt-1">{question.category}</div>
                    </div>
                    <div>
                      <span className="font-medium">Question Identifier:</span>
                      <div className="mt-1">{question.identifier}</div>
                    </div>
                    <div>
                      <span className="font-medium">Question Type:</span>
                      <div className="mt-1">{question.type}</div>
                    </div>
                    <div>
                      <span className="font-medium">Date Format:</span>
                      <div className="mt-1">{question.dateFormat}</div>
                    </div>
                    <div>
                      <span className="font-medium">Date Validation:</span>
                      <div className="mt-1">{question.dateValidation}</div>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-4">How will this question be displayed</h3>
                  <div className="bg-gray-50 p-4 rounded border">
                    <div className="text-sm font-medium mb-2">{question.question}</div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                        placeholder=""
                      />
                      <span className="text-gray-400">📅</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Script Templates That Use This Question</h2>
                <p className="text-sm text-gray-600 mb-4">The following Script templates contain this question.</p>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {question.scriptTemplates.map((template, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-2 w-2 bg-gray-400 rounded-full mr-3"></div>
                              <span className="text-sm text-[#EE5A37] hover:underline cursor-pointer">
                                {template.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {template.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Status Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Active</span>
              </div>
              <p className="text-sm text-green-700">
                This question is available for use on Workflow Scripts.
              </p>
            </div>

            {/* Actions Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Actions</h3>
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between text-[#EE5A37] hover:bg-gray-700 hover:text-[#EE5A37]">
                      <div className="flex items-center">
                        <span className="mr-2">✏️</span>
                        Edit
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Edit Question</DropdownMenuItem>
                    <DropdownMenuItem>Edit Properties</DropdownMenuItem>
                    <DropdownMenuItem>Edit Validation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between text-[#EE5A37] hover:bg-gray-700 hover:text-[#EE5A37]">
                      <div className="flex items-center">
                        <span className="mr-2">📋</span>
                        Copy
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Copy Question</DropdownMenuItem>
                    <DropdownMenuItem>Copy to Template</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between text-[#EE5A37] hover:bg-gray-700 hover:text-[#EE5A37]">
                      <div className="flex items-center">
                        <span className="mr-2">📦</span>
                        Archive
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Archive Question</DropdownMenuItem>
                    <DropdownMenuItem>Delete Question</DropdownMenuItem>
                    <DropdownMenuItem>Export Question</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/admin-console/workflow-script-library/question-library">
                  <Button variant="ghost" className="w-full justify-start text-[#EE5A37] hover:bg-gray-700 hover:text-[#EE5A37]">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Library
                  </Button>
                </Link>
              </div>
            </div>

            {/* Audit Details Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Audit Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-300 font-medium">Created:</span>
                  <div className="text-gray-400">{question.created}</div>
                </div>
                <div>
                  <span className="text-gray-300 font-medium">Modified:</span>
                  <div className="text-gray-400">{question.modified}</div>
                </div>
              </div>
            </div>

            {/* Multi-Language Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#F5A623]">🌐</span>
                <h3 className="text-[#F5A623] font-medium">Multi-Language</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                View and edit content in a different language.
              </p>
              <div>
                <span className="text-gray-300 font-medium text-sm">Language Versions</span>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white text-gray-700 border-gray-300">
                      English (CA)
                    </Badge>
                    <div className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#F5A623] text-white">
                      English
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#F5A623] text-white">
                      Español
                    </Badge>
                    <div className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#F5A623] text-white">
                      Français
                    </Badge>
                    <div className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
