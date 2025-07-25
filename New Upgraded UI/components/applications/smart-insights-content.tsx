import type { Application } from "@/lib/types"

interface SmartInsightsContentProps {
  application: Application
}

export default function SmartInsightsContent({ application }: SmartInsightsContentProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold">
                <span>Scored</span>
                <div className="text-4xl text-center">85%</div>
              </div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="42"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="mt-4 text-lg font-medium">Smart Score</div>
          <div className="text-sm text-gray-500">High Priority</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl font-bold">81%</div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="54"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="mt-4 text-base font-medium">SmartTenure</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl font-bold">85%</div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="42"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="mt-4 text-base font-medium">SmartScreen</div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-medium text-orange-600 mb-2">Overall Assessment</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm">
            This candidate scored in the high priority category with a SmartScore of 82%. The SmartScore is a composite
            evaluation based on tenure prediction, skills matching, profile analysis, and initial screening results.
          </p>
          <div className="text-2xl font-bold text-green-600">85%</div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-medium text-green-600 mb-2">SmartTenure</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm">More Likely to Have Long Tenure</p>
          <div className="text-2xl font-bold text-green-600">81%</div>
        </div>
        <p className="text-sm text-gray-600">
          Based on the SmartTenure results, this person is more likely to stay on the job long-term.
        </p>
      </div>
    </div>
  )
}
