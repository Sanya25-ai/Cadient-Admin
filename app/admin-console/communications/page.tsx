import AdminConsoleHeader from "@/components/admin/admin-console-header";
import CommunicationsPanel from "@/components/admin/communications-panel";
import ProtectedRoute from "@/components/auth/protected-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communications | Admin Console | Cadient HMC",
  description:
    "Manage email templates, notifications, and communication settings",
};

export default function CommunicationsPage() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Fixed Header - positioned below main navbar (70px) */}
        <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
          <AdminConsoleHeader currentTab="communications" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <CommunicationsPanel />
        </div>
      </div>
    </ProtectedRoute>
  );
}
