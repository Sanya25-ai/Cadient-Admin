import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Homepage Configuration Tool | Admin Console | Cadient HMC",
  description: "Configure the homepage for different roles",
}

export default function HomepageConfigurationPage() {
  return (
    <ProtectedRoute>
      <div className="flex-1 space-y-6 p-8 pt-6 bg-white">
        <div className="mb-6">
          <Link href="/admin-console/users-roles">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Admin Console
            </Button>
          </Link>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Homepage Configuration Tool</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure the homepage for different roles.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600">
              Homepage Configuration Tool functionality will be implemented here. This tool allows administrators to:
            </p>
            <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Customize homepage layouts for different user roles</li>
              <li>Configure dashboard widgets and components</li>
              <li>Set role-specific navigation and menu options</li>
              <li>Manage homepage content and announcements</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
