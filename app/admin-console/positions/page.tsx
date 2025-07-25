"use client"

import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Position data matching the screenshot
const positionsData = [
  {
    id: '1',
    name: 'Administrative Associate Accounting',
    description: 'Join a very strong, supportive team to start your career as an Accountant.',
    availableInHMC: 'No',
    jobCode: 'Associate',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '2',
    name: 'Ambulance Driver',
    description: '',
    availableInHMC: 'Yes',
    jobCode: 'Driver',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '3',
    name: 'Bartender',
    description: 'Competitive pay and great benefits including medical, dental and vision coverage for eligible employees/Delicious daily family meal/Up to 50% meal discount at Mina Group restaurants/Pr...',
    availableInHMC: 'No',
    jobCode: 'Bartender',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '4',
    name: 'BookKeeper',
    description: 'Job Duties:Pay Client\'s Bills on a Weekly BasisBank Statement ReconciliationBudget ManagementCash Flow ManagementJournal and Data Entry (Coding)Provide Client with Weekly & Mo...',
    availableInHMC: 'No',
    jobCode: 'Bookkeeper',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '5',
    name: 'Call Center Representative',
    description: 'Politely answer inbound sales calls and provide accurate, satisfactory answers to customer inquiries or to obtain information for reservations/rental/Generate customer interest in th...',
    availableInHMC: 'Yes',
    jobCode: 'Representative',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '6',
    name: 'Cook',
    description: 'Store, prepare, cook, and properly plate all food items in accordance with all local and franchise Standard Operating Procedures (SOP) regulations.ESSENTIAL DUTIES AND RESPONSIBILI...',
    availableInHMC: 'No',
    jobCode: 'Cook',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '7',
    name: 'Customer Service Associate',
    description: 'Customer Experience/Engages customers and patients by greeting them and offering assistance with products and services. Resolves customer issues and answers questions to ensure a po...',
    availableInHMC: 'Yes',
    jobCode: 'Associate',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '8',
    name: 'Floor Nurse',
    description: 'Our goal is a focus on quality care and excellent customer service for the staff & the patients alike. A little about our Facility: We have 200 beds, multiple levels of care an...',
    availableInHMC: 'No',
    jobCode: 'Nurse',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: true
  },
  {
    id: '9',
    name: 'Inventory Specialist',
    description: 'As an inventory specialist, you\'ll make sure that we have the products our patients and customers depend on every day. Using innovative technology, you\'ll empower inven...',
    availableInHMC: 'Yes',
    jobCode: 'Specialist',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  },
  {
    id: '10',
    name: 'Line Cook',
    description: 'Responsible for preparing all mise-en-place for station and working service. Responsible for all vegetable accomplishments for protein dishes. Involved in the development of tasting ...',
    availableInHMC: 'No',
    jobCode: 'Cook',
    hiringProcess: 'Staff Hourly',
    sensitiveJob: false
  }
]

interface Position {
  id: string
  name: string
  description: string
  availableInHMC: string
  jobCode: string
  hiringProcess: string
  sensitiveJob: boolean
}

