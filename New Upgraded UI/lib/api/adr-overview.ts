import apiClient from '../api-client';

interface Address {
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface PhoneNumbers {
  home?: string;
  cell?: string;
  work?: string;
  alternate?: string;
  unformattedHome?: string;
  isHomePhoneMobile?: boolean;
  isCellPhoneMobile?: boolean;
  isWorkPhoneMobile?: boolean;
  isAlternatePhoneMobile?: boolean;
}

interface Metadata {
  dateCreated?: any;
  dateLastModified?: any;
  createdBy?: number;
  lastModifiedBy?: number;
  documentId?: number;
}

interface PersonContact {
  id?: string;
  version?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phones?: PhoneNumbers;
  address?: Address;
  source?: string;
  specificSource?: string;
  locale?: string;
  birthDate?: string;
  metadata?: Metadata;
}

interface DisplaySetValue {
  name?: string;
  localeDisplaySetValue?: Record<string, any>;
  displaySetValueExtensions?: any[];
  forcedDirty?: boolean;
  dataPopulated?: boolean;
}

interface CircularReference {
  reference: string;
}

interface PostingStatus extends DisplaySetValue {
  name: string;
}

interface JobCategory extends DisplaySetValue {
  name: string;
}

interface JobOpening {
  requisitionNumber?: string;
  pageFlowInstance?: number;
  processInstanceId?: number;
  numericRequisitionNumber?: number;
  requisitionStatus?: DisplaySetValue;
  noOfOpenings?: number;
  filledCount?: number;
  reasonForOpenings?: DisplaySetValue;
  creator?: any;
  hiringManager?: any;
  employmentStatus?: DisplaySetValue;
  payRateType?: DisplaySetValue;
  primaryRecruiterPerson?: any;
  turndownmailstatus?: string;
  id?: number;
  version?: number;
  jobCategory?: JobCategory;
  client?: any;
  hiringProcess?: any;
  description?: string;
  dateCreated?: CircularReference;
  dateLastModified?: CircularReference;
  createdBy?: number;
  lastModifiedBy?: number;
  guuid?: string;
  forcedDirty?: boolean;
  dataPopulated?: boolean;
}

interface PostingSite {
  id?: number;
  version?: number;
  name?: string;
  externId?: number;
  destinationType?: DisplaySetValue;
  application?: any;
  guuid?: string;
  dateCreated?: CircularReference;
  dateLastModified?: CircularReference;
  forcedDirty?: boolean;
  dataPopulated?: boolean;
}

interface Posting {
  showQualifiedTitle?: boolean;
  id?: number;
  version?: number;
  postingBeginDate?: CircularReference;
  postingEndDate?: CircularReference;
  isActive?: boolean;
  jobCategory?: JobCategory;
  postingStatus?: PostingStatus;
  postingSite?: PostingSite;
  jobOpening?: JobOpening;
  requisition?: any;
  guuid?: string;
  dateCreated?: CircularReference;
  dateLastModified?: CircularReference;
  createdBy?: number;
  lastModifiedBy?: number;
  postingCreator?: any;
  forcedDirty?: boolean;
  dataPopulated?: boolean;
}

interface Location {
  id?: string;
  HasLocationName?: boolean;
  name?: string;
  address?: Address;
}

interface AvailabilityDetails {
  startDate?: string;
  noticePeriod?: string;
  preferredShifts?: string[];
  weeklyHours?: number;
}

interface Availability {
  HasAvailability?: boolean;
  availabilityDetails?: AvailabilityDetails;
}

interface DecisionPointScores {
  skillMatch?: number;
  experienceMatch?: number;
  educationMatch?: number;
  overallScore?: number;
}

interface DecisionPointScore {
  groupRankScore?: string;
  scores?: DecisionPointScores;
}

interface SmartMatchCategories {
  technicalSkills?: number;
  experience?: number;
  education?: number;
  certifications?: number;
}

interface SmartMatchScore {
  overallScore?: number;
  categories?: SmartMatchCategories;
}

interface WorkHistoryEntry {
  employer?: string;
  position?: string;
  duration?: string;
  responsibilities?: string;
  technologies?: string[];
}

interface WorkHistory {
  HasWorkHistory?: boolean;
  entries?: WorkHistoryEntry[];
}

interface HiringProcess {
  HasHiringProcess?: boolean;
  currentStage?: string;
  status?: string;
  nextSteps?: string[];
  showHiringFlowStartLink?: boolean;
}

interface Qualification {
  IsQualified?: string;
}

interface AdrOverviewData {
  PersonContact?: PersonContact;
  Posting?: Posting;
  Location?: Location;
  Availability?: Availability;
  DecisionPointScore?: DecisionPointScore;
  SmartMatchScore?: SmartMatchScore;
  WorkHistory?: WorkHistory;
  HiringProcess?: HiringProcess;
  QUAL?: Qualification;
}

export interface AdrOverviewResponse {
  status: string;
  jobBidId: string;
  data?: AdrOverviewData;
  warnings?: string[];
}

function transformDisplayValue(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (value.reference === 'circular' || value.reference === 'max_depth_reached') {
      return '';
    }
    if (value.localeDisplaySetValue) {
      return value.name || '';
    }
    if (value.name) {
      return value.name.split('.').pop() || '';
    }
  }
  return String(value);
}

