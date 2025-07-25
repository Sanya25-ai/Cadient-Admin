import type { Metadata } from "next"
import { getFailedAssessmentApplications } from "@/lib/data"
import CommonApplicationsTable, { themes } from "@/components/applications/common-applications-table"
import type { Application } from "@/lib/types"

export const metadata: Metadata = {
  title: "Failed Assessments | Cadient",
  description: "View and manage applications with failed assessments",
}

export default async function FailedAssessmentsPage() {
  let applications: Application[] = [];
  let error = null;

  try {
    applications = await getFailedAssessmentApplications();
  } catch (err) {
    error = "An error occurred while fetching failed assessment applications.";
  }

  // Define actions specific to failed assessments
  const failedActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Retry Assessment" },
    { label: "Send Feedback" },
    { label: "Move to Pool" },
    { label: "Export CSV" },
    { label: "Archive" },
    { label: "Add Tag" },
    { label: "Send Message" },
    { label: "Reassess Candidate" },
    { label: "Forward for Review" },
    { label: "Remove from System", className: "text-red-600" }
  ]

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-red-600">Failed Assessments</h1>
        </div>
        <div className="flex-1 p-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="text-red-600 font-semibold text-lg mb-2">Error Loading Applications</div>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <CommonApplicationsTable
      applications={applications}
      title="Failed Assessments"
      theme={themes.red}
      actions={failedActions}
      emptyMessage="No failed assessment applications found"
    />
  )
}