export default function PositionsPage() {
  const router = useRouter()
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [currentView, setCurrentView] = useState<'list' | 'edit' | 'create' | 'changeLogs' | 'locations' | 'payDetails'>('list')
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showChangeDetailsModal, setShowChangeDetailsModal] = useState(false)
  const [selectedChangeLog, setSelectedChangeLog] = useState<any>(null)
  const [showDiffViewerModal, setShowDiffViewerModal] = useState(false)
  const [showHiringProcessModal, setShowHiringProcessModal] = useState(false)
  const [showLocationFinderModal, setShowLocationFinderModal] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Chicago–Headquarters (Store 6)', 'USA (USA1)'])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showGapTrackingModal, setShowGapTrackingModal] = useState(false)
  const [cumulativeGapTracking, setCumulativeGapTracking] = useState('no')
  const [intervalGapTracking, setIntervalGapTracking] = useState('no')
  const [cumulativeYears, setCumulativeYears] = useState('1')
  const [intervalDays, setIntervalDays] = useState('30')
  const [showPayDetailsSuccessMessage, setShowPayDetailsSuccessMessage] = useState(false)
  const [showPayDetailsDeleteMessage, setShowPayDetailsDeleteMessage] = useState(false)
  const [payDetailsData, setPayDetailsData] = useState([
    {
      id: 1,
      country: 'United States of America',
      stateProvince: 'Alabama',
      payRateType: 'Salaried',
      payMinimum: '$12.00',
      payMaximum: '$25.00'
    }
  ])
  const [selectedCountry, setSelectedCountry] = useState('-------------------')
  const [editingPayDetail, setEditingPayDetail] = useState<any>(null)
  const [editPayDetailForm, setEditPayDetailForm] = useState({
    country: '',
    state: '',
    payRateType: '',
    payMinimum: '',
    payMaximum: ''
  })
  const [addNewPayDetailForm, setAddNewPayDetailForm] = useState({
    country: '-------------------',
    state: 'choose one...',
    payRateType: 'choose one...',
    payMinimum: '',
    payMaximum: ''
  })

  // Sample change logs data
  const changeLogsData = [
    {
      id: 1,
      modifiedOn: 'Aug 15, 2024 (9:21 PM)',
      modifiedBy: 'Anurag Nag - ANURAG_UAT_ADMIN',
      locale: 'English',
      fieldsModified: 'Description',
      oldValue: 'Join a very strong, supportive team to start your career as an Accountant.',
      newValue: 'Join a very strong, supportive team to start your career as an Accountant.'
    },
    {
      id: 2,
      modifiedOn: 'Aug 15, 2024 (9:21 PM)',
      modifiedBy: 'Anurag Nag - ANURAG_UAT_ADMIN',
      locale: 'English',
      fieldsModified: 'Description',
      oldValue: 'Join a very strong, supportive team to start your career as an Accountant.',
      newValue: 'Join a very strong, supportive team to start your career as an Accountant.'
    },
    {
      id: 3,
      modifiedOn: 'Aug 15, 2024 (9:21 PM)',
      modifiedBy: 'Anurag Nag - ANURAG_UAT_ADMIN',
      locale: 'English',
      fieldsModified: 'Description',
      oldValue: 'Join a very strong, supportive team to start your career as an Accountant.',
      newValue: 'Join a very strong, supportive team to start your career as an Accountant.'
    },
    {
      id: 4,
      modifiedOn: 'Jul 9, 2020 (7:00 AM)',
      modifiedBy: 'Shirley Recruiter - SHIRLEY.RECRUITER@GMAIL.COM',
      locale: 'English',
      fieldsModified: 'Description',
      oldValue: 'Join a very strong, supportive team to start your career as an Accountant.',
      newValue: 'Join a very strong, supportive team to start your career as an Accountant.'
    },
    {
      id: 5,
      modifiedOn: 'Jul 2, 2020 (3:53 PM)',
      modifiedBy: 'Shirley Recruiter - SHIRLEY.RECRUITER@GMAIL.COM',
      locale: 'English',
      fieldsModified: 'Requirements\nDescription\nTitle',
      oldValue: 'Join a very strong, supportive team to start your career as an Accountant.',
      newValue: 'Join a very strong, supportive team to start your career as an Accountant.'
    }
  ]

  const handlePositionClick = (position: Position) => {
    setSelectedPosition(position)
    setEditingPosition(position)
    setCurrentView('edit')
  }

  const handleCreateNew = () => {
    setEditingPosition(null)
    setCurrentView('create')
  }

  const handleSave = () => {
    console.log('Saving position')
    setShowSuccessMessage(true)
    setCurrentView('list')
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }

  const handleCancel = () => {
    setCurrentView('list')
    setEditingPosition(null)
  }

  const handleViewChangeLogs = (position: Position) => {
    setSelectedPosition(position)
    setCurrentView('changeLogs')
  }

  const handleViewChangeDetails = (changeLog: any) => {
    setSelectedChangeLog(changeLog)
    setShowChangeDetailsModal(true)
  }

  const handleBackToDetails = () => {
    setCurrentView('edit')
  }

  const handleShowDiffViewer = () => {
    setShowDiffViewerModal(true)
  }

  const handleViewHiringProcess = (position: Position) => {
    setShowHiringProcessModal(true)
  }

  const handleAddEditLocations = (position: Position) => {
    setSelectedPosition(position)
    setCurrentView('locations')
  }

  const handleAddEditPayDetails = (position: Position) => {
    setSelectedPosition(position)
    setCurrentView('payDetails')
  }

  const handleMultiLanguage = (position: Position) => {
    console.log('Multi-language for:', position.name)
  }

  if (currentView === 'edit' || currentView === 'create') {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {editingPosition?.name || 'Create New Position'}
            </h1>
            <Button
              onClick={() => editingPosition && handleViewChangeLogs(editingPosition)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              📋 View Change Logs
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * Job Code:
                </label>
                <Input
                  defaultValue={editingPosition?.jobCode || ''}
                  placeholder="Enter job code"
                  className="max-w-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * Hiring Process:
                </label>
                <select className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2">
                  <option value="Staff Hourly">Staff Hourly</option>
                  <option value="HireNow">HireNow</option>
                  <option value="Hourly with EVerify and Offer Letter">Hourly with EVerify and Offer Letter</option>
                  <option value="Hourly with Secondary Assessments">Hourly with Secondary Assessments</option>
                  <option value="Hourly with SparkHire Video Interview">Hourly with SparkHire Video Interview</option>
                  <option value="Hybrid OFCCP">Hybrid OFCCP</option>
                  <option value="Hybrid OFCCP with Video Interview">Hybrid OFCCP with Video Interview</option>
                  <option value="Req with Offer Letter_Hourly">Req with Offer Letter_Hourly</option>
                  <option value="Simplified Hiring Process with Onboarding">Simplified Hiring Process with Onboarding</option>
                </select>
                <Button
                  onClick={() => editingPosition && handleViewHiringProcess(editingPosition)}
                  className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                  size="sm"
                >
                  View this Hiring Process
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display In the HMC?
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="displayInHMC"
                      value="yes"
                      defaultChecked={editingPosition?.availableInHMC === 'Yes'}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="displayInHMC"
                      value="no"
                      defaultChecked={editingPosition?.availableInHMC === 'No'}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sensitive Job?
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sensitiveJob"
                      value="yes"
                      defaultChecked={editingPosition?.sensitiveJob}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sensitiveJob"
                      value="no"
                      defaultChecked={!editingPosition?.sensitiveJob}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Posting Details */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Posting Details</h3>
              <p className="text-sm text-gray-700 mb-4">
                Select the candidate career sites where the job should be posted. Then, select the category under which this position should appear on the career site. To activate this position, it must be associated to a location from within the Location tool.
              </p>
              <p className="text-sm text-gray-700 mb-6">
                Additionally, a prescreener or multiple prescreeners may be attached to the position. Note: For positions appearing on multiple career sites, different prescreeners may be selected per site.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium">Select</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium">Site</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium">Prescreener</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Sales Demo Retail Omega Non-Req External Seeker Site</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select className="w-full border border-gray-300 rounded px-2 py-1">
                          <option>Corporate Office</option>
                          <option>Back of House</option>
                          <option>Distribution Center</option>
                          <option>Front of House</option>
                          <option>Healthcare</option>
                          <option>Manufacturing</option>
                          <option>Retail</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select className="w-full border border-gray-300 rounded px-2 py-1">
                          <option>Accountant</option>
                          <option>Driver's License Confirmation</option>
                          <option>License Required</option>
                          <option>Pharmacist prescreener</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Sales Demo Retail Omega Non-Req HireNow</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select className="w-full border border-gray-300 rounded px-2 py-1">
                          <option>-------------------</option>
                          <option>Back of House</option>
                          <option>Corporate Office</option>
                          <option>Distribution Center</option>
                          <option>Front of House</option>
                          <option>Healthcare</option>
                          <option>Manufacturing</option>
                          <option>Retail</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select className="w-full border border-gray-300 rounded px-2 py-1">
                          <option>Accountant</option>
                          <option>Driver's License Confirmation</option>
                          <option>License Required</option>
                          <option>Pharmacist prescreener</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">Sales Demo Retail Omega Non-Req Internal Seeker Site</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select className="w-full border border-gray-300 rounded px-2 py-1">
                          <option>-------------------</option>
                          <option>Back of House</option>
                          <option>Corporate Office</option>
                          <option>Distribution Center</option>
                          <option>Front of House</option>
                          <option>Healthcare</option>
                          <option>Manufacturing</option>
                          <option>Retail</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select className="w-full border border-gray-300 rounded px-2 py-1">
                          <option>Accountant</option>
                          <option>Driver's License Confirmation</option>
                          <option>License Required</option>
                          <option>Pharmacist prescreener</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gap Tracking */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Gap Tracking</h3>
              <p className="text-sm text-gray-700 mb-4">
                Select whether gap tracking should be enabled for this position. If "Yes" is selected for either setting, the candidate may be asked to provide an explanation for a 'gap' in their work history. The fact that a gap in employment exists and the candidate explanation will be visible within the candidate's record in the HMC.
              </p>
              <p className="text-sm text-gray-700 mb-6">
                The 'Cumulative' setting will consider the total time an applicant was not employed within his entire work history. The 'Interval' setting will consider any time not employed between individual positions.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enable Cumulative Gap Tracking?
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="cumulativeGap" 
                        value="yes" 
                        className="mr-2"
                        checked={cumulativeGapTracking === 'yes'}
                        onChange={(e) => {
                          setCumulativeGapTracking(e.target.value)
                          if (e.target.value === 'yes' || intervalGapTracking === 'yes') {
                            setShowGapTrackingModal(true)
                          }
                        }}
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="cumulativeGap" 
                        value="no" 
                        className="mr-2"
                        checked={cumulativeGapTracking === 'no'}
                        onChange={(e) => setCumulativeGapTracking(e.target.value)}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enable Interval Gap Tracking?
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="intervalGap" 
                        value="yes" 
                        className="mr-2"
                        checked={intervalGapTracking === 'yes'}
                        onChange={(e) => {
                          setIntervalGapTracking(e.target.value)
                          if (e.target.value === 'yes' || cumulativeGapTracking === 'yes') {
                            setShowGapTrackingModal(true)
                          }
                        }}
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="intervalGap" 
                        value="no" 
                        className="mr-2"
                        checked={intervalGapTracking === 'no'}
                        onChange={(e) => setIntervalGapTracking(e.target.value)}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Roles</h3>
              <p className="text-sm text-gray-700 mb-4">
                Access to this position can be controlled via user role. Select the appropriate access privileges for each listed role.
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Full Access:</strong> Users will see this position within the HMC and be able to take workflow actions against candidates who applied to this position.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>View Only:</strong> Users will see this position within the HMC but cannot take actions against any candidates for this position.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>No Access:</strong> This position will not be visible within the HMC for users.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium">Role</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-medium">Full Access</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-medium">View Only</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-medium">No Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Calendar Integration Interview Scheduling',
                      'Regional Manager Organizer',
                      'Sales Demo Retail Omega Approver',
                      'Sales Demo Retail Omega eQuest Manager',
                      'Sales Demo Retail Omega Hiring Manager',
                      'Sales Demo Retail Omega Hiring Manager Everify',
                      'Sales Demo Retail Omega Hourly Recruiter',
                      'Sales Demo Retail Omega Hourly Recruiter Everify',
                      'Sales Demo Retail Omega Hourly System Admin',
                      'Sales Demo Retail Omega Recruiter',
                      'Workforce Hiring Analytics',
                      'Workforce Hiring Analytics - Legal',
                      'Workforce Hiring Analytics - Requisition'
                    ].map((role, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{role}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <input type="radio" name={`role-${index}`} value="full" defaultChecked />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <input type="radio" name={`role-${index}`} value="view" />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <input type="radio" name={`role-${index}`} value="none" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => editingPosition && handleAddEditLocations(editingPosition)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Add/Edit Locations
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Update
              </Button>
              <Button 
                onClick={handleCancel}
                variant="destructive"
              >
                Cancel
              </Button>
            </div>

            <Button 
              onClick={() => editingPosition && handleAddEditPayDetails(editingPosition)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Add/Edit Pay Details
            </Button>

            {/* Position Details Form */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * What is the name of this position?
                </label>
                <p className="text-xs text-gray-500 mb-2">Note: This name will appear in the HMC and on candidate career sites.</p>
                <Input
                  defaultValue={editingPosition?.name || 'Administrative Associate Accounting'}
                  className="max-w-md"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please provide a description for this position as it should appear for candidates.
                </label>
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2 text-sm">
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">✂️</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">📋</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">📄</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">💾</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">🖨️</button>
                    <span className="mx-2">|</span>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded font-bold">B</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded italic">I</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded underline">U</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">S</button>
                    <span className="mx-2">|</span>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Font</option>
                    </select>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Size</option>
                    </select>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Styles</option>
                    </select>
                  </div>
                  <Textarea
                    defaultValue="Join a very strong, supportive team to start your career as an Accountant."
                    rows={6}
                    className="border-0 rounded-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please provide the requirements for this position as it should appear for candidates.
                </label>
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2 text-sm">
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">✂️</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">📋</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">📄</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">💾</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">🖨️</button>
                    <span className="mx-2">|</span>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded font-bold">B</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded italic">I</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded underline">U</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">S</button>
                    <span className="mx-2">|</span>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Font</option>
                    </select>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Size</option>
                    </select>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Styles</option>
                    </select>
                  </div>
                  <Textarea
                    defaultValue="• The Entry Level Accountant performs general ledger, accounts receivable and accounts payable entries

• The Entry Level Accountant will compile and analyze financial information to prepare entries to general ledger accounts.

• The Entry Level Accountant will also assist in month-end, quarter-end and year-end closing activities.

• Analyze financial information detailing assets, liabilities, and capital. • Prepare balance sheet, profit and loss statement, and other reports to summarize current and projected company financial position.

• Prepare reports to substantiate individual transactions prior to monthly close process.

Minimum Requirements

EXPERIENCE PREFERRED FOR THE ENTRY LEVEL ACCOUNTANT

• BS (or in progress) in Accounting or Finance

• 0-3 years General Accounting

• Attention to detail

• Excellent written and verbal communication skills

• Team player"
                    rows={8}
                    className="border-0 rounded-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video HTML
                </label>
                <Textarea
                  rows={4}
                  className="w-full"
                  placeholder="Enter video HTML code here..."
                />
                <button className="text-orange-500 text-sm mt-2">▶ Preview Video</button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position-Specific Interview Questions
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Enter any standard questions to be asked by the hiring manager regarding this position when interviewing the candidate in person. Text entered in this area will appear exactly as it appears below within the Interview Questions on the candidate's record in the HMC.
                </p>
                <div className="border border-gray-300 rounded">
                  <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2 text-sm">
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">✂️</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">📋</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">📄</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">💾</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">🖨️</button>
                    <span className="mx-2">|</span>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded font-bold">B</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded italic">I</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded underline">U</button>
                    <button className="px-2 py-1 hover:bg-gray-200 rounded">S</button>
                    <span className="mx-2">|</span>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Font</option>
                    </select>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Size</option>
                    </select>
                    <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Styles</option>
                    </select>
                  </div>
                  <Textarea
                    rows={4}
                    className="border-0 rounded-none"
                    placeholder="Enter interview questions here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gap Tracking Modal */}
        {showGapTrackingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Gap Tracking</h2>
                <button
                  onClick={() => setShowGapTrackingModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-sm text-gray-700 mb-4">
                  Select whether gap tracking should be enabled for this position. If "Yes" is selected for either setting, the candidate may be asked to provide an explanation for a 'gap' in their work history. The fact that a gap in employment exists and the candidate explanation will be visible within the candidate's record in the HMC.
                </p>
                <p className="text-sm text-gray-700 mb-6">
                  The 'Cumulative' setting will consider the total time an applicant was not employed within his entire work history. The 'Interval' setting will consider any time not employed between individual positions.
                </p>

                <div className="space-y-6">
                  {/* Cumulative Gap Tracking */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enable Cumulative Gap Tracking?
                    </label>
                    <div className="flex items-center gap-4 mb-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="modalCumulativeGap" 
                          value="yes" 
                          className="mr-2"
                          checked={cumulativeGapTracking === 'yes'}
                          onChange={(e) => setCumulativeGapTracking(e.target.value)}
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="modalCumulativeGap" 
                          value="no" 
                          className="mr-2"
                          checked={cumulativeGapTracking === 'no'}
                          onChange={(e) => setCumulativeGapTracking(e.target.value)}
                        />
                        No
                      </label>
                    </div>
                    
                    {cumulativeGapTracking === 'yes' && (
                      <div className="ml-4 p-4 bg-gray-50 rounded border">
                        <p className="text-sm text-gray-700 mb-3">
                          * Cumulative Gap Tracking - Requires explanation if a gap of more than entered # of years exists across total work experience
                        </p>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700">Years:</label>
                          <input 
                            type="number"
                            value={cumulativeYears}
                            onChange={(e) => setCumulativeYears(e.target.value)}
                            className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interval Gap Tracking */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enable Interval Gap Tracking?
                    </label>
                    <div className="flex items-center gap-4 mb-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="modalIntervalGap" 
                          value="yes" 
                          className="mr-2"
                          checked={intervalGapTracking === 'yes'}
                          onChange={(e) => setIntervalGapTracking(e.target.value)}
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="modalIntervalGap" 
                          value="no" 
                          className="mr-2"
                          checked={intervalGapTracking === 'no'}
                          onChange={(e) => setIntervalGapTracking(e.target.value)}
                        />
                        No
                      </label>
                    </div>
                    
                    {intervalGapTracking === 'yes' && (
                      <div className="ml-4 p-4 bg-gray-50 rounded border">
                        <p className="text-sm text-gray-700 mb-3">
                          * Interval Gap Tracking - Requires explanation if a gap of more than entered # of days exists between jobs
                        </p>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-700">Days:</label>
                          <input 
                            type="number"
                            value={intervalDays}
                            onChange={(e) => setIntervalDays(e.target.value)}
                            className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gap Tracking Exclusions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Gap Tracking Exclusions</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Gap tracking can be turned off for this position on specific career sites. To disable gap tracking for this position on a specific career site, check the box next to the site name.
                    </p>
                    
                    <div className="border border-gray-300 rounded">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-300">
                            <th className="text-left p-3 font-medium text-gray-900">Exclude</th>
                            <th className="text-left p-3 font-medium text-gray-900">Site</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="p-3">
                              <input type="checkbox" className="rounded" />
                            </td>
                            <td className="p-3 text-sm text-gray-900">Sales Demo Retail Omega Non-Req External Seeker Site</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-3">
                              <input type="checkbox" className="rounded" />
                            </td>
                            <td className="p-3 text-sm text-gray-900">Sales Demo Retail Omega Non-Req HireNow</td>
                          </tr>
                          <tr>
                            <td className="p-3">
                              <input type="checkbox" className="rounded" />
                            </td>
                            <td className="p-3 text-sm text-gray-900">Sales Demo Retail Omega Non-Req Internal Seeker Site</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Hiring Process Modal */}
        {showHiringProcessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-200 rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-gray-200">
                <h2 className="text-2xl font-bold text-black">Staff Hourly</h2>
                <button
                  onClick={() => setShowHiringProcessModal(false)}
                  className="text-black hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content - Workflow Diagram */}
              <div className="p-6 bg-gray-200">
                {/* Review Application Step */}
                <div className="flex flex-col items-center mb-8">
                  <div className="text-green-600 text-2xl mb-2">↓</div>
                  <div className="bg-white border border-gray-400 rounded p-4 w-96">
                    <h3 className="font-bold text-lg mb-3">Review Application</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-medium">Interest</span>
                        <span className="text-green-600">→</span>
                      </div>
                      <div className="text-gray-700">No Interest - Availability</div>
                      <div className="text-gray-700">No Interest - Others Better Qualified</div>
                      <div className="text-gray-700">No Interest - Do Not Send to Pool</div>
                      <div className="text-gray-700">Send to Pool</div>
                    </div>
                  </div>
                </div>

                {/* Phone Screen Step */}
                <div className="flex flex-col items-center mb-8">
                  <div className="text-green-600 text-2xl mb-2">↓</div>
                  <div className="bg-white border border-gray-400 rounded w-96">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-3">Phone Screen</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">Favorable Phone Screen</span>
                          <span className="text-green-600">→</span>
                        </div>
                        <div className="text-gray-700">Unfavorable Phone Screen</div>
                        <div className="text-gray-700">Candidate Withdrew Interest</div>
                        <div className="text-gray-700">Could Not Contact</div>
                        <div className="text-gray-700">Left Message</div>
                        <div className="text-gray-700">Send to Pool</div>
                      </div>
                    </div>
                    <div className="bg-gray-400 p-3">
                      <div className="flex items-center">
                        <span className="text-black mr-2">▼</span>
                        <span className="text-red-500 font-medium">Dependencies</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        This workflow will not appear until the following conditions have been met.
                      </div>
                      <div className="bg-gray-300 p-2 mt-2 rounded">
                        <div className="font-medium">Review Application</div>
                        <div className="text-sm">Interest</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditional Offer Letter Step */}
                <div className="flex flex-col items-center mb-8">
                  <div className="text-green-600 text-2xl mb-2">↓</div>
                  <div className="bg-white border border-gray-400 rounded w-96">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-3">Conditional Offer Letter</h3>
                      <div className="space-y-2 text-sm">
                        <div className="text-gray-700">No Offer-Candidate withdrew interest</div>
                        <div className="text-gray-700">No Offer - Others Better Qualified</div>
                        <div className="text-gray-700">Start Offer</div>
                        <div className="text-gray-700">Offer Extended / E-signed</div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">Offer Accepted</span>
                          <span className="text-green-600">→</span>
                        </div>
                        <div className="text-gray-700">Offer Declined-Accepted offer with another company</div>
                        <div className="text-gray-700">Offer Declined-Benefits</div>
                        <div className="text-gray-700">Offer Declined-Company environment</div>
                        <div className="text-gray-700">Offer Declined-Company requirements</div>
                        <div className="text-gray-700">Offer Declined-Did not specify</div>
                        <div className="text-gray-700">Offer Declined-Nature of job</div>
                        <div className="text-gray-700">Offer Declined-Pay</div>
                        <div className="text-gray-700">Offer Declined-Personal reasons</div>
                        <div className="text-gray-700">Offer Declined-Withdrew interest</div>
                      </div>
                    </div>
                    <div className="bg-gray-400 p-3">
                      <div className="flex items-center">
                        <span className="text-black mr-2">▼</span>
                        <span className="text-red-500 font-medium">Dependencies</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        This workflow will not appear until the following conditions have been met.
                      </div>
                      <div className="bg-gray-300 p-2 mt-2 rounded">
                        <div className="font-medium">Phone Screen</div>
                        <div className="text-sm">Favorable Phone Screen</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drug Screening and Background Check - Side by Side */}
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-green-600 text-2xl">↓</div>
                  <div className="text-green-600 text-2xl">↓</div>
                </div>
                <div className="flex justify-center gap-8 mb-8">
                  {/* Drug Screening */}
                  <div className="bg-white border border-gray-400 rounded w-80">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-3">Drug Screening</h3>
                      <div className="space-y-2 text-sm">
                        <div className="text-gray-700">Initiate Drug Check</div>
                        <div className="text-gray-700">Drug Check Pending</div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">Pass</span>
                          <span className="text-green-600">→</span>
                        </div>
                        <div className="text-gray-700">Fail</div>
                        <div className="text-gray-700">Retest</div>
                      </div>
                    </div>
                    <div className="bg-gray-400 p-3">
                      <div className="flex items-center">
                        <span className="text-black mr-2">▼</span>
                        <span className="text-red-500 font-medium">Dependencies</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        This workflow will not appear until the following conditions have been met.
                      </div>
                      <div className="bg-gray-300 p-2 mt-2 rounded">
                        <div className="font-medium">Conditional Offer Letter</div>
                        <div className="text-sm">Offer Accepted</div>
                      </div>
                    </div>
                  </div>

                  {/* Background Check */}
                  <div className="bg-white border border-gray-400 rounded w-80">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-3">Background Check</h3>
                      <div className="space-y-2 text-sm">
                        <div className="text-gray-700">Initiate Background Check</div>
                        <div className="text-gray-700">Background Check Pending</div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">Pass</span>
                          <span className="text-green-600">→</span>
                        </div>
                        <div className="text-gray-700">Fail</div>
                        <div className="text-gray-700">HR Review</div>
                      </div>
                    </div>
                    <div className="bg-gray-400 p-3">
                      <div className="flex items-center">
                        <span className="text-black mr-2">▼</span>
                        <span className="text-red-500 font-medium">Dependencies</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        This workflow will not appear until the following conditions have been met.
                      </div>
                      <div className="bg-gray-300 p-2 mt-2 rounded">
                        <div className="font-medium">Conditional Offer Letter</div>
                        <div className="text-sm">Offer Accepted</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Onboarding Step */}
                <div className="flex flex-col items-center mb-8">
                  <div className="text-green-600 text-2xl mb-2">↓</div>
                  <div className="bg-white border border-gray-400 rounded w-96">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-3">Onboarding</h3>
                      <div className="space-y-2 text-sm">
                        <div className="text-gray-700">Begin Employee Onboarding</div>
                        <div className="text-gray-700">Employee Onboarding Complete</div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-medium">Manager Onboarding Complete</span>
                          <span className="text-green-600">→</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-400 p-3">
                      <div className="flex items-center">
                        <span className="text-black mr-2">▼</span>
                        <span className="text-red-500 font-medium">Dependencies</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        This workflow will not appear until the following conditions have been met.
                      </div>
                      <div className="bg-gray-300 p-2 mt-2 rounded">
                        <div className="font-medium">Background Check</div>
                        <div className="text-sm">Pass</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1 italic">and</div>
                      <div className="bg-gray-300 p-2 mt-1 rounded">
                        <div className="font-medium">Drug Screening</div>
                        <div className="text-sm">Pass</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hire Step */}
                <div className="flex flex-col items-center">
                  <div className="text-green-600 text-2xl mb-2">↓</div>
                  <div className="bg-white border border-gray-400 rounded w-96">
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-3">Hire</h3>
                      <div className="space-y-2 text-sm">
                        <div className="text-gray-700">Ready to hire</div>
                      </div>
                    </div>
                    <div className="bg-gray-400 p-3">
                      <div className="flex items-center">
                        <span className="text-black mr-2">▼</span>
                        <span className="text-red-500 font-medium">Dependencies</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">
                        This workflow will not appear until the following conditions have been met.
                      </div>
                      <div className="bg-gray-300 p-2 mt-2 rounded">
                        <div className="font-medium">Onboarding</div>
                        <div className="text-sm">Manager Onboarding Complete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Locations View
  if (currentView === 'locations') {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto p-8 pt-6">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add/Edit Locations</h1>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">
              This position will be available for the below listed locations. Please use the Location Finder to add additional locations. 
              <span className="italic">(Note: Locations without a state configured will not be associated to the position.)</span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-orange-500">🔍</span>
              <button
                onClick={() => setShowLocationFinderModal(true)}
                className="text-orange-500 hover:text-orange-600 underline"
              >
                Location Finder
              </button>
              <span className="text-gray-600">- Use the finder to select from a tree of locations</span>
            </div>
          </div>

          {/* Location List */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location:</label>
            <div className="border border-gray-300 rounded p-4 min-h-32">
              {selectedLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between bg-yellow-100 p-2 mb-2 rounded">
                  <span className="text-sm">{index + 1}. {location}</span>
                  <button
                    onClick={() => {
                      const newLocations = selectedLocations.filter((_, i) => i !== index)
                      setSelectedLocations(newLocations)
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Start typing to show a list"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={() => setShowLocationFinderModal(true)}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  ➕
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Save
            </Button>
            <Button 
              onClick={() => setCurrentView('edit')}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              📋 Back to Position Details
            </Button>
          </div>
        </div>

        {/* Location Finder Modal */}
        {showLocationFinderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-200">
                <h2 className="text-2xl font-semibold text-black">Location Finder</h2>
                <button
                  onClick={() => setShowLocationFinderModal(false)}
                  className="text-black hover:text-gray-600 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-lg text-gray-900 mb-6">Select a location from the tree below.</p>
                
                {/* Location Tree */}
                <div className="bg-gray-100 border border-gray-300 rounded p-4 min-h-64">
                  <div className="flex items-center gap-2 text-orange-500 cursor-pointer hover:text-orange-600">
                    <span>➕</span>
                    <span className="text-lg">USA (USA1)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Pay Details View
  if (currentView === 'payDetails') {
    const countries = [
      '-------------------',
      'United States of America',
      'Australia', 
      'Canada',
      'United Kingdom of Great Britain and Northern Ireland',
      'Republic of Ireland'
    ]

    const handleSavePayDetails = () => {
      setShowPayDetailsSuccessMessage(true)
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowPayDetailsSuccessMessage(false)
      }, 5000)
    }

    return (
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          {/* Success Message */}
          {showPayDetailsSuccessMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Confirmation</h3>
                <p className="text-green-700 text-sm">Pay Details saved successfully</p>
              </div>
              <button
                onClick={() => setShowPayDetailsSuccessMessage(false)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </div>
          )}

          {/* Delete Success Message */}
          {showPayDetailsDeleteMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Confirmation</h3>
                <p className="text-green-700 text-sm">Pay Details deleted successfully.</p>
              </div>
              <button
                onClick={() => setShowPayDetailsDeleteMessage(false)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </div>
          )}

          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add/Edit Pay Details</h1>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-700">
              The pay details below will be visible on the Candidate Experience and sent in job board exports. If pay details are not configured for a state/province, no pay details will be visible to applicants.
            </p>
          </div>

          {/* Results and Pagination */}
          <div className="flex items-center justify-between mb-4 bg-gray-100 p-4 rounded">
            <div className="text-sm text-gray-600">
              Results: 1-1 of 1
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 1</option>
              </select>
            </div>
          </div>

          {/* Pay Details Table */}
          <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Country</TableHead>
                  <TableHead className="font-semibold text-gray-900">State/Province</TableHead>
                  <TableHead className="font-semibold text-gray-900">Pay Rate Type</TableHead>
                  <TableHead className="font-semibold text-gray-900">Pay Minimum</TableHead>
                  <TableHead className="font-semibold text-gray-900">Pay Maximum</TableHead>
                  <TableHead className="font-semibold text-gray-900">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payDetailsData.map((payDetail) => (
                  <TableRow key={payDetail.id} className="border-b border-gray-200">
                    <TableCell className="text-gray-900 py-3">{payDetail.country}</TableCell>
                    <TableCell className="text-gray-900 py-3">{payDetail.stateProvince}</TableCell>
                    <TableCell className="text-gray-900 py-3">{payDetail.payRateType}</TableCell>
                    <TableCell className="text-gray-900 py-3">{payDetail.payMinimum}</TableCell>
                    <TableCell className="text-gray-900 py-3">{payDetail.payMaximum}</TableCell>
                    <TableCell className="text-gray-900 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditingPayDetail(payDetail)
                            setEditPayDetailForm({
                              country: payDetail.country,
                              state: payDetail.stateProvince,
                              payRateType: payDetail.payRateType,
                              payMinimum: payDetail.payMinimum.replace('$', ''),
                              payMaximum: payDetail.payMaximum.replace('$', '')
                            })
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <span className="text-gray-400">|</span>
                        <button 
                          onClick={() => {
                            // Remove the pay detail from the data
                            const updatedData = payDetailsData.filter(item => item.id !== payDetail.id)
                            setPayDetailsData(updatedData)
                            
                            // Show delete success message
                            setShowPayDetailsDeleteMessage(true)
                            setTimeout(() => setShowPayDetailsDeleteMessage(false), 5000)
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Edit Pay Detail Form */}
          {editingPayDetail && (
            <div className="mb-6 border-t border-gray-300 pt-6">
              <div className="grid grid-cols-5 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> Country:
                  </label>
                  <select 
                    value={editPayDetailForm.country}
                    onChange={(e) => setEditPayDetailForm({...editPayDetailForm, country: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> State:
                  </label>
                  <select 
                    value={editPayDetailForm.state}
                    onChange={(e) => setEditPayDetailForm({...editPayDetailForm, state: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> Pay Rate Type:
                  </label>
                  <select 
                    value={editPayDetailForm.payRateType}
                    onChange={(e) => setEditPayDetailForm({...editPayDetailForm, payRateType: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="Salaried">Salaried</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Commission">Commission</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> Pay Minimum $:
                  </label>
                  <input 
                    type="number"
                    value={editPayDetailForm.payMinimum}
                    onChange={(e) => setEditPayDetailForm({...editPayDetailForm, payMinimum: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> Pay Maximum $:
                  </label>
                  <input 
                    type="number"
                    value={editPayDetailForm.payMaximum}
                    onChange={(e) => setEditPayDetailForm({...editPayDetailForm, payMaximum: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="25"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button 
                  onClick={() => {
                    // Update the pay detail in the data
                    const updatedData = payDetailsData.map(item => 
                      item.id === editingPayDetail.id 
                        ? {
                            ...item,
                            country: editPayDetailForm.country,
                            stateProvince: editPayDetailForm.state,
                            payRateType: editPayDetailForm.payRateType,
                            payMinimum: `$${editPayDetailForm.payMinimum}`,
                            payMaximum: `$${editPayDetailForm.payMaximum}`
                          }
                        : item
                    )
                    setPayDetailsData(updatedData)
                    setEditingPayDetail(null)
                    setShowPayDetailsSuccessMessage(true)
                    setTimeout(() => setShowPayDetailsSuccessMessage(false), 5000)
                  }}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                >
                  ➕
                </button>
              </div>
            </div>
          )}

          {/* Add New Pay Details Form */}
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Country:
                </label>
                <select 
                  value={addNewPayDetailForm.country}
                  onChange={(e) => {
                    setAddNewPayDetailForm({...addNewPayDetailForm, country: e.target.value})
                    // Reset state when country changes
                    if (e.target.value !== addNewPayDetailForm.country) {
                      setAddNewPayDetailForm({
                        ...addNewPayDetailForm, 
                        country: e.target.value,
                        state: 'choose one...'
                      })
                    }
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country === addNewPayDetailForm.country && country !== '-------------------' ? `✓ ${country}` : country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> State/Territory:
                </label>
                <select 
                  value={addNewPayDetailForm.state}
                  onChange={(e) => setAddNewPayDetailForm({...addNewPayDetailForm, state: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  disabled={addNewPayDetailForm.country === '-------------------'}
                >
                  <option value="choose one...">choose one...</option>
                  {addNewPayDetailForm.country === 'United States of America' && (
                    <>
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                      <option value="Arkansas">Arkansas</option>
                      <option value="California">California</option>
                    </>
                  )}
                  {addNewPayDetailForm.country === 'Australia' && (
                    <>
                      <option value="Australian Capital Territory">Australian Capital Territory</option>
                      <option value="New South Wales">New South Wales</option>
                      <option value="Northern Territory">Northern Territory</option>
                      <option value="Queensland">Queensland</option>
                      <option value="South Australia">South Australia</option>
                      <option value="Tasmania">Tasmania</option>
                      <option value="Victoria">Victoria</option>
                      <option value="Western Australia">Western Australia</option>
                    </>
                  )}
                  {addNewPayDetailForm.country === 'Canada' && (
                    <>
                      <option value="Alberta">Alberta</option>
                      <option value="British Columbia">British Columbia</option>
                      <option value="Manitoba">Manitoba</option>
                      <option value="Ontario">Ontario</option>
                      <option value="Quebec">Quebec</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Pay Rate Type:
                </label>
                <select 
                  value={addNewPayDetailForm.payRateType}
                  onChange={(e) => setAddNewPayDetailForm({...addNewPayDetailForm, payRateType: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="choose one...">choose one...</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Pay Minimum $:
                </label>
                <input 
                  type="number"
                  value={addNewPayDetailForm.payMinimum}
                  onChange={(e) => setAddNewPayDetailForm({...addNewPayDetailForm, payMinimum: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Pay Maximum $:
                </label>
                <input 
                  type="number"
                  value={addNewPayDetailForm.payMaximum}
                  onChange={(e) => setAddNewPayDetailForm({...addNewPayDetailForm, payMaximum: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button 
                onClick={() => {
                  // Validate form
                  if (addNewPayDetailForm.country !== '-------------------' && 
                      addNewPayDetailForm.state !== 'choose one...' &&
                      addNewPayDetailForm.payRateType !== 'choose one...' &&
                      addNewPayDetailForm.payMinimum &&
                      addNewPayDetailForm.payMaximum) {
                    
                    // Add new pay detail to the data
                    const newPayDetail = {
                      id: payDetailsData.length + 1,
                      country: addNewPayDetailForm.country,
                      stateProvince: addNewPayDetailForm.state,
                      payRateType: addNewPayDetailForm.payRateType,
                      payMinimum: `$${addNewPayDetailForm.payMinimum}`,
                      payMaximum: `$${addNewPayDetailForm.payMaximum}`
                    }
                    
                    setPayDetailsData([...payDetailsData, newPayDetail])
                    
                    // Reset form
                    setAddNewPayDetailForm({
                      country: '-------------------',
                      state: 'choose one...',
                      payRateType: 'choose one...',
                      payMinimum: '',
                      payMaximum: ''
                    })
                    
                    // Show success message
                    setShowPayDetailsSuccessMessage(true)
                    setTimeout(() => setShowPayDetailsSuccessMessage(false), 5000)
                  }
                }}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
              >
                ➕
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setCurrentView('edit')}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              📋 Back to Position Details
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Change Logs View
  if (currentView === 'changeLogs') {
    return (
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Change Log List</h1>
            <Button
              onClick={handleBackToDetails}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              🔙 Back to Details Page
            </Button>
          </div>

          {/* Position Name */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{selectedPosition?.name}</h2>
            <p className="text-sm text-gray-600 mt-2">There are {changeLogsData.length} Change Logs</p>
          </div>

          {/* Results and Pagination */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Results: 1-{changeLogsData.length} of {changeLogsData.length}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Page:</span>
              <select className="border border-gray-300 rounded px-2 py-1">
                <option>1 of 1</option>
              </select>
            </div>
          </div>

          {/* Change Logs Table */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Modified On</TableHead>
                  <TableHead className="font-semibold text-gray-900">Modified By</TableHead>
                  <TableHead className="font-semibold text-gray-900">Locale</TableHead>
                  <TableHead className="font-semibold text-gray-900">Fields Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changeLogsData.map((log) => (
                  <TableRow 
                    key={log.id} 
                    className="border-b border-gray-200"
                  >
                    <TableCell className="text-gray-900 py-3">
                      <button
                        onClick={() => handleViewChangeDetails(log)}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {log.modifiedOn}
                      </button>
                    </TableCell>
                    <TableCell className="text-gray-900 py-3">{log.modifiedBy}</TableCell>
                    <TableCell className="text-gray-900 py-3">{log.locale}</TableCell>
                    <TableCell className="text-gray-900 py-3">
                      <div className="whitespace-pre-line">{log.fieldsModified}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Note */}
          <div className="mt-6 text-sm text-gray-600">
            <strong>Note:</strong> The change logs capture changes in Title, Description, Requirements and association with Assessments.
          </div>
        </div>

        {/* Change Details Modal */}
        {showChangeDetailsModal && selectedChangeLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">View Change Details</h2>
                <button
                  onClick={() => setShowChangeDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedPosition?.name}</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Saved by <span className="text-orange-500 font-medium">Anurag Nag</span> - Aug 15, 2024 (9:21 PM)
                </p>

                {/* Description Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Description</h4>
                    <Button 
                      onClick={handleShowDiffViewer}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                    >
                      📊 Show Diff Viewer
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Old Value</h5>
                      <div className="border border-gray-300 rounded p-4 bg-gray-50 min-h-32">
                        <p className="text-sm text-gray-900">{selectedChangeLog.oldValue}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">New Value</h5>
                      <div className="border border-gray-300 rounded p-4 bg-gray-50 min-h-32">
                        <p className="text-sm text-gray-900">{selectedChangeLog.newValue}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => setShowChangeDetailsModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diff Viewer Modal */}
        {showDiffViewerModal && selectedChangeLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-blue-600 text-white">
                <h2 className="text-lg font-semibold">Description</h2>
                <button
                  onClick={() => setShowDiffViewerModal(false)}
                  className="text-white hover:text-gray-200 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-0">
                <div className="border border-gray-300 rounded-none min-h-96 bg-white">
                  <div className="p-4 text-sm text-gray-900 font-mono whitespace-pre-wrap">
                    {selectedChangeLog.newValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-green-800 font-semibold">Confirmation</h3>
              <p className="text-green-700 text-sm">Position edited successfully</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#EE5A37]">Positions</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleCreateNew}
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a New Position
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Results: 1-{positionsData.length} of {positionsData.length}
            </div>
            <div className="flex items-center gap-2">
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search positions..."
                className="w-64"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Page:</span>
            <select className="border border-gray-300 rounded px-2 py-1">
              <option>1 of 1</option>
            </select>
          </div>
        </div>

        {/* Positions Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 w-1/3">Name</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/2">Description</TableHead>
                <TableHead className="font-semibold text-gray-900 w-1/6">Available in the HMC?</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positionsData.map((position) => (
                <TableRow key={position.id} className="border-b border-gray-200">
                  <TableCell className="font-medium text-gray-900 align-top py-3">
                    <button
                      onClick={() => handlePositionClick(position)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                    >
                      {position.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-700 align-top py-3 relative group">
                    <div className="cursor-pointer">
                      <div className="truncate max-w-md">
                        {position.description || 'No description available'}
                      </div>
                      {/* Hover Tooltip */}
                      {position.description && (
                        <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-96 max-w-2xl">
                          <div className="text-sm text-gray-900 whitespace-pre-wrap">
                            {position.description}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700 align-top py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      position.availableInHMC === 'Yes' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {position.availableInHMC}
                    </span>
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
