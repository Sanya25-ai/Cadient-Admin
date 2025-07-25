import type { DashboardStats } from "@/lib/types"

interface DashboardStatsProps {
  data: DashboardStats
}

export default function DashboardStats({ data }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 uppercase">TOTAL REQUISITIONS</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-3xl font-bold">{data.totalRequisitions}</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500 font-medium">+{data.requisitionsIncrease}%</span> from last month
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 uppercase">TOTAL CANDIDATES</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-3xl font-bold">{data.totalCandidates}</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500 font-medium">+{data.candidatesIncrease}%</span> from last month
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 uppercase">POSITIONS FILLED</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-3xl font-bold">{data.positionsFilled}</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500 font-medium">+{data.positionsFilledIncrease}%</span> from last month
          </div>
        </div>
      </div>
    </div>
  )
}
