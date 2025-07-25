'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ViewFullListOfDocumentsPage() {
  return (
    <div className="space-y-6">
      {/* Back to Admin Console Button */}
      <div className="flex items-center gap-4">
        <Link href="/admin-console">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Admin Console
          </Button>
        </Link>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">View Full List of Documents</h1>
        <p className="text-gray-600 mt-2">
          Complete collection of your active documents with options to create, edit, and manage document rules.
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Document Management Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              View or edit a complete collection of your active documents. You can also create or update new documents 
              or remove documents from your active list. When editing or creating new documents, specify specific rules 
              for presenting the documents based on location, job codes and applicant status.
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-2">Document Management Features:</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Create new documents</li>
                <li>• Edit existing documents</li>
                <li>• Remove documents from active list</li>
                <li>• Set location-based rules</li>
                <li>• Configure job code restrictions</li>
                <li>• Define applicant status requirements</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Create New Document
              </Button>
              <Button variant="outline">
                Edit Document
              </Button>
              <Button variant="outline">
                Document Rules
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
