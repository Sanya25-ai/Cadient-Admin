"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import UserMenu from "@/components/user-menu";
import { cn } from "@/lib/utils";
import { Bell, Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SearchResult {
  id: string;
  name: string;
  position: string;
  location: string;
  status: string;
  smartScore: number;
}

export default function ApplicationsHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchType, setSearchType] = useState("Applications");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const notifications = [
    {
      id: "n1",
      title: "New Application",
      description: "Kyle Boyd applied for Sales Demo Retail position",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "n2",
      title: "Interview Scheduled",
      description:
        "Interview with Maria Jones scheduled for tomorrow at 2:00 PM",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "n3",
      title: "Task Due",
      description: "Review New Applications task is due today at 5:00 PM",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "n4",
      title: "Candidate Assessment",
      description: "John Smith completed the assessment",
      time: "Yesterday",
      read: true,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      // Simulate search results
      const results: SearchResult[] = [
        {
          id: "1",
          name: "Kyle Boyd",
          position: "Sales Demo Retail",
          location: "San Diego",
          status: "Pre-screened",
          smartScore: 85,
        },
        {
          id: "2",
          name: "Maria Jones",
          position: "Marketing Specialist",
          location: "Chicago",
          status: "Interview",
          smartScore: 78,
        },
        {
          id: "3",
          name: "John Smith",
          position: "Software Developer",
          location: "Remote",
          status: "Assessment",
          smartScore: 92,
        },
        {
          id: "4",
          name: "Emily Davis",
          position: "Customer Service Representative",
          location: "Phoenix",
          status: "Pre-screened",
          smartScore: 81,
        },
        {
          id: "5",
          name: "Robert Wilson",
          position: "Financial Analyst",
          location: "New York",
          status: "Offer",
          smartScore: 88,
        },
      ].filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.position.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Close search results and dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Applications</h1>
          <div className="ml-8 relative" ref={searchRef}>
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden w-80">
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                >
                  {searchType}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {showSearchDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setSearchType("Applications");
                        setShowSearchDropdown(false);
                      }}
                    >
                      Applications
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setSearchType("Candidates");
                        setShowSearchDropdown(false);
                      }}
                    >
                      Candidates
                    </button>
                  </div>
                )}
              </div>
              <Input
                type="search"
                placeholder={`${
                  searchType === "Applications" ? "Application" : "Candidate"
                } Quick Find`}
                className="flex-1 border-0 focus:ring-0 focus:border-0 shadow-none"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-gray-50 text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white mr-1"
                onClick={() => {
                  // Trigger search functionality
                }}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto">
                <div className="p-2 border-b">
                  <p className="text-sm text-gray-500">
                    Search results for "{searchQuery}"
                  </p>
                </div>
                <ul className="py-1">
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link href={`/applications/${result.id}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-gray-500">
                              {result.position} • {result.location}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                              {result.smartScore}%
                            </div>
                            <Badge
                              variant="secondary"
                              className={cn(
                                result.status === "Pre-screened"
                                  ? "bg-orange-100 text-orange-800"
                                  : result.status === "Interview"
                                  ? "bg-blue-100 text-blue-800"
                                  : result.status === "Assessment"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              )}
                            >
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0">
                    <div
                      className={cn(
                        "w-full p-3 cursor-pointer",
                        !notification.read && "bg-blue-50"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <Link
                  href="/notifications"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
