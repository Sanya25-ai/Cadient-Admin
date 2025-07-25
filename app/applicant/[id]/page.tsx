import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ApplicantInformationPanel from "@/components/applicant/applicant-information-panel"
import { getApplication } from "@/lib/data"

export const metadata: Metadata = {
  title: "Applicant Details | Cadient",
  description: "View applicant details and information",
}

export default async function ApplicantPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)

  if (!application) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 pt-0">
        <ApplicantInformationPanel jobBidId={parseInt(params.id)} />
      </div>
    </div>
  )
}
