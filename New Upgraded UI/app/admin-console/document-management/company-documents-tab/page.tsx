'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export default function CompanyDocumentsTabPage() {
  const [showChangesModal, setShowChangesModal] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [showDraftCreated, setShowDraftCreated] = useState(false)
  const [showDraftDiscarded, setShowDraftDiscarded] = useState(false)
  const [showDiscardModal, setShowDiscardModal] = useState(false)

  // Mock document data
  const availableDocuments = [
    'Company Handbook Acknowledgement',
    'I-9',
    'Testdoc'
  ]

  const companyDocumentsTab = [
    'Employment Application',
    'A-4 Alabama',
    'AR4EC Arkansas',
    'G-4 Georgia',
    'W-4 Illinois'
  ]

  const handleCreateDraft = () => {
    setIsDraft(true)
    setShowDraftCreated(true)
    setShowDraftDiscarded(false)
  }

  const handleDiscardDraft = () => {
    setShowDiscardModal(true)
  }

  const confirmDiscardDraft = () => {
    setIsDraft(false)
    setShowDiscardModal(false)
    setShowDraftCreated(false)
    setShowDraftDiscarded(true)
  }

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
        {/* Success Messages */}
        {showDraftCreated && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <div>
              <strong>Draft Document List Created</strong>
              <div className="text-sm">A draft copy of the published document list has been created.</div>
            </div>
          </div>
        )}

        {showDraftDiscarded && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            <div>
              <strong>Draft Discarded</strong>
              <div className="text-sm">The draft document list has been discarded.</div>
            </div>
          </div>
        )}

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
          <Link href="/admin-console/document-management/all-documents">
            <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white rounded-full">
              All Documents
            </Button>
          </Link>
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2">
            Company Documents Tab
          </Button>
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

        {/* Manage Company Documents List Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-300 pb-2">
            <h1 className="text-2xl font-semibold text-gray-900">Manage Company Documents List</h1>
          </div>

          <p className="text-gray-700">
            Manage documents within your Company Documents list. Add new documents from the list of active documents. Remove documents or reorder the list.
          </p>

          {/* Order Status Section */}
          <div className={`${isDraft ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'} border rounded p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-2">
                  Order Status: {isDraft ? "Draft" : "Published"}
                </h3>
                <p className="text-sm text-gray-700">
                  {isDraft 
                    ? "This is a draft version that you can modify without affecting the currently published version. To discard changes made to this draft, click 'Discard Draft'. To test changes, click 'Test Changes'. To publish this draft, click 'Go To Publishing'."
                    : "This is a published version. To make changes, click on the 'Create Draft' link to create a working copy which can be modified."
                  }
                </p>
                
                {isDraft && (
                  <div className="mt-2 text-sm text-gray-600">
                    📄 Draft created by <strong>CTA_FARIS</strong> on Jan 6, 2022 (1:56 AM)
                  </div>
                )}
                
                <div className="mt-2 text-sm text-gray-600">
                  📄 Published by <strong>Cadient Talent</strong>
                </div>
              </div>
              <button 
                onClick={() => setShowChangesModal(true)}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Show Changes
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              {isDraft ? (
                <>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleDiscardDraft}
                  >
                    Discard Draft
                  </Button>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Go To Publishing
                  </Button>
                  <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                    Test Changes
                  </Button>
                </>
              ) : (
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleCreateDraft}
                >
                  Create Draft Copy
                </Button>
              )}
            </div>
          </div>

          {/* Back to Document Management Button */}
          <div className="flex justify-end">
            <Link href="/admin-console/document-management">
              <Button className="bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2">
                <span>🔙</span>
                Back to Document Management
              </Button>
            </Link>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Available Documents Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Documents</h3>
              <div className="border border-gray-300 rounded">
                {availableDocuments.map((doc, index) => (
                  <div key={doc} className={`p-4 border-b border-gray-200 last:border-b-0 flex items-center gap-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="w-8 h-8 bg-gray-100 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 italic">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Documents Tab Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Documents Tab</h3>
              <div className="border border-gray-300 rounded">
                {companyDocumentsTab.map((doc, index) => (
                  <div key={doc} className={`p-4 border-b border-gray-200 last:border-b-0 flex items-center gap-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="w-8 h-8 bg-gray-100 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Changes Modal */}
      {showChangesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 relative max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowChangesModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">List Version Comparison</h2>
            <div className="border-b-2 border-orange-400 w-full mb-6"></div>
            
            <div className="space-y-6">
              <p className="text-gray-700">
                The two versions of this list are show below. Forms that exist in the version on the left, but are not in the version on the right are shown in{' '}
                <span className="text-orange-300 font-medium">light orange</span>. Forms that have been added to the version on the right, but are not in the version on the left are shown in{' '}
                <span className="text-orange-600 font-medium">dark orange</span>.
              </p>
              
              <div className="bg-gray-100 border border-gray-300 rounded p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">There are no differences between the two lists.</h3>
              </div>
              
              <div className="space-y-4">
                <Button className="bg-gray-800 text-white hover:bg-gray-700">
                  View Full Audit Logs
                </Button>
                
                <div className="bg-gray-100 border border-gray-300 rounded">
                  {/* Audit Log Header */}
                  <div className="bg-gray-800 text-white p-3 grid grid-cols-3 gap-4">
                    <div className="font-medium">Change Date</div>
                    <div className="font-medium">User Name</div>
                    <div className="font-medium">Change Details</div>
                  </div>
                  
                  {/* Audit Log Content */}
                  <div className="p-6 text-center text-gray-600">
                    <p>No audit logs were</p>
                    <p>found for this item.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-start">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setShowChangesModal(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discard Draft Confirmation Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md mx-4 relative border border-gray-700">
            <h2 className="text-lg font-normal text-white mb-4">
              uat-cta.cadienttalent.com says
            </h2>
            
            <div className="space-y-6">
              <div className="text-white">
                Are you sure you want to discard this draft? All changes made since the creation of this draft will be lost.
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
                  onClick={() => setShowDiscardModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-2 rounded-full"
                  onClick={confirmDiscardDraft}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
