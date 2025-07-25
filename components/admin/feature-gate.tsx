'use client'

import { ReactNode, useEffect, useState } from 'react'
import { adminConfigClient } from '@/lib/admin/config-client'

interface FeatureGateProps {
  children: ReactNode
  featureName?: string
  permissionName?: string
  fallback?: ReactNode
  requireAll?: boolean // If both feature and permission are provided, require both to be true
}

export function FeatureGate({ 
  children, 
  featureName, 
  permissionName, 
  fallback = null,
  requireAll = true 
}: FeatureGateProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAccess() {
      try {
        let hasFeatureAccess = true
        let hasPermissionAccess = true

        if (featureName) {
          hasFeatureAccess = await adminConfigClient.isFeatureEnabled(featureName)
        }

        if (permissionName) {
          hasPermissionAccess = await adminConfigClient.hasPermission(permissionName)
        }

        // Determine visibility based on requireAll flag
        const shouldShow = requireAll 
          ? hasFeatureAccess && hasPermissionAccess
          : hasFeatureAccess || hasPermissionAccess

        setIsVisible(shouldShow)
      } catch (error) {
        console.error('Error checking feature/permission access:', error)
        // Default to showing content if there's an error
        setIsVisible(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [featureName, permissionName, requireAll])

  if (isLoading) {
    return null // or a loading spinner
  }

  return isVisible ? <>{children}</> : <>{fallback}</>
}

interface ConditionalRenderProps {
  children: ReactNode
  condition: boolean
  fallback?: ReactNode
}

export function ConditionalRender({ children, condition, fallback = null }: ConditionalRenderProps) {
  return condition ? <>{children}</> : <>{fallback}</>
}

// Hook for checking features/permissions in components
export function useAdminAccess(featureName?: string, permissionName?: string) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAccess() {
      try {
        let hasFeatureAccess = true
        let hasPermissionAccess = true

        if (featureName) {
          hasFeatureAccess = await adminConfigClient.isFeatureEnabled(featureName)
        }

        if (permissionName) {
          hasPermissionAccess = await adminConfigClient.hasPermission(permissionName)
        }

        setHasAccess(hasFeatureAccess && hasPermissionAccess)
      } catch (error) {
        console.error('Error checking admin access:', error)
        setHasAccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [featureName, permissionName])

  return { hasAccess, isLoading }
}
