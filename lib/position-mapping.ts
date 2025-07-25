// Position mapping utility to convert display names to database IDs
// This replicates the legacy UI's position filter behavior

export interface PositionMapping {
  id: string;           // Database ID (e.g., "243294")
  name: string;         // Display name (e.g., "Analyst")
  value: string;        // Value used in forms (same as name)
  internalJobTitle?: string; // Optional internal title
}

// Position mappings based on legacy system data
// These IDs come from the JobOpening table in the legacy database
export const POSITION_MAPPINGS: PositionMapping[] = [
  { id: "243294", name: "Analyst", value: "Analyst" },
  { id: "243295", name: "CA7896TestPosition", value: "CA7896TestPosition" },
  { id: "243296", name: "Consolidated JAF Requisition (2)", value: "Consolidated JAF Requisition (2)" },
  { id: "243297", name: "Dispatcher", value: "Dispatcher" },
  { id: "243298", name: "Event Manager (2)", value: "Event Manager (2)" },
  { id: "243299", name: "ImportPos", value: "ImportPos" },
  { id: "243300", name: "ImportPos1", value: "ImportPos1" },
  { id: "243301", name: "Manager Sales", value: "Manager Sales" },
  { id: "243302", name: "Position with Gap tracking", value: "Position with Gap tracking" },
  { id: "243303", name: "Program Manager (4)", value: "Program Manager (4)" },
  { id: "243304", name: "Qualified Position", value: "Qualified Position" },
  { id: "243305", name: "Requisition Can Be Seen (364)", value: "Requisition Can Be Seen (364)" },
  { id: "243306", name: "Senior Technology Manager (375)", value: "Senior Technology Manager (375)" },
  { id: "243307", name: "Truck Driver", value: "Truck Driver" },
  { id: "243308", name: "Zomato Delivery", value: "Zomato Delivery" },
  { id: "243309", name: "(4)", value: "(4)" },
];

/**
 * Get position ID by display name
 * @param displayName - The position name shown to users (e.g., "Analyst")
 * @returns The database ID (e.g., "243294") or null if not found
 */
export function getPositionIdByName(displayName: string): string | null {
  if (!displayName || displayName === "all") {
    return null;
  }
  
  const position = POSITION_MAPPINGS.find(p => 
    p.name === displayName || p.value === displayName
  );
  
  return position?.id || null;
}

/**
 * Get position display name by ID
 * @param id - The database ID (e.g., "243294")
 * @returns The display name (e.g., "Analyst") or null if not found
 */
export function getPositionNameById(id: string): string | null {
  if (!id) {
    return null;
  }
  
  const position = POSITION_MAPPINGS.find(p => p.id === id);
  return position?.name || null;
}

/**
 * Get all available positions for dropdown
 * @returns Array of position options for UI components
 */
export function getAvailablePositions(): Array<{ id: string; name: string; value: string }> {
  return POSITION_MAPPINGS.map(position => ({
    id: position.id,
    name: position.name,
    value: position.name, // Use name as value for UI consistency
  }));
}

/**
 * Validate if a position name exists in our mappings
 * @param displayName - The position name to validate
 * @returns true if the position exists, false otherwise
 */
export function isValidPosition(displayName: string): boolean {
  if (!displayName || displayName === "all") {
    return true; // "all" is always valid
  }
  
  return POSITION_MAPPINGS.some(p => 
    p.name === displayName || p.value === displayName
  );
}

/**
 * Map frontend position filter to legacy backend format
 * This is the key function that replicates legacy UI behavior
 * @param positionName - Position name from frontend (e.g., "Analyst")
 * @returns Object with legacy search parameters or null if no position selected
 */
export function mapPositionToLegacyFormat(positionName: string): {
  'search.bidPosting.value': string;
  'search.bidPosting.field': string;
  'search.bidPosting.op': string;
} | null {
  const positionId = getPositionIdByName(positionName);
  
  if (!positionId) {
    return null;
  }
  
  return {
    'search.bidPosting.value': positionId,
    'search.bidPosting.field': 'posting.jobOpening.id',
    'search.bidPosting.op': 'eq'
  };
}

/**
 * Load positions from legacy system (for future dynamic loading)
 * This function can be enhanced to fetch positions from the legacy API
 * @returns Promise with position mappings
 */
export async function loadPositionsFromLegacy(): Promise<PositionMapping[]> {
  try {
    // TODO: Implement API call to legacy system to get available positions
    // For now, return static mappings
    return POSITION_MAPPINGS;
  } catch (error) {
    console.error('Failed to load positions from legacy system:', error);
    return POSITION_MAPPINGS; // Fallback to static mappings
  }
}
