import AdminConsoleHeader from "@/components/admin/admin-console-header";
import SearchBehaviorPanel from "@/components/admin/search-behavior-panel";
import ProtectedRoute from "@/components/auth/protected-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Behavior | Admin Console | Cadient HMC",
  description:
    "Configure search functionality, availability matching, and advanced search features",
};

export default function SearchBehaviorPage() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Fixed Header - positioned below main navbar (70px) */}
        <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
          <AdminConsoleHeader currentTab="search-behavior" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <SearchBehaviorPanel />
        </div>
      </div>
    </ProtectedRoute>
  );
}
