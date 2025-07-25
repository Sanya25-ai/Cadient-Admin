export interface Application {
  id: string
  name: string
  position: string
  status: string
  appliedDate: string
  location: string
  smartScore: number
  availability: string
  hiringManager: string
  phone: string
  email: string
  ssn: string
  source: string
  currentLocation?: string
  jobWebsite?: string
  applicationMethod?: string
  startDate?: string
  workPreference?: string
  taxCreditType?: string
  taxCreditValue?: string
  wotcStatus?: string
  former?: string
  rehire?: string
  hiringStep?: string
  partner?: string
  assessmentStatus?: "Passed" | "Failed" | "Not Started"
  assessmentScore?: number
  assessmentDate?: string
  assessmentNotes?: string
}

// Define the interface for Application Pool candidates based on the actual table structure
export interface ApplicationPoolCandidate {
  id: string
  name: string
  appliedDate: string
  position: string
  location: string
  decisionPoint?: string
  wotcStatus: string
  formerEmployee: string
  rehireEligible: string
  score: string
  scorePercent: string
  hiringStep: string
  
  // Additional extracted details from popup/detail sections
  phone?: string
  email?: string
  workPreference?: string
  city?: string
  state?: string
  applicationType?: string
  status?: string
  esteemStatus?: string
  exclusive?: string
  dateAvailableToStart?: string
  genericSource?: string
  specificSource?: string
  ssn?: string
  address?: string
  zipCode?: string
  
  // Calculated/derived fields
  smartScore: number
  availability: string
  assessmentStatus: 'Not Started' | 'Failed' | 'Passed'
  assessmentScore: number
  assessmentDate?: string
  assessmentNotes?: string
  
  // Raw data for debugging and future use
  rawData?: {
    headers: string[]
    cells: Array<{
      text: string
      html: string
    }>
    columnMap: { [key: string]: number }
    allExtractedFields?: { [key: string]: any }
  }
  
  // Any other dynamic fields that might be extracted
  [key: string]: any
}

export interface ApplicationHistory {
  id: string
  date: string
  status: string
  modifiedBy: string
  description: string
}

export interface Hire {
  id: string
  name: string
  hired: string
  position: string
  hiredLocation: string
  formerEmployee?: string
  rehireEligible?: string
  score?: number
  percentageScore?: number
  eVerifyStatus?: string
  wotcStatus?: string
  department?: string
  status?: string
  manager?: string
  onboardingProgress?: number
}

export interface Prospect {
  id: string
  name: string
  source: string
  potentialPosition: string
  location: string
  status: string
  matchScore: number
  lastContact: string
  recruiter: string
}

export interface AvailabilityCandidate {
  id: string
  name: string
  position: string
  location: string
  availability: string
  matchScore: number
  startDate: string
  hiringManager: string
}

export interface TopApplicant {
  id: string
  name: string
  appliedDate: string
  position: string
  location: string
  status: string
  smartScore: number | null
  score: number | null
  percentageScore: number | null
  availability: string
  wotcStatus: string
  hiringStep: string
  // Additional detailed fields extracted from backend
  email?: string
  phone?: string
  city?: string
  state?: string
  applicationType?: string
  exclusive?: string
  esteemStatus?: string
  workPreference?: string
  startDate?: string
  tags?: string[]
  availabilitySchedule?: Array<{ day: string; time: string }>
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  title: string
  department: string
  bio?: string
}

export interface SystemSettings {
  companyName: string
  companyEmail: string
  companyPhone: string
  companyWebsite: string
  defaultTimeZone: string
  defaultLanguage: string
  enableSmartScreening: boolean
  enableTaxCreditScreening: boolean
  enableAutomatedEmails: boolean
}

export interface DashboardStats {
  totalRequisitions: number
  requisitionsIncrease: number
  totalCandidates: number
  candidatesIncrease: number
  positionsFilled: number
  positionsFilledIncrease: number
}

export interface RequisitionCategory {
  name: string
  count: number
  color: string
}

export interface DashboardCharts {
  requisitionCategories: RequisitionCategory[]
}

export interface DashboardTask {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
}
