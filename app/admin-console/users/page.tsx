"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserManagementPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('username')
  const [showResults, setShowResults] = useState(false)

  // Sample user data matching your screenshot
  const userData = [
    {
      username: 'CADIENT_MGUNN',
      name: 'Megan Gunn',
      email: 'megan.gunn@cadienttalent.com',
      location: 'USA1',
      isActive: 'Yes'
    },
    {
      username: 'CTA_ANDYWILSON',
      name: 'Andy Wilson',
      email: 'awilson@testmail.cadienttalent.com',
      location: '784\nStore 101\nUSA1\n7',
      isActive: 'Yes'
    },
    {
      username: 'CTA_ANDYWILSONOMEGA',
      name: 'Andy Wilson',
      email: 'melissa.mckenna@testmail.cadienttalent.com',
      location: 'USA1',
      isActive: 'Yes'
    },
    {
      username: 'CTA_GJHA',
      name: 'Girijesh Jha',
      email: 'girijesh@basisvectors.com',
      location: 'USA1',
      isActive: 'Yes'
    },
    {
      username: 'CTA_KBIDWELL',
      name: 'CTA Kyle Bidwell',
      email: 'kyle.bidwell@cadienttalent.com',
      location: 'USA1',
      isActive: 'Yes'
    },
    {
      username: 'CTA_MSHARMA',
      name: 'Manish Sharma',
      email: 'manish.sharma@cadienttalent.com',
      location: 'USA1',
      isActive: 'Yes'
    },
    {
      username: 'CTA_PJAIN',
      name: 'Pratham Jain',
      email: 'pratham@basisvectors.com',
      location: 'Store 6\nUSA1',
      isActive: 'Yes'
    }
  ]

  const handleSearch = () => {
    setShowResults(true)
  }

  const handleUsernameClick = (username: string) => {
    router.push(`/admin-console/users/${username}`)
  }
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto p-8 pt-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/admin-console/users-roles">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">User Management</h1>
          </div>
          <Button 
            onClick={() => router.push('/admin-console/users/create')}
            className="bg-slate-800 hover:bg-slate-700 text-white"
          >
            <span className="mr-2">+</span>
            Create a User
          </Button>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-4">To find an existing user, search by:</p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• Username</li>
            <li>• Name, first or last</li>
            <li>• E-mail address</li>
            <li>• Location, store number</li>
          </ul>
          <p className="text-sm text-gray-600 mt-4 mb-2">
            To create a new user, click the Create a User link.
          </p>
          <p className="text-sm text-gray-600">
            To edit an existing user profile, click the individual username.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">* Find Users:</span>
            <div className="relative group">
              <span className="text-xs bg-gray-800 text-white rounded-full w-4 h-4 flex items-center justify-center cursor-help">?</span>
              {/* Tooltip */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                Type username, name, e-mail, or location.
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search criteria..." 
                className="w-full"
              />
            </div>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="username">Username</SelectItem>
                <SelectItem value="firstname">First Name</SelectItem>
                <SelectItem value="lastname">Last Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mt-8">
            {/* Results Header */}
            <div className="bg-gray-200 p-4 flex items-center justify-between mb-0">
              <span className="text-sm text-gray-700">Results: 1-11 of 11</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Page:</span>
                <Select defaultValue="1">
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 of 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Table */}
            <div className="border border-gray-300 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-900 border-r border-gray-300">Username</th>
                    <th className="text-left p-3 font-medium text-gray-900 border-r border-gray-300">Name</th>
                    <th className="text-left p-3 font-medium text-gray-900 border-r border-gray-300">Email</th>
                    <th className="text-left p-3 font-medium text-gray-900 border-r border-gray-300">Location</th>
                    <th className="text-left p-3 font-medium text-gray-900">Is Active</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={index} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="p-3 border-r border-gray-300">
                        <button
                          onClick={() => handleUsernameClick(user.username)}
                          className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {user.username}
                        </button>
                      </td>
                      <td className="p-3 border-r border-gray-300">{user.name}</td>
                      <td className="p-3 border-r border-gray-300">{user.email}</td>
                      <td className="p-3 border-r border-gray-300 whitespace-pre-line">{user.location}</td>
                      <td className="p-3">{user.isActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
