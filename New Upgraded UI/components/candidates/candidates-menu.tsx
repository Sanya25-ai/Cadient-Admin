"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Search, 
  Bookmark, 
  User, 
  Phone, 
  Check, 
  X, 
  BarChart2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  FileText,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const candidatesMenuItems = [
  { name: "Advanced Search", href: "/candidates/advanced-search", icon: Search },
  { name: "Saved Searches", href: "/candidates/saved-searches", icon: Bookmark },
  { name: "Add a Candidate", href: "/candidates/add-candidate", icon: UserPlus },
  { name: "Imported Candidates", href: "/candidates/imported-candidates", icon: FileText },
  { 
    name: "Prospects", 
    href: "/candidates/prospects", 
    icon: User,
    children: [
      { name: "Text Apply", href: "/candidates/prospects/text-apply", icon: Phone },
      { name: "Prospect Bookmarks", href: "/candidates/prospects/prospect-bookmarks", icon: Bookmark },
    ]
  },
  { name: "Your Bookmarks", href: "/candidates/bookmarks", icon: Bookmark },
]

export default function CandidatesMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [prospectsOpen, setProspectsOpen] = useState(true)

  // Auto-open when on a candidates page
  const shouldBeOpen = pathname.startsWith("/candidates/")

  if (!shouldBeOpen && !isOpen) {
    return null
  }

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-orange-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Candidates</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {candidatesMenuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            if (item.children) {
              const hasActiveChild = item.children.some(child => pathname === child.href)
              const isParentActive = isActive || hasActiveChild

              return (
                <li key={item.name}>
                  <Collapsible open={prospectsOpen} onOpenChange={setProspectsOpen}>
                    <CollapsibleTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isParentActive
                            ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center">
                          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", prospectsOpen && "rotate-180")} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href
                        const ChildIcon = child.icon

                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              isChildActive
                                ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                          >
                            <ChildIcon className="h-4 w-4 mr-3 flex-shrink-0" />
                            <span>{child.name}</span>
                          </Link>
                        )
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              )
            }

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Candidate Management
        </p>
      </div>
    </div>
  )
}
