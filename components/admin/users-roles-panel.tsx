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
import { RadioGroup } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState } from "react";

interface UsersRolesSection {
  id: string;
  title: string;
  description: string;
  items: UsersRolesItem[];
  bgColor: string;
}

interface UsersRolesItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  hasConfig?: boolean;
}

const usersRolesSections: UsersRolesSection[] = [
  {
    id: "homepage-configuration",
    title: "Homepage Configuration Tool",
    description: "Configure the homepage for different roles",
    bgColor: "",
    items: [
      {
        id: "password-assistance",
        title: "Password Assistance",
        description: "Allow HMC Users to reset their forgotten password.",
        hasConfig: true,
      },
      {
        id: "user-report-config",
        title: "User Report",
        description:
          "Export all users within a specified criteria to a spreadsheet.",
        hasConfig: true,
      },
      {
        id: "custom-homepages",
        title: "Custom Homepages",
        description:
          "Allow Administrator to control Homepage Configuration Tool.",
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
  "Sales Demo Retail Omega Hiring Manager Everly",
  "Sales Demo Retail Omega Hourly Recruiter",
  "Sales Demo Retail Omega Hourly Recruiter Everly",
  "Sales Demo Retail Omega Hourly System Admin",
  "Sales Demo Retail Omega Recruiter",
  "Sales Demo Retail Omega Recruiter Everly",
  "Sales Demo Retail Omega System Admin",
  "BSD Hybrid Recruiter",
  "SELF USER ASSOCIATION",
  "Workforce Hiring Analytics",
  "Workforce Hiring Analytics - Advanced",
  "Workforce Hiring Analytics - Legal",
  "Workforce Hiring Analytics - Requisition",
];

export default function UsersRolesPanel() {
  // State for toggle switches
  const [passwordAssistanceEnabled, setPasswordAssistanceEnabled] =
    useState(false);
  const [userReportEnabled, setUserReportEnabled] = useState(false);
  const [customHomepagesEnabled, setCustomHomepagesEnabled] = useState(false);

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for configuration dialogs
  const [isPasswordAssistanceDialogOpen, setIsPasswordAssistanceDialogOpen] =
    useState(false);
  const [isUserReportDialogOpen, setIsUserReportDialogOpen] = useState(false);
  const [isCustomHomepagesDialogOpen, setIsCustomHomepagesDialogOpen] =
    useState(false);
  const [isPasswordAuditDialogOpen, setIsPasswordAuditDialogOpen] =
    useState(false);
  const [isUserReportAuditDialogOpen, setIsUserReportAuditDialogOpen] =
    useState(false);
  const [
    isCustomHomepagesAuditDialogOpen,
    setIsCustomHomepagesAuditDialogOpen,
  ] = useState(false);

  // State for Password Assistance configuration
  const [passwordSolution, setPasswordSolution] = useState("none");

  // State for User Report configuration
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([
    "Sales Demo Retail Omega Hourly System Admin",
  ]);

  // State for Custom Homepages configuration
  const [customHomepagesFeature, setCustomHomepagesFeature] =
    useState("enable");

  const handlePasswordAssistanceSave = () => {
    console.log("Password Assistance configuration saved:", passwordSolution);

    // Close the dialog
    setIsPasswordAssistanceDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handlePasswordAssistanceCancel = () => {
    setIsPasswordAssistanceDialogOpen(false);
  };

  const handleUserTypeChange = (userType: string, checked: boolean) => {
    if (checked) {
      setSelectedUserTypes([...selectedUserTypes, userType]);
    } else {
      setSelectedUserTypes(
        selectedUserTypes.filter((type) => type !== userType)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectedUserTypes([...userTypes]);
  };

  const handleDeselectAll = () => {
    setSelectedUserTypes([]);
  };

  const handleUserReportSave = () => {
    console.log("User Report configuration saved:", selectedUserTypes);

    // Close the dialog
    setIsUserReportDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleCustomHomepagesSave = () => {
    console.log(
      "Custom Homepages configuration saved:",
      customHomepagesFeature
    );

    // Close the dialog
    setIsCustomHomepagesDialogOpen(false);

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
    <div className="space-y-6">
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
              className="text-gray-900 text-sm font-medium hover:underline border border-gray-300 px-3 py-1 rounded"
            >
              SS Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Users & Roles Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Users & Roles
        </h2>

        {/* Users Card */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-6">
            {/* User Tool */}
            <div>
              <Link
                href="/admin-console/users"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                User Tool
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Change location access and roles, change password.
              </p>
            </div>

            {/* User Report */}
            <div>
              <Link
                href="/admin-console/user-report"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                User Report
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Export all users of the system into a single spreadsheet.
              </p>
            </div>

            {/* Homepage Configuration Tool */}
            <div className="space-y-4">
              <div>
                <h4 className="text-[#EE5A37] text-sm font-medium">
                  Homepage Configuration Tool
                </h4>
                <p className="text-sm text-gray-700 mt-1">
                  Configure the homepage for different roles
                </p>
              </div>

              {/* Password Assistance */}
              <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                      Password Assistance
                    </h3>
                    <p className="text-sm text-gray-600">
                      Allow HMC Users to reset their forgotten password.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                      onClick={() => setIsPasswordAssistanceDialogOpen(true)}
                    >
                      Configure
                    </Button>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          passwordAssistanceEnabled
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setPasswordAssistanceEnabled(
                            !passwordAssistanceEnabled
                          )
                        }
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            passwordAssistanceEnabled
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {passwordAssistanceEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Report Config */}
              <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                      User Report
                    </h3>
                    <p className="text-sm text-gray-600">
                      Export all users within a specified criteria to a
                      spreadsheet.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                      onClick={() => setIsUserReportDialogOpen(true)}
                    >
                      Configure
                    </Button>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          userReportEnabled ? "bg-orange-500" : "bg-gray-200"
                        }`}
                        onClick={() => setUserReportEnabled(!userReportEnabled)}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            userReportEnabled
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {userReportEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Homepages */}
              <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                      Custom Homepages
                    </h3>
                    <p className="text-sm text-gray-600">
                      Allow Administrator to control Homepage Configuration
                      Tool.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                      onClick={() => setIsCustomHomepagesDialogOpen(true)}
                    >
                      Configure
                    </Button>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                          customHomepagesEnabled
                            ? "bg-orange-500"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setCustomHomepagesEnabled(!customHomepagesEnabled)
                        }
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            customHomepagesEnabled
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {customHomepagesEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Assistance Configuration Dialog */}
      <Dialog
        open={isPasswordAssistanceDialogOpen}
        onOpenChange={setIsPasswordAssistanceDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Password Assistance
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Allow HMC Users to reset their forgotten password.
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
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
                    onClick={() => setIsPasswordAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Andy Wilson
                    </div>
                    <div className="text-xs text-gray-500">
                      06 October 2020 (11:18 AM)
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Shirley Recruiter
                    </div>
                    <div className="text-xs text-gray-500">
                      19 May 2020 (4:57 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">
                Configuration Options
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Choose type of solution to be used for retrieving password
              </p>

              <RadioGroup
                value={passwordSolution}
                onValueChange={setPasswordSolution}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="email"
                      name="password-option"
                      value="email"
                      checked={passwordSolution === "email"}
                      onChange={(e) => setPasswordSolution(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        passwordSolution === "email"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {passwordSolution === "email" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label htmlFor="email" className="text-sm cursor-pointer">
                    Email Based Solution
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="security"
                      name="password-option"
                      value="security"
                      checked={passwordSolution === "security"}
                      onChange={(e) => setPasswordSolution(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        passwordSolution === "security"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {passwordSolution === "security" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label htmlFor="security" className="text-sm cursor-pointer">
                    Security Challenge Based Solution
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="none"
                      name="password-option"
                      value="none"
                      checked={passwordSolution === "none"}
                      onChange={(e) => setPasswordSolution(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        passwordSolution === "none"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {passwordSolution === "none" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label htmlFor="none" className="text-sm cursor-pointer">
                    None
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={handlePasswordAssistanceCancel}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordAssistanceSave}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Report Configuration Dialog */}
      <Dialog
        open={isUserReportDialogOpen}
        onOpenChange={setIsUserReportDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              User Report
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Export all users within a specified criteria to a spreadsheet.
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
                      In use
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
                    onClick={() => setIsUserReportAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Shirley Recruiter
                    </div>
                    <div className="text-xs text-gray-500">
                      19 May 2020 (4:59 PM)
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
                        selectedUserTypes.length === userTypes.length
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={handleSelectAll}
                    >
                      {selectedUserTypes.length === userTypes.length && (
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
                        selectedUserTypes.length === 0
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={handleDeselectAll}
                    >
                      {selectedUserTypes.length === 0 && (
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
                            selectedUserTypes.includes(userType)
                              ? "border-[#EE5A37] bg-[#EE5A37]"
                              : "border-gray-400"
                          }`}
                          onClick={() => {
                            handleUserTypeChange(
                              userType,
                              !selectedUserTypes.includes(userType)
                            );
                          }}
                        >
                          {selectedUserTypes.includes(userType) && (
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
                            selectedUserTypes.includes(userType)
                              ? "border-[#EE5A37] bg-[#EE5A37]"
                              : "border-gray-400"
                          }`}
                          onClick={() => {
                            handleUserTypeChange(
                              userType,
                              !selectedUserTypes.includes(userType)
                            );
                          }}
                        >
                          {selectedUserTypes.includes(userType) && (
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
              onClick={() => setIsUserReportDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUserReportSave}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Homepages Configuration Dialog */}
      <Dialog
        open={isCustomHomepagesDialogOpen}
        onOpenChange={setIsCustomHomepagesDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Custom Homepages
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Allow Administrator to control Homepage Configuration Tool.
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
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
                      In use
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
                    onClick={() => setIsCustomHomepagesAuditDialogOpen(true)}
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
                      06 May 2020 (4:50 PM)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">
                Configuration Options
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Enable/Disable Homepage Configuration Feature
              </p>

              <RadioGroup
                value={customHomepagesFeature}
                onValueChange={setCustomHomepagesFeature}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="enable-custom"
                      name="custom-option"
                      value="enable"
                      checked={customHomepagesFeature === "enable"}
                      onChange={(e) =>
                        setCustomHomepagesFeature(e.target.value)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        customHomepagesFeature === "enable"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {customHomepagesFeature === "enable" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label
                    htmlFor="enable-custom"
                    className="text-sm cursor-pointer"
                  >
                    Enable
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="disable-custom"
                      name="custom-option"
                      value="disable"
                      checked={customHomepagesFeature === "disable"}
                      onChange={(e) =>
                        setCustomHomepagesFeature(e.target.value)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        customHomepagesFeature === "disable"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {customHomepagesFeature === "disable" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label
                    htmlFor="disable-custom"
                    className="text-sm cursor-pointer"
                  >
                    Disable
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsCustomHomepagesDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCustomHomepagesSave}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Assistance Audit Details Dialog */}
      <Dialog
        open={isPasswordAuditDialogOpen}
        onOpenChange={setIsPasswordAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Password Assistance
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Feature Audit Details */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Feature Audit Details
              </h2>

              {/* Andy Wilson Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Andy Wilson made a change on 06 October 2020 (11:18 AM)
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
                      <div className="font-medium">SecurityChallenge</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">false</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shirley Recruiter Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Shirley Recruiter made a change on 19 May 2020 (4:57 PM)
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
                      <div className="font-medium">SecurityChallenge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Report Audit Details Dialog */}
      <Dialog
        open={isUserReportAuditDialogOpen}
        onOpenChange={setIsUserReportAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              User Report
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Feature Audit Details */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Feature Audit Details
              </h2>

              {/* Shirley Recruiter Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Shirley Recruiter made a change on 19 May 2020 (4:59 PM)
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

                  <div className="grid grid-cols-3 border-b">
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

                  <div className="grid grid-cols-3">
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
                        <div>Sales Demo Retail Omega Hourly System Admin</div>
                        <div>Sales Demo Retail Omega System Admin</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Homepages Audit Details Dialog */}
      <Dialog
        open={isCustomHomepagesAuditDialogOpen}
        onOpenChange={setIsCustomHomepagesAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Custom Homepages
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Feature Audit Details */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Feature Audit Details
              </h2>

              {/* Administrator TestAdminLN Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Administrator TestAdminLN made a change on 06 May 2020 (4:50
                    PM)
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
    </div>
  );
}
