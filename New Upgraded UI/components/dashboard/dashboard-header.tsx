"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserMenu from "@/components/user-menu"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SearchResult {
  id: string
  type: string
  name: string
  position?: string
  department?: string
  dueDate?: string
  status?: string
}

interface DashboardHeaderProps {
  title?: string;
}

export default function DashboardHeader({ title = "Dashboard" }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)
  const searchRef = useRef<HTMLDivElement>(null)

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
      description: "Interview with Maria Jones scheduled for tomorrow at 2:00 PM",
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
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      // Simulate search results
      const results: SearchResult[] = [
        { id: "1", type: "Candidate", name: "Kyle Boyd", position: "Sales Demo Retail", status: "Pre-screened" },
        { id: "2", type: "Requisition", name: "Marketing Specialist", department: "Marketing" },
        { id: "3", type: "Task", name: "Review Applications", dueDate: "Today" },
        {
          id: "4",
          type: "Candidate",
          name: "Emily Davis",
          position: "Customer Service Representative",
          status: "Pre-screened",
        },
        { id: "5", type: "Candidate", name: "Robert Wilson", position: "Financial Analyst", status: "Offer" },
      ].filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.position && item.position.toLowerCase().includes(query.toLowerCase())) ||
          (item.department && item.department.toLowerCase().includes(query.toLowerCase())),
      )

      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="ml-8 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search candidates, tasks, requisitions..."
                className="pl-10 pr-10 w-80"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto">
                <div className="p-2 border-b">
                  <p className="text-sm text-gray-500">Search results for "{searchQuery}"</p>
                </div>
                <ul className="py-1">
                  {searchResults.map((result) => (
                    <li key={result.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link
                        href={
                          result.type === "Candidate"
                            ? `/applications/${result.id}`
                            : result.type === "Task"
                              ? "/dashboard"
                              : "/applications"
                        }
                      >
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-gray-500">
                              {result.type}: {result.position || result.department || result.dueDate}
                            </div>
                          </div>
                          {result.status && (
                            <Badge
                              variant="secondary"
                              className={cn(
                                result.status === "Pre-screened"
                                  ? "bg-orange-100 text-orange-800"
                                  : result.status === "Offer"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800",
                              )}
                            >
                              {result.status}
                            </Badge>
                          )}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {hasNotifications && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-sm text-blue-600 hover:text-blue-800">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0">
                    <div className={cn("w-full p-3 cursor-pointer", !notification.read && "bg-blue-50")}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <Link href="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
