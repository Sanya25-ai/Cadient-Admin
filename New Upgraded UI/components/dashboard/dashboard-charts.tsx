import type { DashboardCharts } from "@/lib/types"

interface DashboardChartsProps {
  data: DashboardCharts
}

export default function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium mb-4">REQUISITION SUMMARY</h3>

      <div className="flex justify-center">
        <div className="w-48 h-48 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Placeholder for a pie chart */}
            <circle cx="50" cy="50" r="40" fill="#f87171" />
            <circle cx="50" cy="50" r="30" fill="#fbbf24" />
            <circle cx="50" cy="50" r="20" fill="#34d399" />
            <circle cx="50" cy="50" r="10" fill="#60a5fa" />
          </svg>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.requisitionCategories.map((category) => (
          <div key={category.name} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
            <div className="text-sm">
              <span className="font-medium">{category.name}</span>
              <span className="ml-2 text-gray-500">{category.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
