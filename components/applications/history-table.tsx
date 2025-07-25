import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ApplicationHistory } from "@/lib/types"

interface HistoryTableProps {
  history: ApplicationHistory[]
}

export default function HistoryTable({ history }: HistoryTableProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-orange-600 mb-2">HISTORY</h2>
        <p className="text-sm text-gray-600">View the historical details of this application below.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.modifiedBy}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-2 flex items-center">
          Status History
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h3>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-2 flex items-center">
          Hiring Process History
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h3>
      </div>
    </div>
  )
}
