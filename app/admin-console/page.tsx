import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/protected-route"
import AdminConsolePanel from '@/components/admin/admin-console-panel'

export const metadata: Metadata = {
  title: "Administrator Console | Cadient HMC",
  description: "Central hub for accessing HMC admin tools and configuring self-service features",
}

export default function AdminConsolePage() {
  return (
    <ProtectedRoute>
      <div className="flex-1 space-y-6 p-8 pt-6 bg-white">
        <AdminConsolePanel />
      </div>
    </ProtectedRoute>
  )
}
