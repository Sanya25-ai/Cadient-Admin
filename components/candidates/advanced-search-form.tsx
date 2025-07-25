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
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronRight, Plus, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdvancedSearchForm() {
  const router = useRouter();
  const [openSections, setOpenSections] = useState([
    "location",
    "date",
    "personal",
    "employment",
    "education",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleCustomDateRangeToggle = () => {
    setShowCustomDateRange(!showCustomDateRange);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/candidates/advanced-search", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Your session has expired. Please log in again.");
        } else if (response.status === 404) {
          throw new Error(
            "No results found for your search criteria. Please try different search terms."
          );
        } else {
          throw new Error(
            "An error occurred while searching. Please try again."
          );
        }
      }

      // Get the JSON response data
      const data = await response.json();

      if (data.success) {
        // Store the results in localStorage for the results page to use
        localStorage.setItem("searchResults", JSON.stringify(data));
        // Navigate to the results page
        router.push("/candidates/search-results");
      } else {
        throw new Error(
          data.error ||
            "No results found. Please try different search criteria."
        );
      }
    } catch (error) {
      console.error("Error submitting search:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Brand color
  const brandColor = "#EE5A37";
  const headerBgColor = "rgba(238, 90, 55, 0.05)"; // #EE5A37 with 5% opacity

  return (
    <div className="w-full">
      <div className="mb-3">
        <h2
          className="text-2xl font-semibold mb-2"
          style={{ color: brandColor }}
        >
          Advanced Search
        </h2>
        <p className="text-sm text-muted-foreground">
          Search for candidates based on specific criteria
        </p>
      </div>

      <div className="rounded-lg mb-6">
        <p className="text-sm text-muted-foreground">
          If you enter search terms in multiple fields, the search results will
          include only those candidates who match all terms. The following
          fields are wildcard enabled: First Name, Last Name, Company Name, Job
          Title, School Name, Field of Study, and City. These fields allow OR
          and * searches. Use the OR operator for multiple terms. Use the
          wildcard character * for a starts with search (for example, Ann*).
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Keywords Section */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <h3 className="text-base font-medium">Keywords</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="keywords" className="text-sm font-medium">
                  Keywords:
                </Label>
                <Textarea
                  id="keywords"
                  name="keywords"
                  placeholder="Enter terms related to candidate's expertise (for example, management). Use the AND and OR operators for multiple terms"
                  className="h-20 mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="requisition" className="text-sm font-medium">
                  Requisition:
                </Label>
                <div className="flex mt-1.5">
                  <Input
                    id="requisition"
                    name="requisition"
                    placeholder="Select or enter requisition"
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-l-none border-l-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="general-source"
                    className="text-sm font-medium"
                  >
                    General Source:
                  </Label>
                  <Select name="generalSource">
                    <SelectTrigger id="general-source" className="mt-1.5">
                      <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indeed">Indeed</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="referral">
                        Employee Referral
                      </SelectItem>
                      <SelectItem value="website">Company Website</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="candidate-type"
                    className="text-sm font-medium"
                  >
                    Candidate Type:
                  </Label>
                  <Select name="candidateType">
                    <SelectTrigger id="candidate-type" className="mt-1.5">
                      <SelectValue placeholder="-- All --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">External</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("location")}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              style={{ backgroundColor: headerBgColor }}
            >
              <span className="text-base font-medium">Location</span>
              {openSections.includes("location") ? (
                <ChevronDown
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              ) : (
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              )}
            </button>
            {openSections.includes("location") && (
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country:
                  </Label>
                  <Select name="country">
                    <SelectTrigger id="country" className="mt-1.5">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("date")}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              style={{ backgroundColor: headerBgColor }}
            >
              <span className="text-base font-medium">Date</span>
              {openSections.includes("date") ? (
                <ChevronDown
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              ) : (
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              )}
            </button>
            {openSections.includes("date") && (
              <div className="p-4 space-y-4">
                <div>
                  <Label
                    htmlFor="application-date"
                    className="text-sm font-medium"
                  >
                    Application Date:
                  </Label>
                  <Select name="applicationDate">
                    <SelectTrigger id="application-date" className="mt-1.5">
                      <SelectValue placeholder="Choose date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7">Last 7 days</SelectItem>
                      <SelectItem value="last30">Last 30 days</SelectItem>
                      <SelectItem value="last90">Last 90 days</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleCustomDateRangeToggle}
                    className="text-sm hover:underline"
                    style={{ color: brandColor }}
                  >
                    {showCustomDateRange
                      ? "Hide custom date range"
                      : "Use a custom date range"}
                  </button>
                </div>
                {showCustomDateRange && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="from-date"
                          className="text-sm font-medium"
                        >
                          From Date:
                        </Label>
                        <Input
                          id="from-date"
                          name="fromDate"
                          type="date"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="to-date"
                          className="text-sm font-medium"
                        >
                          To Date:
                        </Label>
                        <Input
                          id="to-date"
                          name="toDate"
                          type="date"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("personal")}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              style={{ backgroundColor: headerBgColor }}
            >
              <span className="text-base font-medium">
                Personal Information
              </span>
              {openSections.includes("personal") ? (
                <ChevronDown
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              ) : (
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              )}
            </button>
            {openSections.includes("personal") && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name" className="text-sm font-medium">
                      First Name:
                    </Label>
                    <Input
                      id="first-name"
                      name="firstName"
                      placeholder="Enter first name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name" className="text-sm font-medium">
                      Last Name:
                    </Label>
                    <Input
                      id="last-name"
                      name="lastName"
                      placeholder="Enter last name"
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email:
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone:
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Employment */}
          <div className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("employment")}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              style={{ backgroundColor: headerBgColor }}
            >
              <span className="text-base font-medium">Employment</span>
              {openSections.includes("employment") ? (
                <ChevronDown
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              ) : (
                <ChevronRight
                  className="h-4 w-4"
                  style={{ color: brandColor }}
                />
              )}
            </button>
            {openSections.includes("employment") && (
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company:
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Enter company name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="job-title" className="text-sm font-medium">
                    Job Title:
                  </Label>
                  <Input
                    id="job-title"
                    name="jobTitle"
                    placeholder="Enter job title"
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <div className="flex justify-start space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="h-4 w-4 mr-2" />
                {isSubmitting ? "Searching..." : "Search"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
