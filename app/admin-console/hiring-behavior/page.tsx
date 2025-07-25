import AdminConsoleHeader from "@/components/admin/admin-console-header";
import HiringBehaviorPanel from "@/components/admin/hiring-behavior-panel";
import ProtectedRoute from "@/components/auth/protected-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hiring Behavior | Admin Console | Cadient HMC",
  description:
    "Configure hiring workflows, applicant import, and offer templates",
};

export default function HiringBehaviorPage() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Fixed Header - positioned below main navbar (70px) */}
        <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
          <AdminConsoleHeader currentTab="hiring-behavior" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <HiringBehaviorPanel />
        </div>
      </div>
    </ProtectedRoute>
  );
}
