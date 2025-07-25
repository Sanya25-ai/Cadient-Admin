// Dynamic position mapping utility that loads positions from the legacy system
// This replaces the static position mapping with dynamic, permission-based loading

export interface FilterOption {
  id: string
  name: string
  value: string
}

export interface FilterOptions {
  positions: FilterOption[]
  locations: FilterOption[]
  statuses: FilterOption[]
  workPreferences: FilterOption[]
  applicantTypes: FilterOption[]
  exclusiveOptions: FilterOption[]
  veteranStatuses: FilterOption[]
  workflows: FilterOption[]
  dataChannels: FilterOption[]
  bookmarks: FilterOption[]
}

// Cache for filter options to avoid repeated API calls
let filterOptionsCache: FilterOptions | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Load filter options from the legacy system
 * This calls the same endpoint that populates the filter form in legacy UI
 */
export async function loadFilterOptions(): Promise<FilterOptions> {
  // Check cache first
  const now = Date.now()
  if (filterOptionsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log("🔍 Dynamic Position Mapping: Using cached filter options")
    return filterOptionsCache
  }

  try {
    console.log("🔍 Dynamic Position Mapping: Loading filter options from legacy system")
    
    // Build absolute URL because Node fetch (in the Next.js server runtime) requires it
    const internalBase = process.env.INTERNAL_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`

    const apiUrl = `${internalBase.replace(/\/$/, '')}/api/filter-options`

    // Collect cookies from the current request (available in route handlers)
    // We fallback gracefully if called from contexts where cookies() is not available
    let cookieHeader = ''
    try {
      // eslint-disable-next-line import/no-extraneous-dependencies
      const { cookies: cookiesFn } = await import('next/headers')
      const cookieStore = (cookiesFn as any)()
      const jsessionid: string | undefined = cookieStore?.get?.('JSESSIONID')?.value
      const consolidatedCookie: string | undefined = cookieStore?.get?.('ConsolidatedJAFTestClientINT')?.value
      if (jsessionid) cookieHeader += `JSESSIONID=${jsessionid}`
      if (consolidatedCookie) cookieHeader += `${cookieHeader ? '; ' : ''}ConsolidatedJAFTestClientINT=${consolidatedCookie}`
    } catch {
      // Not in a context where next/headers is available (e.g., client-side). That's fine.
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Session expired')
      }
      throw new Error(`Failed to load filter options: ${response.status}`)
    }

    const filterOptions: FilterOptions = await response.json()
    
    // Update cache
    filterOptionsCache = filterOptions
    cacheTimestamp = now
    
    console.log("🔍 Dynamic Position Mapping: Loaded filter options:", {
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
    console.error("🔍 Dynamic Position Mapping: Error loading filter options:", error)
    
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
 * Get position ID by display name (dynamic version)
 * @param displayName - The position name shown to users (e.g., "Analyst")
 * @returns The database ID (e.g., "243294") or null if not found
 */
export async function getPositionIdByName(displayName: string): Promise<string | null> {
  if (!displayName || displayName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const position = filterOptions.positions.find(p => 
    p.name === displayName || p.value === displayName
  )
  
  return position?.id || null
}

/**
 * Get position display name by ID (dynamic version)
 * @param id - The database ID (e.g., "243294")
 * @returns The display name (e.g., "Analyst") or null if not found
 */
export async function getPositionNameById(id: string): Promise<string | null> {
  if (!id) {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const position = filterOptions.positions.find(p => p.id === id)
  return position?.name || null
}

/**
 * Get all available positions for dropdown (dynamic version)
 * @returns Array of position options for UI components
 */
export async function getAvailablePositions(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.positions.map(position => ({
    id: position.id,
    name: position.name,
    value: position.name, // Use name as value for UI consistency
  }))
}

/**
 * Get all available locations for dropdown (dynamic version)
 * @returns Array of location options for UI components
 */
export async function getAvailableLocations(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.locations.map(location => ({
    id: location.id,
    name: location.name,
    value: location.value,
  }))
}

/**
 * Get all available statuses for dropdown (dynamic version)
 * @returns Array of status options for UI components
 */
export async function getAvailableStatuses(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.statuses.map(status => ({
    id: status.id,
    name: status.name,
    value: status.value,
  }))
}

/**
 * Get all available work preferences for dropdown (dynamic version)
 * @returns Array of work preference options for UI components
 */
export async function getAvailableWorkPreferences(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.workPreferences.map(workPref => ({
    id: workPref.id,
    name: workPref.name,
    value: workPref.value,
  }))
}

/**
 * Get all available applicant types for dropdown (dynamic version)
 * @returns Array of applicant type options for UI components
 */
export async function getAvailableApplicantTypes(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.applicantTypes.map(appType => ({
    id: appType.id,
    name: appType.name,
    value: appType.value,
  }))
}

/**
 * Get all available exclusive options for dropdown (dynamic version)
 * @returns Array of exclusive options for UI components
 */
export async function getAvailableExclusiveOptions(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.exclusiveOptions.map(exclusive => ({
    id: exclusive.id,
    name: exclusive.name,
    value: exclusive.value,
  }))
}

/**
 * Get all available veteran statuses for dropdown (dynamic version)
 * @returns Array of veteran status options for UI components
 */
export async function getAvailableVeteranStatuses(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.veteranStatuses.map(vetStatus => ({
    id: vetStatus.id,
    name: vetStatus.name,
    value: vetStatus.value,
  }))
}

/**
 * Get all available workflows for dropdown (dynamic version)
 * @returns Array of workflow options for UI components
 */
export async function getAvailableWorkflows(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.workflows.map(workflow => ({
    id: workflow.id,
    name: workflow.name,
    value: workflow.value,
  }))
}

/**
 * Get all available data channels for dropdown (dynamic version)
 * @returns Array of data channel options for UI components
 */
export async function getAvailableDataChannels(): Promise<Array<{ id: string; name: string; value: string }>> {
  const filterOptions = await loadFilterOptions()
  return filterOptions.dataChannels.map(channel => ({
    id: channel.id,
    name: channel.name,
    value: channel.value,
  }))
}

/**
 * Validate if a position name exists in our mappings (dynamic version)
 * @param displayName - The position name to validate
 * @returns true if the position exists, false otherwise
 */
export async function isValidPosition(displayName: string): Promise<boolean> {
  if (!displayName || displayName === "all") {
    return true // "all" is always valid
  }
  
  const filterOptions = await loadFilterOptions()
  return filterOptions.positions.some(p => 
    p.name === displayName || p.value === displayName
  )
}

/**
 * Map frontend position filter to legacy backend format (dynamic version)
 * This is the key function that replicates legacy UI behavior
 * @param positionName - Position name from frontend (e.g., "Analyst")
 * @returns Object with legacy search parameters or null if no position selected
 */
export async function mapPositionToLegacyFormat(positionName: string): Promise<{
  'search.bidPosting.value': string;
  'search.bidPosting.field': string;
  'search.bidPosting.op': string;
} | null> {
  const positionId = await getPositionIdByName(positionName)
  
  if (!positionId) {
    return null
  }
  
  return {
    'search.bidPosting.value': positionId,
    'search.bidPosting.field': 'posting.jobOpening.id',
    'search.bidPosting.op': 'in'
  }
}

/**
 * Map frontend location filter to legacy backend format (dynamic version)
 * @param locationName - Location name from frontend
 * @returns Object with legacy search parameters or null if no location selected
 */
export async function mapLocationToLegacyFormat(locationName: string): Promise<{
  'search.bidLocation.value': string;
  'search.bidLocation.field': string;
  'search.bidLocation.op': string;
} | null> {
  if (!locationName || locationName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const location = filterOptions.locations.find(l => 
    l.name === locationName || l.value === locationName
  )
  
  if (!location) {
    return null
  }
  
  return {
    'search.bidLocation.value': location.id,
    'search.bidLocation.field': 'location.id',
    'search.bidLocation.op': 'in'
  }
}

/**
 * Map frontend status filter to legacy backend format (dynamic version)
 * @param statusName - Status name from frontend
 * @returns Object with legacy search parameters or null if no status selected
 */
export async function mapStatusToLegacyFormat(statusName: string): Promise<{
  'search.hmcBidStatus.value': string;
  'search.hmcBidStatus.field': string;
  'search.hmcBidStatus.op': string;
} | null> {
  if (!statusName || statusName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const status = filterOptions.statuses.find(s => 
    s.name === statusName || s.value === statusName
  )
  
  if (!status) {
    return null
  }
  
  return {
    'search.hmcBidStatus.value': status.value,
    'search.hmcBidStatus.field': 'hmcBidStatus',
    'search.hmcBidStatus.op': 'in'
  }
}

/**
 * Map frontend work preference filter to legacy backend format (dynamic version)
 * @param workPrefName - Work preference name from frontend
 * @returns Object with legacy search parameters or null if no work preference selected
 */
export async function mapWorkPreferenceToLegacyFormat(workPrefName: string): Promise<{
  'search.workPreference.value': string;
  'search.workPreference.field': string;
  'search.workPreference.op': string;
} | null> {
  if (!workPrefName || workPrefName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const workPref = filterOptions.workPreferences.find(wp => 
    wp.name === workPrefName || wp.value === workPrefName
  )
  
  if (!workPref) {
    return null
  }
  
  return {
    'search.workPreference.value': workPref.value,
    'search.workPreference.field': 'workPreference',
    'search.workPreference.op': 'in'
  }
}

/**
 * Map frontend applicant type filter to legacy backend format (dynamic version)
 * @param applicantTypeName - Applicant type name from frontend
 * @returns Object with legacy search parameters or null if no applicant type selected
 */
export async function mapApplicantTypeToLegacyFormat(applicantTypeName: string): Promise<{
  'search.applicantType.value': string;
  'search.applicantType.field': string;
  'search.applicantType.op': string;
} | null> {
  if (!applicantTypeName || applicantTypeName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const applicantType = filterOptions.applicantTypes.find(at => 
    at.name === applicantTypeName || at.value === applicantTypeName
  )
  
  if (!applicantType) {
    return null
  }
  
  return {
    'search.applicantType.value': applicantType.value,
    'search.applicantType.field': 'isExternal',
    'search.applicantType.op': 'in'
  }
}

/**
 * Map frontend exclusive filter to legacy backend format (dynamic version)
 * @param exclusiveName - Exclusive option name from frontend
 * @returns Object with legacy search parameters or null if no exclusive option selected
 */
export async function mapExclusiveToLegacyFormat(exclusiveName: string): Promise<{
  'exclusive': string;
} | null> {
  if (!exclusiveName || exclusiveName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const exclusive = filterOptions.exclusiveOptions.find(ex => 
    ex.name === exclusiveName || ex.value === exclusiveName
  )
  
  if (!exclusive) {
    return null
  }
  
  return {
    'exclusive': exclusive.value
  }
}

/**
 * Map frontend veteran status filter to legacy backend format (dynamic version)
 * @param veteranStatusName - Veteran status name from frontend
 * @returns Object with legacy search parameters or null if no veteran status selected
 */
export async function mapVeteranStatusToLegacyFormat(veteranStatusName: string): Promise<{
  'veteranStatus': string;
} | null> {
  if (!veteranStatusName || veteranStatusName === "all") {
    return null
  }
  
  const filterOptions = await loadFilterOptions()
  const veteranStatus = filterOptions.veteranStatuses.find(vs => 
    vs.name === veteranStatusName || vs.value === veteranStatusName
  )
  
  if (!veteranStatus) {
    return null
  }
  
  return {
    'veteranStatus': veteranStatus.value
  }
}

/**
 * Clear the filter options cache
 * Useful when user permissions change or session is refreshed
 */
export function clearFilterOptionsCache(): void {
  filterOptionsCache = null
  cacheTimestamp = 0
  console.log("🔍 Dynamic Position Mapping: Filter options cache cleared")
}

/**
 * Get all filter options (for components that need multiple filter types)
 * @returns Complete filter options object
 */
export async function getAllFilterOptions(): Promise<FilterOptions> {
  return await loadFilterOptions()
}
