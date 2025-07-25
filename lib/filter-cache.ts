// Filter cache service for managing filter options with 10-minute caching
import { FilterOptions, FilterOption } from './dynamic-position-mapping'

// Re-export types for convenience
export type { FilterOptions, FilterOption }

interface CacheEntry {
  data: FilterOptions
  timestamp: number
}

class FilterCacheService {
  private cache: CacheEntry | null = null
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
  private loadingPromise: Promise<FilterOptions> | null = null

  /**
   * Get filter options from cache or load from backend
   * Implements cache-first strategy with 10-minute TTL
   */
  async getFilterOptions(): Promise<FilterOptions> {
    const now = Date.now()

    // Check if cache is valid
    if (this.cache && (now - this.cache.timestamp) < this.CACHE_DURATION) {
      console.log("🔍 Filter Cache: Using cached filter options (age: " + 
        Math.round((now - this.cache.timestamp) / 1000) + "s)")
      return this.cache.data
    }

    // If already loading, return the existing promise
    if (this.loadingPromise) {
      console.log("🔍 Filter Cache: Loading already in progress, waiting...")
      return this.loadingPromise
    }

    // Load fresh data
    console.log("🔍 Filter Cache: Cache miss or expired, loading from backend")
    this.loadingPromise = this.loadFromBackend()

    try {
      const data = await this.loadingPromise
      
      // Update cache
      this.cache = {
        data,
        timestamp: now
      }
      
      console.log("🔍 Filter Cache: Successfully cached filter options")
      return data
    } finally {
      // Clear loading promise
      this.loadingPromise = null
    }
  }

  /**
   * Load filter options from the backend API
   */
  private async loadFromBackend(): Promise<FilterOptions> {
    try {
      const response = await fetch('/api/filter-options', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store' // Always fetch fresh from backend
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in to load filter options.')
        }
        throw new Error(`Failed to load filter options: ${response.status}`)
      }

      const filterOptions: FilterOptions = await response.json()
      
      console.log("🔍 Filter Cache: Loaded filter options from backend:", {
        positions: filterOptions.positions?.length || 0,
        locations: filterOptions.locations?.length || 0,
        statuses: filterOptions.statuses?.length || 0,
        workPreferences: filterOptions.workPreferences?.length || 0,
        applicantTypes: filterOptions.applicantTypes?.length || 0,
        exclusiveOptions: filterOptions.exclusiveOptions?.length || 0,
        veteranStatuses: filterOptions.veteranStatuses?.length || 0,
        workflows: filterOptions.workflows?.length || 0,
        dataChannels: filterOptions.dataChannels?.length || 0
      })

      return filterOptions
    } catch (error) {
      console.error("🔍 Filter Cache: Error loading filter options:", error)
      
      // Return empty options on error
      return {
        positions: [],
        locations: [],
        statuses: [],
        workPreferences: [],
        applicantTypes: [],
        exclusiveOptions: [],
        veteranStatuses: [],
        workflows: [],
        dataChannels: [],
        bookmarks: []
      }
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
      console.log("🔍 Filter Cache: Preloading filter options...")
      this.getFilterOptions().catch(error => {
        console.error("🔍 Filter Cache: Preload failed:", error)
      })
    } else {
      console.log("🔍 Filter Cache: Cache is fresh, skipping preload")
    }
  }

  /**
   * Clear the cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    console.log("🔍 Filter Cache: Clearing cache")
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
export const filterCache = new FilterCacheService()

// Export convenience function for components
export async function getFilterOptions(): Promise<FilterOptions> {
  return filterCache.getFilterOptions()
}

// Export preload function for page initialization
export function preloadFilterOptions(): void {
  filterCache.preloadFilterOptions()
}
