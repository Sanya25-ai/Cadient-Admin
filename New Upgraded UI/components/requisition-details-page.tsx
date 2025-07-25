"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  Circle,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  User,
  UserCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RequisitionDetailsPageProps {
  requisitionId: string;
}

// Updated mock data based on the image
const requisitionData = {
  id: "616",
  title: "Payroll Administrator",
  status: "Active",
  jobCode: "PADMN",
  category: "Financial Services",
  employmentStatus: "Full-time",
  payRateType: "Salaried",
  salaryMinimum: "--",
  salaryMaximum: "--",
  relocationAssistance: "--",
  sensitiveJob: "--",
  description: [
    "Prepares and processes payroll and other financial documents. Reviews, calculates and processes payroll changes and adjustments.",
    "Review and reconciles payroll records for accuracy",
    "Maintains, reviews, and files payroll records for reference.",
    "Prepares and processes state and federal payroll taxes.",
    "Assists employees with payroll questions and withholdings.",
    "Coordinates Kronos timekeeping activities with all departments.",
    "Maintains accruals electronically.",
    "Calculates and processes all elected and mandatory payroll deductions including taxes, child support orders, insurances and garnishments.",
  ],
  requirements: [
    "3 Years of experience in Payroll",
    "Must possess required knowledge, skills, abilities and experience in the area of payroll.",
    "Must be able to sustain knowledge of changing technology and industry practices as well as changes in wage and hour laws.",
    "Must be very detail oriented and be able to perform basic mathematical operations.",
    "Ability to detect fiscal recording errors quickly and efficiently.",
  ],
  internalDetails: {
    templateUsed: "Payroll Administrator",
    numberOfOpenings: "1",
    numberOfHires: "0",
    reasonForOpening: "New Hire",
    incumbent: "--",
    targetFillDate: "--",
    region: "Chicago-Headquarters",
    grade: "--",
    maxAdditionalCompensationAllowed: "--",
    maxAdditionalCompensationType: "--",
  },
};

// Mock data for hiring team
const hiringTeamData = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Hiring Manager",
    email: "sarah.johnson@company.com",
    phone: "(555) 123-4567",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Technical Interviewer",
    email: "michael.chen@company.com",
    phone: "(555) 234-5678",
    department: "Finance",
    status: "Active",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "HR Partner",
    email: "emily.rodriguez@company.com",
    phone: "(555) 345-6789",
    department: "Human Resources",
    status: "Active",
  },
];

// Mock data for assessments
const assessmentsData = [
  {
    id: "1",
    name: "Initial Phone Screen",
    type: "Interview",
    duration: "30 minutes",
    required: true,
    status: "Active",
    description:
      "Initial screening call to assess basic qualifications and cultural fit.",
  },
  {
    id: "2",
    name: "Technical Assessment",
    type: "Online Test",
    duration: "60 minutes",
    required: true,
    status: "Active",
    description:
      "Comprehensive test covering payroll systems, tax calculations, and compliance knowledge.",
  },
  {
    id: "3",
    name: "Panel Interview",
    type: "Interview",
    duration: "90 minutes",
    required: true,
    status: "Active",
    description: "In-depth interview with hiring manager and team members.",
  },
  {
    id: "4",
    name: "Reference Check",
    type: "Background",
    duration: "N/A",
    required: true,
    status: "Active",
    description:
      "Verification of employment history and professional references.",
  },
];

// Mock data for applications
const applicationsData = [
  {
    id: "1",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@email.com",
    phone: "(555) 987-6543",
    location: "Chicago, IL",
    appliedDate: "2024-01-15",
    status: "Under Review",
    stage: "Phone Screen",
    score: 85,
    experience: "5 years",
    education: "Bachelor's in Accounting",
  },
  {
    id: "2",
    name: "David Thompson",
    email: "david.thompson@email.com",
    phone: "(555) 876-5432",
    location: "Chicago, IL",
    appliedDate: "2024-01-12",
    status: "Interview Scheduled",
    stage: "Technical Assessment",
    score: 92,
    experience: "7 years",
    education: "Master's in Finance",
  },
  {
    id: "3",
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    phone: "(555) 765-4321",
    location: "Chicago, IL",
    appliedDate: "2024-01-10",
    status: "On Hold",
    stage: "Panel Interview",
    score: 78,
    experience: "3 years",
    education: "Bachelor's in Business",
  },
];

// Mock data for postings
const postingsData = [
  {
    id: "1",
    title: "Payroll Administrator",
    destination: "Sales Demo Retail Omega Req External",
    status: "Closed",
    primaryRecruiter: "Pratham Jain",
    startDate: "9/11/2024",
    endDate: "10/10/2024",
  },
];

