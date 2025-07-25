"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Application, ApplicationPoolCandidate } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Filter,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FilterResultsPanel, type FilterState } from "./filter-results-panel";

interface ThemeConfig {
  titleColor: string;
  buttonBg: string;
  buttonHover: string;
  controlsBg: string;
  controlsBorder: string;
  dropdownBorder: string;
  dropdownText: string;
}

interface ActionItem {
  label: string;
  className?: string;
}

// Union type to handle both Application and ApplicationPoolCandidate
type ApplicationData = Application | ApplicationPoolCandidate;

interface CommonApplicationsTableProps {
  applications: ApplicationData[];
  title: string;
  theme?: ThemeConfig;
  actions?: ActionItem[];
  emptyMessage?: string;
}

// Helper functions for tooltips
function getScoreClass(score: number) {
  if (score >= 70) return "bg-green-500 text-white";
  if (score >= 40) return "bg-yellow-500 text-white";
  return "bg-red-500 text-white";
}

const getCircleColor = (score: number) => {
  if (score >= 70) return "#22c55e"; // green-500
  if (score >= 40) return "#eab308"; // yellow-500
  return "#ef4444"; // red-500
};

const getTagColor = (tag: string) => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-yellow-100 text-yellow-800",
  ];
  return colors[tag.length % colors.length];
};

// Helper functions to normalize data between Application and ApplicationPoolCandidate
const getApplicationName = (app: ApplicationData): string => app.name;
const getApplicationId = (app: ApplicationData): string => app.id;
const getApplicationAppliedDate = (app: ApplicationData): string =>
  app.appliedDate;
const getApplicationPosition = (app: ApplicationData): string => app.position;
const getApplicationLocation = (app: ApplicationData): string => app.location;
const getApplicationSmartScore = (app: ApplicationData): number =>
  app.smartScore;
const getApplicationPhone = (app: ApplicationData): string => app.phone || "";
const getApplicationEmail = (app: ApplicationData): string => app.email || "";
const getApplicationAvailability = (app: ApplicationData): string =>
  app.availability || "";
const getApplicationHiringStep = (app: ApplicationData): string => {
  return (app as any).hiringStep || "-";
};
const getApplicationStatus = (app: ApplicationData): string => {
  if ("status" in app) return app.status || "";
  return "Pool";
};
const getApplicationSource = (app: ApplicationData): string => {
  if ("source" in app) return app.source || "";
  return "Pool";
};
const getApplicationWotcStatus = (app: ApplicationData): string => {
  return app.wotcStatus || "";
};
const getApplicationFormer = (app: ApplicationData): string => {
  if ("former" in app) return app.former || "";
  if ("formerEmployee" in app) return app.formerEmployee || "";
  return "";
};
const getApplicationRehire = (app: ApplicationData): string => {
  if ("rehire" in app) return app.rehire || "";
  if ("rehireEligible" in app) return app.rehireEligible || "";
  return "";
};
const getApplicationPartner = (app: ApplicationData): string => {
  if ("partner" in app) return app.partner || "";
  return "";
};
const getApplicationAssessmentStatus = (app: ApplicationData): string => {
  return app.assessmentStatus || "Not Started";
};
const getApplicationAssessmentScore = (app: ApplicationData): number => {
  return app.assessmentScore || app.smartScore;
};
const getApplicationAssessmentDate = (app: ApplicationData): string => {
  return app.assessmentDate || app.appliedDate;
};
const getApplicationAssessmentNotes = (app: ApplicationData): string => {
  return app.assessmentNotes || "";
};

// Helper function to truncate hiring step text to 2 lines
const truncateHiringStep = (text: string, maxLines: number = 2): string => {
  if (!text || text === "-") return text;

  // Split the text by commas and line breaks to get individual steps
  const steps = text
    .split(/,|\n/)
    .map((step) => step.trim())
    .filter((step) => step);

  if (steps.length <= maxLines) {
    return text;
  }

  // Take first maxLines steps and add ellipsis
  const truncatedSteps = steps.slice(0, maxLines);
  return truncatedSteps.join(", ") + "...";
};

