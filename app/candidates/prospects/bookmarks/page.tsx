import CommonProspectsTable from "@/components/prospects/common-prospects-table"
import type { Prospect } from "@/lib/types"

// Mock data for bookmarked prospects
const mockBookmarkedProspects: Prospect[] = [
  {
    id: "1",
    name: "John Doe",
    source: "LinkedIn",
    potentialPosition: "Software Engineer",
    location: "San Francisco, CA",
    status: "New Lead",
    matchScore: 85,
    lastContact: "2024-03-15",
    recruiter: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Jane Smith",
    source: "Indeed",
    potentialPosition: "Product Manager",
    location: "Seattle, WA",
    status: "Contacted",
    matchScore: 92,
    lastContact: "2024-03-14",
    recruiter: "Mike Chen",
  },
  {
    id: "3",
    name: "Mike Johnson",
    source: "Referral",
    potentialPosition: "DevOps Engineer",
    location: "Austin, TX",
    status: "Interested",
    matchScore: 78,
    lastContact: "2024-03-13",
    recruiter: "Emily Davis",
  },
]

export default function ProspectBookmarksPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <CommonProspectsTable 
        prospects={mockBookmarkedProspects} 
        title="Prospect Bookmarks"
        emptyMessage="No bookmarked prospects found"
      />
    </div>
  )
}
