"use client";

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
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface GlobalNavbarProps {
  title?: string;
  section?: string;
  sectionPath?: string;
  pageTitle?: string;
}

export default function GlobalNavbar({
  title = "Cadient",
  section,
  sectionPath,
  pageTitle,
}: GlobalNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchType, setSearchType] = useState("Candidates");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  // Handle clicks outside of search to collapse it and close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchExpanded(false);
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Top navbar with search and user menu */}
      <div
        className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between"
        style={{
          height: "70px",
        }}
      >
        <div className="flex items-center">
          {/* Title */}
          {/* <h1 className="text-sm font-medium text-gray-800">{title}</h1> */}
        </div>

        {/* Search and user menu */}
        <div className="flex items-center gap-3">
          {/* Expandable Search with Dropdown */}
          <div
            ref={searchRef}
            className={cn(
              "relative transition-all duration-300 flex items-center",
              searchExpanded ? "w-96" : "w-7"
            )}
          >
            {searchExpanded ? (
              <div
                className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden w-full"
                style={{ height: "36px" }}
              >
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                    style={{ height: "36px" }}
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
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-xl z-[9999]">
                      <div className="py-1">
                        <button
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors border-b border-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSearchType("Candidates");
                            setShowSearchDropdown(false);
                          }}
                        >
                          Candidates
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSearchType("Applications");
                            setShowSearchDropdown(false);
                          }}
                        >
                          Applications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <Input
                  type="search"
                  placeholder={`${
                    searchType === "Applications" ? "Application" : "Candidate"
                  } Quick Find`}
                  className="flex-1 border-0 focus:ring-0 focus:border-0 shadow-none"
                  style={{
                    height: "28px",
                    fontSize: "14px",
                    fontFamily: "Open Sans",
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) {
                      setSearchExpanded(false);
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-gray-50 text-[#EE5A37] hover:bg-[#EE5A37] hover:text-white mr-0.5"
                  onClick={() => {
                    // Trigger search functionality
                  }}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 p-0"
                onClick={() => setSearchExpanded(true)}
              >
                <Search
                  className="h-3.5 w-3.5 text-gray-500"
                  style={{
                    height: "21px",
                    width: "26px",
                  }}
                />
              </Button>
            )}
          </div>

          {/* Notification dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 relative p-0"
              >
                <Bell
                  className="h-3.5 w-3.5 text-gray-500"
                  style={{
                    height: "25.2px",
                    width: "22px",
                  }}
                />
                {hasNotifications && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="flex items-center justify-between py-1.5">
                <span className="text-xs">Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-[11px] text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="max-h-[280px] overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0">
                    <div
                      className={cn(
                        "w-full p-2 cursor-pointer",
                        !notification.read && "bg-blue-50"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-xs">
                          {notification.title}
                        </h4>
                        <span className="text-[10px] text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {notification.description}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center py-1">
                <Link
                  href="/notifications"
                  className="text-[11px] text-blue-600 hover:text-blue-800"
                >
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User avatar */}
          <UserMenu />
        </div>
      </div>

      {/* Secondary navbar with breadcrumb - without blue background */}
      {/* {section && sectionPath && pageTitle && (
        <div className="flex items-center px-3 py-2 border-b border-gray-100 gap-2">
          <Link href={sectionPath} className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1">
            <span className="text-xs">←</span>
            {section}
          </Link>
          
          <div className="text-orange-600 text-xs font-medium ml-1">
            {pageTitle}
          </div>
        </div>
      )} */}
    </>
  );
}
