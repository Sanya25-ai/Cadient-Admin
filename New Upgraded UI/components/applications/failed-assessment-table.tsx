"use client"

import AssessmentTable from "@/components/assessment-table"
import type { ApplicationPoolCandidate } from "@/lib/types"

interface FailedAssessmentTableProps {
  applications: ApplicationPoolCandidate[]
}

export default function FailedAssessmentTable({ applications }: FailedAssessmentTableProps) {
  const theme = {
    headerBg: "bg-red-50",
    headerText: "text-red-600",
    avatarBg: "bg-red-500"
  }

  const dropdownActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Reassess Candidate" },
    { label: "Send Feedback" },
    { label: "Move to Pool" },
    { label: "Remove from System", className: "text-red-600" }
  ]

  return (
    <AssessmentTable 
      applications={applications}
      theme={theme}
      dropdownActions={dropdownActions}
      emptyMessage="No failed assessment applications found. Try adjusting your filters."
    />
  )
}
