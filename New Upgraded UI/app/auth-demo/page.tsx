"use client"

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProtectedRoute from '@/components/auth/protected-route'
import AuthStatusIndicator from '@/components/auth/auth-status-indicator'

export default function AuthDemoPage() {
  const { user, isAuthenticated, isLoading, logout, checkAuthStatus, refreshSession } = useAuth()

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Authentication Demo</h1>
          <AuthStatusIndicator />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Current authenticated user details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge variant={isAuthenticated ? "default" : "destructive"}>
                  {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                </Badge>
              </div>
              
              {user && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">User ID:</span>
                    <span>{user.id}</span>
                  </div>
                  {user.sessionExpiry && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Session Expires:</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(user.sessionExpiry).toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Authentication Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Actions</CardTitle>
              <CardDescription>Test authentication functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={checkAuthStatus} 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                Check Auth Status
              </Button>
              
              <Button 
                onClick={refreshSession} 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                Refresh Session
              </Button>
              
              <Button 
                onClick={logout} 
                variant="destructive" 
                className="w-full"
                disabled={isLoading}
              >
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Hybrid Authentication Features</CardTitle>
              <CardDescription>What makes this authentication system special</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">✅ Implemented Features</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Fast localStorage-based auth checks</li>
                    <li>• Server-side session validation with ATAO</li>
                    <li>• Automatic session refresh (every 25 minutes)</li>
                    <li>• Multi-tab synchronization</li>
                    <li>• Protected routes with loading states</li>
                    <li>• Graceful session expiry handling</li>
                    <li>• Real-time auth status indicators</li>
                    <li>• Secure HTTP-only cookie management</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">🔧 Technical Benefits</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Zero loading delays on navigation</li>
                    <li>• Enterprise-grade security</li>
                    <li>• No ATAO modifications required</li>
                    <li>• Seamless legacy integration</li>
                    <li>• Mobile and desktop optimized</li>
                    <li>• Automatic error recovery</li>
                    <li>• Background session validation</li>
                    <li>• TypeScript type safety</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
            <CardDescription>How to use the auth system in your components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Auth Check:</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`const { isAuthenticated, user } = useAuth()

if (!isAuthenticated) {
  return <LoginPrompt />
}

return <AuthenticatedContent user={user} />`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Protected Page:</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`<ProtectedRoute>
  <YourPageContent />
</ProtectedRoute>`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Manual Logout:</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
  // User will be redirected to login
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
