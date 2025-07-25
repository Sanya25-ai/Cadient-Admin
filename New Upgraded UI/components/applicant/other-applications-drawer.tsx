"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";
import { useState } from "react";

interface OtherApplicationsDrawerProps {
  applicantName: string;
}

export default function OtherApplicationsDrawer({
  applicantName,
}: OtherApplicationsDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  // Mock data for other applications based on the image
  const otherApplications = [
    {
      id: 1,
      name: "Bellmeyer, Bryan",
      applied: "4/30/2025",
      position: "Distribution Warehouse Associate",
      location: "0012 Phoenix DC",
      status: "Pre-Screened",
      exclusive: "Yes",
      rehire: "--",
      score: "--",
      partnerScore: "--",
      hiringStep:
        "Application Review ( Recommend for Next Step ) Interview Prep - DC ( Prepare for interview ) 1st Interview ( Recommend for Next Step ) 2nd Interview ( Recommend for Next Step ) Contingent Offer ( Offer Accepted ) Onsite Kit Drug Screening ( Pass ) Submit Background Check Request ( Pass ) I-9 Documentation Confirmation Step ( Yes, I have confirmed that the documentation presented is valid to complete the Form I-9 ) Onboarding ( Employee Onboarding Complete )",
    },
    {
      id: 2,
      name: "Bellmeyer, Bryan",
      applied: "4/24/2025",
      position: "DC Maintenance Manager",
      location: "0012 Phoenix DC",
      status: "Pre-Screened",
      exclusive: "Yes",
      rehire: "--",
      score: "--",
      partnerScore: "--",
      hiringStep:
        "Application Review ( Recommend for Next Step ) Interview Prep - DC ( Prepare for interview ) 1st Interview ( Recommend for Next Step ) 2nd Interview ( Recommend for Next Step ) Contingent Offer ( Offer Accepted ) Drug Screening ( Pass ) Submit Background Check Request ( Pass ) I-9 Documentation Confirmation Step ( Yes, I have confirmed that the documentation presented is valid to complete the Form I-9 ) Onboarding ( Employee Onboarding Complete )",
    },
    {
      id: 3,
      name: "Bellmeyer, Bryan",
      applied: "3/27/2025",
      position: "Distribution Warehouse Associate",
      location: "0012 Phoenix DC",
      status: "Hired",
      exclusive: "Yes",
      rehire: "--",
      score: "--",
      partnerScore: "--",
      hiringStep:
        "Application Review ( Recommend for Next Step ) Interview Prep - DC ( Prepare for interview ) 1st Interview ( Recommend for Next Step ) 2nd Interview ( Recommend for Next Step ) Contingent Offer ( Offer Accepted )",
    },
  ];

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <TooltipProvider>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:bg-orange-50 transition-colors flex items-center gap-2 border-0"
          >
            <User className="w-4 h-4 text-orange-500" />
            Other Applications (3)
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="p-0 overflow-hidden"
          style={{ width: "70vw", maxWidth: "70vw" }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-6 py-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-1 h-8 w-8"
                  >
                    ←
                  </Button>
                  <SheetTitle className="text-lg font-semibold">
                    Other Applications
                  </SheetTitle>
                </div>
              </div>
              <div className="text-left mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Number of Applications</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  This job seeker has 3 applications.
                </p>
              </div>
            </SheetHeader>

            {/* Action Bar - Matching pre-screened applications style */}
            <div className="p-4 bg-[#EE5A370D] border-b border-gray-200 flex justify-between items-center mb-3">
              <div
                className="text-gray-700"
                style={{
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "1.4",
                  letterSpacing: "0%",
                }}
              >
                Total Records:{" "}
                <span className="font-medium text-[#F7941D]">3</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setIsActionsOpen(!isActionsOpen)}
                    className="flex items-center justify-center h-10 px-4 py-2 bg-white text-[#EE5A37] border border-[#EE5A37] rounded-md hover:bg-orange-50"
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    Actions
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isActionsOpen && (
                    <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Assign
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Bookmark
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Change Hiring Step
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Change Status
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Send a Message
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Extend Application
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Forward Interview Guide
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Forward Application Details
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Initiate Hiring Process
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 text-sm">
                          Add Tag
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 pl-4 pr-12 w-64 border border-gray-300 rounded bg-white"
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  />
                  <button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-gray-50 text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white rounded flex items-center justify-center">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>

                <select
                  className="h-10 px-3 py-2 border border-gray-300 rounded bg-white"
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  <option>10 Records per page</option>
                  <option>25 Records per page</option>
                  <option>50 Records per page</option>
                </select>

                <div className="flex items-center gap-2">
                  <button className="h-10 w-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: 400,
                      fontSize: "14px",
                    }}
                  >
                    Page <span className="font-medium">1</span> of{" "}
                    <span className="font-medium">1</span>
                  </span>
                  <button className="h-10 w-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Table */}
            <div className="flex-1 overflow-auto px-6 pt-4">
              <div className="overflow-x-auto border rounded-md">
                <table className="min-w-full">
                  <thead className="sticky top-0 bg-[#EE5A370D] z-10">
                    <tr>
                      <th
                        className="w-12 px-3 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 w-4 h-4"
                        />
                      </th>
                      <th
                        className="px-4 w-48 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Name
                      </th>
                      <th
                        className="px-4 w-24 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Applied
                      </th>
                      <th
                        className="px-4 w-32 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Position
                      </th>
                      <th
                        className="px-4 w-28 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Location
                      </th>
                      <th
                        className="px-4 w-32 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Status
                      </th>
                      <th
                        className="px-4 w-20 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Exclusive?
                      </th>
                      <th
                        className="px-4 w-20 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Rehire
                      </th>
                      <th
                        className="px-4 w-20 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Score
                      </th>
                      <th
                        className="px-4 w-28 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Partner Score
                      </th>
                      <th
                        className="px-4 w-60 h-12 text-left"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Hiring Step
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {otherApplications.map((app, index) => (
                      <tr key={app.id} className="h-14 hover:bg-gray-50">
                        <td className="px-3 h-14">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 w-4 h-4"
                          />
                        </td>
                        <td
                          className="px-4 relative text-black h-14"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="font-medium text-black hover:underline hover:text-[#EE5A37] whitespace-nowrap"
                              style={{
                                fontFamily: "Open Sans",
                                fontWeight: 500,
                                fontSize: "14px",
                                lineHeight: "1.4",
                                letterSpacing: "0%",
                              }}
                            >
                              {app.name}
                            </span>
                            {index === 2 && (
                              <div className="flex gap-1 ml-2">
                                <svg
                                  className="w-4 h-4 text-orange-500"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.applied}
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.position}
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.location}
                        </td>
                        <td className="px-4 h-14 whitespace-nowrap">
                          <Badge
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              app.status === "Hired"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {app.status}
                          </Badge>
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.exclusive}
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.rehire}
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.score}
                        </td>
                        <td
                          className="text-black px-4 h-14 whitespace-nowrap"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          {app.partnerScore}
                        </td>
                        <td
                          className="px-4 h-14"
                          style={{
                            fontFamily: "Open Sans",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "1.4",
                            letterSpacing: "0%",
                          }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="text-black cursor-pointer line-clamp-2 overflow-hidden text-ellipsis"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  lineHeight: "1.4",
                                  maxHeight: "2.8em",
                                }}
                              >
                                {truncateText(app.hiringStep, 80)}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-lg p-4 text-sm bg-gray-900 text-white rounded-lg shadow-lg"
                            >
                              <div className="whitespace-pre-wrap leading-relaxed">
                                {app.hiringStep}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
