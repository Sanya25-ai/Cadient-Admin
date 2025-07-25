'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { adminConfigClient, AdminConfig } from '@/lib/admin/config-client'
import { useAdminAccess } from '@/components/admin/feature-gate'
import { Settings, Check, X, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminConfigPanel() {
  const [config, setConfig] = useState<AdminConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setSaving] = useState(false)
  const [changes, setChanges] = useState<{
    features: Record<string, boolean>
    permissions: Record<string, boolean>
    systemVariables: Record<string, string>
  }>({
    features: {},
    permissions: {},
    systemVariables: {}
  })

  // Allow admin access by default since there's no 'admin' permission in ATAO
  const canManageAdmin = true

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    setIsLoading(true)
    try {
      const adminConfig = await adminConfigClient.getAdminConfig()
      setConfig(adminConfig)
    } catch (error) {
      console.error('Failed to load admin config:', error)
      toast.error('Failed to load configuration')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshConfig = async () => {
    adminConfigClient.clearCache()
    await loadConfig()
    setChanges({ features: {}, permissions: {}, systemVariables: {} })
    toast.success('Configuration refreshed')
  }

  const handleFeatureChange = (featureName: string, enabled: boolean) => {
    setChanges(prev => ({
      ...prev,
      features: { ...prev.features, [featureName]: enabled }
    }))
  }

  const handlePermissionChange = (permissionName: string, hasAccess: boolean) => {
    setChanges(prev => ({
      ...prev,
      permissions: { ...prev.permissions, [permissionName]: hasAccess }
    }))
  }

  const handleSystemVariableChange = (variableName: string, value: string) => {
    setChanges(prev => ({
      ...prev,
      systemVariables: { ...prev.systemVariables, [variableName]: value }
    }))
  }

  const saveChanges = async () => {
    setSaving(true)
    try {
      // Save feature flags
      for (const [featureName, enabled] of Object.entries(changes.features)) {
        await fetch('/api/admin/proxy?endpoint=/api/admin/update-feature', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featureName, enabled })
        })
      }

      // Save permissions
      for (const [permissionName, hasAccess] of Object.entries(changes.permissions)) {
        await fetch('/api/admin/proxy?endpoint=/api/admin/update-permission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permissionName, hasAccess })
        })
      }

      // Save system variables
      for (const [variableName, value] of Object.entries(changes.systemVariables)) {
        await fetch('/api/admin/proxy?endpoint=/api/admin/update-system-variable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variableName, value })
        })
      }

      // Refresh config after saving
      await refreshConfig()
      toast.success('Configuration saved successfully')
    } catch (error) {
      console.error('Failed to save changes:', error)
      toast.error('Failed to save configuration')
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = Object.keys(changes.features).length > 0 || 
                   Object.keys(changes.permissions).length > 0 || 
                   Object.keys(changes.systemVariables).length > 0

  if (!canManageAdmin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <X className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>You don't have permission to access admin configuration.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <ChevronLeft className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading configuration...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!config) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            <p>Failed to load configuration</p>
            <Button onClick={loadConfig} className="mt-4">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Admin Configuration
          </h1>
          <p className="text-gray-600">Manage application features, permissions, and system settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshConfig}>
            🔄 Refresh
          </Button>
          {hasChanges && (
            <Button onClick={saveChanges} disabled={isSaving}>
              💾 {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features" className="flex items-center gap-2">
            🚩 Feature Flags
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            🛡️ Permissions
          </TabsTrigger>
          <TabsTrigger value="variables" className="flex items-center gap-2">
            ⚙️ System Variables
          </TabsTrigger>
        </TabsList>

        {/* Feature Flags Tab */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>
                Enable or disable application features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(config.features).map(([featureName, enabled]) => {
                  const currentValue = changes.features[featureName] !== undefined 
                    ? changes.features[featureName] 
                    : enabled
                  const hasChange = changes.features[featureName] !== undefined

                  return (
                    <div key={featureName} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={featureName} className="font-medium">
                            {featureName}
                          </Label>
                          {hasChange && <Badge variant="outline">Modified</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">
                          {getFeatureDescription(featureName)}
                        </p>
                      </div>
                      <Switch
                        id={featureName}
                        checked={currentValue}
                        onCheckedChange={(checked) => handleFeatureChange(featureName, checked)}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>
                Manage user access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(config.permissions).map(([permissionName, hasAccess]) => {
                  const currentValue = changes.permissions[permissionName] !== undefined 
                    ? changes.permissions[permissionName] 
                    : hasAccess
                  const hasChange = changes.permissions[permissionName] !== undefined

                  return (
                    <div key={permissionName} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={permissionName} className="font-medium">
                            {permissionName}
                          </Label>
                          {hasChange && <Badge variant="outline">Modified</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">
                          {getPermissionDescription(permissionName)}
                        </p>
                      </div>
                      <Switch
                        id={permissionName}
                        checked={currentValue}
                        onCheckedChange={(checked) => handlePermissionChange(permissionName, checked)}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Variables Tab */}
        <TabsContent value="variables">
          <Card>
            <CardHeader>
              <CardTitle>System Variables</CardTitle>
              <CardDescription>
                Configure system-wide settings and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(config.systemVariables).map(([variableName, value]) => {
                  const currentValue = changes.systemVariables[variableName] !== undefined 
                    ? changes.systemVariables[variableName] 
                    : value
                  const hasChange = changes.systemVariables[variableName] !== undefined

                  return (
                    <div key={variableName} className="space-y-2 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={variableName} className="font-medium">
                          {variableName}
                        </Label>
                        {hasChange && <Badge variant="outline">Modified</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">
                        {getVariableDescription(variableName)}
                      </p>
                      <Input
                        id={variableName}
                        value={currentValue}
                        onChange={(e) => handleSystemVariableChange(variableName, e.target.value)}
                        placeholder={`Enter ${variableName}`}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getFeatureDescription(featureName: string): string {
  const descriptions: Record<string, string> = {
    'EnableDecisionPoint': 'Enable Decision Point scoring and filtering in applicant grids',
    'EnableSmartMatch': 'Enable Smart Match compatibility scoring',
    'AvailabilityMatching': 'Enable availability-based candidate matching',
    'AdvancedBookmark': 'Enable advanced bookmarking features',
    'AbbreviateHiringStep': 'Show abbreviated hiring step names'
  }
  return descriptions[featureName] || 'Feature configuration setting'
}

function getPermissionDescription(permissionName: string): string {
  const descriptions: Record<string, string> = {
    'FilterByDecisionPoint': 'Allow filtering applicants by Decision Point scores',
    'FilterbySmartMatch': 'Allow filtering applicants by Smart Match scores',
    'ShowDPScoreInApplicantGrids': 'Display Decision Point scores in applicant grids',
    'ViewTags': 'View applicant tags and labels',
    'gridShowApplicantType': 'Show applicant type column in grids',
    'gridShowApplicantName': 'Show applicant name column in grids',
    'gridShowAppliedDate': 'Show applied date column in grids',
    'gridShowPosition': 'Show position column in grids',
    'gridShowLocation': 'Show location column in grids',
    'gridShowApplicationStatus': 'Show application status column in grids'
  }
  return descriptions[permissionName] || 'User access permission'
}

function getVariableDescription(variableName: string): string {
  const descriptions: Record<string, string> = {
    'AppGridDateFilterRangeInDays': 'Default date range for applicant grid filters (in days)',
    'DefaultDaysInApplicantSearchGrid': 'Default number of days to show in applicant search',
    'ExportApplicantLimit': 'Maximum number of applicants that can be exported at once'
  }
  return descriptions[variableName] || 'System configuration variable'
}
