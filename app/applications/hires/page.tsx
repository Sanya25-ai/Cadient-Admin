import type { Metadata } from "next"
import HiresClient from "@/components/applications/hires-client"

export const metadata: Metadata = {
  title: "Hires | Cadient",
  description: "View and manage hired candidates",
}

export default function HiresPage() {
  return (
    <div className="p-6">
      <HiresClient />
    </div>
  )
}
