import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SmartInsightsHeader from "@/components/applications/smart-insights-header"
import SmartInsightsContent from "@/components/applications/smart-insights-content"
import { getApplication } from "@/lib/data"

export const metadata: Metadata = {
  title: "Smart Insights | Cadient",
  description: "View candidate smart insights and assessments",
}

export default async function SmartInsightsPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)

  if (!application) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      <SmartInsightsHeader application={application} />
      <div className="p-6">
        <SmartInsightsContent application={application} />
      </div>
    </div>
  )
}
