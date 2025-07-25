"use client"

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import ProtectedRoute from './protected-route'

// Example 1: Using auth in a component
export function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>
  }

  return (
    <div className="p-4">
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <Button onClick={logout} variant="outline">
        Logout
      </Button>
    </div>
  )
}

// Example 2: Protected page component
export function ProtectedPageExample() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1>This is a protected page</h1>
        <p>You can only see this if you're authenticated!</p>
      </div>
    </ProtectedRoute>
  )
}

// Example 3: Conditional rendering based on auth
export function ConditionalContent() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Authenticated Content</h2>
          <UserProfile />
        </div>
      ) : (
        <div>
          <h2>Public Content</h2>
          <p>Please log in to see more features</p>
        </div>
      )}
    </div>
  )
}

// Example 4: Auth status indicator
export function AuthStatusIndicator() {
  const { isAuthenticated, user, checkAuthStatus } = useAuth()

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="text-sm">
        {isAuthenticated ? `Logged in as ${user?.name}` : 'Not authenticated'}
      </span>
      <Button 
        onClick={checkAuthStatus} 
        variant="ghost" 
        size="sm"
        className="text-xs"
      >
        Refresh
      </Button>
    </div>
  )
}
