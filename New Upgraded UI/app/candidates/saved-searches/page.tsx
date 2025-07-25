import type { Metadata } from "next"
import SavedSearchesHeader from "@/components/saved-searches/saved-searches-header"
import SavedSearchesTable from "@/components/saved-searches/saved-searches-table"
import ProtectedRoute from "@/components/auth/protected-route"
import { SavedSearchesProvider } from "@/lib/saved-searches-context"

export const metadata: Metadata = {
  title: "Saved Searches | Cadient",
  description: "View and manage your saved applicant searches",
}

export default function CandidatesSavedSearchesPage() {
  return (
    <ProtectedRoute>
      <SavedSearchesProvider>
        <div className="flex flex-col h-full">
          <SavedSearchesHeader />
          <div className="flex-1 px-3 pb-3">
            <SavedSearchesTable />
          </div>
        </div>
      </SavedSearchesProvider>
    </ProtectedRoute>
  )
}
