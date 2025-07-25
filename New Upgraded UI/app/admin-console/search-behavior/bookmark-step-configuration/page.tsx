"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BookmarkRole {
  name: string;
  standardBookmark: boolean;
  colorBookmark: boolean;
  labeledBookmark: boolean;
}

export default function BookmarkStepConfigurationPage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [roles, setRoles] = useState<BookmarkRole[]>([
    {
      name: "Calendar Integration Interview Scheduling",
      standardBookmark: true,
      colorBookmark: false,
      labeledBookmark: false,
    },
    {
      name: "Regional Manager Organizer",
      standardBookmark: true,
      colorBookmark: false,
      labeledBookmark: false,
    },
    {
      name: "Sales Demo Retail Omega Approver",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega eQuest Manager",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Hiring Manager",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Hiring Manager Everify",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Hourly Recruiter",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Hourly Recruiter Everify",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Hourly System Admin",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Recruiter",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega Recruiter Everify",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Sales Demo Retail Omega System Admin",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "SD Hybrid Recruiter",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "SELF USER ASSOCIATION",
      standardBookmark: true,
      colorBookmark: false,
      labeledBookmark: false,
    },
    {
      name: "Workforce Hiring Analytics",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Workforce Hiring Analytics - Advanced",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Workforce Hiring Analytics - Legal",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
    {
      name: "Workforce Hiring Analytics - Requisition",
      standardBookmark: false,
      colorBookmark: false,
      labeledBookmark: true,
    },
  ]);

  const handleBookmarkChange = (
    index: number,
    type: "standardBookmark" | "colorBookmark" | "labeledBookmark"
  ) => {
    const newRoles = [...roles];
    // Reset all bookmark types for this role
    newRoles[index].standardBookmark = false;
    newRoles[index].colorBookmark = false;
    newRoles[index].labeledBookmark = false;
    // Set the selected type
    newRoles[index][type] = true;
    setRoles(newRoles);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmDialog(false);
    setIsEditMode(false);
    // Handle actual save logic here
    console.log("Saving bookmark configuration...");
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setIsEditMode(false);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Fixed Header - positioned below main navbar (70px) */}
      <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
        {/* Sub Header with Back Navigation and Title */}
        <div className="px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin-console/search-behavior">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#EE5A37]">
              Advance Bookmark Configuration
            </h1>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-full">
          {/* Description and Edit/Save/Cancel buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <p className="text-sm text-gray-700 flex-1">
              Configure the bookmark functionality for different roles.
            </p>

            <div className="flex gap-2 flex-shrink-0">
              {!isEditMode ? (
                <Button
                  onClick={handleEdit}
                  className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white flex items-center gap-2 px-4 py-2"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-4 py-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Configuration Table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr
                    className="border-b border-gray-200"
                    style={{ backgroundColor: "rgba(238, 90, 55, 0.08)" }}
                  >
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 w-1/2"></th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900 w-1/6">
                      Standard Bookmark
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900 w-1/6">
                      Color Bookmark
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900 w-1/6">
                      Labeled Bookmark
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {roles.map((role, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {role.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isEditMode ? (
                          <input
                            type="radio"
                            name={`bookmark-${index}`}
                            checked={role.standardBookmark}
                            onChange={() =>
                              handleBookmarkChange(index, "standardBookmark")
                            }
                            className="w-4 h-4 text-[#EE5A37] focus:ring-[#EE5A37] focus:ring-2"
                            style={{ accentColor: "#EE5A37" }}
                          />
                        ) : (
                          role.standardBookmark && (
                            <Check className="h-5 w-5 text-[#EE5A37] mx-auto" />
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isEditMode ? (
                          <input
                            type="radio"
                            name={`bookmark-${index}`}
                            checked={role.colorBookmark}
                            onChange={() =>
                              handleBookmarkChange(index, "colorBookmark")
                            }
                            className="w-4 h-4 text-[#EE5A37] focus:ring-[#EE5A37] focus:ring-2"
                            style={{ accentColor: "#EE5A37" }}
                          />
                        ) : (
                          role.colorBookmark && (
                            <Check className="h-5 w-5 text-[#EE5A37] mx-auto" />
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isEditMode ? (
                          <input
                            type="radio"
                            name={`bookmark-${index}`}
                            checked={role.labeledBookmark}
                            onChange={() =>
                              handleBookmarkChange(index, "labeledBookmark")
                            }
                            className="w-4 h-4 text-[#EE5A37] focus:ring-[#EE5A37] focus:ring-2"
                            style={{ accentColor: "#EE5A37" }}
                          />
                        ) : (
                          role.labeledBookmark && (
                            <Check className="h-5 w-5 text-[#EE5A37] mx-auto" />
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Save Bookmark Configuration
                  </h3>
                  <button
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-base leading-relaxed">
                    Updating a role to "Standard Bookmarks" will result in
                    deleting bookmarks set by users in that role. Are you sure
                    you want to save your changes?
                  </p>
                </div>

                {/* Footer */}
                <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmSave}
                    className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white px-6 py-2"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-300 pt-6 mt-12">
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-center justify-between">
                <Link href="/help" className="text-[#EE5A37] hover:underline">
                  Help
                </Link>
                <p className="text-xs text-gray-500">
                  Copyright © 2000 - 2025 by Cadient LLC. All rights reserved.
                </p>
              </div>
              <p className="text-xs text-gray-500">
                U. S. Patents 7,080,057; 7,310,626; 7,558,767; 7,562,059;
                7,472,097; 7,606,778; 8,086,558 and 8,046,251.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
