import type { Metadata } from "next"
import ProfileSettings from "@/components/profile/profile-settings"
import { getCurrentUser } from "@/lib/data"

export const metadata: Metadata = {
  title: "Profile | Cadient",
  description: "View and manage your profile",
}

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
