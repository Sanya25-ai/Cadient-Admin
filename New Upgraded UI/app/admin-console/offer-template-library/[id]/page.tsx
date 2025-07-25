'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Mock template data
const getTemplateData = (id: string) => {
  const templates = {
    '1': {
      id: '1',
      name: 'Simplified Offer Letter',
      status: 'active',
      corporateCareerSites: [
        'Sales Demo Retail Omega KTMD NonReq Internal',
        'Sales Demo Retail Omega NonReq External',
        'Sales Demo Retail Omega Req External',
        'Sales Demo Retail Omega Req Internal'
      ],
      content: `[[Offer: Offer Date]]

[[Candidate: First Name]] [[Candidate: Last Name]]

[[Candidate: Address 1]]

[[Candidate: City]], [[Candidate: State]] [[Candidate: Zip/Postal Code]]


Dear [[Candidate: First Name]],

I am pleased to offer you the position of [[Job Title]] for Industries. This position will be located at our [[Location]] facility.

Your starting salary will be $[[Salary]] per [[Pay Period]]. You will be eligible for our comprehensive benefits package which includes health insurance, dental insurance, vision insurance, and a 401(k) retirement plan.

Your anticipated start date is [[Start Date]]. Please report to [[Supervisor Name]] at [[Start Time]] on your first day.

This offer is contingent upon successful completion of a background check and drug screening.

Please sign and return this letter by [[Response Date]] to indicate your acceptance of this position.

We look forward to having you join our team!

Sincerely,

[[Hiring Manager Name]]
[[Title]]
[[Company Name]]


I accept the position as described above:

Signature: _________________________ Date: _____________

[[Candidate: First Name]] [[Candidate: Last Name]]`
    },
    '2': {
      id: '2',
      name: 'Standard Offer Template',
      status: 'active',
      corporateCareerSites: [
        'Sales Demo Retail Omega KTMD NonReq Internal',
        'Sales Demo Retail Omega NonReq External'
      ],
      content: `[[Offer: Offer Date]]

[[Candidate: First Name]] [[Candidate: Last Name]]
[[Candidate: Address 1]]
[[Candidate: City]], [[Candidate: State]] [[Candidate: Zip/Postal Code]]

Dear [[Candidate: First Name]],

We are pleased to extend an offer of employment for the position of [[Job Title]] with [[Company Name]].

Position Details:
- Job Title: [[Job Title]]
- Department: [[Department]]
- Reports To: [[Supervisor Name]]
- Start Date: [[Start Date]]
- Salary: $[[Salary]] per [[Pay Period]]
- Work Schedule: [[Work Schedule]]

This offer is contingent upon:
- Successful completion of background verification
- Drug screening results
- Reference checks

Please confirm your acceptance by signing and returning this letter by [[Response Date]].

We look forward to welcoming you to our team.

Sincerely,

[[Hiring Manager Name]]
[[Title]]

Acceptance:
I accept this offer of employment as outlined above.

Signature: _________________________ Date: _____________`
    }
  }
  
  return templates[id as keyof typeof templates] || templates['1']
}

export default function OfferTemplateDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const template = getTemplateData(params.id)
  const [isArchived, setIsArchived] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleBackToLibrary = () => {
    router.push('/admin-console/offer-template-library')
  }

  const handleEditTemplate = () => {
    router.push(`/admin-console/offer-template-library/${params.id}/edit`)
  }

  const handleCopyTemplate = () => {
    router.push(`/admin-console/offer-template-library/${params.id}/copy`)
  }

  const handlePreviewTemplate = () => {
    router.push(`/admin-console/offer-template-library/${params.id}/preview`)
  }

  const handleArchiveTemplate = () => {
    setIsArchived(true)
    setShowSuccessMessage(true)
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span className="font-medium">Success!</span>
            <span>Offer Template archived successfully.</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{template.name}</h1>
            <Button 
              onClick={handleBackToLibrary}
              variant="outline"
              className="flex items-center gap-2"
            >
              ← Back to Offer Template Library
            </Button>
          </div>
        </div>

        {/* Template Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Corporate Career Sites */}
          <div className="lg:col-span-2">
            <h3 className="font-medium text-gray-900 mb-3">Corporate Career Sites:</h3>
            <div className="space-y-1">
              {template.corporateCareerSites.map((site, index) => (
                <div key={index} className="text-sm text-gray-700">
                  {site}
                </div>
              ))}
            </div>
          </div>

          {/* Status and Actions */}
          <div className="space-y-4">
            {/* Status Badge */}
            <div>
              {isArchived ? (
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Archived
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </div>
              )}
            </div>

            {/* Actions Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-2">
                    ⚙️ Actions
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {!isArchived && (
                    <DropdownMenuItem onClick={handleEditTemplate} className="flex items-center gap-2">
                      ✏️ Edit Template
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleCopyTemplate} className="flex items-center gap-2">
                    📄 Copy Template
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePreviewTemplate} className="flex items-center gap-2">
                    👁️ Preview Template
                  </DropdownMenuItem>
                  {!isArchived && (
                    <DropdownMenuItem onClick={handleArchiveTemplate} className="flex items-center gap-2">
                      📁 Archive Template
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Multi-Language Section */}
            <div className="bg-orange-100 p-4 rounded-lg">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 w-full justify-between">
                    🌐 Multi-Language
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇺🇸 English (Default)
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇪🇸 Spanish
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇫🇷 French
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇩🇪 German
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇮🇹 Italian
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇵🇹 Portuguese
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇨🇳 Chinese
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    🇯🇵 Japanese
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm text-orange-700 mt-2">
                Select a language to view or edit the template in that language.
              </p>
            </div>
          </div>
        </div>

        {/* Template Content */}
        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-4">Template Content:</h3>
          <div className="bg-white border border-gray-200 rounded p-4 font-mono text-sm whitespace-pre-wrap">
            {template.content}
          </div>
        </div>
      </div>
    </div>
  )
}
