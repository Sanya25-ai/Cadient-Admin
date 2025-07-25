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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useState } from "react";

export default function OrganizationPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("disable");

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for other features
  const [isOpeningsToolDialogOpen, setIsOpeningsToolDialogOpen] =
    useState(false);
  const [isOpeningsToolAuditDialogOpen, setIsOpeningsToolAuditDialogOpen] =
    useState(false);
  const [isOpeningsHMCDialogOpen, setIsOpeningsHMCDialogOpen] = useState(false);
  const [isOpeningsHMCAuditDialogOpen, setIsOpeningsHMCAuditDialogOpen] =
    useState(false);
  const [isOpeningsSeekerDialogOpen, setIsOpeningsSeekerDialogOpen] =
    useState(false);
  const [isOpeningsSeekerAuditDialogOpen, setIsOpeningsSeekerAuditDialogOpen] =
    useState(false);
  const [isSponsoredJobsDialogOpen, setIsSponsoredJobsDialogOpen] =
    useState(false);
  const [isSponsoredJobsAuditDialogOpen, setIsSponsoredJobsAuditDialogOpen] =
    useState(false);

  const [openingsToolOption, setOpeningsToolOption] = useState("disable");
  const [openingsHMCOption, setOpeningsHMCOption] = useState("disable");
  const [openingsSeekerOption, setOpeningsSeekerOption] = useState("disable");
  const [sponsoredJobsOption, setSponsoredJobsOption] = useState("disable");
  const [isHMCConfigExpanded, setIsHMCConfigExpanded] = useState(false);
  const [isSeekerConfigExpanded, setIsSeekerConfigExpanded] = useState(false);

  // State for Select All and Deselect All functionality
  const [selectAll, setSelectAll] = useState(false);
  const [deselectAll, setDeselectAll] = useState(false);
  const [userTypeSelections, setUserTypeSelections] = useState({
    "calendar-integration": false,
    "regional-manager": false,
    "sales-approver": true,
    "sales-equest": false,
    "sales-hiring": false,
    "sales-hiring-everly": false,
    "sales-hourly-recruiter": false,
    "sales-hourly-recruiter-everly": false,
    "sales-recruiter": true,
    "sales-recruiter-everly": true,
    "sales-system-admin": true,
    "sd-hybrid-recruiter": true,
    "self-user-association": false,
    "workforce-hiring-analytics": true,
    "workforce-hiring-advanced": true,
    "workforce-hiring-legal": true,
    "workforce-hiring-requisition": true,
  });

  const { toast } = useToast();

  // Derived state - toggle switches reflect the radio button selections
  const isFeatureEnabled = selectedOption === "enable";
  const isOpeningsToolEnabled = openingsToolOption === "enable";
  const isOpeningsHMCEnabled = openingsHMCOption === "enable";
  const isOpeningsSeekerEnabled = openingsSeekerOption === "enable";
  const isSponsoredJobsEnabled = sponsoredJobsOption === "enable";

  const handleToggleFeature = () => {
    const newOption = selectedOption === "enable" ? "disable" : "enable";
    setSelectedOption(newOption);

    toast({
      title: "Feature Updated",
      description: `Internal Position Names ${
        newOption === "enable" ? "enabled" : "disabled"
      } successfully!`,
      variant: "default",
    });
  };

  const handleToggleOpeningsTool = () => {
    const newOption = openingsToolOption === "enable" ? "disable" : "enable";
    setOpeningsToolOption(newOption);

    toast({
      title: "Feature Updated",
      description: `Openings Tool ${
        newOption === "enable" ? "enabled" : "disabled"
      } successfully!`,
      variant: "default",
    });
  };

  const handleToggleOpeningsHMC = () => {
    const newOption = openingsHMCOption === "enable" ? "disable" : "enable";
    setOpeningsHMCOption(newOption);

    toast({
      title: "Feature Updated",
      description: `Openings in HMC ${
        newOption === "enable" ? "enabled" : "disabled"
      } successfully!`,
      variant: "default",
    });
  };

  const handleToggleOpeningsSeeker = () => {
    const newOption = openingsSeekerOption === "enable" ? "disable" : "enable";
    setOpeningsSeekerOption(newOption);

    toast({
      title: "Feature Updated",
      description: `Openings in Seeker Sites ${
        newOption === "enable" ? "enabled" : "disabled"
      } successfully!`,
      variant: "default",
    });
  };

  const handleToggleSponsoredJobs = () => {
    const newOption = sponsoredJobsOption === "enable" ? "disable" : "enable";
    setSponsoredJobsOption(newOption);

    toast({
      title: "Feature Updated",
      description: `Sponsored Jobs ${
        newOption === "enable" ? "enabled" : "disabled"
      } successfully!`,
      variant: "default",
    });
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Selected option:", selectedOption);

    // Close the dialog
    setIsDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  // Handler functions for other features
  const handleSaveOpeningsTool = () => {
    console.log("Openings Tool option:", openingsToolOption);

    // Close the dialog
    setIsOpeningsToolDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleSaveOpeningsHMC = () => {
    console.log("Openings HMC option:", openingsHMCOption);

    // Close the dialog
    setIsOpeningsHMCDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleSaveOpeningsSeeker = () => {
    console.log("Openings Seeker option:", openingsSeekerOption);

    // Close the dialog
    setIsOpeningsSeekerDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleSaveSponsoredJobs = () => {
    console.log("Sponsored Jobs option:", sponsoredJobsOption);

    // Close the dialog
    setIsSponsoredJobsDialogOpen(false);

    // Show success alert
    setSuccessMessage("Configuration saved successfully");
    setShowSuccessAlert(true);

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
  };

  const handleViewAllDetails = () => {
    setIsAuditDialogOpen(true);
  };

  const handleBackToConfiguration = () => {
    setIsAuditDialogOpen(false);
  };

  // Handler functions for Select All and Deselect All
  const handleSelectAll = () => {
    setSelectAll(true);
    setDeselectAll(false);
    // Update all user type selections to true
    const updatedSelections = Object.keys(userTypeSelections).reduce(
      (acc, key) => {
        (acc as any)[key] = true;
        return acc;
      },
      {} as typeof userTypeSelections
    );
    setUserTypeSelections(updatedSelections);
  };

  const handleDeselectAll = () => {
    setDeselectAll(true);
    setSelectAll(false);
    // Update all user type selections to false
    const updatedSelections = Object.keys(userTypeSelections).reduce(
      (acc, key) => {
        (acc as any)[key] = false;
        return acc;
      },
      {} as typeof userTypeSelections
    );
    setUserTypeSelections(updatedSelections);
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
      {/* Self Service Change Section - Matching the first image */}
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

      {/* Organization Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Organization
        </h2>

        {/* Locations */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Locations</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
            <div>
              <Link
                href="/admin-console/locations"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Location Manager
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Create and edit locations, activate positions.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/location-groups"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Location Groups
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Create multi-location entities.
              </p>
            </div>
          </div>
        </div>

        {/* Positions */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Positions</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
            <div>
              <Link
                href="/admin-console/positions"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Position Manager
              </Link>
              <div className="text-sm text-gray-700 mt-2 space-y-1">
                <div>• Hiring process</div>
                <div>• Posting dates</div>
                <div>• Pre-screeners</div>
                <div>• Work history gap tracking</div>
                <div>• HMC user access by role</div>
                <div>• Seeker site description</div>
              </div>
            </div>
            {/* Orange background card with 4px left border */}
            <div className="border-l-4 border-l-[#EE5A37] bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                    Internal Position Names
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add an internal Position name for internal configuration
                    name of a position.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Configure
                  </Button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isFeatureEnabled ? "bg-orange-500" : "bg-gray-200"
                      }`}
                      onClick={handleToggleFeature}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isFeatureEnabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isFeatureEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Recruiter</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
            <div>
              <Link
                href="/admin-console/requisition-approvers"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Requisition Approvers
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                Manage lists of requisition approvers.
              </p>
            </div>
            <div>
              <Link
                href="/admin-console/prescreener"
                className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer"
              >
                Pre-screening
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                A pre-screener is a set of questions that you can ask of all
                candidates for a specific position.
              </p>
            </div>
          </div>
        </div>

        {/* Openings */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Openings</h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
            {/* Orange background card with 4px left border */}
            <div className="border-l-4 border-l-[#EE5A37] bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                    Openings Tool
                  </h3>
                  <p className="text-sm text-gray-600">
                    Allow access to the Openings feature in the HMC.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                    onClick={() => setIsOpeningsToolDialogOpen(true)}
                  >
                    Configure
                  </Button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isOpeningsToolEnabled ? "bg-orange-500" : "bg-gray-200"
                      }`}
                      onClick={handleToggleOpeningsTool}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isOpeningsToolEnabled
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isOpeningsToolEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                    Openings in HMC
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configure Openings behavior in the HMC.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                    onClick={() => setIsOpeningsHMCDialogOpen(true)}
                  >
                    Configure
                  </Button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isOpeningsHMCEnabled ? "bg-orange-500" : "bg-gray-200"
                      }`}
                      onClick={handleToggleOpeningsHMC}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isOpeningsHMCEnabled
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isOpeningsHMCEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                    Openings in Seeker Sites
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configure Openings behavior in the seeker site(s).
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                    onClick={() => setIsOpeningsSeekerDialogOpen(true)}
                  >
                    Configure
                  </Button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isOpeningsSeekerEnabled
                          ? "bg-orange-500"
                          : "bg-gray-200"
                      }`}
                      onClick={handleToggleOpeningsSeeker}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isOpeningsSeekerEnabled
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isOpeningsSeekerEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsored Jobs */}
        <div className="space-y-0">
          <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              Sponsored Jobs
            </h3>
          </div>
          <div className="bg-white px-4 py-4 rounded-b-lg">
            <div className="border-l-4 border-l-[#EE5A37] border border-gray-200 bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[#EE5A37] text-base font-medium mb-2">
                    Sponsored Jobs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Allow users to sponsor a job on integrated job boards.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#EE5A37] border-[#EE5A37] hover:bg-orange-50"
                    onClick={() => setIsSponsoredJobsDialogOpen(true)}
                  >
                    Configure
                  </Button>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        isSponsoredJobsEnabled ? "bg-orange-500" : "bg-gray-200"
                      }`}
                      onClick={handleToggleSponsoredJobs}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isSponsoredJobsEnabled
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {isSponsoredJobsEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Position Names Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Internal Position Names
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Add an Internal Position name for internal configuration name of
                a position.
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
                    onClick={handleViewAllDetails}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Pratham Jain
                    </div>
                    <div className="text-xs text-gray-500">
                      19 June 2025 (9:43 AM)
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Pratham Jain
                    </div>
                    <div className="text-xs text-gray-500">
                      19 June 2025 (9:42 AM)
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
                This feature will enable/disable the Internal Position tab
              </p>

              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="enable"
                      name="option"
                      value="enable"
                      checked={selectedOption === "enable"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        selectedOption === "enable"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedOption === "enable" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label htmlFor="enable" className="text-sm cursor-pointer">
                    Enable
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="radio"
                      id="disable"
                      name="option"
                      value="disable"
                      checked={selectedOption === "disable"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        selectedOption === "disable"
                          ? "border-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedOption === "disable" && (
                        <div className="w-3 h-3 rounded-full bg-[#EE5A37]"></div>
                      )}
                    </div>
                  </div>
                  <Label htmlFor="disable" className="text-sm cursor-pointer">
                    Disable
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feature Audit Details Dialog */}
      <Dialog open={isAuditDialogOpen} onOpenChange={setIsAuditDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Internal Position Names
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

      {/* Openings Tool Configuration Dialog */}
      <Dialog
        open={isOpeningsToolDialogOpen}
        onOpenChange={setIsOpeningsToolDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Openings Tool
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Allow access to the Openings feature in the HMC.
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
                    onClick={() => setIsOpeningsToolAuditDialogOpen(true)}
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
                        selectAll
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={handleSelectAll}
                    >
                      {selectAll && (
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
                        deselectAll
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={handleDeselectAll}
                    >
                      {deselectAll && (
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
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["calendar-integration"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "calendar-integration": !prev["calendar-integration"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["calendar-integration"] && (
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
                      Calendar Integration Interview Scheduling
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["regional-manager"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "regional-manager": !prev["regional-manager"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["regional-manager"] && (
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
                      Regional Manager Organizer
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-approver"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-approver": !prev["sales-approver"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-approver"] && (
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
                      Sales Demo Retail Omega Approver
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-equest"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-equest": !prev["sales-equest"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-equest"] && (
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
                      Sales Demo Retail Omega eQuest Manager
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hiring"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hiring": !prev["sales-hiring"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hiring"] && (
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
                      Sales Demo Retail Omega Hiring Manager
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hiring-everly"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hiring-everly": !prev["sales-hiring-everly"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hiring-everly"] && (
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
                      Sales Demo Retail Omega Hiring Manager Everly
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hourly-recruiter"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hourly-recruiter":
                            !prev["sales-hourly-recruiter"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hourly-recruiter"] && (
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
                      Sales Demo Retail Omega Hourly Recruiter
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hourly-recruiter-everly"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hourly-recruiter-everly":
                            !prev["sales-hourly-recruiter-everly"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hourly-recruiter-everly"] && (
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
                      Sales Demo Retail Omega Hourly Recruiter Everly
                    </Label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-recruiter"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-recruiter": !prev["sales-recruiter"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-recruiter"] && (
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
                      Sales Demo Retail Omega Recruiter
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-recruiter-everly"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-recruiter-everly":
                            !prev["sales-recruiter-everly"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-recruiter-everly"] && (
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
                      Sales Demo Retail Omega Recruiter Everly
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-system-admin"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-system-admin": !prev["sales-system-admin"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-system-admin"] && (
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
                      Sales Demo Retail Omega System Admin
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sd-hybrid-recruiter"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sd-hybrid-recruiter": !prev["sd-hybrid-recruiter"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sd-hybrid-recruiter"] && (
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
                      SD Hybrid Recruiter
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["self-user-association"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "self-user-association":
                            !prev["self-user-association"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["self-user-association"] && (
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
                      SELF USER ASSOCIATION
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-analytics"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-analytics":
                            !prev["workforce-hiring-analytics"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-analytics"] && (
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
                      Workforce Hiring Analytics
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-advanced"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-advanced":
                            !prev["workforce-hiring-advanced"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-advanced"] && (
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
                      Workforce Hiring Analytics - Advanced
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-legal"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-legal":
                            !prev["workforce-hiring-legal"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-legal"] && (
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
                      Workforce Hiring Analytics - Legal
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-requisition"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-requisition":
                            !prev["workforce-hiring-requisition"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-requisition"] && (
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
                      Workforce Hiring Analytics - Requisition
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpeningsToolDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveOpeningsTool}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Openings in HMC Configuration Dialog */}
      <Dialog
        open={isOpeningsHMCDialogOpen}
        onOpenChange={setIsOpeningsHMCDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Openings in HMC
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Configure Openings behavior in the HMC.
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
                    onClick={() => setIsOpeningsHMCAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Melissa Demo Moser
                    </div>
                    <div className="text-xs text-gray-500">
                      22 November 2022 (1:55 PM)
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Melissa Demo Moser
                    </div>
                    <div className="text-xs text-gray-500">
                      13 October 2022 (5:54 PM)
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    (5 total changes)
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Configuration Options
              </h3>

              <RadioGroup value="enable" className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enable" id="openings-hmc-enable" />
                  <Label htmlFor="openings-hmc-enable" className="text-sm">
                    Enable
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="disable" id="openings-hmc-disable" />
                  <Label htmlFor="openings-hmc-disable" className="text-sm">
                    Disable
                  </Label>
                </div>
              </RadioGroup>

              {/* Configure Openings for HMC - Expandable Section */}
              <div className="border rounded-lg bg-white">
                <div
                  className="p-3 cursor-pointer flex items-center justify-between bg-[#EE5A37] bg-opacity-[0.08] rounded-t-lg"
                  onClick={() => setIsHMCConfigExpanded(!isHMCConfigExpanded)}
                >
                  <h4 className="text-base font-medium">
                    Configure Openings for HMC
                  </h4>
                  <span className="text-lg">
                    {isHMCConfigExpanded ? "−" : "+"}
                  </span>
                </div>

                {isHMCConfigExpanded && (
                  <div className="border-t space-y-3 p-3">
                    {/* Automatic Section */}
                    <div>
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">
                          Automatic:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          The Openings are automatically created when any of the
                          workflow nodes below are progressed and when an
                          Opening does not currently exist.
                        </span>
                      </div>
                    </div>

                    {/* Hiring Process Wizard Section */}
                    <div>
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">
                          Hiring Process Wizard:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          The Openings creation tool is invoked when any of the
                          workflow nodes below are progressed and when an
                          Opening does not exist.
                        </span>
                      </div>
                    </div>

                    {/* Manual Using Opening Tool Section */}
                    <div>
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">
                          Manual Using Opening Tool:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          The Openings are manually created using the Opening
                          Tool.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Workflow Configuration Section - Outside Expandable */}
              <div className="space-y-4 mt-6">
                {/* External Seeker Site */}
                <div>
                  <div className="font-medium text-sm mb-2">
                    Sales Demo Retail Omega Non-Req External Seeker Site
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Configure Openings through Wizard</option>
                  </select>
                </div>

                {/* HireNow */}
                <div>
                  <div className="font-medium text-sm mb-2">
                    Sales Demo Retail Omega Non-Req HireNow
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Configure Openings Automatically</option>
                  </select>
                </div>

                {/* Internal Seeker Site */}
                <div>
                  <div className="font-medium text-sm mb-2">
                    Sales Demo Retail Omega Non-Req Internal Seeker Site
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Configure Openings Manually</option>
                  </select>
                </div>

                {/* Workflow Information */}
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                  <div className="text-sm font-medium mb-2">
                    The following workflows are configured for required
                    Openings. Please contact your Cadient Talent representative
                    if any workflow needs to be added or removed:
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Conditional Offer Letter – Offer Accepted</li>
                    <li>• Conditional Offer Letter – Start Offer</li>
                    <li>• Review Application – Interest</li>
                    <li>• Second Interview – Favorable Interview Results</li>
                    <li>• Interview Outcome – Favorable Interview Results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpeningsHMCDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveOpeningsHMC}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Openings in Seeker Sites Configuration Dialog */}
      <Dialog
        open={isOpeningsSeekerDialogOpen}
        onOpenChange={setIsOpeningsSeekerDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Openings in Seeker Sites
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Configure Openings behavior in the seeker site(s).
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
                    onClick={() => setIsOpeningsSeekerAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Kyle Bidwell
                    </div>
                    <div className="text-xs text-gray-500">
                      30 April 2025 (2:15 PM)
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Kyle Bidwell
                    </div>
                    <div className="text-xs text-gray-500">
                      30 April 2025 (2:14 PM)
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    (7 total changes)
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Configuration Options
              </h3>

              <RadioGroup value="enable" className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enable" id="openings-seeker-enable" />
                  <Label htmlFor="openings-seeker-enable" className="text-sm">
                    Enable
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="disable"
                    id="openings-seeker-disable"
                  />
                  <Label htmlFor="openings-seeker-disable" className="text-sm">
                    Disable
                  </Label>
                </div>
              </RadioGroup>

              {/* Configure Openings for different seeker applications - Expandable Section */}
              <div className="border rounded-lg bg-white">
                <div
                  className="p-3 cursor-pointer flex items-center justify-between bg-[#EE5A37] bg-opacity-[0.08] rounded-t-lg"
                  onClick={() =>
                    setIsSeekerConfigExpanded(!isSeekerConfigExpanded)
                  }
                >
                  <h4 className="text-base font-medium">
                    Configure Openings for different seeker applications
                  </h4>
                  <span className="text-lg">
                    {isSeekerConfigExpanded ? "−" : "+"}
                  </span>
                </div>

                {isSeekerConfigExpanded && (
                  <div className="border-t space-y-3 p-3">
                    {/* Show Openings Only */}
                    <div>
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">
                          Show Openings Only:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          Only those positions for which openings are created
                          will be displayed in the hourly seeker site.
                        </span>
                      </div>
                    </div>

                    {/* Show Evergreen Positions only */}
                    <div>
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">
                          Show Evergreen Positions only:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          All positions will be displayed in the hourly seeker
                          site with no distinction between 'Now Hiring'
                          positions and 'Always Accepting Applications'
                          positions.
                        </span>
                      </div>
                    </div>

                    {/* Show both Opening and Evergreen positions */}
                    <div>
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">
                          Show both Opening and Evergreen positions:
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          Both Opening and Evergreen positions will be displayed
                          in the hourly seeker site with distinction between
                          'Now Hiring' positions and 'Always Accepting
                          Applications' position for a selected location.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Seeker Site Dropdowns - Outside Expandable */}
              <div className="space-y-4 mt-6">
                {/* External Seeker Site */}
                <div>
                  <div className="font-medium text-sm mb-2 text-black">
                    Sales Demo Retail Omega Non-Req External Seeker Site
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Show both Openings and Evergreen Positions</option>
                  </select>
                </div>

                {/* HireNow */}
                <div>
                  <div className="font-medium text-sm mb-2 text-black">
                    Sales Demo Retail Omega Non-Req HireNow
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Show both Openings and Evergreen Positions</option>
                  </select>
                </div>

                {/* Internal Seeker Site */}
                <div>
                  <div className="font-medium text-sm mb-2 text-black">
                    Sales Demo Retail Omega Non-Req Internal Seeker Site
                  </div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Show both Openings and Evergreen Positions</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpeningsSeekerDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveOpeningsSeeker}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sponsored Jobs Configuration Dialog */}
      <Dialog
        open={isSponsoredJobsDialogOpen}
        onOpenChange={setIsSponsoredJobsDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-lg font-medium">
              Sponsored Jobs
              <div className="text-xs font-normal text-gray-600 mt-0.5">
                Allow users to sponsor a job on integrated job boards.
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
                    onClick={() => setIsSponsoredJobsAuditDialogOpen(true)}
                  >
                    View All Details
                  </Button>
                </div>
                <div className="rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Melissa Demo Moser
                    </div>
                    <div className="text-xs text-gray-500">
                      15 February 2024 (12:36 PM)
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-gray-900">
                      Unknown User
                    </div>
                    <div className="text-xs text-gray-500">
                      03 November 2021 (3:25 PM)
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
                        selectAll
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={handleSelectAll}
                    >
                      {selectAll && (
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
                        deselectAll
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={handleDeselectAll}
                    >
                      {deselectAll && (
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
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["calendar-integration"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "calendar-integration": !prev["calendar-integration"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["calendar-integration"] && (
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
                      Calendar Integration Interview Scheduling
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["regional-manager"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "regional-manager": !prev["regional-manager"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["regional-manager"] && (
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
                      Regional Manager Organizer
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-approver"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-approver": !prev["sales-approver"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-approver"] && (
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
                      Sales Demo Retail Omega Approver
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-equest"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-equest": !prev["sales-equest"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-equest"] && (
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
                      Sales Demo Retail Omega eQuest Manager
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hiring"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hiring": !prev["sales-hiring"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hiring"] && (
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
                      Sales Demo Retail Omega Hiring Manager
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hiring-everly"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hiring-everly": !prev["sales-hiring-everly"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hiring-everly"] && (
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
                      Sales Demo Retail Omega Hiring Manager Everly
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hourly-recruiter"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hourly-recruiter":
                            !prev["sales-hourly-recruiter"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hourly-recruiter"] && (
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
                      Sales Demo Retail Omega Hourly Recruiter
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-hourly-recruiter-everly"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-hourly-recruiter-everly":
                            !prev["sales-hourly-recruiter-everly"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-hourly-recruiter-everly"] && (
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
                      Sales Demo Retail Omega Hourly Recruiter Everly
                    </Label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-recruiter"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-recruiter": !prev["sales-recruiter"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-recruiter"] && (
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
                      Sales Demo Retail Omega Recruiter
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-recruiter-everly"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-recruiter-everly":
                            !prev["sales-recruiter-everly"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-recruiter-everly"] && (
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
                      Sales Demo Retail Omega Recruiter Everly
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sales-system-admin"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sales-system-admin": !prev["sales-system-admin"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sales-system-admin"] && (
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
                      Sales Demo Retail Omega System Admin
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["sd-hybrid-recruiter"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "sd-hybrid-recruiter": !prev["sd-hybrid-recruiter"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["sd-hybrid-recruiter"] && (
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
                      SD Hybrid Recruiter
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["self-user-association"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "self-user-association":
                            !prev["self-user-association"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["self-user-association"] && (
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
                      SELF USER ASSOCIATION
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-analytics"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-analytics":
                            !prev["workforce-hiring-analytics"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-analytics"] && (
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
                      Workforce Hiring Analytics
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-advanced"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-advanced":
                            !prev["workforce-hiring-advanced"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-advanced"] && (
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
                      Workforce Hiring Analytics - Advanced
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-legal"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-legal":
                            !prev["workforce-hiring-legal"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-legal"] && (
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
                      Workforce Hiring Analytics - Legal
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 border-2 rounded cursor-pointer flex items-center justify-center ${
                        userTypeSelections["workforce-hiring-requisition"]
                          ? "border-[#EE5A37] bg-[#EE5A37]"
                          : "border-gray-400"
                      }`}
                      onClick={() => {
                        setUserTypeSelections((prev) => ({
                          ...prev,
                          "workforce-hiring-requisition":
                            !prev["workforce-hiring-requisition"],
                        }));
                        setSelectAll(false);
                        setDeselectAll(false);
                      }}
                    >
                      {userTypeSelections["workforce-hiring-requisition"] && (
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
                      Workforce Hiring Analytics - Requisition
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-t border-gray-200 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsSponsoredJobsDialogOpen(false)}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSponsoredJobs}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Openings Tool Audit Details Dialog */}
      <Dialog
        open={isOpeningsToolAuditDialogOpen}
        onOpenChange={setIsOpeningsToolAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Openings Tool
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Feature Audit Details */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Feature Audit Details
              </h2>

              {/* Audit Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Administrator TestAdminLN made a change on 02 February 2022
                    (1:36 PM)
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
                        <div>
                          Sales Demo Retail Omega Hourly Recruiter Everly
                        </div>
                        <div>Sales Demo Retail Omega Hiring Manager Everly</div>
                        <div>Sales Demo Retail Omega Hourly System Admin</div>
                        <div>Sales Demo Retail Omega eQuest Manager</div>
                        <div>Sales Demo Retail Omega Recruiter</div>
                        <div>Sales Demo Retail Omega Hiring Manager</div>
                        <div>Sales Demo Retail Omega Hourly Recruiter</div>
                        <div>Sales Demo Retail Omega System Admin</div>
                        <div>Sales Demo Retail Omega Recruiter Everly</div>
                        <div>Sales Demo Retail Omega Approver</div>
                        <div>Workforce Hiring Analytics - Legal</div>
                        <div>Workforce Hiring Analytics - Requisition</div>
                        <div>Workforce Hiring Analytics - Advanced</div>
                        <div>Workforce Hiring Analytics</div>
                        <div>SD Hybrid Recruiter</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Openings in HMC Audit Details Dialog */}
      <Dialog
        open={isOpeningsHMCAuditDialogOpen}
        onOpenChange={setIsOpeningsHMCAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Openings in HMC
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Feature Audit Details */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Feature Audit Details
              </h2>

              {/* First Audit Entry - 22 November 2022 */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Melissa Demo Moser made a change on 22 November 2022 (1:55
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

                  <div className="grid grid-cols-3 border-b">
                    <div className="p-3 border-r">
                      <div className="text-sm">Is feature enabled?</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="font-medium">true</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">true</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Property</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Wizard</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Audit Entry - 13 October 2022 */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Melissa Demo Moser made a change on 13 October 2022 (5:54
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

                  <div className="grid grid-cols-3 border-b">
                    <div className="p-3 border-r">
                      <div className="text-sm">Is feature enabled?</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="font-medium">true</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">true</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Property</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Wizard</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Audit Entry - 04 August 2022 */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Melissa Demo Moser made a change on 04 August 2022 (6:41 PM)
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
                      <div className="font-medium">true</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">true</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Property</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Manual</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Wizard</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Automatic</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fourth Audit Entry - 10 March 2022 */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Melissa Moser made a change on 10 March 2022 (5:22 PM)
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
                      <div className="font-medium">true</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">true</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Property</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Openings in Seeker Sites Audit Details Dialog */}
      <Dialog
        open={isOpeningsSeekerAuditDialogOpen}
        onOpenChange={setIsOpeningsSeekerAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Openings in Seeker Sites
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
                    Kyle Bidwell made a change on 30 April 2025 (2:15 PM)
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
                      <div className="font-medium">true</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">true</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Property</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Openings</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Audit Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Kyle Bidwell made a change on 30 April 2025 (2:14 PM)
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
                      <div className="font-medium">true</div>
                    </div>
                    <div className="p-3">
                      <div className="font-medium">true</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Property</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-900">
                          Sales Demo Retail Omega Non-Req Internal Seeker Site
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req External Seeker Site
                        </div>
                        <div>Openings Seeker View : Openings</div>
                        <div className="text-gray-900 mt-2">
                          Sales Demo Retail Omega Non-Req HireNow
                        </div>
                        <div>Openings Seeker View : Hybrid</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sponsored Jobs Audit Details Dialog */}
      <Dialog
        open={isSponsoredJobsAuditDialogOpen}
        onOpenChange={setIsSponsoredJobsAuditDialogOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="border-b border-gray-200 pb-4 flex-shrink-0">
            <DialogTitle className="text-lg font-medium">
              Sponsored Jobs
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
                    Melissa Demo Moser made a change on 15 February 2024 (12:36
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

                  <div className="grid grid-cols-3 border-b">
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

                  <div className="grid grid-cols-3">
                    <div className="p-3 border-r">
                      <div className="text-sm">Changes in Roles</div>
                    </div>
                    <div className="p-3 border-r">
                      <div className="space-y-1 text-sm">
                        <div>Sales Demo Retail Omega System Admin</div>
                        <div>SD Hybrid Recruiter</div>
                        <div>
                          Sales Demo Retail Omega Hourly Recruiter Everly
                        </div>
                        <div>Sales Demo Retail Omega Hiring Manager Everly</div>
                        <div>Sales Demo Retail Omega Hourly System Admin</div>
                        <div>Sales Demo Retail Omega eQuest Manager</div>
                        <div>Sales Demo Retail Omega Recruiter</div>
                        <div>Sales Demo Retail Omega Hiring Manager</div>
                        <div>Sales Demo Retail Omega Hourly Recruiter</div>
                        <div>Sales Demo Retail Omega Recruiter Everly</div>
                        <div>Sales Demo Retail Omega Hourly Recruiter</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-1 text-sm text-gray-500 italic">
                        <div>&lt;Roles not configured&gt;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Audit Entry */}
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded mb-2">
                  <span className="font-medium text-sm">
                    Unknown User made a change on 03 November 2021 (3:25 PM)
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
                        <div>
                          Sales Demo Retail Omega Hourly Recruiter Everly
                        </div>
                        <div>Sales Demo Retail Omega Hiring Manager Everly</div>
                        <div>Sales Demo Retail Omega Hourly System Admin</div>
                        <div>Sales Demo Retail Omega Recruiter</div>
                        <div>Sales Demo Retail Omega Hiring Manager</div>
                        <div>Sales Demo Retail Omega Hourly Recruiter</div>
                        <div>Sales Demo Retail Omega System Admin</div>
                        <div>Sales Demo Retail Omega Recruiter Everly</div>
                        <div>Sales Demo Retail Omega Hourly Recruiter</div>
                        <div>SD Hybrid Recruiter</div>
                      </div>
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
