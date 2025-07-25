"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function PublishDraftItemsPanel() {
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showManagerOnboardingModal, setShowManagerOnboardingModal] =
    useState(false);
  const [showPublishConfirmModal, setShowPublishConfirmModal] = useState(false);
  const [isDraftListsExpanded, setIsDraftListsExpanded] = useState(true);
  const [isDraftDocsExpanded, setIsDraftDocsExpanded] = useState(true);
  const [isAuditLogsExpanded, setIsAuditLogsExpanded] = useState(false);
  const [isManagerAuditLogsExpanded, setIsManagerAuditLogsExpanded] =
    useState(false);

  // Selection state
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAllLists, setSelectAllLists] = useState(false);
  const [selectAllDocs, setSelectAllDocs] = useState(false);

  // Document data
  const documentLists = [
    { id: "new-hire-packet", name: "New Hire Packet" },
    {
      id: "manager-onboarding",
      name: "Sales Demo Retail Omega New Manager Onboarding",
    },
  ];

  const documents = [{ id: "testdoc", name: "Testdoc" }];

  // Selection handlers
  const handleItemSelection = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const handleSelectAllLists = (checked: boolean) => {
    setSelectAllLists(checked);
    if (checked) {
      const listIds = documentLists.map((list) => list.id);
      setSelectedItems((prev) => [
        ...prev.filter((id) => !listIds.includes(id)),
        ...listIds,
      ]);
    } else {
      const listIds = documentLists.map((list) => list.id);
      setSelectedItems((prev) => prev.filter((id) => !listIds.includes(id)));
    }
  };

  const handleSelectAllDocs = (checked: boolean) => {
    setSelectAllDocs(checked);
    if (checked) {
      const docIds = documents.map((doc) => doc.id);
      setSelectedItems((prev) => [
        ...prev.filter((id) => !docIds.includes(id)),
        ...docIds,
      ]);
    } else {
      const docIds = documents.map((doc) => doc.id);
      setSelectedItems((prev) => prev.filter((id) => !docIds.includes(id)));
    }
  };

  const handlePublish = () => {
    if (selectedItems.length > 0) {
      setShowPublishConfirmModal(true);
    }
  };

  const getSelectedItemNames = () => {
    const selectedNames: string[] = [];
    documentLists.forEach((list) => {
      if (selectedItems.includes(list.id)) {
        selectedNames.push(list.name);
      }
    });
    documents.forEach((doc) => {
      if (selectedItems.includes(doc.id)) {
        selectedNames.push(doc.name);
      }
    });
    return selectedNames;
  };

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

  const auditLogs = [
    {
      date: "May 30, 2015 (12:12 AM)",
      user: "ADMIN",
      details: "Draft version of [New Hire Packet] list created.",
    },
    {
      date: "Nov 4, 2021 (9:24 PM)",
      user: "TEST_ADMIN",
      details: "Draft version of [New Hire Packet] list discarded.",
    },
    {
      date: "Dec 29, 2022 (1:41 AM)",
      user: "MMOSER_DEMO",
      details: "Draft version of [New Hire Packet] list created.",
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

      {/* Gap above Publish Draft Items Section */}
      <div className="h-6"></div>

      {/* Publish Draft Items Section - Redesigned */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Publish Draft Items
            </h1>
            <p className="text-sm text-gray-600">
              This is where you can publish document lists and documents.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin-console/document-management">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ← Back to Document Management
              </Button>
            </Link>
            <Button
              className={`text-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                selectedItems.length > 0
                  ? "bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedItems.length === 0}
              onClick={handlePublish}
            >
              Publish
            </Button>
          </div>
        </div>

        {/* Draft Document Lists */}
        <div className="space-y-2">
          {/* Header with collapse/expand */}
          <div
            className="px-4 py-3 flex items-center justify-between cursor-pointer transition-colors rounded-lg"
            style={{
              backgroundColor: "rgb(238 90 55 / 8%)",
            }}
            onClick={() => setIsDraftListsExpanded(!isDraftListsExpanded)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgb(238 90 55 / 12%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgb(238 90 55 / 8%)")
            }
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectAllLists}
                onChange={(e) => handleSelectAllLists(e.target.checked)}
                className="rounded border-gray-300 text-[#EE5A37] focus:ring-[#EE5A37]"
                onClick={(e) => e.stopPropagation()}
              />
              <h3 className="font-medium text-gray-900">
                Draft Document Lists
              </h3>
            </div>
            {isDraftListsExpanded ? (
              <ChevronRight className="h-4 w-4 text-gray-600 rotate-90 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
            )}
          </div>

          {/* Table Content */}
          {isDraftListsExpanded && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes("new-hire-packet")}
                        onChange={(e) =>
                          handleItemSelection(
                            "new-hire-packet",
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-[#EE5A37] focus:ring-[#EE5A37]"
                      />
                    </TableCell>
                    <TableCell className="w-12">
                      <div className="p-2 rounded-lg bg-[#EE5A37]/10">
                        <FileText className="h-4 w-4 text-[#EE5A37]" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      New Hire Packet
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        className="text-[#EE5A37] hover:text-[#EE5A37]/80 text-sm font-medium flex items-center gap-2 transition-colors"
                        onClick={() => setShowComparisonModal(true)}
                      >
                        <FileText className="h-3 w-3" />
                        Compare to Published Version
                      </button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#EE5A37] focus:ring-[#EE5A37]"
                      />
                    </TableCell>
                    <TableCell className="w-12">
                      <div className="p-2 rounded-lg bg-[#EE5A37]/10">
                        <FileText className="h-4 w-4 text-[#EE5A37]" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      Sales Demo Retail Omega New Manager Onboarding
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        className="text-[#EE5A37] hover:text-[#EE5A37]/80 text-sm font-medium flex items-center gap-2 transition-colors"
                        onClick={() => setShowManagerOnboardingModal(true)}
                      >
                        <FileText className="h-3 w-3" />
                        Compare to Published Version
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Draft Documents */}
        <div className="space-y-2">
          {/* Header with collapse/expand */}
          <div
            className="px-4 py-3 flex items-center justify-between cursor-pointer transition-colors rounded-lg"
            style={{
              backgroundColor: "rgb(238 90 55 / 8%)",
            }}
            onClick={() => setIsDraftDocsExpanded(!isDraftDocsExpanded)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgb(238 90 55 / 12%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgb(238 90 55 / 8%)")
            }
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#EE5A37] focus:ring-[#EE5A37]"
                onClick={(e) => e.stopPropagation()}
              />
              <h3 className="font-medium text-gray-900">Draft Documents</h3>
            </div>
            {isDraftDocsExpanded ? (
              <ChevronRight className="h-4 w-4 text-gray-600 rotate-90 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
            )}
          </div>

          {/* Table Content */}
          {isDraftDocsExpanded && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#EE5A37] focus:ring-[#EE5A37]"
                      />
                    </TableCell>
                    <TableCell className="w-12">
                      <div className="p-2 rounded-lg bg-[#EE5A37]/10">
                        <FileText className="h-4 w-4 text-[#EE5A37]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">
                          Testdoc
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="mb-1">Description: --</div>
                          <div>
                            Last modified by <strong>MMOSER_DEMO</strong> on{" "}
                            <strong>Dec 29, 2022 (7:42 AM)</strong>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* No action button for this row as per original design */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Modal */}
      <Dialog open={showComparisonModal} onOpenChange={setShowComparisonModal}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          {/* Fixed Header */}
          <DialogHeader className="flex-shrink-0 border-b border-gray-200 pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              List Version Comparison
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {/* Description */}
            <div className="text-sm text-gray-600">
              The two versions of this list are shown below. Forms that exist in
              the version on the left, but are not in the version on the right
              are shown in{" "}
              <span className="text-orange-300 font-medium">light orange</span>.
              Forms that have been added to the version on the right, but are
              not in the left are shown in{" "}
              <span className="text-[#EE5A37] font-medium">dark orange</span>.
            </div>

            {/* No Differences Message */}
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="text-gray-800 font-medium">
                There are no differences between the two lists.
              </div>
            </div>

            {/* Audit Logs Collapsible Section */}
            <div className="space-y-2">
              {/* Collapsible Header */}
              <div
                className="px-4 py-3 flex items-center justify-between cursor-pointer transition-colors rounded-lg"
                style={{
                  backgroundColor: "rgb(238 90 55 / 8%)",
                }}
                onClick={() => setIsAuditLogsExpanded(!isAuditLogsExpanded)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgb(238 90 55 / 12%)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgb(238 90 55 / 8%)")
                }
              >
                <h3 className="font-medium text-gray-900">
                  View Full Audit Logs
                </h3>
                {isAuditLogsExpanded ? (
                  <ChevronRight className="h-4 w-4 text-gray-600 rotate-90 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
                )}
              </div>

              {/* Audit Logs Table */}
              {isAuditLogsExpanded && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow
                        style={{ backgroundColor: "rgb(238 90 55 / 8%)" }}
                        className="hover:bg-[rgb(238,90,55,0.08)]"
                      >
                        <TableHead className="text-gray-900 font-medium">
                          Change Date
                        </TableHead>
                        <TableHead className="text-gray-900 font-medium">
                          User Name
                        </TableHead>
                        <TableHead className="text-gray-900 font-medium">
                          Change Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLogs.map((log, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="text-gray-600 italic">
                            {log.date}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            {log.user}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {log.details}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex-shrink-0 border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <Button
                className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white text-sm px-6 py-2 rounded-lg font-medium transition-all duration-200"
                onClick={() => setShowComparisonModal(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manager Onboarding Comparison Modal */}
      <Dialog
        open={showManagerOnboardingModal}
        onOpenChange={setShowManagerOnboardingModal}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          {/* Fixed Header */}
          <DialogHeader className="flex-shrink-0 border-b border-gray-200 pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              List Version Comparison
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {/* Description */}
            <div className="text-sm text-gray-600">
              The two versions of this list are shown below. Forms that exist in
              the version on the left, but are not in the version on the right
              are shown in{" "}
              <span className="text-orange-300 font-medium">light orange</span>.
              Forms that have been added to the version on the right, but are
              not in the version on the left are shown in{" "}
              <span className="text-[#EE5A37] font-medium">dark orange</span>.
            </div>

            {/* Version Comparison */}
            <div className="relative border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Published Version */}
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Published by TEST_ADMIN
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    on Apr 6, 2022 (3:10 AM)
                  </div>
                  <div
                    className="p-4 rounded relative"
                    style={{ backgroundColor: "rgb(238 90 55 / 8%)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-900">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">T-9</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          className="p-1 hover:bg-gray-200 rounded"
                          title="View"
                        >
                          <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            className="text-gray-400"
                          >
                            <path
                              d="M8 0C4.5 0 1.5 2.5 0 6c1.5 3.5 4.5 6 8 6s6.5-2.5 8-6c-1.5-3.5-4.5-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Edit"
                        >
                          <svg
                            width="16"
                            height="12"
                            viewBox="0 0 16 12"
                            className="text-gray-400"
                          >
                            <path
                              d="M11.5 0l-1.5 1.5 3 3 1.5-1.5-3-3zm-2 2l-8.5 8.5v3h3l8.5-8.5-3-3z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Draft Version */}
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Draft created by CTA_PJAIN
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    on Jun 8, 2025 (4:23 PM)
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-center text-gray-600 font-medium">
                      No documents in this list.
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>
            </div>

            {/* Audit Logs Collapsible Section */}
            <div className="space-y-2">
              {/* Collapsible Header */}
              <div
                className="px-4 py-3 flex items-center justify-between cursor-pointer transition-colors rounded-lg"
                style={{
                  backgroundColor: "rgb(238 90 55 / 8%)",
                }}
                onClick={() =>
                  setIsManagerAuditLogsExpanded(!isManagerAuditLogsExpanded)
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgb(238 90 55 / 12%)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgb(238 90 55 / 8%)")
                }
              >
                <h3 className="font-medium text-gray-900">
                  View Full Audit Logs
                </h3>
                {isManagerAuditLogsExpanded ? (
                  <ChevronRight className="h-4 w-4 text-gray-600 rotate-90 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
                )}
              </div>

              {/* Audit Logs Table */}
              {isManagerAuditLogsExpanded && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow
                        style={{ backgroundColor: "rgb(238 90 55 / 8%)" }}
                        className="hover:bg-[rgb(238,90,55,0.08)]"
                      >
                        <TableHead className="text-gray-900 font-medium">
                          Change Date
                        </TableHead>
                        <TableHead className="text-gray-900 font-medium">
                          User Name
                        </TableHead>
                        <TableHead className="text-gray-900 font-medium">
                          Change Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell className="text-gray-600 italic">
                          Jun 8, 2025 (4:23 PM)
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          CTA_PJAIN
                        </TableCell>
                        <TableCell className="text-gray-700">
                          Draft onboarding list for [Sales Demo Retail Omega New
                          Manager Onboarding] created.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex-shrink-0 border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <Button
                className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white text-sm px-6 py-2 rounded-lg font-medium transition-all duration-200"
                onClick={() => setShowManagerOnboardingModal(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
