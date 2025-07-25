export interface JobTemplate {
  id: string;
  title: string;
  jobCode: string;
  jobCategory?: string;
  description?: string;
  requirements?: string;
  grade?: string;
  dateLastModified: string;
  isActive: boolean;
  isComplete: boolean;
  videoUrl?: string;
  // Assessment related fields
  jobScripts?: JobScript[];
  hasAssessment?: boolean;
  // Locale-specific fields
  localeJob?: {
    title: string;
    description?: string;
    requirements?: string;
  };
}

export interface JobScript {
  id: string;
  script: {
    id: string;
    name: string;
  };
}

export interface JobCategory {
  name: string;
  text: string;
  id?: string;
  code?: string;
  displayName?: string;
}

export interface SearchOption {
  value: string;
  text: string;
  isDefault: boolean;
}

export interface JobTemplateSearchParams {
  keywords: string;
  keywordsCriteria: string;
  selectedCategory: string;
  sortColumn: string;
  sortDirection: string;
  reqCreateFromJob?: boolean;
}

export interface JobTemplateApiResponse {
  jobs: JobTemplate[];
  categories: JobCategory[];
  categoryList?: JobCategory[]; // Legacy compatibility
  searchOptions?: SearchOption[];
  numJobs: number;
  searchParams: JobTemplateSearchParams;
  reqCreateFromJob: boolean;
  pageQueryString: string;
  searchOptionText?: string;
  textSubstitutions: Record<string, any>;
}

export interface MassActionRequest {
  action: 'archive' | 'activate';
  selectedIds: string[];
  searchParams: JobTemplateSearchParams;
}

export interface MassActionResponse {
  success: boolean;
  message: string;
  redirect?: string;
}

// Search criteria options from legacy system
export const SEARCH_CRITERIA_OPTIONS = {
  ALL: '',
  JOB_TITLE: 'JobTemplatesSearchbyOptions.JobTitle',
  JOB_DESCRIPTION: 'JobTemplatesSearchbyOptions.JobDescription',
  JOB_REQUIREMENT: 'JobTemplatesSearchbyOptions.JobRequirement',
  JOB_CODE: 'JobTemplatesSearchbyOptions.JobCode'
} as const;

export type SearchCriteriaOption = typeof SEARCH_CRITERIA_OPTIONS[keyof typeof SEARCH_CRITERIA_OPTIONS];
