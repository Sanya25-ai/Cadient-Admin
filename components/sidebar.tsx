"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Bookmark,
  Briefcase,
  Check,
  ChevronLeft,
  CreditCard,
  FileText,
  LogOut,
  PanelLeft,
  Search,
  Settings,
  User,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(true);
  const [candidatesOpen, setCandidatesOpen] = useState(true);
  const [requisitionsOpen, setRequisitionsOpen] = useState(true);
  const [administrationOpen, setAdministrationOpen] = useState(true);
  const [preScreenedOpen, setPreScreenedOpen] = useState(true);
  const [applicationPoolOpen, setApplicationPoolOpen] = useState(true);
  const [applicationsProspectsOpen, setApplicationsProspectsOpen] =
    useState(true);
  const [candidatesProspectsOpen, setCandidatesProspectsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(() => {
    if (!pathname) return "applications";
    if (
      pathname === "/advanced-search" ||
      pathname === "/saved-searches" ||
      pathname.startsWith("/candidates")
    ) {
      return "users";
    }
    if (pathname.startsWith("/requisitions")) {
      return "requisitions";
    }
    if (pathname.startsWith("/applications/prospects")) {
      return "applications";
    }
    return "applications";
  });

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: PanelLeft,
    },
    {
      name: "Applications",
      href: "/applications",
      icon: FileText,
      children: [
        {
          name: "Pre-screened Applications",
          href: "/applications/pre-screened",
          icon: UserPlus,
          children: [
            { name: "Passed", href: "/applications/pre-screened/passed" },
            { name: "Did Not Pass", href: "/applications/pre-screened/failed" },
          ],
        },
        {
          name: "Application Pool",
          href: "/applications/pool",
          icon: User,
          children: [
            { name: "Passed Assessment", href: "/applications/pool" },
            {
              name: "Failed Assessment",
              href: "/applications/failed-assessment",
            },
          ],
        },
        {
          name: "Tax Credit Eligible",
          href: "/applications/tax-credit",
          icon: CreditCard,
        },
        { name: "Hires", href: "/applications/hires", icon: Briefcase },
        {
          name: "Incompletes",
          href: "/applications/incompletes",
          icon: FileText,
        },
        {
          name: "All Applications",
          href: "/applications/all-applications",
          icon: FileText,
        },
        {
          name: "Prospects",
          href: "/applications/prospects",
          icon: User,
          children: [
            { name: "Text Apply", href: "/applications/prospects/text-apply" },
            {
              name: "Prospect Bookmarks",
              href: "/applications/prospects/prospect-bookmarks",
            },
          ],
        },
        {
          name: "Your Bookmarks",
          href: "/applications/bookmarks",
          icon: Bookmark,
        },
        {
          name: "Top Applicants",
          href: "/applications/top-applicants",
          icon: BarChart2,
        },
      ],
    },
    {
      name: "Candidates",
      href: "/candidates",
      icon: User,
      children: [
        {
          name: "Advanced Search",
          href: "/candidates/advanced-search",
          icon: Search,
        },
        {
          name: "Saved Searches",
          href: "/candidates/saved-searches",
          icon: Bookmark,
        },
        {
          name: "Add a Candidate",
          href: "/candidates/add-candidate",
          icon: UserPlus,
        },
        {
          name: "Imported Candidates",
          href: "/candidates/imported-candidates",
          icon: FileText,
        },
        {
          name: "Prospects",
          href: "/candidates/prospects",
          icon: User,
          children: [
            { name: "Text Apply", href: "/candidates/prospects/text-apply" },
            {
              name: "Prospect Bookmarks",
              href: "/candidates/prospects/prospect-bookmarks",
            },
          ],
        },
        {
          name: "Your Bookmarks",
          href: "/candidates/bookmarks",
          icon: Bookmark,
        },
      ],
    },
    {
      name: "Requisitions",
      href: "/requisitions",
      icon: FileText,
      children: [
        {
          name: "Job Template Library",
          href: "/requisitions/job-template-library",
          icon: FileText,
        },
        {
          name: "Your Active Reqs",
          href: "/requisitions/your-active-reqs",
          icon: FileText,
        },
        {
          name: "Create a Requisition",
          href: "/requisitions/create-requisition",
          icon: UserPlus,
        },
        {
          name: "Requisition Pipeline",
          href: "/requisitions/requisition-pipeline",
          icon: BarChart2,
        },
        {
          name: "Your Postings",
          href: "/requisitions/your-postings",
          icon: FileText,
        },
      ],
    },
    {
      name: "Availability Matched",
      href: "/availability-matched",
      icon: UserCheck,
    },
    {
      name: "Administration",
      href: "/admin-console",
      icon: Settings,
      children: [
        {
          name: "Administrator's Console",
          href: "/admin-console",
          icon: Settings,
        },
        { name: "Messaging", href: "/admin-console/messaging", icon: FileText },
        { name: "Users", href: "/admin-console/users", icon: User },
        {
          name: "User Report",
          href: "/admin-console/user-report",
          icon: BarChart2,
        },
        {
          name: "Positions",
          href: "/admin-console/positions",
          icon: Briefcase,
        },
        { name: "Locations", href: "/admin-console/locations", icon: Search },
        {
          name: "Candidate Import",
          href: "/admin-console/candidate-import",
          icon: UserPlus,
        },
        {
          name: "Location Groups",
          href: "/admin-console/location-groups",
          icon: Search,
        },
        {
          name: "Prescreener",
          href: "/admin-console/prescreener",
          icon: Check,
        },
        {
          name: "NonHireSSN Updater",
          href: "/admin-console/nonhire-ssn-updater",
          icon: X,
        },
        {
          name: "Requisition Approvers",
          href: "/admin-console/requisition-approvers",
          icon: UserCheck,
        },
        {
          name: "Delete Job Seekers",
          href: "/admin-console/delete-job-seekers",
          icon: X,
        },
        {
          name: "Homepage Configuration Tool",
          href: "/admin-console/homepage-configuration",
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
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        className={cn(
          "bg-[#333539] text-white flex flex-col min-h-screen h-full transition-all duration-300 border-r border-gray-800",
          collapsed ? "w-16" : "w-[240px]"
        )}
      >
        <div className="p-3 flex items-center justify-between border-b border-gray-800">
          <div
            className={cn(
              "flex items-center",
              collapsed && "justify-center w-full"
            )}
          >
            {collapsed ? (
              <div className="h-8 w-8 flex items-center justify-center">
                <Image
                  src="/static/images/cadient-small-logo.png"
                  alt="Cadient Logo"
                  width={26}
                  height={26}
                  className="rounded"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 flex items-center justify-center">
                  <Image
                    src="/static/images/cadient-small-logo.png"
                    alt="Cadient Logo"
                    width={26}
                    height={26}
                    className="rounded"
                  />
                </div>
                <span className="font-semibold text-white">CADIENT</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:bg-gray-800 h-6 w-6"
          >
            <ChevronLeft className={cn("h-4 w-4", collapsed && "rotate-180")} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-0.5 px-2">
            {navItems.map((item) => {
              const isActive = pathname
                ? pathname === item.href || pathname.startsWith(item.href + "/")
                : false;

              if (item.children) {
                const getOpenState = () => {
                  if (item.name === "Applications") return applicationsOpen;
                  if (item.name === "Candidates") return candidatesOpen;
                  if (item.name === "Requisitions") return requisitionsOpen;
                  if (item.name === "Administration") return administrationOpen;
                  return true;
                };

                const getSetOpenState = () => {
                  if (item.name === "Applications") return setApplicationsOpen;
                  if (item.name === "Candidates") return setCandidatesOpen;
                  if (item.name === "Requisitions") return setRequisitionsOpen;
                  if (item.name === "Administration")
                    return setAdministrationOpen;
                  return () => {};
                };

                return (
                  <li key={item.name}>
                    <Collapsible
                      open={getOpenState()}
                      onOpenChange={collapsed ? undefined : getSetOpenState()}
                    >
                      <CollapsibleTrigger asChild>
                        <div className="relative group">
                          <div
                            className={cn(
                              "flex items-center px-2 py-1.5 text-xs cursor-pointer transition-colors",
                              collapsed ? "justify-center" : "",
                              isActive
                                ? collapsed
                                  ? "bg-gray-400 text-white rounded-full"
                                  : "bg-gray-400 text-white rounded-sm"
                                : "hover:bg-gray-800 text-gray-300 rounded-sm"
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center",
                                collapsed ? "h-12 w-12" : "h-7 w-7"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  collapsed ? "h-5 w-5" : "h-4 w-4"
                                )}
                              />
                            </div>
                            {!collapsed && (
                              <>
                                <span className="flex-1 ml-1">{item.name}</span>
                                <svg
                                  className={cn(
                                    "h-3 w-3 transition-transform",
                                    getOpenState() && "rotate-180"
                                  )}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </>
                            )}
                          </div>
                          {/* Tooltip */}
                          {collapsed && (
                            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                              {item.name}
                            </div>
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {!collapsed && (
                          <ul className="ml-9 mt-0.5 space-y-0.5">
                            {item.children.map((child) => {
                              const isChildActive = pathname
                                ? pathname === child.href ||
                                  pathname.startsWith(child.href + "/")
                                : false;
                              const hasGrandchildren =
                                child.children && child.children.length > 0;

                              if (hasGrandchildren) {
                                const isPreScreened =
                                  child.name === "Pre-screened Applications";
                                const isPool =
                                  child.name === "Application Pool";
                                const isApplicationsProspects =
                                  child.name === "Prospects" &&
                                  item.name === "Applications";
                                const isCandidatesProspects =
                                  child.name === "Prospects" &&
                                  item.name === "Candidates";

                                const open = isPreScreened
                                  ? preScreenedOpen
                                  : isPool
                                  ? applicationPoolOpen
                                  : isApplicationsProspects
                                  ? applicationsProspectsOpen
                                  : isCandidatesProspects
                                  ? candidatesProspectsOpen
                                  : true;

                                const setOpen = isPreScreened
                                  ? setPreScreenedOpen
                                  : isPool
                                  ? setApplicationPoolOpen
                                  : isApplicationsProspects
                                  ? setApplicationsProspectsOpen
                                  : isCandidatesProspects
                                  ? setCandidatesProspectsOpen
                                  : () => {};

                                return (
                                  <li key={child.name}>
                                    <Collapsible
                                      open={open}
                                      onOpenChange={setOpen}
                                    >
                                      <CollapsibleTrigger asChild>
                                        <div
                                          className={cn(
                                            "flex items-center px-2 py-1 text-xs cursor-pointer transition-colors rounded-sm",
                                            isChildActive
                                              ? "bg-orange-500 text-white"
                                              : "hover:bg-gray-800 text-gray-300"
                                          )}
                                        >
                                          <div className="flex items-center justify-center h-5 w-5">
                                            {child.icon && (
                                              <child.icon className="h-3 w-3" />
                                            )}
                                          </div>
                                          <span className="flex-1 ml-1">
                                            {child.name}
                                          </span>
                                          <svg
                                            className={cn(
                                              "h-3 w-3 transition-transform",
                                              open && "rotate-180"
                                            )}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M19 9l-7 7-7-7"
                                            />
                                          </svg>
                                        </div>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <ul className="ml-6 mt-0.5 space-y-0.5">
                                          {child.children.map((grandchild) => {
                                            const isGrandchildActive = pathname
                                              ? pathname === grandchild.href
                                              : false;
                                            return (
                                              <li key={grandchild.name}>
                                                <Link
                                                  href={grandchild.href}
                                                  className={cn(
                                                    "block px-2 py-1 text-xs transition-colors rounded-sm",
                                                    isGrandchildActive
                                                      ? "bg-orange-500 text-white"
                                                      : "hover:bg-gray-800 text-gray-300"
                                                  )}
                                                >
                                                  {grandchild.name}
                                                </Link>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      </CollapsibleContent>
                                    </Collapsible>
                                  </li>
                                );
                              }

                              return (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "flex items-center px-2 py-1 text-xs transition-colors rounded-sm",
                                      isChildActive
                                        ? "bg-orange-500 text-white"
                                        : "hover:bg-gray-800 text-gray-300"
                                    )}
                                  >
                                    <div className="flex items-center justify-center h-5 w-5">
                                      {child.icon && (
                                        <child.icon className="h-3 w-3" />
                                      )}
                                    </div>
                                    <span className="ml-1">{child.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <div className="relative group">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-2 py-1.5 text-xs transition-colors",
                        collapsed ? "justify-center" : "",
                        isActive
                          ? collapsed
                            ? "bg-gray-400 text-white rounded-full"
                            : "bg-gray-400 text-white rounded-sm"
                          : "hover:bg-gray-800 text-gray-300 rounded-sm"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center",
                          collapsed ? "h-12 w-12" : "h-7 w-7"
                        )}
                      >
                        <item.icon
                          className={cn(collapsed ? "h-5 w-5" : "h-4 w-4")}
                        />
                      </div>
                      {!collapsed && <span className="ml-1">{item.name}</span>}
                    </Link>
                    {/* Tooltip */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-2 border-t border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              "w-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
              collapsed ? "px-0" : "justify-start"
            )}
          >
            <LogOut className={cn(collapsed ? "h-5 w-5" : "h-4 w-4 mr-2")} />
            {!collapsed && "Logout"}
          </Button>
        </div>

        {/* Logout Confirmation Popup */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
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
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                >
                  Yes, Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
