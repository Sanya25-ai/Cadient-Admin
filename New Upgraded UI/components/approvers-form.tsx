"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  { id: 1, name: "Job Template Details", status: "completed" },
  { id: 2, name: "Assessments and Hiring Process", status: "completed" },
  { id: 3, name: "Approvers", status: "current" },
  { id: 4, name: "Preview", status: "upcoming" },
];

export function ApproversForm() {
  const router = useRouter();
  const [approverOption, setApproverOption] = useState<
    "use-existing" | "dont-use"
  >("dont-use");
  const [selectedApprover, setSelectedApprover] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleNextStep = () => {
    console.log("Approvers form data:", { approverOption, selectedApprover });
    // Navigate to next step (Preview)
    router.push("/requisitions/job-template-library/create/preview");
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

        {/* Approvers Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Approvers</h2>
          <p className="text-sm text-gray-600">
            This step will allow you to define the list of people who must
            approve requisitions created from this job template before they can
            become active.
          </p>

          {/* Approver Options */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex gap-2 border-b border-gray-200 pb-2">
              <button
                onClick={() => setApproverOption("use-existing")}
                className={`text-sm font-medium ${
                  approverOption === "use-existing"
                    ? "text-[#F7941D]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Use an Existing List
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setApproverOption("dont-use")}
                className={`text-sm font-medium ${
                  approverOption === "dont-use"
                    ? "text-[#F7941D]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Don&apos;t Use Approvers
              </button>
            </div>
          </div>

          {/* Content based on selected option */}
          {approverOption === "use-existing" ? (
            <div className="space-y-4">
              <p className="text-sm font-medium">
                Select one of the pre-existing approver lists to use for this
                job template.
              </p>
              <RadioGroup
                value={selectedApprover || ""}
                onValueChange={setSelectedApprover}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="approver-1" id="approver-1" />
                  <Label htmlFor="approver-1" className="text-sm">
                    Approver{" "}
                    <Link href="#" className="text-[#F7941D]">
                      (View)
                    </Link>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                You have indicated that you do not want to use an approver list
                for this job template. This means that requisitions created from
                this job will not inherit a default approver list.
              </p>
            </div>
          )}

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
              Next Step: Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
