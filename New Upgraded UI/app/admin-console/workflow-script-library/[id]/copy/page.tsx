'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Mock data for career sites
const careerSites = [
  {
    id: '1',
    name: 'Sales Demo Retail Omega KTMD NonReq Internal',
    hasActiveScript: false
  },
  {
    id: '2', 
    name: 'Sales Demo Retail Omega Non-Req HireNow',
    hasActiveScript: false
  },
  {
    id: '3',
    name: 'Sales Demo Retail Omega NonReq External',
    hasActiveScript: true
  },
  {
    id: '4',
    name: 'Sales Demo Retail Omega Req External',
    hasActiveScript: true
  },
  {
    id: '5',
    name: 'Sales Demo Retail Omega Req Internal',
    hasActiveScript: true
  }
]

export default function CopyScriptPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedSite, setSelectedSite] = useState('')

  const handleNext = () => {
    if (selectedSite) {
      // Navigate to next step (Enter Details)
      router.push(`/admin-console/workflow-script-library/${params.id}/copy/details`)
    }
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 text-white rounded flex items-center justify-center font-medium">
                1
              </div>
              <span className="font-medium text-orange-600">Choose Site</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-medium">
                2
              </div>
              <span className="text-gray-500">Enter Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-medium">
                3
              </div>
              <span className="text-gray-500">Add Questions</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded flex items-center justify-center font-medium">
                4
              </div>
              <span className="text-gray-500">Review Questions</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Choose Career Site</h1>
            <p className="text-gray-600">
              Please select the site for this Workflow Script. This new Workflow Script will replace any active Workflow Script for the selected site.
            </p>
          </div>

          {/* Career Sites Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                * Corporate Career Sites:
              </label>
              <div className="space-y-2">
                {careerSites.map((site) => (
                  <div key={site.id} className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={site.id}
                      name="careerSite"
                      value={site.id}
                      checked={selectedSite === site.id}
                      onChange={(e) => setSelectedSite(e.target.value)}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <label htmlFor={site.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      {site.name}
                      {site.hasActiveScript && (
                        <span className="text-orange-500 text-xs">⚠️</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Step Button */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-gray-600">
              Next Step: <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Next</span>
            </div>
            <Button 
              onClick={handleNext}
              disabled={!selectedSite}
              className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next →
            </Button>
          </div>

          {/* Warning Message */}
          {careerSites.some(site => site.hasActiveScript && selectedSite === site.id) && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-orange-500 text-sm">⚠️</span>
                <p className="text-sm text-orange-700">
                  Site already has an active HMC Script.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
