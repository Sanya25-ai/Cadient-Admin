import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Applications | Cadient",
  description: "View and manage applications by category",
}

export default function ApplicationsPage() {
  const applicationCategories = [
    {
      title: "All Applications",
      description: "View and manage all applications in the system",
      href: "/applications/all-applications",
      icon: "📋",
    },
    {
      title: "Pre-Screened",
      description: "Applications that have passed initial screening",
      href: "/applications/pre-screened",
      icon: "✅",
    },
    {
      title: "Failed Assessment",
      description: "Applications that did not pass assessment",
      href: "/applications/failed-assessment",
      icon: "❌",
    },
    {
      title: "Application Pool",
      description: "General application pool",
      href: "/applications/pool",
      icon: "🏊",
    },
    {
      title: "Availability Matched",
      description: "Candidates matched based on availability",
      href: "/applications/availability-matched",
      icon: "📅",
    },
    {
      title: "Hires",
      description: "Successfully hired applications",
      href: "/applications/hires",
      icon: "🎉",
    },
    {
      title: "Tax Credit",
      description: "Applications with tax credit considerations",
      href: "/applications/tax-credit",
      icon: "💰",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Applications</h1>
        <p className="text-gray-600">Choose a category to view and manage applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applicationCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
