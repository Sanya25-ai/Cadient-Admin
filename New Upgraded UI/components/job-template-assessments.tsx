"use client";

import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";
import { EditAssessmentsHiringProcessForm } from "./edit-assessments-hiring-process-form";
import { HiringProcessDrawer } from "./hiring-process-drawer";

interface JobTemplateAssessmentsProps {
  template: {
    id: string;
    title: string;
    jobCode: string;
    jobCategory?: string;
    description?: string;
    requirements?: string;
    grade?: string;
  };
  onBack: () => void;
  onEditAssessments: () => void;
  onNavigateToApprovers?: () => void;
}

export function JobTemplateAssessments({
  template,
  onBack,
  onEditAssessments,
  onNavigateToApprovers,
}: JobTemplateAssessmentsProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditAssessments = () => {
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    setShowEditForm(false);
    // Optionally refresh data or show success message
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  if (showEditForm) {
    return (
      <EditAssessmentsHiringProcessForm
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
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
        <div className="mb-8 text-sm">
          <span
            className="text-[#EE5A37] hover:underline cursor-pointer"
            onClick={onBack}
          >
            Job Template Details
          </span>
          <span className="mx-2 text-gray-500">|</span>
          <span className="text-black font-medium">
            Assessments and Hiring Process
          </span>
          <span className="mx-2 text-gray-500">|</span>
          <span
            className="text-[#EE5A37] hover:underline cursor-pointer"
            onClick={onNavigateToApprovers}
          >
            Approvers
          </span>
        </div>

        {/* Assessments Summary Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Assessments Summary
          </h2>
          <p className="text-gray-700">There is no Assessment attached.</p>
        </div>

        {/* Hiring Process Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Hiring Process
          </h2>
          <p className="text-gray-700 mb-6">
            This is the hiring process that will be used for all candidates for
            this job.
          </p>

          {/* Hiring Process Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-900">Hiring Process:</span>
              <span className="text-gray-600">Req with Offer Letter</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <HiringProcessDrawer processType="req-offer-letter">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                <Eye className="h-4 w-4 mr-2" />
                View this Hiring Process
              </Button>
            </HiringProcessDrawer>

            <Button
              onClick={handleEditAssessments}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Assessments and Hiring Process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
