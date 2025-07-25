'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

// Dropdown options
const sourceSiteOptions = [
  'Sales Demo BP Retail Canada Non-Req External Seeker',
  'Sales Demo BP Retail Canada Non-Req Internal Seeker',
  'Sales Demo BP Retail Canada Req External Seeker',
  'Sales Demo BP Retail Canada Req Internal Seeker',
  'Sales Demo RP Retail Corporate Non-Req External Seeker',
  'Sales Demo Retail Omega Non-Req External Seeker Site',
  'Sales Demo Retail Omega Req External Seeker Site',
  'Sales Demo Retail Omega Non-Req Internal Seeker Site',
  'Sales Demo Retail Omega Req Internal Seeker Site'
]

const targetSiteOptions = [
  'A&W Non-Req External Seeker Site',
  'Adams County Memorial Hospital Email Additional Info',
  'Adams County Memorial Hospital Employee Onboarding',
  'Adams County Memorial Hospital HMC',
  'Adams County Memorial Hospital Manager Onboarding',
  'AMV Non-Req External Seeker Site',
  'Sales Demo BP Retail Canada Non-Req External Seeker',
  'Sales Demo BP Retail Canada Non-Req Internal Seeker',
  'Sales Demo BP Retail Canada Req External Seeker',
  'Sales Demo BP Retail Canada Req Internal Seeker'
]

const baseProductMessageOptions = [
  'Applicant Interview Cancel Email - Sales Demo RP Retail Req Life and Tools',
  'Application Confirmation Email - Sales Demo RP Retail Non-Req External Seeker',
  'Application Received Email - Sales Demo RP Retail Req External Seeker',
  'Interview Invitation Email - Sales Demo RP Retail Req Life and Tools',
  'Rejection Email - Sales Demo RP Retail Non-Req External Seeker',
  'Welcome Email - Sales Demo RP Retail Req External Seeker'
]

const locationSpecificMessageOptions = [
  'Psychometric Application/Confirmation - Sales Demo RP Retail Non-Req External Seeker Site',
  'Location Details Page - Sales Demo RP Retail Non-Req External Seeker Site',
  'Application Confirmation Page - Sales Demo RP Retail Non-Req External Seeker Site',
  'Knockout Message: Failed Prescreener - Sales Demo RP Retail Non-Req External Seeker Site',
  'Knockout Message: Not Eligible for Re-Hire - Sales Demo RP Retail Non-Req External Seeker Site'
]

const baseProductTextMessageOptions = [
  'Text Confirmation - Sales Demo RP Retail Non-Req External Seeker',
  'Text Interview Reminder - Sales Demo RP Retail Req External Seeker',
  'Text Application Received - Sales Demo RP Retail Non-Req External Seeker',
  'Text Welcome Message - Sales Demo RP Retail Req External Seeker'
]

