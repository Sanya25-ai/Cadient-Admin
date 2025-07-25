"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

interface SearchBehaviorSection {
  id: string;
  title: string;
  description: string;
  items: SearchBehaviorItem[];
  bgColor: string;
}

interface SearchBehaviorItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  hasConfig?: boolean;
}

const searchBehaviorSections: SearchBehaviorSection[] = [
  {
    id: "availability-matching",
    title: "Availability Matching",
    description: "Configure availability matching settings",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "availability-matching-tool",
        title: "Availability Matching Tool",
        description: "Create Timeframes for Availability Matching.",
        href: "/admin-console/search-behavior/availability-matching-tool",
      },
      {
        id: "availability-timeframe-import",
        title: "Availability Timeframe Import",
        description: "Upload Availability Timeframes.",
        href: "/admin-console/search-behavior/availability-timeframe-import",
      },
      {
        id: "availability-matching-config",
        title: "Availability Matching",
        description:
          "Allow Administrator to control Availability Matching settings.",
        hasConfig: true,
      },
      {
        id: "availability-matching-requisitions",
        title: "Availability Matching for Requisitions",
        description:
          "Allow users to configure enhanced availability tools for requisitions. The system will highlight candidates that match preferred times.",
        hasConfig: true,
      },
      {
        id: "availability-timeframe-management",
        title: "Availability Timeframe Management",
        description: "Allow users to create, edit, and import timeframes.",
        hasConfig: true,
      },
      {
        id: "show-applicant-availability-hover",
        title: "Show Applicant Availability on Hover",
        description:
          'Show applicant\'s "Applicant Availability" text in the HMC grid hover.',
        hasConfig: true,
      },
    ],
  },
  {
    id: "search",
    title: "Search",
    description: "Configure search functionality and features",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "abbreviate-hiring-step",
        title: "Abbreviate Hiring Step",
        description:
          "Abbreviate the Hiring Step you return to display only the current in-process step(s).",
        hasConfig: true,
      },
      {
        id: "advanced-search",
        title: "Advanced Search",
        description: "Allow access to Advanced Search feature.",
        hasConfig: true,
      },
      {
        id: "expired-applications",
        title: "Expired Applications",
        description: "Hide expired applications for all selected user roles.",
        hasConfig: true,
      },
      {
        id: "veteran-status-icon-display",
        title: "Veteran Status Icon Display",
        description: "Allow access to Veteran Status Icon feature.",
        hasConfig: true,
      },
    ],
  },
  {
    id: "enhanced-bookmarks",
    title: "Enhanced Bookmarks",
    description: "Configure bookmark functionality",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "enhanced-bookmarks-config",
        title: "Enhanced Bookmarks",
        description: "Allow users to configure Enhanced Bookmark settings.",
        hasConfig: true,
      },
      {
        id: "bookmark-step-configuration-tool",
        title: "Bookmark Step Configuration Tool",
        description: "Configure Bookmark category for different roles.",
        href: "/admin-console/search-behavior/bookmark-step-configuration",
      },
    ],
  },
  {
    id: "tagging",
    title: "Tagging",
    description: "Configure tagging functionality",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "add-remove-tag",
        title: "Add/Remove Tag",
        description:
          "Allow users to add tags to the HMC, along tags from the HMC, and edit existing tags.",
        hasConfig: true,
      },
      {
        id: "add-remove-tag-applicant",
        title: "Add/Remove Tag from Applicant",
        description:
          "Allow users to add tags to and remove tags from applicants/candidates.",
        hasConfig: true,
      },
      {
        id: "view-tags",
        title: "View Tags",
        description:
          "Allow users to view the tags Management tool and the tags associated to records on the HMC grids and ADR.",
        hasConfig: true,
      },
    ],
  },
  {
    id: "data-management-service-portal",
    title: "Data Management Service (portal)",
    description: "Configure data management services",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "data-management-service-portal-config",
        title: "Data Management Service (portal)",
        description: "View Data Management Service.",
        href: "/admin-console/search-behavior/data-management-service",
      },
    ],
  },
];

