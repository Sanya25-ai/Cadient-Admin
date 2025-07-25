import type { Metadata } from "next"
import { notFound } from "next/navigation"
import HiringProcessHeader from "@/components/applications/hiring-process-header"
import HiringProcessSteps from "@/components/applications/hiring-process-steps"
import { getApplication } from "@/lib/data"

export const metadata: Metadata = {
  title: "Hiring Process | Cadient",
  description: "Manage candidate hiring process",
}

export default async function HiringProcessPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)

  if (!application) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      <HiringProcessHeader application={application} />
      <div className="p-6">
        <HiringProcessSteps application={application} />
      </div>
    </div>
  )
}
