"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface DocumentTab {
  id: string;
  title: string;
  href: string;
}

const documentTabs: DocumentTab[] = [
  {
    id: "publish-draft-items",
    title: "Publish Draft Items",
    href: "/admin-console/document-management/publish-draft-items",
  },
  {
    id: "publish-history",
    title: "Publish History",
    href: "/admin-console/document-management/publish-history",
  },
  {
    id: "all-documents",
    title: "All Documents",
    href: "/admin-console/document-management/all-documents",
  },
  {
    id: "company-documents-tab",
    title: "Company Documents Tab",
    href: "/admin-console/document-management/company-documents-tab",
  },
  {
    id: "new-hire-packet",
    title: "New Hire Packet",
    href: "/admin-console/document-management/new-hire-packet",
  },
  {
    id: "sales-demo-retail-omega-new-employee-onboarding",
    title: "Sales Demo Retail Omega New Employee Onboarding",
    href: "/admin-console/document-management/sales-demo-retail-omega-new-employee-onboarding",
  },
  {
    id: "sales-demo-retail-omega-new-manager-onboarding",
    title: "Sales Demo Retail Omega New Manager Onboarding",
    href: "/admin-console/document-management/sales-demo-retail-omega-new-manager-onboarding",
  },
];

interface DocumentSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  buttonText: string;
}

const documentSections: DocumentSection[] = [
  {
    id: "create-modify",
    title: "Create or Modify a Document",
    description:
      "View or edit a complete collection of your active documents. You can also create or update new documents or remove documents from your active list. When editing or creating new documents, specify specific rules for presenting the documents based on location, job codes and applicant status.",
    icon: FileText,
    href: "/admin-console/document-management/all-documents",
    buttonText: "View Your Full List of Documents",
  },
  {
    id: "company-documents",
    title: "Company Documents Tab",
    description:
      "Manage documents listed in your Company Documents tab. You can add documents from a list of active documents, reorder or remove documents displayed in the tab.",
    icon: FileText,
    href: "/admin-console/document-management/company-documents-tab",
    buttonText: "Modify Company Document List",
  },
  {
    id: "new-hire-packet",
    title: "New Hire Packet",
    description:
      "Manage documents in your New Hire Packet. Add new documents, remove existing ones, and reorder the order in which they appear.",
    icon: FileText,
    href: "/admin-console/document-management/new-hire-packet",
    buttonText: "Modify New Hire Document List",
  },
  {
    id: "employee-onboarding",
    title: "Sales Demo Retail Omega New Employee Onboarding",
    description:
      "Manage documents for new employee onboarding. Add new documents, remove existing ones, and reorder the order in which they appear.",
    icon: User,
    href: "/admin-console/document-management/sales-demo-retail-omega-new-employee-onboarding",
    buttonText: "Manage documents",
  },
  {
    id: "manager-onboarding",
    title: "Sales Demo Retail Omega New Manager Onboarding",
    description:
      "Manage documents for new manager onboarding. Add new documents, remove existing ones, and reorder the order in which they appear.",
    icon: Settings,
    href: "/admin-console/document-management/sales-demo-retail-omega-new-manager-onboarding",
    buttonText: "Manage documents",
  },
];

export default function DocumentManagementPanel() {
  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Tab scroll functionality
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

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <div className="space-y-3 overflow-hidden">
      {/* Modern Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 border-l-green-500 border-l-4 rounded-lg shadow-lg p-4 min-w-[400px] animate-in slide-in-from-right-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Success alert
                </h3>
                <p className="text-sm text-gray-600">{successMessage}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <button className="text-[#EE5A37] border border-[#EE5A37] hover:bg-orange-50 px-4 py-1 h-8 rounded-full text-sm font-medium transition-colors">
                Undo
              </button>
              <button
                onClick={handleCloseSuccessAlert}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Management Section Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Document Management
      </h2>

      {/* Document Management Tabs with Horizontal Scroll */}
      <div className="relative flex items-center mb-6">
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
          {documentTabs.map((tab) => {
            const isActive = pathname === tab.href;

            return (
              <Link key={tab.id} href={tab.href}>
                <div
                  className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
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

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Self Service Change Section - Matching the organization page */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-base mb-2 text-gray-900">
              Self Service Change
            </h2>
            <p className="text-sm text-gray-600">
              Create and test your self service changes and then apply them to a
              corresponding application from a single console.
            </p>
          </div>
          <div className="text-right">
            <Link
              href="/admin-console/self-service"
              className="text-gray-900 text-sm font-medium border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              SS Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Status: Unpublished Changes - Modern Minimalistic Design */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full border border-red-500 flex-shrink-0"></div>
                <span className="text-gray-900">Status:</span>
                <span className="text-red-500">Unpublished Changes</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You have unpublished document or list changes. To view or
                publish your unpublished changes, click the "Publish Documents
                and Document Lists" link.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin-console/document-management/publish-draft-items">
              <Button className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white text-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                Publish Documents and Document Lists
              </Button>
            </Link>
            <Link href="/admin-console/document-management/publish-history">
              <Button
                variant="outline"
                className="border-[#EE5A37] text-[#EE5A37] hover:bg-[#EE5A37]/10 text-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                View Publish History
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Document Management Cards Grid - Following Admin Console Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentSections.map((section) => {
          const IconComponent = section.icon;

          return (
            <Card
              key={section.id}
              className="group hover:shadow-md transition-all duration-200 border h-52 flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#EE5A37]/10">
                    <IconComponent className="h-5 w-5 text-[#EE5A37]" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base font-medium">
                      {section.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 pb-4 flex-1 flex flex-col justify-between">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 overflow-hidden">
                  {section.description}
                </CardDescription>

                <Link
                  href={section.href}
                  className="inline-flex items-center text-sm text-muted-foreground group-hover:text-[#EE5A37] font-medium transition-colors mt-4 mb-4"
                >
                  {section.buttonText}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
