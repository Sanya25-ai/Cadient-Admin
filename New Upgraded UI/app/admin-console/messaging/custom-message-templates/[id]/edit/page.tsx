'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Mock message template data
const getMessageTemplateData = (id: string) => {
  const templates = {
    'demonstrate-text-notify': {
      id: 'demonstrate-text-notify',
      name: 'Demonstrate Text Notify',
      description: 'A sample template that has been built to demonstrate the messaging tools inclusion of Text Notify messages, even for manually send messages.',
      category: 'Other',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active'
    },
    'test': {
      id: 'test',
      name: 'test',
      description: '',
      category: 'Other',
      site: 'Sales Demo Retail Omega Non-Req External Seeker Site',
      status: 'Active'
    }
  }
  
  return templates[id as keyof typeof templates] || templates['demonstrate-text-notify']
}

export default function EditMessageTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const template = getMessageTemplateData(params.id)
  
  const [formData, setFormData] = useState({
    name: template.name,
    description: template.description,
    category: template.category,
    status: template.status
  })

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving template:', formData)
    // Navigate back to detail view
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}`)
  }

  const handleCancel = () => {
    // Navigate back to detail view
    router.push(`/admin-console/messaging/custom-message-templates/${params.id}`)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
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

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-black mb-4">Edit Custom Message</h1>
          
          {/* Breadcrumb Navigation */}
          <div className="text-sm text-gray-600 mb-6">
            <Link href="/admin-console/messaging/custom-message-templates" className="text-orange-500 hover:text-orange-600">Custom Message Templates</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/base-product-messages" className="text-orange-500 hover:text-orange-600">Base Product Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/base-product-text-messages" className="text-orange-500 hover:text-orange-600">Base Product Text Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/location-specific-messages" className="text-orange-500 hover:text-orange-600">Location Specific Messages</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/promotion-module" className="text-orange-500 hover:text-orange-600">Promotion Module</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/admin-module-services-user" className="text-orange-500 hover:text-orange-600">Admin Module for Services User</Link>
            <span className="mx-2">|</span>
            <Link href="/admin-console/messaging/hmc-messages" className="text-orange-500 hover:text-orange-600">HMC Messages</Link>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-4">Overview</h2>
          <p className="text-sm text-gray-700 mb-6">
            Please enter the Message Overview information below.
          </p>

          <div className="space-y-6">
            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> Template Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full"
                placeholder="Enter template name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full h-32"
                placeholder="Enter description"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> Category
              </label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="choose-one">choose one...</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Sourcing">Sourcing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Site */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Site:</label>
              <div className="text-sm text-gray-700">{template.site}</div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                <span className="text-red-500">*</span> Status
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="Active"
                    checked={formData.status === 'Active'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="active" className="text-sm text-gray-700">Active</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="Inactive"
                    checked={formData.status === 'Inactive'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="inactive" className="text-sm text-gray-700">Inactive</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            Save
          </Button>
          <Button 
            onClick={handleCancel}
            variant="outline"
            className="bg-red-600 hover:bg-red-700 text-white border-red-600 px-6"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
