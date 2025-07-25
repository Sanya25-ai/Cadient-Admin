'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { useState } from 'react'

export default function AllDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Alphabetical')
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [documentTypes, setDocumentTypes] = useState('All Documents')
  const [documentUsage, setDocumentUsage] = useState('No Usage Filter')
  const [publishStatus, setPublishStatus] = useState('Active')
  const [showAddNewModal, setShowAddNewModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [newDocumentName, setNewDocumentName] = useState('')
  const [newDocumentDescription, setNewDocumentDescription] = useState('')

  // Mock document data
  const documents = [
    {
      id: '8850-form',
      name: '8850 Form',
      description: 'Form 8850 Description',
      lastModified: 'KBIDWELL on May 6, 2020 (6:47 AM)'
    },
    {
      id: '89-350-10-1-mississippi',
      name: '89-350-10-1 Mississippi',
      description: '89-350-10 Mississippi',
      lastModified: 'KBIDWELL on May 6, 2020 (6:47 AM)'
    },
    {
      id: 'a-4-alabama',
      name: 'A-4 Alabama',
      description: 'A-4 Alabama',
      lastModified: 'TEST_ADMIN on Apr 6, 2022 (5:10 AM)'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Administrator's Console Header */}
      <div className="bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-red-500">Administrator's Console</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 text-white px-6 py-3">
        <div className="flex space-x-8">
          <Link href="/admin-console/organization" className="text-orange-400 hover:text-orange-300 transition-colors">
            Organization
          </Link>
          <Link href="/admin-console/users-roles" className="text-orange-400 hover:text-orange-300 transition-colors">
            Users & Roles
          </Link>
          <Link href="/admin-console/communications" className="text-orange-400 hover:text-orange-300 transition-colors">
            Communications
          </Link>
          <Link href="/admin-console/search-behavior" className="text-orange-400 hover:text-orange-300 transition-colors">
            HMC Search Behavior
          </Link>
          <Link href="/admin-console/hiring-behavior" className="text-orange-400 hover:text-orange-300 transition-colors">
            HMC Hiring Behavior
          </Link>
          <Link href="/admin-console/app-branding" className="text-orange-400 hover:text-orange-300 transition-colors">
            Application Branding
          </Link>
          <Link href="/admin-console/document-management" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">
            Document Management
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Document Management Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/admin-console/document-management/publish-draft-items">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              Publish Draft Items
            </Button>
          </Link>
          <Link href="/admin-console/document-management/publish-history">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              Publish History
            </Button>
          </Link>
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2">
            All Documents
          </Button>
          <Link href="/admin-console/document-management/company-documents-tab">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              Company Documents Tab
            </Button>
          </Link>
          <Link href="/admin-console/document-management/new-hire-packet">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              New Hire Packet
            </Button>
          </Link>
          <Link href="/admin-console/document-management/sales-demo-retail-omega-new-employee-onboarding">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              Sales Demo Retail Omega New Employee Onboarding
            </Button>
          </Link>
          <Link href="/admin-console/document-management/sales-demo-retail-omega-new-manager-onboarding">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              Sales Demo Retail Omega New Manager Onboarding
            </Button>
          </Link>
        </div>

        {/* Self Service Change Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Self Service Change</h2>
          <p className="text-sm text-gray-700 mb-3">
            Create and test your self service changes and then apply them to a corresponding application from a single console.
          </p>
          <Link href="/admin-console/self-service">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
              SS Tools 🔧
            </Button>
          </Link>
        </div>

        {/* All Documents Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-300 pb-2">
            <h1 className="text-2xl font-semibold text-gray-900">All Documents</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              onClick={() => setShowAddNewModal(true)}
            >
              <span className="w-5 h-5 bg-white text-orange-500 rounded-full flex items-center justify-center text-sm font-bold">+</span>
              Add New
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setShowActivateModal(true)}
            >
              Activate
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setShowDeactivateModal(true)}
            >
              Deactivate
            </Button>
          </div>

          {/* Search and Sort Controls */}
          <div className="bg-gray-50 border border-gray-300 p-4 rounded">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Search:</label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                    placeholder=""
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Sort:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alphabetical">Alphabetical</SelectItem>
                      <SelectItem value="Date Last Modified">Date Last Modified</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  >
                    Advanced Options
                  </Button>
                </div>
              </div>
              <div>
                <Link href="/admin-console/document-management">
                  <Button className="bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2">
                    <span>🔙</span>
                    Back to Document Management
                  </Button>
                </Link>
              </div>
            </div>

            {/* Advanced Options Panel */}
            {showAdvancedOptions && (
              <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Document Types:</label>
                    <Select value={documentTypes} onValueChange={setDocumentTypes}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Documents">All Documents</SelectItem>
                        <SelectItem value="Client Documents">Client Documents</SelectItem>
                        <SelectItem value="Cadient Talent Documents">Cadient Talent Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Document Usage:</label>
                    <Select value={documentUsage} onValueChange={setDocumentUsage}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No Usage Filter">No Usage Filter</SelectItem>
                        <SelectItem value="Unused">Unused</SelectItem>
                        <SelectItem value="In Company Documents">In Company Documents</SelectItem>
                        <SelectItem value="In New Hire Packet">In New Hire Packet</SelectItem>
                        <SelectItem value="In Employee Onboarding">In Employee Onboarding</SelectItem>
                        <SelectItem value="In Manager Onboarding">In Manager Onboarding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Publish Status:</label>
                    <Select value={publishStatus} onValueChange={setPublishStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No Status Filter">No Status Filter</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Deactivated">Deactivated</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Documents Table Header */}
          <div className="bg-gray-200 border border-gray-300 p-3 rounded-t">
            <h3 className="font-medium text-gray-800">Document</h3>
          </div>

          {/* Documents List */}
          <div className="border border-gray-300 border-t-0 rounded-b">
            {documents.map((doc, index) => (
              <div key={doc.id} className={`p-4 border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-4">
                  {/* Document Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="flex-1">
                    <Link href={`/admin-console/document-management/document/${doc.id}`}>
                      <h4 className="text-red-500 hover:text-red-600 font-medium cursor-pointer">
                        {doc.name}
                      </h4>
                    </Link>
                    <div className="text-sm text-gray-700 mt-1">
                      <div><strong>Description:</strong></div>
                      <div>{doc.description}</div>
                      <div className="mt-1">Last modified by <strong>{doc.lastModified}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add New Document Modal */}
      {showAddNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 relative">
            <button 
              onClick={() => setShowAddNewModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Document</h2>
            <p className="text-gray-700 mb-6">Enter a name and description for the new document.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Document Name:
                </label>
                <Input
                  value={newDocumentName}
                  onChange={(e) => setNewDocumentName(e.target.value)}
                  className="w-full"
                  placeholder=""
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Description:
                </label>
                <textarea
                  value={newDocumentDescription}
                  onChange={(e) => setNewDocumentDescription(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
                  placeholder=""
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Add New
              </Button>
              <Button 
                variant="outline" 
                className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                onClick={() => setShowAddNewModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Activate Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 relative max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowActivateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Activate Cadient Talent or Deactivated Documents</h2>
            <p className="text-gray-700 mb-6">
              Select Cadient Talent standardized documents or deactivated documents from the following list to add to your all documents list.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cadient Talent Standardized Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {[
                      'A4-MS Alabama',
                      'ARW-4MS',
                      'Behavioral Assessments Job Aid',
                      'Delaware DE-W4',
                      'Delaware W-4 DE MS',
                      'JAF - Voluntary Self-Identification of Disability CC-305',
                      'LS_NY Form',
                      'Maryland Form: MW507M',
                      'Massachusetts Form M-4-MS'
                    ].map((doc) => (
                      <label key={doc} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[
                      'Pennsylvania Act-32 Form',
                      'REV-419 Pennsylvania',
                      'W4 IDAHO',
                      'W-4MN Minnesota',
                      'W4 Montana',
                      'W-4 Nebraska',
                      'W-4 Oklahoma',
                      'W-4 Oregon',
                      'W-4 Rhode Island',
                      'W-4 South Carolina'
                    ].map((doc) => (
                      <label key={doc} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deactivated Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {[
                      'Employment_Application',
                      'Form.Davetest0e3fc4d5-c885-40e0-b930-3cd556abde74.name',
                      'Form.NYFoundling-Form18aa6242a-c450-442b-b8fb-96bd6ab1681a.name',
                      'Form.SamplePasswordPolicy1c279ae7-dbf5-41ca-bacf-d16c7b839adb.name'
                    ].map((doc) => (
                      <label key={doc} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[
                      'Manager Acknowlegement',
                      'Test',
                      'Training A'
                    ].map((doc) => (
                      <label key={doc} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Activate
              </Button>
              <Button 
                variant="outline" 
                className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                onClick={() => setShowActivateModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 relative">
            <button 
              onClick={() => setShowDeactivateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deactivate Documents</h2>
            <p className="text-gray-700 mb-6">
              Select all documents you want removed from your active documents list. These items will be hidden from your All Documents list, but will still be available through the Advanced Options. You can only select from documents not currently used in a Document List. To deactivate a document currently in a list, remove it from the list and publish the updated list first.
            </p>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Unused Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">I-9</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Testdoc</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Deactivate
              </Button>
              <Button 
                variant="outline" 
                className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                onClick={() => setShowDeactivateModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
