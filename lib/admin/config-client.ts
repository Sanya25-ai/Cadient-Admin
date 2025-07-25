export interface FeatureFlag {
  featureName: string
  isEnabled: boolean
  clientId?: string
}

export interface Permission {
  permissionName: string
  hasAccess: boolean
}

export interface DisplaySetValue {
  name: string
  value: string
  displayText: string
  sortOrder?: number
}

export interface SystemVariable {
  name: string
  value: string
}

export interface AdminConfig {
  features: Record<string, boolean>
  permissions: Record<string, boolean>
  displaySets: Record<string, DisplaySetValue[]>
  systemVariables: Record<string, string>
}

export class AdminConfigClient {
  private configCache: AdminConfig | null = null
  private cacheExpiry: number = 0
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  /**
   * Get admin configuration with caching
   */
  async getAdminConfig(): Promise<AdminConfig> {
    const now = Date.now()
    
    if (this.configCache && now < this.cacheExpiry) {
      return this.configCache
    }

    try {
      const config = await this.fetchAdminConfig()
      this.configCache = config
      this.cacheExpiry = now + this.CACHE_DURATION
      return config
    } catch (error) {
      console.error('Failed to fetch admin config:', error)
      // Return default config if fetch fails
      return this.getDefaultConfig()
    }
  }

  /**
   * Fetch admin configuration from atao backend via proxy
   */
  private async fetchAdminConfig(): Promise<AdminConfig> {
    const [features, permissions, displaySets, systemVariables] = await Promise.all([
      this.fetchFeatureFlags(),
      this.fetchPermissions(),
      this.fetchDisplaySets(),
      this.fetchSystemVariables()
    ])

    return {
      features,
      permissions,
      displaySets,
      systemVariables
    }
  }

