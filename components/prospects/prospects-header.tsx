"use client"

import { useState } from "react"
import { Search, Bell, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserMenu from "@/components/user-menu"

export default function ProspectsHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="border-b border-gray-200 bg-[#FFF5F5]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Prospects</h1>
          <div className="ml-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search prospects..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter Results
          </Button>
          <Button variant="default" size="sm" className="bg-[#F7941D] hover:bg-[#F7941D]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Prospect
          </Button>
        </div>
      </div>
    </header>
  )
}
