'use client'

import { useState, useEffect } from 'react'
import { getAllFilterOptions, type FilterOptions } from '@/lib/dynamic-position-mapping'

export default function TestFiltersPage() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState({
    position: '',
    location: '',
    status: '',
    workPreference: '',
    applicantType: '',
    exclusive: '',
    veteranStatus: '',
    workflow: '',
    dataChannel: ''
  })
  const [testResults, setTestResults] = useState<any[]>([])
  const [testLoading, setTestLoading] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  // Load filter options on component mount
  useEffect(() => {
    checkSessionInfo()
    loadFilterOptions()
  }, [])

  const checkSessionInfo = () => {
    // Check browser cookies
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      if (key && value) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)

    setSessionInfo({
      cookies,
      hasJSESSIONID: !!cookies.JSESSIONID,
      hasConsolidatedCookie: !!cookies.ConsolidatedJAFTestClientINT,
      cookieCount: Object.keys(cookies).length,
      timestamp: new Date().toISOString()
    })

    console.log("🔍 Test Page: Session info:", {
      cookies,
      hasJSESSIONID: !!cookies.JSESSIONID,
      hasConsolidatedCookie: !!cookies.ConsolidatedJAFTestClientINT
    })
  }

  const loadFilterOptions = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("🔍 Test Page: Loading filter options...")
      
      const options = await getAllFilterOptions()
      setFilterOptions(options)
      
      console.log("🔍 Test Page: Filter options loaded:", {
        positions: options.positions?.length || 0,
        locations: options.locations?.length || 0,
        statuses: options.statuses?.length || 0,
        workPreferences: options.workPreferences?.length || 0,
        applicantTypes: options.applicantTypes?.length || 0,
        exclusiveOptions: options.exclusiveOptions?.length || 0,
        veteranStatuses: options.veteranStatuses?.length || 0,
        workflows: options.workflows?.length || 0,
        dataChannels: options.dataChannels?.length || 0
      })
    } catch (err) {
      console.error("🔍 Test Page: Error loading filter options:", err)
      setError(err instanceof Error ? err.message : 'Failed to load filter options')
    } finally {
      setLoading(false)
    }
  }

  const testSessionAPI = async () => {
    try {
      console.log("🔍 Test Page: Testing session with filter-options API...")
      
      const response = await fetch('/api/filter-options', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })
      
      console.log("🔍 Test Page: Filter options API response status:", response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log("🔍 Test Page: Filter options API success:", {
          positions: data.positions?.length || 0,
          locations: data.locations?.length || 0,
          statuses: data.statuses?.length || 0,
          workPreferences: data.workPreferences?.length || 0,
          applicantTypes: data.applicantTypes?.length || 0,
          exclusiveOptions: data.exclusiveOptions?.length || 0,
          veteranStatuses: data.veteranStatuses?.length || 0
        })
        alert(`✅ Session is valid! Filter options loaded successfully.\nPositions: ${data.positions?.length || 0}\nLocations: ${data.locations?.length || 0}\nStatuses: ${data.statuses?.length || 0}\nWork Preferences: ${data.workPreferences?.length || 0}\nApplicant Types: ${data.applicantTypes?.length || 0}\nExclusive Options: ${data.exclusiveOptions?.length || 0}\nVeteran Statuses: ${data.veteranStatuses?.length || 0}`)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error("🔍 Test Page: Filter options API error:", errorData)
        alert(`❌ Session test failed: ${response.status}\nError: ${errorData.error || 'Unknown error'}`)
      }
    } catch (err) {
      console.error("🔍 Test Page: Error testing session:", err)
      alert(`❌ Session test error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const testFilterAPI = async () => {
    try {
      setTestLoading(true)
      console.log("🔍 Test Page: Testing filter API with:", selectedFilters)
      
      // Build query parameters
      const params = new URLSearchParams()
      if (selectedFilters.position) params.append('position', selectedFilters.position)
      if (selectedFilters.location) params.append('location', selectedFilters.location)
      if (selectedFilters.status) params.append('status', selectedFilters.status)
      if (selectedFilters.workPreference) params.append('workPreference', selectedFilters.workPreference)
      if (selectedFilters.applicantType) params.append('applicantType', selectedFilters.applicantType)
      if (selectedFilters.exclusive) params.append('exclusive', selectedFilters.exclusive)
      if (selectedFilters.veteranStatus) params.append('veteranStatus', selectedFilters.veteranStatus)
      if (selectedFilters.workflow) params.append('hiringWorkflow', selectedFilters.workflow)
      if (selectedFilters.dataChannel) params.append('dataChannel', selectedFilters.dataChannel)
      
      const url = `/api/applications?${params.toString()}`
      console.log("🔍 Test Page: Calling API:", url)
      
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      })
      
      console.log("🔍 Test Page: API response status:", response.status)
      
      if (!response.ok) {
        // Try to get error details
        let errorDetails = `Status: ${response.status}`
        try {
          const errorData = await response.json()
          errorDetails += `\nError: ${errorData.error || 'Unknown error'}`
          if (errorData.details) {
            errorDetails += `\nDetails: ${errorData.details}`
          }
        } catch {
          errorDetails += '\nCould not parse error response'
        }
        throw new Error(errorDetails)
      }
      
      const data = await response.text()
      console.log("🔍 Test Page: API response length:", data.length)
      
      // Try to extract some basic info from the HTML response
      const tableMatches = data.match(/<table[^>]*>/gi) || []
      const rowMatches = data.match(/<tr[^>]*>/gi) || []
      const errorMatches = data.match(/error|exception|failed/gi) || []
      
      const result = {
        timestamp: new Date().toISOString(),
        filters: { ...selectedFilters },
        responseLength: data.length,
        tablesFound: tableMatches.length,
        rowsFound: rowMatches.length,
        errorsFound: errorMatches.length,
        status: response.status,
        success: response.ok && errorMatches.length === 0
      }
      
      setTestResults(prev => [result, ...prev.slice(0, 9)]) // Keep last 10 results
      
      console.log("🔍 Test Page: Test result:", result)
      
    } catch (err) {
      console.error("🔍 Test Page: Error testing filter API:", err)
      const result = {
        timestamp: new Date().toISOString(),
        filters: { ...selectedFilters },
        error: err instanceof Error ? err.message : 'Unknown error',
        success: false
      }
      setTestResults(prev => [result, ...prev.slice(0, 9)])
    } finally {
      setTestLoading(false)
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  const goToLogin = () => {
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Filter System Test Page</h1>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading filter options...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Filter System Test Page</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error Loading Filter Options</h3>
          <p className="text-red-600 mt-1">{error}</p>
          <div className="mt-3 space-x-2">
            <button 
              onClick={loadFilterOptions}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
            <button 
              onClick={goToLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Filter System Test Page</h1>
      
      {/* Session Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
        <h3 className="text-gray-800 font-medium mb-2">Session Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">JSESSIONID:</span> {sessionInfo?.hasJSESSIONID ? '✅ Present' : '❌ Missing'}
          </div>
          <div>
            <span className="font-medium">ConsolidatedJAFTestClientINT:</span> {sessionInfo?.hasConsolidatedCookie ? '✅ Present' : '❌ Missing'}
          </div>
          <div>
            <span className="font-medium">Total Cookies:</span> {sessionInfo?.cookieCount || 0}
          </div>
          <div>
            <span className="font-medium">Last Checked:</span> {sessionInfo?.timestamp ? new Date(sessionInfo.timestamp).toLocaleTimeString() : 'Never'}
          </div>
        </div>
        <div className="mt-3 space-x-2">
          <button 
            onClick={checkSessionInfo}
            className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
          >
            Refresh Session Info
          </button>
          <button 
            onClick={testSessionAPI}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Test Session
          </button>
          {(!sessionInfo?.hasJSESSIONID || !sessionInfo?.hasConsolidatedCookie) && (
            <button 
              onClick={goToLogin}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>

      {/* Filter Options Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <h3 className="text-blue-800 font-medium mb-2">Dynamic Filter Options Loaded</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="font-medium">Positions:</span> {filterOptions?.positions?.length || 0}
          </div>
          <div>
            <span className="font-medium">Locations:</span> {filterOptions?.locations?.length || 0}
          </div>
          <div>
            <span className="font-medium">Statuses:</span> {filterOptions?.statuses?.length || 0}
          </div>
          <div>
            <span className="font-medium">Work Preferences:</span> {filterOptions?.workPreferences?.length || 0}
          </div>
          <div>
            <span className="font-medium">Applicant Types:</span> {filterOptions?.applicantTypes?.length || 0}
          </div>
          <div>
            <span className="font-medium">Exclusive Options:</span> {filterOptions?.exclusiveOptions?.length || 0}
          </div>
          <div>
            <span className="font-medium">Veteran Statuses:</span> {filterOptions?.veteranStatuses?.length || 0}
          </div>
          <div>
            <span className="font-medium">Workflows:</span> {filterOptions?.workflows?.length || 0}
          </div>
          <div>
            <span className="font-medium">Data Channels:</span> {filterOptions?.dataChannels?.length || 0}
          </div>
        </div>
        <button 
          onClick={loadFilterOptions}
          className="mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Reload Options
        </button>
      </div>

      {/* Filter Test Form */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Test Filter API</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Position Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <select
              value={selectedFilters.position}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, position: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Positions</option>
              {filterOptions?.positions?.map((position) => (
                <option key={position.id} value={position.name}>
                  {position.name} (ID: {position.id})
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={selectedFilters.location}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Locations</option>
              {filterOptions?.locations?.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name} (ID: {location.id})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedFilters.status}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Statuses</option>
              {filterOptions?.statuses?.map((status) => (
                <option key={status.id} value={status.name}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {/* Work Preference Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Preference</label>
            <select
              value={selectedFilters.workPreference}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, workPreference: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Work Preferences</option>
              {filterOptions?.workPreferences?.map((workPref) => (
                <option key={workPref.id} value={workPref.name}>
                  {workPref.name}
                </option>
              ))}
            </select>
          </div>

          {/* Applicant Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Type</label>
            <select
              value={selectedFilters.applicantType}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, applicantType: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Applicant Types</option>
              {filterOptions?.applicantTypes?.map((appType) => (
                <option key={appType.id} value={appType.name}>
                  {appType.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exclusive Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exclusive</label>
            <select
              value={selectedFilters.exclusive}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, exclusive: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Exclusive Options</option>
              {filterOptions?.exclusiveOptions?.map((exclusive) => (
                <option key={exclusive.id} value={exclusive.name}>
                  {exclusive.name}
                </option>
              ))}
            </select>
          </div>

          {/* Veteran Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Veteran Status</label>
            <select
              value={selectedFilters.veteranStatus}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, veteranStatus: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Veteran Statuses</option>
              {filterOptions?.veteranStatuses?.map((vetStatus) => (
                <option key={vetStatus.id} value={vetStatus.name}>
                  {vetStatus.name}
                </option>
              ))}
            </select>
          </div>

          {/* Workflow Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Workflow</label>
            <select
              value={selectedFilters.workflow}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, workflow: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Workflows</option>
              {filterOptions?.workflows?.map((workflow) => (
                <option key={workflow.id} value={workflow.name}>
                  {workflow.name}
                </option>
              ))}
            </select>
          </div>

          {/* Data Channel Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Channel</label>
            <select
              value={selectedFilters.dataChannel}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, dataChannel: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Data Channels</option>
              {filterOptions?.dataChannels?.map((channel) => (
                <option key={channel.id} value={channel.name}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={testFilterAPI}
            disabled={testLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {testLoading ? 'Testing...' : 'Test Filter API'}
          </button>
          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Test Results</h3>
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div 
                key={index}
                className={`border rounded-md p-3 ${
                  result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">
                    Test #{testResults.length - index}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="text-sm space-y-1">
                  <div><strong>Filters:</strong> {JSON.stringify(result.filters)}</div>
                  {result.error ? (
                    <div className="text-red-600"><strong>Error:</strong> {result.error}</div>
                  ) : (
                    <>
                      <div><strong>Status:</strong> {result.status}</div>
                      <div><strong>Response Length:</strong> {result.responseLength} chars</div>
                      <div><strong>Tables Found:</strong> {result.tablesFound}</div>
                      <div><strong>Rows Found:</strong> {result.rowsFound}</div>
                      <div><strong>Errors Found:</strong> {result.errorsFound}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
