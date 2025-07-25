import type { Metadata } from "next"
import FailedAssessmentHeader from "@/components/applications/failed-assessment-header"
import FailedAssessmentTable from "@/components/applications/failed-assessment-table"
import { getFailedAssessmentApplications } from "@/lib/data"

export const metadata: Metadata = {
  title: "Failed Assessment | Cadient",
  description: "View failed assessment applications",
}

async function getApplicationData() {
  const applications = await getFailedAssessmentApplications();
  
  return applications;
}

export default async function FailedAssessmentPage() {
  const applications = await getApplicationData();

  return (
    <div className="flex flex-col h-full">
      <FailedAssessmentHeader title="Failed Assessment" total={applications.length} />
      <div className="flex-1 p-6">
        <FailedAssessmentTable applications={applications} />
      </div>
    </div>
  )
}
