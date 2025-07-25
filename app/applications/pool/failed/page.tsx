import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getApplicationPool } from "@/lib/application-pool-data/application-pool"
import CommonApplicationsTable, { themes } from "@/components/applications/common-applications-table"
import type { ApplicationPoolCandidate } from "@/lib/types"

export const metadata: Metadata = {
  title: "Application Pool: Failed Assessment | Cadient",
  description: "View and manage applications with failed assessments in the pool",
}

export default async function FailedAssessmentPoolPage() {
  let applications: ApplicationPoolCandidate[] = [];
  let error = null;

  try {
    // Extract cookies from the request headers
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieString = allCookies.map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`).join('; ');
    
    // Pass cookies to the function
    applications = await getApplicationPool('PoolFailed', {}, cookieString);
  } catch (err) {
    error = "An error occurred while fetching failed assessment applications.";
  }

  // Define actions specific to failed assessments in pool
  const failedActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Retry Assessment" },
    { label: "Send Feedback" },
    { label: "Move to Pool" },
    { label: "Bulk Move" },
    { label: "Reassess Candidate" },
    { label: "Forward for Review" },
    { label: "Export CSV" },
    { label: "Add Tag" },
    { label: "Send Message" },
    { label: "Archive" },
    { label: "Remove from System", className: "text-red-600" }
  ]

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-red-600">Application Pool: Failed Assessment</h1>
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
      title="Application Pool: Failed Assessment"
      theme={themes.red}
      actions={failedActions}
      emptyMessage="No failed assessment applications found in the pool"
    />
  )
}
