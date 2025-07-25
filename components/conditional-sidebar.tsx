"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import UnifiedSidePanel from "./unified-side-panel";

export default function ConditionalSidebar() {
  const pathname = usePathname();
  const showSidebar = pathname ? !pathname.startsWith("/login") : true;
  const isEmployeeOnboarding = pathname === "/employee-onboarding";

  // Update CSS custom property when sidebar visibility changes
  useEffect(() => {
    if (!showSidebar) {
      document.documentElement.style.setProperty("--sidebar-width", "0px");
    } else if (isEmployeeOnboarding) {
      // For employee onboarding, show only main sidebar (64px)
      document.documentElement.style.setProperty("--sidebar-width", "64px");
    }
  }, [showSidebar, isEmployeeOnboarding]);

  return showSidebar ? (
    <UnifiedSidePanel forceCollapsed={isEmployeeOnboarding} />
  ) : null;
}
