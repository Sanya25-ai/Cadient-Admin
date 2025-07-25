'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const careerSites = [
  {
    id: 'sales-demo-retail-omega-req-internal',
    name: 'Sales Demo Retail Omega Req Internal',
    icon: '⭐'
  },
  {
    id: 'sales-demo-retail-omega-ktmd-nonreq-internal',
    name: 'Sales Demo Retail Omega KTMD NonReq Internal',
    icon: '⭐'
  },
  {
    id: 'sales-demo-retail-omega-nonreq-external',
    name: 'Sales Demo Retail Omega NonReq External',
    icon: '⭐'
  },
  {
    id: 'sales-demo-retail-omega-req-external',
    name: 'Sales Demo Retail Omega Req External',
    icon: '⭐'
  },
  {
    id: 'sales-demo-retail-omega-non-req-hirenow',
    name: 'Sales Demo Retail Omega Non-Req HireNow',
    icon: '⭐'
  }
]

export default function PromotionModulePage() {
  const router = useRouter()

  const handleCareerSiteClick = (siteId: string) => {
    router.push(`/admin-console/messaging/promotion-module/${siteId}`)
  }

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
          <h1 className="text-2xl font-semibold text-black mb-4">Promotion Module</h1>
          
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
            <span className="text-black font-medium">Promotion Module</span>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/admin-module-services-user')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Admin Module for Services User
            </button>
            <span className="mx-2">|</span>
            <button 
              onClick={() => router.push('/admin-console/messaging/hmc-messages')}
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              HMC Messages
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-black mb-2">Details</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>The candidate Promotion Module gives you the ability to promote any of the pages within your career site to candidates.</p>
            <p>For example, you can promote a specific position, all positions at a specific location or even a specific position at a specific location. You can change this promotion message as often as you like to best control the flow of applications.</p>
            <p>Simply click the name of career site to view and manage the message.</p>
          </div>
        </div>

        {/* Career Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careerSites.map((site) => (
            <button
              key={site.id}
              onClick={() => handleCareerSiteClick(site.id)}
              className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg text-left transition-colors duration-200 flex items-center gap-3"
            >
              <span className="text-yellow-400 text-lg">{site.icon}</span>
              <span className="text-yellow-400 hover:text-yellow-300">{site.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
