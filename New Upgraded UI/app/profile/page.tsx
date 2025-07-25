import type { Metadata } from "next"
import ProfileSettings from "@/components/profile/profile-settings"
import { getCurrentUser } from "@/lib/data"
// import ApplicationsPanel from "@/components/applicant/applications-panel"
// import ProfileInformationPanel from "@/components/applicant/profile-information-panel"
// import DashboardHeader from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: "Profile | Cadient",
  description: "View and manage your profile",
}
// Dummy commit

export default async function ProfilePage() {
  const user = await getCurrentUser()

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl font-semibold">Profile Settings</h1>
      </div>
      <div className="flex-1 p-6">
        <ProfileSettings user={user} />
      </div>
    </div>
  )
}
