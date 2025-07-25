import type { Metadata } from "next"
import ApplicantInformationPanel from "@/components/applicant/applicant-information-panel"

export const metadata: Metadata = {
  title: "Applicant Information | Cadient",
  description: "View and manage applicant information",
}

interface ApplicantPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ApplicantPage({ searchParams }: ApplicantPageProps) {
  // Log all URL parameters
  console.log('URL Parameters:', searchParams)
  
  // Extract and log specific parameters
  const id = searchParams.id
  console.log('Applicant ID from URL:', id)
  
  // Convert id to number with fallback to 1
  const jobBidId = id ? Number(id) : 536344
  console.log('Using jobBidId:', jobBidId)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <ApplicantInformationPanel jobBidId={jobBidId} />
      </div>
    </div>
  )
}
