"use client"

import AssessmentTable from "@/components/assessment-table"
import type { ApplicationPoolCandidate } from "@/lib/types"

interface Props {
  applications: ApplicationPoolCandidate[]
}

export default function PassedAssessmentTable({ applications }: Props) {
  const theme = {
    headerBg: "bg-green-50",
    headerText: "text-green-600",
    avatarBg: "bg-green-500"
  }

  const dropdownActions = [
    { label: "View Profile" },
    { label: "Edit Application" },
    { label: "Start Hiring Process" },
    { label: "Send Assessment" },
    { label: "Schedule Interview" },
    { label: "Disqualify", className: "text-red-600" }
  ]

  return (
    <AssessmentTable 
      applications={applications}
      theme={theme}
      dropdownActions={dropdownActions}
      emptyMessage="No passed assessment applications found. Try adjusting your filters."
    />
  )
}
