"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  type JobTemplate,
  type JobTemplateApiResponse,
  SEARCH_CRITERIA_OPTIONS,
} from "@/types/job-template";
import { Plus, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function JobTemplateLibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [data, setData] = useState<JobTemplateApiResponse>({
    jobs: [],
    categories: [],
    categoryList: [],
    searchOptions: [],
    numJobs: 0,
    searchParams: {
      keywords: "",
      keywordsCriteria: "",
      selectedCategory: "",
      sortColumn: "dateLastModified",
      sortDirection: "desc",
      reqCreateFromJob: false,
    },
    reqCreateFromJob: false,
    pageQueryString: "",
    searchOptionText: "",
    textSubstitutions: {},
  });
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalSearchTerm, setModalSearchTerm] = useState("");
  const [modalSearchType, setModalSearchType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<JobTemplate | null>(
    null
  );

  // Load job templates from API - no mock data fallbacks
  const loadJobTemplates = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🔍 [JobTemplateLibraryPage] Loading job templates...");

      // Build query parameters from current search state
      const params = new URLSearchParams();
      if (searchTerm) params.set("keywords", searchTerm);
      if (searchType) params.set("keywordsCriteria", searchType);
      if (selectedCategory) params.set("selectedCategory", selectedCategory);

      const apiUrl = `/api/job-templates${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      console.log("🌐 [JobTemplateLibraryPage] Calling API:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log(
        "📡 [JobTemplateLibraryPage] API response status:",
        response.status
      );

      const jobData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError(
            "Authentication failed. Please log in to access job templates."
          );
          setIsAuthenticated(false);
          // Set empty data structure from API response
          setData(jobData);
          return;
        }
        throw new Error(
          jobData.error || `Failed to fetch job templates: ${response.status}`
        );
      }

      console.log(
        "✅ [JobTemplateLibraryPage] Successfully fetched job templates:",
        {
          jobsCount: jobData.jobs?.length || 0,
          categoriesCount: jobData.categories?.length || 0,
          numJobs: jobData.numJobs || 0,
        }
      );

      setData(jobData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "❌ [JobTemplateLibraryPage] Error fetching job templates:",
        error
      );
      setError(
        error instanceof Error ? error.message : "Failed to fetch job templates"
      );
      setIsAuthenticated(false);

      // Set empty data structure - no mock data
      setData({
        jobs: [],
        categories: [],
        categoryList: [],
        searchOptions: [],
        numJobs: 0,
        searchParams: {
          keywords: searchTerm,
          keywordsCriteria: searchType,
          selectedCategory: selectedCategory,
          sortColumn: "dateLastModified",
          sortDirection: "desc",
          reqCreateFromJob: false,
        },
        reqCreateFromJob: false,
        pageQueryString: "",
        searchOptionText: "",
        textSubstitutions: {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount and when search parameters change
  useEffect(() => {
    // Get initial values from URL search params
    const urlKeywords = searchParams?.get("keywords") || "";
    const urlKeywordsCriteria = searchParams?.get("keywordsCriteria") || "";
    const urlSelectedCategory = searchParams?.get("selectedCategory") || "";

    setSearchTerm(urlKeywords);
    setSearchType(urlKeywordsCriteria);
    setSelectedCategory(urlSelectedCategory);

    loadJobTemplates();
  }, [searchParams]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTemplates(data.jobs.map((template) => template.id));
    } else {
      setSelectedTemplates([]);
    }
  };

  const handleSelectTemplate = (templateId: string, checked: boolean) => {
    if (checked) {
      setSelectedTemplates([...selectedTemplates, templateId]);
    } else {
      setSelectedTemplates(selectedTemplates.filter((id) => id !== templateId));
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build new URL with search parameters
      const params = new URLSearchParams();
      if (searchTerm) params.set("keywords", searchTerm);
      if (searchType) params.set("keywordsCriteria", searchType);
      if (selectedCategory) params.set("selectedCategory", selectedCategory);

      // Navigate to new URL which will trigger useEffect to reload data
      router.push(`/requisitions/job-template-library?${params.toString()}`);
    } catch (err) {
      setError("Failed to search job templates");
      console.error("Search error:", err);
      setIsLoading(false);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);

    // Build new URL with category filter
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (category) {
      params.set("selectedCategory", category);
    } else {
      params.delete("selectedCategory");
    }

    router.push(`/requisitions/job-template-library?${params.toString()}`);
  };

  const handleMassAction = async (action: "archive" | "activate") => {
    if (selectedTemplates.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/job-templates/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          selectedIds: selectedTemplates,
          searchParams: data.searchParams,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to perform action");
      }

      // Clear selections
      setSelectedTemplates([]);

      // Reload data to show updated results
      await loadJobTemplates();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to perform action");
      console.error("Mass action error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFilter = (filterType: "category" | "keywords") => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (filterType === "category") {
      params.delete("selectedCategory");
      setSelectedCategory("");
    } else if (filterType === "keywords") {
      params.delete("keywords");
      params.delete("keywordsCriteria");
      setSearchTerm("");
      setSearchType("");
    }

    router.push(`/requisitions/job-template-library?${params.toString()}`);
  };

  // Helper function to get display text for job template properties
  const getJobDisplayValue = (job: JobTemplate, property: string): string => {
    switch (property) {
      case "title":
        return job.localeJob?.title || job.title || "";
      case "description":
        return job.localeJob?.description || job.description || "";
      case "requirements":
        return job.localeJob?.requirements || job.requirements || "";
      case "category":
        // Find category text from categories list
        const category = data.categories.find(
          (cat) => cat.name === job.jobCategory
        );
        return category?.text || job.jobCategory || "";
      default:
        return "";
    }
  };

  const hasActiveFilters =
    data.searchParams.keywords || data.searchParams.selectedCategory;

  // Show detail view if a template is selected
  if (selectedTemplate) {
    const { JobTemplateDetailModern } = require("./job-template-detail-modern");
    return (
      <JobTemplateDetailModern
        template={selectedTemplate}
        onBack={() => setSelectedTemplate(null)}
      />
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 bg-white relative">
      {/* Error Display */}
      {error && (
        <div
          className={`border px-4 py-3 rounded ${
            !isAuthenticated
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className={`h-5 w-5 ${
                  !isAuthenticated ? "text-red-400" : "text-yellow-400"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                {error}
                {!isAuthenticated && (
                  <span className="block mt-1">
                    <a
                      href="/api/test-legacy"
                      target="_blank"
                      className="underline"
                      rel="noreferrer"
                    >
                      Test Legacy Connection
                    </a>
                    {" | "}
                    <a href="/login" className="underline">
                      Go to Login
                    </a>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Search Job Templates:</span>
          <button
            type="button"
            className="px-3 py-1.5 text-sm border border-[#F7941D] text-[#F7941D] rounded hover:bg-[#F7941D] hover:text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("By Keyword clicked!");
              setModalSearchTerm(searchTerm);
              setModalSearchType(searchType);
              setShowSearchModal(true);
            }}
            style={{ pointerEvents: "auto", zIndex: 10 }}
          >
            By Keyword
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* Category search modal could be implemented here */
            }}
          >
            By Category
          </Button>
          <div className="ml-auto">
            <Button
              className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white"
              onClick={() =>
                router.push("/requisitions/job-template-library/create")
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Create a new Job Template
            </Button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                disabled={!isAuthenticated}
              />
            </div>
            <Select
              value={searchType || "all"}
              onValueChange={(value) =>
                setSearchType(value === "all" ? "" : value)
              }
              disabled={!isAuthenticated}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Search in..." />
              </SelectTrigger>
              <SelectContent>
                {/* Dynamically render search options from API response */}
                {data.searchOptions && data.searchOptions.length > 0 ? (
                  data.searchOptions.map((option) => (
                    <SelectItem
                      key={option.value || "all"}
                      value={option.value || "all"}
                    >
                      {option.text}
                    </SelectItem>
                  ))
                ) : (
                  // Fallback to hardcoded options if API doesn't provide them
                  <>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value={SEARCH_CRITERIA_OPTIONS.JOB_TITLE}>
                      Job Title
                    </SelectItem>
                    <SelectItem value={SEARCH_CRITERIA_OPTIONS.JOB_DESCRIPTION}>
                      Job Description
                    </SelectItem>
                    <SelectItem value={SEARCH_CRITERIA_OPTIONS.JOB_REQUIREMENT}>
                      Job Requirements
                    </SelectItem>
                    <SelectItem value={SEARCH_CRITERIA_OPTIONS.JOB_CODE}>
                      Job Code
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !isAuthenticated}
              className="bg-[#F7941D] hover:bg-[#F7941D]/90"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="font-medium">Filter by Category:</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                className={
                  !selectedCategory ? "bg-[#F7941D] hover:bg-[#F7941D]/90" : ""
                }
                onClick={() => handleCategoryFilter("")}
                disabled={!isAuthenticated}
              >
                All Categories
              </Button>
              {data.categories.map((category) => (
                <Button
                  key={category.name}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  size="sm"
                  className={
                    selectedCategory === category.name
                      ? "bg-[#F7941D] hover:bg-[#F7941D]/90"
                      : ""
                  }
                  onClick={() => handleCategoryFilter(category.name)}
                  disabled={!isAuthenticated}
                >
                  {category.text}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Details</h3>
          <p className="text-sm text-gray-600">
            {data.numJobs === 1
              ? "There is 1 Job Template"
              : `There are ${data.numJobs} Job Templates`}
          </p>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {data.searchParams.selectedCategory && (
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded border">
                    <span className="text-sm">
                      <strong>Category:</strong>{" "}
                      {getJobDisplayValue({} as JobTemplate, "category")}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveFilter("category")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {data.searchParams.keywords && (
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded border">
                    <span className="text-sm">
                      <strong>Keywords:</strong> {data.searchParams.keywords}
                      {data.searchOptionText && ` (${data.searchOptionText})`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveFilter("keywords")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-[#EE5A37]/5 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-50"
              disabled={
                selectedTemplates.length === 0 || isLoading || !isAuthenticated
              }
              onClick={() => handleMassAction("archive")}
            >
              <X className="h-4 w-4 mr-2" />
              Archive Selected Job Templates
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Results:{" "}
              <span className="text-[#F7941D] font-medium">
                1-{data.jobs.length} of {data.numJobs}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedTemplates.length === data.jobs.length &&
                    data.jobs.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  disabled={!isAuthenticated}
                />
              </TableHead>
              <TableHead className="font-medium">Job Template</TableHead>
              <TableHead className="font-medium">Assessment</TableHead>
              <TableHead className="font-medium">Job Code</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium">Last Modified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center space-y-3">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F7941D]"></div>
                        <p className="text-gray-500">
                          Loading job templates...
                        </p>
                      </>
                    ) : !isAuthenticated ? (
                      <>
                        <svg
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <div className="text-center">
                          <p className="text-gray-500 font-medium">
                            Authentication Required
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            Please log in to view job templates
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div className="text-center">
                          <p className="text-gray-500 font-medium">
                            No Job Templates Found
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            {hasActiveFilters
                              ? "Try adjusting your search criteria or filters"
                              : "No job templates are currently available"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.jobs.map((template) => (
                <TableRow key={template.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedTemplates.includes(template.id)}
                      onCheckedChange={(checked) =>
                        handleSelectTemplate(template.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium relative">
                    <span
                      className="cursor-pointer hover:text-[#EE5A37] transition-colors"
                      onMouseEnter={() => setHoveredTemplate(template.id)}
                      onMouseLeave={() => setHoveredTemplate(null)}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      {getJobDisplayValue(template, "title")}
                    </span>
                    {hoveredTemplate === template.id && (
                      <div className="absolute left-full top-0 ml-2 z-50 max-w-md p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium">Job Template: </span>
                            <span>{getJobDisplayValue(template, "title")}</span>
                          </div>
                          <div>
                            <span className="font-medium">Job Code: </span>
                            <span>{template.jobCode}</span>
                          </div>
                          <div>
                            <span className="font-medium">Category: </span>
                            <span>
                              {getJobDisplayValue(template, "category")}
                            </span>
                          </div>
                          {template.description && (
                            <div>
                              <span className="font-medium">Description: </span>
                              <span className="text-sm">
                                {getJobDisplayValue(template, "description")}
                              </span>
                            </div>
                          )}
                          {template.requirements && (
                            <div>
                              <span className="font-medium">
                                Requirements:{" "}
                              </span>
                              <span className="text-sm">
                                {getJobDisplayValue(template, "requirements")}
                              </span>
                            </div>
                          )}
                          {template.grade && (
                            <div>
                              <span className="font-medium">Grade: </span>
                              <span>{template.grade}</span>
                            </div>
                          )}
                          {template.videoUrl && (
                            <div>
                              <span className="font-medium">Video: </span>
                              <span>Available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {template.jobScripts && template.jobScripts.length > 0 ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>{template.jobCode}</TableCell>
                  <TableCell>
                    {getJobDisplayValue(template, "category")}
                  </TableCell>
                  <TableCell>{template.dateLastModified}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Search Modal */}
      <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Search Job Templates</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Button
              className="w-full bg-[#F7941D] hover:bg-[#F7941D]/90 text-white"
              onClick={() => {
                setSearchTerm(modalSearchTerm);
                setSearchType(modalSearchType);
                setShowSearchModal(false);
                // Trigger search
                const params = new URLSearchParams();
                if (modalSearchTerm) params.set("keywords", modalSearchTerm);
                if (modalSearchType)
                  params.set("keywordsCriteria", modalSearchType);
                if (selectedCategory)
                  params.set("selectedCategory", selectedCategory);
                router.push(
                  `/requisitions/job-template-library?${params.toString()}`
                );
              }}
            >
              Search
            </Button>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="keyword-input"
                    className="text-sm font-medium"
                  >
                    By Keyword:
                  </label>
                  <div className="relative group">
                    <button className="w-4 h-4 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ?
                    </button>
                    <div className="absolute left-6 top-0 z-50 invisible group-hover:visible bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap">
                      Search for Keyword in Title, Job Code, Description, or
                      Requirements
                    </div>
                  </div>
                </div>
                <Input
                  id="keyword-input"
                  placeholder=""
                  value={modalSearchTerm}
                  onChange={(e) => setModalSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Search Options:</label>
                  <div className="relative group">
                    <button className="w-4 h-4 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ?
                    </button>
                    <div className="absolute left-6 top-0 z-50 invisible group-hover:visible bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap">
                      Narrow down your search to the field selected
                    </div>
                  </div>
                </div>
                <Select
                  value={modalSearchType || "all"}
                  onValueChange={(value) =>
                    setModalSearchType(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- All --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">-- All --</SelectItem>
                    <SelectItem value="jobTitle">Job Title</SelectItem>
                    <SelectItem value="jobCode">Job Code</SelectItem>
                    <SelectItem value="jobDescription">
                      Job Description
                    </SelectItem>
                    <SelectItem value="jobRequirement">
                      Job Requirement
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
