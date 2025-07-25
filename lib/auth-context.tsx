"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  isAuthenticated: boolean
  sessionExpiry?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (userData: Omit<User, 'isAuthenticated'>) => void
  logout: () => void
  checkAuthStatus: () => Promise<boolean>
  refreshSession: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default authenticated user for bypass mode
const defaultUser: User = {
  id: 'bypass-user-1',
  name: 'Bypass User',
  email: 'bypass@example.com',
  isAuthenticated: true,
  sessionExpiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser)
  const [isLoading, setIsLoading] = useState(false)

  // Check authentication status with server - always return true in bypass mode
  const checkAuthStatus = async (): Promise<boolean> => {
    console.log('🔍 AuthContext - Authentication bypassed, always authenticated')
    setUser(defaultUser)
    return true
  }

  // Refresh session - always return true in bypass mode
  const refreshSession = async (): Promise<boolean> => {
    console.log('📱 AuthContext - Session refresh bypassed')
    return true
  }

  // Login function - set user to default bypass user
  const login = (userData: Omit<User, 'isAuthenticated'>) => {
    console.log('🔐 AuthContext - Login bypassed, using default user')
    setUser(defaultUser)
  }

  // Logout function - do nothing in bypass mode
  const logout = async () => {
    console.log('🚪 AuthContext - Logout bypassed')
    // Keep user authenticated even on logout
    setUser(defaultUser)
  }

  // Initialize auth state on mount - always set to authenticated
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 AuthContext - Initializing with bypassed authentication...')
      setIsLoading(false)
      setUser(defaultUser)
    }

    initializeAuth()
  }, [])

  // Storage change handler - keep authenticated state
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      console.log('📱 AuthContext - Storage change detected, maintaining authenticated state')
      // Always maintain authenticated state
      setUser(defaultUser)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const contextValue: AuthContextType = {
    user: defaultUser, // Always return authenticated user
    isLoading: false, // Never loading in bypass mode
    isAuthenticated: true, // Always authenticated
    login,
    logout,
    checkAuthStatus,
    refreshSession,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
