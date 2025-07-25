import AdminConsoleHeader from "@/components/admin/admin-console-header";
import OrganizationPanel from "@/components/admin/organization-panel";
import ProtectedRoute from "@/components/auth/protected-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization | Admin Console | Cadient HMC",
  description:
    "Manage locations, position keys, requisition approvers, and organizational structure",
};

export default function OrganizationPage() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Fixed Header - positioned below main navbar (70px) */}
        <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
          <AdminConsoleHeader currentTab="organization" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <OrganizationPanel />
        </div>
      </div>
    </ProtectedRoute>
  );
}
