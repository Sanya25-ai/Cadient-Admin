'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function CreateOfferTemplatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    status: 'active',
    selectedSites: [] as string[],
    templateContent: '',
    selectedFile: null as File | null,
    uploadedImage: null as File | null
  })
  const [selectedFieldType, setSelectedFieldType] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const careerSites = [
    'Sales Demo Retail Omega KTMD NonReq Internal',
    'Sales Demo Retail Omega NonReq External',
    'Sales Demo Retail Omega Req External',
    'Sales Demo Retail Omega Req Internal'
  ]

  const dynamicFieldOptions = [
    'Additional Fields',
    'Application',
    'Candidate',
    'Job',
    'Links',
    'Location',
    'Offer Fields',
    'Position'
  ]

  const handleBackToLibrary = () => {
    router.push('/admin-console/offer-template-library')
  }

  const handleSelectAll = () => {
    if (formData.selectedSites.length === careerSites.length) {
      setFormData({ ...formData, selectedSites: [] })
    } else {
      setFormData({ ...formData, selectedSites: [...careerSites] })
    }
  }

  const handleSiteToggle = (site: string) => {
    const updatedSites = formData.selectedSites.includes(site)
      ? formData.selectedSites.filter(s => s !== site)
      : [...formData.selectedSites, site]
    
    setFormData({ ...formData, selectedSites: updatedSites })
  }

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving template:', formData)
    router.push('/admin-console/offer-template-library')
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      // Validate file type
      if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
        alert('File must be PNG, JPG, or GIF format')
        return
      }
      setFormData({ ...formData, selectedFile: file })
    }
  }

  const handleImageUpload = () => {
    if (formData.selectedFile) {
      setFormData({ ...formData, uploadedImage: formData.selectedFile, selectedFile: null })
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleInsertDynamicField = () => {
    if (selectedFieldType) {
      const placeholder = `[[${selectedFieldType}]]`
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const currentContent = formData.templateContent
        const newContent = currentContent.substring(0, start) + placeholder + currentContent.substring(end)
        setFormData({ ...formData, templateContent: newContent })
        
        // Set cursor position after the inserted placeholder
        setTimeout(() => {
          textarea.focus()
          textarea.setSelectionRange(start + placeholder.length, start + placeholder.length)
        }, 0)
      }
      setSelectedFieldType('')
    }
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Create Offer Template</h1>
            <Button 
              onClick={handleBackToLibrary}
              variant="outline"
              className="flex items-center gap-2"
            >
              ← Back to Offer Template Library
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * Name:
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter template name..."
                className="w-full"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                * Status:
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="status-active"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="status-active" className="text-sm text-gray-700">Active</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="status-inactive"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <label htmlFor="status-inactive" className="text-sm text-gray-700">Inactive</label>
                </div>
              </div>
            </div>

            {/* Choose Career Sites */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Choose Career Sites</h3>
              <p className="text-sm text-gray-700 mb-4">
                Please select the site(s) for this Offer Template. This new Offer Template will be displayed at the time of preparing Offer Letters for job postings from the selected site(s).
              </p>
              
              <Button
                onClick={handleSelectAll}
                className="bg-orange-500 hover:bg-orange-600 text-white mb-4 flex items-center gap-2"
              >
                ✓ Select All
              </Button>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  * Corporate Career Sites:
                </label>
                {careerSites.map((site, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`site-${index}`}
                      checked={formData.selectedSites.includes(site)}
                      onChange={() => handleSiteToggle(site)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor={`site-${index}`} className="text-sm text-gray-700">
                      {site}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Branding Info */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Branding</h3>
            <p className="text-sm text-gray-700 mb-4">
              You can incorporate the Company Branding logo into the header section of Offer letter.
            </p>
            <p className="text-sm text-gray-700 mb-4">
              The logo is placed in an area that uses a white background. The logo must meet these requirements:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>• Image dimensions: Up to 350 x 70 pixels</li>
              <li>• File format: PNG, JPG, or GIF</li>
              <li>• File size: Maximum 2MB</li>
              <li>• Background: Transparent or white</li>
            </ul>
            
            {/* Upload Image Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">
                Upload Image:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/png,image/jpeg,image/gif"
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="text-sm"
                >
                  Choose File
                </Button>
                <span className="text-sm text-gray-600">
                  {formData.selectedFile ? formData.selectedFile.name : 'No file chosen'}
                </span>
              </div>
              {formData.selectedFile && (
                <Button
                  onClick={handleImageUpload}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                >
                  Upload Image
                </Button>
              )}
              {formData.uploadedImage && (
                <div className="space-y-2">
                  <p className="text-sm text-green-600">✓ Image uploaded: {formData.uploadedImage.name}</p>
                  <Button
                    onClick={() => setFormData({ ...formData, uploadedImage: null })}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Template Content and Insert Dynamic Fields */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Content - Left Side */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Template Content:
            </label>
            <Textarea
              ref={textareaRef}
              value={formData.templateContent}
              onChange={(e) => setFormData({ ...formData, templateContent: e.target.value })}
              placeholder="Enter your offer template content here. Use placeholders like [[Candidate: First Name]], [[Job Title]], etc."
              className="w-full h-64 resize-none font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Use placeholders in double brackets, e.g., [[Candidate: First Name]], [[Job Title]], [[Start Date]]
            </p>
          </div>

          {/* Insert Dynamic Fields - Right Side */}
          <div className="bg-gray-800 text-white p-4 rounded-lg h-fit">
            <h3 className="font-medium text-white mb-3">Insert Dynamic Fields</h3>
            <p className="text-sm text-gray-300 mb-4">
              Select the specific fields that you would like to add to this offer letter.
            </p>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white">
                Choose Field Type:
              </label>
              <select 
                className="w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                value={selectedFieldType}
                onChange={(e) => setSelectedFieldType(e.target.value)}
              >
                <option value="">choose one...</option>
                {dynamicFieldOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              
              <Button
                type="button"
                onClick={handleInsertDynamicField}
                disabled={!selectedFieldType}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Insert
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t">
          <Button 
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save Template
          </Button>
          <Button 
            onClick={handleBackToLibrary}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
