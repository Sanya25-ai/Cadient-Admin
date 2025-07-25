"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getApplication } from "@/lib/data";
import type { Application } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BsArrowUpRight,
  BsBookmark,
  BsChatSquare,
  BsEnvelope,
  BsFileText,
  BsHash,
  BsThreeDots,
} from "react-icons/bs";
import AdditionalInfoTab from "./additional-info-tab";
import ApplicationTab from "./application-tab";
import CompanyDocumentsTab from "./company-documents-tab";
import HiringProcessTab from "./hiring-process-tab";
import HistoryTab from "./history-tab";
import InterviewQuestionsTab from "./interview-questions-tab";
import NotesTab from "./notes-tab";
import OnboardingModal from "./onboarding-modal";

// Dynamic import to avoid formatter issues
const OtherApplicationsDrawer = require("./other-applications-drawer").default;
const OnboardingTab = require("./onboarding-tab").default;
const OfferTab = require("./offer-tab").default;

const TABS = [
  "Application",
  "Interview",
  "Additional Info",
  "Documents",
  "Onboarding",
  "Notes",
  "Offer",
  "Hiring Process",
  "History",
  "Support",
];

interface ApplicantInformationPanel {
  jobBidId: number;
}

export default function ApplicantInformationPanel({
  jobBidId,
}: ApplicantInformationPanel) {
  const [activeTab, setActiveTab] = useState("Application");
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isHiringProcessStarted, setIsHiringProcessStarted] = useState(false);
  const [isStartHiringButtonVisible, setIsStartHiringButtonVisible] =
    useState(true);
  const [applicationStatus, setApplicationStatus] = useState("Pre-screened");

  // Handle back navigation
  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        console.log("Fetching application data for jobBidId:", jobBidId);
        const appData = await getApplication(jobBidId.toString());
        console.log("Application data response:", appData);
        setApplication(appData || null);
        setError(null);
      } catch (err) {
        console.error("Error fetching application data:", err);
        setError("Failed to load application data");
        setApplication(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [jobBidId]);

  // Extract data with fallbacks to dummy data for demo
  const firstName = application?.name?.split(" ")[0] || "Ben";
  const lastName = application?.name?.split(" ")[1] || "Rodriguez";
  const fullName = application?.name || "Ben Rodriguez";
  const email = application?.email || "testemail898955@gmail.com";
  const phone = application?.phone || "623-388-8144 (home)";
  const address = "3523 W Stella Lane Phoenix, AZ 85019";
  const source = application?.source || "Web Site";
  const position =
    application?.position || "Petsmart Transfer Non-Req External Seeker Site";
  const status = application?.status || "Offered";
  const ssn = application?.ssn || "xxx-xx-5544";

  // Generate initials for avatar
  const initials = `${firstName[0]?.toUpperCase() || "B"}${
    lastName[0]?.toUpperCase() || "R"
  }`;

  return (
    <div className="bg-white w-full max-w-7xl mx-auto">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Profile Information Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <ChevronLeft
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={handleBackClick}
          />
          <h1 className="text-xl font-semibold text-gray-900">
            Profile Information
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            Prev
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Next
          </Button>
        </div>
      </div>

      {/* Main Profile Section */}
      <div className="p-6">
        {loading ? (
          <div className="w-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="w-full text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4 flex-1">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-semibold">
                  {initials}
                </div>

                {/* Profile Info */}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {fullName}
                    </h2>
                    <Badge
                      className={`hover:bg-current ${
                        applicationStatus === "Offered"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {applicationStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">({position})</p>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Source:</span>{" "}
                      <span className="text-gray-600">{source}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Address:
                      </span>{" "}
                      <span className="text-gray-600">{address}</span>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>{" "}
                        <span className="text-gray-600">{phone}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>{" "}
                        <span className="text-gray-600">{email}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-700">SSN:</span>{" "}
                        <span className="text-gray-600">{ssn}</span>
                      </div>
                      {/* Start Hiring Process Button */}
                      {isStartHiringButtonVisible && (
                        <Button
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium"
                          onClick={() => {
                            setActiveTab("Hiring Process");
                            setIsHiringProcessStarted(true);
                            setIsStartHiringButtonVisible(false);
                          }}
                        >
                          Start Hiring Process
                          <BsArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                    {/* Other Applications Button */}
                    <div className="mt-3">
                      <OtherApplicationsDrawer applicantName={fullName} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Icons */}
              <TooltipProvider>
                <div className="flex items-center justify-between w-80 bg-gray-50 rounded-lg p-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsBookmark className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bookmark</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsHash className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Text</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsEnvelope className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Message</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsFileText className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Print</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsArrowUpRight className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Forward</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsChatSquare className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Tag</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-200">
                        <BsThreeDots className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More Options</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "Application" && (
                <ApplicationTab
                  currentStep={4}
                  overviewData={null}
                  isLoading={false}
                  error={null}
                />
              )}
              {activeTab === "Interview" && <InterviewQuestionsTab />}
              {activeTab === "Additional Info" && <AdditionalInfoTab />}
              {activeTab === "Documents" && <CompanyDocumentsTab />}
              {activeTab === "Onboarding" && <OnboardingTab />}
              {activeTab === "Notes" && <NotesTab />}
              {activeTab === "Offer" && <OfferTab />}
              {activeTab === "Hiring Process" && (
                <HiringProcessTab
                  isStarted={isHiringProcessStarted}
                  onNavigateToOfferTab={() => setActiveTab("Offer")}
                  onStatusChange={(status) => setApplicationStatus(status)}
                />
              )}
              {activeTab === "History" && <HistoryTab />}
              {activeTab === "Support" && (
                <div className="p-8 text-center text-gray-500">
                  Support content will be displayed here
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
      />
    </div>
  );
}
