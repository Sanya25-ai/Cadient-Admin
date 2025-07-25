'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EditOfferTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: 'Simplified Offer Letter',
    status: 'active',
    selectedSites: [
      'Sales Demo Retail Omega KTMD NonReq Internal',
      'Sales Demo Retail Omega Non-Req HireNow',
      'Sales Demo Retail Omega NonReq External',
      'Sales Demo Retail Omega Req External',
      'Sales Demo Retail Omega Req Internal'
    ],
    templateContent: `[Offer: Offer Detail]

[Candidate: First Name] [Candidate: Last Name]
[Candidate: Address 1]
[Candidate: City] [Candidate: State] [Candidate: Zip/Postal Code]

Dear [Candidate: First Name],

I am pleased to offer you the position of [Job Title] for Industries. This position will have an hourly pay rate of $[Offer: Rewards To]. In this position, you will report to [Offer: Reports To].

Your start date is scheduled for [Offer: Start Date].

We are very enthusiastic about your addition to Industries and believe this will be a start of a remarkable future for you.

Sincerely,

[Offer: Reports To]`,
    signatureRequired: 'yes',
    uploadedImage: null
  })

  const [selectedFieldType, setSelectedFieldType] = useState('')

  const careerSites = [
    'Sales Demo Retail Omega KTMD NonReq Internal',
    'Sales Demo Retail Omega Non-Req HireNow', 
    'Sales Demo Retail Omega NonReq External',
    'Sales Demo Retail Omega Req External',
    'Sales Demo Retail Omega Req Internal'
  ]

  const dynamicFieldTypes = [
    'Additional Fields',
    'Application',
    'Candidate', 
    'Job',
    'Links',
    'Location',
    'Offer Fields',
    'Position'
  ]

  const handleSave = () => {
    console.log('Saving template:', formData)
    router.push('/admin-console/offer-template-library')
  }

  const handleCancel = () => {
    router.push('/admin-console/offer-template-library')
  }

  const handleSiteToggle = (site: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSites: prev.selectedSites.includes(site)
        ? prev.selectedSites.filter(s => s !== site)
        : [...prev.selectedSites, site]
    }))
  }

  const handleInsertField = () => {
    if (selectedFieldType) {
      // Insert field logic would go here
      console.log('Inserting field:', selectedFieldType)
      setSelectedFieldType('')
    }
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Offer Template</h1>
          <Button 
            onClick={() => router.push('/admin-console/offer-template-library')}
            variant="outline"
            className="flex items-center gap-2"
          >
            ← Back to Offer Template Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Name:
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Status:
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="active" className="text-sm text-gray-700">Active</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="inactive" className="text-sm text-gray-700">Inactive</label>
                </div>
              </div>
            </div>

            {/* Choose Career Sites */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Choose Career Sites</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please select the site(s) for this Offer Template. This new Offer Template will be displayed at the time of preparing Offer Letters for job postings from the selected site(s).
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white mb-4">
                Select All
              </Button>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  * Corporate Career Sites:
                </label>
                <div className="space-y-2">
                  {careerSites.map((site) => (
                    <div key={site} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={site}
                        checked={formData.selectedSites.includes(site)}
                        onChange={() => handleSiteToggle(site)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <label htmlFor={site} className="text-sm text-gray-700">
                        {site}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Content */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Template Content:
              </label>
              <div className="border border-gray-300 rounded-lg">
                {/* Toolbar */}
                <div className="border-b border-gray-300 p-2 bg-gray-50 flex flex-wrap gap-1">
                  <Button size="sm" variant="outline" className="text-xs">B</Button>
                  <Button size="sm" variant="outline" className="text-xs">I</Button>
                  <Button size="sm" variant="outline" className="text-xs">U</Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button size="sm" variant="outline" className="text-xs">📎</Button>
                  <Button size="sm" variant="outline" className="text-xs">🔗</Button>
                  <Button size="sm" variant="outline" className="text-xs">📷</Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button size="sm" variant="outline" className="text-xs">≡</Button>
                  <Button size="sm" variant="outline" className="text-xs">⋮</Button>
                </div>
                <Textarea
                  value={formData.templateContent}
                  onChange={(e) => setFormData({ ...formData, templateContent: e.target.value })}
                  className="w-full h-64 border-0 resize-none rounded-t-none"
                />
              </div>
            </div>

            {/* Signature Section */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                * Signature section required? (Name, Signature and Date)
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="sig-yes"
                    name="signature"
                    value="yes"
                    checked={formData.signatureRequired === 'yes'}
                    onChange={(e) => setFormData({ ...formData, signatureRequired: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="sig-yes" className="text-sm text-gray-700">Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="sig-no"
                    name="signature"
                    value="no"
                    checked={formData.signatureRequired === 'no'}
                    onChange={(e) => setFormData({ ...formData, signatureRequired: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="sig-no" className="text-sm text-gray-700">No</label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-6">
              <Button 
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Branding */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Branding</h3>
              <p className="text-sm text-gray-600 mb-4">
                You can incorporate the Company Branding logo into the header section of Offer letter.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                The logo is placed in an area that uses a white background. The logo must meet these requirements:
              </p>
              <ul className="text-sm text-gray-600 mb-4 list-disc list-inside space-y-1">
                <li>Image dimensions: Up to 500 x 70 pixels</li>
                <li>Background: A white or transparent background must be used to merge with the Offer letter header.</li>
                <li>File size: Less than 30K</li>
              </ul>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Upload Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>
              
              <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                Upload Image
              </Button>
            </div>

            {/* Insert Dynamic Fields */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">Insert Dynamic Fields</h3>
              <p className="text-sm text-gray-400 mb-4">
                Select the specific fields that you would like to add to this offer letter.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Choose Field Type:
                </label>
                <Select value={selectedFieldType} onValueChange={setSelectedFieldType}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="choose one..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dynamicFieldTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleInsertField}
                disabled={!selectedFieldType}
                className="bg-orange-500 hover:bg-orange-600 text-white w-full disabled:bg-gray-600"
              >
                Insert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
