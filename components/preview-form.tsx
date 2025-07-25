"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Job Template Details", status: "completed" },
  { id: 2, name: "Assessments and Hiring Process", status: "completed" },
  { id: 3, name: "Approvers", status: "completed" },
  { id: 4, name: "Preview", status: "current" },
];

// Mock data - in a real app, this would come from form state/context
const mockJobTemplateData = {
  jobTitle: "sssssssssss",
  jobCode: "--",
  category: "Administrative and Support",
  employmentStatus: "Full-time",
  grade: "Level 1",
  payRateType: "Salaried",
  salaryMinimum: "$12.00",
  salaryMaximum: "$24.00",
  relocationAssistance: "Yes",
  sensitiveJob: "Yes",
  jobDescription: "saaaXZmmwhdajasoK,nfmwdahsxZBkj qwasbvk",
  jobRequirements: "casshxjpkhxskoalqzwdsqcjcha",
};

export function PreviewForm() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleCreateJobTemplate = () => {
    console.log("Creating job template with data:", mockJobTemplateData);
    // Handle final submission
    alert("Job Template Created Successfully!");
    router.push("/requisitions/job-template-library");
  };

  const handleEditJobDetails = () => {
    router.push("/requisitions/job-template-library/create");
  };

  const handleEditAssessments = () => {
    router.push("/requisitions/job-template-library/create/assessments");
  };

  const handleEditApprovers = () => {
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

        {/* Preview Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <p className="text-sm text-gray-600">
            This job template is almost finished. Please take a few moments to
            review the details below.
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>To Make Changes:</strong> Simply click the [Edit] button
              next to the section you want to change.
            </p>
            <p>
              <strong>To Create the Job Template:</strong> If you are satisfied
              with the data, click the [Create Job Template] button at the
              bottom of the page.
            </p>
          </div>

          {/* Job Template Details Section */}
          <div className="space-y-4">
            <div className="bg-[#F7941D] text-white px-4 py-2 font-semibold">
              Job Template Details
            </div>
            <div className="border border-gray-300 p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Job Title:</strong> {mockJobTemplateData.jobTitle}
                </div>
                <div>
                  <strong>Job Code:</strong> {mockJobTemplateData.jobCode}
                </div>
                <div>
                  <strong>Category:</strong> {mockJobTemplateData.category}
                </div>
                <div>
                  <strong>Employment Status:</strong>{" "}
                  {mockJobTemplateData.employmentStatus}
                </div>
                <div>
                  <strong>Grade:</strong> {mockJobTemplateData.grade}
                </div>
                <div>
                  <strong>Pay Rate Type:</strong>{" "}
                  {mockJobTemplateData.payRateType}
                </div>
                <div>
                  <strong>Salary Minimum:</strong>{" "}
                  {mockJobTemplateData.salaryMinimum}
                </div>
                <div>
                  <strong>Salary Maximum:</strong>{" "}
                  {mockJobTemplateData.salaryMaximum}
                </div>
                <div>
                  <strong>Relocation Assistance:</strong>{" "}
                  {mockJobTemplateData.relocationAssistance}
                </div>
                <div>
                  <strong>Sensitive Job?:</strong>{" "}
                  {mockJobTemplateData.sensitiveJob}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Job Description:</strong>
                </div>
                <div className="text-gray-700">
                  {mockJobTemplateData.jobDescription}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Job Requirements:</strong>
                </div>
                <div className="text-gray-700">
                  {mockJobTemplateData.jobRequirements}
                </div>
              </div>
            </div>
            <Button
              onClick={handleEditJobDetails}
              variant="outline"
              className="flex items-center gap-2 bg-[#F7941D] text-white border-[#F7941D] hover:bg-[#F7941D]/90"
            >
              ✏️ Edit Job Template Details
            </Button>
          </div>

          {/* Assessments and Hiring Process Section */}
          <div className="space-y-4">
            <div className="bg-[#F7941D] text-white px-4 py-2 font-semibold">
              Assessments and Hiring Process
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Assessments Summary
                </h3>
                <p className="text-sm text-gray-600">
                  There is no Assessment attached.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Hiring Process
                </h3>
                <p className="text-sm text-gray-600">
                  You have not yet added any Hiring Process.
                </p>
              </div>
            </div>

            <Button
              onClick={handleEditAssessments}
              variant="outline"
              className="flex items-center gap-2 bg-[#F7941D] text-white border-[#F7941D] hover:bg-[#F7941D]/90"
            >
              ✏️ Edit Assessments and Hiring Process
            </Button>
          </div>

          {/* Approvers Section */}
          <div className="space-y-4">
            <div className="bg-[#F7941D] text-white px-4 py-2 font-semibold">
              Approvers
            </div>
            <p className="text-sm text-gray-600">
              You have elected not to use any Approvers for this job template.
            </p>
            <Button
              onClick={handleEditApprovers}
              variant="outline"
              className="flex items-center gap-2 bg-[#F7941D] text-white border-[#F7941D] hover:bg-[#F7941D]/90"
            >
              ✏️ Edit Approvers
            </Button>
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
              onClick={handleCreateJobTemplate}
              className="bg-[#F7941D] hover:bg-[#F7941D]/90 text-white"
            >
              Next Step: Create Job Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