  /**
   * Fetch feature flags from atao via proxy
   */
  private async fetchFeatureFlags(): Promise<Record<string, boolean>> {
    try {
      const response = await fetch('/api/admin/proxy?endpoint=/api/admin/features', {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      const features: Record<string, boolean> = {}
      
      if (data.features) {
        data.features.forEach((feature: FeatureFlag) => {
          features[feature.featureName] = feature.isEnabled
        })
      }
      
      return features
    } catch (error) {
      console.error('Failed to fetch feature flags:', error)
      return this.getDefaultFeatures()
    }
  }

  /**
   * Fetch user permissions from atao via proxy
   */
  private async fetchPermissions(): Promise<Record<string, boolean>> {
    try {
      const response = await fetch('/api/admin/proxy?endpoint=/api/admin/permissions', {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      const permissions: Record<string, boolean> = {}
      
      if (data.permissions) {
        data.permissions.forEach((permission: Permission) => {
          permissions[permission.permissionName] = permission.hasAccess
        })
      }
      
      return permissions
    } catch (error) {
      console.error('Failed to fetch permissions:', error)
      return this.getDefaultPermissions()
    }
  }

  /**
   * Fetch display set values from atao via proxy
   */
  private async fetchDisplaySets(): Promise<Record<string, DisplaySetValue[]>> {
    try {
      const response = await fetch('/api/admin/proxy?endpoint=/api/admin/display-sets', {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      return data.displaySets || {}
    } catch (error) {
      console.error('Failed to fetch display sets:', error)
      return this.getDefaultDisplaySets()
    }
  }

  /**
   * Fetch system variables from atao via proxy
   */
  private async fetchSystemVariables(): Promise<Record<string, string>> {
    try {
      const response = await fetch('/api/admin/proxy?endpoint=/api/admin/system-variables', {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      const variables: Record<string, string> = {}
      
      if (data.variables) {
        data.variables.forEach((variable: SystemVariable) => {
          variables[variable.name] = variable.value
        })
      }
      
      return variables
    } catch (error) {
      console.error('Failed to fetch system variables:', error)
      return this.getDefaultSystemVariables()
    }
  }

  /**
   * Check if a feature is enabled
   */
  async isFeatureEnabled(featureName: string): Promise<boolean> {
    const config = await this.getAdminConfig()
    return config.features[featureName] || false
  }

  /**
   * Check if user has permission
   */
  async hasPermission(permissionName: string): Promise<boolean> {
    const config = await this.getAdminConfig()
    return config.permissions[permissionName] || false
  }

  /**
   * Get display set values
   */
  async getDisplaySetValues(setName: string): Promise<DisplaySetValue[]> {
    const config = await this.getAdminConfig()
    return config.displaySets[setName] || []
  }

  /**
   * Get system variable value
   */
  async getSystemVariable(variableName: string): Promise<string | null> {
    const config = await this.getAdminConfig()
    return config.systemVariables[variableName] || null
  }

  /**
   * Clear cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    this.configCache = null
    this.cacheExpiry = 0
  }

  /**
   * Default configuration for fallback
   */
  private getDefaultConfig(): AdminConfig {
    return {
      features: this.getDefaultFeatures(),
      permissions: this.getDefaultPermissions(),
      displaySets: this.getDefaultDisplaySets(),
      systemVariables: this.getDefaultSystemVariables()
    }
  }

  private getDefaultFeatures(): Record<string, boolean> {
    return {
      'EnableDecisionPoint': true,
      'EnableSmartMatch': true,
      'AvailabilityMatching': true,
      'AdvancedBookmark': true,
      'AbbreviateHiringStep': false
    }
  }

  private getDefaultPermissions(): Record<string, boolean> {
    return {
      'FilterByDecisionPoint': true,
      'FilterbySmartMatch': true,
      'ShowDPScoreInApplicantGrids': true,
      'ViewTags': true,
      'gridShowApplicantType': true,
      'gridShowApplicantName': true,
      'gridShowAppliedDate': true,
      'gridShowPosition': true,
      'gridShowLocation': true,
      'gridShowApplicationStatus': true
    }
  }

  private getDefaultDisplaySets(): Record<string, DisplaySetValue[]> {
    return {
      'DecisionPointGroupRankScore': [
        { name: 'DecisionPointGroupRankScore.1', value: 'DecisionPointGroupRankScore.1', displayText: 'Strongly Recommend' },
        { name: 'DecisionPointGroupRankScore.2', value: 'DecisionPointGroupRankScore.2', displayText: 'Recommend' },
        { name: 'DecisionPointGroupRankScore.3', value: 'DecisionPointGroupRankScore.3', displayText: 'Consider' },
        { name: 'DecisionPointGroupRankScore.4', value: 'DecisionPointGroupRankScore.4', displayText: 'Caution' },
        { name: 'DecisionPointGroupRankScore.5', value: 'DecisionPointGroupRankScore.5', displayText: 'Not Recommend' }
      ],
      'SmartGroupRankScore': [
        { name: 'SmartGroupRankScore.1', value: 'SmartGroupRankScore.1', displayText: 'Excellent Match' },
        { name: 'SmartGroupRankScore.2', value: 'SmartGroupRankScore.2', displayText: 'Good Match' },
        { name: 'SmartGroupRankScore.3', value: 'SmartGroupRankScore.3', displayText: 'Fair Match' },
        { name: 'SmartGroupRankScore.4', value: 'SmartGroupRankScore.4', displayText: 'Poor Match' }
      ],
      'SmartMatchGroupRankScore': [
        { name: 'SmartMatchGroupRankScore.1', value: 'SmartMatchGroupRankScore.1', displayText: 'High Compatibility' },
        { name: 'SmartMatchGroupRankScore.2', value: 'SmartMatchGroupRankScore.2', displayText: 'Medium Compatibility' },
        { name: 'SmartMatchGroupRankScore.3', value: 'SmartMatchGroupRankScore.3', displayText: 'Low Compatibility' }
      ]
    }
  }

  private getDefaultSystemVariables(): Record<string, string> {
    return {
      'AppGridDateFilterRangeInDays': '30',
      'DefaultDaysInApplicantSearchGrid': '7',
      'ExportApplicantLimit': '1000'
    }
  }
}

// Singleton instance
export const adminConfigClient = new AdminConfigClient()