// Function to count active filters
const countActiveFilters = (filterState: FilterState): number => {
  let count = 0;

  if (filterState.searchText && filterState.searchText.trim() !== "") count++;
  if (filterState.status && filterState.status !== "all") count++;
  if (filterState.location && filterState.location !== "all") count++;
  if (filterState.position && filterState.position !== "all") count++;
  if (filterState.applied.from) count++;
  if (filterState.applied.to) count++;
  if (filterState.workPreference && filterState.workPreference !== "all")
    count++;
  if (filterState.applicationType && filterState.applicationType !== "all")
    count++;
  if (filterState.exclusive && filterState.exclusive !== "all") count++;
  if (filterState.hiringWorkflow && filterState.hiringWorkflow !== "all")
    count++;
  if (filterState.dataChannel && filterState.dataChannel !== "all") count++;
  if (filterState.smartTenure && filterState.smartTenure !== "all") count++;
  if (filterState.wotcStatus && filterState.wotcStatus !== "all") count++;
  if (filterState.bookmarkFilter && filterState.bookmarkFilter !== "all")
    count++;
  if (filterState.tags && filterState.tags.trim() !== "") count++;
  if (filterState.score.min) count++;
  if (filterState.score.max) count++;
  if (filterState.dateFilterRange && filterState.dateFilterRange !== "30")
    count++;
  if (filterState.jobOpeningId) count++;
  if (filterState.positionKey) count++;

  return count;
};

// Default theme (orange)
const defaultTheme: ThemeConfig = {
  titleColor: "text-[#EE5A37]",
  buttonBg: "bg-[#EE5A37]",
  buttonHover: "hover:bg-[#EE5A37]/90",
  controlsBg: "bg-[#EE5A37]/5",
  controlsBorder: "border-[#EE5A37]",
  dropdownBorder: "border-[#EE5A37]",
  dropdownText: "text-[#EE5A37]",
};

// Predefined themes
export const themes = {
  orange: defaultTheme,
  green: {
    titleColor: "text-green-600",
    buttonBg: "bg-green-600",
    buttonHover: "hover:bg-green-600/90",
    controlsBg: "bg-green-50",
    controlsBorder: "border-green-600",
    dropdownBorder: "border-green-600",
    dropdownText: "text-green-600",
  },
  red: {
    titleColor: "text-red-600",
    buttonBg: "bg-red-600",
    buttonHover: "hover:bg-red-600/90",
    controlsBg: "bg-red-50",
    controlsBorder: "border-red-600",
    dropdownBorder: "border-red-600",
    dropdownText: "text-red-600",
  },
};

// Default actions
const defaultActions: ActionItem[] = [
  { label: "Assign" },
  { label: "Bookmark" },
  { label: "Change Hiring Step" },
  { label: "Change Status" },
  { label: "Send a Message" },
  { label: "Extend Application" },
  { label: "Forward Interview Guide" },
  { label: "Forward Application Details" },
  { label: "Initiate Hiring Process" },
  { label: "Resend Invite for Job Board" },
  { label: "Add Tag" },
  { label: "Export All Results" },
];

