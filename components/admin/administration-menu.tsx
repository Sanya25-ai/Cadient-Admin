"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { 
  Settings, 
  User, 
  FileText, 
  ChevronLeft,
  Search,
  Plus,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  href: string
  icon?: any
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    name: "Administrator's Console",
    href: "/admin-console",
    icon: Settings,
  },
  {
    name: "Messaging",
    href: "/admin-console/messaging",
    icon: FileText,
  },
  {
    name: "Users",
    href: "/admin-console/users",
    icon: User,
  },
  {
    name: "User Report",
    href: "/admin-console/user-report",
    icon: FileText,
  },
  {
    name: "Positions",
    href: "/admin-console/positions",
    icon: FileText,
  },
  {
    name: "Locations",
    href: "/admin-console/locations",
    icon: Search,
  },
  {
    name: "Candidate Import",
    href: "/admin-console/candidate-import",
    icon: Plus,
  },
  {
    name: "Location Groups",
    href: "/admin-console/location-groups",
    icon: Search,
  },
  {
    name: "Prescreener",
    href: "/admin-console/prescreener",
    icon: Settings,
  },
  {
    name: "NonHireSSN Updater",
    href: "/admin-console/nonhire-ssn-updater",
    icon: User,
  },
  {
    name: "Requisition Approvers",
    href: "/admin-console/requisition-approvers",
    icon: User,
  },
  {
    name: "Delete Job Seekers",
    href: "/admin-console/delete-job-seekers",
    icon: X,
  },
  {
    name: "Homepage Configuration Tool",
    href: "/admin-console/homepage-configuration-tool",
    icon: Settings,
  },
  {
    name: "Offer Template Library",
    href: "/admin-console/offer-template-library",
    icon: FileText,
  },
  {
    name: "Workflow Script Library",
    href: "/admin-console/workflow-script-library",
    icon: FileText,
  },
]

export default function AdministrationMenu() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Auto-open when on an admin-console page
  const shouldBeOpen = pathname?.startsWith("/admin-console") ?? false

  if (!shouldBeOpen) {
    return null
  }

  return (
    <aside className={cn("shrink-0 border-r border-border bg-muted/50 overflow-y-auto transition-all duration-300", collapsed ? "w-6" : "w-[240px] min-h-screen h-full")}>
      <nav className="py-4">
        <div className="flex items-center justify-between px-2 mb-3">
          {!collapsed && (
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Administration</h2>
          )}
          <button
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {!collapsed && (
        <ul className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-orange-500/20 text-orange-600 border-l-4 border-orange-500" 
                      : "text-gray-700 hover:bg-orange-500/10 hover:text-gray-900"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 mr-3 flex-shrink-0" />}
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        )}
      </nav>
      
      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
          <p className="text-xs text-gray-500 text-center">
            System Administration
          </p>
        </div>
      )}
    </aside>
  )
}
