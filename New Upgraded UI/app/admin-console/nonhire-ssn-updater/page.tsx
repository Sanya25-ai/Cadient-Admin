'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NonHireSSNUpdaterPage() {
  const router = useRouter()
  const [ssn, setSsn] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleAdd = () => {
    if (ssn.trim()) {
      setShowConfirmation(true)
      setSsn('')
      // Hide confirmation message after 5 seconds
      setTimeout(() => {
        setShowConfirmation(false)
      }, 5000)
    }
  }

  const handleRemove = () => {
    if (ssn.trim()) {
      // Handle remove functionality
      console.log('Removing SSN:', ssn)
      setSsn('')
    }
  }
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0"
          >
            ← Back
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <h1 className="text-2xl font-semibold text-gray-900">NonHire SSN Updater</h1>
          </div>
          <p className="text-sm text-gray-700">
            Use this tool to add or remove a single non-hireable SSN
          </p>
        </div>

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <span className="font-medium">Confirmation</span>
              <div className="text-sm">Added to the Non-hireable List.</div>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="mb-8">

          {/* Form */}
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="ssn" className="text-sm font-medium text-gray-700">
                * Enter SSN:
              </Label>
              <Input 
                id="ssn"
                type="text"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                placeholder=""
                className="mt-1 w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleAdd}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
              >
                Add
              </Button>
              <Button 
                onClick={handleRemove}
                className="bg-red-600 hover:bg-red-700 text-white px-6"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
