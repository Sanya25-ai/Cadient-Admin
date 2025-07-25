import type { Metadata } from "next"
import { getPassedAssessmentApplications } from "@/lib/data"
import CommonApplicationsTable, { themes } from "@/components/applications/common-applications-table"
import type { Application } from "@/lib/types"

export const metadata: Metadata = {
  title: "Passed Assessments | Cadient",
  description: "View and manage applications with passed assessments",
}

export default async function PassedAssessmentsPage() {
  let applications: Application[] = [];
  let error = null;

  try {
    applications = await getPassedAssessmentApplications();
  } catch (err) {
    error = "An error occurred while fetching passed assessment applications.";
  }

  // Define actions specific to passed assessments
  const passedActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Schedule Interview" },
    { label: "Send Assessment" },
    { label: "Move to Pool" },
    { label: "Export CSV" },
    { label: "Archive" },
    { label: "Add Tag" },
    { label: "Send Message" },
    { label: "Forward to Hiring Manager" },
    { label: "Initiate Hiring Process" },
    { label: "Disqualify", className: "text-red-600" }
  ]

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-green-600">Passed Assessments</h1>
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
      title="Passed Assessments"
      theme={themes.green}
      actions={passedActions}
      emptyMessage="No passed assessment applications found"
    />
  )
}
