"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SponsoredJobsPageProps {
  params: {
    id: string;
  };
}

export default function SponsoredJobsPage({ params }: SponsoredJobsPageProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  router.push(`/requisitions/your-active-reqs/${params.id}`)
                }
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Requisition Details
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Sponsored Jobs
                  </h1>
                  <p className="text-sm text-gray-500">
                    Requisition #{params.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-end gap-3">
        {/* Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MoreHorizontal className="h-4 w-4" />
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem>
              <X className="h-4 w-4 mr-2" />
              Close Sponsored Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Change Logs Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Change Logs
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              View Change Logs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Multi-Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Circle className="h-4 w-4" />
              Multi-Language
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm text-gray-600 mb-3">
                View and edit content in a different language.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">English (CA)</span>
                  <Badge variant="outline" className="text-xs">
                    Default
                  </Badge>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              English
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
              Español
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
              Français
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className="p-6 pb-0 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#EE5A37]">
          Existing Sponsored Job
        </h1>
        <div className="flex items-center gap-2">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create a Sponsored Job
          </Button>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 mb-6">
          <div className="p-4 bg-[#EE5A370D] border-b border-gray-200 flex justify-between items-center mb-3">
            <div className="text-gray-700 font-semibold">
              Total Records:{" "}
              <span className="font-medium text-[#F7941D]">0</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button className="flex items-center justify-center h-10 px-4 py-2 bg-white text-[#EE5A37] border border-[#EE5A37] rounded-md font-medium">
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-10 pl-4 pr-12 w-64 border-gray-300 rounded"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-gray-50 text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <select className="h-10 w-[180px] border-gray-300 rounded px-3">
                <option>10 Records per page</option>
                <option>25 Records per page</option>
                <option>50 Records per page</option>
                <option>100 Records per page</option>
              </select>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-gray-300"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page <span className="font-medium">1</span> of{" "}
                  <span className="font-medium">1</span>
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-gray-300"
                  disabled
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  No Sponsored Jobs Found
                </h3>
                <p className="text-gray-500 text-sm max-w-md">
                  No Sponsored Jobs were found that met your search criteria.
                </p>
              </div>
              <Button
                className="bg-orange-600 hover:bg-orange-700 text-white mt-4"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Sponsored Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Sponsored Job Modal */}
      {showCreateForm && (
        <CreateSponsoredJobModal
          onClose={() => setShowCreateForm(false)}
          requisitionId={params.id}
        />
      )}
    </div>
  );
}

// Multi-step form modal component
function CreateSponsoredJobModal({
  onClose,
  requisitionId,
}: {
  onClose: () => void;
  requisitionId: string;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobBoard: "",
    startDate: "",
    endDate: "",
    jobType: "",
    showCompensation: "no",
  });

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Submit and show success
      setCurrentStep(3);
    }
  };

  const handleSubmit = () => {
    // Navigate to sponsored jobs page with success state
    onClose();
    // In a real app, you would update the state to show the created job
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {currentStep === 1 && (
          <Step1SelectJobBoard
            onNext={handleNext}
            onCancel={onClose}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2EnterDetails
            onNext={handleNext}
            onBack={() => setCurrentStep(1)}
            onCancel={onClose}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3Success onClose={handleSubmit} requisitionId={requisitionId} />
        )}
      </div>
    </div>
  );
}

