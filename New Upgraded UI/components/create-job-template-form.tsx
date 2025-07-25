"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [
  { id: 1, name: "Job Template Details", status: "current" },
  { id: 2, name: "Assessments and Hiring Process", status: "upcoming" },
  { id: 3, name: "Approvers", status: "upcoming" },
  { id: 4, name: "Preview", status: "upcoming" },
];

export function CreateJobTemplateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCode: "",
    category: "",
    employmentStatus: "",
    grade: "",
    payRateType: "",
    salaryMinimum: "",
    salaryMaximum: "",
    relocationAssistance: "",
    sensitiveJob: "",
    jobDescription: "",
    jobRequirements: "",
    videoHtml: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    console.log("Form data:", formData);
    // Navigate to assessments page
    router.push("/requisitions/job-template-library/create/assessments");
  };

  const handleAssessmentsClick = () => {
    router.push("/requisitions/job-template-library/create/assessments");
  };

  const handleBackClick = () => {
    router.push("/requisitions/job-template-library");
  };

  return (
    <div className="bg-white">
      {/* Sub Header with Back Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Create a new Job Template
            </h1>
          </div>
        </div>
      </div>

      {/* Progress Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="px-6 py-4">
          <div className="flex justify-center items-center space-x-8">
            {steps.map((step, stepIdx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step.status === "current"
                        ? "bg-[#F7941D]"
                        : "border-2 border-gray-300 bg-white"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      step.status === "current"
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
      </div>

      {/* Main Content - Full Width */}
      <div className="px-6 py-6">
        <div className="w-full space-y-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-[#EE5A37]">
              Job Details
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter the following information for your new template.
            </p>
          </div>

          {/* All the form fields content remains the same, just remove the Card wrapper */}
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium">
              * Job Title:
            </Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Job Code */}
          <div className="space-y-2">
            <Label htmlFor="jobCode" className="text-sm font-medium">
              Job Code:
            </Label>
            <Input
              id="jobCode"
              value={formData.jobCode}
              onChange={(e) => handleInputChange("jobCode", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">* Category:</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrative-support">
                  Administrative and Support
                </SelectItem>
                <SelectItem value="architectural-services">
                  Architectural Services
                </SelectItem>
                <SelectItem value="college-internships">
                  College Internships
                </SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="distribution">Distribution</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="financial-services">
                  Financial Services
                </SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="human-resources">Human Resources</SelectItem>
                <SelectItem value="information-technology">
                  Information Technology
                </SelectItem>
                <SelectItem value="internet-new-media">
                  Internet/New Media
                </SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="media-entertainment">
                  Media and Entertainment
                </SelectItem>
                <SelectItem value="merchandising">Merchandising</SelectItem>
                <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="social-services">
                  Social Services and Non-Profit
                </SelectItem>
                <SelectItem value="telecommunications">
                  Telecommunications
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employment Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Employment Status:</Label>
            <Select
              value={formData.employmentStatus}
              onValueChange={(value) =>
                handleInputChange("employmentStatus", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grade */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Grade:</Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => handleInputChange("grade", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="level-1">Level 1</SelectItem>
                <SelectItem value="level-2">Level 2</SelectItem>
                <SelectItem value="level-3">Level 3</SelectItem>
                <SelectItem value="level-4">Level 4</SelectItem>
                <SelectItem value="level-5">Level 5</SelectItem>
                <SelectItem value="level-6">Level 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pay Rate Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Pay Rate Type:</Label>
            <Select
              value={formData.payRateType}
              onValueChange={(value) => handleInputChange("payRateType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="choose one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salaried">Salaried</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMinimum" className="text-sm font-medium">
                Salary Minimum:
              </Label>
              <Input
                id="salaryMinimum"
                value={formData.salaryMinimum}
                onChange={(e) =>
                  handleInputChange("salaryMinimum", e.target.value)
                }
                placeholder="$"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMaximum" className="text-sm font-medium">
                Salary Maximum:
              </Label>
              <Input
                id="salaryMaximum"
                value={formData.salaryMaximum}
                onChange={(e) =>
                  handleInputChange("salaryMaximum", e.target.value)
                }
                placeholder="$"
              />
            </div>
          </div>

          {/* Relocation Assistance */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Relocation Assistance:
            </Label>
            <RadioGroup
              value={formData.relocationAssistance}
              onValueChange={(value) =>
                handleInputChange("relocationAssistance", value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="relocation-yes" />
                <Label htmlFor="relocation-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="relocation-no" />
                <Label htmlFor="relocation-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sensitive Job */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Sensitive Job?:</Label>
            <RadioGroup
              value={formData.sensitiveJob}
              onValueChange={(value) =>
                handleInputChange("sensitiveJob", value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="sensitive-yes" />
                <Label htmlFor="sensitive-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="sensitive-no" />
                <Label htmlFor="sensitive-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-sm font-medium">
              Job Description:
            </Label>
            <div className="border border-gray-300 rounded-md">
              <div className="border-b border-gray-300 p-2 bg-gray-50">
                <div className="flex items-center gap-1 text-xs">
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded italic">
                    I
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded underline">
                    U
                  </button>
                  <span className="mx-1">|</span>
                  <button className="p-1 hover:bg-gray-200 rounded">•</button>
                  <button className="p-1 hover:bg-gray-200 rounded">1.</button>
                  <span className="mx-1">|</span>
                  <select className="text-xs border rounded px-1">
                    <option>Arial</option>
                  </select>
                  <select className="text-xs border rounded px-1">
                    <option>Size</option>
                  </select>
                </div>
              </div>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) =>
                  handleInputChange("jobDescription", e.target.value)
                }
                className="min-h-[200px] border-0 resize-none focus:ring-0"
                placeholder="Enter job description..."
              />
            </div>
          </div>

          {/* Job Requirements */}
          <div className="space-y-2">
            <Label htmlFor="jobRequirements" className="text-sm font-medium">
              Job Requirements:
            </Label>
            <div className="border border-gray-300 rounded-md">
              <div className="border-b border-gray-300 p-2 bg-gray-50">
                <div className="flex items-center gap-1 text-xs">
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded italic">
                    I
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded underline">
                    U
                  </button>
                  <span className="mx-1">|</span>
                  <button className="p-1 hover:bg-gray-200 rounded">•</button>
                  <button className="p-1 hover:bg-gray-200 rounded">1.</button>
                  <span className="mx-1">|</span>
                  <select className="text-xs border rounded px-1">
                    <option>Arial</option>
                  </select>
                  <select className="text-xs border rounded px-1">
                    <option>Size</option>
                  </select>
                </div>
              </div>
              <Textarea
                id="jobRequirements"
                value={formData.jobRequirements}
                onChange={(e) =>
                  handleInputChange("jobRequirements", e.target.value)
                }
                className="min-h-[200px] border-0 resize-none focus:ring-0"
                placeholder="Enter job requirements..."
              />
            </div>
          </div>

          {/* Video HTML */}
          <div className="space-y-2">
            <Label htmlFor="videoHtml" className="text-sm font-medium">
              Video (HTML):
            </Label>
            <Textarea
              id="videoHtml"
              value={formData.videoHtml}
              onChange={(e) => handleInputChange("videoHtml", e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter HTML code for video..."
            />
          </div>

          {/* Action Buttons - keep at the end */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={handleNextStep}
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white"
            >
              Next Step
            </Button>
            <Button
              onClick={handleAssessmentsClick}
              variant="outline"
              className="border-[#F7941D] text-[#F7941D] hover:bg-[#F7941D]/10"
            >
              Assessments and Rating Threshold
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
