import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getApplicationPool } from "@/lib/application-pool-data/application-pool"
import CommonApplicationsTable, { themes } from "@/components/applications/common-applications-table"
import type { ApplicationPoolCandidate } from "@/lib/types"

export const metadata: Metadata = {
  title: "Application Pool: Passed Assessment | Cadient",
  description: "View and manage applications with passed assessments in the pool",
}

export default async function PassedAssessmentPoolPage() {
  let applications: ApplicationPoolCandidate[] = [];
  let error = null;

  try {
    // Extract cookies from the request headers
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieString = allCookies.map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`).join('; ');
    
    // Pass cookies to the function
    applications = await getApplicationPool('PoolPassed', {}, cookieString);
  } catch (err) {
    error = "An error occurred while fetching passed assessment applications.";
  }

  // Define actions specific to passed assessments in pool
  const passedActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Schedule Interview" },
    { label: "Move to Hiring" },
    { label: "Send Assessment" },
    { label: "Bulk Move" },
    { label: "Forward to Hiring Manager" },
    { label: "Export CSV" },
    { label: "Add Tag" },
    { label: "Send Message" },
    { label: "Archive" },
    { label: "Remove from Pool", className: "text-red-600" }
  ]

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-green-600">Application Pool: Passed Assessment</h1>
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
      title="Application Pool: Passed Assessment"
      theme={themes.green}
      actions={passedActions}
      emptyMessage="No passed assessment applications found in the pool"
    />
  )
}
