"use client"

import { useEffect } from "react"
import { preloadRequisitionsFilterOptions } from "@/lib/requisitions-filter-cache"

/**
 * Component that preloads requisitions filter options in the background
 * This should be included in pages that use filters to improve performance
 */
export default function RequisitionsFilterCachePreloader() {
  useEffect(() => {
    // Start preloading filter options as soon as the component mounts
    preloadRequisitionsFilterOptions()
  }, [])

  // This component renders nothing - it just triggers the preload
  return null
}
