import { ImportedCandidatesTable } from "@/components/candidates/imported-candidates-table"

export default function ImportedCandidatesPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-orange-500 border-b border-orange-500/20 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-white mr-8">Imported Candidates</h1>
          <p className="text-white/80 text-sm hidden md:block">View candidates imported from external sources</p>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <ImportedCandidatesTable />
      </main>
    </div>
  )
}
