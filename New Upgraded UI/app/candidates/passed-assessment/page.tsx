import { PassedAssessmentPage } from "@/components/candidates/passed-assessment-page"

export const metadata = {
  title: "Passed Assessment | Cadient",
  description: "View candidates who passed their assessments",
}

export default function PassedAssessment() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white mr-8">Passed Assessment</h1>
          <p className="text-white/80 text-sm hidden md:block">View candidates who passed their assessments</p>
        </div>
      </div>
      <PassedAssessmentPage />
    </div>
  )
}
