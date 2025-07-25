import ManagerOnboardingProcess from "@/components/applicant/manager-onboarding-process";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager Onboarding | Cadient",
  description: "Manager onboarding process",
};

export default function ManagerOnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ManagerOnboardingProcess />
    </div>
  );
}
