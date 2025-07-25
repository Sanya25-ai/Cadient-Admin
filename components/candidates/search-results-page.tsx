"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Mail, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Application {
  position: string;
  date: string;
}

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  source: string;
  experience: string;
  applications: Application[];
  initials: string;
  backgroundColor: string;
}

interface SearchData {
  success: boolean;
  candidates: Candidate[];
  totalCandidates: number;
  totalApplications: number;
}

interface FilterData {
  requisitions: { name: string; count: number }[];
  generalSources: { name: string; count: number }[];
  candidateTypes: { name: string; count: number }[];
}

export function SearchResultsPage() {
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [sortBy, setSortBy] = useState("Date Applied");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Mock filter data
  const filterData: FilterData = {
    requisitions: [
      { name: "All Requisitions", count: 0 },
      { name: "Assistant Manager - 138", count: 26 },
      { name: "Payroll Administrator - 618", count: 6 },
      { name: "Prep Cook - Seattle - 322", count: 12 },
    ],
    generalSources: [
      { name: "Web Site", count: 19 },
      { name: "College Recruitment", count: 1 },
    ],
    candidateTypes: [
      { name: "All Candidate Types", count: 0 },
      { name: "External", count: 19 },
    ],
  };

  useEffect(() => {
    // Get the results from localStorage
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      try {
        const data = JSON.parse(storedResults);
        setSearchData(data);
        // Clear the stored results
        localStorage.removeItem("searchResults");
      } catch (err) {
        setError("Failed to parse search results");
      }
    } else {
      setError("No search results found. Please perform a search first.");
    }
    setIsLoading(false);
  }, []);

  const handleBackToSearch = () => {
    router.push("/candidates/advanced-search");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = () => {
    // Implement search functionality within results
    console.log("Searching within results:", searchKeywords);
  };

  const handleSaveSearch = () => {
    setShowSaveModal(true);
  };

  const handleSaveConfirm = () => {
    if (!searchName.trim()) return;

    // Close modal and show success alert without saving to localStorage
    setShowSaveModal(false);
    setSearchName("");
    setShowSuccessAlert(true);

    // Hide success alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  const handleSaveCancel = () => {
    setShowSaveModal(false);
    setSearchName("");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error || !searchData) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            No Results Found
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex justify-center">
            <Button
              onClick={handleBackToSearch}
              variant="outline"
              className="flex items-center"
            >
              ← Back to Advanced Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        {/* Sub-header with Back Navigation */}
        <div className="flex items-center h-16 border-b border-gray-200 mb-4">
          <Button
            onClick={handleBackToSearch}
            variant="ghost"
            size="sm"
            className="mr-3 text-black hover:text-gray-700"
          >
            ← Search Results
          </Button>
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center justify-between mb-4 h-16">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>
              Candidates: {searchData.totalCandidates} | Applications:{" "}
              {searchData.totalApplications}
            </span>
            <span>Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Date Applied">Date Applied</SelectItem>
                <SelectItem value="Name">Name</SelectItem>
                <SelectItem value="Location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleFilters}
              variant="outline"
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button variant="outline" className="flex items-center">
              ↓ Export All Results
            </Button>
          </div>
        </div>

        {/* Sub-header with Search and Save */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center space-x-2 flex-1">
            <div className="flex-1 relative max-w-md">
              <Input
                placeholder="Search keywords..."
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Search
            </Button>
          </div>

          <Button
            className="bg-orange-500 hover:bg-orange-600 ml-4"
            onClick={handleSaveSearch}
          >
            Save this search
          </Button>
        </div>
      </div>

      {/* Filter Modal Overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
          <div className="bg-white w-80 h-full shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Narrow Your Search</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              {/* Requisition Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Requisition</h4>
                <div className="space-y-2">
                  {filterData.requisitions.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                        index === 0
                          ? "bg-orange-100 border-l-4 border-orange-500"
                          : ""
                      }`}
                    >
                      <span className="text-sm">{req.name}</span>
                      {req.count > 0 && (
                        <span className="text-sm text-gray-500">
                          {req.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* General Source Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">General Source</h4>
                <div className="space-y-2">
                  {filterData.generalSources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50"
                    >
                      <span className="text-sm">{source.name}</span>
                      <span className="text-sm text-gray-500">
                        {source.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Candidate Type</h4>
                <div className="space-y-2">
                  {filterData.candidateTypes.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50"
                    >
                      <span className="text-sm">{type.name}</span>
                      {type.count > 0 && (
                        <span className="text-sm text-gray-500">
                          {type.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Save Search Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Search</h3>
            <div className="mb-4">
              <label
                htmlFor="searchName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Name
              </label>
              <Input
                id="searchName"
                type="text"
                placeholder="Enter a name for this search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleSaveCancel}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveConfirm}
                className="bg-orange-500 hover:bg-orange-600"
                disabled={!searchName.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Search saved successfully!
                </p>
                <p className="text-sm text-green-600">
                  You can find it in your saved searches.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="w-full">
        <div className="space-y-4">
          {searchData.candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: candidate.backgroundColor }}
                  >
                    {candidate.initials}
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <p className="text-gray-600 mb-2">{candidate.experience}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{candidate.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Source:</span>
                        <span className="ml-2">{candidate.source}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{candidate.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications */}
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {candidate.applications.length} Application
                    {candidate.applications.length !== 1 ? "s" : ""}
                  </div>
                  <div className="space-y-1">
                    {candidate.applications.map((app, index) => (
                      <div key={index} className="text-sm">
                        <div className="text-gray-600">{app.date}</div>
                        <div className="text-blue-600 hover:underline cursor-pointer">
                          {app.position}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Resume Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