function transformPersonContact(rawData: any): PersonContact {
  if (!rawData) return {};
  return {
    id: String(rawData.id || ''),
    version: rawData.version,
    firstName: rawData.firstName || '',
    lastName: rawData.lastName || '',
    email: rawData.emailAddress || '',
    phones: {
      home: rawData.homePhone || '',
      cell: rawData.cellPhone || '',
      work: rawData.workPhone || '',
      alternate: rawData.alternatePhone || '',
      unformattedHome: rawData.unformattedHomePhone || '',
      isHomePhoneMobile: !!rawData.isHomePhoneMobile,
      isCellPhoneMobile: !!rawData.isCellPhoneMobile,
      isWorkPhoneMobile: !!rawData.isWorkPhoneMobile,
      isAlternatePhoneMobile: !!rawData.isAlternatePhoneMobile
    },
    address: {
      street: rawData.address1 || '',
      street2: rawData.address2 || '',
      city: rawData.city || '',
      state: transformDisplayValue(rawData.state),
      country: transformDisplayValue(rawData.country),
      zipCode: rawData.zipCode || ''
    },
    source: transformDisplayValue(rawData.source),
    specificSource: transformDisplayValue(rawData.specificSource),
    locale: rawData.locale?.localeText || '',
    birthDate: rawData.birthDateEncrypt || '',
    metadata: {
      dateCreated: rawData.dateCreated?.reference === 'circular' ? null : rawData.dateCreated,
      dateLastModified: rawData.dateLastModified?.reference === 'circular' ? null : rawData.dateLastModified,
      createdBy: rawData.createdBy,
      lastModifiedBy: rawData.lastModifiedBy,
      documentId: rawData.document?.id
    }
  };
}

function transformPosting(rawData: any): Posting {
  if (!rawData) return {};
  return {
    showQualifiedTitle: !!rawData.showQualifiedTitle,
    id: rawData.id,
    version: rawData.version,
    postingBeginDate: rawData.postingBeginDate,
    postingEndDate: rawData.postingEndDate,
    isActive: !!rawData.isActive,
    jobCategory: rawData.jobCategory,
    postingStatus: rawData.postingStatus,
    postingSite: rawData.postingSite,
    jobOpening: rawData.jobOpening,
    requisition: rawData.requisition,
    guuid: rawData.guuid,
    dateCreated: rawData.dateCreated,
    dateLastModified: rawData.dateLastModified,
    createdBy: rawData.createdBy,
    lastModifiedBy: rawData.lastModifiedBy,
    postingCreator: rawData.postingCreator,
    forcedDirty: !!rawData.forcedDirty,
    dataPopulated: !!rawData.dataPopulated
  };
}

function transformLocation(rawData: any): Location {
  if (!rawData) return {};
  return {
    id: transformDisplayValue(rawData.id),
    HasLocationName: !!rawData.HasLocationName,
    name: transformDisplayValue(rawData.name),
    address: rawData.address ? {
      street: transformDisplayValue(rawData.address.street),
      city: transformDisplayValue(rawData.address.city),
      state: transformDisplayValue(rawData.address.state),
      zipCode: transformDisplayValue(rawData.address.zipCode),
      country: transformDisplayValue(rawData.address.country)
    } : undefined
  };
}

function transformAvailability(rawData: any): Availability {
  if (!rawData) return {};
  return {
    HasAvailability: !!rawData.HasAvailability,
    availabilityDetails: rawData.availabilityDetails ? {
      startDate: transformDisplayValue(rawData.availabilityDetails.startDate),
      noticePeriod: transformDisplayValue(rawData.availabilityDetails.noticePeriod),
      preferredShifts: Array.isArray(rawData.availabilityDetails.preferredShifts) 
        ? rawData.availabilityDetails.preferredShifts.map(transformDisplayValue)
        : undefined,
      weeklyHours: Number(transformDisplayValue(rawData.availabilityDetails.weeklyHours)) || undefined
    } : undefined
  };
}

function transformOverviewData(rawData: any): AdrOverviewData {
  if (!rawData) return {};
  return {
    PersonContact: transformPersonContact(rawData.PersonContact),
    Posting: transformPosting(rawData.Posting),
    Location: transformLocation(rawData.Location),
    Availability: transformAvailability(rawData.Availability),
    DecisionPointScore: rawData.DecisionPointScore,
    SmartMatchScore: rawData.SmartMatchScore,
    WorkHistory: rawData.WorkHistory,
    HiringProcess: rawData.HiringProcess,
    QUAL: rawData.QUAL
  };
}

export async function getAdrOverview(jobBidId: number): Promise<AdrOverviewResponse> {
  try {
    const response = await apiClient.get<any>(`/api/adr-overview/${jobBidId}`);
    
    // Log the raw response for debugging
    console.log('Raw ADR Overview Response:', response.data);
    
    // Validate response structure
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    // Transform the data to match our expected types
    const transformedData: AdrOverviewResponse = {
      status: response.data.status || 'unknown',
      jobBidId: String(jobBidId),
      data: transformOverviewData(response.data.data),
      warnings: response.data.warnings || []
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching ADR overview:', error);
    throw error;
  }
}
