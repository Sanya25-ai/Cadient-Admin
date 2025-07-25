"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { EditJobTemplateForm } from "./edit-job-template-form";
import { JobTemplateApprovers } from "./job-template-approvers";
import { JobTemplateAssessments } from "./job-template-assessments";
import { JobTemplateChangeLogs } from "./job-template-change-logs";
import { NewRequisitionForm } from "./new-requisition-form";

interface JobTemplateDetailProps {
  template: {
    id: string;
    title: string;
    jobCode: string;
    jobCategory?: string;
    description?: string;
    requirements?: string;
    grade?: string;
    dateLastModified: string;
    isActive: boolean;
    isComplete: boolean;
    videoUrl?: string;
    jobScripts?: any[];
    hasAssessment?: boolean;
    localeJob?: {
      title: string;
      description?: string;
      requirements?: string;
    };
  };
  onBack: () => void;
}

export function JobTemplateDetail({
  template,
  onBack,
}: JobTemplateDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentView, setCurrentView] = useState<
    "details" | "assessments" | "approvers" | "changeLogs"
  >("details");
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [changeLogsOpen, setChangeLogsOpen] = useState(false);
  const [multiLanguageOpen, setMultiLanguageOpen] = useState(false);

  const handleSave = (updatedTemplate: any) => {
    console.log("Saving template:", updatedTemplate);
    setIsEditing(false);
    // Here you would typically update the template in your state/database
  };

  const handleEditAssessments = () => {
    console.log("Edit assessments clicked");
    // Add navigation to edit assessments form
  };

  const handleEditApprovers = () => {
    console.log("Edit approvers clicked");
    // Add navigation to edit approvers form
  };

  const handleCreateRequisition = () => {
    setShowCreateRequisition(true);
  };

  const handleViewChangeLogs = () => {
    setCurrentView("changeLogs");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!event.target) return;

      const target = event.target as Element;
      if (!target.closest("[data-dropdown]")) {
        setActionsOpen(false);
        setChangeLogsOpen(false);
        setMultiLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (showCreateRequisition) {
    return (
      <div className="flex-1 overflow-auto">
        <NewRequisitionForm
          initialData={{
            jobTitle: template.title,
            jobCode: template.jobCode,
            category: template.jobCategory || "social-services-and-non-profit",
            employmentStatus: "part-time",
            payRateType: "hourly",
            jobDescription: template.description || "",
            jobRequirements: template.requirements || "",
            grade: template.grade || "",
            templateUsed: template.title,
          }}
          onBack={() => setShowCreateRequisition(false)}
        />
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditJobTemplateForm
        template={template}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  if (currentView === "assessments") {
    return (
      <JobTemplateAssessments
        template={template}
        onBack={() => setCurrentView("details")}
        onEditAssessments={handleEditAssessments}
        onNavigateToApprovers={() => setCurrentView("approvers")}
      />
    );
  }

  if (currentView === "approvers") {
    return (
      <JobTemplateApprovers
        template={template}
        onBack={() => setCurrentView("details")}
        onEditApprovers={handleEditApprovers}
      />
    );
  }

  if (currentView === "changeLogs") {
    return (
      <JobTemplateChangeLogs
        template={template}
        onBack={() => setCurrentView("details")}
      />
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Main Content */}
      <div className="p-8">
        {/* Job Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {template.title}
        </h1>

        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm">
          <span className="text-black font-medium">Job Template Details</span>
          <span className="mx-2 text-gray-500">|</span>
          <span
            className="text-[#EE5A37] hover:underline cursor-pointer"
            onClick={() => setCurrentView("assessments")}
          >
            Assessments and Hiring Process
          </span>
          <span className="mx-2 text-gray-500">|</span>
          <span
            className="text-[#EE5A37] hover:underline cursor-pointer"
            onClick={() => setCurrentView("approvers")}
          >
            Approvers
          </span>
        </div>

        {/* Header with Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <div className="flex items-center gap-3">
            <Button
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white font-medium"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Job Details
            </Button>

            {/* Actions Dropdown */}
            <div className="relative" data-dropdown>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setActionsOpen(!actionsOpen)}
              >
                Actions
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {actionsOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white z-50 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={handleCreateRequisition}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span className="w-4 h-4 mr-2 text-yellow-400">📄</span>
                      Create Requisition
                    </button>
                    <button
                      onClick={onBack}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span className="w-4 h-4 mr-2">←</span>
                      Back to Library
                    </button>
                    <button className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <span className="w-4 h-4 mr-2">🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Change Logs Dropdown */}
            <div className="relative" data-dropdown>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setChangeLogsOpen(!changeLogsOpen)}
              >
                Change Logs
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {changeLogsOpen && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white z-50 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={handleViewChangeLogs}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span className="w-4 h-4 mr-2">👁️</span>
                      View Change Logs
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Multi-Language Dropdown */}
            <div className="relative" data-dropdown>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setMultiLanguageOpen(!multiLanguageOpen)}
              >
                Multi-Language
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {multiLanguageOpen && (
                <div className="absolute right-0 mt-1 w-64 rounded-md shadow-lg bg-white z-50 border border-gray-200">
                  <div className="p-3">
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
                          <span className="text-sm text-gray-900">English</span>
                          <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                            0
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 border border-gray-200 rounded cursor-pointer">
                          <span className="text-sm text-gray-900">Español</span>
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

        <div className="flex gap-6">
          {/* Left Content - now full width */}
          <div className="flex-1">
            {/* Job Details Section */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6">
              <div className="bg-white text-[#EE5A37] font-medium px-4 py-2 rounded-t-lg border-b border-gray-200">
                Job Details
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">
                      Job Title:{" "}
                    </span>
                    <span className="text-gray-900">{template.title}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Job Code:{" "}
                    </span>
                    <span className="text-gray-900">{template.jobCode}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Category:{" "}
                    </span>
                    <span className="text-gray-900">
                      {template.jobCategory || "Social Services and Non-Profit"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Employment Status:{" "}
                    </span>
                    <span className="text-gray-900">Part-time</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Grade: </span>
                    <span className="text-gray-900">
                      {template.grade || "--"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Pay Rate Type:{" "}
                    </span>
                    <span className="text-gray-900">--</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Salary Minimum:{" "}
                    </span>
                    <span className="text-gray-900">--</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Salary Maximum:{" "}
                    </span>
                    <span className="text-gray-900">--</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Relocation Assistance:{" "}
                    </span>
                    <span className="text-gray-900">--</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Sensitive Job?:{" "}
                    </span>
                    <span className="text-gray-900">--</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Job Description:
                    </span>
                    <div className="mt-2">
                      <p className="text-gray-700">
                        {template.description ||
                          template.localeJob?.description ||
                          "No description available."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700">
                      Job Requirements:
                    </span>
                    <div className="mt-2">
                      <p className="text-gray-700">
                        {template.requirements ||
                          template.localeJob?.requirements ||
                          "No requirements specified."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-gray-700">
                      Last Modified:{" "}
                    </span>
                    <span className="text-gray-900">
                      {template.dateLastModified}
                    </span>
                  </div>

                  {template.hasAssessment && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Assessment:{" "}
                      </span>
                      <span className="text-green-600">✓ Has Assessment</span>
                    </div>
                  )}

                  {template.videoUrl && (
                    <div>
                      <span className="font-medium text-gray-700">Video: </span>
                      <span className="text-blue-600">Available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
