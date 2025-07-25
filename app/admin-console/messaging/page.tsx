'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  FileText,
  Star,
  Settings,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface MessagingTool {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const messagingTools: MessagingTool[] = [
  {
    id: 'custom-message-templates',
    title: 'Custom Message Templates',
    description: 'Create/manage email and text templates for use by the system or any users of the system.',
    icon: Mail,
    href: '/admin-console/messaging/custom-message-templates'
  },
  {
    id: 'base-product-messages',
    title: 'Base Product Messages',
    description: 'Access and modify the emails and texts that originally shipped with the product.',
    icon: Mail,
    href: '/admin-console/messaging/base-product-messages'
  },
  {
    id: 'base-product-text-messages',
    title: 'Base Product Text Messages',
    description: 'Access and modify the standalone text templates that originally shipped with the product.',
    icon: FileText,
    href: '/admin-console/messaging/base-product-text-messages'
  },
  {
    id: 'location-specific-messages',
    title: 'Location Specific Messages',
    description: 'Create and manage location specific messages for emails and career sites.',
    icon: Mail,
    href: '/admin-console/messaging/location-specific-messages'
  },
  {
    id: 'promotion-module',
    title: 'Promotion Module',
    description: 'Create and update the promotion message for each career site.',
    icon: Star,
    href: '/admin-console/messaging/promotion-module'
  },
  {
    id: 'admin-module-services-user',
    title: 'Admin Module for Services User',
    description: 'As a Services User, create Base Product Templates and Application Page Location Specific Messages for different applications.',
    icon: Mail,
    href: '/admin-console/messaging/admin-module-services-user'
  },
  {
    id: 'hmc-messages',
    title: 'HMC Messages',
    description: 'Create and update the Message for the HMC users.',
    icon: Star,
    href: '/admin-console/messaging/hmc-messages'
  }
]

export default function MessagingAdministrationPage() {
  const router = useRouter()

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Messaging</h1>
          </div>
        </div>

        {/* Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-2">Details</h2>
          <p className="text-sm text-muted-foreground">
            This area gives you the ability to manage the messaging content of the various areas listed below.
          </p>
        </div>

        {/* Messaging Tools */}
        <div className="space-y-4">
          {messagingTools.map((tool) => {
            const IconComponent = tool.icon
            
            return (
              <Link key={tool.id} href={tool.href}>
                <div className="group hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-[#EE5A37]/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-[#EE5A37]/10">
                      <IconComponent className="h-6 w-6 text-[#EE5A37]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#EE5A37] mb-1 text-lg">{tool.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-5 w-5 text-[#EE5A37]" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