export function RequisitionDetailsPage({
  requisitionId,
}: RequisitionDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sponsoredJobs, setSponsoredJobs] = useState<any[]>([]);
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [showJobDetail, setShowJobDetail] = useState<string | null>(null);
  const [showPostingDetail, setShowPostingDetail] = useState<string | null>(
    null
  );
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [showSmartMatchModal, setShowSmartMatchModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    jobDetails: true,
    jobDescription: true,
    jobRequirements: true,
    internalDetails: true,
    preferredAvailability: true,
  });
  const router = useRouter();

  const handleJobSelection = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobIds([...selectedJobIds, jobId]);
    } else {
      setSelectedJobIds(selectedJobIds.filter((id) => id !== jobId));
    }
  };

  const handleCloseSelectedJobs = () => {
    if (selectedJobIds.length > 0) {
      setShowCloseConfirmation(true);
    }
  };

  const confirmCloseJobs = () => {
    setSponsoredJobs(
      sponsoredJobs.map((job) =>
        selectedJobIds.includes(job.id) ? { ...job, status: "Closed" } : job
      )
    );
    setSelectedJobIds([]);
    setShowCloseConfirmation(false);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header Section - Similar to Administration Console */}
      <div className="bg-white">
        {/* Back Navigation and Title */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/requisitions/your-active-reqs")}
              className="text-gray-600 hover:text-gray-900 p-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-[#EE5A37]">
                {requisitionData.title}
              </h1>
              <p className="text-xs text-gray-600">
                Requisition #{requisitionData.id} - {requisitionData.status}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Similar to Administration Console */}
        <div className="px-6 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activeTab === "details"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Requisition Details
            </button>
            <button
              onClick={() => setActiveTab("hiring-team")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activeTab === "hiring-team"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Hiring Team
            </button>
            <button
              onClick={() => setActiveTab("assessments")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activeTab === "assessments"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Assessments and Hiring Process
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activeTab === "applications"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("postings")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activeTab === "postings"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Postings (1)
            </button>
            <button
              onClick={() => setActiveTab("sponsored-jobs")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activeTab === "sponsored-jobs"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Sponsored Jobs (0)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="bg-white p-8 overflow-auto max-h-screen">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="details" className="space-y-6">
            {/* Requisition Details Heading */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Requisition Details
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                View and manage all details for this requisition
              </p>
            </div>

            {/* Action Bar - Inside content area */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-200">
              {/* Edit Requisition Details Button - Left positioned */}
              <Button
                size="sm"
                className="bg-[#EE5A37] hover:bg-[#D54A2A] text-white px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <FileText className="h-4 w-4 mr-1.5" />
                Edit Details
              </Button>

              {/* Compact Dropdowns - Right side */}
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      <MoreHorizontal className="h-4 w-4 mr-1" />
                      Actions
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem className="text-sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel Req
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <Circle className="h-4 w-4 mr-2" />
                      Put Req On Hold
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Copy Req
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Posting
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <Search className="h-4 w-4 mr-2" />
                      Find Candidates
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Logs
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="text-sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Change Logs
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Status Changes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      <Circle className="h-4 w-4 mr-1" />
                      Language
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">
                        Current Language
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">English</span>
                        <Badge
                          variant="outline"
                          className="text-xs px-1.5 py-0.5"
                        >
                          Default
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenuItem className="text-sm">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      Français
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="w-full space-y-6">
              {/* Combined Job Information Card - Expandable */}
              <Card className="border-0 shadow-sm bg-orange-50/20">
                <CardHeader
                  className="pb-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-lg"
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      jobDetails: !prev.jobDetails,
                    }))
                  }
                >
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Job Information
                        </h3>
                        <p className="text-sm text-gray-500 font-normal">
                          Job details, description, and requirements
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        expandedSections.jobDetails ? "rotate-180" : ""
                      }`}
                    />
                  </CardTitle>
                </CardHeader>
                {expandedSections.jobDetails && (
                  <CardContent className="space-y-8 pt-0">
                    {/* Job Details Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        Job Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Job Title
                            </label>
                            <p className="text-base text-gray-900 mt-1 font-medium">
                              {requisitionData.title}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Job Code
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.jobCode}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Category
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.category}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Employment Status
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.employmentStatus}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Pay Rate Type
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.payRateType}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Salary Minimum
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.salaryMinimum}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Salary Maximum
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.salaryMaximum}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Relocation Assistance
                            </label>
                            <p className="text-base text-gray-900 mt-1">
                              {requisitionData.relocationAssistance}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Description Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        Job Description
                      </h4>
                      <div className="space-y-3">
                        {requisitionData.description.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Job Requirements Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        Job Requirements
                      </h4>
                      <div className="space-y-3">
                        {requisitionData.requirements.map(
                          (requirement, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                {requirement}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Internal Details Card - Expandable */}
              <Card className="border-0 shadow-sm bg-orange-50/20">
                <CardHeader
                  className="pb-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-lg"
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      internalDetails: !prev.internalDetails,
                    }))
                  }
                >
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Internal Details
                        </h3>
                        <p className="text-sm text-gray-500 font-normal">
                          Internal use only - not displayed on job boards
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        expandedSections.internalDetails ? "rotate-180" : ""
                      }`}
                    />
                  </CardTitle>
                </CardHeader>
                {expandedSections.internalDetails && (
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Template used for this Requisition
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.templateUsed}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Number of Openings
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.numberOfOpenings}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Number of Hires
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.numberOfHires}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Reason For Opening
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.reasonForOpening}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Incumbent
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.incumbent}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Target Fill Date
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.targetFillDate}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Region
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.region}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Grade
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {requisitionData.internalDetails.grade}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Max Additional Compensation Allowed
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {
                              requisitionData.internalDetails
                                .maxAdditionalCompensationAllowed
                            }
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Max Additional Compensation Type
                          </label>
                          <p className="text-base text-gray-900 mt-1">
                            {
                              requisitionData.internalDetails
                                .maxAdditionalCompensationType
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Preferred Availability Card - Expandable */}
              <Card className="border-0 shadow-sm bg-orange-50/20">
                <CardHeader
                  className="pb-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-lg"
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      preferredAvailability: !prev.preferredAvailability,
                    }))
                  }
                >
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Circle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Preferred Availability
                        </h3>
                        <p className="text-sm text-gray-500 font-normal">
                          Scheduling preferences and timeframes
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        expandedSections.preferredAvailability
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </CardTitle>
                </CardHeader>
                {expandedSections.preferredAvailability && (
                  <CardContent className="pt-0">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Circle className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        There are no timeframes associated with this
                        requisition.
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hiring-team">
            {/* Main Content */}
            <div className="px-8 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-[#EE5A37]">
                Hiring Team
              </h1>
              <div className="flex items-center gap-2">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Edit Hiring Team
                </Button>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="bg-white rounded-md shadow-sm border border-gray-200">
                <div className="p-6">
                  <p className="text-sm text-gray-700 mb-6">
                    This is the hiring team that will be associated with this
                    job.
                  </p>

                  {/* Hiring Manager Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Hiring Manager
                    </h3>
                    <div className="ml-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>-</span>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          nitin rathi
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recruiters Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Recruiters
                    </h3>
                    <div className="ml-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>-</span>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          nitin rathi
                        </span>
                        <span className="text-gray-500">
                          (primary recruiter)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interviewers Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Interviewers
                    </h3>
                    <div className="ml-4">
                      <p className="text-sm text-gray-700">
                        No interviewers associated.
                      </p>
                    </div>
                  </div>

                  {/* Approvers Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Approvers
                    </h3>
                    <div className="ml-4">
                      <p className="text-sm text-blue-600">
                        You have elected not to use any Approvers for this
                        requisition.
                      </p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Edit Hiring Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Assessments and Hiring Process
                </h2>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Assessment
              </Button>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {assessmentsData.map((assessment, index) => (
                    <Card
                      key={assessment.id}
                      className="border border-gray-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {assessment.name}
                                </h3>
                                <Badge
                                  className={
                                    assessment.required
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {assessment.required
                                    ? "Required"
                                    : "Optional"}
                                </Badge>
                                <Badge className="bg-green-100 text-green-800">
                                  {assessment.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span>
                                  <strong>Type:</strong> {assessment.type}
                                </span>
                                <span>
                                  <strong>Duration:</strong>{" "}
                                  {assessment.duration}
                                </span>
                              </div>
                              <p className="text-gray-700">
                                {assessment.description}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Applications
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Application
                </Button>
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationsData.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {application.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {application.email}
                              </p>
                              <p className="text-sm text-gray-500">
                                {application.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              application.status === "Under Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : application.status === "Interview Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{application.stage}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{application.score}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>
                                Schedule Interview
                              </DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="postings" className="space-y-6">
            {!showPostingDetail ? (
              <>
                {/* Postings Header */}
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">Postings</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    View and manage all postings for this requisition
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-200">
                  <Button
                    size="sm"
                    className="bg-[#EE5A37] hover:bg-[#D54A2A] text-white px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Create a new posting
                  </Button>
                </div>

                {/* Results Summary */}
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Total Results: 1</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Results: 1-1 of 1</span>
                    <span className="text-gray-600">Page:</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option>1 of 1</option>
                    </select>
                  </div>
                </div>

                {/* Postings Table */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input type="checkbox" className="rounded" />
                        </TableHead>
                        <TableHead>Title | Destination</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Primary Recruiter</TableHead>
                        <TableHead>Start Date - End Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {postingsData.map((posting) => (
                        <TableRow key={posting.id}>
                          <TableCell>
                            <input type="checkbox" className="rounded" />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div
                                className="font-medium text-gray-900 hover:text-orange-500 cursor-pointer transition-colors duration-200"
                                onClick={() => setShowPostingDetail(posting.id)}
                              >
                                {posting.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {posting.destination}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-gray-900">
                                {posting.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-900">
                            {posting.primaryRecruiter}
                          </TableCell>
                          <TableCell className="text-gray-900">
                            {posting.startDate} - {posting.endDate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <PostingDetailView
                postingData={postingsData.find(
                  (p) => p.id === showPostingDetail
                )}
                onBack={() => setShowPostingDetail(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="sponsored-jobs" className="space-y-6">
            {!showJobDetail ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-orange-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Existing Sponsored Job
                    </h2>
                  </div>
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create a Sponsored Job
                  </Button>
                </div>

                {sponsoredJobs.length > 0 ? (
                  <>
                    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">Results: 1-1 of 1</span>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={handleCloseSelectedJobs}
                          disabled={selectedJobIds.length === 0}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close Selected Sponsored Jobs
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">Page:</span>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option>1 of 1</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">
                              <input type="checkbox" className="rounded" />
                            </TableHead>
                            <TableHead>Title | Req # | Location</TableHead>
                            <TableHead>Job Board</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Active Day(s)</TableHead>
                            <TableHead>Created By</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sponsoredJobs.map((job) => (
                            <TableRow
                              key={job.id}
                              className="hover:bg-orange-50 cursor-pointer transition-colors"
                              onClick={() => setShowJobDetail(job.id)}
                            >
                              <TableCell onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  checked={selectedJobIds.includes(job.id)}
                                  onChange={(e) =>
                                    handleJobSelection(job.id, e.target.checked)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {job.title} ({job.region})
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {job.location}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-900">
                                {job.jobBoard}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      job.status === "Closed"
                                        ? "bg-red-500"
                                        : "bg-yellow-500"
                                    }`}
                                  ></div>
                                  <span className="text-gray-900">
                                    {job.status}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-900">
                                {job.startDate}
                              </TableCell>
                              <TableCell className="text-gray-900">
                                {job.endDate}
                              </TableCell>
                              <TableCell className="text-gray-900">
                                {job.activeDays}
                              </TableCell>
                              <TableCell className="text-gray-900">
                                {job.createdBy}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                ) : (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            No Sponsored Jobs Found
                          </h3>
                          <p className="text-gray-500 text-sm max-w-md">
                            No Sponsored Jobs were found that met your search
                            criteria.
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
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <SponsoredJobDetailInTab
                jobData={sponsoredJobs.find((job) => job.id === showJobDetail)}
                onBack={() => setShowJobDetail(null)}
                onEdit={() => {
                  setShowJobDetail(null);
                  setShowCreateForm(true);
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Sponsored Job Modal */}
      {showCreateForm && (
        <CreateSponsoredJobModal
          onClose={() => setShowCreateForm(false)}
          requisitionId={requisitionId}
          onJobCreated={(jobData) =>
            setSponsoredJobs([...sponsoredJobs, jobData])
          }
        />
      )}

      {/* Close Confirmation Modal */}
      {showCloseConfirmation && (
        <CloseConfirmationModal
          selectedCount={selectedJobIds.length}
          onConfirm={confirmCloseJobs}
          onCancel={() => setShowCloseConfirmation(false)}
        />
      )}

      {/* SmartMatch Skills Extraction Modal */}
      {showSmartMatchModal && (
        <SmartMatchSkillsModal onClose={() => setShowSmartMatchModal(false)} />
      )}
    </div>
  );
}

// Posting Detail View Component
function PostingDetailView({ postingData, onBack }: any) {
  const [activePostingTab, setActivePostingTab] = useState("posting-details");
  const [showSmartMatchModal, setShowSmartMatchModal] = useState(false);

  if (!postingData) return null;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="bg-orange-500/[0.08] p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Posted To: {postingData.destination}
            </h1>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="bg-white">
        <div className="px-0 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActivePostingTab("posting-details")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activePostingTab === "posting-details"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Posting Details
            </button>
            <button
              onClick={() => setActivePostingTab("general-qualifying")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activePostingTab === "general-qualifying"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              General Qualifying Prescreener
            </button>
            <button
              onClick={() => setActivePostingTab("job-code-prescreener")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap border ${
                activePostingTab === "job-code-prescreener"
                  ? "bg-[#EE5A37] text-white border-[#EE5A37]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Job Code Prescreener
            </button>
          </div>
        </div>
      </div>

      {/* Actions Dropdowns */}
      <div className="bg-white border-b border-gray-200 px-0 py-3 flex items-center justify-end gap-3">
        {/* Run SmartMatch Skills Extraction Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSmartMatchModal(true)}
          className="px-4 py-2 text-sm border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span>Run SmartMatch Skills Extraction</span>
          </div>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <MoreHorizontal className="h-4 w-4 mr-1" />
              Actions
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem className="text-sm">
              <FileText className="h-4 w-4 mr-2" />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <X className="h-4 w-4 mr-2" />
              Close Posting
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <FileText className="h-4 w-4 mr-2" />
              Copy Posting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <FileText className="h-4 w-4 mr-1" />
              Change Logs
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-sm">
              <FileText className="h-4 w-4 mr-2" />
              View Change Logs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <Circle className="h-4 w-4 mr-1" />
              Multi-Language
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Language Versions</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">English</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  Default
                </Badge>
              </div>
            </div>
            <DropdownMenuItem className="text-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              English
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
              Español
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status and Activation Cards Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Status Card */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Circle className="h-4 w-4 text-white fill-current" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Open</h3>
                <p className="text-sm text-green-700">
                  This posting is currently active and available at
                </p>
                <p className="text-sm text-green-700 font-medium">
                  aDemoSOneFFSeven309 Req External
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activation Dates Card */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Activation Dates</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-1"
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start Date:</span>
                <span className="text-sm font-medium text-gray-900">
                  Jul 14, 2025
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">End Date:</span>
                <span className="text-sm font-medium text-gray-900">
                  Aug 12, 2025
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Content */}
      <div>
        {activePostingTab === "posting-details" && (
          <PostingDetailsTab postingData={postingData} />
        )}
        {activePostingTab === "general-qualifying" && <GeneralQualifyingTab />}
        {activePostingTab === "job-code-prescreener" && (
          <JobCodePrescreenerTab />
        )}
      </div>

      {/* SmartMatch Skills Extraction Modal */}
      {showSmartMatchModal && (
        <SmartMatchSkillsModal onClose={() => setShowSmartMatchModal(false)} />
      )}
    </div>
  );
}

// Posting Details Tab Component
function PostingDetailsTab({ postingData }: any) {
  const [showSmartMatchModal, setShowSmartMatchModal] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Posting Details
          </h2>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => setShowEditDrawer(true)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Edit Posting Drawer */}
      {showEditDrawer && (
        <EditPostingDrawer onClose={() => setShowEditDrawer(false)} />
      )}

      {/* SmartMatch Skills Extraction Modal */}
      {showSmartMatchModal && (
        <SmartMatchSkillsModal onClose={() => setShowSmartMatchModal(false)} />
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Title:</label>
            <p className="text-base text-gray-900 mt-1 font-medium">
              Secondary Assessment
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Requisition Number:
            </label>
            <p className="text-base text-gray-900 mt-1">321</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Job Code:
            </label>
            <p className="text-base text-gray-900 mt-1">32132</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Location:
            </label>
            <p className="text-base text-gray-900 mt-1">Region</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Address:
            </label>
            <p className="text-base text-gray-900 mt-1">12500 H-7 Villa Road</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">City:</label>
            <p className="text-base text-gray-900 mt-1">Cedar Rapids</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">State:</label>
            <p className="text-base text-gray-900 mt-1">Iowa</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Country:
            </label>
            <p className="text-base text-gray-900 mt-1">
              United States of America
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Zip/Postal Code:
            </label>
            <p className="text-base text-gray-900 mt-1">52401</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category:
            </label>
            <p className="text-base text-gray-900 mt-1">
              Administrative and Support
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Pay Rate Type:
            </label>
            <p className="text-base text-gray-900 mt-1">Salaried</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Assessments Summary:
            </label>
            <p className="text-base text-gray-900 mt-1">Reliability</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">
          Description:
        </label>
        <div className="mt-2 text-gray-700 leading-relaxed">
          <p>
            Test Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">
          Minimum Requirements:
        </label>
        <div className="mt-2 text-gray-700 leading-relaxed">
          <p>
            testLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 italic">
          <strong>
            Sample INTERNAL Corporate Boilerplate Text for Cadient Talent
            Internal.
          </strong>{" "}
          There has never been a better time to join the company whose growth
          knows no boundaries. The company that rewards your success with better
          pay, better benefits, better atmosphere, and better career advancement
          opportunities!
        </p>
      </div>
    </div>
  );
}

// General Qualifying Prescreener Tab Component
function GeneralQualifyingTab() {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          General Qualifying Prescreener Questions
        </h2>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700">
          Candidates who apply to this posting will not be asked any General
          Qualifying prescreener questions.
        </p>
      </div>
    </div>
  );
}

// Job Code Prescreener Tab Component
function JobCodePrescreenerTab() {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Job Code Prescreener Questions
        </h2>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700">
          This posting is using the following prescreener questionnaire:
        </p>
      </div>

      {/* Prescreener Questions Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">
                Numeric currency question [aDemoSOneFFSeven309]
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-gray-50">
              <TableCell className="font-medium">Value</TableCell>
              <TableCell className="font-medium">Answer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1. 0</TableCell>
              <TableCell>0 or greater</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2. 0</TableCell>
              <TableCell>Any other response</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Prescreener Scoring */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Prescreener Scoring
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">
            The following scoring range is based on the values assigned to each
            question in this prescreener:
          </p>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Maximum Possible Points:</strong> -
            </div>
            <div>
              <strong>Minimum Percentage Required to Pass:</strong> 0 % of all
              possible points.
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Candidates Who Pass
            </h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>-Will pass the prescreener</li>
              <li>-Their disposition will automatically be set to Qualified</li>
              <li>-They will receive the Passed Prescreener Email</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Candidates Who Fail
            </h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>-Will fail the prescreener</li>
              <li>
                -Their disposition will automatically be set to Disqualified
              </li>
              <li>-They will receive the Failed Prescreener Email</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Candidates Who Get Knocked Out
            </h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>-Will fail the prescreener</li>
              <li>
                -Their disposition will automatically be set to Disqualified
              </li>
              <li>-They will not receive a prescreener-related email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sponsored Job Detail In Tab Component (matches the image layout)
function SponsoredJobDetailInTab({ jobData, onBack, onEdit }: any) {
  if (!jobData) return null;

  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const handleCloseSponsoredJob = () => {
    setShowCloseConfirmation(true);
  };

  const confirmCloseSponsoredJob = () => {
    // Update job status to closed
    jobData.status = "Closed";
    setShowCloseConfirmation(false);
    // You could also call a parent function to update the job in the main list
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Sponsored Jobs
        </Button>
        <div className="h-6 w-px bg-gray-300" />
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Star className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {jobData.title} ({jobData.region})
            </h1>
          </div>
        </div>
      </div>

      {/* Actions Dropdowns - Before Associated Seeker Site */}
      <div className="bg-white border-b border-gray-200 px-0 py-3 flex items-center justify-end gap-3">
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
            <DropdownMenuItem onClick={handleCloseSponsoredJob}>
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
                  <span className="text-sm">Language Versions</span>
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

      {/* Associated Seeker Site */}
      <div className="text-sm text-gray-600">
        <span className="font-semibold">Associated Seeker Site:</span>{" "}
        aDemoSOneFFSeven309 Req External
      </div>

      {/* Close Confirmation Modal */}
      {showCloseConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Close Sponsored Job
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to close this sponsored job? This will
              change the status to "Closed" and stop the job from being
              displayed.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCloseConfirmation(false)}
                className="border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmCloseSponsoredJob}
              >
                Close Job
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sponsored Job Details */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Sponsored Job Details
          </h2>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={onEdit}
          >
            Edit
          </Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-semibold">Title:</span> {jobData.title}
            </div>
            <div>
              <span className="font-semibold">Associated Posting:</span>{" "}
              aDemoSOneFFSeven309 Req External
            </div>
            <div>
              <span className="font-semibold">Job Board Site:</span>{" "}
              {jobData.jobBoard}
            </div>
            <div>
              <span className="font-semibold">Start Date:</span>{" "}
              {jobData.startDate}
            </div>
            <div>
              <span className="font-semibold">End Date:</span> {jobData.endDate}
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

      {/* Compact Status Card - Positioned exactly where red mark shows in image */}
      <div className="mb-6">
        <div
          className={`inline-flex items-center gap-3 px-4 py-3 rounded-lg ${
            jobData.status === "Pending"
              ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200"
              : "bg-gradient-to-r from-red-50 to-red-100 border border-red-200"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              jobData.status === "Pending"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {jobData.status === "Pending" ? (
              <Circle className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </div>
          <div>
            <h3
              className={`font-bold ${
                jobData.status === "Pending"
                  ? "text-yellow-800"
                  : "text-red-800"
              }`}
            >
              {jobData.status}
            </h3>
            <p
              className={`text-sm ${
                jobData.status === "Pending"
                  ? "text-yellow-700"
                  : "text-red-700"
              }`}
            >
              This Sponsored Job is currently {jobData.status.toLowerCase()} and
              associated to the seeker site.
            </p>
          </div>
        </div>
      </div>

      {/* Sample Corporate Text */}
      <div className="text-sm text-gray-700">
        <p>
          <span className="font-semibold">Sample Corporate</span>{" "}
          <em>Boilerplate Text for Cadient Talent External.</em> There has never
          been a better time to join the company whose growth knows no
          boundaries. The company that rewards your success with better pay,
          better benefits, better atmosphere, and better career advancement
          opportunities!
        </p>
      </div>
    </div>
  );
}

// Multi-step form modal component
function CreateSponsoredJobModal({
  onClose,
  requisitionId,
  onJobCreated,
}: {
  onClose: () => void;
  requisitionId: string;
  onJobCreated: (jobData: any) => void;
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
    // Create the sponsored job data
    const newJob = {
      id: Date.now().toString(),
      title: "Secondary Assessment",
      region: "316",
      location: "Region",
      jobBoard: "ZipRecruiter",
      status: "Pending",
      startDate: "7/11/2025",
      endDate: "7/30/2025",
      activeDays: "20",
      createdBy: "Pratham Jain",
    };

    // Pass the job data to parent component
    onJobCreated(newJob);

    // Close modal
    onClose();
  };

  const handleEdit = () => {
    // Go back to second step when edit is clicked
    setCurrentStep(2);
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
          <Step3Success
            onClose={handleSubmit}
            requisitionId={requisitionId}
            onEdit={handleEdit}
          />
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-sm font-medium text-orange-600">
              Select Job Board & Posting
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-sm font-medium text-gray-400">
              Sponsor Job Details
            </span>
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-sm font-medium text-gray-400">
              Select Job Board & Posting
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-sm font-medium text-orange-600">
              Sponsor Job Details
            </span>
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

// Sponsored Job Detail Page Component
function SponsoredJobDetailPage({ jobId, jobData, onBack }: any) {
  if (!jobData) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="p-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Sponsored Jobs
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {jobData.title}
              </h1>
              <p className="text-sm text-gray-500">
                Sponsored Job #{jobData.id}
              </p>
            </div>
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

          {/* Actions Dropdowns */}
          <div className="bg-white border-b border-gray-200 px-0 py-3 mb-4 flex items-center justify-end gap-3">
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
                  Edit Requisition Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <X className="h-4 w-4 mr-2" />
                  Cancel Req
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Circle className="h-4 w-4 mr-2" />
                  Put Req On Hold
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Copy Req
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus className="h-4 w-4 mr-2" />
                  Create a New Posting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Search className="h-4 w-4 mr-2" />
                  Find Candidates
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
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
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  View Status Change Logs
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

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-semibold">Title:</span> {jobData.title}
              </div>
              <div>
                <span className="font-semibold">Associated Posting:</span>{" "}
                aDemoSOneFFSeven309 Req External
              </div>
              <div>
                <span className="font-semibold">Job Board Site:</span>{" "}
                {jobData.jobBoard}
              </div>
              <div>
                <span className="font-semibold">Start Date:</span>{" "}
                {jobData.startDate}
              </div>
              <div>
                <span className="font-semibold">End Date:</span>{" "}
                {jobData.endDate}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {jobData.status}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Created By:</span>{" "}
                {jobData.createdBy}
              </div>
            </div>
          </div>
        </div>

        {/* Sample Corporate Text */}
        <div className="mb-6 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Sample Corporate</span>{" "}
            <em>Boilerplate Text for Cadient Talent External.</em> There has
            never been a better time to join the company whose growth knows no
            boundaries. The company that rewards your success with better pay,
            better benefits, better atmosphere, and better career advancement
            opportunities!
          </p>
        </div>
      </div>
    </div>
  );
}

// Close Confirmation Modal Component
function CloseConfirmationModal({ selectedCount, onConfirm, onCancel }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <X className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Close Sponsored Jobs
            </h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to close {selectedCount} sponsored job
          {selectedCount > 1 ? "s" : ""}? This will change the status to
          "Closed" and stop the job from being displayed.
        </p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Close {selectedCount} Job{selectedCount > 1 ? "s" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}

// SmartMatch Skills Extraction Modal Component
function SmartMatchSkillsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Run SmartMatch Skills Extraction
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-2 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Skills Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Skills
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                  <span>laboris</span>
                  <X className="h-3 w-3 cursor-pointer hover:text-orange-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Soft Skills Card */}
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Soft Skills
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  <span>dolore</span>
                  <X className="h-3 w-3 cursor-pointer hover:text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Edit Posting Drawer Component
function EditPostingDrawer({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "Secondary Assessment",
    requisitionNumber: "321",
    jobCode: "32132",
    location: "Region",
    address: "12500 H-7 Villa Road",
    city: "Cedar Rapids",
    state: "Iowa",
    country: "United States of America",
    zipCode: "52401",
    category: "Administrative and Support",
    payRateType: "Salaried",
    assessmentsSummary: "Reliability",
    description:
      "Test Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    minimumRequirements:
      "testLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
      <div className="bg-white h-full w-[70%] shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Posting</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  Caution: Assessments are added.
                </h3>
                <p className="text-sm text-yellow-700">
                  An assessment is associated with this job. To avoid possibly
                  causing the current assessment mapping for this job to be
                  non-compliant with applicants, you may contact Cadient Talent
                  before making any changes that materially impact the
                  responsibilities associated with this job.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Posting
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Review and modify the information to edit your posting to
              aDemoSOneFFSeven309 Req Internal. Note: Remember to click the
              "Save" button below to save your changes.
            </p>

            {/* Activation Dates */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Activation Dates
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Confirm the Start and End dates for this posting. These dates
                control when and how long candidates can view the posting.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date:
                  </label>
                  <Input type="date" defaultValue="2024-07-14" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date:
                  </label>
                  <Input type="date" defaultValue="2024-08-12" />
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title: <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requisition Number:
                </label>
                <Input
                  value={formData.requisitionNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      requisitionNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Code:
                </label>
                <Input
                  value={formData.jobCode}
                  onChange={(e) =>
                    setFormData({ ...formData, jobCode: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country: <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>United States of America</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location:
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address:
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City:
                </label>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State:
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>Iowa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code:
                </label>
                <Input
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category: <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>Administrative and Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pay Rate Type:
                </label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option>Salaried</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Referral Bonus:
                </label>
                <Input placeholder="Enter amount" />
              </div>
            </div>

            {/* Assessments Summary */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessments Summary:
              </label>
              <Input
                value={formData.assessmentsSummary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assessmentsSummary: e.target.value,
                  })
                }
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description: <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg shadow-sm">
                {/* Modern Rich Text Editor Toolbar */}
                <div className="border-b border-gray-200 p-3 bg-gray-50/50">
                  {/* First Row - File Operations */}
                  <div className="flex items-center gap-1 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="New"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Open"
                    >
                      <Search className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Save"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Print"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Cut"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Copy"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Paste"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Undo"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Redo"
                    >
                      <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Insert Image"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Insert Table"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Insert Link"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Source"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Second Row - Text Formatting */}
                  <div className="flex items-center gap-1 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded font-bold"
                      title="Bold"
                    >
                      <span className="text-sm font-bold">B</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded italic"
                      title="Italic"
                    >
                      <span className="text-sm italic">I</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded underline"
                      title="Underline"
                    >
                      <span className="text-sm underline">U</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded line-through"
                      title="Strikethrough"
                    >
                      <span className="text-sm line-through">S</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Subscript"
                    >
                      <span className="text-xs">x₂</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Superscript"
                    >
                      <span className="text-xs">x²</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Remove Format"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Align Left"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-2 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Center"
                    >
                      <div className="flex flex-col gap-0.5 items-center">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-2 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Align Right"
                    >
                      <div className="flex flex-col gap-0.5 items-end">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-2 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Justify"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Bullet List"
                    >
                      <span className="text-sm">•</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Numbered List"
                    >
                      <span className="text-sm">1.</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Decrease Indent"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Increase Indent"
                    >
                      <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                    </Button>
                  </div>

                  {/* Third Row - Dropdowns */}
                  <div className="flex items-center gap-2">
                    <select
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      title="Font Family"
                    >
                      <option>Font</option>
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Helvetica</option>
                    </select>
                    <select
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      title="Font Size"
                    >
                      <option>Size</option>
                      <option>8</option>
                      <option>10</option>
                      <option>12</option>
                      <option>14</option>
                      <option>16</option>
                      <option>18</option>
                    </select>
                    <select
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      title="Styles"
                    >
                      <option>Styles</option>
                      <option>Normal</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                      <option>Heading 3</option>
                    </select>
                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                        title="Text Color"
                      >
                        <div className="w-4 h-4 border border-gray-400 bg-black rounded-sm"></div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                        title="Background Color"
                      >
                        <div className="w-4 h-4 border border-gray-400 bg-yellow-300 rounded-sm"></div>
                      </Button>
                    </div>
                  </div>
                </div>
                <textarea
                  className="w-full p-4 min-h-[200px] border-0 resize-none focus:outline-none text-sm leading-relaxed"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter job description..."
                />
              </div>
            </div>

            {/* Minimum Requirements */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Requirements:
              </label>
              <div className="border border-gray-300 rounded-lg shadow-sm">
                {/* Modern Rich Text Editor Toolbar */}
                <div className="border-b border-gray-200 p-3 bg-gray-50/50">
                  {/* First Row - File Operations */}
                  <div className="flex items-center gap-1 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="New"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Open"
                    >
                      <Search className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Save"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Print"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Cut"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Copy"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Paste"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Undo"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Redo"
                    >
                      <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Insert Image"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Insert Table"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Insert Link"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Source"
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Second Row - Text Formatting */}
                  <div className="flex items-center gap-1 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded font-bold"
                      title="Bold"
                    >
                      <span className="text-sm font-bold">B</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded italic"
                      title="Italic"
                    >
                      <span className="text-sm italic">I</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded underline"
                      title="Underline"
                    >
                      <span className="text-sm underline">U</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded line-through"
                      title="Strikethrough"
                    >
                      <span className="text-sm line-through">S</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Subscript"
                    >
                      <span className="text-xs">x₂</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Superscript"
                    >
                      <span className="text-xs">x²</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Remove Format"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Align Left"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-2 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Center"
                    >
                      <div className="flex flex-col gap-0.5 items-center">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-2 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Align Right"
                    >
                      <div className="flex flex-col gap-0.5 items-end">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-2 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Justify"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                        <div className="w-3 h-0.5 bg-current"></div>
                      </div>
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Bullet List"
                    >
                      <span className="text-sm">•</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Numbered List"
                    >
                      <span className="text-sm">1.</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Decrease Indent"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                      title="Increase Indent"
                    >
                      <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                    </Button>
                  </div>

                  {/* Third Row - Dropdowns */}
                  <div className="flex items-center gap-2">
                    <select
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      title="Font Family"
                    >
                      <option>Font</option>
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Helvetica</option>
                    </select>
                    <select
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      title="Font Size"
                    >
                      <option>Size</option>
                      <option>8</option>
                      <option>10</option>
                      <option>12</option>
                      <option>14</option>
                      <option>16</option>
                      <option>18</option>
                    </select>
                    <select
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      title="Styles"
                    >
                      <option>Styles</option>
                      <option>Normal</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                      <option>Heading 3</option>
                    </select>
                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                        title="Text Color"
                      >
                        <div className="w-4 h-4 border border-gray-400 bg-black rounded-sm"></div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1.5 h-8 w-8 hover:bg-gray-200 rounded"
                        title="Background Color"
                      >
                        <div className="w-4 h-4 border border-gray-400 bg-yellow-300 rounded-sm"></div>
                      </Button>
                    </div>
                  </div>
                </div>
                <textarea
                  className="w-full p-4 min-h-[200px] border-0 resize-none focus:outline-none text-sm leading-relaxed"
                  value={formData.minimumRequirements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minimumRequirements: e.target.value,
                    })
                  }
                  placeholder="Enter minimum requirements..."
                />
              </div>
            </div>

            {/* Video HTML */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video HTML:
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                placeholder="Enter video HTML code"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={onClose}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Success Confirmation
function Step3Success({ onClose, requisitionId, onEdit }: any) {
  return (
    <div className="p-8">
      {/* Sponsored Job Details */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Sponsored Job Details
          </h2>
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={onEdit}
          >
            Edit
          </Button>
        </div>

        {/* Actions Dropdowns */}
        <div className="bg-white border-b border-gray-200 px-0 py-3 mb-4 flex items-center justify-end gap-3">
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
                Edit Requisition Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X className="h-4 w-4 mr-2" />
                Cancel Req
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Circle className="h-4 w-4 mr-2" />
                Put Req On Hold
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Copy Req
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="h-4 w-4 mr-2" />
                Create a New Posting
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Search className="h-4 w-4 mr-2" />
                Find Candidates
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Notification Settings
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
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                View Status Change Logs
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
