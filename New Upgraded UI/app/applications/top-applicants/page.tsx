import type { Metadata } from "next"
import { cookies } from "next/headers"
import TopApplicantsHeader from "@/components/top-applicants/top-applicants-header"
import AdminAwareTopApplicantsTable from '@/components/top-applicants/admin-aware-top-applicants-table'
import ProtectedRoute from "@/components/auth/protected-route"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Top Applicants | Cadient",
  description: "View and manage top applicants based on scores and rankings",
}

async function fetchTopApplicants() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/top-applicants`, {
      headers: {
        cookie: cookieString,
      },
      cache: 'no-store', // Ensure fresh data
    })

    if (!response.ok) {
      console.error('Failed to fetch top applicants:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    console.log('📊 API Response:', data) // Add logging to see what we get
    
    return data.applicants || []
  } catch (error) {
    console.error('Error fetching top applicants:', error)
    return []
  }
}

export default async function TopApplicantsPage() {
  const applicants = await fetchTopApplicants()

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header with total records and admin link */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <TopApplicantsHeader total={applicants.length} />
          </div>
          <div className="ml-4">
            <Link href="/admin-conf">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin Config
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Admin-aware table with privilege-based column visibility */}
        <AdminAwareTopApplicantsTable applicants={applicants} />
      </div>
    </ProtectedRoute>
  )
}
