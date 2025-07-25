"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface NavItem {
  name: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    name: "Pre-screened Applications",
    href: "/applications/pre-screened",
    children: [
      { name: "Passed", href: "/applications/pre-screened/passed" },
      { name: "Did Not Pass", href: "/applications/pre-screened/failed" },
    ],
  },
  {
    name: "Application Pool",
    href: "/applications/pool",
    children: [
      { name: "Passed Assessment", href: "/applications/pool/passed" },
      { name: "Failed Assessment", href: "/applications/pool/failed" },
    ],
  },
  {
    name: "Tax Credit Eligible",
    href: "/applications/tax-credit",
  },
  {
    name: "Hires",
    href: "/applications/hires",
  },
  {
    name: "Incompletes",
    href: "/applications/incompletes",
  },
  {
    name: "All Applications",
    href: "/applications/all-applications",
  },
  {
    name: "Availability Matched",
    href: "/applications/availability-matched",
  },
  {
    name: "Your Bookmarks",
    href: "/applications/bookmarks",
  },
  {
    name: "Top Applicants",
    href: "/applications/top-applicants",
  },
]

export default function ApplicationsMenu() {
  const pathname = usePathname()
  const [openPool, setOpenPool] = useState(true)
  const [openPre, setOpenPre] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  // Auto-open when on an applications page
  const shouldBeOpen = pathname.startsWith("/applications/")

  if (!shouldBeOpen) {
    return null
  }

  return (
    <aside
      className={cn(
        "shrink-0 border-r border-border bg-muted/50 overflow-y-auto transition-all duration-300",
        collapsed ? "w-6" : "w-[240px] min-h-screen h-full",
      )}
    >
      <nav className="py-4">
        <div className="flex items-center justify-between px-2 mb-3">
          {!collapsed && (
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Applications</h2>
          )}
          <button
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            →
          </button>
        </div>

        {!collapsed && (
          <ul className="px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const hasChildren = item.children && item.children.length > 0

              if (hasChildren) {
                const isPool = item.name === "Application Pool"
                const isPre = item.name === "Pre-screened Applications"
                const open = isPool ? openPool : isPre ? openPre : true
                const setOpen = isPool ? setOpenPool : isPre ? setOpenPre : () => {}

                return (
                  <li key={item.name}>
                    <button
                      onClick={() => setOpen(!open)}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-medium",
                        isActive ? "bg-orange-500/20 text-orange-600" : "hover:bg-orange-500/10",
                      )}
                    >
                      <span>{item.name}</span>
                      <span>{open ? "▼" : "▶"}</span>
                    </button>
                    {open && (
                      <ul className="mt-1 pl-4 space-y-1">
                        {item.children!.map((child) => {
                          const childActive = pathname === child.href
                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block px-3 py-2 rounded-md text-sm",
                                  childActive ? "bg-orange-500/20 text-orange-600" : "hover:bg-orange-500/10",
                                )}
                              >
                                {child.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium",
                      isActive ? "bg-orange-500/20 text-orange-600" : "hover:bg-orange-500/10",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </nav>
    </aside>
  )
}
