"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";

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

interface PositionPageProps {
  params: Promise<{ position: string }>;
}

export default function PositionPage({ params }: PositionPageProps) {
  const router = useRouter();
  const { position } = use(params);
  const decodedPosition = decodeURIComponent(position);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Navigation and Position Name */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-[#EE5A37]">
            {decodedPosition}
          </h1>
        </div>
      </div>

      {/* Filter Results Button Section */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex justify-end">
          <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-[#EE5A37]/90 bg-[#EE5A37] h-10 px-4 rounded-md">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
              />
            </svg>
            Filter Results
          </button>
        </div>
      </div>

      {/* Action Header */}
      <div className="bg-orange-50 bg-opacity-80 border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-700 font-semibold">
            Total Records: <span className="font-medium text-[#F7941D]">1</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center h-10 px-4 py-2 bg-white text-[#EE5A37] border border-[#EE5A37] rounded-md font-medium text-sm"
              >
                select an action...
                <svg
                  className="ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Bookmark
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Change Hiring Step
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Change Status
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Send a Message
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Extend Application
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Forward Interview Guide
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Forward Application Details
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Initiate Hiring Process
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Resend Invite for Job Board
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Add Tag
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Export All Results
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="text-sm text-gray-600">Results: 1-1 of 1</span>

            <span className="text-sm text-gray-600">Page: 1 of 1</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-orange-50 bg-opacity-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 w-4 h-4"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Applied
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    SmartTenure
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    SmartScore
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    WOTC Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Former Employee?
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Rehire Eligible?
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    % Score
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Availability
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-black border-b">
                    Hiring Step
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {mockApplicationsData.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 w-4 h-4"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href="#"
                        className="text-black hover:text-[#EE5A37] font-medium"
                      >
                        {application.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.appliedDate}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.status}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.smartScore}%
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.smartScore}%
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.location}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.wotcStatus}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.formerEmployee}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.rehireEligible}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.score}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.percentScore}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.availability}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {application.hiringStep}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
