import { TextApplyTable } from "@/components/candidates/text-apply-table"

export const metadata = {
  title: "Text Apply | Cadient",
  description: "View candidates who applied via text message",
}

export default function TextApply() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white mr-8">Text Apply</h1>
          <p className="text-white/80 text-sm hidden md:block">Candidates who applied via text message</p>
        </div>
      </div>
      <TextApplyTable />
    </div>
  )
}
