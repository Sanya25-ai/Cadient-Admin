"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
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

export default function PublishHistoryPanel() {
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

  // Publish history data
  const publishEntries = [
    {
      publishedBy: "TEST_ADMIN",
      publishDate: "Apr 6, 2022 (5:10 AM)",
      items: [
        { type: "Documents", name: "I-9", icon: "📄" },
        {
          type: "Document Lists",
          name: "Sales Demo Retail Omega New Employee Onboarding",
          icon: "📄",
        },
        {
          type: "Document Lists",
          name: "Sales Demo Retail Omega New Manager Onboarding",
          icon: "📄",
        },
      ],
    },
    {
      publishedBy: "TEST_ADMIN",
      publishDate: "Nov 4, 2021 (9:24 PM)",
      items: [
        {
          type: "Document Lists",
          name: "Sales Demo Retail Omega New Manager Onboarding",
          icon: "📄",
        },
      ],
    },
    {
      publishedBy: "SHIRLEY.RECRUITER@GMAIL.COM",
      publishDate: "Feb 3, 2021 (5:58 PM)",
      items: [
        {
          type: "Document Lists",
          name: "Sales Demo Retail Omega New Employee Onboarding",
          icon: "📄",
        },
      ],
    },
    {
      publishedBy: "SHIRLEY.RECRUITER@GMAIL.COM",
      publishDate: "Feb 3, 2021 (9:19 AM)",
      items: [
        {
          type: "Document Lists",
          name: "Sales Demo Retail Omega New Manager Onboarding",
          icon: "📄",
        },
      ],
    },
    {
      publishedBy: "SHIRLEY.RECRUITER@GMAIL.COM",
      publishDate: "Feb 3, 2021 (8:14 AM)",
      items: [
        {
          type: "Document Lists",
          name: "Sales Demo Retail Omega New Manager Onboarding",
          icon: "📄",
        },
      ],
    },
  ];

  return (
    <div className="space-y-3 overflow-hidden">
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

      {/* Self Service Change Section */}
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

      {/* Gap above Publish History Section */}
      <div className="h-6"></div>

      {/* Publish History Section - Redesigned */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Publish History
            </h1>
            <p className="text-sm text-gray-600">
              All publishes of documents and document lists are shown below.
            </p>
          </div>
          <div>
            <Link href="/admin-console/document-management">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ← Back to Document Management
              </Button>
            </Link>
          </div>
        </div>

        {/* Pagination - moved up after description */}
        <div
          className="px-4 py-3 flex justify-between items-center text-sm rounded-lg mb-6"
          style={{
            backgroundColor: "rgb(238 90 55 / 8%)",
          }}
        >
          <div className="text-gray-700">
            Results: <strong>1-5</strong> of <strong>9</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white">
              <option>1 of 2</option>
              <option>2 of 2</option>
            </select>
          </div>
        </div>

        {/* Publication Entries */}
        <div className="space-y-6">
          {publishEntries.map((entry, index) => (
            <div key={index} className="space-y-3">
              {/* Publication Header */}
              <div className="px-4 py-3 rounded-lg bg-gray-100">
                <div className="text-sm font-medium text-gray-900">
                  Published by{" "}
                  <span className="text-[#EE5A37] font-semibold">
                    {entry.publishedBy}
                  </span>{" "}
                  on {entry.publishDate}
                </div>
              </div>

              {/* Publication Items */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableBody>
                    {entry.items.map((item, itemIndex) => (
                      <TableRow key={itemIndex} className="hover:bg-gray-50">
                        <TableCell className="w-12">
                          <div className="p-2 rounded-lg bg-[#EE5A37]/10">
                            <FileText className="h-4 w-4 text-[#EE5A37]" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900 mb-1">
                              {item.type}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Link
                              href={`/admin-console/document-management/document/${item.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              <Button
                                variant="outline"
                                className="border-[#EE5A37] text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white text-sm px-3 py-1 rounded-lg font-medium transition-all duration-200"
                              >
                                {item.name}
                              </Button>
                            </Link>
                            <Button className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white text-sm px-3 py-1 rounded-lg font-medium transition-all duration-200 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              Show Changes
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="px-4 py-3 flex justify-between items-center text-sm rounded-lg"
          style={{
            backgroundColor: "rgb(238 90 55 / 8%)",
          }}
        >
          <div className="text-gray-700">
            Results: <strong>1-5</strong> of <strong>9</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white">
              <option>1 of 2</option>
              <option>2 of 2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
