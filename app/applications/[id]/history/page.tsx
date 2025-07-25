import type { Metadata } from "next"
import { notFound } from "next/navigation"
import HistoryHeader from "@/components/applications/history-header"
import HistoryTable from "@/components/applications/history-table"
import { getApplication, getApplicationHistory } from "@/lib/data"

export const metadata: Metadata = {
  title: "History | Cadient",
  description: "View candidate application history",
}

export default async function HistoryPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)

  if (!application) {
    notFound()
  }

  const history = await getApplicationHistory(params.id)

  return (
    <div className="flex flex-col h-full">
      <HistoryHeader application={application} />
      <div className="p-6">
        <HistoryTable history={history} />
      </div>
    </div>
  )
}
