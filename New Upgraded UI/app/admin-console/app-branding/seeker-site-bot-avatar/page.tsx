import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seeker Site Bot Avatar Configuration | Admin Console | Cadient HMC",
  description: "Configure seeker site specific chat bot avatar",
};

export default function SeekerSiteBotAvatarConfigurationPage() {
  return (
    <ProtectedRoute>
      <div className="flex-1 space-y-6 p-8 pt-6 bg-white">
        {/* Sub Header with Back Navigation and Title */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin-console/app-branding">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <h1 className="text-xl font-medium text-[#EE5A37]">
            Seeker Site Bot Avatar Configuration
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Configure seeker site specific chat bot avatar.
          </p>
          <p className="text-sm text-gray-600 italic">
            Chatbot is not enabled.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
