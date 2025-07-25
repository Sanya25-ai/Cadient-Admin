"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface AdminTab {
  id: string;
  title: string;
  href: string;
}

const adminTabs: AdminTab[] = [
  {
    id: "organization",
    title: "Organization",
    href: "/admin-console/organization",
  },
  {
    id: "users-roles",
    title: "Users & Roles",
    href: "/admin-console/users-roles",
  },
  {
    id: "communications",
    title: "Communications",
    href: "/admin-console/communications",
  },
  {
    id: "search-behavior",
    title: "HMC Search Behavior",
    href: "/admin-console/search-behavior",
  },
  {
    id: "hiring-behavior",
    title: "HMC Hiring Behavior",
    href: "/admin-console/hiring-behavior",
  },
  {
    id: "app-branding",
    title: "Application Branding",
    href: "/admin-console/app-branding",
  },
  {
    id: "document-management",
    title: "Document Management",
    href: "/admin-console/document-management",
  },
];

interface AdminConsoleHeaderProps {
  currentTab?: string;
  hideNavTabs?: boolean;
}

export default function AdminConsoleHeader({
  currentTab,
  hideNavTabs = false,
}: AdminConsoleHeaderProps) {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* Sub Header with Back Navigation and Title */}
      <div className="px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/admin-console">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#EE5A37]">
            Administrator's Console
          </h1>
        </div>
      </div>

      {/* Navigation Tabs Section with Horizontal Scroll */}
      {!hideNavTabs && (
        <div className="px-6 py-3 border-b-0">
          <div className="relative flex items-center">
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 p-1 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                style={{ marginLeft: "-12px" }}
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
            )}

            {/* Scrollable Tabs Container */}
            <div
              ref={scrollContainerRef}
              className="flex space-x-2 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={checkScrollButtons}
            >
              {adminTabs.map((tab) => {
                const isActive =
                  pathname === tab.href ||
                  (currentTab && tab.id === currentTab);

                return (
                  <Link key={tab.id} href={tab.href}>
                    <div
                      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-[#EE5A37] text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {tab.title}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 z-10 p-1 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                style={{ marginRight: "-12px" }}
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
