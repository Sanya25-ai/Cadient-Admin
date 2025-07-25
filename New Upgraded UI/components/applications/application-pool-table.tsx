"use client"

import AssessmentTable from "@/components/assessment-table"
import type { ApplicationPoolCandidate } from "@/lib/types"

interface ApplicationPoolTableProps {
  applications: ApplicationPoolCandidate[]
}

export default function ApplicationPoolTable({ applications }: ApplicationPoolTableProps) {
  const theme = {
    headerBg: "bg-orange-50",
    headerText: "text-orange-600",
    avatarBg: "bg-orange-500"
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
      emptyMessage="No applications found in the pool. Try adjusting your filters."
    />
  )
}
