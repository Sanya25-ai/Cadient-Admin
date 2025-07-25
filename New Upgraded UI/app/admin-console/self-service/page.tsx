"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SelfServicePage() {
  const [showHelpMessage, setShowHelpMessage] = useState(false);

  const handleHelpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowHelpMessage(true);
    setTimeout(() => {
      setShowHelpMessage(false);
      window.open("/help", "_blank");
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="h-full bg-white flex flex-col">
        {/* Header with Back Navigation */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin-console/organization">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center p-2 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-[#EE5A37]">
                Self Service Console
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Create and test your self service changes and then apply them to
                a corresponding application
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
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

            {/* Welcome Section */}
            <div className="mb-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome, Pratham!
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Self Service Management Console
                </p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Welcome to the Self Service Management Console
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                You can create self service changes and add individual change
                units to them. Then, your self service changes can be applied to
                a UAT system where they can be reviewed and then applied to a
                Production system. You can view self service changes from this
                page and can click on a specific self service change to see its
                details. To see a list of all self service changes, click on the
                See All Self Service Changes link.
              </p>
            </div>

            {/* Action Cards */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/admin-console/self-service/create"
                  className="group"
                >
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-[#EE5A37]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#EE5A37] bg-opacity-[0.1] rounded-lg flex items-center justify-center group-hover:bg-[#EE5A37] group-hover:bg-opacity-[0.2]">
                        <svg
                          className="w-5 h-5 text-[#EE5A37]"
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
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-[#EE5A37]">
                          Create Self Service Change
                        </h4>
                        <p className="text-sm text-gray-600">
                          Start a new self service change
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/admin-console/self-service/all" className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-[#EE5A37]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#EE5A37] bg-opacity-[0.1] rounded-lg flex items-center justify-center group-hover:bg-[#EE5A37] group-hover:bg-opacity-[0.2]">
                        <svg
                          className="w-5 h-5 text-[#EE5A37]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-[#EE5A37]">
                          See All Self Service Changes
                        </h4>
                        <p className="text-sm text-gray-600">
                          View and manage existing changes
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Help Message */}
            {showHelpMessage && (
              <div className="mb-6">
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                  <p className="text-sm">
                    You will be redirected to a new tab for help documentation.
                  </p>
                </div>
              </div>
            )}

            {/* Active Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Active
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#EE5A37] flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#EE5A37] rounded-full"></div>
                      </div>
                      <Link
                        href="/admin-console/self-service/system"
                        className="text-[#EE5A37] hover:text-[#d14d2a] hover:underline font-medium cursor-pointer"
                      >
                        System
                      </Link>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                      In-Progress
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 font-medium">
                        System Configuration
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                      In-Progress
                    </span>
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
                  <button
                    onClick={handleHelpClick}
                    className="text-[#EE5A37] hover:underline text-xs"
                  >
                    Help
                  </button>
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
      </div>
    </ProtectedRoute>
  );
}
