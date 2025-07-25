import type { Metadata } from "next"
import { getPreScreenedApplications } from "@/lib/data"
import CommonApplicationsTable, { themes } from "@/components/applications/common-applications-table"
import type { Application } from "@/lib/types"

export const metadata: Metadata = {
  title: "Pre-screened Applications | Cadient",
  description: "View and manage pre-screened applications",
}

export default async function PreScreenedPage() {
  let applications: Application[] = [];
  let error = null;

  try {
    applications = await getPreScreenedApplications({});
  } catch (err) {
    error = "An error occurred while fetching applications.";
  }

  // Define actions specific to pre-screened applications
  const preScreenedActions = [
    { label: "Assign" },
    { label: "Bookmark" },
    { label: "Change Hiring Step" },
    { label: "Change Status" },
    { label: "Send a Message" },
    { label: "Extend Application" },
    { label: "Forward Interview Guide" },
    { label: "Forward Application Details" },
    { label: "Initiate Hiring Process" },
    { label: "Resend Invite for Job Board" },
    { label: "Add Tag" },
    { label: "Export All Results" }
  ]

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Pre-screened Applications</h1>
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
      title="Pre-screened Applications"
      theme={themes.orange}
      actions={preScreenedActions}
      emptyMessage="No pre-screened applications found"
    />
  )
}
