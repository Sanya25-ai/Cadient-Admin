import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Homepage Configuration - Cadient',
  description: 'Configure the homepage and quick search for different roles',
}

// Mock data matching the HMC interface
const roleConfigurationData = [
  {
    id: '1',
    name: 'Calendar Integration Interview Scheduling',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '2',
    name: 'Regional Manager Organizer',
    requisitionOnly: false,
    requisitionAndPosition: true,
    positionOnly: false
  },
  {
    id: '3',
    name: 'Sales Demo Retail Omega Approver',
    requisitionOnly: true,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '4',
    name: 'Sales Demo Retail Omega eQuest Manager',
    requisitionOnly: true,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '5',
    name: 'Sales Demo Retail Omega Hiring Manager',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: true
  },
  {
    id: '6',
    name: 'Sales Demo Retail Omega Hiring Manager Everly',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: true
  },
  {
    id: '7',
    name: 'Sales Demo Retail Omega Hourly System Admin',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: true
  },
  {
    id: '8',
    name: 'Sales Demo Retail Omega Recruiter',
    requisitionOnly: true,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '9',
    name: 'Sales Demo Retail Omega Recruiter Everly',
    requisitionOnly: true,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '10',
    name: 'Sales Demo Retail Omega System Admin',
    requisitionOnly: false,
    requisitionAndPosition: true,
    positionOnly: false
  },
  {
    id: '11',
    name: 'SD Hybrid Recruiter',
    requisitionOnly: false,
    requisitionAndPosition: true,
    positionOnly: false
  },
  {
    id: '12',
    name: 'SELF USER ASSOCIATION',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '13',
    name: 'Workforce Hiring Analytics',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '14',
    name: 'Workforce Hiring Analytics - Advanced',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '15',
    name: 'Workforce Hiring Analytics - Legal',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: false
  },
  {
    id: '16',
    name: 'Workforce Hiring Analytics - Requisition',
    requisitionOnly: false,
    requisitionAndPosition: false,
    positionOnly: false
  }
]

export default function HomepageConfigurationToolPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto p-8 pt-6">
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
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Homepage Configuration</h1>
          <p className="text-sm text-gray-600 mt-2">
            Configure the homepage and quick search for different roles.
          </p>
        </div>

        {/* Configuration Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 w-1/2 px-6 py-3"></TableHead>
                <TableHead className="font-semibold text-gray-900 text-center px-6 py-3">
                  Requisition Only
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-center px-6 py-3">
                  Requisition and Position
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-center px-6 py-3">
                  Position Only
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roleConfigurationData.map((role) => (
                <TableRow key={role.id} className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-900 px-6 py-3">
                    {role.name}
                  </TableCell>
                  <TableCell className="text-center px-6 py-3">
                    <input 
                      type="radio" 
                      name={`role-${role.id}`}
                      checked={role.requisitionOnly}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500"
                      readOnly
                    />
                  </TableCell>
                  <TableCell className="text-center px-6 py-3">
                    <input 
                      type="radio" 
                      name={`role-${role.id}`}
                      checked={role.requisitionAndPosition}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500"
                      readOnly
                    />
                  </TableCell>
                  <TableCell className="text-center px-6 py-3">
                    <input 
                      type="radio" 
                      name={`role-${role.id}`}
                      checked={role.positionOnly}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500"
                      readOnly
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start gap-4 mt-6">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
            Save
          </Button>
          <Button variant="outline" className="px-6">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
