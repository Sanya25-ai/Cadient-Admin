"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface SavedSearch {
  id: number;
  searchName: string;
  searchDate: string; // ISO string from server
}

export interface SavedSearchesState {
  searches: SavedSearch[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  recordsPerPage: number;
  searchQuery: string;
  totalRecords: number;
  totalPages: number;
}

/**
 * Enhanced client-side hook for saved searches with pagination and search functionality
 * Fetches data from ATAO application via the existing API route
 */
export function useSavedSearches() {
  const [data, setData] = useState<SavedSearch[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔍 Fetching saved searches from ATAO...");
      const res = await fetch("/api/saved-searches", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Saved searches API response status:", res.status);

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Authentication required. Please log in again.");
        }
        throw new Error(
          `Failed to fetch saved searches: ${res.status} ${res.statusText}`
        );
      }

      const json = (await res.json()) as SavedSearch[];
      console.log("📋 Fetched saved searches:", json.length, "items");
      console.log("📋 Sample data:", json.slice(0, 2));

      setData(json);
      setError(null);
    } catch (e: any) {
      console.error("❌ Error fetching saved searches:", e);
      setError(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Filter and paginate data
  const filteredSearches = useMemo(() => {
    if (!data) return [];

    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(
      (search) =>
        search.searchName.toLowerCase().includes(query) ||
        search.searchDate.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const paginatedSearches = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredSearches.slice(startIndex, endIndex);
  }, [filteredSearches, currentPage, recordsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredSearches.length / recordsPerPage);
  }, [filteredSearches.length, recordsPerPage]);

  // Reset to first page when search query or records per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, recordsPerPage]);

  const runSearch = useCallback(
    async (id: number) => {
      try {
        console.log("🚀 Running saved search:", id);
        const res = await fetch(`/api/saved-searches/${id}/run`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to run saved search: ${res.status} ${res.statusText}`
          );
        }

        const { redirect } = (await res.json()) as { redirect: string };
        console.log("🔄 Redirecting to:", redirect);

        // Delegate rendering of the result page to the legacy UI for now
        router.push(redirect);
      } catch (e: any) {
        console.error("❌ Error running saved search:", e);
        throw new Error("Unable to run saved search");
      }
    },
    [router]
  );

  const deleteSearch = useCallback(
    async (id: number) => {
      const ok = window.confirm("Delete this saved search?");
      if (!ok) return;

      try {
        console.log("🗑️ Deleting saved search:", id);
        const res = await fetch(`/api/saved-searches/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(
            `Failed to delete saved search: ${res.status} ${res.statusText}`
          );
        }

        console.log("✅ Saved search deleted successfully");
        // Refresh list
        fetchList();
      } catch (e: any) {
        console.error("❌ Error deleting saved search:", e);
        throw new Error("Delete failed");
      }
    },
    [fetchList]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleRecordsPerPageChange = useCallback((records: number) => {
    setRecordsPerPage(records);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    searches: paginatedSearches,
    loading,
    error,
    currentPage,
    totalPages,
    recordsPerPage,
    searchQuery,
    totalRecords: filteredSearches.length,
    allSearches: data ?? [],
    refresh: fetchList,
    runSearch,
    deleteSearch,
    onPageChange: handlePageChange,
    onRecordsPerPageChange: handleRecordsPerPageChange,
    onSearch: handleSearch,
  };
}
