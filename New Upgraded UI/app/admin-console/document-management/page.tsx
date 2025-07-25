import AdminConsoleHeader from "@/components/admin/admin-console-header";
import DocumentManagementPanel from "@/components/admin/document-management-panel";
import ProtectedRoute from "@/components/auth/protected-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Management | Admin Console | Cadient HMC",
  description:
    "Manage document templates, storage, and file handling configurations",
};

export default function DocumentManagementPage() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Fixed Header - positioned below main navbar (70px) */}
        <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
          <AdminConsoleHeader currentTab="document-management" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <DocumentManagementPanel />
        </div>
      </div>
    </ProtectedRoute>
  );
}
