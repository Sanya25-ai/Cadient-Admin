import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text Apply | Cadient",
  description: "Manage text apply prospects",
}

export default function TextApplyPage() {
  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-semibold text-[#EE5A37] mb-6">Text Apply</h1>
      <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
        <p>Text Apply prospects will be displayed here.</p>
      </div>
    </div>
  )
}
