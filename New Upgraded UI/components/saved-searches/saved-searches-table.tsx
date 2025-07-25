"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSavedSearchesContext } from "@/lib/saved-searches-context";
import { format } from "date-fns";
import { ChevronRight, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function SavedSearchesTable() {
  const { searches, loading, error, runSearch, deleteSearch } =
    useSavedSearchesContext();
  const [selectedSearches, setSelectedSearches] = useState<Set<number>>(
    new Set()
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSearches(new Set(searches.map((s) => s.id)));
    } else {
      setSelectedSearches(new Set());
    }
  };

  const handleSelectSearch = (searchId: number, checked: boolean) => {
    const newSelected = new Set(selectedSearches);
    if (checked) {
      newSelected.add(searchId);
    } else {
      newSelected.delete(searchId);
    }
    setSelectedSearches(newSelected);
  };

  const getCriteriaDisplay = (searchName: string) => {
    // Map search names to their criteria display
    const criteriaMap: Record<string, string> = {
      WebsiteApplied: "General Source: Web Site",
      Last7Days: "Date Range: Last 7 Days",
      // Add more mappings as needed
    };
    return criteriaMap[searchName] || "Custom Search Criteria";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading saved searches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading saved searches</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!searches.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 mb-2">No saved searches found</p>
          <p className="text-gray-500 text-sm">
            Create a search and save it to see it here
          </p>
        </div>
      </div>
    );
  }

  const allSelected =
    searches.length > 0 && selectedSearches.size === searches.length;
  const someSelected =
    selectedSearches.size > 0 && selectedSearches.size < searches.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all searches"
                className={
                  someSelected ? "data-[state=checked]:bg-orange-500" : ""
                }
              />
            </TableHead>
            <TableHead className="font-semibold text-gray-900">Name</TableHead>
            <TableHead className="font-semibold text-gray-900">
              Criteria
            </TableHead>
            <TableHead className="font-semibold text-gray-900">Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searches.map((search) => (
            <TableRow
              key={search.id}
              className="hover:bg-gray-50 border-b border-gray-100"
            >
              <TableCell>
                <Checkbox
                  checked={selectedSearches.has(search.id)}
                  onCheckedChange={(checked) =>
                    handleSelectSearch(search.id, checked as boolean)
                  }
                  aria-label={`Select ${search.searchName}`}
                />
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                {search.searchName}
              </TableCell>
              <TableCell className="text-gray-600">
                {getCriteriaDisplay(search.searchName)}
              </TableCell>
              <TableCell className="text-gray-600">
                {format(new Date(search.searchDate), "M/d/yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => runSearch(search.id)}
                      className="gap-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                      Run Search
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteSearch(search.id)}
                      className="gap-2 text-red-600 focus:text-red-600"
                    >
                      <X className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
