'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditWorkflowAssociationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedHiringProcess, setSelectedHiringProcess] = useState('HireNow')
  const [selectedHiringWorkflow, setSelectedHiringWorkflow] = useState('Background Check')
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState('Initiate Background Check')
  const [addedWorkflowSteps, setAddedWorkflowSteps] = useState<Array<{id: string, process: string, workflow: string, step: string}>>([])

  const hiringProcesses = [
    'HireNow',
    'Hourly with EVerify and Offer Letter',
    'Hourly with Secondary Assessments',
    'Hourly with SparkHire Video Interview',
    'Hybrid OFCCP',
    'Hybrid OFCCP with Video Interview',
    'Req with EVerify and Offer Letter',
    'Req with Offer Letter',
    'Req with Offer Letter_Hourly',
    'Simplified Hiring Process with Onboarding',
    'Staff Hourly'
  ]

  const hiringWorkflows = [
    'Background Check',
    'Conditional Offer Letter',
    'Onboarding'
  ]

  const workflowSteps = [
    'Initiate Background Check',
    'Background Check Pending',
    'Pass',
    'Fail',
    'HR Review'
  ]

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving workflow association:', {
      hiringProcess: selectedHiringProcess,
      hiringWorkflow: selectedHiringWorkflow,
      workflowStep: selectedWorkflowStep,
      addedSteps: addedWorkflowSteps
    })
    // Navigate to the detail page with success parameter
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}?success=workflow`)
  }

  const handleCancel = () => {
    router.back()
  }

  const handleAddWorkflowStep = () => {
    const newStep = {
      id: Date.now().toString(),
      process: selectedHiringProcess,
      workflow: selectedHiringWorkflow,
      step: selectedWorkflowStep
    }
    setAddedWorkflowSteps(prev => [...prev, newStep])
  }

  const handleDeleteWorkflowStep = (stepId: string) => {
    setAddedWorkflowSteps(prev => prev.filter(step => step.id !== stepId))
  }

  return (
    <div className="flex-1 bg-white">
      <div className="w-full p-8 pt-6">
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

        {/* Page Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📧</span>
            <h1 className="text-2xl font-semibold text-gray-900">Demonstrate Text Notify</h1>
          </div>
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            <span className="text-orange-500">Custom Message Templates</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Base Product Messages</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Base Product Text Messages</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Location Specific Messages</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Promotion Module</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">Admin Module for Services User</span>
            <span className="mx-2">|</span>
            <span className="text-orange-500">HMC Messages</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Attach Message to Workflow Step</h2>
          
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-4">
              Select a hiring process, hiring workflow and a specific workflow step where you want to associate the{' '}
              <strong>Demonstrate Text Notify</strong> message. Once you have made the association, the message will automatically be sent{' '}
              <strong>as soon as the applicant reaches that specific step</strong>.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            {/* Hiring Process */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hiring process:
              </label>
              <div className="relative">
                <select
                  value={selectedHiringProcess}
                  onChange={(e) => setSelectedHiringProcess(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {hiringProcesses.map((process) => (
                    <option key={process} value={process}>
                      {process}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hiring Workflow */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hiring Workflow:
              </label>
              <div className="relative">
                <select
                  value={selectedHiringWorkflow}
                  onChange={(e) => setSelectedHiringWorkflow(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {hiringWorkflows.map((workflow) => (
                    <option key={workflow} value={workflow}>
                      {workflow}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Workflow Step */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workflow Step:
              </label>
              <div className="relative">
                <select
                  value={selectedWorkflowStep}
                  onChange={(e) => setSelectedWorkflowStep(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {workflowSteps.map((step) => (
                    <option key={step} value={step}>
                      {step}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add Workflow Step Button */}
          <div className="mb-8">
            <Button
              onClick={handleAddWorkflowStep}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
            >
              <span className="text-lg">⚠️</span>
              Add Workflow Step
            </Button>
          </div>

          {/* Added Workflow Steps */}
          {addedWorkflowSteps.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">HireNow</h3>
              {addedWorkflowSteps.map((step) => (
                <div key={step.id} className="bg-yellow-100 border border-yellow-300 rounded p-4 mb-4 flex items-center justify-between">
                  <div className="text-sm text-gray-800">
                    {step.workflow} - {step.step}
                  </div>
                  <button
                    onClick={() => handleDeleteWorkflowStep(step.id)}
                    className="text-gray-600 hover:text-red-600 p-1"
                    title="Delete workflow step"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 px-8"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
