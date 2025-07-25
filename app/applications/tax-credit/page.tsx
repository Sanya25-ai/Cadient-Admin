"use client"

import { useState, useEffect } from "react"
import TaxCreditTable from "@/components/applications/tax-credit-table"

interface TaxCreditApplication {
  id: string
  name: string
  appliedDate: string
  position: string
  location: string
  status: string
  taxCreditType?: string
  taxCreditValue?: string
  hiringManager?: string
  smartScore?: number | null
  availability?: string
  phone?: string
  email?: string
  ssn?: string
  source?: string
}

export default function TaxCreditPage() {
  const [applications, setApplications] = useState<TaxCreditApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTaxCreditApplications = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Tax Credit Page: Fetching from API route')
        
        const response = await fetch('/api/applications/tax-credit', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        })

        console.log('Tax Credit Page: API response status:', response.status)

        if (!response.ok) {
          if (response.status === 401) {
            console.log('Tax Credit Page: Session expired')
            setApplications([])
            return
          }
          console.error(`Tax Credit Page: API failed - ${response.status}`)
          setApplications([])
          return
        }

        const data = await response.json()
        console.log('Tax Credit Page: Received applications:', Array.isArray(data) ? data.length : 'invalid data')
        
        setApplications(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Tax Credit Page: Error fetching applications (ignored):', err)
        // Don't show error to user - just set empty array
        setApplications([])
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTaxCreditApplications()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#EE5A37] mb-6">Tax Credit</h1>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="text-gray-600">Loading tax credit applications...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#EE5A37] mb-6">Tax Credit</h1>
      <TaxCreditTable applications={applications} />
    </div>
  )
}
