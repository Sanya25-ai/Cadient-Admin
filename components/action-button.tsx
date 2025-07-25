"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, FileText, X, Circle, Plus, Search, Bell } from "lucide-react"

interface ActionButtonProps {
  label: string
  icon?: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function ActionButton({ label, icon, variant = "outline" }: ActionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className="gap-2">
          {icon}
          {label}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-50">
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Edit Requisition Details clicked")}>
          <FileText className="h-4 w-4 mr-2" />
          Edit Requisition Details
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Cancel Req clicked")}>
          <X className="h-4 w-4 mr-2" />
          Cancel Req
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Put Req On Hold clicked")}>
          <Circle className="h-4 w-4 mr-2" />
          Put Req On Hold
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Copy Req clicked")}>
          <FileText className="h-4 w-4 mr-2" />
          Copy Req
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Create a New Posting clicked")}>
          <Plus className="h-4 w-4 mr-2" />
          Create a New Posting
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Find Candidates clicked")}>
          <Search className="h-4 w-4 mr-2" />
          Find Candidates
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log("Notification Settings clicked")}>
          <Bell className="h-4 w-4 mr-2" />
          Notification Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
