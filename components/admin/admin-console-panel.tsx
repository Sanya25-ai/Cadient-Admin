"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  ChevronRight,
  FileText,
  Mail,
  Search,
  Settings,
  User,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

interface AdminConsoleSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  isEnabled?: boolean;
}

const adminSections: AdminConsoleSection[] = [
  {
    id: "organization",
    title: "Organization",
    description:
      "Configure Location Manager, Location Groups, Positions, Requisition Approvers, Prescreening, Openings, Sponsored Jobs.",
    icon: Settings,
    href: "/admin-console/organization",
    isEnabled: true,
  },
  {
    id: "hmc-search",
    title: "HMC Search Behavior",
    description:
      "Configure Availability Matching, Advanced Search, Abbreviate Hiring Step, Hiding Expired Applicants, Enhanced Bookmark, Display Veteran Status Icon,Tagging.",
    icon: Search,
    href: "/admin-console/search-behavior",
    isEnabled: true,
  },
  {
    id: "users-roles",
    title: "Users & Roles",
    description:
      "Configure Password Assistance, User Report, Custom Homepages.",
    icon: User,
    href: "/admin-console/users-roles",
    isEnabled: true,
  },
  {
    id: "hmc-hiring",
    title: "HMC Hiring Behavior",
    description:
      "Configure NonHireSSN blocker, Candidate Adding/Importing, Interview Settings, Prospect Feature, Employment Application, Candidate Linking, Offer Scripts and Templates.",
    icon: UserCheck,
    href: "/admin-console/hiring-behavior",
    isEnabled: true,
  },
  {
    id: "communications",
    title: "Communications",
    description:
      "Configure Base Emails and Texts, Custom Email and Text Templates, Base Product Text Messages, Application Notifications, Onscreen messages for Promotions Module, Location Specific Messages, Admin Module, HMC.",
    icon: Mail,
    href: "/admin-console/communications",
    isEnabled: true,
  },
  {
    id: "app-branding",
    title: "Application Branding",
    description:
      "Configure web chatbot icon and branding for mobile optimized seeker sites.",
    icon: Briefcase,
    href: "/admin-console/app-branding",
    isEnabled: true,
  },
  {
    id: "document-management",
    title: "Document Management",
    description:
      "View and Edit Documents, Configure Company Documents, New Hire Packet, Onboarding Documents, and Document Rules.",
    icon: FileText,
    href: "/admin-console/document-management",
    isEnabled: true,
  },
  {
    id: "self-service-change",
    title: "Self Service Change",
    description:
      "Create and test your self service changes and then apply them to a corresponding application from a single console. View and Edit Documents, Configure Company Documents, New Hire Packet, Onboarding Documents, and Document Rules.",
    icon: Settings,
    href: "/admin-console/self-service",
    isEnabled: true,
  },
];

export default function AdminConsolePanel() {
  return (
    <div className="space-y-3">
      {/* Page Header - Following Design System Pattern */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#EE5A37]">
            Administrator Console
          </h1>
          <p className="text-sm text-muted-foreground">
            Central hub for accessing HMC admin tools and configuring
            self-service features
          </p>
        </div>
      </div>

      {/* Description Card */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Administrator's Console provides a single location for accessing
            HMC Admin tools and for configuring self-service features. The
            specific links available depend on your assigned roles.
          </p>
        </CardContent>
      </Card>

      {/* Admin Sections Grid - Following Design System Grid Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const IconComponent = section.icon;

          return (
            <Link key={section.id} href={section.href}>
              <Card className="group hover:shadow-md transition-all duration-200 border cursor-pointer h-48 flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#EE5A37]/10">
                      <IconComponent className="h-5 w-5 text-[#EE5A37]" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base font-medium">
                        {section.title}
                      </CardTitle>
                      {section.badge && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[#EE5A37] transition-colors duration-200" />
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-4 overflow-hidden">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
