import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/protected-route"
import AdminConfigPanel from '@/components/admin/admin-config-panel'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Configuration | Cadient",
  description: "Manage application features, permissions, and system settings",
}

export default function AdminConfigPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <div className="mb-4">
          <Link href="/applications/top-applicants">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Top Applicants
            </Button>
          </Link>
        </div>
        <AdminConfigPanel />
      </div>
    </ProtectedRoute>
  )
}