const userTypes = [
  "Calendar Integration Interview Scheduling",
  "Regional Manager Organizer",
  "Sales Demo Retail Omega Approver",
  "Sales Demo Retail Omega eQuest Manager",
  "Sales Demo Retail Omega Hiring Manager",
  "Sales Demo Retail Omega Hiring Manager Everly",
  "Sales Demo Retail Omega Hourly Recruiter",
  "Sales Demo Retail Omega Hourly Recruiter Everly",
  "Sales Demo Retail Omega Hourly System Admin",
  "Sales Demo Retail Omega Recruiter",
  "Sales Demo Retail Omega Recruiter Everly",
  "Sales Demo Retail Omega System Admin",
  "SD Hybrid Recruiter",
  "SELF USER ASSOCIATION",
  "Workforce Hiring Analytics",
  "Workforce Hiring Analytics - Advanced",
  "Workforce Hiring Analytics - Legal",
  "Workforce Hiring Analytics - Requisition",
];

export default function SearchBehaviorPanel() {
  // State for toggle switches - all disabled by default
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "availability-matching-config": false,
    "availability-matching-requisitions": false,
    "availability-timeframe-management": false,
    "show-applicant-availability-hover": false,
    "abbreviate-hiring-step": false,
    "advanced-search": false,
    "expired-applications": false,
    "veteran-status-icon-display": false,
    "enhanced-bookmarks-config": false,
    "add-remove-tag": false,
    "add-remove-tag-applicant": false,
    "view-tags": false,
  });

  // State for configuration dialogs
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({});
  const [auditDialogStates, setAuditDialogStates] = useState<
    Record<string, boolean>
  >({});

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for user type selections
  const [selectedUserTypes, setSelectedUserTypes] = useState<
    Record<string, string[]>
  >({
    "availability-matching-config": [
      "Sales Demo Retail Omega Hourly Recruiter Everly",
      "Sales Demo Retail Omega Hiring Manager Everly",
      "Sales Demo Retail Omega Hourly System Admin",
      "Sales Demo Retail Omega eQuest Manager",
      "Sales Demo Retail Omega Recruiter",
      "Sales Demo Retail Omega Hiring Manager",
    ],
  });

  // State for radio button selections
  const [radioSelections, setRadioSelections] = useState<
    Record<string, string>
  >({
    "availability-matching-requisitions": "enable",
    "abbreviate-hiring-step": "enable",
    "expired-applications": "disable",
    "enhanced-bookmarks-config": "enable",
  });

  const handleRadioChange = (itemId: string, value: string) => {
    setRadioSelections((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleToggleChange = (itemId: string, checked: boolean) => {
    setToggleStates((prev) => ({ ...prev, [itemId]: checked }));
  };

  const handleDialogOpen = (itemId: string) => {
    setDialogStates((prev) => ({ ...prev, [itemId]: true }));
  };

  const handleDialogClose = (itemId: string) => {
    setDialogStates((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleSave = (itemId: string) => {
    // Close the dialog
    setDialogStates((prev) => ({ ...prev, [itemId]: false }));

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const handleAuditDialogOpen = (itemId: string) => {
    setAuditDialogStates((prev) => ({ ...prev, [itemId]: true }));
  };

  const handleAuditDialogClose = (itemId: string) => {
    setAuditDialogStates((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleUserTypeChange = (
    itemId: string,
    userType: string,
    checked: boolean
  ) => {
    setSelectedUserTypes((prev) => {
      const current = prev[itemId] || [];
      if (checked) {
        return { ...prev, [itemId]: [...current, userType] };
      } else {
        return {
          ...prev,
          [itemId]: current.filter((type) => type !== userType),
        };
      }
    });
  };

  const handleSelectAll = (itemId: string) => {
    setSelectedUserTypes((prev) => ({ ...prev, [itemId]: [...userTypes] }));
  };

  const handleDeselectAll = (itemId: string) => {
    setSelectedUserTypes((prev) => ({ ...prev, [itemId]: [] }));
  };

  const getFeatureStatus = (itemId: string) => {
    return toggleStates[itemId]
      ? "This feature is in use."
      : "This feature is not in use.";
  };

  return (
    <div className="space-y-3">
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

      {/* Search Behavior Sections */}
      <div className="space-y-6">
        {searchBehaviorSections.map((section) => (
          <div key={section.id} className="space-y-0">
            {/* Section Header */}
            <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>

            {/* Section Items */}
            <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  {item.href ? (
                    <div>
                      <Link
                        href={item.href}
                        className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-700 mt-1">
                        {item.description}
                      </p>
                    </div>
                  ) : (
                    <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                            onClick={() => handleDialogOpen(item.id)}
                          >
                            Configure
                          </Button>
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                toggleStates[item.id]
                                  ? "bg-orange-500"
                                  : "bg-gray-200"
                              }`}
                              onClick={() =>
                                handleToggleChange(
                                  item.id,
                                  !toggleStates[item.id]
                                )
                              }
                            >
                              <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  toggleStates[item.id]
                                    ? "translate-x-4"
                                    : "translate-x-0"
                                }`}
                              />
                            </div>
                            <span className="text-xs text-gray-600">
                              {toggleStates[item.id] ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Dialogs */}
      {searchBehaviorSections.map((section) =>
        section.items
          .filter((item) => item.hasConfig)
          .map((item) => (
            <Dialog
              key={`dialog-${item.id}`}
              open={dialogStates[item.id] || false}
              onOpenChange={() => handleDialogClose(item.id)}
            >
              <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
                <DialogHeader className="border-b border-gray-200 pb-2">
                  <DialogTitle className="text-lg font-medium">
                    {item.title}
                    <div className="text-xs font-normal text-gray-600 mt-0.5">
                      {item.description}
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                  {/* Check if this is one of the items that should use the organization page style */}
                  {[
                    "availability-matching-config",
                    "availability-timeframe-management",
                    "show-applicant-availability-hover",
                    "advanced-search",
                    "veteran-status-icon-display",
                    "add-remove-tag",
                    "add-remove-tag-applicant",
                    "view-tags",
                  ].includes(item.id) ? (
                    /* Organization page style - Feature Status and Audit Info */
                    <div className="grid grid-cols-2 gap-6">
                      {/* Feature Status */}
                      <div className="bg-[#EE5A37] bg-opacity-[0.08] p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-[#EE5A37]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-sm font-semibold text-black">
                            Feature Status
                          </h3>
                        </div>
                        <div className="rounded p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-[#EE5A37] rounded-full"></div>
                            <span className="text-sm font-medium text-gray-800">
                              {toggleStates[item.id] ? "In use" : "Not in use"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Audit Info */}
                      <div className="bg-[#EE5A37] bg-opacity-[0.08] p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-[#EE5A37]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-black">
                              Audit Info
                            </h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs text-[#EE5A37] border-transparent bg-white hover:bg-[#EE5A37] hover:text-white transition-colors px-2 py-1 h-7"
                            onClick={() => handleAuditDialogOpen(item.id)}
                          >
                            View All Details
                          </Button>
                        </div>
                        <div className="rounded p-2 space-y-1">
                          {item.id === "expired-applications" ? (
                            <div className="text-sm text-gray-600">
                              No Audit Records found.
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-sm text-gray-900">
                                  Administrator TestAdminLN
                                </div>
                                <div className="text-xs text-gray-500">
                                  12 May 2020 (1:23 PM)
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : [
                      "availability-matching-requisitions",
                      "abbreviate-hiring-step",
                      "expired-applications",
                      "enhanced-bookmarks-config",
                    ].includes(item.id) ? (
                    /* Internal Position Names style for specified items */
                    <div className="grid grid-cols-2 gap-6">
                      {/* Feature Status */}
                      <div className="bg-[#EE5A37] bg-opacity-[0.08] p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-[#EE5A37]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-sm font-semibold text-black">
                            Feature Status
                          </h3>
                        </div>
                        <div className="rounded p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-[#EE5A37] rounded-full"></div>
                            <span className="text-sm font-medium text-gray-800">
                              {toggleStates[item.id] ? "In use" : "Not in use"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Audit Info */}
                      <div className="bg-[#EE5A37] bg-opacity-[0.08] p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-[#EE5A37]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-black">
                              Audit Info
                            </h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs text-[#EE5A37] border-transparent bg-white hover:bg-[#EE5A37] hover:text-white transition-colors px-2 py-1 h-7"
                            onClick={() => handleAuditDialogOpen(item.id)}
                          >
                            View All Details
                          </Button>
                        </div>
                        <div className="rounded p-2 space-y-1">
                          {item.id === "expired-applications" ? (
                            <div className="text-sm text-gray-600">
                              No Audit Records found.
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-sm text-gray-900">
                                  Administrator TestAdminLN
                                </div>
                                <div className="text-xs text-gray-500">
                                  12 May 2020 (1:23 PM)
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Original style for other items */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Feature Status */}
                      <div className="bg-slate-700 text-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              📋
                            </span>
                          </div>
                          <h3 className="font-medium text-orange-400">
                            Feature Status
                          </h3>
                        </div>
                        <div className="border-b border-orange-400 mb-3"></div>
                        <p className="text-sm">{getFeatureStatus(item.id)}</p>
                      </div>

                      {/* Audit Info */}
                      <div className="bg-slate-700 text-white p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                📊
                              </span>
                            </div>
                            <h3 className="font-medium text-orange-400">
                              Audit Info
                            </h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-white"
                            onClick={() => handleAuditDialogOpen(item.id)}
                          >
                            view all details
                          </Button>
                        </div>
                        <div className="border-b border-orange-400 mb-3"></div>
                        <div className="space-y-2 text-sm">
                          {item.id === "expired-applications" ? (
                            <div>No Audit Records found.</div>
                          ) : (
                            <div>
                              <strong>Administrator TestAdminLN</strong>
                              <br />
                              12 May 2020 (1:23 PM)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Configuration Options */}
                  {[
                    "availability-matching-config",
                    "availability-timeframe-management",
                    "show-applicant-availability-hover",
                    "advanced-search",
                    "veteran-status-icon-display",
                    "add-remove-tag",
                    "add-remove-tag-applicant",
                    "view-tags",
                  ].includes(item.id) ? (
                    /* Organization page style configuration */
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">
                          Configuration Options
                        </h3>
                        <div className="flex items-center gap-4">
                          {/* Select All */}
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                                (selectedUserTypes[item.id] || []).length ===
                                userTypes.length
                                  ? "border-[#EE5A37] bg-[#EE5A37]"
                                  : "border-gray-400"
                              }`}
                              onClick={() => handleSelectAll(item.id)}
                            >
                              {(selectedUserTypes[item.id] || []).length ===
                                userTypes.length && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
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
                              )}
                            </div>
                            <span className="text-sm text-gray-700">
                              Select All
                            </span>
                            <div className="relative group">
                              <svg
                                className="w-4 h-4 text-gray-400 cursor-help"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                To enable feature for all types of users
                                <div className="absolute top-full right-2 border-4 border-transparent border-t-gray-800"></div>
                              </div>
                            </div>
                          </div>

                          {/* Deselect All */}
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                                (selectedUserTypes[item.id] || []).length === 0
                                  ? "border-[#EE5A37] bg-[#EE5A37]"
                                  : "border-gray-400"
                              }`}
                              onClick={() => handleDeselectAll(item.id)}
                            >
                              {(selectedUserTypes[item.id] || []).length ===
                                0 && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
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
                              )}
                            </div>
                            <span className="text-sm text-gray-700">
                              Deselect All
                            </span>
                            <div className="relative group">
                              <svg
                                className="w-4 h-4 text-gray-400 cursor-help"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                To disable feature for all types of users
                                <div className="absolute top-full right-2 border-4 border-transparent border-t-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-4">
                        Choose which types of users will be able to use this
                        feature.
                      </p>

                      {/* User Types Grid */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          {userTypes
                            .slice(0, Math.ceil(userTypes.length / 2))
                            .map((userType) => (
                              <div
                                key={userType}
                                className="flex items-start space-x-3"
                              >
                                <div
                                  className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                                    (selectedUserTypes[item.id] || []).includes(
                                      userType
                                    )
                                      ? "border-[#EE5A37] bg-[#EE5A37]"
                                      : "border-gray-400"
                                  }`}
                                  onClick={() => {
                                    handleUserTypeChange(
                                      item.id,
                                      userType,
                                      !(
                                        selectedUserTypes[item.id] || []
                                      ).includes(userType)
                                    );
                                  }}
                                >
                                  {(selectedUserTypes[item.id] || []).includes(
                                    userType
                                  ) && (
                                    <svg
                                      className="w-2.5 h-2.5 text-white"
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
                                  )}
                                </div>
                                <Label className="text-sm text-gray-700 leading-5 cursor-pointer">
                                  {userType}
                                </Label>
                              </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {userTypes
                            .slice(Math.ceil(userTypes.length / 2))
                            .map((userType) => (
                              <div
                                key={userType}
                                className="flex items-start space-x-3"
                              >
                                <div
                                  className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                                    (selectedUserTypes[item.id] || []).includes(
                                      userType
                                    )
                                      ? "border-[#EE5A37] bg-[#EE5A37]"
                                      : "border-gray-400"
                                  }`}
                                  onClick={() => {
                                    handleUserTypeChange(
                                      item.id,
                                      userType,
                                      !(
                                        selectedUserTypes[item.id] || []
                                      ).includes(userType)
                                    );
                                  }}
                                >
                                  {(selectedUserTypes[item.id] || []).includes(
                                    userType
                                  ) && (
                                    <svg
                                      className="w-2.5 h-2.5 text-white"
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
                                  )}
                                </div>
                                <Label className="text-sm text-gray-700 leading-5 cursor-pointer">
                                  {userType}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : [
                      "availability-matching-requisitions",
                      "abbreviate-hiring-step",
                      "expired-applications",
                      "enhanced-bookmarks-config",
                    ].includes(item.id) ? (
                    /* Internal Position Names style for specified items */
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-4">
                        Configuration Options
                      </h3>
                      {item.id === "availability-matching-requisitions" && (
                        <p className="text-xs text-gray-600 mb-4">
                          This feature will enable/disable the configuration of
                          Availability Matching for Requisitions
                        </p>
                      )}
                      {item.id === "abbreviate-hiring-step" && (
                        <p className="text-xs text-gray-600 mb-4">
                          Enable/Disable Abbreviate Hiring Step feature
                        </p>
                      )}
                      {item.id === "enhanced-bookmarks-config" && (
                        <p className="text-xs text-gray-600 mb-4">
                          Enable/Disable Enhanced Bookmark Feature.
                        </p>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <input
                              type="radio"
                              id={`${item.id}-enable`}
                              name={`${item.id}-radio`}
                              value="enable"
                              checked={radioSelections[item.id] === "enable"}
                              onChange={(e) =>
                                handleRadioChange(item.id, e.target.value)
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                radioSelections[item.id] === "enable"
                                  ? "border-[#EE5A37]"
                                  : "border-gray-400"
                              }`}
                              onClick={() =>
                                handleRadioChange(item.id, "enable")
                              }
                            >
                              {radioSelections[item.id] === "enable" && (
                                <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                              )}
                            </div>
                          </div>
                          <Label
                            htmlFor={`${item.id}-enable`}
                            className="text-sm cursor-pointer"
                          >
                            {item.id === "expired-applications"
                              ? "Enable - Only selected users see expired applications"
                              : "Enable"}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <input
                              type="radio"
                              id={`${item.id}-disable`}
                              name={`${item.id}-radio`}
                              value="disable"
                              checked={radioSelections[item.id] === "disable"}
                              onChange={(e) =>
                                handleRadioChange(item.id, e.target.value)
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                radioSelections[item.id] === "disable"
                                  ? "border-[#EE5A37]"
                                  : "border-gray-400"
                              }`}
                              onClick={() =>
                                handleRadioChange(item.id, "disable")
                              }
                            >
                              {radioSelections[item.id] === "disable" && (
                                <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                              )}
                            </div>
                          </div>
                          <Label
                            htmlFor={`${item.id}-disable`}
                            className="text-sm cursor-pointer"
                          >
                            {item.id === "expired-applications"
                              ? "Disable - All users see expired applications"
                              : "Disable"}
                          </Label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Original style for other items */
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">
                        Configuration Options
                      </h3>

                      {/* Default user type selection for other items */}
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose which types of users will be able to use this
                          feature.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-orange-500 text-white hover:bg-orange-600"
                            onClick={() => handleSelectAll(item.id)}
                          >
                            Select All
                          </Button>
                          <span className="text-sm text-muted-foreground self-center">
                            - to enable feature for all types of users
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-orange-500 text-white hover:bg-orange-600"
                            onClick={() => handleDeselectAll(item.id)}
                          >
                            Deselect All
                          </Button>
                          <span className="text-sm text-muted-foreground self-center">
                            - to disable feature for all types of users
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-300 p-3 rounded bg-white">
                          {userTypes.map((userType) => (
                            <div
                              key={userType}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`${item.id}-${userType}`}
                                checked={(
                                  selectedUserTypes[item.id] || []
                                ).includes(userType)}
                                onCheckedChange={(checked) =>
                                  handleUserTypeChange(
                                    item.id,
                                    userType,
                                    checked as boolean
                                  )
                                }
                              />
                              <Label
                                htmlFor={`${item.id}-${userType}`}
                                className="text-sm cursor-pointer"
                              >
                                {userType}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDialogClose(item.id)}
                    className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSave(item.id)}
                    className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))
      )}

      {/* Audit Details Dialogs */}
      {searchBehaviorSections.map((section) =>
        section.items
          .filter((item) => item.hasConfig)
          .map((item) => (
            <Dialog
              key={`audit-${item.id}`}
              open={auditDialogStates[item.id] || false}
              onOpenChange={() => handleAuditDialogClose(item.id)}
            >
              <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
                  <DialogTitle className="text-lg font-medium">
                    {item.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-4">
                  {/* Feature Audit Details */}
                  <div>
                    <h2 className="text-lg font-medium mb-4">
                      Feature Audit Details
                    </h2>

                    {/* First Audit Entry */}
                    <div className="mb-4">
                      <div className="bg-gray-100 p-3 rounded mb-2">
                        <span className="font-medium text-sm">
                          Pratham Jain made a change on 19 June 2025 (9:43 AM)
                        </span>
                      </div>

                      <div className="border rounded overflow-hidden">
                        <div className="grid grid-cols-3 bg-[#EE5A37] bg-opacity-[0.08] border-b">
                          <div className="p-3 font-medium text-center border-r">
                            Field
                          </div>
                          <div className="p-3 font-medium text-center border-r">
                            Previous Value
                          </div>
                          <div className="p-3 font-medium text-center">
                            Modified Value
                          </div>
                        </div>

                        <div className="grid grid-cols-3">
                          <div className="p-3 border-r">
                            <div className="text-sm">Is feature enabled?</div>
                          </div>
                          <div className="p-3 border-r">
                            <div className="font-medium">true</div>
                          </div>
                          <div className="p-3">
                            <div className="font-medium">false</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Second Audit Entry */}
                    <div className="mb-4">
                      <div className="bg-gray-100 p-3 rounded mb-2">
                        <span className="font-medium text-sm">
                          Pratham Jain made a change on 19 June 2025 (9:42 AM)
                        </span>
                      </div>

                      <div className="border rounded overflow-hidden">
                        <div className="grid grid-cols-3 bg-[#EE5A37] bg-opacity-[0.08] border-b">
                          <div className="p-3 font-medium text-center border-r">
                            Field
                          </div>
                          <div className="p-3 font-medium text-center border-r">
                            Previous Value
                          </div>
                          <div className="p-3 font-medium text-center">
                            Modified Value
                          </div>
                        </div>

                        <div className="grid grid-cols-3">
                          <div className="p-3 border-r">
                            <div className="text-sm">Is feature enabled?</div>
                          </div>
                          <div className="p-3 border-r">
                            <div className="font-medium text-gray-500 italic">
                              &lt;System variable not configured&gt;
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="font-medium">true</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
      )}
    </div>
  );
}
