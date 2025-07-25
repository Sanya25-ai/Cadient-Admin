"use client";

import { Button } from "@/components/ui/button";
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

interface HiringBehaviorSection {
  id: string;
  title: string;
  description: string;
  items: HiringBehaviorItem[];
  bgColor: string;
}

interface HiringBehaviorItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  hasConfig?: boolean;
}

const hiringBehaviorSections: HiringBehaviorSection[] = [
  {
    id: "applications",
    title: "Applications",
    description: "Manage application processing and candidate data",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "non-hire-ssn-updater",
        title: "Non-Hire SSN Updater",
        description:
          "The Non-Hire SSN tool blocks specific SSNs from applying to the system.",
        href: "/admin-console/nonhire-ssn-updater",
      },
      {
        id: "delete-applications",
        title: "Delete Applications",
        description: "Delete applications from the system.",
        href: "/admin-console/delete-job-seekers",
      },
      {
        id: "upload-xml",
        title: "Upload XML",
        description: "Upload XML feed to import General Apply candidates.",
        href: "/admin-console/candidate-import",
      },
      {
        id: "add-candidate",
        title: "Add a Candidate",
        description: 'Allow access to "Add a Candidate" feature.',
        hasConfig: true,
      },
      {
        id: "apply-with-linkedin",
        title: "Apply with LinkedIn",
        description:
          "Allow users to apply with LinkedIn. Use LinkedIn Profile functionality.",
        hasConfig: true,
      },
      {
        id: "candidate-import",
        title: "Candidate Import",
        description: "Configure candidate import for different sites.",
        hasConfig: true,
      },
    ],
  },
  {
    id: "prospect-linking",
    title: "Prospect Linking",
    description: "Manage prospect and candidate linking",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "prospect-guide-hmc",
        title: "Prospect Guide in HMC",
        description: "Allow access to the Prospect guide.",
        hasConfig: true,
      },
      {
        id: "prospect-seeker-sites",
        title: "Prospect in Seeker Sites",
        description:
          "Allow users to enable the Prospect feature in the external seeker sites they create.",
        hasConfig: true,
      },
    ],
  },
  {
    id: "interview",
    title: "Interview",
    description: "Configure interview scheduling and management",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "forwarded-interview-guide-pdf",
        title: "Forwarded Interview Guide PDF",
        description:
          "Allow HMC users to forward Interview Guides in PDF format.",
        hasConfig: true,
      },
      {
        id: "interview-schedule-home-page",
        title: "Interview Schedule Home Page",
        description:
          'Show access to HMC Interview Home Page Module. Only one Schedule Home page module can be enabled at a time. Enabling this module will automatically disable the "Schedule Event Home Page Module".',
        hasConfig: true,
      },
      {
        id: "interview-scheduling",
        title: "Interview Scheduling",
        description: "Allow access to HMC Interview Scheduling functionality.",
        hasConfig: true,
      },
      {
        id: "legacy-schedule-interview",
        title: "Legacy Schedule Interview",
        description: "Allow access to Legacy Schedule Interview functionality.",
        hasConfig: true,
      },
      {
        id: "printed-interview-guide-pdf",
        title: "Printed Interview Guide PDF",
        description: "Allow HMC users to print Interview Guides in PDF format.",
        hasConfig: true,
      },
      {
        id: "schedule-event-home-page-module",
        title: "Schedule Event Home Page Module",
        description:
          'Show access to HMC Schedule Event Home Page Module. Only one Schedule Home page module can be enabled at a time. Enabling this module will automatically disable the "Interview Schedule Home Page".',
        hasConfig: true,
      },
    ],
  },
  {
    id: "employment-application",
    title: "Employment Application",
    description: "Manage employment application processes",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "forwarded-employment-application-pdf",
        title: "Forwarded Employment Application PDF",
        description:
          "Allow HMC users to forward Employment Application in PDF format.",
        hasConfig: true,
      },
      {
        id: "printed-employment-application-pdf",
        title: "Printed Employment Application PDF",
        description:
          "Allow HMC users to print Employment Application in PDF format.",
        hasConfig: true,
      },
    ],
  },
  {
    id: "offer",
    title: "Offer",
    description: "Configure offer management and templates",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "workflow-script-library",
        title: "Workflow Script Library",
        description:
          "A Workflow Script is a set of questions that the Hiring Manager/Recruiter can answer in Application Detail section.",
        href: "/admin-console/workflow-script-library",
      },
      {
        id: "offer-templates",
        title: "Offer Template Library",
        description:
          "Create and update Offer Templates to be used by the Hiring Manager/Recruiters for preparing Offer Letters.",
        href: "/admin-console/offer-template-library",
      },
    ],
  },
  {
    id: "candidate-linking",
    title: "Candidate Linking",
    description: "Manage candidate linking and relationships",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "link-from-position-to-requisitions",
        title: "Link from Position to Requisitions",
        description:
          "Allow access to Link from Position to Requisition feature.",
        hasConfig: true,
      },
      {
        id: "link-from-requisition-to-position",
        title: "Link from Requisition to Position",
        description:
          "Allow access to Link from Requisition to Position feature.",
        hasConfig: true,
      },
      {
        id: "link-to-requisition",
        title: "Link to Requisition",
        description: "Allow access to Link to Requisition feature.",
        hasConfig: true,
      },
    ],
  },
  {
    id: "look-inside",
    title: "Look Inside",
    description: "Configure look inside functionality",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "look-inside-jobsites",
        title: "Look Inside Jobsites",
        description:
          "Allow access to optimized number of days and hiring criteria about job jobsites automatically at integrated sites.",
        hasConfig: true,
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

export default function HiringBehaviorPanel() {
  // State for toggle switches - all disabled by default
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "add-candidate": false,
    "apply-with-linkedin": false,
    "candidate-import": false,
    "prospect-guide-hmc": false,
    "prospect-seeker-sites": false,
    "forwarded-interview-guide-pdf": false,
    "interview-schedule-home-page": false,
    "interview-scheduling": false,
    "legacy-schedule-interview": false,
    "printed-interview-guide-pdf": false,
    "schedule-event-home-page-module": false,
    "forwarded-employment-application-pdf": false,
    "printed-employment-application-pdf": false,
    "link-from-position-to-requisitions": false,
    "link-from-requisition-to-position": false,
    "link-to-requisition": false,
    "look-inside-jobsites": false,
  });

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for configuration dialogs
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({});
  const [auditDialogStates, setAuditDialogStates] = useState<
    Record<string, boolean>
  >({});

  // State for user type selections
  const [selectedUserTypes, setSelectedUserTypes] = useState<
    Record<string, string[]>
  >({
    "add-candidate": [
      "Sales Demo Retail Omega Recruiter",
      "Sales Demo Retail Omega Recruiter Everly",
      "Sales Demo Retail Omega System Admin",
      "Sales Demo Retail Omega Hourly Recruiter",
      "Sales Demo Retail Omega Hourly Recruiter Everly",
      "Sales Demo Retail Omega Hourly System Admin",
      "SD Hybrid Recruiter",
    ],
  });

  // State for radio button selections
  const [radioSelections, setRadioSelections] = useState<
    Record<string, string>
  >({
    "apply-with-linkedin": "enable",
    "prospect-seeker-sites": "enable",
    "forwarded-interview-guide-pdf": "pdf",
    "printed-interview-guide-pdf": "pdf",
    "forwarded-employment-application-pdf": "disable",
    "printed-employment-application-pdf": "disable",
    "look-inside-jobsites": "disable",
  });

  // State for prospect seeker sites
  const [prospectSeekerSites, setProspectSeekerSites] = useState<
    Record<string, string>
  >({
    "canada-req": "disable",
    "non-req": "enable",
    "non-req-hirenow": "enable",
    req: "enable",
  });

  const handleRadioChange = (itemId: string, value: string) => {
    setRadioSelections((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleProspectSeekerSiteChange = (siteId: string, value: string) => {
    setProspectSeekerSites((prev) => ({ ...prev, [siteId]: value }));
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

  const handleSave = (itemId: string) => {
    console.log(`Configuration saved for ${itemId}`);

    // Close the dialog
    handleDialogClose(itemId);

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

  const getFeatureStatus = (itemId: string) => {
    if (
      [
        "forwarded-employment-application-pdf",
        "printed-employment-application-pdf",
        "look-inside-jobsites",
      ].includes(itemId)
    ) {
      return "This feature is not in use.";
    }
    return toggleStates[itemId]
      ? "This feature is in use."
      : "This feature is not in use.";
  };

  const getAuditUser = (itemId: string) => {
    if (itemId === "add-candidate") {
      return "Shirley Recruiter";
    }
    if (
      ["forwarded-interview-guide-pdf", "printed-interview-guide-pdf"].includes(
        itemId
      )
    ) {
      return "Shirley Recruiter";
    }
    return "Administrator TestAdminLN";
  };

  const getAuditDate = (itemId: string) => {
    if (itemId === "add-candidate") {
      return "14 May 2020 (10:52 AM)";
    }
    if (
      ["forwarded-interview-guide-pdf", "printed-interview-guide-pdf"].includes(
        itemId
      )
    ) {
      return "18 May 2020 (5:41 PM)";
    }
    return "12 May 2020 (1:23 PM)";
  };

  const getAuditInfo = (itemId: string) => {
    if (
      [
        "forwarded-employment-application-pdf",
        "printed-employment-application-pdf",
        "look-inside-jobsites",
      ].includes(itemId)
    ) {
      return "No Audit Records found.";
    }
    return (
      <div>
        <strong>{getAuditUser(itemId)}</strong>
        <br />
        {getAuditDate(itemId)}
      </div>
    );
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

      {/* HMC Hiring Behavior Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          HMC Hiring Behavior
        </h2>

        {/* Hiring Behavior Sections */}
        {hiringBehaviorSections.map((section) => (
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
      {hiringBehaviorSections.map((section) =>
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

                <div className="flex-1 overflow-y-auto space-y-6">
                  {/* Top Row - Feature Status and Audit Info */}
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
                            {getFeatureStatus(item.id).replace(
                              "This feature is ",
                              ""
                            )}
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
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm text-gray-900">
                            {getAuditUser(item.id)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getAuditDate(item.id)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Configuration Options */}
                  <div className="p-4">
                    {/* Special radio button configurations for specific items */}
                    {item.id === "apply-with-linkedin" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Enable/Disable Apply with LinkedIn Feature
                        </p>
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
                              Enable
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
                              Disable
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "prospect-seeker-sites" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Choose to enable the Prospect feature on the selected
                          seeker sites.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Sales Demo Retail Omega Canada Req External Seeker
                            </h4>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="canada-req-enable"
                                  name="canada-req-radio"
                                  value="enable"
                                  checked={
                                    prospectSeekerSites["canada-req"] ===
                                    "enable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "canada-req",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="canada-req-enable"
                                  className="text-sm cursor-pointer"
                                >
                                  Enable
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="canada-req-disable"
                                  name="canada-req-radio"
                                  value="disable"
                                  checked={
                                    prospectSeekerSites["canada-req"] ===
                                    "disable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "canada-req",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="canada-req-disable"
                                  className="text-sm cursor-pointer"
                                >
                                  Disable
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Sales Demo Retail Omega Non-Req External Seeker
                              Site
                            </h4>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="non-req-enable"
                                  name="non-req-radio"
                                  value="enable"
                                  checked={
                                    prospectSeekerSites["non-req"] === "enable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "non-req",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="non-req-enable"
                                  className="text-sm cursor-pointer"
                                >
                                  Enable
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="non-req-disable"
                                  name="non-req-radio"
                                  value="disable"
                                  checked={
                                    prospectSeekerSites["non-req"] === "disable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "non-req",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="non-req-disable"
                                  className="text-sm cursor-pointer"
                                >
                                  Disable
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Sales Demo Retail Omega Non-Req HireNow
                            </h4>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="non-req-hirenow-enable"
                                  name="non-req-hirenow-radio"
                                  value="enable"
                                  checked={
                                    prospectSeekerSites["non-req-hirenow"] ===
                                    "enable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "non-req-hirenow",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="non-req-hirenow-enable"
                                  className="text-sm cursor-pointer"
                                >
                                  Enable
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="non-req-hirenow-disable"
                                  name="non-req-hirenow-radio"
                                  value="disable"
                                  checked={
                                    prospectSeekerSites["non-req-hirenow"] ===
                                    "disable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "non-req-hirenow",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="non-req-hirenow-disable"
                                  className="text-sm cursor-pointer"
                                >
                                  Disable
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Sales Demo Retail Omega Req External Seeker Site
                            </h4>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="req-enable"
                                  name="req-radio"
                                  value="enable"
                                  checked={
                                    prospectSeekerSites["req"] === "enable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "req",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="req-enable"
                                  className="text-sm cursor-pointer"
                                >
                                  Enable
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="req-disable"
                                  name="req-radio"
                                  value="disable"
                                  checked={
                                    prospectSeekerSites["req"] === "disable"
                                  }
                                  onChange={(e) =>
                                    handleProspectSeekerSiteChange(
                                      "req",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600"
                                />
                                <Label
                                  htmlFor="req-disable"
                                  className="text-sm cursor-pointer"
                                >
                                  Disable
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "forwarded-interview-guide-pdf" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Choose type of format to be used for forwarding
                          Interview Guide
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="radio"
                                id={`${item.id}-pdf`}
                                name={`${item.id}-radio`}
                                value="pdf"
                                checked={radioSelections[item.id] === "pdf"}
                                onChange={(e) =>
                                  handleRadioChange(item.id, e.target.value)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  radioSelections[item.id] === "pdf"
                                    ? "border-[#EE5A37]"
                                    : "border-gray-400"
                                }`}
                              >
                                {radioSelections[item.id] === "pdf" && (
                                  <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                                )}
                              </div>
                            </div>
                            <Label
                              htmlFor={`${item.id}-pdf`}
                              className="text-sm cursor-pointer"
                            >
                              PDF
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="radio"
                                id={`${item.id}-pdf-html`}
                                name={`${item.id}-radio`}
                                value="pdf-html"
                                checked={
                                  radioSelections[item.id] === "pdf-html"
                                }
                                onChange={(e) =>
                                  handleRadioChange(item.id, e.target.value)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  radioSelections[item.id] === "pdf-html"
                                    ? "border-[#EE5A37]"
                                    : "border-gray-400"
                                }`}
                              >
                                {radioSelections[item.id] === "pdf-html" && (
                                  <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                                )}
                              </div>
                            </div>
                            <Label
                              htmlFor={`${item.id}-pdf-html`}
                              className="text-sm cursor-pointer"
                            >
                              PDF & HTML
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="radio"
                                id={`${item.id}-off-html`}
                                name={`${item.id}-radio`}
                                value="off-html"
                                checked={
                                  radioSelections[item.id] === "off-html"
                                }
                                onChange={(e) =>
                                  handleRadioChange(item.id, e.target.value)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  radioSelections[item.id] === "off-html"
                                    ? "border-[#EE5A37]"
                                    : "border-gray-400"
                                }`}
                              >
                                {radioSelections[item.id] === "off-html" && (
                                  <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                                )}
                              </div>
                            </div>
                            <Label
                              htmlFor={`${item.id}-off-html`}
                              className="text-sm cursor-pointer"
                            >
                              OFF (HTML)
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "printed-interview-guide-pdf" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Choose type of format to be used for printing
                          Interview Guide
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="radio"
                                id={`${item.id}-pdf`}
                                name={`${item.id}-radio`}
                                value="pdf"
                                checked={radioSelections[item.id] === "pdf"}
                                onChange={(e) =>
                                  handleRadioChange(item.id, e.target.value)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  radioSelections[item.id] === "pdf"
                                    ? "border-[#EE5A37]"
                                    : "border-gray-400"
                                }`}
                              >
                                {radioSelections[item.id] === "pdf" && (
                                  <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                                )}
                              </div>
                            </div>
                            <Label
                              htmlFor={`${item.id}-pdf`}
                              className="text-sm cursor-pointer"
                            >
                              PDF
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="radio"
                                id={`${item.id}-off-html`}
                                name={`${item.id}-radio`}
                                value="off-html"
                                checked={
                                  radioSelections[item.id] === "off-html"
                                }
                                onChange={(e) =>
                                  handleRadioChange(item.id, e.target.value)
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  radioSelections[item.id] === "off-html"
                                    ? "border-[#EE5A37]"
                                    : "border-gray-400"
                                }`}
                              >
                                {radioSelections[item.id] === "off-html" && (
                                  <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                                )}
                              </div>
                            </div>
                            <Label
                              htmlFor={`${item.id}-off-html`}
                              className="text-sm cursor-pointer"
                            >
                              OFF (HTML)
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "forwarded-employment-application-pdf" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Enable/Disable Forward Employment Application Feature
                        </p>
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
                              Enable
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
                              Disable
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "printed-employment-application-pdf" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Enable/Disable Print Employment Application Feature
                        </p>
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
                              Enable
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
                              Disable
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.id === "look-inside-jobsites" && (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-600 mb-4">
                          Enable/Disable Lock Unlock Feature
                        </p>
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
                              Enable
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
                              Disable
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Default user type selection for other items */}
                    {![
                      "apply-with-linkedin",
                      "prospect-seeker-sites",
                      "forwarded-interview-guide-pdf",
                      "printed-interview-guide-pdf",
                      "forwarded-employment-application-pdf",
                      "printed-employment-application-pdf",
                      "look-inside-jobsites",
                    ].includes(item.id) && (
                      <div className="space-y-4">
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
                                  (selectedUserTypes[item.id] || []).length ===
                                  0
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
                                      (
                                        selectedUserTypes[item.id] || []
                                      ).includes(userType)
                                        ? "border-[#EE5A37] bg-[#EE5A37]"
                                        : "border-gray-400"
                                    }`}
                                    onClick={() =>
                                      handleUserTypeChange(
                                        item.id,
                                        userType,
                                        !(
                                          selectedUserTypes[item.id] || []
                                        ).includes(userType)
                                      )
                                    }
                                  >
                                    {(
                                      selectedUserTypes[item.id] || []
                                    ).includes(userType) && (
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
                                      (
                                        selectedUserTypes[item.id] || []
                                      ).includes(userType)
                                        ? "border-[#EE5A37] bg-[#EE5A37]"
                                        : "border-gray-400"
                                    }`}
                                    onClick={() =>
                                      handleUserTypeChange(
                                        item.id,
                                        userType,
                                        !(
                                          selectedUserTypes[item.id] || []
                                        ).includes(userType)
                                      )
                                    }
                                  >
                                    {(
                                      selectedUserTypes[item.id] || []
                                    ).includes(userType) && (
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
                    )}
                  </div>
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
      {hiringBehaviorSections.map((section) =>
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
                          {getAuditUser(item.id)} made a change on{" "}
                          {getAuditDate(item.id)}
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

                        {/* Changes in Roles row - only for user type selection popups */}
                        {![
                          "apply-with-linkedin",
                          "prospect-seeker-sites",
                          "forwarded-interview-guide-pdf",
                          "printed-interview-guide-pdf",
                          "forwarded-employment-application-pdf",
                          "printed-employment-application-pdf",
                          "look-inside-jobsites",
                        ].includes(item.id) && (
                          <div className="grid grid-cols-3 border-t">
                            <div className="p-3 border-r">
                              <div className="text-sm">Changes in Roles</div>
                            </div>
                            <div className="p-3 border-r">
                              <div className="font-medium text-gray-500 italic">
                                &lt;Roles not configured&gt;
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="space-y-1 text-sm">
                                {item.id === "add-candidate" ? (
                                  <>
                                    <div>
                                      Sales Demo Retail Omega Hourly System
                                      Admin
                                    </div>
                                    <div>
                                      Sales Demo Retail Omega System Admin
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      Sales Demo Retail Omega Hourly Recruiter
                                      Everly
                                    </div>
                                    <div>
                                      Sales Demo Retail Omega Hiring Manager
                                      Everly
                                    </div>
                                    <div>
                                      Sales Demo Retail Omega Hourly System
                                      Admin
                                    </div>
                                    <div>
                                      Sales Demo Retail Omega eQuest Manager
                                    </div>
                                    <div>Sales Demo Retail Omega Recruiter</div>
                                    <div>
                                      Sales Demo Retail Omega Hiring Manager
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
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