export default function CommonApplicationsTable({
  applications,
  title,
  theme = defaultTheme,
  actions = defaultActions,
  emptyMessage = "No applications found",
}: CommonApplicationsTableProps) {
  const [filteredApplications, setFilteredApplications] =
    useState(applications);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewApplication, setViewApplication] =
    useState<ApplicationData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );

  // Smart tooltip states
  const [hoveredNameId, setHoveredNameId] = useState<string | null>(null);
  const [hoveredScoreId, setHoveredScoreId] = useState<string | null>(null);
  const [hoveredHiringStepId, setHoveredHiringStepId] = useState<string | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hiringStepTooltipTimeoutId, setHiringStepTooltipTimeoutId] =
    useState<NodeJS.Timeout | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<
    "name" | "score" | "hiringStep" | null
  >(null);

  // Add state for pagination and search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionsOpen, setActionsOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchText: "",
    status: "all",
    location: "all",
    position: "all",
    applied: {
      from: "",
      to: "",
    },
    workPreference: "all",
    applicationType: "all",
    exclusive: "all",
    hiringWorkflow: "all",
    dataChannel: "all",
    smartTenure: "all",
    tags: "",
    score: {
      min: "",
      max: "",
    },
    bidLocation: "all",
    currentLocations: [],
    hiringStep: "",
    availability: "",
    wotcStatus: "all",
    bookmarkFilter: "all",
    positionKey: "",
    jobOpeningId: "",
    dateFilterRange: "30",
  });

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
    setActiveFilterCount(countActiveFilters(filters));
  }, [filters]);

  // Apply search whenever searchQuery changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, applications]);

  // Cleanup hiring step tooltip timeout on unmount
  useEffect(() => {
    return () => {
      if (hiringStepTooltipTimeoutId) {
        clearTimeout(hiringStepTooltipTimeoutId);
      }
    };
  }, [hiringStepTooltipTimeoutId]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setActiveFilterCount(countActiveFilters(newFilters));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      searchText: "",
      status: "all",
      location: "all",
      position: "all",
      applied: {
        from: "",
        to: "",
      },
      workPreference: "all",
      applicationType: "all",
      exclusive: "all",
      hiringWorkflow: "all",
      dataChannel: "all",
      smartTenure: "all",
      tags: "",
      score: {
        min: "",
        max: "",
      },
      bidLocation: "all",
      currentLocations: [],
      hiringStep: "",
      availability: "",
      wotcStatus: "all",
      bookmarkFilter: "all",
      positionKey: "",
      jobOpeningId: "",
      dateFilterRange: "30",
    });
    setSearchQuery("");
    setActiveFilterCount(0);
  };

  // Apply all filters
  const applyFilters = () => {
    let result = [...applications];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          getApplicationName(app).toLowerCase().includes(query) ||
          getApplicationPosition(app).toLowerCase().includes(query) ||
          getApplicationLocation(app).toLowerCase().includes(query)
      );
    }

    // Apply filters from FilterResultsPanel
    if (filters.status && filters.status !== "all") {
      result = result.filter((app) =>
        getApplicationStatus(app)
          ?.toLowerCase()
          .includes(filters.status.toLowerCase())
      );
    }

    if (filters.location && filters.location !== "all") {
      result = result.filter((app) =>
        getApplicationLocation(app)
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.position && filters.position !== "all") {
      result = result.filter((app) =>
        getApplicationPosition(app)
          ?.toLowerCase()
          .includes(filters.position.toLowerCase())
      );
    }

    if (filters.wotcStatus && filters.wotcStatus !== "all") {
      result = result.filter((app) =>
        getApplicationWotcStatus(app)
          ?.toLowerCase()
          .includes(filters.wotcStatus.toLowerCase())
      );
    }

    setFilteredApplications(result);
  };

  // Function to create a circular progress indicator
  const CircleProgress = ({
    score,
    label,
  }: {
    score: number;
    label: string;
  }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="3"
              fill="transparent"
              className="opacity-20"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke={getCircleColor(score)}
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700">{score}%</span>
          </div>
        </div>
        <span className="text-xs text-gray-600 mt-1 text-center">{label}</span>
      </div>
    );
  };

  const renderSmartScoreTooltip = (score: number) => {
    // Generate random but consistent component scores based on the main score
    const smartTenureScore = Math.round(score * 0.9 + Math.random() * 10);
    const smartHireScore = Math.round(score * 0.7 + Math.random() * 15);
    const smartMatchScore = Math.round(score * 0.5 + Math.random() * 20);
    const smartScreenScore = Math.round(score * 0.5 + Math.random() * 20);

    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = mousePosition.x + 10;
    let top = mousePosition.y + 10;

    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10;
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10;
    }

    return (
      <div
        className="fixed bg-white rounded-lg shadow-xl border border-gray-200 pointer-events-auto cursor-default"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: "320px",
          zIndex: 9999,
          maxHeight: "200px",
          overflow: "visible",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">SmartScore</h3>
          <span className={`font-bold text-lg ${theme.titleColor}`}>
            {score}%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CircleProgress score={smartTenureScore} label="SmartTenure" />
          <CircleProgress score={smartHireScore} label="SmartHire" />
          <CircleProgress score={smartMatchScore} label="SmartMatch" />
          <CircleProgress score={smartScreenScore} label="SmartScreen" />
        </div>
      </div>
    );
  };

  // Render the Name tooltip
  const renderNameTooltip = (application: ApplicationData) => {
    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 400;
    const tooltipHeight = 400;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = mousePosition.x + 10;
    let top = mousePosition.y + 10;

    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10;
    }
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - 10;
    }

    return (
      <div
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[9999] w-[400px] pointer-events-none"
        style={{ left: `${left}px`, top: `${top}px` }}
      >
        {/* Name and Location */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            {getApplicationName(application)}
          </h3>
          <p className="text-sm text-gray-600">
            {getApplicationLocation(application)}
          </p>
        </div>

        {/* Applied Date */}
        <div className="flex justify-between mb-3">
          <div></div>
          <div className="text-sm">
            <span className="font-medium">Applied:</span>{" "}
            {getApplicationAppliedDate(application)}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-between mb-3">
          <div className="text-sm">
            <span className="font-medium">Email:</span>{" "}
            {getApplicationEmail(application) || "N/A"}
          </div>
          <div className="text-sm">
            <span className="font-medium">Phone:</span>{" "}
            {getApplicationPhone(application) || "N/A"}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <p className="text-sm mb-1">
            <span className="font-medium">Tags:</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {"tags" in application &&
            application.tags &&
            Array.isArray(application.tags) &&
            application.tags.length > 0 ? (
              application.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className={`text-xs px-3 py-1 rounded-full ${getTagColor(
                    tag
                  )}`}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Application Details */}
        <div className="mb-3 border-t border-gray-200 pt-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Application Type:</span>{" "}
              {("applicationType" in application &&
                application.applicationType) ||
                "N/A"}
            </div>
            <div className="text-sm">
              <span className="font-medium">Exclusive:</span>{" "}
              {("exclusive" in application && application.exclusive) || "N/A"}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">Status:</span>{" "}
              {getApplicationStatus(application)}
            </div>
            <div className="text-sm">
              <span className="font-medium">Esteem Status:</span>{" "}
              {("esteemStatus" in application && application.esteemStatus) ||
                "Not screened"}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="font-medium">WOTC Status:</span>{" "}
              {getApplicationWotcStatus(application) || "N/A"}
            </div>
            <div className="text-sm">
              <span className="font-medium">Work Preference:</span>{" "}
              {("workPreference" in application &&
                application.workPreference) ||
                "N/A"}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm">
            <span className="font-medium">Start Date:</span>{" "}
            {("startDate" in application && application.startDate) || "N/A"}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-1">
          <p className="text-sm mb-1">
            <span className="font-medium">Availability:</span>
          </p>
          <div className="bg-[#fff8f8] rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 w-1/3 bg-[#fff0f0]">
                    Day
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 w-2/3 bg-[#fff0f0]">
                    Working Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {"availabilitySchedule" in application &&
                application.availabilitySchedule &&
                Array.isArray(application.availabilitySchedule) &&
                application.availabilitySchedule.length > 0 ? (
                  (
                    application.availabilitySchedule as Array<{
                      day?: string;
                      time?: string;
                    }>
                  ).map(
                    (
                      schedule: { day?: string; time?: string },
                      index: number
                    ) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-gray-600">
                          {schedule.day || "N/A"}
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {schedule.time || "N/A"}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-2 text-gray-500 text-center"
                    >
                      NA
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Helper functions for sticky hiring step tooltip
  const showHiringStepTooltip = (applicationId: string) => {
    // Clear any existing timeout
    if (hiringStepTooltipTimeoutId) {
      clearTimeout(hiringStepTooltipTimeoutId);
      setHiringStepTooltipTimeoutId(null);
    }

    // Hide other tooltips
    setHoveredNameId(null);
    setHoveredScoreId(null);
    setActiveTooltip("hiringStep");
    setHoveredHiringStepId(applicationId);
  };

  const hideHiringStepTooltip = () => {
    // Add a 1 second delay to allow mouse to move to tooltip
    const timeoutId = setTimeout(() => {
      setHoveredHiringStepId(null);
      setHiringStepTooltipTimeoutId(null);
      setActiveTooltip(null);
    }, 1000); // 1000ms (1 second) delay

    setHiringStepTooltipTimeoutId(timeoutId);
  };

  const cancelHiringStepTooltipHide = () => {
    // Cancel the hide timeout when hovering over tooltip
    if (hiringStepTooltipTimeoutId) {
      clearTimeout(hiringStepTooltipTimeoutId);
      setHiringStepTooltipTimeoutId(null);
    }
  };

  const hideHiringStepTooltipImmediately = () => {
    // Immediately hide tooltip when leaving tooltip area
    if (hiringStepTooltipTimeoutId) {
      clearTimeout(hiringStepTooltipTimeoutId);
      setHiringStepTooltipTimeoutId(null);
    }
    setHoveredHiringStepId(null);
    setActiveTooltip(null);
  };

  const renderHiringStepTooltip = (application: ApplicationData) => {
    const hiringStepText = getApplicationHiringStep(application);

    if (!hiringStepText || hiringStepText === "-") {
      return null;
    }

    // Calculate position to ensure tooltip stays within viewport
    const tooltipWidth = 350;
    // Use dynamic height with max constraint
    const maxTooltipHeight = 350;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = mousePosition.x + 10;
    let top = mousePosition.y + 10;

    // Adjust if tooltip would go off screen
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - 10;
    }
    if (top + maxTooltipHeight > viewportHeight) {
      top = mousePosition.y - maxTooltipHeight - 10;
    }

    return (
      <div
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-[9999] w-[350px] pointer-events-none"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          maxHeight: "350px",
        }}
        onMouseEnter={cancelHiringStepTooltipHide}
        onMouseLeave={hideHiringStepTooltipImmediately}
      >
        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-gray-900">
              Hiring Step
            </h3>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line max-h-[280px] overflow-y-auto">
            {hiringStepText || "No hiring step information available"}
          </div>
        </div>
      </div>
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(
        filteredApplications.map((app) => getApplicationId(app))
      );
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId]);
    } else {
      setSelectedApplications(
        selectedApplications.filter((id) => id !== applicationId)
      );
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // Handle different field names between Application and ApplicationPoolCandidate
      switch (key) {
        case "name":
          aValue = getApplicationName(a);
          bValue = getApplicationName(b);
          break;
        case "appliedDate":
          aValue = getApplicationAppliedDate(a);
          bValue = getApplicationAppliedDate(b);
          break;
        case "smartScore":
          aValue = getApplicationSmartScore(a);
          bValue = getApplicationSmartScore(b);
          break;
        default:
          aValue = (a as any)[key];
          bValue = (b as any)[key];
      }

      if (aValue === undefined || bValue === undefined) return 0;

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredApplications(sortedApplications);
  };

  const viewApplicationDetails = (application: ApplicationData) => {
    setViewApplication(application);
    setIsViewDialogOpen(true);
  };

  // Actions dropdown component
  const ActionsDropdown = () => {
    if (!actionsOpen) return null;

    return (
      <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
        <div className="py-1">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors table-text ${
                action.className || "text-gray-700"
              }`}
              style={{
                fontFamily: "Open Sans",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredApplications.length / Number.parseInt(itemsPerPage)
  );
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage);
  const endIndex = startIndex + Number.parseInt(itemsPerPage);
  const displayedApplications = filteredApplications.slice(
    startIndex,
    endIndex
  );

  console.log(applications);

  return (
    <div className="flex flex-col min-h-full">
      <style jsx global>{`
        input,
        select,
        textarea,
        button,
        span,
        div,
        p {
          font-family: "Open Sans", sans-serif !important;
        }

        .table-input {
          font-family: "Open Sans", sans-serif !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }

        .table-button {
          font-family: "Open Sans", sans-serif !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }

        .table-text {
          font-family: "Open Sans", sans-serif !important;
          font-weight: 400 !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }

        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.4);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.3);
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
        }
      `}</style>
      <div className="p-6 pb-0 flex justify-between items-center">
        <h1
          className="font-semibold"
          style={{
            color: "#EE5A37",
            fontFamily: "Open Sans",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "1.4",
            letterSpacing: "0%",
          }}
        >
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-gray-300 text-gray-600 table-button"
              onClick={clearAllFilters}
              style={{
                fontFamily: "Open Sans",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Clear Filters <X className="ml-1 h-4 w-4" />
            </Button>
          )}
          <div className="relative">
            <button
              ref={filterButtonRef}
              className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-[#EE5A37]/90"
              style={{
                background: "#EE5A37",
                height: "40px",
                paddingLeft: "16px",
                paddingRight: "16px",
                borderRadius: "8px",
              }}
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span
                style={{
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                }}
              >
                Filter Results
              </span>
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-[#F7941D] hover:bg-[#F7941D]">
                  {activeFilterCount}
                </Badge>
              )}
            </button>
            {filterPanelOpen && (
              <FilterResultsPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setFilterPanelOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pb-8">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 mb-6">
          <div
            className={`p-4 ${theme.controlsBg} border-b border-gray-200 flex justify-between items-center mb-3`}
          >
            <div
              className="text-gray-700"
              style={{
                fontFamily: "Open Sans",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "1.4",
                letterSpacing: "0%",
              }}
            >
              Total Records:{" "}
              <span className="font-medium text-[#F7941D]">
                {filteredApplications.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  className={`flex items-center justify-center h-10 px-4 py-2 bg-white ${theme.dropdownText} border ${theme.dropdownBorder} rounded-md table-button`}
                  onClick={() => setActionsOpen(!actionsOpen)}
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <ActionsDropdown />
              </div>

              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="h-10 pl-4 pr-12 w-64 border-gray-300 table-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-gray-50 text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white"
                  onClick={() => {
                    // Trigger search functionality - the search is already reactive via useEffect
                    // This button can be used for additional search actions if needed
                  }}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger
                  className="h-10 w-[180px] border-gray-300 table-button"
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  <SelectValue placeholder="10 Records per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10" className="table-text">
                    10 Records per page
                  </SelectItem>
                  <SelectItem value="25" className="table-text">
                    25 Records per page
                  </SelectItem>
                  <SelectItem value="50" className="table-text">
                    50 Records per page
                  </SelectItem>
                  <SelectItem value="100" className="table-text">
                    100 Records per page
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-gray-300 table-button"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span
                  className="table-text"
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{Math.max(1, totalPages)}</span>
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-gray-300 table-button"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pt-2">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-x-auto border rounded-md">
                <Table
                  className="min-w-full"
                  onMouseMove={(e) =>
                    setMousePosition({ x: e.clientX, y: e.clientY })
                  }
                >
                  <TableHeader
                    className="sticky top-0 bg-background z-10"
                    style={{ background: "#EE5A370D" }}
                  >
                    <TableRow>
                      <TableHead
                        className="w-12 px-3 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedApplications.length ===
                              filteredApplications.length &&
                            filteredApplications.length > 0
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300 w-4 h-4"
                        />
                      </TableHead>
                      <TableHead
                        className="cursor-pointer px-4 w-48 h-12"
                        onClick={() => handleSort("name")}
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        <div className="flex items-center">
                          Name
                          {sortConfig?.key === "name" && (
                            <ChevronUp
                              className={cn(
                                "ml-2 h-4 w-4",
                                sortConfig.direction === "desc" &&
                                  "transform rotate-180"
                              )}
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer px-4 w-24 h-12"
                        onClick={() => handleSort("appliedDate")}
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        <div className="flex items-center">
                          Applied
                          {sortConfig?.key === "appliedDate" && (
                            <ChevronUp
                              className={cn(
                                "ml-2 h-4 w-4",
                                sortConfig.direction === "desc" &&
                                  "transform rotate-180"
                              )}
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="px-4 w-32 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Position
                      </TableHead>
                      <TableHead
                        className="px-4 w-28 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Location
                      </TableHead>
                      <TableHead
                        className="px-4 w-32 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        WOTC Status
                      </TableHead>
                      <TableHead
                        className="cursor-pointer px-4 w-28 h-12"
                        onClick={() => handleSort("smartScore")}
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        <div className="flex items-center">
                          SmartScore
                          {sortConfig?.key === "smartScore" && (
                            <ChevronUp
                              className={cn(
                                "ml-2 h-4 w-4",
                                sortConfig.direction === "desc" &&
                                  "transform rotate-180"
                              )}
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead
                        className="px-4 w-20 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Former
                      </TableHead>
                      <TableHead
                        className="px-4 w-20 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Rehire
                      </TableHead>
                      <TableHead
                        className="px-4 w-20 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Partner
                      </TableHead>
                      <TableHead
                        className="px-4 w-28 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Availability
                      </TableHead>
                      <TableHead
                        className="px-4 w-60 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      >
                        Hiring Step
                      </TableHead>
                      <TableHead
                        className="w-18 px-3 h-12"
                        style={{
                          color: "#000000",
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "1.4",
                          letterSpacing: "0%",
                        }}
                      ></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={13} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="text-gray-400 text-lg">📋</div>
                            <p className="text-gray-500 font-medium">
                              {emptyMessage}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Try adjusting your filters or search criteria.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedApplications.map((application) => (
                        <TableRow
                          key={getApplicationId(application)}
                          className="h-14"
                        >
                          <TableCell
                            className="px-3 h-14"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedApplications.includes(
                                getApplicationId(application)
                              )}
                              onChange={(e) =>
                                handleSelectApplication(
                                  getApplicationId(application),
                                  e.target.checked
                                )
                              }
                              className="rounded border-gray-300 w-4 h-4"
                            />
                          </TableCell>
                          <TableCell
                            className="px-4 relative text-black h-14"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            <div
                              className="relative inline-block cursor-pointer"
                              onMouseEnter={(e) => {
                                if (activeTooltip !== "hiringStep") {
                                  setHoveredNameId(
                                    getApplicationId(application)
                                  );
                                  setMousePosition({
                                    x: e.clientX,
                                    y: e.clientY,
                                  });
                                  setActiveTooltip("name");
                                }
                              }}
                              onMouseMove={(e) => {
                                setMousePosition({
                                  x: e.clientX,
                                  y: e.clientY,
                                });
                              }}
                              onMouseLeave={() => {
                                if (activeTooltip === "name") {
                                  setHoveredNameId(null);
                                  setActiveTooltip(null);
                                }
                              }}
                            >
                              <Link
                                href={`/applicant?id=${getApplicationId(
                                  application
                                )}`}
                                className="font-medium text-black hover:underline hover:text-[#EE5A37] whitespace-nowrap"
                                style={{
                                  fontFamily: "Open Sans",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  lineHeight: "1.4",
                                  letterSpacing: "0%",
                                }}
                              >
                                {getApplicationName(application)}
                              </Link>
                            </div>
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationAppliedDate(application)}
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationPosition(application)}
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationLocation(application)}
                          </TableCell>
                          <TableCell
                            className="px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            <span className="text-black">
                              {getApplicationWotcStatus(application) ||
                                getApplicationStatus(application) ||
                                "Pool"}
                            </span>
                          </TableCell>
                          <TableCell
                            className="px-4 relative h-14"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            <div
                              className="relative inline-block"
                              onMouseEnter={(e) => {
                                if (activeTooltip !== "hiringStep") {
                                  setHoveredScoreId(
                                    getApplicationId(application)
                                  );
                                  setMousePosition({
                                    x: e.clientX,
                                    y: e.clientY,
                                  });
                                  setActiveTooltip("score");
                                }
                              }}
                              onMouseMove={(e) => {
                                setMousePosition({
                                  x: e.clientX,
                                  y: e.clientY,
                                });
                              }}
                              onMouseLeave={() => {
                                if (activeTooltip === "score") {
                                  setHoveredScoreId(null);
                                  setActiveTooltip(null);
                                }
                              }}
                            >
                              <span
                                className={`inline-flex items-center justify-center rounded text-xs font-medium text-white cursor-pointer ${
                                  getApplicationSmartScore(application) === 0
                                    ? "bg-red-600"
                                    : getApplicationSmartScore(application) >=
                                      80
                                    ? "bg-green-500"
                                    : getApplicationSmartScore(application) >=
                                      60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  fontFamily: "Open Sans",
                                  fontWeight: 500,
                                  fontSize: "12px",
                                  lineHeight: "1.2",
                                  letterSpacing: "0%",
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "50%",
                                }}
                              >
                                {getApplicationSmartScore(application)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationFormer(application) || "-"}
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationRehire(application) || "-"}
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationPartner(application) || "-"}
                          </TableCell>
                          <TableCell
                            className="text-black px-4 h-14 whitespace-nowrap"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            {getApplicationAvailability(application) || "-"}
                          </TableCell>
                          <TableCell
                            className="px-4 h-14"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            <div
                              className="relative inline-block cursor-pointer w-full"
                              onMouseEnter={() =>
                                showHiringStepTooltip(
                                  getApplicationId(application)
                                )
                              }
                              onMouseLeave={hideHiringStepTooltip}
                            >
                              <div
                                className="text-black line-clamp-2 overflow-hidden text-ellipsis"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  lineHeight: "1.4",
                                  maxHeight: "2.8em",
                                }}
                              >
                                {truncateHiringStep(
                                  getApplicationHiringStep(application)
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            className="px-3 h-14"
                            style={{
                              fontFamily: "Open Sans",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "1.4",
                              letterSpacing: "0%",
                            }}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {actions.map((action, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={action.className}
                                  >
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Viewing application for{" "}
              {viewApplication ? getApplicationName(viewApplication) : ""}
            </DialogDescription>
          </DialogHeader>

          {viewApplication && (
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Application Details</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium text-xl">
                    {getApplicationName(viewApplication)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {getApplicationName(viewApplication)}
                    </h2>
                    <p className="text-gray-500">
                      {getApplicationPosition(viewApplication)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span>{getApplicationEmail(viewApplication)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Phone:</span>
                          <span>{getApplicationPhone(viewApplication)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span>{getApplicationLocation(viewApplication)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Application Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800"
                          >
                            {getApplicationStatus(viewApplication)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Applied Date:</span>
                          <span>
                            {getApplicationAppliedDate(viewApplication)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Source:</span>
                          <span>{getApplicationSource(viewApplication)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Details</CardTitle>
                    <CardDescription>
                      Detailed information about the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">
                            Position Information
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Position:</span>
                              <span>
                                {getApplicationPosition(viewApplication)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location:</span>
                              <span>
                                {getApplicationLocation(viewApplication)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Availability:
                              </span>
                              <span>
                                {getApplicationAvailability(viewApplication)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">
                            Assessment Information
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status:</span>
                              <span>
                                {getApplicationAssessmentStatus(
                                  viewApplication
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Score:</span>
                              <span>
                                {getApplicationAssessmentScore(viewApplication)}
                                %
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Date:</span>
                              <span>
                                {getApplicationAssessmentDate(viewApplication)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Results</CardTitle>
                    <CardDescription>
                      Detailed assessment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">
                            Assessment Details
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status:</span>
                              <Badge
                                variant="secondary"
                                className={
                                  getApplicationAssessmentStatus(
                                    viewApplication
                                  ) === "Passed"
                                    ? "bg-green-100 text-green-800"
                                    : getApplicationAssessmentStatus(
                                        viewApplication
                                      ) === "Failed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              >
                                {getApplicationAssessmentStatus(
                                  viewApplication
                                )}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Score:</span>
                              <span>
                                {getApplicationAssessmentScore(viewApplication)}
                                %
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Date:</span>
                              <span>
                                {getApplicationAssessmentDate(viewApplication)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Notes</h3>
                          <p className="text-gray-600">
                            {getApplicationAssessmentNotes(viewApplication) ||
                              "No notes available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Application related documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-gray-500">No documents available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Smart Tooltips */}
      {hoveredNameId &&
        renderNameTooltip(
          filteredApplications.find(
            (app) => getApplicationId(app) === hoveredNameId
          )!
        )}

      {hoveredScoreId &&
        renderSmartScoreTooltip(
          getApplicationSmartScore(
            filteredApplications.find(
              (app) => getApplicationId(app) === hoveredScoreId
            )!
          )
        )}

      {hoveredHiringStepId &&
        renderHiringStepTooltip(
          filteredApplications.find(
            (app) => getApplicationId(app) === hoveredHiringStepId
          )!
        )}
    </div>
  );
}
