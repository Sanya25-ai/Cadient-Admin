import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getApplicationPool } from "@/lib/application-pool-data/application-pool"
import CommonApplicationsTable, { themes } from "@/components/applications/common-applications-table"
import type { ApplicationPoolCandidate } from "@/lib/types"

export const metadata: Metadata = {
  title: "Application Pool | Cadient",
  description: "View and manage application pool",
}

export default async function ApplicationPoolPage() {
  console.log('🚀 === APPLICATION POOL PAGE ACCESSED ===');
  console.log('📍 URL: /applications/pool');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  let applications: ApplicationPoolCandidate[] = [];
  let error = null;

  try {
    console.log('🔄 Starting to fetch application pool data...');
    console.log('📊 Pool Type: Pool');
    console.log('🔧 Filters: {}');
    
    // Extract cookies from the request headers
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieString = allCookies.map((cookie: { name: string; value: string }) => `${cookie.name}=${cookie.value}`).join('; ');
    
    console.log('🍪 Extracted cookies from request:', cookieString ? '[PRESENT]' : '[MISSING]');
    console.log('📊 Number of cookies found:', allCookies.length);
    
    // Pass cookies to the function
    applications = await getApplicationPool('Pool', {}, cookieString);
    
    console.log('✅ Successfully fetched application pool data');
    console.log('📈 Number of applications received:', applications.length);
    console.log('🎯 First few application IDs:', applications.slice(0, 3).map(app => app.id));
  } catch (err) {
    console.error('❌ Error fetching application pool data:', err);
    console.error('📊 Error details:', err instanceof Error ? err.message : 'Unknown error');
    error = "An error occurred while fetching application pool data.";
  }

  // Define actions specific to application pool
  const poolActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Bulk Move" },
    { label: "Send Assessment" },
    { label: "Schedule Interview" },
    { label: "Change Status" },
    { label: "Send Message" },
    { label: "Forward to Hiring Manager" },
    { label: "Export CSV" },
    { label: "Archive" },
    { label: "Add Tag" },
    { label: "Remove from Pool", className: "text-red-600" }
  ]

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 pb-0 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Application Pool</h1>
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
      title="Application Pool"
      theme={themes.orange}
      actions={poolActions}
      emptyMessage="No applications found in the pool"
    />
  )
}