const copyModules = [
  {
    id: 'copy-base-product-messages',
    title: 'Copy Base Product Messages',
    description: 'Copy over Base Product Messages from any one of the OSI Site to a target Site. Simply choose Source Site. Target Site and click on "Copy Base Product Messages" button.',
    sourceLabel: 'Source Site:',
    sourceValue: 'Sales Demo RP Retail Corporate Non-Req External Seeker',
    targetLabel: 'Target Site:',
    targetValue: 'AMV Non-Req External Seeker Site',
    buttonText: 'Copy Base Product Messages',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'copy-application-page-lsms',
    title: 'Copy Application Page LSMs',
    description: 'Copy over Application Page LSMs from any one of the OSI Site to a target Site. Simply choose Source Site. Target Site and click on "Copy LSM" button.',
    sourceLabel: 'Source Site:',
    sourceValue: 'Sales Demo RP Retail Corporate Non-Req External Seeker',
    targetLabel: 'Target Site:',
    targetValue: 'AMV Non-Req External Seeker Site',
    buttonText: 'Copy LSM',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'copy-base-product-message',
    title: 'Copy Base Product Message',
    description: 'Copy over a single Base Product Message from a list of OSI Base Product Messages to a target Site. Simply choose Source Site. Target Site and click on "Copy Base Product Message" button.',
    sourceLabel: 'Base Product Messages:',
    sourceValue: 'Applicant Interview Cancel Email - Sales Demo RP Retail Req Life and Tools',
    targetLabel: 'Target Site:',
    targetValue: 'AMV Non-Req External Seeker Site',
    buttonText: 'Copy Base Product Message',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'copy-base-product-text-messages',
    title: 'Copy Base Product Text Messages',
    description: 'Copy over Base Product Text Messages from any one of the OSI Sites to a target Site. Simply choose Source Site. Target Site and click on "Copy Base Product Text" button.',
    sourceLabel: 'Source Site:',
    sourceValue: '',
    targetLabel: 'Target Site:',
    targetValue: 'AMV Non-Req External Seeker Site',
    buttonText: 'Copy Base Product Text Messages',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'copy-application-page-lsm',
    title: 'Copy Application Page LSM',
    description: 'Copy over Application Page LSM to a target Site. Simply choose Source Site Location Specific Messages. Target Site and click on "Copy LSM" button.',
    sourceLabel: 'Location Specific Messages:',
    sourceValue: 'Psychometric Application/Confirmation - Sales Demo RP Retail Non-Req External Seeker Site',
    targetLabel: 'Target Site:',
    targetValue: 'AMV Non-Req External Seeker Site',
    buttonText: 'Copy LSM',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'copy-base-product-text-message',
    title: 'Copy Base Product Text Message',
    description: 'Copy over a single Base Product Text Message from a list of OSI Base Product Text Messages to a target Site. Simply choose Source Site. Target Site and click on "Copy Base Product Text Message" button.',
    sourceLabel: 'Base Product Text Messages:',
    sourceValue: '',
    targetLabel: 'Target Site:',
    targetValue: 'AMV Non-Req External Seeker Site',
    buttonText: 'Copy Base Product Text Message',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  }
]

export default function AdminModuleServicesUserPage() {
  const router = useRouter()

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
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
          <h1 className="text-2xl font-semibold text-black mb-4">Administration Module for Services User</h1>
          
          {/* Breadcrumb Navigation */}
          <div className="text-sm text-gray-600">
            <button 
              onClick={() => router.push('/admin-console/messaging/custom-message-templates')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Custom Message Templates
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/base-product-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Base Product Messages
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/base-product-text-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Base Product Text Messages
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/location-specific-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Location Specific Messages
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/promotion-module')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Promotion Module
            </button>
            <span className="mx-2">|</span>
            <span className="text-black font-medium">Admin Module for Services User</span>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/hmc-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              HMC Messages
            </button>
          </div>
        </div>

        {/* Copy Modules */}
        <div className="space-y-8">
          {copyModules.map((module, index) => (
            <div key={module.id} className="border-b border-gray-200 pb-8">
              {/* Module Title */}
              <h2 className="text-lg font-medium text-black mb-4">{module.title}</h2>
              
              {/* Module Description */}
              <p className="text-sm text-gray-600 mb-6">{module.description}</p>
              
              {/* Module Content */}
              <div className="space-y-4">
                {/* Source Field */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">{module.sourceLabel}</label>
                  <select className="w-full max-w-md border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                    {module.sourceLabel === 'Source Site:' && sourceSiteOptions.map((option) => (
                      <option key={option} value={option} selected={option === module.sourceValue}>
                        {option}
                      </option>
                    ))}
                    {module.sourceLabel === 'Base Product Messages:' && baseProductMessageOptions.map((option) => (
                      <option key={option} value={option} selected={option === module.sourceValue}>
                        {option}
                      </option>
                    ))}
                    {module.sourceLabel === 'Location Specific Messages:' && locationSpecificMessageOptions.map((option) => (
                      <option key={option} value={option} selected={option === module.sourceValue}>
                        {option}
                      </option>
                    ))}
                    {module.sourceLabel === 'Base Product Text Messages:' && baseProductTextMessageOptions.map((option) => (
                      <option key={option} value={option} selected={option === module.sourceValue}>
                        {option}
                      </option>
                    ))}
                    {module.sourceValue === '' && (
                      <option value="">Select an option...</option>
                    )}
                  </select>
                </div>
                
                {/* Target Field */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">{module.targetLabel}</label>
                  <select className="w-full max-w-md border border-gray-300 rounded px-3 py-2 text-sm bg-white">
                    {targetSiteOptions.map((option) => (
                      <option key={option} value={option} selected={option === module.targetValue}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Action Button */}
                <div className="pt-2">
                  <Button className={`${module.buttonColor} text-white px-6`}>
                    {module.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
