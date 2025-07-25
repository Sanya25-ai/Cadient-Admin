import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "User Report | Admin Console | Cadient HMC",
  description: "Export all users of the system into a single spreadsheet",
}

export default function UserReportPage() {
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
            <h1 className="text-2xl font-semibold text-[#EE5A37]">User Report</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Export all users of the system into a single spreadsheet.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600">
              User Report functionality will be implemented here. This tool allows administrators to:
            </p>
            <ul className="mt-3 text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Generate comprehensive user reports</li>
              <li>Export user data to spreadsheet formats</li>
              <li>Filter users by various criteria</li>
              <li>Include user roles and permissions in reports</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
