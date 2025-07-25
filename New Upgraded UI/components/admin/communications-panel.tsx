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

interface CommunicationsSection {
  id: string;
  title: string;
  description: string;
  items: CommunicationsItem[];
  bgColor: string;
}

interface CommunicationsItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  hasConfig?: boolean;
}

const communicationsSections: CommunicationsSection[] = [
  {
    id: "messages",
    title: "Messages",
    description: "Manage email and text message templates",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "base-product-messages",
        title: "Base Product Messages",
        description:
          "Access and modify the emails and texts that originally shipped with the product.",
        href: "/admin-console/messaging/base-product-messages",
      },
      {
        id: "custom-message-templates",
        title: "Custom Message Templates",
        description:
          "Create/manage email and text templates for use by the system or any users of the system.",
        href: "/admin-console/messaging/custom-message-templates",
      },
      {
        id: "base-product-text-messages",
        title: "Base Product Text Messages",
        description:
          "Access and modify the standalone text templates that originally shipped with the product.",
        href: "/admin-console/messaging/base-product-text-messages",
      },
    ],
  },
  {
    id: "on-screen",
    title: "On-Screen",
    description: "Manage on-screen messages and promotions",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "promotion-module",
        title: "Promotion Module",
        description:
          "Create and update the promotion message for each career site.",
        href: "/admin-console/messaging/promotion-module",
      },
      {
        id: "location-specific-messages",
        title: "Location Specific Messages",
        description:
          "Create and manage location specific messages for emails and career sites.",
        href: "/admin-console/messaging/location-specific-messages",
      },
      {
        id: "admin-module-services-user",
        title: "Admin Module for Services User",
        description:
          "As a Services User, create Base Product Templates and Application Page Location Specific Messages for different applications.",
        href: "/admin-console/messaging/admin-module-services-user",
      },
      {
        id: "hmc-messages",
        title: "HMC Messages",
        description: "Create and update the Message for the HMC users.",
        href: "/admin-console/messaging/hmc-messages",
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

export default function CommunicationsPanel() {
  // State for toggle switches
  const [positionNotificationEnabled, setPositionNotificationEnabled] =
    useState(true);
  const [requisitionNotificationEnabled, setRequisitionNotificationEnabled] =
    useState(false);

  // State for configuration dialogs
  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);
  const [isRequisitionDialogOpen, setIsRequisitionDialogOpen] = useState(false);
  const [isPositionAuditDialogOpen, setIsPositionAuditDialogOpen] =
    useState(false);
  const [isRequisitionAuditDialogOpen, setIsRequisitionAuditDialogOpen] =
    useState(false);

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for user type selections
  const [positionSelectedUserTypes, setPositionSelectedUserTypes] = useState<
    string[]
  >(["Sales Demo Retail Omega Recruiter", "SD Hybrid Recruiter"]);
  const [requisitionSelectedUserTypes, setRequisitionSelectedUserTypes] =
    useState<string[]>([
      "Sales Demo Retail Omega Recruiter",
      "SD Hybrid Recruiter",
    ]);

  const handleUserTypeChange = (
    userType: string,
    checked: boolean,
    isPosition: boolean
  ) => {
    if (isPosition) {
      if (checked) {
        setPositionSelectedUserTypes([...positionSelectedUserTypes, userType]);
      } else {
        setPositionSelectedUserTypes(
          positionSelectedUserTypes.filter((type) => type !== userType)
        );
      }
    } else {
      if (checked) {
        setRequisitionSelectedUserTypes([
          ...requisitionSelectedUserTypes,
          userType,
        ]);
      } else {
        setRequisitionSelectedUserTypes(
          requisitionSelectedUserTypes.filter((type) => type !== userType)
        );
      }
    }
  };

  const handleSelectAll = (isPosition: boolean) => {
    if (isPosition) {
      setPositionSelectedUserTypes([...userTypes]);
    } else {
      setRequisitionSelectedUserTypes([...userTypes]);
    }
  };

  const handleDeselectAll = (isPosition: boolean) => {
    if (isPosition) {
      setPositionSelectedUserTypes([]);
    } else {
      setRequisitionSelectedUserTypes([]);
    }
  };

  const handleSave = (isPosition: boolean) => {
    // Close the dialog
    if (isPosition) {
      setIsPositionDialogOpen(false);
    } else {
      setIsRequisitionDialogOpen(false);
    }

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

      {/* Communications Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Communications
        </h2>

        {/* Messages */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
            <div>
              <Link
                href="/admin-console/messaging/base-product-messages"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Base Product Messages
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Access and modify the emails and texts that originally shipped
                with the product.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/messaging/custom-message-templates"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Custom Message Templates
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Create/manage email and text templates for use by the system or
                any users of the system.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/messaging/base-product-text-messages"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Base Product Text Messages
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Access and modify the standalone text templates that originally
                shipped with the product.
              </p>
            </div>

            {/* Application Notifications */}
            <div className="space-y-4 mt-6">
              {/* Application Notification (Position-based) */}
              <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                      Application Notification (Position-based)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Allow users to enable e-mail notification for
                      applications.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                      onClick={() => setIsPositionDialogOpen(true)}
                    >
                      Configure
                    </Button>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          positionNotificationEnabled
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setPositionNotificationEnabled(
                            !positionNotificationEnabled
                          )
                        }
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            positionNotificationEnabled
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {positionNotificationEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Notification (Requisition-based) */}
              <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                      Application Notification (Requisition-based)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Allow users to enable e-mail notification for
                      applications.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                      onClick={() => setIsRequisitionDialogOpen(true)}
                    >
                      Configure
                    </Button>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          requisitionNotificationEnabled
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setRequisitionNotificationEnabled(
                            !requisitionNotificationEnabled
                          )
                        }
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            requisitionNotificationEnabled
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {requisitionNotificationEnabled
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* On-Screen */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">On-Screen</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
            <div>
              <Link
                href="/admin-console/messaging/promotion-module"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Promotion Module
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Create and update the promotion message for each career site.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/messaging/location-specific-messages"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Location Specific Messages
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Create and manage location specific messages for emails and
                career sites.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/messaging/admin-module-services-user"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Admin Module for Services User
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                As a Services User, create Base Product Templates and
                Application Page Location Specific Messages for different
                applications.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/messaging/hmc-messages"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                HMC Messages
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Create and update the Message for the HMC users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Notification (Position-based) Configuration Dialog */}
      <Dialog
        open={isPositionDialogOpen}
        onOpenChange={setIsPositionDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Application Notification (Position-based)
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Allow users to enable e-mail notification for applications.
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
                      Not in use
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
                    onClick={() => setIsPositionAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Administrator TestAdminLN
                    </div>
                    <div className="text-xs text-gray-500">
                      02 February 2022 (1:36 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Configuration Options</h3>
                <div className="flex items-center gap-4">
                  {/* Select All */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        positionSelectedUserTypes.length === userTypes.length
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleSelectAll(true)}
                    >
                      {positionSelectedUserTypes.length ===
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
                    <span className="text-sm text-gray-700">Select All</span>
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
                        positionSelectedUserTypes.length === 0
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleDeselectAll(true)}
                    >
                      {positionSelectedUserTypes.length === 0 && (
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
                    <span className="text-sm text-gray-700">Deselect All</span>
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
                Choose which types of users will be able to use this feature.
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
                            positionSelectedUserTypes.includes(userType)
                              ? "border-[#EE5A37] bg-[#EE5A37]"
                              : "border-gray-400"
                          }`}
                          onClick={() =>
                            handleUserTypeChange(
                              userType,
                              !positionSelectedUserTypes.includes(userType),
                              true
                            )
                          }
                        >
                          {positionSelectedUserTypes.includes(userType) && (
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
                            positionSelectedUserTypes.includes(userType)
                              ? "border-[#EE5A37] bg-[#EE5A37]"
                              : "border-gray-400"
                          }`}
                          onClick={() =>
                            handleUserTypeChange(
                              userType,
                              !positionSelectedUserTypes.includes(userType),
                              true
                            )
                          }
                        >
                          {positionSelectedUserTypes.includes(userType) && (
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
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsPositionDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSave(true)}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Application Notification (Requisition-based) Configuration Dialog */}
      <Dialog
        open={isRequisitionDialogOpen}
        onOpenChange={setIsRequisitionDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Application Notification (Requisition-based)
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Allow users to enable e-mail notification for applications.
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
                      Not in use
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
                    onClick={() => setIsRequisitionAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Administrator TestAdminLN
                    </div>
                    <div className="text-xs text-gray-500">
                      02 February 2022 (1:36 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Configuration Options</h3>
                <div className="flex items-center gap-4">
                  {/* Select All */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        requisitionSelectedUserTypes.length === userTypes.length
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleSelectAll(false)}
                    >
                      {requisitionSelectedUserTypes.length ===
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
                    <span className="text-sm text-gray-700">Select All</span>
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
                        requisitionSelectedUserTypes.length === 0
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleDeselectAll(false)}
                    >
                      {requisitionSelectedUserTypes.length === 0 && (
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
                    <span className="text-sm text-gray-700">Deselect All</span>
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
                Choose which types of users will be able to use this feature.
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
                            requisitionSelectedUserTypes.includes(userType)
                              ? "border-[#EE5A37] bg-[#EE5A37]"
                              : "border-gray-400"
                          }`}
                          onClick={() =>
                            handleUserTypeChange(
                              userType,
                              !requisitionSelectedUserTypes.includes(userType),
                              false
                            )
                          }
                        >
                          {requisitionSelectedUserTypes.includes(userType) && (
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
                            requisitionSelectedUserTypes.includes(userType)
                              ? "border-[#EE5A37] bg-[#EE5A37]"
                              : "border-gray-400"
                          }`}
                          onClick={() =>
                            handleUserTypeChange(
                              userType,
                              !requisitionSelectedUserTypes.includes(userType),
                              false
                            )
                          }
                        >
                          {requisitionSelectedUserTypes.includes(userType) && (
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
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsRequisitionDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSave(false)}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Position-based Audit Details Dialog */}
      <Dialog
        open={isPositionAuditDialogOpen}
        onOpenChange={setIsPositionAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          {/* Header */}
          <div className="p-6 pb-2 border-b border-gray-200 flex-shrink-0">
            <DialogTitle className="text-lg font-medium text-gray-900">
              Application Notification (Position-based)
            </DialogTitle>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6 py-2">
              <h2 className="text-lg font-medium text-gray-900">
                Feature Audit Details
              </h2>

              {/* First Audit Entry */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-3 py-2 rounded text-gray-900">
                  Pratham Jain made a change on 19 June 2025 (9:43 AM)
                </div>

                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="grid grid-cols-3 bg-red-50 border-b border-gray-200">
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Field
                    </div>
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Previous Value
                    </div>
                    <div className="p-3 font-medium text-center text-gray-900">
                      Modified Value
                    </div>
                  </div>

                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="p-3 border-r border-gray-200 text-gray-900">
                      Is feature enabled?
                    </div>
                    <div className="p-3 border-r border-gray-200 text-gray-900">
                      true
                    </div>
                    <div className="p-3 text-gray-900">false</div>
                  </div>
                </div>
              </div>

              {/* Second Audit Entry */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-3 py-2 rounded text-gray-900">
                  Pratham Jain made a change on 19 June 2025 (9:42 AM)
                </div>

                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="grid grid-cols-3 bg-red-50 border-b border-gray-200">
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Field
                    </div>
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Previous Value
                    </div>
                    <div className="p-3 font-medium text-center text-gray-900">
                      Modified Value
                    </div>
                  </div>

                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="p-3 border-r border-gray-200 text-gray-900">
                      Is feature enabled?
                    </div>
                    <div className="p-3 border-r border-gray-200 text-gray-500 italic">
                      &lt;System variable not configured&gt;
                    </div>
                    <div className="p-3 text-gray-900">true</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Requisition-based Audit Details Dialog */}
      <Dialog
        open={isRequisitionAuditDialogOpen}
        onOpenChange={setIsRequisitionAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
          {/* Header */}
          <div className="p-6 pb-2 border-b border-gray-200 flex-shrink-0">
            <DialogTitle className="text-lg font-medium text-gray-900">
              Application Notification (Requisition-based)
            </DialogTitle>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6 py-2">
              <h2 className="text-lg font-medium text-gray-900">
                Feature Audit Details
              </h2>

              {/* First Audit Entry */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-3 py-2 rounded text-gray-900">
                  Pratham Jain made a change on 19 June 2025 (9:43 AM)
                </div>

                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="grid grid-cols-3 bg-red-50 border-b border-gray-200">
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Field
                    </div>
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Previous Value
                    </div>
                    <div className="p-3 font-medium text-center text-gray-900">
                      Modified Value
                    </div>
                  </div>

                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="p-3 border-r border-gray-200 text-gray-900">
                      Is feature enabled?
                    </div>
                    <div className="p-3 border-r border-gray-200 text-gray-900">
                      true
                    </div>
                    <div className="p-3 text-gray-900">false</div>
                  </div>
                </div>
              </div>

              {/* Second Audit Entry */}
              <div className="space-y-4">
                <div className="bg-gray-100 px-3 py-2 rounded text-gray-900">
                  Pratham Jain made a change on 19 June 2025 (9:42 AM)
                </div>

                <div className="border border-gray-200 rounded overflow-hidden">
                  <div className="grid grid-cols-3 bg-red-50 border-b border-gray-200">
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Field
                    </div>
                    <div className="p-3 font-medium text-center border-r border-gray-200 text-gray-900">
                      Previous Value
                    </div>
                    <div className="p-3 font-medium text-center text-gray-900">
                      Modified Value
                    </div>
                  </div>

                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="p-3 border-r border-gray-200 text-gray-900">
                      Is feature enabled?
                    </div>
                    <div className="p-3 border-r border-gray-200 text-gray-500 italic">
                      &lt;System variable not configured&gt;
                    </div>
                    <div className="p-3 text-gray-900">true</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
