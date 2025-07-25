"use client";

import { Button } from "@/components/ui/button";
import type { JobTemplate } from "@/types/job-template";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface JobTemplateDetailModernProps {
  template: JobTemplate;
  onBack: () => void;
}

export function JobTemplateDetailModern({
  template,
  onBack,
}: JobTemplateDetailModernProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [actionsOpen, setActionsOpen] = useState(false);
  const [changeLogsOpen, setChangeLogsOpen] = useState(false);
  const [multiLanguageOpen, setMultiLanguageOpen] = useState(false);
  const [editApproversOpen, setEditApproversOpen] = useState(false);
  const [viewApproversOpen, setViewApproversOpen] = useState(false);
  const [approverMode, setApproverMode] = useState("dont-use"); // "dont-use" or "existing-list"
  const [hasApprovers, setHasApprovers] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedApprover, setSelectedApprover] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const getJobDisplayValue = (property: string): string => {
    switch (property) {
      case "title":
        return template.localeJob?.title || template.title || "";
      case "description":
        return template.localeJob?.description || template.description || "";
      case "requirements":
        return template.localeJob?.requirements || template.requirements || "";
      default:
        return "";
    }
  };

  const handleSaveApprovers = () => {
    if (approverMode === "existing-list" && selectedApprover) {
      setHasApprovers(true);
    } else {
      setHasApprovers(false);
    }
    setEditApproversOpen(false);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleDeleteClick = () => {
    setActionsOpen(false);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    setTimeout(() => {
      setShowDeleteSuccess(false);
      onBack(); // Navigate back to job template library
    }, 2000);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 p-1"
              >
                ←
              </button>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold text-lg">📋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getJobDisplayValue("title")}
                </h1>
                <p className="text-gray-600">
                  Job Template #{template.jobCode}
                </p>
              </div>
              <div className="ml-8">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ● Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-4">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-8 py-3 rounded-full font-medium text-sm transition-colors border ${
                activeTab === "details"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Job Template Details
            </button>
            <button
              onClick={() => setActiveTab("assessments")}
              className={`px-8 py-3 rounded-full font-medium text-sm transition-colors border ${
                activeTab === "assessments"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Assessments and Hiring Process
            </button>
            <button
              onClick={() => setActiveTab("approvers")}
              className={`px-8 py-3 rounded-full font-medium text-sm transition-colors border ${
                activeTab === "approvers"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Approvers
            </button>
          </nav>
        </div>

        {/* Action Buttons Card - Only show for details and assessments tabs */}
        {(activeTab === "details" || activeTab === "assessments") && (
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-end space-x-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                ✏️ Edit Job Details
              </Button>

              {/* Actions Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setActionsOpen(!actionsOpen)}
                  className="flex items-center space-x-2"
                >
                  <span>⚡ Actions</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {actionsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <svg
                          className="h-4 w-4 mr-2"
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
                        Create Requisition
                      </button>
                      <button
                        onClick={onBack}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Back to Library
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Change Logs Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setChangeLogsOpen(!changeLogsOpen)}
                  className="flex items-center space-x-2"
                >
                  <span>📊 Change Logs</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {changeLogsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        👁️ View Change Logs
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Multi-Language Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setMultiLanguageOpen(!multiLanguageOpen)}
                  className="flex items-center space-x-2"
                >
                  <span>🌐 Multi-Language</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {multiLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        View and edit content in a different language.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">
                          Language Versions
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                            <span className="text-sm text-gray-900">
                              English (CA)
                            </span>
                            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                              ✓
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-gray-50 border border-gray-200 rounded cursor-pointer">
                            <span className="text-sm text-gray-900">
                              English
                            </span>
                            <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                              0
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-gray-50 border border-gray-200 rounded cursor-pointer">
                            <span className="text-sm text-gray-900">
                              Español
                            </span>
                            <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                              0
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-gray-50 border border-gray-200 rounded cursor-pointer">
                            <span className="text-sm text-gray-900">
                              Français
                            </span>
                            <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                              0
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>Approvers settings saved successfully!</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Tab Content */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-blue-600 text-2xl mb-2">📍</div>
                  <div className="text-sm text-gray-600">Region</div>
                  <div className="font-semibold text-gray-900">Chicago-HQ</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-green-600 text-2xl mb-2">👥</div>
                  <div className="text-sm text-gray-600">Openings</div>
                  <div className="font-semibold text-gray-900">1</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-purple-600 text-2xl mb-2">⏰</div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="font-semibold text-gray-900">Full-time</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-yellow-600 text-2xl mb-2">💰</div>
                  <div className="text-sm text-gray-600">Pay Type</div>
                  <div className="font-semibold text-gray-900">Salaried</div>
                </div>
              </div>

              {/* Job Details Section */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    📋 Job Details
                  </h2>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <p className="text-gray-900">
                        {getJobDisplayValue("title")}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pay Rate Type
                      </label>
                      <p className="text-gray-900">Salaried</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Code
                      </label>
                      <p className="text-gray-900">{template.jobCode}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary Minimum
                      </label>
                      <p className="text-gray-900">--</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <p className="text-gray-900">
                        {template.jobCategory || "Financial Services"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary Maximum
                      </label>
                      <p className="text-gray-900">--</p>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {getJobDisplayValue("description") ||
                          "The Role: This position will work as part of the team to provide excellent service and support. You will draw from your own experiences to engage with clients, assist with various tasks, and help develop individualized solutions. You will be playing a critical role in providing support and promoting excellence in service delivery."}
                      </p>
                    </div>
                  </div>

                  {/* Job Requirements */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What we're looking for:
                    </label>
                    <div className="prose prose-sm max-w-none">
                      <ul className="text-gray-700 space-y-1">
                        <li>• Experience in relevant field or certification</li>
                        <li>
                          • Experience working in a professional environment is
                          highly recommended
                        </li>
                        <li>
                          • Excellent oral and written communication skills
                        </li>
                        <li>
                          • Ability to utilize technology provided to perform
                          requirements of the job
                        </li>
                        <li>
                          • Strong attention to detail and organizational skills
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell me about the benefits!
                    </label>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 mb-2">
                        While working for an incredible organization with a
                        great mission and fabulous culture, you'll be
                        contributing to innovative solutions and positive
                        change. With your amazing co-workers and clients that
                        inspire you, the difference you make each day will not
                        go unnoticed.
                      </p>
                      <p className="text-gray-700 mb-2">
                        In addition to a wonderful working environment, we
                        offer:
                      </p>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Competitive Wages</li>
                        <li>• Paid Time Off and Holidays</li>
                        <li>• Health, Dental and Vision</li>
                        <li>• FSA Accounts</li>
                        <li>• Retirement Plan</li>
                        <li>• Life and Long-term Disability Insurance</li>
                        <li>• 403(b)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Job Requirements */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Requirements:
                    </label>
                    <div className="prose prose-sm max-w-none">
                      <div className="text-gray-700 space-y-2">
                        <p>
                          {getJobDisplayValue("requirements") ||
                            "As this position requires attention to detail, candidate must have strong organizational skills, clean background check, and reliable work history."}
                        </p>
                        <p>
                          Candidates must be willing to undergo background
                          verification which includes, but is not limited to,
                          criminal and reference checks.
                        </p>
                        <p>
                          All candidates must pass a background check which
                          includes, but is not limited to, criminal and driving
                          records.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Internal Details */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Internal Details
                  </h3>
                </div>
                <div className="px-4 py-3 text-sm text-gray-600">
                  <p className="mb-3">
                    These fields are for internal use and will not display in
                    any job boards.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Template used for this Job Template:
                      </label>
                      <p className="text-gray-900">
                        {getJobDisplayValue("title")}
                      </p>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Number of Openings:
                      </label>
                      <p className="text-gray-900">1</p>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Number of Hires:
                      </label>
                      <p className="text-gray-900">0</p>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Reason For Opening:
                      </label>
                      <p className="text-gray-900">New Hire</p>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Incumbent:
                      </label>
                      <p className="text-gray-900">--</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === "assessments" && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Assessments and Hiring Process
              </h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700">
                No assessments or hiring process steps have been configured for
                this job template.
              </p>
            </div>
          </div>
        )}

        {/* Approvers Tab */}
        {activeTab === "approvers" && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Approvers</h2>
            </div>
            <div className="px-6 py-4">
              {hasApprovers ? (
                <div>
                  <p className="text-sm text-gray-700 mb-4">
                    This is the approver list that will be used for requisitions
                    created from this job template.
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li className="text-sm text-gray-700">
                      Approver{" "}
                      <button
                        onClick={() => setViewApproversOpen(true)}
                        className="text-orange-500 hover:text-orange-600"
                      >
                        (View)
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <p className="text-gray-700 mb-4">
                  You have elected not to use any Approvers for this job
                  template.
                </p>
              )}
              <Button
                onClick={() => setEditApproversOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                ✏️ Edit Approvers
              </Button>
            </div>
          </div>
        )}

        {/* Edit Approvers Drawer */}
        {editApproversOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setEditApproversOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-[70%] bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Approvers
                    </h2>
                    <button
                      onClick={() => setEditApproversOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-sm text-gray-700 mb-4">
                    This step will allow you to define the list of people who
                    must approve requisitions created from this job template
                    before they can become active.
                  </p>

                  <div className="space-y-6">
                    {/* Enhanced Tab-like options */}
                    <div className="border-b border-gray-200">
                      <nav className="flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => setApproverMode("existing-list")}
                          className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            approverMode === "existing-list"
                              ? "border-orange-500 text-orange-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          Use an Existing List
                        </button>
                        <button
                          onClick={() => setApproverMode("dont-use")}
                          className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            approverMode === "dont-use"
                              ? "border-orange-500 text-orange-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          Don't Use Approvers
                        </button>
                      </nav>
                    </div>

                    {approverMode === "dont-use" && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-4">
                        <p className="text-sm text-blue-800">
                          You have indicated that you do not want to use an
                          approver list for this job template. This means that
                          requisitions created from this job will not inherit a
                          default approver list.
                        </p>
                      </div>
                    )}

                    {approverMode === "existing-list" && (
                      <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded p-4">
                          <p className="text-sm text-gray-700 mb-3">
                            Select one of the pre-existing approver lists to use
                            for this job template.
                          </p>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="approver-list"
                                className="text-orange-500"
                                checked={selectedApprover}
                                onChange={(e) =>
                                  setSelectedApprover(e.target.checked)
                                }
                              />
                              <span className="text-sm text-gray-900">
                                Approver
                              </span>
                              <button
                                onClick={() => setViewApproversOpen(true)}
                                className="text-orange-500 hover:text-orange-600 text-sm"
                              >
                                (View)
                              </button>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleSaveApprovers}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditApproversOpen(false)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Approvers Popup */}
        {viewApproversOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setViewApproversOpen(false)}
              />
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
                {/* Popup Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Approver List Details
                    </h2>
                    <button
                      onClick={() => setViewApproversOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Popup Content */}
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-700 mb-4">
                    If this list is selected, the following people{" "}
                    <strong>must approve the requisition</strong> -{" "}
                    <em>in order</em> - before it can become active.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <p className="text-sm text-gray-700">
                      1) melissa mckenna, cfaa -
                      melissa.mckenna@cadienttalent.com
                    </p>
                  </div>
                </div>

                {/* Popup Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 flex items-center space-x-2"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={handleDeleteCancel}
              />
              <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
                {/* Popup Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Confirm Delete
                    </h2>
                    <button
                      onClick={handleDeleteCancel}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Popup Content */}
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-700 mb-4">
                    Are you sure you want to delete this job template? This
                    action cannot be undone.
                  </p>
                </div>

                {/* Popup Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleDeleteCancel}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteConfirm}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Success Alert */}
        {showDeleteSuccess && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
              <div className="flex items-center">
                <span className="mr-2">✅</span>
                <span>Job template deleted successfully!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
