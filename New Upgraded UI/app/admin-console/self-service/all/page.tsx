"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AllSelfServiceChangesPage() {
  const [viewOption, setViewOption] = useState("mine-only");
  const [selectedStatuses, setSelectedStatuses] = useState(["all-statuses"]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAuditDialog, setShowAuditDialog] = useState(false);

  const handleStatusChange = (status: string) => {
    if (status === "all-statuses") {
      setSelectedStatuses(["all-statuses"]);
    } else {
      const newStatuses = selectedStatuses.filter((s) => s !== "all-statuses");
      if (selectedStatuses.includes(status)) {
        const filtered = newStatuses.filter((s) => s !== status);
        setSelectedStatuses(
          filtered.length === 0 ? ["all-statuses"] : filtered
        );
      } else {
        setSelectedStatuses([...newStatuses, status]);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Self Service
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-[#EE5A37]">
                All Self Service Changes
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                View and manage all self service changes
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Links */}
            <div className="mb-6">
              <div className="flex items-center gap-1 text-sm">
                <Link
                  href="/dashboard"
                  className="text-[#EE5A37] hover:underline"
                >
                  Home
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/admin-console"
                  className="text-[#EE5A37] hover:underline"
                >
                  HMC Admin Console
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/admin-console/self-service/sign-out"
                  className="text-[#EE5A37] hover:underline"
                >
                  Sign Out
                </Link>
              </div>
            </div>

            {/* Welcome Section with Action Buttons */}
            <div className="mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Welcome, Pratham!
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Self Service Management Console
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-4">
                    You can view all self service changes for your system and
                    can sort them by any of the column headings. To see greater
                    detail for a self service change, click on its link in the
                    Title column.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/admin-console/self-service/create">
                    <Button className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white px-6">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Create Self Service Change
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="border-[#EE5A37] text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white px-6"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* No Self Service Change Card - Matching Organization Panel Style */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-medium text-base mb-2 text-gray-900">
                      No Self Service Change found.
                    </h2>
                    <p className="text-sm text-gray-600">
                      No self service changes were found that met your criteria.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-6 mt-12">
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  <strong>LEGAL DISCLAIMER:</strong> By utilizing this
                  self-service Change Management Console, you acknowledge that
                  you have received the required training for the Console and
                  are authorized by your company to access and use the Console
                  in accordance with your company's instructions.
                </p>
                <p>
                  Cadient Talent disclaims any responsibility or liability for
                  any content or modifications created through the use of the
                  Console.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href="/help"
                    className="text-[#EE5A37] hover:underline text-xs"
                  >
                    Help
                  </Link>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Copyright © 2000 - 2025 by Cadient LLC. All rights
                      reserved.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      U. S. Patents 7,080,057; 7,310,626; 7,558,767; 7,562,059;
                      7,472,097; 7,606,778; 8,086,558 and 8,046,251.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Modal Popup */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Search Options
                  </h3>
                  <Button
                    onClick={() => setShowFilters(false)}
                    variant="outline"
                    size="sm"
                  >
                    <svg
                      className="w-4 h-4"
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
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* View Options */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      View:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="mine-only-modal"
                          name="view-modal"
                          value="mine-only"
                          checked={viewOption === "mine-only"}
                          onChange={(e) => setViewOption(e.target.value)}
                          className="mr-3 text-[#EE5A37] focus:ring-[#EE5A37]"
                        />
                        <label
                          htmlFor="mine-only-modal"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Mine Only
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="all-users-modal"
                          name="view-modal"
                          value="all-users"
                          checked={viewOption === "all-users"}
                          onChange={(e) => setViewOption(e.target.value)}
                          className="mr-3 text-[#EE5A37] focus:ring-[#EE5A37]"
                        />
                        <label
                          htmlFor="all-users-modal"
                          className="text-sm text-[#EE5A37] hover:text-[#d14d2a] hover:underline cursor-pointer"
                        >
                          All Users
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Status Options */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Statuses:
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          id: "all-statuses",
                          label: "All Statuses",
                          isDefault: true,
                        },
                        { id: "approved", label: "Approved" },
                        { id: "archived", label: "Archived" },
                        { id: "deployed", label: "Deployed" },
                        { id: "in-preview", label: "In-Preview" },
                        { id: "in-progress", label: "In-Progress" },
                        { id: "pending-approval", label: "Pending Approval" },
                        { id: "rejected", label: "Rejected" },
                        { id: "verified", label: "Verified" },
                      ].map((status) => (
                        <div key={status.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${status.id}-modal`}
                            checked={selectedStatuses.includes(status.id)}
                            onChange={() => handleStatusChange(status.id)}
                            className="mr-3 text-[#EE5A37] focus:ring-[#EE5A37]"
                          />
                          <label
                            htmlFor={`${status.id}-modal`}
                            className={`text-sm cursor-pointer ${
                              status.isDefault
                                ? "text-gray-700"
                                : "text-[#EE5A37] hover:text-[#d14d2a] hover:underline"
                            }`}
                          >
                            {status.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <Button
                      className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white px-6"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setViewOption("mine-only");
                        setSelectedStatuses(["all-statuses"]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
