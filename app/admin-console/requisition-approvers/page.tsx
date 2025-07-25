'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mock data matching the HMC interface
const approverListsData = [
  {
    id: '1',
    listName: 'Approver',
    approvers: 'c. melissa mckenna',
    approverDetails: [
      {
        id: '1',
        name: 'ctaa melissa mckenna',
        email: 'melissa.mckenna@cadienttalent.com'
      }
    ]
  }
]

export default function RequisitionApproversPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list')
  const [selectedList, setSelectedList] = useState<any>(null)
  const [editedListName, setEditedListName] = useState('')
  const [newApproverSearch, setNewApproverSearch] = useState('')
  const [approvers, setApprovers] = useState<any[]>([])

  const handleListClick = (list: any) => {
    setSelectedList(list)
    setEditedListName(list.listName)
    setApprovers([...list.approverDetails])
    setCurrentView('details')
  }

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving approver list:', {
      name: editedListName,
      approvers: approvers
    })
    setCurrentView('list')
  }

  const handleCancel = () => {
    setCurrentView('list')
    setSelectedList(null)
    setEditedListName('')
    setApprovers([])
    setNewApproverSearch('')
  }

  const handleDeleteApprover = (approverId: string) => {
    setApprovers(approvers.filter(approver => approver.id !== approverId))
  }

  const handleAddApprover = () => {
    if (newApproverSearch.trim()) {
      const newApprover = {
        id: Date.now().toString(),
        name: newApproverSearch,
        email: `${newApproverSearch.toLowerCase().replace(/\s+/g, '.')}@cadienttalent.com`
      }
      setApprovers([...approvers, newApprover])
      setNewApproverSearch('')
    }
  }

  const handleCreateNew = () => {
    setSelectedList(null)
    setEditedListName('')
    setApprovers([])
    setNewApproverSearch('')
    setCurrentView('details')
  }

  if (currentView === 'details') {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Approver List Details</h1>
          </div>

          {/* Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Details</h2>
            <p className="text-sm text-gray-700 mb-4">
              The following people are attached to the <strong>Approver</strong> list of approvers.
            </p>
            
            {/* List Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                * List Name:
              </label>
              <Input
                value={editedListName}
                onChange={(e) => setEditedListName(e.target.value)}
                className="max-w-md"
                placeholder="Enter list name"
              />
            </div>

            {/* List of Approvers */}
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">List of Approvers</h3>
              
              {/* Current Approvers */}
              <div className="space-y-2 mb-4">
                {approvers.map((approver, index) => (
                  <div key={approver.id} className="flex items-center justify-between bg-yellow-100 p-2 rounded">
                    <span className="text-sm">
                      {index + 1}. {approver.name} ({approver.email})
                    </span>
                    <Button
                      onClick={() => handleDeleteApprover(approver.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      🗑️
                    </Button>
                  </div>
                ))}
                {approvers.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No approvers added yet</p>
                )}
              </div>

              {/* Add New Approver */}
              <div className="flex items-center gap-2">
                <Input
                  value={newApproverSearch}
                  onChange={(e) => setNewApproverSearch(e.target.value)}
                  placeholder="Start typing to show a list"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddApprover()}
                />
                <Button
                  onClick={handleAddApprover}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleSave}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Save
              </Button>
              <Button 
                onClick={handleCancel}
                variant="destructive"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Requisition Approver Lists</h1>
          </div>
          <Button 
            onClick={handleCreateNew}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            + Create a new Approver list
          </Button>
        </div>

        {/* Details Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Details</h2>
          <p className="text-sm text-gray-700">
            Get a quick glance at all of the Approver Lists in your system.
          </p>
        </div>

        {/* Table Section */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Table Header with Delete Button and Results */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <Button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2">
                🗑️ Delete
              </Button>
              <div className="flex items-center gap-8">
                <span className="text-sm text-gray-600">Results: 1-1 of 1</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Page:</span>
                  <select className="border border-gray-300 rounded px-2 py-1">
                    <option>1 of 1</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Approver Lists Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 w-16 text-center">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/2">List Name</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/2">Approvers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approverListsData.map((list) => (
                <TableRow key={list.id} className="border-b border-gray-200">
                  <TableCell className="text-center align-top py-3">
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 align-top py-3">
                    <button
                      onClick={() => handleListClick(list)}
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      {list.listName}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-700 align-top py-3">
                    {list.approvers}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
