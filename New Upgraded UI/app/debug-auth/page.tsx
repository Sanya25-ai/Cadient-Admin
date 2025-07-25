"use client"

import { useAuth } from '@/lib/auth-context'
import { useEffect, useState } from 'react'

export default function DebugAuthPage() {
  const { user, isLoading, isAuthenticated, checkAuthStatus } = useAuth()
  const [cookies, setCookies] = useState('')
  const [authStatusResult, setAuthStatusResult] = useState<any>(null)

  useEffect(() => {
    setCookies(document.cookie)
  }, [])

  const testAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json()
      setAuthStatusResult({ status: response.status, data })
    } catch (error) {
      setAuthStatusResult({ error: error.message })
    }
  }

  const testCheckAuthStatus = async () => {
    const result = await checkAuthStatus()
    console.log('checkAuthStatus result:', result)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Auth Context State</h2>
          <pre className="text-sm">
            {JSON.stringify({ 
              isLoading, 
              isAuthenticated, 
              user: user ? {
                ...user,
                sessionExpiry: user.sessionExpiry ? new Date(user.sessionExpiry).toISOString() : null
              } : null 
            }, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Client-side Cookies</h2>
          <pre className="text-sm whitespace-pre-wrap">{cookies || 'No cookies found'}</pre>
        </div>

        <div className="space-x-4">
          <button 
            onClick={testAuthStatus}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test /api/auth/status
          </button>
          <button 
            onClick={testCheckAuthStatus}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test checkAuthStatus()
          </button>
        </div>

        {authStatusResult && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Auth Status API Result</h2>
            <pre className="text-sm">
              {JSON.stringify(authStatusResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
