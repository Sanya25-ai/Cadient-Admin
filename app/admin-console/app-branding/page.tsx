import AdminConsoleHeader from "@/components/admin/admin-console-header";
import AppBrandingPanel from "@/components/admin/app-branding-panel";
import ProtectedRoute from "@/components/auth/protected-route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Branding | Admin Console | Cadient HMC",
  description:
    "Customize application appearance, logos, colors, and branding elements",
};

export default function AppBrandingPage() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Fixed Header - positioned below main navbar (70px) */}
        <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
          <AdminConsoleHeader currentTab="app-branding" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AppBrandingPanel />
        </div>
      </div>
    </ProtectedRoute>
  );
}
