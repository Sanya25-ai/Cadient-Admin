'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CreatePrescreenerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Determine if this is for job-specific prescreener
  const isJobSpecific = searchParams?.get('type') === 'job-specific'
  
  // Start at step 2 for job-specific prescreeners (skip site selection)
  const [currentStep, setCurrentStep] = useState(isJobSpecific ? 2 : 1)
  const [selectedSites, setSelectedSites] = useState<string[]>([])
  const [prescreenerDetails, setPrescreenerDetails] = useState({
    name: '',
    dataChannel: '',
    introductoryText: '',
    showOptOut: 'yes'
  })
  const [showQuestionTextModal, setShowQuestionTextModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [questionTextSearch, setQuestionTextSearch] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showAddNewQuestion, setShowAddNewQuestion] = useState(false)
  const [newQuestionData, setNewQuestionData] = useState({
    question: '',
    popupTooltip: '',
    additionalNotes: '',
    zoomApplicable: 'no',
    category: '',
    makeEditable: 'no',
    questionType: '',
    sensitiveData: 'no',
    questionContext: ''
  })

  const careerSites = [
    { id: 'ktmd-internal', name: 'Sales Demo Retail Omega KTMD NonReq Internal', hasActive: true },
    { id: 'hirenow', name: 'Sales Demo Retail Omega Non-Req HireNow', hasActive: true },
    { id: 'nonreq-external', name: 'Sales Demo Retail Omega NonReq External', hasActive: true },
    { id: 'req-external', name: 'Sales Demo Retail Omega Req External', hasActive: true },
    { id: 'req-internal', name: 'Sales Demo Retail Omega Req Internal', hasActive: false }
  ]

  const handleSiteToggle = (siteId: string) => {
    setSelectedSites(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    )
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/admin-console/prescreener')
    }
  }

  const handleAddQuestions = () => {
    setShowConfirmation(true)
    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const steps = [
    { number: 1, title: 'Choose Site', active: currentStep === 1 },
    { number: 2, title: 'Enter Details', active: currentStep === 2 },
    { number: 3, title: 'Add Questions', active: currentStep === 3 },
    { number: 4, title: 'Review Questions', active: currentStep === 4 },
    { number: 5, title: 'Scoring', active: currentStep === 5 }
  ]

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {(currentStep === 4 || currentStep === 5) && prescreenerDetails.name 
              ? prescreenerDetails.name 
              : isJobSpecific 
                ? "Create a New Job Specific Prescreener"
                : "Create a New General Qualifying Prescreener"
            }
          </h1>
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

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step.active 
                    ? 'bg-orange-500 text-white' 
                    : step.number < currentStep 
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.number < currentStep ? '✓' : step.number}
                </div>
                <span className={`ml-2 text-sm ${
                  step.active ? 'text-orange-600 font-medium' : 'text-gray-600'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-px bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Career Site</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-4">
                General qualifying prescreening questions will be asked of all candidates who apply to a posting from a specific site.
              </p>
              <p className="text-sm text-gray-700 mb-6">
                Please select the site for which you would like to use this prescreener. Your new prescreener will replace the active General Qualifying prescreeners for any sites that already has an active General Qualifying prescreener.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">* Corporate Career Sites:</h3>
              <div className="space-y-3">
                {careerSites.map((site) => (
                  <div key={site.id} className="flex items-center">
                    <input
                      type="radio"
                      id={site.id}
                      name="careerSite"
                      checked={selectedSites.includes(site.id)}
                      onChange={() => handleSiteToggle(site.id)}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <label htmlFor={site.id} className="ml-3 text-sm text-gray-700 flex items-center">
                      {site.name}
                      {site.hasActive && (
                        <span className="ml-2 text-orange-500">⚠️</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-orange-500 mr-2">⚠️</span>
                <span>- Site already has an active General Qualifying prescreener.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Next Step:</span>
              <Button 
                onClick={handleNext}
                disabled={selectedSites.length === 0}
                className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Prescreener Details</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-6">
                Name your prescreener and add any introductory text you would like the candidate to see. Note: The prescreener name is used for internal purposes only and will never be seen by the candidate.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl">
              {/* Prescreener Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  * Prescreener Name: <span className="text-gray-500">(Max. 100 characters)</span>
                </label>
                <input
                  type="text"
                  value={prescreenerDetails.name}
                  onChange={(e) => setPrescreenerDetails({...prescreenerDetails, name: e.target.value})}
                  maxLength={100}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Data Channel */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  * Data Channel:
                </label>
                <select
                  value={prescreenerDetails.dataChannel}
                  onChange={(e) => setPrescreenerDetails({...prescreenerDetails, dataChannel: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">choose one...</option>
                  <option value="career-insite">Career Insite</option>
                  <option value="telapp">TelApp</option>
                  <option value="kiosk">Kiosk</option>
                  <option value="import">Import</option>
                  <option value="manually-entered">Manually Entered</option>
                  <option value="prospect-import">Prospect Import</option>
                  <option value="ziprecruiter-import">ZipRecruiter Import</option>
                  <option value="indeed-import">Indeed Import</option>
                  <option value="monster-import">Monster Import</option>
                </select>
              </div>

              {/* Introductory Text */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Introductory Text: <span className="text-gray-500">(Max. 1,000 characters)</span>
                </label>
                <textarea
                  value={prescreenerDetails.introductoryText}
                  onChange={(e) => setPrescreenerDetails({...prescreenerDetails, introductoryText: e.target.value})}
                  maxLength={1000}
                  rows={6}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Opt-out Option */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  * Show an opt-out option for voluntary Yes/No questions: <span className="text-gray-500">(Opt-out option is - "I do not wish to provide this information")</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="opt-out-yes"
                      name="showOptOut"
                      value="yes"
                      checked={prescreenerDetails.showOptOut === 'yes'}
                      onChange={(e) => setPrescreenerDetails({...prescreenerDetails, showOptOut: e.target.value})}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <label htmlFor="opt-out-yes" className="ml-3 text-sm text-gray-700">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="opt-out-no"
                      name="showOptOut"
                      value="no"
                      checked={prescreenerDetails.showOptOut === 'no'}
                      onChange={(e) => setPrescreenerDetails({...prescreenerDetails, showOptOut: e.target.value})}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <label htmlFor="opt-out-no" className="ml-3 text-sm text-gray-700">No</label>
                  </div>
                </div>
              </div>

              {/* Next Step Buttons */}
              <div className="pt-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Next Step:</span>
                </div>
                <div className="flex gap-3 mb-6">
                  <Button 
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                  >
                    <span>📝</span>
                    Add Existing Questions
                  </Button>
                  <Button 
                    onClick={() => setShowAddNewQuestion(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                  >
                    <span>➕</span>
                    Add New Questions
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    className="border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span>⬅️</span>
                    Back
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span>💾</span>
                    Save and Finish Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Add Existing Questions */}
        {currentStep === 3 && (
          <div>
            {/* Confirmation Banner */}
            {showConfirmation && (
              <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Confirmation</h3>
                  <p className="text-sm text-green-700">
                    You have successfully added the selected questions to <strong>prescreener</strong>. You can add more questions, or click "Review Questions" to return to the prescreener.
                  </p>
                </div>
              </div>
            )}

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Existing Questions</h2>
            
            <div className="mb-6">
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
                  onClick={() => setShowQuestionTextModal(true)}
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

            {/* Add Questions Button */}
            <div className="mb-4">
              <Button 
                onClick={handleAddQuestions}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                ➕ Add Questions
              </Button>
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
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-12">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
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
                  {[
                    { id: '1', question: 'Do you have a valid driver\'s license?', type: 'Yes/No', key: '1657303', category: 'Driving History', modified: '4/5/2025' },
                    { id: '2', question: 'What is your age range?', type: 'Multiple Choice', key: '1657302', category: 'Job Specific Questions', modified: '11/23/2022' },
                    { id: '3', question: 'Are you fluent in reading, writing, and speaking English?', type: 'Yes/No', key: '1657301', category: 'Job Specific Questions', modified: '11/23/2022' },
                    { id: '4', question: 'Do you have six months of experience in a retail environment?', type: 'Yes/No', key: '1657300', category: 'Job Specific Questions', modified: '11/23/2022' },
                    { id: '5', question: 'Are you willing to work flexible schedules, including evening and weekend hours?', type: 'Yes/No', key: '1657299', category: 'Job Specific Questions', modified: '11/23/2022' }
                  ].map((question) => (
                    <tr key={question.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-md">
                        {question.question}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {question.type}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {question.key}
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

            {/* Bottom Add Questions Button */}
            <div className="mb-6">
              <Button 
                onClick={handleAddQuestions}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                ➕ Add Questions
              </Button>
            </div>

            {/* Next Step */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-700">Next Step:</span>
              <Button 
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Review Questions
              </Button>
            </div>

            {/* Back Button */}
            <div>
              <Button 
                onClick={handleBack}
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50"
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review Questions */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Questions</h2>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700">
                The questions displayed below are currently attached to this prescreener. Please review these questions and make any necessary modifications here.
              </p>
            </div>

            {/* Add Questions Buttons */}
            <div className="flex gap-3 mb-6">
              <Button 
                onClick={() => setCurrentStep(3)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                <span>📝</span>
                Add Existing Questions
              </Button>
              <Button 
                onClick={() => setShowAddNewQuestion(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              >
                <span>➕</span>
                Add New Questions
              </Button>
            </div>

            {/* Next Step */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-700">Next Step:</span>
              <Button 
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Review Scoring
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleBack}
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>⬅️</span>
                Back
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>💾</span>
                Save and Finish Later
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Scoring */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prescreener Scoring</h2>
            
            <div className="mb-8">
              <p className="text-sm text-gray-700">
                Below, you can assign knockout values to specific responses.
              </p>
            </div>

            {/* Final Step */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-700">Final Step:</span>
              <Button 
                onClick={() => {
                  console.log('Creating prescreener...')
                  router.push('/admin-console/prescreener')
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Create Prescreener
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleBack}
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>⬅️</span>
                Back
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <span>💾</span>
                Save and Finish Later
              </Button>
            </div>
          </div>
        )}

        {/* Filter Modals */}
        
        {/* Question Text Search Modal */}
        {showQuestionTextModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">By Question Text:</h3>
                <button 
                  onClick={() => setShowQuestionTextModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={questionTextSearch}
                  onChange={(e) => setQuestionTextSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter question text..."
                />
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => {
                    console.log('Searching for:', questionTextSearch)
                    setShowQuestionTextModal(false)
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
                <button className="w-full text-left px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500">
                  Active
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
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
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
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
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
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
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
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
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
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
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
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
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
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    WOTC
                  </button>
                  <button className="px-4 py-2 border border-orange-300 rounded-full text-orange-600 hover:bg-orange-50">
                    Work History
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add New Question Form */}
        {showAddNewQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Enter Question Details</h2>
                  <button 
                    onClick={() => setShowAddNewQuestion(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    Please enter the following information in order to add your question.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Question Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      * Question:
                    </label>
                    <textarea
                      value={newQuestionData.question}
                      onChange={(e) => setNewQuestionData({...newQuestionData, question: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Popup Tooltip */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Popup tooltip text for this question:
                    </label>
                    <textarea
                      value={newQuestionData.popupTooltip}
                      onChange={(e) => setNewQuestionData({...newQuestionData, popupTooltip: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Additional notes for this question:
                    </label>
                    <textarea
                      value={newQuestionData.additionalNotes}
                      onChange={(e) => setNewQuestionData({...newQuestionData, additionalNotes: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Zoom Applicable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      * Is zoom applicable for the image in this question?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="zoom-yes"
                          name="zoomApplicable"
                          value="yes"
                          checked={newQuestionData.zoomApplicable === 'yes'}
                          onChange={(e) => setNewQuestionData({...newQuestionData, zoomApplicable: e.target.value})}
                          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <label htmlFor="zoom-yes" className="ml-3 text-sm text-gray-700">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="zoom-no"
                          name="zoomApplicable"
                          value="no"
                          checked={newQuestionData.zoomApplicable === 'no'}
                          onChange={(e) => setNewQuestionData({...newQuestionData, zoomApplicable: e.target.value})}
                          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <label htmlFor="zoom-no" className="ml-3 text-sm text-gray-700">No</label>
                      </div>
                    </div>
                  </div>

                  {/* Object Mapping */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Object Mapping:
                    </label>
                    <div className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 min-h-[100px]">
                      {/* Object mapping content would go here */}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      * Category:
                    </label>
                    <select
                      value={newQuestionData.category}
                      onChange={(e) => setNewQuestionData({...newQuestionData, category: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">choose one...</option>
                      <option value="accounting">Accounting</option>
                      <option value="at-will">At Will</option>
                      <option value="availability">Availability</option>
                      <option value="criminal-history">Criminal History</option>
                      <option value="driving-history">Driving History</option>
                      <option value="drug">Drug</option>
                      <option value="eeo-questions">EEO Questions</option>
                      <option value="education">Education</option>
                      <option value="eligibility">Eligibility</option>
                      <option value="fcra">FCRA</option>
                      <option value="finance">Finance</option>
                      <option value="general">General</option>
                      <option value="government">Government</option>
                      <option value="hide-in-hmc">Hide In HMC</option>
                      <option value="information-technology">Information Technology</option>
                      <option value="job-specific-questions">Job Specific Questions</option>
                      <option value="other">Other</option>
                      <option value="personal-info">PersonalInfo</option>
                      <option value="terms-and-conditions">Terms and Conditions</option>
                      <option value="wotc">WOTC</option>
                      <option value="work-history">Work History</option>
                    </select>
                  </div>

                  {/* Make Candidate Responses Editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      * Make Candidate Responses to This Question Editable by Permission in the HMC?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="editable-yes"
                          name="makeEditable"
                          value="yes"
                          checked={newQuestionData.makeEditable === 'yes'}
                          onChange={(e) => setNewQuestionData({...newQuestionData, makeEditable: e.target.value})}
                          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <label htmlFor="editable-yes" className="ml-3 text-sm text-gray-700">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="editable-no"
                          name="makeEditable"
                          value="no"
                          checked={newQuestionData.makeEditable === 'no'}
                          onChange={(e) => setNewQuestionData({...newQuestionData, makeEditable: e.target.value})}
                          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <label htmlFor="editable-no" className="ml-3 text-sm text-gray-700">No</label>
                      </div>
                    </div>
                  </div>

                  {/* Question Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      * Question Type:
                    </label>
                    <select
                      value={newQuestionData.questionType}
                      onChange={(e) => setNewQuestionData({...newQuestionData, questionType: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">choose one...</option>
                      <option value="date">Date</option>
                      <option value="formatted-input">Formatted Input</option>
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="numeric">Numeric</option>
                      <option value="page-break">Page Break (System)</option>
                      <option value="statement">Statement</option>
                      <option value="text">Text</option>
                      <option value="time">Time</option>
                      <option value="yes-no">Yes/No</option>
                    </select>
                  </div>

                  {/* Sensitive Data Question */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      * Is Sensitive Data Question?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="sensitive-yes"
                          name="sensitiveData"
                          value="yes"
                          checked={newQuestionData.sensitiveData === 'yes'}
                          onChange={(e) => setNewQuestionData({...newQuestionData, sensitiveData: e.target.value})}
                          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <label htmlFor="sensitive-yes" className="ml-3 text-sm text-gray-700">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="sensitive-no"
                          name="sensitiveData"
                          value="no"
                          checked={newQuestionData.sensitiveData === 'no'}
                          onChange={(e) => setNewQuestionData({...newQuestionData, sensitiveData: e.target.value})}
                          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                        />
                        <label htmlFor="sensitive-no" className="ml-3 text-sm text-gray-700">No</label>
                      </div>
                    </div>
                  </div>

                  {/* Question Context */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Question Context:
                    </label>
                    <select
                      value={newQuestionData.questionContext}
                      onChange={(e) => setNewQuestionData({...newQuestionData, questionContext: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">choose one...</option>
                      <option value="date-of-birth">Date of Birth</option>
                      <option value="license-number">License Number</option>
                      <option value="ssn-sin-nin">SSN/SIN/NIN</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-6">
                    <Button 
                      onClick={() => {
                        console.log('Adding question:', newQuestionData)
                        setShowAddNewQuestion(false)
                        setShowConfirmation(true)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Add Question
                    </Button>
                  </div>

                  {/* Next Step */}
                  <div className="flex items-center gap-3 pt-4">
                    <span className="text-sm font-medium text-gray-700">Next Step:</span>
                    <Button 
                      onClick={() => {
                        setShowAddNewQuestion(false)
                        setCurrentStep(4)
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Review Questions
                    </Button>
                  </div>

                  {/* Back Button */}
                  <div className="pt-4">
                    <Button 
                      onClick={() => setShowAddNewQuestion(false)}
                      variant="outline"
                      className="border-gray-600 text-gray-600 hover:bg-gray-50"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
