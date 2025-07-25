'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    name: 'Cadient, Mary-Kate',
    username: 'MKCADIENT',
    email: 'anna.perez@testmail.cadienttalent.com',
    ssnSin: '--',
    homePhone: '555-555-5555'
  },
  {
    id: 2,
    name: 'Fuller, Kristen',
    username: 'KSNEW@02MSNAA.COM',
    email: 'KSNew@02msnAA.com',
    ssnSin: '--',
    homePhone: '321-111-5000'
  },
  {
    id: 3,
    name: 'X, Joe',
    username: 'RRQOHOTWHEELER96@02MSN.COM',
    email: 'RRqohotwheeler96@02msn.com',
    ssnSin: '--',
    homePhone: '321-111-1000'
  },
  {
    id: 4,
    name: 'Stewart, Kristen',
    username: 'TESTKS@NEWTESTMAIL.COM',
    email: 'TestKS@newtestmail.com',
    ssnSin: '--',
    homePhone: '458-445-6456'
  },
  {
    id: 5,
    name: 'june, june',
    username: 'JUNE',
    email: 'june@gmail.com',
    ssnSin: '--',
    homePhone: '--'
  },
  {
    id: 6,
    name: 'Joseph, David',
    username: 'JOSEPH',
    email: 'Joseph@mail.com',
    ssnSin: '--',
    homePhone: '202-410-4706'
  },
  {
    id: 7,
    name: 'Asher, Jack',
    username: 'ASHER',
    email: 'Asher@mail.com',
    ssnSin: '--',
    homePhone: '208-286-8618'
  }
]

export default function DeleteJobSeekersPage() {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [candidateToDelete, setCandidateToDelete] = useState<any>(null)
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    ssn: '',
    sin: '',
    homePhone: ''
  })

  const handleToggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleDelete = (candidate: any) => {
    setCandidateToDelete(candidate)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    console.log('Deleting candidate:', candidateToDelete)
    // Handle actual delete functionality here
    setShowDeleteModal(false)
    setCandidateToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setCandidateToDelete(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCandidates(mockCandidates.map(c => c.id))
    } else {
      setSelectedCandidates([])
    }
  }

  const handleSelectCandidate = (candidateId: number, checked: boolean) => {
    if (checked) {
      setSelectedCandidates(prev => [...prev, candidateId])
    } else {
      setSelectedCandidates(prev => prev.filter(id => id !== candidateId))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedCandidates.length > 0) {
      // For demo purposes, just delete the first selected candidate
      const firstSelected = mockCandidates.find(c => selectedCandidates.includes(c.id))
      if (firstSelected) {
        handleDelete(firstSelected)
      }
    }
  }
  return (
    <div className="flex-1 bg-white">
      <div className="w-full p-8 pt-6">
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
            <span className="text-2xl">🗑️</span>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Delete Job Seekers</h1>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              When you delete a job seeker, all application data will be <strong>permanently removed</strong> from your system! If you are sure that you want to proceed, use the form below to search for job seekers that you want to delete.
            </p>
          </div>
        </div>

        {/* Search Filters Button */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleToggleFilters}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5H21V6H3V4.5ZM7 11.25H17V12.75H7V11.25ZM10 18H14V19.5H10V18Z" fill="currentColor"/>
            </svg>
            Search Filters
          </Button>
        </div>

        {/* Search Form - Collapsible */}
        {showFilters && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> The form fields below requires an <strong>exact</strong> data match except Username.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                    First Name:
                  </Label>
                  <Input 
                    id="first-name"
                    value={searchData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                    Last Name:
                  </Label>
                  <Input 
                    id="last-name"
                    value={searchData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-1"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username:
                  </Label>
                  <Input 
                    id="username"
                    value={searchData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="mt-1"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address:
                  </Label>
                  <Input 
                    id="email"
                    type="email"
                    value={searchData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ssn" className="text-sm font-medium text-gray-700">
                    SSN:
                  </Label>
                  <Input 
                    id="ssn"
                    value={searchData.ssn}
                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                    className="mt-1"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="sin" className="text-sm font-medium text-gray-700">
                    SIN:
                  </Label>
                  <Input 
                    id="sin"
                    value={searchData.sin}
                    onChange={(e) => handleInputChange('sin', e.target.value)}
                    className="mt-1"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="home-phone" className="text-sm font-medium text-gray-700">
                    Home Phone:
                  </Label>
                  <Input 
                    id="home-phone"
                    value={searchData.homePhone}
                    onChange={(e) => handleInputChange('homePhone', e.target.value)}
                    className="mt-1"
                     placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidates List */}
        <div>
          {/* Results Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-2">
                    ⚙️ Actions
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem onClick={handleDeleteSelected} className="flex items-center gap-2">
                    🗑️ Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="text-sm text-gray-600">
                Results: 1-50 of 756
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 16</option>
              </select>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedCandidates.length === mockCandidates.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Username (email address)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    SSN/SIN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Home Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={(e) => handleSelectCandidate(candidate.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{candidate.name}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{candidate.username}</div>
                      <div className="text-sm text-gray-600">{candidate.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.ssnSin}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.homePhone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && candidateToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 text-xl">🗑️</span>
                  <h2 className="text-lg font-semibold text-gray-900">Confirm Deletion</h2>
                </div>
                <button
                  onClick={handleCancelDelete}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-sm text-gray-700 mb-4">
                  Are you absolutely sure that you want to permanently delete all of the data in the system associated to the following job seeker?
                </p>

                {/* Warning Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                  <p className="text-sm text-gray-800">
                    <strong>NOTE:</strong> Deleting <strong>real</strong> applicants is not permitted without legal approval from Cadient Talent and all deletion activities will be logged for auditing purposes.
                  </p>
                </div>

                {/* Job Seeker Details */}
                <div className="mb-6">
                  <h3 className="text-red-600 font-medium mb-3">Job Seeker to be deleted</h3>
                  <div className="bg-gray-100 rounded p-4 space-y-2">
                    <div>
                      <span className="font-medium text-gray-900">Name:</span>
                      <div className="text-gray-700">{candidateToDelete.name}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Username:</span>
                      <div className="text-gray-700">{candidateToDelete.username}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Email Address:</span>
                      <div className="text-gray-700">{candidateToDelete.email}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">SSN/SIN:</span>
                      <div className="text-gray-700">{candidateToDelete.ssnSin}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Home Phone:</span>
                      <div className="text-gray-700">{candidateToDelete.homePhone}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Address:</span>
                      <div className="text-gray-700">--</div>
                    </div>
                    <div className="pt-2">
                      <div className="text-gray-700">USA</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={handleConfirmDelete}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  >
                    🗑️ Delete
                  </Button>
                  <Button
                    onClick={handleCancelDelete}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
