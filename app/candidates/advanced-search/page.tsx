import { AdvancedSearchForm } from "@/components/candidates/advanced-search-form"

export const metadata = {
  title: "Advanced Search | Cadient",
  description: "Search for candidates based on specific criteria",
}

export default function AdvancedSearchPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <AdvancedSearchForm />
    </div>
  )
}
