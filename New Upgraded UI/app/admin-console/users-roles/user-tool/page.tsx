import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "User Tool | Admin Console | Cadient HMC",
  description: "Change location access and roles, change password",
}

export default function UserToolPage() {
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
            <h1 className="text-2xl font-semibold text-[#EE5A37]">User Tool</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Change location access and roles, change password.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600">
              User Tool functionality will be implemented here. This tool allows administrators to:
            </p>
            <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Change user location access permissions</li>
              <li>Modify user roles and responsibilities</li>
              <li>Reset user passwords</li>
              <li>Manage user account settings</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
