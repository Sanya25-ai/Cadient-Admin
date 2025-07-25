// Requisitions filter cache service for managing filter options with 10-minute caching

interface FilterOption {
  id: string
  name: string
  value: string
}

// Dynamic interface that can handle any filter parameters from backend
export interface RequisitionsFilterOptions {
  [filterName: string]: FilterOption[]
}

// Type for known filter fields (for backwards compatibility)
export interface KnownFilterOptions {
  categories?: FilterOption[]
  locations?: FilterOption[]
  statuses?: FilterOption[]
  recruiters?: FilterOption[]
  showRequisitionsOptions?: FilterOption[]
  requisitionNumber?: FilterOption[]
  jobTitle?: FilterOption[]
  creatorFirstName?: FilterOption[]
  creatorLastName?: FilterOption[]
  position?: FilterOption[]
  // Add any other potential filters here
}

interface CacheEntry {
  data: RequisitionsFilterOptions
  timestamp: number
}

class RequisitionsFilterCacheService {
  private cache: CacheEntry | null = null
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
  private loadingPromise: Promise<RequisitionsFilterOptions> | null = null

  /**
   * Get filter options from cache or load from backend
   * Implements cache-first strategy with 10-minute TTL
   */
  async getFilterOptions(): Promise<RequisitionsFilterOptions> {
    const now = Date.now()

    // Check if cache is valid
    if (this.cache && (now - this.cache.timestamp) < this.CACHE_DURATION) {
      console.log("🔍 Requisitions Filter Cache: Using cached filter options (age: " + 
        Math.round((now - this.cache.timestamp) / 1000) + "s)")
      return this.cache.data
    }

    // If already loading, return the existing promise
    if (this.loadingPromise) {
      console.log("🔍 Requisitions Filter Cache: Loading already in progress, waiting...")
      return this.loadingPromise
    }

    // Load fresh data
    console.log("🔍 Requisitions Filter Cache: Cache miss or expired, loading from backend")
    this.loadingPromise = this.loadFromBackend()

    try {
      const data = await this.loadingPromise
      
      // Update cache
      this.cache = {
        data,
        timestamp: now
      }
      
      console.log("🔍 Requisitions Filter Cache: Successfully cached filter options")
      return data
    } finally {
      // Clear loading promise
      this.loadingPromise = null
    }
  }

  /**
   * Load filter options from the backend API
   */
  private async loadFromBackend(): Promise<RequisitionsFilterOptions> {
    try {
      const response = await fetch('/api/requisitions/filter-options', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store' // Always fetch fresh from backend
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in to load filter options.')
        }
        throw new Error(`Failed to load requisitions filter options: ${response.status}`)
      }

      const filterOptions: RequisitionsFilterOptions = await response.json()
      
      console.log("🔍 Requisitions Filter Cache: Loaded filter options from backend:", {
        totalFilters: Object.keys(filterOptions).length,
        filterNames: Object.keys(filterOptions),
        filterCounts: Object.entries(filterOptions).reduce((acc, [key, value]) => {
          acc[key] = value?.length || 0
          return acc
        }, {} as Record<string, number>)
      })

      // Validate that we got some real data
      const totalOptions = Object.values(filterOptions).reduce((sum, options) => sum + (options?.length || 0), 0)
      const hasRealData = totalOptions > 0

      if (!hasRealData) {
        console.log("🔍 Requisitions Filter Cache: Received no filter options, treating as error")
        throw new Error('Received no filter options from backend')
      }

      return filterOptions
    } catch (error) {
      console.error("🔍 Requisitions Filter Cache: Error loading filter options:", error)
      
      // Don't return defaults here - let the component handle the error
      // This way the component can decide whether to show defaults or retry
      throw error
    }
  }

  /**
   * Preload filter options (for page initialization)
   * This method starts loading but doesn't wait for completion
   */
  preloadFilterOptions(): void {
    // Only preload if cache is empty or expired
    const now = Date.now()
    if (!this.cache || (now - this.cache.timestamp) >= this.CACHE_DURATION) {
      console.log("🔍 Requisitions Filter Cache: Preloading filter options...")
      this.getFilterOptions().catch(error => {
        console.error("🔍 Requisitions Filter Cache: Preload failed:", error)
      })
    } else {
      console.log("🔍 Requisitions Filter Cache: Cache is fresh, skipping preload")
    }
  }

  /**
   * Clear the cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    console.log("🔍 Requisitions Filter Cache: Clearing cache")
    this.cache = null
    this.loadingPromise = null
  }

  /**
   * Check if cache is valid
   */
  isCacheValid(): boolean {
    if (!this.cache) return false
    const now = Date.now()
    return (now - this.cache.timestamp) < this.CACHE_DURATION
  }

  /**
   * Get cache age in seconds
   */
  getCacheAge(): number {
    if (!this.cache) return -1
    const now = Date.now()
    return Math.round((now - this.cache.timestamp) / 1000)
  }
}

// Export singleton instance
export const requisitionsFilterCache = new RequisitionsFilterCacheService()

// Export convenience function for components
export async function getRequisitionsFilterOptions(): Promise<RequisitionsFilterOptions> {
  return requisitionsFilterCache.getFilterOptions()
}

// Export preload function for page initialization
export function preloadRequisitionsFilterOptions(): void {
  requisitionsFilterCache.preloadFilterOptions()
}
