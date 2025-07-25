"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Application } from "@/lib/types"

interface ProfileTabsProps {
  application: Application
}

export default function ProfileTabs({ application }: ProfileTabsProps) {
  const tabs = [
    { name: "Application", href: `/applications/${application.id}` },
    { name: "Smart Insights", href: `/applications/${application.id}/smart-insights` },
    { name: "Hiring Process", href: `/applications/${application.id}/hiring-process` },
    { name: "Interview Questions", href: `/applications/${application.id}/interview-questions` },
    { name: "Additional Info", href: `/applications/${application.id}/additional-info` },
    { name: "Company Documents", href: `/applications/${application.id}/company-documents` },
    { name: "Offer", href: `/applications/${application.id}/offer` },
    { name: "Notes", href: `/applications/${application.id}/notes` },
    { name: "History", href: `/applications/${application.id}/history` },
  ]

  // Get the current path to determine active tab
  const [activeTab, setActiveTab] = useState("Application")

  return (
    <div className="border-b border-border bg-card">
      <nav className="flex px-4 space-x-4 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap",
              activeTab === tab.name
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
            )}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
