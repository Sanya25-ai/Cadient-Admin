import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProfileHeader from "@/components/applications/profile-header"
import ProfileTabs from "@/components/applications/profile-tabs"
import { getApplication } from "@/lib/data"

export const metadata: Metadata = {
  title: "Application Details | Cadient",
  description: "View application details and candidate information",
}

export default async function ApplicationPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)

  if (!application) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      <ProfileHeader application={application} />
      <ProfileTabs application={application} />
    </div>
  )
}
