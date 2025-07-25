"use client"

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, Check, X } from 'lucide-react'
import { useState } from 'react'

export default function AuthStatusIndicator() {
  const { isAuthenticated, user, checkAuthStatus, refreshSession } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await checkAuthStatus()
      await refreshSession()
    } catch (error) {
      console.error('Failed to refresh auth status:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
        
        <Badge variant={isAuthenticated ? "default" : "destructive"} className="text-xs">
          {isAuthenticated ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      {user && (
        <span className="text-xs text-muted-foreground">
          {user.name}
        </span>
      )}

      <Button 
        onClick={handleRefresh} 
        variant="ghost" 
        size="sm"
        className="h-6 w-6 p-0"
        disabled={isRefreshing}
        title="Refresh authentication status"
      >
        <ChevronLeft className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  )
}
