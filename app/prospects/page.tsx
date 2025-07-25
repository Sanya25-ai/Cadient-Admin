import type { Metadata } from "next"
import { cookies } from "next/headers"
import { fetchLegacyModel } from "@/lib/fetchLegacyModel"
import ProspectsPage from "@/components/prospects-page"
import ProspectsHeader from "@/components/prospects/prospects-header"

export const metadata: Metadata = {
  title: "Prospects | Cadient",
  description: "View and manage prospects",
}

export default async function Prospects() {
  try {
    return (
      <div className="flex flex-col h-full">
        <ProspectsHeader />
        <div className="flex-1 p-6">
          <ProspectsPage />
        </div>
      </div>
    )
  } catch (error) {
    // Handle and log the error but still render the component
    console.error("Error in prospects page:", error);
    return (
      <div className="flex flex-col h-full">
        <ProspectsHeader />
        <div className="flex-1 p-6">
          <ProspectsPage fallbackMode={true} />
        </div>
      </div>
    )
  }
}
