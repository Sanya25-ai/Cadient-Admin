"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  { id: 1, name: "Job Template Details", status: "completed" },
  { id: 2, name: "Assessments and Hiring Process", status: "current" },
  { id: 3, name: "Approvers", status: "upcoming" },
  { id: 4, name: "Preview", status: "upcoming" },
];

export function AssessmentsHiringProcessForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    primaryPhase: "",
    secondaryPhase: "",
    hiringProcess: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    router.back();
  };

  const handleNextStep = () => {
    console.log("Assessments form data:", formData);
    // Navigate to next step (Approvers)
    router.push("/requisitions/job-template-library/create/approvers");
  };

  return (
    <div className="flex-1 space-y-6 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex justify-end items-center space-x-8 mb-6">
            {steps.map((step, stepIdx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "current"
                        ? "bg-[#F7941D]"
                        : "border-2 border-gray-300 bg-white"
                    }`}
                  >
                    {step.status === "completed" && (
                      <svg
                        className="w-2 h-2 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step.status === "current" || step.status === "completed"
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {stepIdx < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Create a new Job Template
        </h1>

        {/* Assessment Details */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-[#F7941D] mb-2">
              Assessment Details
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Please select the Assessment(s) that will be used.
            </p>

            {/* Legacy Assessments */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-[#F7941D] mb-3">
                Legacy Assessments / Traits
              </h3>
              <p className="text-sm text-gray-600 italic">
                There are no assessment scripts for the selected client.
              </p>
            </div>

            {/* Phases in Application */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-[#F7941D]">
                  Phases in Application
                </h3>
                <span className="text-sm font-medium text-gray-900">
                  Silent Scoring
                </span>
              </div>
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Primary Phase
                </Label>
                <div className="relative">
                  <Input
                    value={formData.primaryPhase}
                    onChange={(e) =>
                      handleInputChange("primaryPhase", e.target.value)
                    }
                    placeholder="Start typing to show a list"
                    className="pr-16"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessments in Workflow */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-[#F7941D]">
                  Assessments in Workflow
                </h3>
                <span className="text-sm font-medium text-gray-900">
                  Silent Scoring
                </span>
              </div>
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Secondary Phase
                </Label>
                <div className="relative">
                  <Input
                    value={formData.secondaryPhase}
                    onChange={(e) =>
                      handleInputChange("secondaryPhase", e.target.value)
                    }
                    placeholder="Start typing to show a list"
                    className="pr-16"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Plus className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hiring Process */}
          <div>
            <h2 className="text-lg font-semibold text-[#F7941D] mb-2">
              Hiring process
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Please select the Hiring Process that will be used.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Choose a Hiring Process:
                </Label>
                <Select
                  value={formData.hiringProcess}
                  onValueChange={(value) =>
                    handleInputChange("hiringProcess", value)
                  }
                >
                  <SelectTrigger className="w-80 bg-white">
                    <SelectValue placeholder="-- don't use a hiring process --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      -- don't use a hiring process --
                    </SelectItem>
                    <SelectItem value="req-offer-letter">
                      Req with Offer Letter
                    </SelectItem>
                    <SelectItem value="hybrid-ofccp-video">
                      Hybrid OFCCP with Video Interview
                    </SelectItem>
                    <SelectItem value="req-everify-offer">
                      Req with EVerify and Offer Letter
                    </SelectItem>
                    <SelectItem value="hirenow">HireNow</SelectItem>
                    <SelectItem value="staff-hourly">Staff Hourly</SelectItem>
                    <SelectItem value="hybrid-ofccp">Hybrid OFCCP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Hiring Process Link */}
              {formData.hiringProcess && formData.hiringProcess !== "none" && (
                <div className="flex justify-start w-full pl-1">
                  <span className="text-[#F7941D] hover:text-[#F7941D]/80 hover:underline cursor-pointer text-sm font-medium underline">
                    View hiring process
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNextStep}
              className="bg-[#F7941D] hover:bg-[#F7941D]/90 text-white"
            >
              Next Step: Approvers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
