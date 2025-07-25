export interface JobBidInfo {
    id: number;
    uniqueApplicationId: number;
    guuid: string;
    bidDate: string;
    bidDateNumber: number;
    processId: number;
    prescreenScore: number;
    prescreenRawScore: number;
    averageScore: number;
    scoreBandSortValue: number;
    isQuickApply: boolean;
    jobType: string;
    postingType: string;
    isMetaJobbid: boolean;
    wasSaved: boolean;
    videoConfirmation: string;
    isLocking: boolean;
    dateCreated: string;
    dateLastModified: string;
    createdBy: number;
    lastModifiedBy: number;
    bidStatus?: string;
    hmcBidStatus?: string;
    initialHmcBidStatus?: string;
    jobCategory?: string;
  }
  
  export interface LocationInfo {
    id: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    isActive: boolean;
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
  
  export interface Address {
    street?: string;
    street2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
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
  
  export interface Posting {
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
  
  export interface ApplicantInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    source?: string;
    specificSource?: string;
  }
  
  export interface PersonContact {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phones?: {
      home?: string;
      cell?: string;
      work?: string;
      alternate?: string;
    };
    address?: Address;
    source?: string;
  }
  
  export interface PostingDetails {
    id?: string;
    title?: string;
    department?: string;
    requisitionNumber?: string;
    postingDate?: string;
    closingDate?: string;
    status?: string;
  }
  
  export interface Location {
    id?: string;
    HasLocationName?: boolean;
    name?: string;
    address?: Address;
  }
  
  export interface AvailabilityDetails {
    startDate?: string;
    noticePeriod?: string;
    preferredShifts?: string[];
    weeklyHours?: number;
  }
  
  export interface Availability {
    HasAvailability?: boolean;
    availabilityDetails?: AvailabilityDetails;
  }
  
  export interface DecisionPointScores {
    skillMatch?: number;
    experienceMatch?: number;
    educationMatch?: number;
    overallScore?: number;
  }
  
  export interface DecisionPointScore {
    groupRankScore?: string;
    scores?: DecisionPointScores;
  }
  
  export interface SmartMatchCategories {
    technicalSkills?: number;
    experience?: number;
    education?: number;
    certifications?: number;
  }
  
  export interface SmartMatchScore {
    overallScore?: number;
    categories?: SmartMatchCategories;
  }
  
  export interface WorkHistoryEntry {
    employer?: string;
    position?: string;
    duration?: string;
    responsibilities?: string;
    technologies?: string[];
  }
  
  export interface WorkHistory {
    HasWorkHistory?: boolean;
    entries?: WorkHistoryEntry[];
  }
  
  export interface HiringProcess {
    HasHiringProcess?: boolean;
    currentStage?: string;
    status?: string;
    nextSteps?: string[];
    showHiringFlowStartLink?: boolean;
  }
  
  export interface JobBid {
    id?: string;
    bidDate?: string;
    status?: string;
  }
  
  export interface Qualification {
    IsQualified?: string;
  }
  
  export interface AdrOverviewData {
    PersonContact?: PersonContact;
    Posting?: Posting;
    Location?: Location;
    Availability?: Availability;
    DecisionPointScore?: DecisionPointScore;
    SmartMatchScore?: SmartMatchScore;
    WorkHistory?: WorkHistory;
    HiringProcess?: HiringProcess;
    JobBid?: JobBid;
    QUAL?: Qualification;
  }
  
  export interface AdrOverviewResponse {
    status: string;
    jobBidId: string;
    data?: AdrOverviewData;
    warnings?: string[];
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
