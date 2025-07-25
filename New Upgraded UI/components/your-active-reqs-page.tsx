"use client";

import type React from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const requisitionsData = [
  {
    id: "616",
    position: "Site Superintendent",
    location: "Chicago, IL",
    postings: 0,
    hasAlert: true,
    primaryRecruiter: "Pratham Jain",
    createdBy: "Pratham Jain",
    status: "Active",
    created: "9/13/2024",
  },
  {
    id: "615",
    position: "Payroll Administrator",
    location: "Chicago, IL",
    postings: 1,
    hasAlert: false,
    primaryRecruiter: "Pratham Jain",
    createdBy: "Pratham Jain",
    status: "Active",
    created: "8/11/2024",
  },
  {
    id: "611",
    position: "Pharmacist",
    location: "Chicago, IL",
    postings: 1,
    hasAlert: false,
    primaryRecruiter: "Pratham Jain",
    createdBy: "Pratham Jain",
    status: "Active",
    created: "9/4/2024",
  },
];

export function YourActiveReqsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const [filters, setFilters] = useState({
    requisitionNumber: "",
    jobTitle: "",
    category: "-- All --",
    location: "",
    requisitionStatus: "Active",
    primaryRecruiter: "",
    creatorFirstName: "",
    creatorLastName: "",
    showRequisitions: "Yours",
  });

  const [hoveredReq, setHoveredReq] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Applying filters:", filters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      requisitionNumber: "",
      jobTitle: "",
      category: "-- All --",
      location: "",
      requisitionStatus: "Active",
      primaryRecruiter: "",
      creatorFirstName: "",
      creatorLastName: "",
      showRequisitions: "Yours",
    });
  };

  const handleRequisitionClick = (requisitionId: string) => {
    router.push(`/requisitions/your-active-reqs/${requisitionId}`);
  };

  const handleMouseEnter = (reqId: string, event: React.MouseEvent) => {
    setHoveredReq(reqId);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredReq(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredReq) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div className="min-h-screen space-y-6 p-8 pt-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#EE5A37]">
          Your Active Reqs
        </h1>
        <Button
          className="bg-[#ee5a37] hover:bg-[#ee5a37]/90 text-white"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter Results
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filter</h3>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {/* Requisition Number */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Requisition Number:
                </Label>
                <Input
                  value={filters.requisitionNumber}
                  onChange={(e) =>
                    handleFilterChange("requisitionNumber", e.target.value)
                  }
                  className="h-10"
                />
              </div>

              {/* Job Title */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Job Title:
                </Label>
                <Input
                  value={filters.jobTitle}
                  onChange={(e) =>
                    handleFilterChange("jobTitle", e.target.value)
                  }
                  className="h-10"
                />
              </div>

              {/* Category */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Category:
                </Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-- All --">-- All --</SelectItem>
                    <SelectItem value="Distribution">Distribution</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Location:
                </Label>
                <Input
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="h-10"
                />
              </div>

              {/* Requisition Status */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Requisition Status:
                </Label>
                <Select
                  value={filters.requisitionStatus}
                  onValueChange={(value) =>
                    handleFilterChange("requisitionStatus", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Primary Recruiter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Primary Recruiter:
                </Label>
                <Input
                  value={filters.primaryRecruiter}
                  onChange={(e) =>
                    handleFilterChange("primaryRecruiter", e.target.value)
                  }
                  className="h-10"
                />
              </div>

              {/* Creator Names Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Requisition Creator First Name:
                  </Label>
                  <Input
                    value={filters.creatorFirstName}
                    onChange={(e) =>
                      handleFilterChange("creatorFirstName", e.target.value)
                    }
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Requisition Creator Last Name:
                  </Label>
                  <Input
                    value={filters.creatorLastName}
                    onChange={(e) =>
                      handleFilterChange("creatorLastName", e.target.value)
                    }
                    className="h-10"
                  />
                </div>
              </div>

              {/* Show Requisitions */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Show Requisitions:
                </Label>
                <Select
                  value={filters.showRequisitions}
                  onValueChange={(value) =>
                    handleFilterChange("showRequisitions", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yours">Yours</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="pt-4">
                <Button
                  onClick={handleSearch}
                  className="bg-[#EE5A37] hover:bg-[#EE5A37]/90"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls Bar - Same as pre-screened applications */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="p-4 bg-[#EE5A37]/5 border-b border-gray-200 flex justify-between items-center mb-3">
          <div className="text-sm text-gray-500">
            Total Records:{" "}
            <span className="font-medium text-[#F7941D]">
              {requisitionsData.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="h-9 pl-10 pr-4 w-64 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value="10" onValueChange={() => {}}>
              <SelectTrigger className="h-9 w-[180px] border-gray-300">
                <SelectValue placeholder="10 Records per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Records per page</SelectItem>
                <SelectItem value="25">25 Records per page</SelectItem>
                <SelectItem value="50">50 Records per page</SelectItem>
                <SelectItem value="100">100 Records per page</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-gray-300"
                disabled={true}
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
                className="h-9 w-9 border-gray-300"
                disabled={true}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">
                      Position (Req #)
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Postings
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Primary Recruiter
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Created By
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Created
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requisitionsData.map((req) => (
                    <TableRow key={req.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div
                            className="font-medium text-gray-900 cursor-pointer hover:text-[#EE5A37] transition-colors"
                            onClick={() => handleRequisitionClick(req.id)}
                            onMouseEnter={(e) => handleMouseEnter(req.id, e)}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                          >
                            {req.position} ({req.id})
                          </div>
                          <div className="text-sm text-gray-500">
                            {req.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900">{req.postings}</span>
                          {req.hasAlert && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {req.primaryRecruiter}
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {req.createdBy}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-900">{req.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {req.created}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* Hover Tooltip */}
      {hoveredReq && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
          }}
        >
          {(() => {
            const req = requisitionsData.find((r) => r.id === hoveredReq);
            if (!req) return null;

            return (
              <div className="space-y-2">
                <div className="font-semibold text-gray-900">
                  {req.position}
                </div>
                <div className="text-sm text-gray-600">
                  <div>
                    <strong>Requisition #:</strong> {req.id}
                  </div>
                  <div>
                    <strong>Location:</strong> {req.location}
                  </div>
                  <div>
                    <strong>Status:</strong> {req.status}
                  </div>
                  <div>
                    <strong>Postings:</strong> {req.postings}
                  </div>
                  <div>
                    <strong>Primary Recruiter:</strong> {req.primaryRecruiter}
                  </div>
                  <div>
                    <strong>Created By:</strong> {req.createdBy}
                  </div>
                  <div>
                    <strong>Created:</strong> {req.created}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
