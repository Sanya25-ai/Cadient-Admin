import type { Metadata } from "next"
import { cookies } from "next/headers"
import { BookmarksTable } from "@/components/candidates/bookmarks-table"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export const metadata: Metadata = {
  title: "Your Bookmarks | Cadient",
  description: "View and manage your bookmarked candidates",
}

async function fetchBookmarks() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/bookmarks`, {
      headers: {
        cookie: cookieString,
      },
      cache: 'no-store', // Ensure fresh data
    })

    if (!response.ok) {
      console.error('Failed to fetch bookmarks:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    console.log('📊 Bookmarks API Response:', data)
    return data.bookmarks || []
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return []
  }
}

export default async function BookmarksPage() {
  const bookmarks = await fetchBookmarks()

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-orange-500">Your Bookmarks</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            <Filter className="h-4 w-4 mr-2" />
            Filter Results
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6">
        <BookmarksTable bookmarks={bookmarks} />
      </main>
    </div>
  )
}
