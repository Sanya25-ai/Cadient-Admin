"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { LuLayoutGrid, LuUsersRound } from "react-icons/lu";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  children?: SubNavItem[];
}

interface SubNavItem {
  name: string;
  href: string;
  children?: SubNavItem[];
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: LuLayoutGrid,
    children: [
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
      { name: "Tax Credit Eligible", href: "/applications/tax-credit" },
      { name: "Hires", href: "/applications/hires" },
      { name: "Incompletes", href: "/applications/incompletes" },
      { name: "All Applications", href: "/applications/all-applications" },
      {
        name: "Prospects",
        href: "/applications/prospects",
        children: [
          { name: "Text Apply", href: "/applications/prospects/text-apply" },
          {
            name: "Prospect Bookmarks",
            href: "/applications/prospects/prospect-bookmarks",
          },
        ],
      },
      { name: "Your Bookmarks", href: "/applications/bookmarks" },
      { name: "Top Applicants", href: "/applications/top-applicants" },
    ],
  },
  {
    name: "Candidates",
    href: "/candidates",
    icon: LuUsersRound,
    children: [
      { name: "Advanced Search", href: "/candidates/advanced-search" },
      { name: "Saved Searches", href: "/candidates/saved-searches" },
      { name: "Add a Candidate", href: "/candidates/add-candidate" },
      { name: "Imported Candidates", href: "/candidates/imported-candidates" },
      {
        name: "Prospects",
        href: "/candidates/prospects",
        children: [
          { name: "Text Apply", href: "/candidates/prospects/text-apply" },
          {
            name: "Prospect Bookmarks",
            href: "/candidates/prospects/prospect-bookmarks",
          },
        ],
      },
      { name: "Your Bookmarks", href: "/candidates/bookmarks" },
    ],
  },
  {
    name: "Requisitions",
    href: "/requisitions",
    icon: FaRegFileAlt,
    children: [
      {
        name: "Job Template Library",
        href: "/requisitions/job-template-library",
      },
      { name: "Your Active Reqs", href: "/requisitions/your-active-reqs" },
      {
        name: "Create a Requisition",
        href: "/requisitions/create-requisition",
      },
      {
        name: "Requisition Pipeline",
        href: "/requisitions/requisition-pipeline",
      },
      { name: "Your Postings", href: "/requisitions/your-postings" },
    ],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: ChevronRight,
    children: [
      { name: "Application Reports", href: "/reports/applications" },
      { name: "Candidate Reports", href: "/reports/candidates" },
      { name: "Hiring Reports", href: "/reports/hiring" },
      { name: "Performance Reports", href: "/reports/performance" },
      { name: "Custom Reports", href: "/reports/custom" },
    ],
  },
  {
    name: "Administration",
    href: "/admin-console",
    icon: Settings,
    children: [
      { name: "Administrator's Console", href: "/admin-console" },
      { name: "Messaging", href: "/admin-console/messaging" },
      { name: "Users", href: "/admin-console/users" },
      { name: "User Report", href: "/admin-console/user-report" },
      { name: "Positions", href: "/admin-console/positions" },
      { name: "Locations", href: "/admin-console/locations" },
      { name: "Candidate Import", href: "/admin-console/candidate-import" },
      { name: "Location Groups", href: "/admin-console/location-groups" },
      { name: "Prescreener", href: "/admin-console/prescreener" },
      {
        name: "NonHireSSN Updater",
        href: "/admin-console/nonhire-ssn-updater",
      },
      {
        name: "Requisition Approvers",
        href: "/admin-console/requisition-approvers",
      },
      { name: "Delete Job Seekers", href: "/admin-console/delete-job-seekers" },
      {
        name: "Homepage Configuration Tool",
        href: "/admin-console/homepage-configuration",
      },
      {
        name: "Offer Template Library",
        href: "/admin-console/offer-template-library",
      },
      {
        name: "Workflow Script Library",
        href: "/admin-console/workflow-script-library",
      },
    ],
  },
  {
    name: "Tools",
    href: "/tools",
    icon: Settings,
    children: [
      { name: "Availability Matching", href: "/tools/availability-matching" },
      { name: "Sponsored Jobs", href: "/tools/sponsored-jobs" },
      { name: "Tag Management", href: "/tools/tag-management" },
      { name: "Openings", href: "/tools/openings" },
      { name: "Data Import", href: "/tools/data-import" },
    ],
  },
  {
    name: "Quick Links",
    href: "/quick-links",
    icon: HiOutlineExternalLink,
  },
];

interface UnifiedSidePanelProps {
  forceCollapsed?: boolean;
}

