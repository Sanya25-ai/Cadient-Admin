import AdminConsoleHeader from "@/components/admin/admin-console-header";
import PublishHistoryPanel from "@/components/admin/publish-history-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish History | Document Management | Admin Console | Cadient HMC",
  description: "View history of published document lists and documents",
};

export default function PublishHistoryPage() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Fixed Header - positioned below main navbar (70px) */}
      <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
        <AdminConsoleHeader currentTab="document-management" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <PublishHistoryPanel />
      </div>
    </div>
  );
}
