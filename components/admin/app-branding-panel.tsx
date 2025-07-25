"use client";

import Link from "next/link";

interface AppBrandingSection {
  id: string;
  title: string;
  description: string;
  items: AppBrandingItem[];
  bgColor: string;
}

interface AppBrandingItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  hasConfig?: boolean;
}

const appBrandingSections: AppBrandingSection[] = [
  {
    id: "seeker-sites",
    title: "Seeker Sites",
    description: "Configure branding for seeker sites",
    bgColor: "bg-slate-700",
    items: [
      {
        id: "mobile-optimized-seeker-sites-branding",
        title: "Mobile Optimized Seeker Sites Branding",
        description: "Configure branding for mobile optimized seeker sites.",
        href: "/admin-console/app-branding/mobile-optimized-seeker-sites",
      },
      {
        id: "seeker-site-bot-avatar-configuration",
        title: "Seeker Site Bot Avatar Configuration",
        description: "Configure seeker site specific chat bot avatar.",
        href: "/admin-console/app-branding/seeker-site-bot-avatar",
      },
    ],
  },
];

export default function AppBrandingPanel() {
  return (
    <div className="space-y-3">
      {/* Self Service Change Section - Matching the organization page */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-base mb-2 text-gray-900">
              Self Service Change
            </h2>
            <p className="text-sm text-gray-600">
              Create and test your self service changes and then apply them to a
              corresponding application from a single console.
            </p>
          </div>
          <div className="text-right">
            <Link
              href="/admin-console/self-service"
              className="text-gray-900 text-sm font-medium border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              SS Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Application Branding Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Application Branding
        </h2>

        {/* Application Branding Sections */}
        {appBrandingSections.map((section) => (
          <div key={section.id} className="space-y-0">
            {/* Section Header */}
            <div className="bg-[#EE5A37] bg-opacity-[0.08] px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>
            <div className="bg-white px-4 py-4 rounded-b-lg space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  {item.href ? (
                    <Link href={item.href}>
                      <h3 className="text-[#EE5A37] text-sm font-medium hover:underline cursor-pointer">
                        {item.title}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="text-[#EE5A37] text-sm font-medium">
                      {item.title}
                    </h3>
                  )}
                  <p className="text-sm text-gray-700 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
