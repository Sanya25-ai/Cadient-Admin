"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import UserMenu from "@/components/user-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ApplicationsNavbar({ title = "Applications", pageTitle }: { title?: string; pageTitle?: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  
  // Handle clicks outside of search to collapse it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false);
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
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between mb-2">
        <div className="flex items-center">
          {/* Title */}
          <h1 className="text-sm font-medium text-gray-800">{title}</h1>
        </div>
        
        {/* Search and user menu */}
        <div className="flex items-center gap-3">
          {/* Expandable Search */}
          <div 
            ref={searchRef} 
            className={cn(
              "relative transition-all duration-300 flex items-center",
              searchExpanded ? "w-56" : "w-8"
            )}
          >
            {searchExpanded ? (
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-7 h-7 text-xs w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  onBlur={() => {
                    if (!searchQuery) {
                      setSearchExpanded(false);
                    }
                  }}
                />
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setSearchExpanded(true)}
              >
                <Search className="h-4 w-4 text-gray-500" />
              </Button>
            )}
          </div>
          
          {/* Notification bell - using svg instead of lucide-react Bell icon */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </Button>
          
          {/* User avatar */}
          <UserMenu />
        </div>
      </div>
      
      {/* Secondary navbar with breadcrumb - without blue background */}
      {pathname !== "/applications" && pageTitle && (
        <div className="flex items-center px-4 py-3 border-b border-gray-100 gap-2">
          <Link href="/applications" className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
            <span className="text-xs">←</span>
            Applications
          </Link>
          
          <div className="text-green-600 text-sm font-medium ml-2">
            {pageTitle}
          </div>
        </div>
      )}
    </>
  )
}
