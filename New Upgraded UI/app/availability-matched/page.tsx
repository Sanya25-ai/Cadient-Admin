import type { Metadata } from "next"
import AvailabilityMatchedHeader from "@/components/availability/availability-matched-header"
import AvailabilityMatchedTable from "@/components/availability/availability-matched-table"
import { getAvailabilityMatched } from "@/lib/data"

export const metadata: Metadata = {
  title: "Availability Matched | Cadient",
  description: "View and manage availability matched candidates",
}

export default async function AvailabilityMatchedPage() {
  const candidates = await getAvailabilityMatched()

  return (
    <div className="flex flex-col h-full">
      <AvailabilityMatchedHeader />
      <div className="flex-1 p-6">
        <AvailabilityMatchedTable candidates={candidates} />
      </div>
    </div>
  )
}
