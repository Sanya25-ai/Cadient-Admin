'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronDown, Search, X, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

// Mock data matching the HMC interface
const offerTemplatesData = [
  {
    id: '1',
    name: 'Simplified Offer Letter',
    status: 'active',
    corporateCareerSites: [
      'Sales Demo Retail Omega KTMD NonReq Internal',
      'Sales Demo Retail Omega NonReq External',
      'Sales Demo Retail Omega Req External',
      'Sales Demo Retail Omega Req Internal'
    ],
    modified: '4/6/2022'
  },
  {
    id: '2',
    name: 'Standard Offer Template',
    status: 'active',
    corporateCareerSites: [
      'Sales Demo Retail Omega KTMD NonReq Internal',
      'Sales Demo Retail Omega NonReq External'
    ],
    modified: '4/6/2022'
  }
]

export default function OfferTemplateLibraryPage() {
  const router = useRouter()
  const [showKeywordModal, setShowKeywordModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [keywordSearch, setKeywordSearch] = useState('')

  const handleTemplateClick = (templateId: string) => {
    router.push(`/admin-console/offer-template-library/${templateId}`)
  }

  const handleAddNewTemplate = () => {
    router.push('/admin-console/offer-template-library/create')
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/admin-console/hiring-behavior">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h1 className="text-2xl font-semibold text-gray-900">Offer Template Library</h1>
          </div>
          <Button 
            onClick={handleAddNewTemplate}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            ➕ Add New Offer Template
          </Button>
        </div>

        {/* Status Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-700">
            There are <strong>2</strong> Offer Templates in the Template Library that meet the following criteria:
          </p>
          <ul className="mt-2 ml-4">
            <li className="text-sm text-gray-700">• <strong>Status:</strong> Active</li>
          </ul>
        </div>

        {/* Search Options */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Search the Library:</span>
            <Button 
              onClick={() => setShowKeywordModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 flex items-center gap-1"
            >
              🔽 By Keyword
            </Button>
            <Button 
              onClick={() => setShowCategoryModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 flex items-center gap-1"
            >
              🔽 By Category
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Results: 1-2 of 2
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>1 of 1</option>
            </select>
          </div>
        </div>

        {/* Templates Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 w-16 text-center">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/4">Name</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/2">Corporate Career Sites</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/6">Modified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offerTemplatesData.map((template) => (
                <TableRow key={template.id} className="border-b border-gray-200">
                  <TableCell className="text-center py-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto"></div>
                  </TableCell>
                  <TableCell className="py-3">
                    <button
                      onClick={() => handleTemplateClick(template.id)}
                      className="font-medium text-blue-600 hover:text-red-600 hover:underline cursor-pointer transition-colors"
                      title={`View details for ${template.name}`}
                    >
                      {template.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-700 py-3">
                    <div className="space-y-1">
                      {template.corporateCareerSites.map((site, index) => (
                        <div key={index} className="text-sm text-blue-600">
                          {site}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700 py-3">
                    {template.modified}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Keyword Search Modal */}
      <Dialog open={showKeywordModal} onOpenChange={setShowKeywordModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              By Keyword:
              <Button variant="ghost" size="sm" onClick={() => setShowKeywordModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              placeholder="Enter search keyword..."
              className="w-full"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
              🔍 Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Search Modal */}
      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              By Category:
              <Button variant="ghost" size="sm" onClick={() => setShowCategoryModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
              >
                All Categories
              </Button>
              <Button
                className="bg-orange-500 text-white rounded-full px-4 py-2"
              >
                Active
              </Button>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
              >
                Inactive
              </Button>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
              >
                Archived
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