// Step 1: Select Job Board & Posting
function Step1SelectJobBoard({ onNext, onCancel, formData, setFormData }: any) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Select Job Board & Posting
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Your job will be added to your posting extract and will be scraped
          organically by several job boards.
        </p>
        <p className="text-gray-600 mb-6">
          Increase the visibility of your job by sponsoring on a job board.
        </p>
      </div>

      {/* ZipRecruiter Option */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <input
            type="radio"
            name="jobBoard"
            value="ziprecruiter"
            checked={formData.jobBoard === "ziprecruiter"}
            onChange={(e) =>
              setFormData({ ...formData, jobBoard: e.target.value })
            }
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">
                ZipRecruiter
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded text-sm">
                $16 Daily / per job
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Activate your job on ZipRecruiter
            </h3>
            <div className="text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Distribute to 100+ job boards</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Access to our powerful matching technology</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Four out of five employers who post on ZipRecruiter get a quality
              candidate within the first day; however, ZipRecruiter recommends
              sponsoring a job for at least 7 days for best results.
            </p>
          </div>
        </div>
      </div>

      {/* Associated Posting */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">
          Associated Posting:
        </h3>
        <div className="flex items-center gap-2">
          <input type="radio" name="posting" defaultChecked />
          <span className="text-gray-700">
            Secondary Assessment | aDemoSOneFFSeven309 Req External
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Next Step:</span>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={onNext}
            disabled={!formData.jobBoard}
          >
            Enter Sponsored Job Details
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 2: Enter Sponsored Job Details
function Step2EnterDetails({
  onNext,
  onBack,
  onCancel,
  formData,
  setFormData,
}: any) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Enter Sponsored Job Details
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
        </div>
      </div>

      {/* Activation Dates */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Activation Dates</h3>
        <p className="text-gray-600 mb-4">
          Confirm the Start and End dates for this Sponsored Job. These dates
          control when and how long candidates can view the Sponsored Job.
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Type: <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.jobType}
          onChange={(e) =>
            setFormData({ ...formData, jobType: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">choose one...</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
        </select>
      </div>

      {/* Show Compensation */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Show Compensation on Job Board?:
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="showCompensation"
              value="yes"
              checked={formData.showCompensation === "yes"}
              onChange={(e) =>
                setFormData({ ...formData, showCompensation: e.target.value })
              }
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="showCompensation"
              value="no"
              checked={formData.showCompensation === "no"}
              onChange={(e) =>
                setFormData({ ...formData, showCompensation: e.target.value })
              }
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-gray-300 text-gray-700"
        >
          Back
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={onNext}
            disabled={
              !formData.startDate || !formData.endDate || !formData.jobType
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Success Confirmation
function Step3Success({ onClose, requisitionId }: any) {
  return (
    <div className="p-8">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <Check className="h-5 w-5 text-green-600" />
        <div>
          <h3 className="font-semibold text-green-800">Confirmation</h3>
          <p className="text-green-700">
            You have successfully created the Sponsored Job.
          </p>
        </div>
      </div>

      {/* Sponsored Job Details */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Sponsored Job Details
          </h2>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Edit
          </Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-semibold">Title:</span> Secondary Assessment
            </div>
            <div>
              <span className="font-semibold">Associated Posting:</span>{" "}
              aDemoSOneFFSeven309 Req External
            </div>
            <div>
              <span className="font-semibold">Job Board Site:</span>{" "}
              ZipRecruiter
            </div>
            <div>
              <span className="font-semibold">Start Date:</span> Jul 11, 2025
            </div>
            <div>
              <span className="font-semibold">End Date:</span> Jul 30, 2025
            </div>
            <div>
              <span className="font-semibold">Job Type:</span> contractor
            </div>
            <div className="col-span-2">
              <span className="font-semibold">
                Show Compensation on Job Board:
              </span>{" "}
              No
            </div>
          </div>
        </div>
      </div>

      {/* Pending Status Card - Positioned exactly where red mark shows in image */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-500 text-white">
            <Circle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-yellow-800">Pending</h3>
            <p className="text-sm text-yellow-700">
              This Sponsored Job is currently pending and associated to the
              seeker site.
            </p>
          </div>
        </div>
      </div>

      {/* Sample Corporate Text */}
      <div className="mb-6 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Sample Corporate</span>{" "}
          <em>Boilerplate Text for Cadient Talent External.</em> There has never
          been a better time to join the company whose growth knows no
          boundaries. The company that rewards your success with better pay,
          better benefits, better atmosphere, and better career advancement
          opportunities!
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
