"use client"

import { useEffect } from "react"
import { preloadFilterOptions } from "@/lib/filter-cache"

/**
 * Client-side component that preloads filter options when the page loads
 * This runs on the client side after hydration, allowing the fetch call to work properly
 */
export default function FilterCachePreloader() {
  useEffect(() => {
    // Preload filter options when component mounts (client-side only)
    console.log("🔍 FilterCachePreloader: Starting filter options preload...")
    preloadFilterOptions()
  }, [])

  // This component renders nothing - it's just for the side effect
  return null
}
