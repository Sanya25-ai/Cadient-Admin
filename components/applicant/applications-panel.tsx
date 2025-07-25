import React from "react"

const navItems = [
  { name: "Pre-screened Application" },
  { name: "Application Pool" },
  { name: "Tax Credit Eligible" },
  { name: "Hires" },
  { name: "All Applications", active: true },
  { name: "Prospects" },
  { name: "Availability Matched" },
  { name: "Top Applicants" },
]

export default function ApplicationsPanel() {
  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col py-6 px-4">
      <h2 className="text-lg font-semibold mb-6 text-gray-700">Applications</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-orange-50 text-orange-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