export default function UnifiedSidePanel({
  forceCollapsed = false,
}: UnifiedSidePanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (pathname?.startsWith("/applications")) return "Applications";
    if (pathname?.startsWith("/candidates")) return "Candidates";
    if (pathname?.startsWith("/requisitions")) return "Requisitions";
    if (pathname?.startsWith("/admin-console")) return "Administration";
    if (pathname?.startsWith("/teams")) return "Teams";
    if (pathname?.startsWith("/calendar")) return "Calendar";
    if (pathname?.startsWith("/messages")) return "Messages";
    if (pathname?.startsWith("/notifications")) return "Notifications";
    if (pathname?.startsWith("/availability-matched"))
      return "Availability Matched";
    return "Applications";
  });
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Pre-screened Applications",
    "Application Pool",
  ]);
  const [contentPanelVisible, setContentPanelVisible] = useState(true);
  const activeNavItem = navItems.find((item) => item.name === activeSection);
  const shouldShowContentPanel =
    activeNavItem?.children &&
    activeNavItem.children.length > 0 &&
    contentPanelVisible &&
    !forceCollapsed;

  // Update CSS custom property for sidebar width
  useEffect(() => {
    const sidebarWidth = shouldShowContentPanel ? "344px" : "64px"; // 16 * 4 = 64px, 64 + 280 = 344px
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
  }, [shouldShowContentPanel]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleIconClick = (sectionName: string) => {
    setActiveSection(sectionName);

    // Navigate to specific pages for sections without children
    const clickedItem = navItems.find((item) => item.name === sectionName);
    if (
      clickedItem &&
      (sectionName === "Dashboard" || sectionName === "Administration")
    ) {
      router.push(clickedItem.href);
    }

    // Show content panel when switching to a section with children
    if (clickedItem?.children && clickedItem.children.length > 0) {
      setContentPanelVisible(true);
    }
  };

  const toggleContentPanel = () => {
    setContentPanelVisible(!contentPanelVisible);
  };

  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen transition-all duration-300">
      {/* Dark Sidebar with Icons */}
      <div className="bg-[#333539] text-white flex flex-col w-16 h-full border-r border-gray-800">
        {/* Logo */}
        <div
          style={{
            paddingTop: "35px",
            flexDirection: "column",
          }}
          className="p-3 flex items-center justify-center border-b border-gray-800 pb-5"
        >
          <div className="h-8 w-8 flex items-center justify-center">
            <Image
              src="/static/images/cadient-small-logo.png"
              alt="Cadient Logo"
              width={26}
              height={26}
              className="rounded"
            />
          </div>
          <div
            className="h-px w-[55px] relative top-5"
            style={{
              background:
                "linear-gradient(to right, #797979, #CFCFCF, #817B7B)",
            }}
          />
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 py-2">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.name;

              return (
                <li key={item.name}>
                  <div className="relative group">
                    <button
                      onClick={() => handleIconClick(item.name)}
                      className={cn(
                        "w-full h-12 flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-gray-600 text-white rounded-full"
                          : "hover:bg-gray-700 text-gray-300"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Icons */}
        <div className="p-2 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full h-12 justify-center text-gray-300 hover:bg-gray-800 p-0"
            title="Logout"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content Panel */}
      {shouldShowContentPanel && (
        <div className="bg-white w-[280px] h-full border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {/* <ChevronRight className="h-4 w-4 text-gray-400" /> */}
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide ml-2">
                  {activeSection}
                </h2>
              </div>
              <button
                onClick={toggleContentPanel}
                className="p-1 hover:bg-gray-100 bg-gray-200 border border-gray-200 rounded-sm transition-colors"
                title="Hide Menu"
                style={{
                  borderRadius: "50%",
                }}
              >
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Menu Items */}
            <nav>
              <ul className="space-y-1">
                {activeNavItem?.children?.map((item) => {
                  const isActive = pathname === item.href;
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedItems.includes(item.name);

                  return (
                    <li key={item.name}>
                      {hasChildren ? (
                        <div>
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              className={cn(
                                "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                  ? "bg-orange-100 text-orange-600"
                                  : "hover:bg-gray-50 text-gray-700"
                              )}
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => toggleExpanded(item.name)}
                              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  isExpanded && "rotate-90"
                                )}
                              />
                            </button>
                          </div>
                          {isExpanded && (
                            <ul className="mt-1 ml-4 space-y-1">
                              {item.children?.map((child) => {
                                const childActive = pathname === child.href;
                                return (
                                  <li key={child.name}>
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        "block px-3 py-2 rounded-md text-sm transition-colors",
                                        childActive
                                          ? "bg-orange-200 text-orange-700 font-medium"
                                          : "hover:bg-gray-50 text-gray-600"
                                      )}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                              ? "bg-orange-100 text-orange-600"
                              : "hover:bg-gray-50 text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Floating Show Menu Button - positioned outside sidebar boundary */}
      {!contentPanelVisible &&
        activeNavItem?.children &&
        activeNavItem.children.length > 0 && (
          <button
            onClick={toggleContentPanel}
            className="absolute top-4 left-20 bg-white border border-gray-300 shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
            title="Show Menu"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2"
              >
                Yes, Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
