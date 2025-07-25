"use client"

import { Search, Bell, ChevronDown, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

// Mock data for saved searches
const savedSearches = [
  {
    id: 1,
    name: "WebsiteApplied",
    criteria: "General Source: Web Site",
    date: "5/20/2025",
  },
  {
    id: 2,
    name: "Last7Days",
    criteria: "Date Range: Last 7 Days",
    date: "5/20/2025",
  },
]

export function SavedSearchesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Handle delete search
  const handleDeleteSearch = (id: number) => {
    alert(`Delete search with ID: ${id}`)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Candidates</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-64 border-gray-300" />
          </div>

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-[#E91E63] text-white">
              <AvatarFallback className="bg-[#E91E63] text-white">AN</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="flex flex-col h-full">
          <div className="p-6 pb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Your Saved Searches</h1>
          </div>

          <div className="px-6 pb-6">
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Criteria</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-center w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedSearches.map((search) => (
                      <tr key={search.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">{search.name}</td>
                        <td className="px-4 py-3">{search.criteria}</td>
                        <td className="px-4 py-3 bg-gray-100">{search.date}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteSearch(search.id)}
                            className="text-gray-500 hover:text-red-500"
                            aria-label="Delete search"
                          >
                            <Trash2 className="h-5 w-5 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
