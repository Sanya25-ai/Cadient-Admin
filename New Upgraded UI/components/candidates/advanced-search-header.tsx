"use client"

import { Search } from "lucide-react"

export function AdvancedSearchHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white mr-8">Advanced Search</h1>
        <p className="text-white/80 text-sm hidden md:block">Find candidates that match specific criteria</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3A3B3F] text-white hover:bg-[#3A3B3F]/80 transition-colors"
          title="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
