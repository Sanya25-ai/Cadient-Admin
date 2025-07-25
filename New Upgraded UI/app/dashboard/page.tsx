"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { useState } from "react";

// Mock applications data for the position
const mockApplicationsData = [
  {
    id: "1",
    name: "Matrix, Albert",
    appliedDate: "7/9/2025",
    position: "After Migration",
    location: "Sample",
    smartScore: 0,
    phone: "(555) 123-4567",
    email: "albert.matrix@email.com",
    availability: "Applicant Additional Info | Send Applicant Message",
    hiringStep: "Pre-Screened",
    status: "Pre-Screened",
    wotcStatus: "Not Screened",
    former: "-",
    rehire: "-",
    partner: "-",
    assessmentStatus: "Not Started",
    assessmentScore: 0,
    assessmentDate: "7/9/2025",
    assessmentNotes: "",
    smartTenure: 0,
    percentScore: "-",
    formerEmployee: "-",
    rehireEligible: "-",
    score: "-",
  },
];

const handlePositionClick = (positionName: string) => {
  const encodedPosition = encodeURIComponent(positionName);
  window.location.href = `/positions/${encodedPosition}`;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all-requisition");
  const [chartTab, setChartTab] = useState("workflow-category");
  const [searchType, setSearchType] = useState("candidates");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedSearchType, setSelectedSearchType] = useState("Candidates");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [headerSearchType, setHeaderSearchType] = useState("Candidates");
  const [isDraftExpanded, setIsDraftExpanded] = useState(true);
  const [isActiveExpanded, setIsActiveExpanded] = useState(true);
  const [filterBy, setFilterBy] = useState("Status");
  const [scheduledEventsTab, setScheduledEventsTab] =
    useState("your-interviews");
  const [isSchedulingDrawerOpen, setIsSchedulingDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        {/* Navigation Tabs */}
        <div className="px-6 flex items-end h-12">
          <div className="flex space-x-8 relative">
            <button
              onClick={() => setActiveTab("all-requisition")}
              className={`pb-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "all-requisition"
                  ? "border-[#EE5A37] text-[#EE5A37]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              All Requisition
            </button>

            <button
              onClick={() => setActiveTab("your-requisition")}
              className={`pb-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "your-requisition"
                  ? "border-[#EE5A37] text-[#EE5A37]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Your Requisition
            </button>
            <button
              onClick={() => setActiveTab("all-positions")}
              className={`pb-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "all-positions"
                  ? "border-[#EE5A37] text-[#EE5A37]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              All Positions
            </button>
            <button
              onClick={() => setActiveTab("your-positions")}
              className={`pb-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "your-positions"
                  ? "border-[#EE5A37] text-[#EE5A37]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Your Positions
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${
            activeTab === "your-positions" || activeTab === "all-positions"
              ? "lg:grid-cols-4"
              : "lg:grid-cols-5"
          }`}
        >
          {activeTab === "your-positions" || activeTab === "all-positions" ? (
            <>
              {/* Total Positions */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    TOTAL POSITIONS
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">57</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="mb-1 h-4"></div>
                  <div className="h-6"></div>
                </div>
              </div>

              {/* Total Applications */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    TOTAL APPLICATIONS
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">48</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="mb-1 h-4"></div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center text-xs text-orange-500">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Bookmarked
                    </span>
                    <span className="text-xs text-gray-600 ml-1">(0)</span>
                  </div>
                </div>
              </div>

              {/* Hires */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    HIRES
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">0</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <p className="text-xs text-gray-500 mb-1">Last 30 Days</p>
                  <div className="flex items-center">
                    <span className="inline-flex items-center text-xs text-orange-500">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Tax Credit Eligible
                    </span>
                    <span className="text-xs text-gray-600 ml-1">(0)</span>
                  </div>
                </div>
              </div>

              {/* Prospects */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    PROSPECTS
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">0</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <p className="text-xs text-gray-500 mb-1">Last 90 Days</p>
                  <div className="flex items-center">
                    <span className="inline-flex items-center text-xs text-orange-500">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Bookmarked
                    </span>
                    <span className="text-xs text-gray-600 ml-1">(0)</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Total Requisitions */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    TOTAL REQUISITIONS
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">57</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="mb-1 h-4"></div>
                  <div className="h-6"></div>
                </div>
              </div>

              {/* Total Candidates */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    GENERAL CANDIDATES
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">50</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="mb-1 h-4"></div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center text-xs text-orange-500">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Your Bookmarks
                    </span>
                    <span className="text-xs text-gray-600 ml-1">(25)</span>
                  </div>
                </div>
              </div>

              {/* Requisition Hires */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    REQUISITION HIRES
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">0</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <p className="text-xs text-gray-500 mb-1">Last 30 Days</p>
                  <div className="flex items-center">
                    <span className="inline-flex items-center text-xs text-orange-500">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Tax Credit Eligible
                    </span>
                    <span className="text-xs text-gray-600 ml-1">(0)</span>
                  </div>
                </div>
              </div>

              {/* Prospects */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    PROSPECTS
                  </p>
                  <p className="text-xl font-bold text-[#EE5A37]">0</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <p className="text-xs text-gray-500 mb-1">Last 90 Days</p>
                  <div className="flex items-center">
                    <span className="inline-flex items-center text-xs text-orange-500">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></span>
                      Bookmarked
                    </span>
                    <span className="text-xs text-gray-600 ml-1">(0)</span>
                  </div>
                </div>
              </div>

              {/* Your Sponsored Jobs */}
              <div className="bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 h-20 flex justify-between">
                <div className="flex flex-col justify-center">
                  <p
                    className="font-semibold text-gray-600 mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    YOUR SPONSORED JOBS
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Positions</p>
                      <p className="text-lg font-bold text-[#EE5A37]">0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Requisitions</p>
                      <p className="text-lg font-bold text-[#EE5A37]">0</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="mb-1 h-4"></div>
                  <div className="h-6"></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-4">
          {activeTab === "your-positions" || activeTab === "all-positions" ? (
            <>
              {/* More Application Views and Scheduled Events - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* More Application Views - 2/3 Width */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    MORE APPLICATION VIEWS
                  </h3>

                  {/* First Row - 2 buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Pre-screened Applications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          Pre-screened Applications
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>

                    {/* Prospects */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          Prospects
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>

                    {/* Hires */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          Hires
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>

                    {/* Tax Credit Eligible */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          Tax Credit Eligible
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>
                  </div>

                  {/* Second Row - 2 buttons with same width as above */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Your Bookmarks */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          Your Bookmarks
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>

                    {/* All Applications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          All Applications
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>

                    {/* Your Bookmarks (second) */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-orange-500 hover:bg-opacity-[0.08] cursor-pointer transition-colors shadow-md">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          Your Bookmarks
                        </span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>
                  </div>
                </div>

                {/* Scheduled Events Card - 1/3 Width */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    SCHEDULED EVENTS
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    List of upcoming interviews
                  </p>

                  {/* Tab Navigation - Dashboard Inspired */}
                  <div className="mb-4">
                    <div className="bg-orange-50 bg-opacity-80 rounded-lg p-2 inline-block w-full">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            setScheduledEventsTab("your-interviews")
                          }
                          className={`flex-1 px-2 py-1 text-xs font-medium ${
                            scheduledEventsTab === "your-interviews"
                              ? "text-[#EE5A37] border-b-2 border-[#EE5A37]"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Your Interviews
                        </button>
                        <button
                          onClick={() =>
                            setScheduledEventsTab("interviews-by-requisition")
                          }
                          className={`flex-1 px-2 py-1 text-xs font-medium ${
                            scheduledEventsTab === "interviews-by-requisition"
                              ? "text-[#EE5A37] border-b-2 border-[#EE5A37]"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Interviews by Requisition
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interview Schedule List */}
                  <div className="space-y-3">
                    {scheduledEventsTab === "your-interviews" ? (
                      <>
                        {/* Tuesday Section */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Tuesday
                          </h4>

                          {/* Interview Entry */}
                          <div className="bg-white rounded-lg border border-gray-200 p-3">
                            <div className="flex items-start space-x-3">
                              {/* Date Box */}
                              <div className="bg-orange-500 text-white rounded text-center p-2 min-w-[40px]">
                                <div className="text-xs font-bold">JUL</div>
                                <div className="text-sm font-bold">15</div>
                              </div>

                              {/* Interview Details */}
                              <div className="flex-1">
                                <div className="text-xs text-gray-600 mb-1">
                                  5:00 AM - 1:30 PM
                                </div>
                                <div
                                  className="text-sm font-semibold text-orange-600 mb-1 cursor-pointer hover:text-orange-700"
                                  onClick={() =>
                                    (window.location.href =
                                      "/applicant?id=4&tab=interview")
                                  }
                                >
                                  Phone Screen
                                </div>
                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                  Emily Davis
                                </div>
                                <div className="text-sm text-gray-700">
                                  Accountant (281)
                                </div>
                              </div>

                              {/* Go to Scheduling Button */}
                              <div className="flex-shrink-0">
                                <button
                                  onClick={() =>
                                    setIsSchedulingDrawerOpen(true)
                                  }
                                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded flex items-center"
                                >
                                  <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Go to Scheduling
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Accountant (281) Section */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Accountant (281)
                          </h4>

                          {/* George Victor Entry */}
                          <div className="bg-white rounded-lg border border-gray-200 p-3">
                            <div className="flex items-start space-x-3">
                              {/* Date Box */}
                              <div className="bg-orange-500 text-white rounded text-center p-2 min-w-[40px]">
                                <div className="text-xs font-bold">JUL</div>
                                <div className="text-sm font-bold">15</div>
                              </div>

                              {/* Interview Details */}
                              <div className="flex-1">
                                <div
                                  className="text-sm font-semibold text-orange-600 mb-1 cursor-pointer hover:text-orange-700"
                                  onClick={() =>
                                    (window.location.href =
                                      "/applicant?id=4&tab=interview")
                                  }
                                >
                                  Emily Davis
                                </div>
                                <div className="text-xs text-gray-600 mb-1">
                                  5:00 AM - 1:30 PM
                                </div>
                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                  Phone Screen
                                </div>
                                <div className="text-sm text-gray-700">
                                  Pratham Jain (you)
                                </div>
                              </div>

                              {/* Go to Scheduling Button */}
                              <div className="flex-shrink-0">
                                <button
                                  onClick={() =>
                                    setIsSchedulingDrawerOpen(true)
                                  }
                                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded flex items-center"
                                >
                                  <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Go to Scheduling
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Applications by Position and Applicant Summary - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Applications by Position - 50% Width */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    APPLICATIONS BY POSITION
                  </h3>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Positions
                    </h4>
                    <div className="space-y-2">
                      <div
                        className="text-sm text-[#EE5A37] cursor-pointer hover:text-[#d14d2a] hover:underline"
                        onClick={() =>
                          handlePositionClick(
                            "Administrative Associate Accounting"
                          )
                        }
                      >
                        • Administrative Associate Accounting
                      </div>
                      <div
                        className="text-sm text-[#EE5A37] cursor-pointer hover:text-[#d14d2a] hover:underline"
                        onClick={() =>
                          handlePositionClick("Call Center Representative")
                        }
                      >
                        • Call Center Representative
                      </div>
                      <div
                        className="text-sm text-[#EE5A37] cursor-pointer hover:text-[#d14d2a] hover:underline"
                        onClick={() =>
                          handlePositionClick("Customer Service Representative")
                        }
                      >
                        • Customer Service Representative
                      </div>
                      <div
                        className="text-sm text-[#EE5A37] cursor-pointer hover:text-[#d14d2a] hover:underline"
                        onClick={() => handlePositionClick("Sales Associate")}
                      >
                        • Sales Associate
                      </div>
                      <div
                        className="text-sm text-[#EE5A37] cursor-pointer hover:text-[#d14d2a] hover:underline"
                        onClick={() =>
                          handlePositionClick("Marketing Specialist")
                        }
                      >
                        • Marketing Specialist
                      </div>
                      <div
                        className="text-sm text-[#EE5A37] cursor-pointer hover:text-[#d14d2a] hover:underline"
                        onClick={() => handlePositionClick("Data Analyst")}
                      >
                        • Data Analyst
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applicant Summary - 50% Width */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    APPLICANT SUMMARY
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Workflow Candidates
                  </p>

                  {/* Bar Chart */}
                  <div className="relative">
                    {/* Chart Container */}
                    <div className="flex">
                      {/* Y-axis labels */}
                      <div className="flex flex-col justify-between h-40 pr-3 text-xs text-gray-500">
                        <span>100 —</span>
                        <span>75 —</span>
                        <span>50 —</span>
                        <span>25 —</span>
                        <span>0 —</span>
                      </div>

                      {/* Chart bars and labels container */}
                      <div className="flex-1 pl-3">
                        {/* Chart bars */}
                        <div className="flex items-end justify-between h-40 border-l border-gray-200 relative">
                          {/* Background grid lines */}
                          <div className="absolute inset-0 flex flex-col justify-between">
                            <div className="border-t border-gray-100 w-full"></div>
                            <div className="border-t border-gray-100 w-full"></div>
                            <div className="border-t border-gray-100 w-full"></div>
                            <div className="border-t border-gray-100 w-full"></div>
                            <div className="border-t border-gray-100 w-full"></div>
                          </div>

                          {/* Interest */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "24px" }}
                            ></div>
                          </div>

                          {/* Disqualified */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "80px" }}
                            ></div>
                          </div>

                          {/* Pre-screened */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "16px" }}
                            ></div>
                          </div>

                          {/* Review Application */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "140px" }}
                            ></div>
                          </div>

                          {/* Interviewed */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "120px" }}
                            ></div>
                          </div>

                          {/* Background check */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "48px" }}
                            ></div>
                          </div>

                          {/* Offer Letter */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "16px" }}
                            ></div>
                          </div>

                          {/* Offered */}
                          <div className="flex flex-col items-center relative z-10 flex-1">
                            <div
                              className="w-4 bg-orange-500"
                              style={{ height: "48px" }}
                            ></div>
                          </div>
                        </div>

                        {/* X-axis labels below the chart */}
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Interest
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Disqualified
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Pre-screened
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Review Application
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Interviewed
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Background check
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Offer Letter
                          </span>
                          <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                            Offered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Left Column - Charts */}
              <div className="lg:col-span-3 space-y-4">
                {activeTab === "all-requisition" ? (
                  <>
                    {/* Requisition Summary */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-96 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        REQUISITION SUMMARY
                      </h3>

                      <div className="flex flex-col 2xl:flex-row gap-6 flex-1">
                        {/* Yours Pie Chart Box */}
                        <div className="bg-orange-50 rounded-lg p-4 2xl:p-6 flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex flex-col items-center justify-center gap-3 2xl:gap-6 2xl:flex-row h-full">
                            <div className="flex flex-col items-center flex-shrink-0">
                              <h4 className="text-sm 2xl:text-lg font-semibold text-gray-700 mb-2 2xl:mb-4">
                                Yours
                              </h4>
                              <div className="relative w-32 h-32 2xl:w-48 2xl:h-48">
                                <svg
                                  className="w-full h-full transform -rotate-90"
                                  viewBox="0 0 100 100"
                                >
                                  {/* Background circle */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#f3f4f6"
                                    strokeWidth="10"
                                  />
                                  {/* Draft - Orange - 9/13 = 69.2% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#f97316"
                                    strokeWidth="10"
                                    strokeDasharray="152 220"
                                    strokeDashoffset="0"
                                  />
                                  {/* Active - Green - 3/13 = 23.1% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="10"
                                    strokeDasharray="51 220"
                                    strokeDashoffset="-152"
                                  />
                                  {/* Canceled - Red - 1/13 = 7.7% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="10"
                                    strokeDasharray="17 220"
                                    strokeDashoffset="-203"
                                  />
                                </svg>
                                {/* Center text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                      13
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      Total
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Legend for Yours */}
                            <div className="flex flex-col justify-center">
                              <div className="space-y-3">
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Draft
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (9)
                                  </span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Active
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (3)
                                  </span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Canceled
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (1)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* All Pie Chart Box */}
                        <div className="bg-orange-50 rounded-lg p-4 2xl:p-6 flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex flex-col items-center justify-center gap-3 2xl:gap-6 2xl:flex-row h-full">
                            <div className="flex flex-col items-center flex-shrink-0">
                              <h4 className="text-sm 2xl:text-lg font-semibold text-gray-700 mb-2 2xl:mb-4">
                                All
                              </h4>
                              <div className="relative w-32 h-32 2xl:w-48 2xl:h-48">
                                <svg
                                  className="w-full h-full transform -rotate-90"
                                  viewBox="0 0 100 100"
                                >
                                  {/* Background circle */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#f3f4f6"
                                    strokeWidth="10"
                                  />
                                  {/* Draft - Orange - 14/67 = 20.9% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#f97316"
                                    strokeWidth="10"
                                    strokeDasharray="46 220"
                                    strokeDashoffset="0"
                                  />
                                  {/* Active - Green - 26/67 = 38.8% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="10"
                                    strokeDasharray="85 220"
                                    strokeDashoffset="-46"
                                  />
                                  {/* Canceled - Red - 26/67 = 38.8% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="10"
                                    strokeDasharray="85 220"
                                    strokeDashoffset="-131"
                                  />
                                  {/* Filled - Dark Orange - 1/67 = 1.5% */}
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#ea580c"
                                    strokeWidth="10"
                                    strokeDasharray="3 220"
                                    strokeDashoffset="-216"
                                  />
                                </svg>
                                {/* Center text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                      67
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      Total
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Legend for All */}
                            <div className="flex flex-col justify-center">
                              <div className="space-y-3">
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Draft
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (14)
                                  </span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Active
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (26)
                                  </span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Canceled
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (26)
                                  </span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-orange-100 rounded-md px-2 py-1 transition-colors">
                                  <div className="w-3 h-3 bg-orange-600 rounded-full mr-3"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    Filled
                                  </span>
                                  <span className="text-[#EE5A37] font-semibold text-sm ml-2">
                                    (1)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Candidate Summary */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            CANDIDATE SUMMARY
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-sm">
                              <span className="font-medium text-gray-700">
                                Total Candidates:
                              </span>
                              <span className="text-[#EE5A37] font-bold ml-1 text-lg">
                                75
                              </span>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-sm">
                              <span className="font-medium text-gray-700">
                                Not in Workflow:
                              </span>
                              <span className="text-[#EE5A37] font-bold ml-1 text-lg">
                                25
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white">
                          +Add Candidate
                        </Button>
                      </div>

                      {/* Chart Tabs */}
                      <div className="mb-6">
                        <div className="bg-orange-50 bg-opacity-80 rounded-lg p-3 inline-block">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => setChartTab("workflow-category")}
                              className={`px-4 py-2 text-sm font-medium ${
                                chartTab === "workflow-category"
                                  ? "text-[#EE5A37] border-b-2 border-[#EE5A37]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              Workflow Category
                            </button>
                            <button
                              onClick={() => setChartTab("other-candidates")}
                              className={`px-4 py-2 text-sm font-medium ${
                                chartTab === "other-candidates"
                                  ? "text-[#EE5A37] border-b-2 border-[#EE5A37]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              Other Candidates
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bar Chart */}
                      <div className="relative">
                        {/* Chart Container */}
                        <div className="flex">
                          {/* Y-axis labels */}
                          <div className="flex flex-col justify-between h-40 pr-3 text-xs text-gray-500">
                            <span>100 —</span>
                            <span>75 —</span>
                            <span>50 —</span>
                            <span>25 —</span>
                            <span>0 —</span>
                          </div>

                          {/* Chart bars and labels container */}
                          <div className="flex-1 pl-3">
                            {/* Chart bars */}
                            <div className="flex items-end justify-between h-40 border-l border-gray-200 relative">
                              {/* Background grid lines */}
                              <div className="absolute inset-0 flex flex-col justify-between">
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                              </div>
                              {chartTab === "other-candidates" ? (
                                <>
                                  {/* Your Bookmarks */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "0px" }}
                                    ></div>
                                  </div>

                                  {/* Open Invitations */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "8px" }}
                                    ></div>
                                  </div>

                                  {/* Pre-Screened Candidates */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "120px" }}
                                    ></div>
                                  </div>

                                  {/* Tax Credit Eligible */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "0px" }}
                                    ></div>
                                  </div>

                                  {/* Top Candidates */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "0px" }}
                                    ></div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* Onboarding */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "8px" }}
                                    ></div>
                                  </div>

                                  {/* Interview */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "80px" }}
                                    ></div>
                                  </div>

                                  {/* Phone screening */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "4px" }}
                                    ></div>
                                  </div>

                                  {/* Review Application */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "140px" }}
                                    ></div>
                                  </div>

                                  {/* Interview Integration */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "120px" }}
                                    ></div>
                                  </div>

                                  {/* Offer Letter */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "32px" }}
                                    ></div>
                                  </div>

                                  {/* Background check */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "8px" }}
                                    ></div>
                                  </div>

                                  {/* Disposition Reason */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "32px" }}
                                    ></div>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* X-axis labels below the chart */}
                            <div className="flex justify-between mt-2">
                              {chartTab === "other-candidates" ? (
                                <>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Your Bookmarks
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Open Invitations
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Pre-Screened Candidates
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Tax Credit Eligible
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Top Candidates
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Onboarding
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Interview
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Phone screening
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Review Application
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Interview Integration
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Offer Letter
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Background check
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Disposition Reason
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Your Requisition Summary */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-96">
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          REQUISITION SUMMARY
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              Filter By:
                            </span>
                            <select
                              className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white min-w-[140px]"
                              value={filterBy}
                              onChange={(e) => setFilterBy(e.target.value)}
                            >
                              <option value="Status">Status</option>
                              <option value="Hiring Manager">
                                Hiring Manager
                              </option>
                              <option value="Location">Location</option>
                            </select>
                          </div>
                          <Button className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white text-sm px-4 py-1.5">
                            + Create a Requisition
                          </Button>
                        </div>
                      </div>

                      {/* Dynamic Content based on Filter */}
                      <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                        {filterBy === "Status" && (
                          <>
                            {/* Draft Section */}
                            <div className="mb-6">
                              <div
                                className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
                                onClick={() =>
                                  setIsDraftExpanded(!isDraftExpanded)
                                }
                              >
                                <div className="flex items-center">
                                  <svg
                                    className={`w-4 h-4 mr-2 transition-transform ${
                                      isDraftExpanded ? "rotate-90" : ""
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    Draft
                                  </h4>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                  9 items
                                </span>
                              </div>
                              {isDraftExpanded && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Assistant Manager (620)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Assistant Manager (627)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Entry Level Accountant (614)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Mobile Crisis Support Specialist (668)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Mobile Crisis Support Specialist (670)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Mobile Crisis Support Specialist (671)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Payroll Administrator (672)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Pharmacist (675)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Tool and Die Technical (622)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      -
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Active Section */}
                            <div>
                              <div
                                className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
                                onClick={() =>
                                  setIsActiveExpanded(!isActiveExpanded)
                                }
                              >
                                <div className="flex items-center">
                                  <svg
                                    className={`w-4 h-4 mr-2 transition-transform ${
                                      isActiveExpanded ? "rotate-90" : ""
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    Active
                                  </h4>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                  3 items
                                </span>
                              </div>
                              {isActiveExpanded && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Pharmacist (611)
                                    </span>
                                    <span className="text-xs text-white bg-[#EE5A37] px-2 py-1 rounded font-medium">
                                      2
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Pharmacist (674)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      0
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer">
                                    <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                      Site Superintendent (616)
                                    </span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                      0
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {filterBy === "Location" && (
                          <div className="space-y-4">
                            {/* Chicago, IL Section */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                Chicago, IL
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                  <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                    Pharmacist (611)
                                  </span>
                                  <span className="text-xs text-white bg-[#EE5A37] px-2 py-1 rounded font-medium">
                                    2
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                  <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                    Pharmacist (674)
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    0
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                  <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                    Site Superintendent (616)
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    0
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {filterBy === "Hiring Manager" && (
                          <div className="space-y-4">
                            {/* Pratham Jain Section */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                Pratham Jain
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                  <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                    Pharmacist (611)
                                  </span>
                                  <span className="text-xs text-white bg-[#EE5A37] px-2 py-1 rounded font-medium">
                                    2
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                  <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                    Pharmacist (674)
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    0
                                  </span>
                                </div>
                                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer">
                                  <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                                    Site Superintendent (616)
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    0
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Candidate Summary */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          CANDIDATE SUMMARY
                        </h3>
                        <Button className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white">
                          +Add Candidate
                        </Button>
                      </div>

                      {/* Chart Tabs */}
                      <div className="mb-6">
                        <div className="bg-orange-50 bg-opacity-80 rounded-lg p-3 inline-block">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => setChartTab("workflow-category")}
                              className={`px-4 py-2 text-sm font-medium ${
                                chartTab === "workflow-category"
                                  ? "text-[#EE5A37] border-b-2 border-[#EE5A37]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              Workflow Category
                            </button>
                            <button
                              onClick={() => setChartTab("other-candidates")}
                              className={`px-4 py-2 text-sm font-medium ${
                                chartTab === "other-candidates"
                                  ? "text-[#EE5A37] border-b-2 border-[#EE5A37]"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              Other Candidates
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bar Chart */}
                      <div className="relative">
                        {/* Chart Container */}
                        <div className="flex">
                          {/* Y-axis labels */}
                          <div className="flex flex-col justify-between h-40 pr-3 text-xs text-gray-500">
                            <span>100 —</span>
                            <span>75 —</span>
                            <span>50 —</span>
                            <span>25 —</span>
                            <span>0 —</span>
                          </div>

                          {/* Chart bars and labels container */}
                          <div className="flex-1 pl-3">
                            {/* Chart bars */}
                            <div className="flex items-end justify-between h-40 border-l border-gray-200 relative">
                              {/* Background grid lines */}
                              <div className="absolute inset-0 flex flex-col justify-between">
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                                <div className="border-t border-gray-100 w-full"></div>
                              </div>
                              {chartTab === "other-candidates" ? (
                                <>
                                  {/* Your Bookmarks - 15 */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "24px" }}
                                    ></div>
                                  </div>

                                  {/* Open Invitations - 0 */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "0px" }}
                                    ></div>
                                  </div>

                                  {/* Pre-Screened Candidates - 54 */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "86px" }}
                                    ></div>
                                  </div>

                                  {/* Tax Credit Eligible - 2 */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "3px" }}
                                    ></div>
                                  </div>

                                  {/* Top Candidates - 12 */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "19px" }}
                                    ></div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* Onboarding */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "8px" }}
                                    ></div>
                                  </div>

                                  {/* Interview */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "80px" }}
                                    ></div>
                                  </div>

                                  {/* Phone screening */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "4px" }}
                                    ></div>
                                  </div>

                                  {/* Review Application */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "140px" }}
                                    ></div>
                                  </div>

                                  {/* Interview Integration */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "120px" }}
                                    ></div>
                                  </div>

                                  {/* Offer Letter */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "32px" }}
                                    ></div>
                                  </div>

                                  {/* Background check */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "8px" }}
                                    ></div>
                                  </div>

                                  {/* Disposition Reason */}
                                  <div className="flex flex-col items-center relative z-10 flex-1">
                                    <div
                                      className="w-6 bg-yellow-500"
                                      style={{ height: "32px" }}
                                    ></div>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* X-axis labels below the chart */}
                            <div className="flex justify-between mt-2">
                              {chartTab === "other-candidates" ? (
                                <>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Your Bookmarks
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Open Invitations
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Pre-Screened Candidates
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Tax Credit Eligible
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Top Candidates
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Onboarding
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Interview
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Phone screening
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Review Application
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Interview Integration
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Offer Letter
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Background check
                                  </span>
                                  <span className="text-xs text-gray-600 text-center leading-tight flex-1">
                                    Disposition Reason
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-4">
                {activeTab !== "positions" && (
                  <>
                    {/* Tags */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-96">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          TAGS
                        </h3>
                        <Button className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white text-sm">
                          + Create Tags
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* Sales Demo Retail Omega Non-Req External Seeker Site */}
                        <div>
                          <div className="flex items-center mb-2">
                            <svg
                              className="w-4 h-4 text-[#EE5A37] mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              Sales Demo Retail Omega Non-Req External Seeker
                              Site
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-3 py-1 border border-[#EE5A37] text-gray-900 text-xs rounded-full bg-orange-500 bg-opacity-[0.08] hover:bg-orange-50">
                              3 Yrs Experience
                            </span>
                            <span className="px-3 py-1 border border-[#EE5A37] text-gray-900 text-xs rounded-full bg-orange-500 bg-opacity-[0.08] hover:bg-orange-50">
                              Management
                            </span>
                            <span className="px-3 py-1 border border-[#EE5A37] text-gray-900 text-xs rounded-full bg-orange-500 bg-opacity-[0.08] hover:bg-orange-50">
                              Sales
                            </span>
                            <span className="px-3 py-1 border border-[#EE5A37] text-gray-900 text-xs rounded-full bg-orange-500 bg-opacity-[0.08] hover:bg-orange-50">
                              Weekends
                            </span>
                          </div>
                        </div>

                        {/* Separator Line */}
                        <div className="border-t border-gray-200"></div>

                        {/* Sales Demo Retail Omega Req External Seeker Site */}
                        <div>
                          <div className="flex items-center mb-2">
                            <svg
                              className="w-4 h-4 text-[#EE5A37] mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              Sales Demo Retail Omega Req External Seeker Site
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-3 py-1 border border-[#EE5A37] text-gray-900 text-xs rounded-full bg-orange-500 bg-opacity-[0.08] hover:bg-orange-50">
                              Management
                            </span>
                            <span className="px-3 py-1 border border-[#EE5A37] text-gray-900 text-xs rounded-full bg-orange-500 bg-opacity-[0.08] hover:bg-orange-50">
                              SalesLead
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resume Search */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-96">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        RESUME SEARCH
                      </h3>

                      {/* Search Type Radio Buttons */}
                      <div className="flex items-center space-x-6 mb-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="searchType"
                            value="candidates"
                            checked={searchType === "candidates"}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="mr-2 text-[#EE5A37] focus:ring-[#EE5A37]"
                          />
                          <span className="text-sm text-gray-700">
                            Candidates
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="searchType"
                            value="applications"
                            checked={searchType === "applications"}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="mr-2 text-[#EE5A37] focus:ring-[#EE5A37]"
                          />
                          <span className="text-sm text-gray-700">
                            Applications
                          </span>
                        </label>
                      </div>

                      {/* Search Input */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Keyword
                          </label>
                          <button className="text-sm text-[#EE5A37] hover:text-[#d14d2a]">
                            Advanced Search
                          </button>
                        </div>
                        <Input
                          type="text"
                          placeholder="Search Key word"
                          className="w-full"
                        />
                      </div>

                      {/* Search Button */}
                      <Button className="w-full bg-[#EE5A37] hover:bg-[#d14d2a] text-white mb-6">
                        Search
                      </Button>

                      {/* Saved Searches */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-900">
                            SAVED SEARCHES
                          </h4>
                          <button className="text-sm text-[#EE5A37] hover:text-[#d14d2a] font-medium">
                            See All
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] cursor-pointer">
                              WebsiteApplied
                            </span>
                            <span className="text-xs text-gray-500">
                              5/20/2025
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-[#EE5A37] hover:text-[#d14d2a] cursor-pointer">
                              Last7Days
                            </span>
                            <span className="text-xs text-gray-500">
                              5/20/2025
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scheduling Drawer */}
      <Sheet
        open={isSchedulingDrawerOpen}
        onOpenChange={setIsSchedulingDrawerOpen}
      >
        <SheetContent
          side="right"
          className="p-0 overflow-hidden"
          style={{ width: "70vw", maxWidth: "70vw" }}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-6 py-4 border-b bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSchedulingDrawerOpen(false)}
                  className="p-1 h-8 w-8 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
                <div>
                  <SheetTitle className="text-lg font-semibold">
                    Scheduled Events
                  </SheetTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    This is a list of all scheduled events. You can view past or
                    future events by clicking the dates on the calendar.
                  </p>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-auto">
              <div className="p-6">
                {/* Calendar and Event Details */}
                <div className="space-y-6">
                  {/* Calendar Section - 30% width and height */}
                  <div className="w-[30%] h-[30%]">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <h3 className="text-sm font-semibold text-gray-900">
                          July 2025
                        </h3>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {/* Day Headers */}
                        <div className="p-1 font-medium text-gray-600">S</div>
                        <div className="p-1 font-medium text-gray-600">M</div>
                        <div className="p-1 font-medium text-gray-600">T</div>
                        <div className="p-1 font-medium text-gray-600">W</div>
                        <div className="p-1 font-medium text-gray-600">T</div>
                        <div className="p-1 font-medium text-gray-600">F</div>
                        <div className="p-1 font-medium text-gray-600">S</div>

                        {/* Previous Month Days */}
                        <div className="p-1 text-gray-400">29</div>
                        <div className="p-1 text-gray-400">30</div>

                        {/* Current Month Days */}
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          1
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          2
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          3
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          4
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          5
                        </div>

                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          6
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          7
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          8
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          9
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          10
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          11
                        </div>
                        <div className="p-1 bg-blue-600 text-white rounded cursor-pointer font-bold">
                          12
                        </div>

                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          13
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          14
                        </div>
                        <div className="p-1 bg-orange-500 text-white rounded cursor-pointer font-bold">
                          15
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          16
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          17
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          18
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          19
                        </div>

                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          20
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          21
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          22
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          23
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          24
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          25
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          26
                        </div>

                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          27
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          28
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          29
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          30
                        </div>
                        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer text-gray-900">
                          31
                        </div>

                        {/* Next Month Days */}
                        <div className="p-1 text-gray-400">1</div>
                        <div className="p-1 text-gray-400">2</div>
                      </div>
                    </div>

                    {/* Filter and Today Buttons - Below Calendar */}
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm">
                        Filter
                      </button>
                      <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm">
                        Today
                      </button>
                    </div>
                  </div>

                  {/* Event Details Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Tuesday, July 15, 2025
                    </h4>

                    {/* Interview Event */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        {/* Date Box */}
                        <div className="bg-orange-500 text-white rounded text-center p-2 min-w-[50px]">
                          <div className="text-xs font-bold">JUL</div>
                          <div className="text-lg font-bold">15</div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">
                            5:00 AM - 1:30 PM
                          </div>
                          <div className="text-orange-600 font-semibold mb-2">
                            Interview for George Victor
                          </div>

                          {/* Event Information Grid */}
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="font-medium text-gray-700">
                                Requisition:
                              </div>
                              <div className="text-gray-600">
                                Accountant (281)
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-700">
                                Time
                              </div>
                              <div className="text-gray-600">
                                5:00 AM - 1:30 PM
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-700">
                                Interviewers
                              </div>
                              <div className="text-gray-600">
                                Pratham Jain (you)
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-700">
                                Type
                              </div>
                              <div className="text-gray-600">Phone Screen</div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="font-medium text-gray-700 text-sm">
                              Location
                            </div>
                            <div className="text-gray-600 text-sm">
                              Call: 360-772-4065
                            </div>
                          </div>
                        </div>

                        {/* Cancel Button */}
                        <div className="flex-shrink-0">
                          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
