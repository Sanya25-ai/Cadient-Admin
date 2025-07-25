"use client"

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  fallback = <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Checking authentication...</p>
    </div>
  </div>,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  // Add debugging
  console.log('🛡️ ProtectedRoute - Auth state:', { 
    isAuthenticated, 
    isLoading, 
    hasUser: !!user,
    userExpiry: user?.sessionExpiry ? new Date(user.sessionExpiry).toISOString() : 'none'
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('🛡️ ProtectedRoute - Redirecting to login because not authenticated')
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  if (isLoading) {
    console.log('🛡️ ProtectedRoute - Still loading, showing fallback')
    return <>{fallback}</>
  }

  if (!isAuthenticated) {
    console.log('🛡️ ProtectedRoute - Not authenticated, showing fallback')
    return <>{fallback}</>
  }

  console.log('🛡️ ProtectedRoute - Authenticated, showing children')
  return <>{children}</>
}
