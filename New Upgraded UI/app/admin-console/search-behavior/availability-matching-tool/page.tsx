'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AvailabilityMatchingToolPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/admin-console/search-behavior">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Availability Matching Tool</h1>
          <p className="text-sm text-gray-600 mt-2">
            Create Timeframes for Availability Matching.
          </p>
        </div>

        {/* Redirect Message Card */}
        <Card className="border-l-4 border-l-[#EE5A37]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-5 w-5 text-[#EE5A37]" />
              <h2 className="text-lg font-medium text-gray-900">Redirecting to Tools</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You will be redirected to <strong>Tools → Availability Matching</strong> to access the Availability Matching Tool functionality.
            </p>
            <p className="text-sm text-gray-600">
              This tool allows you to create and manage timeframes for availability matching to help streamline your hiring process.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
