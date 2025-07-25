import { AddCandidateForm } from "@/components/candidates/add-candidate-form"

export default function AddCandidatePage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b p-6 flex flex-col space-y-3">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Add a Candidate</h1>
        </div>
        <div className="bg-white">
          <p className="text-sm text-gray-600 my-0">
            Submit the candidate's resume to auto-fill the contact info fields. Optionally, you can manually enter the candidate's contact info and attach a resume later.
          </p>
        </div>
      </header>
      <main className="flex-1 p-6">
        <AddCandidateForm />
      </main>
    </div>
  )
}
