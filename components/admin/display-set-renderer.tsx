'use client'

import { useEffect, useState } from 'react'
import { adminConfigClient, DisplaySetValue } from '@/lib/admin/config-client'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface DisplaySetRendererProps {
  setName: string
  value: string
  className?: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  showIcon?: boolean
}

export function DisplaySetRenderer({ 
  setName, 
  value, 
  className,
  variant = 'default',
  showIcon = false 
}: DisplaySetRendererProps) {
  const [displayText, setDisplayText] = useState(value)
  const [displaySetValues, setDisplaySetValues] = useState<DisplaySetValue[]>([])

  useEffect(() => {
    async function loadDisplaySet() {
      try {
        const values = await adminConfigClient.getDisplaySetValues(setName)
        setDisplaySetValues(values)
        
        const matchedValue = values.find(v => v.value === value || v.name === value)
        if (matchedValue) {
          setDisplayText(matchedValue.displayText)
        }
      } catch (error) {
        console.error(`Error loading display set ${setName}:`, error)
      }
    }

    loadDisplaySet()
  }, [setName, value])

  const getVariantForValue = (val: string): typeof variant => {
    // Custom logic for different display sets
    if (setName === 'DecisionPointGroupRankScore') {
      if (val.includes('.1')) return 'default' // Strongly Recommend - green
      if (val.includes('.2')) return 'secondary' // Recommend - blue
      if (val.includes('.3')) return 'outline' // Consider - gray
      if (val.includes('.4')) return 'destructive' // Caution - yellow/orange
      if (val.includes('.5')) return 'destructive' // Not Recommend - red
    }
    
    if (setName === 'SmartGroupRankScore') {
      if (val.includes('.1')) return 'default' // Excellent - green
      if (val.includes('.2')) return 'secondary' // Good - blue
      if (val.includes('.3')) return 'outline' // Fair - gray
      if (val.includes('.4')) return 'destructive' // Poor - red
    }

    return variant
  }

  const getIconForValue = (val: string): string => {
    if (setName === 'DecisionPointGroupRankScore') {
      if (val.includes('.1')) return '🟢' // Strongly Recommend
      if (val.includes('.2')) return '🔵' // Recommend
      if (val.includes('.3')) return '🟡' // Consider
      if (val.includes('.4')) return '🟠' // Caution
      if (val.includes('.5')) return '🔴' // Not Recommend
    }
    
    if (setName === 'SmartGroupRankScore') {
      if (val.includes('.1')) return '⭐' // Excellent
      if (val.includes('.2')) return '👍' // Good
      if (val.includes('.3')) return '👌' // Fair
      if (val.includes('.4')) return '👎' // Poor
    }

    if (setName === 'SmartMatchGroupRankScore') {
      if (val.includes('.1')) return '🎯' // High Compatibility
      if (val.includes('.2')) return '🔄' // Medium Compatibility
      if (val.includes('.3')) return '⚠️' // Low Compatibility
    }

    return ''
  }

  const finalVariant = getVariantForValue(value)
  const icon = showIcon ? getIconForValue(value) : ''

  return (
    <Badge 
      variant={finalVariant}
      className={cn(
        'inline-flex items-center gap-1',
        className
      )}
    >
      {icon && <span className="text-xs">{icon}</span>}
      <span>{displayText}</span>
    </Badge>
  )
}

interface DisplaySetSelectProps {
  setName: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DisplaySetSelect({ 
  setName, 
  value, 
  onChange, 
  placeholder = 'Select...',
  className 
}: DisplaySetSelectProps) {
  const [displaySetValues, setDisplaySetValues] = useState<DisplaySetValue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDisplaySet() {
      try {
        const values = await adminConfigClient.getDisplaySetValues(setName)
        setDisplaySetValues(values.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)))
      } catch (error) {
        console.error(`Error loading display set ${setName}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDisplaySet()
  }, [setName])

  if (isLoading) {
    return (
      <select className={cn('border rounded px-2 py-1', className)} disabled>
        <option>Loading...</option>
      </select>
    )
  }

  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className={cn('border rounded px-2 py-1', className)}
    >
      <option value="">{placeholder}</option>
      {displaySetValues.map((item) => (
        <option key={item.value} value={item.value}>
          {item.displayText}
        </option>
      ))}
    </select>
  )
}

// Hook for getting display set values
export function useDisplaySet(setName: string) {
  const [values, setValues] = useState<DisplaySetValue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadDisplaySet() {
      try {
        const displaySetValues = await adminConfigClient.getDisplaySetValues(setName)
        setValues(displaySetValues.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)))
      } catch (error) {
        console.error(`Error loading display set ${setName}:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDisplaySet()
  }, [setName])

  const getDisplayText = (value: string): string => {
    const item = values.find(v => v.value === value || v.name === value)
    return item?.displayText || value
  }

  return { values, isLoading, getDisplayText }
}
