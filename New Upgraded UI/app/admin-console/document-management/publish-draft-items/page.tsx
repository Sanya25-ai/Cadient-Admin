import AdminConsoleHeader from "@/components/admin/admin-console-header";
import PublishDraftItemsPanel from "@/components/admin/publish-draft-items-panel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Publish Draft Items | Document Management | Admin Console | Cadient HMC",
  description: "Publish document lists and documents from draft versions",
};

export default function PublishDraftItemsPage() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Fixed Header - positioned below main navbar (70px) */}
      <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
        <AdminConsoleHeader currentTab="document-management" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <PublishDraftItemsPanel />
      </div>
    </div>
  );
}
