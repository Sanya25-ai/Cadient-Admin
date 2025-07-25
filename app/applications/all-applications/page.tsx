import type { Metadata } from "next"
import AllApplicationsList from "@/components/applications/all-applications-list"
import FilterCachePreloader from "@/components/applications/filter-cache-preloader"

export const metadata: Metadata = {
  title: "All Applications | Cadient",
  description: "View and manage all applications",
}

export default function AllApplicationsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AllApplicationsList title="All Applications" />
    </div>
  )
}
