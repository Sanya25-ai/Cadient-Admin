import { parse } from "node-html-parser";
import type {
  Application,
  ApplicationHistory,
  AvailabilityCandidate,
  DashboardCharts,
  DashboardStats,
  DashboardTask,
  Hire,
  Prospect,
  SystemSettings,
  TopApplicant,
  User,
} from "./types";

// Cross-platform HTML parsing function
function parseHTML(html: string) {
  // Check if we're in a browser environment
  if (typeof window !== "undefined" && window.DOMParser) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  } else {
    // Use node-html-parser for server-side
    return parse(html);
  }
}

// Cross-platform element querying
function querySelector(doc: any, selector: string) {
  if (!doc) {
    console.error("querySelector: doc is null or undefined");
    return null;
  }

  if (doc.querySelector) {
    return doc.querySelector(selector);
  } else {
    // node-html-parser syntax
    return doc.querySelector(selector);
  }
}

function querySelectorAll(doc: any, selector: string) {
  if (!doc) {
    console.error("querySelectorAll: doc is null or undefined");
    return [];
  }

  if (doc.querySelectorAll) {
    return Array.from(doc.querySelectorAll(selector));
  } else {
    // node-html-parser syntax
    return doc.querySelectorAll(selector) || [];
  }
}

// Add at the top of the file, after imports
const LEGACY_BASE_URL = "http://localhost:8080/atao";
const LEGACY_CREDENTIALS = {
  username: "TESTUSER",
  password: "TestPass@1",
};

// Dummy data for applications
const applications: Application[] = [
  {
    id: "1",
    name: "Kyle Boyd",
    position: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Pre-screened",
    appliedDate: "2024-03-15",
    location: "San Diego",
    smartScore: 85,
    availability: "Full-time",
    hiringManager: "Alex Johnson",
    phone: "457-455-6754",
    email: "kerian@cadienttest.com",
    ssn: "562-31-0129",
    source: "Web Site",
    currentLocation: "Atlanta (Exclusive)",
    jobWebsite: "Web Site",
    applicationMethod: "Career Invite",
    startDate: "2/3/2025",
    workPreference: "Part-Time",
  },
  {
    id: "2",
    name: "Maria Jones",
    position: "Marketing Specialist",
    status: "Interview",
    appliedDate: "2024-03-12",
    location: "Chicago",
    smartScore: 78,
    availability: "Full-time",
    hiringManager: "Sarah Williams",
    phone: "312-555-7890",
    email: "maria@cadienttest.com",
    ssn: "456-78-9012",
    source: "LinkedIn",
  },
  {
    id: "3",
    name: "John Smith",
    position: "Software Developer",
    status: "Assessment",
    appliedDate: "2024-03-10",
    location: "Remote",
    smartScore: 92,
    availability: "Full-time",
    hiringManager: "Michael Brown",
    phone: "415-555-1234",
    email: "john@cadienttest.com",
    ssn: "123-45-6789",
    source: "Indeed",
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "Customer Service Representative",
    status: "Pre-screened",
    appliedDate: "2024-03-08",
    location: "Phoenix",
    smartScore: 81,
    availability: "Part-time",
    hiringManager: "David Miller",
    phone: "602-555-4321",
    email: "emily@cadienttest.com",
    ssn: "789-01-2345",
    source: "Web Site",
  },
  {
    id: "5",
    name: "Robert Wilson",
    position: "Financial Analyst",
    status: "Offer",
    appliedDate: "2024-03-05",
    location: "New York",
    smartScore: 88,
    availability: "Full-time",
    hiringManager: "Jennifer Taylor",
    phone: "212-555-6789",
    email: "robert@cadienttest.com",
    ssn: "234-56-7890",
    source: "Referral",
  },
];

// Dummy data for application pool
const applicationPool: Application[] = [
  {
    id: "6",
    name: "Jessica Brown",
    position: "HR Coordinator",
    status: "Application Pool",
    appliedDate: "2024-03-14",
    location: "Atlanta",
    smartScore: 79,
    availability: "Full-time",
    hiringManager: "Michael Chen",
    phone: "404-555-1234",
    email: "jessica@cadienttest.com",
    ssn: "345-67-8901",
    source: "Indeed",
  },
  {
    id: "7",
    name: "David Lee",
    position: "Sales Associate",
    status: "Application Pool",
    appliedDate: "2024-03-13",
    location: "Los Angeles",
    smartScore: 82,
    availability: "Full-time",
    hiringManager: "Sarah Johnson",
    phone: "213-555-5678",
    email: "david@cadienttest.com",
    ssn: "456-78-9012",
    source: "Web Site",
  },
  {
    id: "8",
    name: "Amanda Garcia",
    position: "Marketing Coordinator",
    status: "Application Pool",
    appliedDate: "2024-03-11",
    location: "Miami",
    smartScore: 84,
    availability: "Full-time",
    hiringManager: "Robert Williams",
    phone: "305-555-9012",
    email: "amanda@cadienttest.com",
    ssn: "567-89-0123",
    source: "LinkedIn",
  },
];

// Dummy data for tax credit eligible
const taxCreditEligible: Application[] = [
  {
    id: "9",
    name: "Thomas Johnson",
    position: "Warehouse Associate",
    status: "Tax Credit Eligible",
    appliedDate: "2024-03-10",
    location: "Dallas",
    smartScore: 75,
    availability: "Full-time",
    hiringManager: "Lisa Rodriguez",
    phone: "214-555-3456",
    email: "thomas@cadienttest.com",
    ssn: "678-90-1234",
    source: "Job Fair",
    taxCreditType: "WOTC",
    taxCreditValue: "2,400",
  },
  {
    id: "10",
    name: "Sarah Miller",
    position: "Retail Associate",
    status: "Tax Credit Eligible",
    appliedDate: "2024-03-09",
    location: "Houston",
    smartScore: 77,
    availability: "Part-time",
    hiringManager: "James Wilson",
    phone: "713-555-7890",
    email: "sarah@cadienttest.com",
    ssn: "789-01-2345",
    source: "Web Site",
    taxCreditType: "Veteran",
    taxCreditValue: "5,600",
  },
  {
    id: "11",
    name: "Michael Thompson",
    position: "Customer Service Rep",
    status: "Tax Credit Eligible",
    appliedDate: "2024-03-08",
    location: "Phoenix",
    smartScore: 73,
    availability: "Full-time",
    hiringManager: "Emily Davis",
    phone: "602-555-2345",
    email: "michael@cadienttest.com",
    ssn: "890-12-3456",
    source: "Indeed",
    taxCreditType: "WOTC",
    taxCreditValue: "2,400",
  },
];

// Dummy data for pre-screened applications (fallback only)
const preScreenedApplications: Application[] = [
  {
    id: "1",
    name: "Kyle Boyd",
    position: "Sales Demo Retail Omega Non-Req External Seeker Site",
    status: "Pre-screened",
    appliedDate: "2024-03-15",
    location: "San Diego",
    smartScore: 85,
    availability: "Full-time",
    hiringManager: "Alex Johnson",
    phone: "457-455-6754",
    email: "kerian@cadienttest.com",
    ssn: "562-31-0129",
    source: "Web Site",
    assessmentStatus: "Passed",
    assessmentScore: 92,
    assessmentDate: "2024-03-16",
    assessmentNotes: "Strong communication skills and relevant experience",
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "Customer Service Representative",
    status: "Pre-screened",
    appliedDate: "2024-03-08",
    location: "Phoenix",
    smartScore: 81,
    availability: "Part-time",
    hiringManager: "David Miller",
    phone: "602-555-4321",
    email: "emily@cadienttest.com",
    ssn: "789-01-2345",
    source: "Web Site",
    assessmentStatus: "Failed",
    assessmentScore: 45,
    assessmentDate: "2024-03-09",
    assessmentNotes: "Needs improvement in technical skills",
  },
  {
    id: "12",
    name: "Jennifer Wilson",
    position: "Administrative Assistant",
    status: "Pre-screened",
    appliedDate: "2024-03-07",
    location: "Chicago",
    smartScore: 80,
    availability: "Full-time",
    hiringManager: "Robert Brown",
    phone: "312-555-6789",
    email: "jennifer@cadienttest.com",
    ssn: "901-23-4567",
    source: "LinkedIn",
    assessmentStatus: "Passed",
    assessmentScore: 88,
    assessmentDate: "2024-03-08",
    assessmentNotes: "Excellent organizational skills",
  },
];

// Dummy data for hires
const hires: Hire[] = [
  {
    id: "13",
    name: "Singh, Suryanshu",
    hired: "9/21/2024",
    position: "Program Manager",
    hiredLocation: "United States",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Engineering",
    status: "Active",
    manager: "Jennifer Lee",
    onboardingProgress: 100,
  },
  {
    id: "14",
    name: "Lara, Brian",
    hired: "9/21/2024",
    position: "Zomato Delivery",
    hiredLocation: "Portland",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Operations",
    status: "Active",
    manager: "Michael Johnson",
    onboardingProgress: 85,
  },
  {
    id: "15",
    name: "b, hey",
    hired: "7/25/2024",
    position: "Senior Technology Manager",
    hiredLocation: "United States",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Technology",
    status: "Active",
    manager: "Sarah Williams",
    onboardingProgress: 100,
  },
  {
    id: "16",
    name: "Singh, Ritesh",
    hired: "2/29/2024",
    position: "Analyst",
    hiredLocation: "text-loc",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Analytics",
    status: "Active",
    manager: "David Brown",
    onboardingProgress: 100,
  },
  {
    id: "17",
    name: "Singh, Abhishek",
    hired: "2/29/2024",
    position: "MERN Stack Developer",
    hiredLocation: "United States",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Engineering",
    status: "Active",
    manager: "Jennifer Lee",
    onboardingProgress: 95,
  },
  {
    id: "18",
    name: "Singhal, Harry",
    hired: "2/29/2024",
    position: "SQL developer",
    hiredLocation: "United States",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Engineering",
    status: "Active",
    manager: "Jennifer Lee",
    onboardingProgress: 90,
  },
  {
    id: "19",
    name: "Singh, Ravi",
    hired: "2/28/2024",
    position: "Product Manager",
    hiredLocation: "Portland",
    formerEmployee: "--",
    rehireEligible: "--",
    score: undefined,
    percentageScore: undefined,
    eVerifyStatus: "--",
    wotcStatus: "Not Screened",
    department: "Product",
    status: "Active",
    manager: "Michael Brown",
    onboardingProgress: 100,
  },
];

// Dummy data for prospects
const prospects: Prospect[] = [
  {
    id: "17",
    name: "Alex Johnson",
    source: "LinkedIn",
    potentialPosition: "Senior Software Engineer",
    location: "Remote",
    status: "New Lead",
    matchScore: 85,
    lastContact: "2024-03-15",
    recruiter: "Sarah Williams",
  },
  {
    id: "18",
    name: "Olivia Smith",
    source: "Referral",
    potentialPosition: "Product Manager",
    location: "San Francisco",
    status: "Contacted",
    matchScore: 90,
    lastContact: "2024-03-14",
    recruiter: "Michael Brown",
  },
  {
    id: "19",
    name: "Ethan Davis",
    source: "Job Fair",
    potentialPosition: "UX Designer",
    location: "New York",
    status: "Interested",
    matchScore: 82,
    lastContact: "2024-03-12",
    recruiter: "Jennifer Lee",
  },
  {
    id: "20",
    name: "Sophia Wilson",
    source: "GitHub",
    potentialPosition: "DevOps Engineer",
    location: "Remote",
    status: "New Lead",
    matchScore: 88,
    lastContact: "2024-03-10",
    recruiter: "David Miller",
  },
];

// Dummy data for availability matched
const availabilityMatched: AvailabilityCandidate[] = [
  {
    id: "21",
    name: "Ryan Thompson",
    position: "Retail Associate",
    location: "Chicago",
    availability: "Weekends & Evenings",
    matchScore: 95,
    startDate: "2024-04-01",
    hiringManager: "Sarah Johnson",
  },
  {
    id: "22",
    name: "Emma Garcia",
    position: "Customer Service Rep",
    location: "Phoenix",
    availability: "Weekdays",
    matchScore: 92,
    startDate: "2024-03-25",
    hiringManager: "Michael Brown",
  },
  {
    id: "23",
    name: "Noah Martinez",
    position: "Warehouse Associate",
    location: "Dallas",
    availability: "Overnight Shifts",
    matchScore: 90,
    startDate: "2024-04-05",
    hiringManager: "Jennifer Lee",
  },
  {
    id: "24",
    name: "Ava Wilson",
    position: "Sales Associate",
    location: "Miami",
    availability: "Flexible",
    matchScore: 88,
    startDate: "2024-03-30",
    hiringManager: "David Miller",
  },
];

// Dummy data for top applicants
const topApplicants: TopApplicant[] = [
  {
    id: "1",
    name: "Joseph, David",
    appliedDate: "5/15/2025",
    position: "Customer Service Associate",
    location: "Atlanta",
    status: "Pre-Screened",
    smartScore: 77,
    score: 0,
    percentageScore: 0,
    availability: "Not Screened",
    wotcStatus: "Not Screened",
    hiringStep: "Interview ( Schedule Interview )",
  },
  {
    id: "2",
    name: "Asher, Jack",
    appliedDate: "5/15/2025",
    position: "Customer Service Associate",
    location: "Atlanta",
    status: "Pre-Screened",
    smartScore: 85,
    score: 0,
    percentageScore: 0,
    availability: "Not Screened",
    wotcStatus: "Not Screened",
    hiringStep: "Interview ( Schedule Interview )",
  },
  {
    id: "3",
    name: "BIDWELL, RYAN",
    appliedDate: "5/8/2025",
    position: "Customer Service Associate",
    location: "San Diego",
    status: "Offered",
    smartScore: 92,
    score: 0,
    percentageScore: 0,
    availability: "Not Screened",
    wotcStatus: "Not Screened",
    hiringStep: "Conditional Offer Letter ( Start Offer )",
  },
  {
    id: "4",
    name: "Prospero, Betsy",
    appliedDate: "5/7/2025",
    position: "Customer Service Associate",
    location: "San Diego",
    status: "Offered",
    smartScore: 88,
    score: 0,
    percentageScore: 0,
    availability: "Not Screened",
    wotcStatus: "Not Screened",
    hiringStep: "Conditional Offer Letter ( Start Offer )",
  },
];

// Dummy data for application history
const applicationHistory: Record<string, ApplicationHistory[]> = {
  "1": [
    {
      id: "h1",
      date: "Mar 19, 2025 (11:55 PM)",
      status: "Hiring Process - (Started)",
      modifiedBy: "System Automated",
      description: "",
    },
    {
      id: "h2",
      date: "Mar 19, 2025 (11:55 PM)",
      status: "SmartScreen",
      modifiedBy: "System Automated",
      description: "SmartScreen - Passed",
    },
    {
      id: "h3",
      date: "Mar 19, 2025 (11:55 PM)",
      status: "Interview Scheduled",
      modifiedBy: "System Automated",
      description: "Interview - Schedule Interview",
    },
  ],
};

// Dummy data for dashboard
const dashboardStats: DashboardStats = {
  totalRequisitions: 57,
  requisitionsIncrease: 12,
  totalCandidates: 89,
  candidatesIncrease: 8,
  positionsFilled: 23,
  positionsFilledIncrease: 15,
};

const dashboardCharts: DashboardCharts = {
  requisitionCategories: [
    { name: "INTERVIEW PROCESS Recruiting", count: 12, color: "#f87171" },
    { name: "PRE-SCREEN Recruitment", count: 8, color: "#fbbf24" },
    { name: "Customer Service Associate", count: 15, color: "#34d399" },
    { name: "Cashier", count: 10, color: "#60a5fa" },
    { name: "Sales Associate", count: 7, color: "#a78bfa" },
    { name: "Shift Supervisor", count: 5, color: "#f472b6" },
  ],
};

const dashboardTasks: DashboardTask[] = [
  {
    id: "t1",
    title: "Review New Applications",
    description:
      "Review the latest batch of applications for the Sales Associate position",
    priority: "High",
    dueDate: "Today, 5:00 PM",
  },
  {
    id: "t2",
    title: "Schedule Interviews",
    description:
      "Schedule interviews for pre-screened candidates for the Marketing Specialist role",
    priority: "Medium",
    dueDate: "Tomorrow, 12:00 PM",
  },
  {
    id: "t3",
    title: "Send Offer Letters",
    description: "Prepare and send offer letters to approved candidates",
    priority: "High",
    dueDate: "Mar 20, 2025",
  },
  {
    id: "t4",
    title: "Update Job Descriptions",
    description: "Review and update job descriptions for upcoming positions",
    priority: "Low",
    dueDate: "Mar 25, 2025",
  },
];

// Dummy user data
const currentUser: User = {
  id: "u1",
  name: "Admin User",
  email: "admin@cadienttest.com",
  phone: "555-123-4567",
  title: "Recruitment Manager",
  department: "Human Resources",
  bio: "Experienced recruitment professional with a focus on talent acquisition and retention strategies.",
};

// Dummy system settings
const systemSettings: SystemSettings = {
  companyName: "Cadient",
  companyEmail: "info@cadienttest.com",
  companyPhone: "800-555-1234",
  companyWebsite: "https://www.cadienttest.com",
  defaultTimeZone: "America/New_York",
  defaultLanguage: "en",
  enableSmartScreening: true,
  enableTaxCreditScreening: true,
  enableAutomatedEmails: true,
};

async function authenticateWithLegacySystem(): Promise<string> {
  console.log("🔓 Authentication bypassed - returning dummy session cookie");
  // Return a dummy session cookie to bypass authentication
  return "JSESSIONID=bypass-session-12345; ConsolidatedJAFTestClientdsiRAT=bypass-token-67890";
}

// Functions to retrieve data
export async function getApplications(params?: {
  fromDate?: string;
  toDate?: string;
  status?: string;
  location?: string;
  clientId?: string;
  userId?: string;
}): Promise<Application[]> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.set("reportType", "AllApplicants");

    // Add filters from params object if they exist
    if (params?.fromDate) {
      queryParams.set("fromDate", params.fromDate);
    }
    if (params?.toDate) {
      queryParams.set("toDate", params.toDate);
    }
    if (params?.status && params.status !== "All") {
      queryParams.set("status", params.status);
    }
    if (params?.location && params.location !== "All") {
      queryParams.set("location", params.location);
    }

    // Use relative URL which will be rewritten by Next.js to the correct backend URL
    // Ensure we have a proper URL by adding base for client-side fetching
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const apiPath = `/api/applications?${queryParams.toString()}`;

    // Use correct URL construction for server component
    console.log("Fetching data from:", apiPath);

    try {
      const response = await fetch(
        "http://localhost:8080/atao/api/applications?" + queryParams.toString(),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-App-Locator": "ConsolidatedJAFTestClientdsiRAT", // Use the HMC application locator
            "X-Client-ID": params?.clientId || "237262", // Default client ID if not provided
            "X-User-ID": params?.userId || "669122", // Default user ID if not provided
          },
          next: {
            revalidate: 0, // Disable cache
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "API request failed with status:",
          response.status,
          "and message:",
          errorText
        );
        // Fallback to dummy data if the API fails
        return applications;
      }

      const data = await response.json();

      // Log the response for debugging
      console.log("API Response:", data);

      // Map the backend data format to our frontend Application interface
      if (data.data && Array.isArray(data.data)) {
        if (data.data.length === 0) {
          console.log("API returned an empty data array");
          // Return an empty array instead of dummy data when API explicitly returns empty data
          return [];
        }

        console.log("First result sample:", data.data[0]);
        return data.data.map((item: any) => {
          const application = {
            id: item.jobBidId?.toString() || "",
            name: item.candidateName || "N/A", // Use N/A if not provided
            position: item.position || "Not specified",
            status: item.status || "Application",
            appliedDate: item.applicationDate ? item.applicationDate : "", // Keep as string
            location: item.location || "N/A",
            smartScore:
              typeof item.overallScore === "number" ? item.overallScore : 0, // Use actual score
            availability: "Full-time", // Default since API doesn't provide it
            hiringManager: "", // Not available from API
            phone: "", // Not available from API
            email: "", // Not available from API
            ssn: "", // Not available from API
            source: "", // Not available from API
            wotcStatus: item.wotcStatus || "Not Screened",
            former:
              item.isFormer === true
                ? "Yes"
                : item.isFormer === false
                ? "No"
                : "-", // Convert boolean to display value
            rehire:
              item.isRehire === true
                ? "Yes"
                : item.isRehire === false
                ? "No"
                : "-", // Convert boolean to display value
            hiringStep: item.hiringStep || "-",
          };
          return application;
        });
      }

      // Return dummy data if API response doesn't match expected format
      console.warn("API response format unexpected:", data);
      return applications;
    } catch (fetchError) {
      console.error("Error during fetch operation:", fetchError);
      return applications;
    }
  } catch (outerError) {
    console.error("Unexpected error in getApplications:", outerError);
    return applications;
  }
}

export async function getApplication(
  id: string
): Promise<Application | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    ...applications,
    ...applicationPool,
    ...taxCreditEligible,
    ...preScreenedApplications,
  ].find((app) => app.id === id);
}

export async function getApplicationHistory(
  id: string
): Promise<ApplicationHistory[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return applicationHistory[id] || [];
}

export async function getApplicationPool(): Promise<Application[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return applicationPool;
}

export async function getTaxCreditEligible(): Promise<Application[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return taxCreditEligible;
}

/**
 * Shared function to fetch applications from legacy system by report type
 * Eliminates code duplication between getPreScreenedApplications, getFailedAssessmentApplications, and getPassedAssessmentApplications
 */
async function getApplicationsByType(
  reportType: "PreScreened" | "PreScreenedFailed" | "PreScreenedPassed",
  assessmentStatus: "Not Started" | "Failed" | "Passed",
  functionName: string,
  shouldThrowError: boolean = false
): Promise<Application[]> {
  try {
    console.log(`🚀 === STARTING ${functionName} APPLICATIONS EXTRACTION ===`);

    // First authenticate to get the session cookie
    const sessionCookie = await authenticateWithLegacySystem();

    // Now fetch the applications (directly from the grid results endpoint)
    const response = await fetch(
      `${LEGACY_BASE_URL}/index.jsp?seq=applicantGridResults&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US&reportType=${reportType}&exclusive=Exclusive.exclusive&hmcBidStatus=JobBidStatusesForHMC.Prescreened&event=com.deploy.application.hmc.plugin.ApplicantGrid.search`,
      {
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          Cookie: sessionCookie,
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-User": "?1",
        },
        redirect: "manual", // Don't automatically follow redirects
      }
    );

    // Check if we got redirected to login
    if (response.status === 302) {
      const location = response.headers.get("location");
      if (location?.includes("seq=login")) {
        throw new Error("Session expired, please try again");
      }
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch applications: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();
    console.log(`📄 Received HTML response, length: ${html.length}`);

    // Use cross-platform HTML parser
    console.log(
      `🔧 Creating HTML parser instance for ${functionName.toLowerCase()} applications`
    );

    const doc = parseHTML(html);
    console.log(`📋 Parsed HTML document successfully`);

    // Find the table containing application data
    const table = querySelector(doc, "table#data-table");
    if (!table) {
      console.log(
        `❌ No applications table found in HTML response - likely no ${functionName.toLowerCase()} applications available`
      );
      console.log("📄 HTML content preview:", html.substring(0, 1000));

      // Check for common "no data" indicators in the HTML
      const htmlText = html.toLowerCase();
      if (
        htmlText.includes("no records found") ||
        htmlText.includes("no data available") ||
        htmlText.includes("no applications") ||
        htmlText.includes("no results")
      ) {
        console.log(
          `✅ Confirmed: Legacy system indicates no ${functionName.toLowerCase()} applications available`
        );
      }

      return []; // Return empty array instead of throwing error
    }

    console.log(`✅ Found table with id 'data-table'`);

    // Get table headers dynamically
    const headerElements = querySelectorAll(
      table,
      "thead th, tr:first-child th, tr:first-child td"
    );
    console.log(`🏷️ Found ${headerElements.length} header elements`);

    const headers = headerElements.map((th: any, index: number) => {
      const headerText = (th.textContent || th.text || "").trim();
      console.log(`📋 Header ${index}: "${headerText}"`);
      return headerText;
    });
    console.log("🎯 Final headers array:", headers);

    // Extract data rows
    const rowElements = querySelectorAll(
      table,
      "tbody > tr, tr:not(:first-child)"
    );
    console.log(`📊 Found ${rowElements.length} data rows`);

    if (rowElements.length === 0) {
      console.log("ℹ️ No data rows found in table");
      return []; // No applications found
    }

    // Process each row dynamically
    const applications = rowElements.map((row: any, rowIndex: number) => {
      console.log(`\n🔄 === TRANSFORMING ${functionName} ROW ${rowIndex} ===`);

      // Create dynamic application object
      const application: any = {
        id: `row-${rowIndex}`,
        status: "Pre-screened",
        availability: "Full-time", // Default value
        hiringManager: "", // Not available in legacy system
        phone: "", // Will be extracted from details
        email: "", // Will be extracted from details
        ssn: "", // Not available in legacy system
        source: "", // Will be extracted from details
        assessmentStatus: assessmentStatus,
        assessmentScore: 0,
        assessmentDate: "",
        assessmentNotes: "",
        extractedFields: {},
      };

      console.log(`🏗️ Initial application object created for row ${rowIndex}`);

      const cells = querySelectorAll(row, "td, th");
      console.log(`📱 Row ${rowIndex} has ${cells.length} cells`);

      // Extract data for each header-cell pair
      headers.forEach((header: string, headerIndex: number) => {
        console.log(`\n  🔍 Processing header ${headerIndex}: "${header}"`);

        const cell = cells[headerIndex];
        const cellText = (cell?.textContent || cell?.text || "").trim();

        console.log(`    📝 Cell text: "${cellText}"`);
        console.log(`    🏷️ Header: "${header}" -> Cell: "${cellText}"`);

        // Validate header and cell text - skip if they contain messy content
        const isValidHeader =
          header &&
          header.length < 100 &&
          !header.includes("\r") &&
          !header.includes("\n") &&
          !header.includes("\t") &&
          header.trim().length > 0;

        const isValidCellText =
          cellText.length < 500 &&
          !cellText.includes("\r\n\t") &&
          !(
            cellText.includes("\r") &&
            cellText.includes("\n") &&
            cellText.includes("\t")
          );

        if (!isValidHeader) {
          console.log(
            `    ⚠️ Skipping invalid header: "${header.substring(0, 50)}..."`
          );
          return;
        }

        if (!isValidCellText) {
          console.log(`    ⚠️ Skipping messy cell text for header "${header}"`);
          // Still process the cell for detail extraction, but don't store the messy text
        } else {
          // Store the raw header-value mapping only if both are valid
          const headerKey = header.trim();
          const normalizedKey = headerKey
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

          console.log(`    🔄 Mapping: "${headerKey}" -> "${normalizedKey}"`);

          application[headerKey] = cellText;
          application[normalizedKey] = cellText;
          application.extractedFields[headerKey] = cellText;
          application.extractedFields[normalizedKey] = cellText;

          console.log(
            `    ✅ Stored: application["${headerKey}"] = "${cellText}"`
          );
          console.log(
            `    ✅ Stored: application["${normalizedKey}"] = "${cellText}"`
          );
        }

        // Extract ID from checkbox if this is the first column
        if (headerIndex === 0 && cell) {
          console.log(`    🔍 Checking first column for ID extraction`);
          const idInput = querySelector(cell, 'input[type="checkbox"]');
          if (idInput) {
            const extractedId =
              idInput.getAttribute?.("value") ||
              idInput.getAttribute?.("id") ||
              idInput.attrs?.value ||
              idInput.attrs?.id ||
              `legacy-${rowIndex + 1}`;
            console.log(
              `    🆔 Extracted ID: ${extractedId} (replacing ${application.id})`
            );
            application.id = extractedId;
          } else {
            console.log(`    🆔 Using default ID: ${application.id}`);
          }
        }

        // Map to standard Application fields based on header content
        if (isValidHeader && header.toLowerCase().includes("name")) {
          // Extract name from anchor tag if available
          const anchor = querySelector(cell, "a");
          if (anchor && (anchor.textContent || anchor.text)) {
            const anchorText = (anchor.textContent || anchor.text).trim();
            application.name = formatName(anchorText);
            console.log(
              `    🔗 Found clean name in anchor: "${application.name}"`
            );
          } else if (isValidCellText) {
            // Try to extract clean name from cell text
            const cleanCellText = cellText
              .replace(/[\r\n\t]+/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            application.name = formatName(cleanCellText) || "N/A";
            console.log(
              `    📝 Using cleaned cell text for name: "${application.name}"`
            );
          }

          // Extract additional details from detail containers
          if (cell) {
            const detailContainers = querySelectorAll(
              cell,
              ".dgDetail-inner, .jobDetailContainer, .dgDetailContainer"
            );
            if (detailContainers.length > 0) {
              console.log(
                `    🔍 Found ${detailContainers.length} detail containers in name cell`
              );

              detailContainers.forEach(
                (container: any, containerIndex: number) => {
                  console.log(
                    `      🔧 Processing detail container ${containerIndex}`
                  );

                  // Extract details using cross-platform approach
                  const containerHtml =
                    container.innerHTML || container.outerHTML || "";
                  console.log(
                    `      📄 Container HTML length: ${containerHtml.length}`
                  );

                  // Look for formRow divs
                  const formRows = querySelectorAll(container, ".formRow");
                  if (formRows && formRows.length > 0) {
                    console.log(
                      `      🏷️ Found ${formRows.length} form rows in container`
                    );

                    formRows.forEach((formRow: any, formRowIndex: number) => {
                      console.log(
                        `        🔄 Processing form row ${formRowIndex}`
                      );

                      const labelElement = querySelector(
                        formRow,
                        ".emphasized.label, label"
                      );
                      if (labelElement) {
                        const labelText = (
                          labelElement.textContent ||
                          labelElement.text ||
                          ""
                        )
                          .trim()
                          .replace(":", "")
                          .toLowerCase();
                        const rowText =
                          formRow.textContent || formRow.text || "";
                        const labelTextInRow = (
                          labelElement.textContent ||
                          labelElement.text ||
                          ""
                        ).trim();

                        let valueText = rowText
                          .replace(labelTextInRow, "")
                          .trim();
                        valueText = valueText.replace(/^\s*:\s*/, "").trim();

                        console.log(
                          `        🏷️ Label: "${labelText}", Value: "${valueText}"`
                        );

                        // Only process if label and value are valid
                        if (
                          labelText &&
                          labelText.length < 50 &&
                          valueText &&
                          valueText.length < 200
                        ) {
                          // Map to application fields
                          switch (labelText) {
                            case "name":
                              // Clean up the name value - remove extra whitespace and newlines
                              const cleanName = valueText
                                .replace(/[\r\n\t]+/g, " ")
                                .replace(/\s+/g, " ")
                                .trim();
                              if (cleanName && cleanName !== "--") {
                                application.name = formatName(cleanName);
                                console.log(
                                  `        👤 Set clean name from detail: "${application.name}"`
                                );
                              }
                              break;
                            case "phone":
                              application.phone =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        📞 Set phone: "${application.phone}"`
                              );
                              break;
                            case "email":
                              application.email =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        📧 Set email: "${application.email}"`
                              );
                              break;
                            case "city":
                              application.city =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        🏙️ Set city: "${application.city}"`
                              );
                              break;
                            case "state":
                              application.state =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        🗺️ Set state: "${application.state}"`
                              );
                              break;
                            case "work preference":
                              application.workPreference =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        💼 Set work preference: "${application.workPreference}"`
                              );
                              break;
                            case "application type":
                              application.applicationType =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        📋 Set application type: "${application.applicationType}"`
                              );
                              break;
                            case "status":
                              application.detailStatus = valueText;
                              console.log(
                                `        📊 Set detail status: "${application.detailStatus}"`
                              );
                              break;
                            case "esteem status":
                              application.esteemStatus = valueText;
                              console.log(
                                `        ⭐ Set esteem status: "${application.esteemStatus}"`
                              );
                              break;
                            case "exclusive?":
                            case "exclusive":
                              application.exclusive = valueText;
                              console.log(
                                `        🔒 Set exclusive: "${application.exclusive}"`
                              );
                              break;
                            default:
                              // Only store valid field names and values
                              if (
                                labelText &&
                                valueText &&
                                valueText !== "--" &&
                                labelText.length < 30 &&
                                valueText.length < 100
                              ) {
                                const fieldName = labelText
                                  .replace(/\s+/g, "_")
                                  .replace(/[^a-z0-9_]/g, "");
                                if (
                                  fieldName &&
                                  fieldName.length > 0 &&
                                  fieldName.length < 30
                                ) {
                                  // Clean up the value for any field
                                  const cleanValue = valueText
                                    .replace(/[\r\n\t]+/g, " ")
                                    .replace(/\s+/g, " ")
                                    .trim();
                                  application[fieldName] = cleanValue;
                                  application.extractedFields[fieldName] =
                                    cleanValue;
                                  console.log(
                                    `        ➕ Set custom field: "${fieldName}" = "${cleanValue}"`
                                  );
                                }
                              }
                              break;
                          }
                        } else {
                          console.log(
                            `        ⚠️ Skipping invalid label/value: "${labelText}" / "${valueText.substring(
                              0,
                              50
                            )}..."`
                          );
                        }
                      }
                    });
                  }
                }
              );
            } else {
              console.log(`    ℹ️ No detail containers found in name cell`);
            }
          }
        } else if (isValidHeader && header.toLowerCase().includes("applied")) {
          if (isValidCellText) application.appliedDate = cellText;
        } else if (isValidHeader && header.toLowerCase().includes("position")) {
          if (isValidCellText)
            application.position = cellText || "Not specified";
        } else if (isValidHeader && header.toLowerCase().includes("location")) {
          if (isValidCellText) application.location = cellText || "N/A";
        } else if (isValidHeader && header.toLowerCase().includes("wotc")) {
          if (isValidCellText) application.wotcStatus = cellText;
        } else if (isValidHeader && header.toLowerCase().includes("former")) {
          if (isValidCellText) application.former = cellText;
        } else if (isValidHeader && header.toLowerCase().includes("rehire")) {
          if (isValidCellText) application.rehire = cellText;
        } else if (
          isValidHeader &&
          header.toLowerCase().includes("score") &&
          !header.toLowerCase().includes("%")
        ) {
          if (isValidCellText) {
            application.score = cellText;
            application.assessmentScore = parseInt(cellText, 10) || 0;
          }
        } else if (
          isValidHeader &&
          (header.toLowerCase().includes("%") ||
            header.toLowerCase().includes("percent"))
        ) {
          if (isValidCellText) {
            application.scorePercent = cellText;
            const smartScore = parseInt(cellText.replace("%", ""), 10);
            application.smartScore = isNaN(smartScore) ? 0 : smartScore;
          }
        }
      });

      // Set default values for required fields if not already set
      application.name = formatName(
        application.name || application.Name || "N/A"
      );
      application.position =
        application.position || application.Position || "Not specified";
      application.appliedDate =
        application.appliedDate || application.Applied || "";
      application.location =
        application.location || application.Location || "N/A";
      application.smartScore = application.smartScore || 0;

      // Final cleanup: Remove any messy field names that might have slipped through
      const cleanApplication: any = {
        id: application.id,
        name: application.name,
        position: application.position,
        status: application.status,
        appliedDate: application.appliedDate,
        location: application.location,
        smartScore: application.smartScore,
        availability: application.availability,
        hiringManager: application.hiringManager,
        phone: application.phone || "",
        email: application.email || "",
        ssn: application.ssn || "",
        source: application.source || "",
        assessmentStatus: application.assessmentStatus,
        assessmentScore: application.assessmentScore,
        assessmentDate: application.assessmentDate,
        assessmentNotes: application.assessmentNotes,
        extractedFields: {},
      };

      // Copy over only valid additional fields
      Object.keys(application).forEach((key) => {
        if (
          key !== "extractedFields" &&
          key.length < 50 &&
          !key.includes("\r") &&
          !key.includes("\n") &&
          !key.includes("\t") &&
          key.match(/^[a-zA-Z0-9_\s%\-\.]+$/)
        ) {
          const value = application[key];
          if (
            typeof value === "string" &&
            value.length < 200 &&
            !value.includes("\r\n\t") &&
            !(
              value.includes("\r") &&
              value.includes("\n") &&
              value.includes("\t")
            )
          ) {
            cleanApplication[key] = value;
          } else if (typeof value === "number") {
            cleanApplication[key] = value;
          }
        }
      });

      // Copy over valid extracted fields
      Object.keys(application.extractedFields || {}).forEach((key) => {
        if (
          key.length < 50 &&
          !key.includes("\r") &&
          !key.includes("\n") &&
          !key.includes("\t") &&
          key.match(/^[a-zA-Z0-9_\s%\-\.]+$/)
        ) {
          const value = application.extractedFields[key];
          if (
            typeof value === "string" &&
            value.length < 200 &&
            !value.includes("\r\n\t") &&
            !(
              value.includes("\r") &&
              value.includes("\n") &&
              value.includes("\t")
            )
          ) {
            cleanApplication.extractedFields[key] = value;
          }
        }
      });

      console.log(
        `\n🎯 FINAL ${functionName} APPLICATION DATA FOR ROW ${rowIndex}:`
      );
      console.log(`  🆔 ID: ${cleanApplication.id}`);
      console.log(`  👤 Name: ${cleanApplication.name}`);
      console.log(`  📧 Email: ${cleanApplication.email}`);
      console.log(`  📞 Phone: ${cleanApplication.phone}`);
      console.log(`  🏙️ City: ${cleanApplication.city}`);
      console.log(`  🗺️ State: ${cleanApplication.state}`);
      console.log(`  📊 Total fields: ${Object.keys(cleanApplication).length}`);

      return cleanApplication as Application;
    });

    console.log(`\n🎉 === ${functionName} EXTRACTION COMPLETE ===`);
    console.log(
      `✅ Successfully parsed ${applications.length} applications with dynamic structure`
    );
    console.log(`📊 All extracted headers:`, headers);
    console.log(
      `🔍 Sample application structure (first app):`,
      applications[0]
    );

    // Log summary of all extracted fields
    const allFieldNames = new Set<string>();
    applications.forEach((app: any) => {
      Object.keys(app).forEach((key) => {
        // Only include clean field names in the summary
        if (
          key !== "extractedFields" &&
          key.length < 50 &&
          !key.includes("\r") &&
          !key.includes("\n") &&
          !key.includes("\t") &&
          key.match(/^[a-zA-Z0-9_\s%\-\.]+$/)
        ) {
          allFieldNames.add(key);
        }
      });
    });
    console.log(
      `🏷️ All unique clean field names extracted (${allFieldNames.size}):`,
      Array.from(allFieldNames).sort()
    );

    console.log(
      "Successfully parsed applications from legacy system:",
      applications
    );
    return applications;
  } catch (error) {
    console.error(
      `Error fetching ${functionName.toLowerCase()} applications:`,
      error
    );
    if (shouldThrowError) {
      throw error;
    }
    // Return empty array instead of throwing error
    return [];
  }
}

export async function getPreScreenedApplications(filters: {
  fromDate?: string;
  toDate?: string;
  clientId?: string;
  userId?: string;
}): Promise<Application[]> {
  try {
    return await getApplicationsByType(
      "PreScreened",
      "Not Started",
      "Pre-screened",
      true
    );
  } catch (error) {
    console.log(
      "Legacy system failed, returning dummy pre-screened applications"
    );
    // Return dummy data when legacy system fails
    return preScreenedApplications;
  }
}

export async function getFailedAssessmentApplications(): Promise<
  Application[]
> {
  return getApplicationsByType(
    "PreScreenedFailed",
    "Failed",
    "Failed Assessment",
    false
  );
}

export async function getPassedAssessmentApplications(): Promise<
  Application[]
> {
  return getApplicationsByType(
    "PreScreenedPassed",
    "Passed",
    "Passed Assessment",
    false
  );
}

export async function getHires(): Promise<Hire[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return hires;
}

export async function getProspects(): Promise<Prospect[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return prospects;
}

export async function getAvailabilityMatched(): Promise<
  AvailabilityCandidate[]
> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return availabilityMatched;
}

export async function getTopApplicants(): Promise<TopApplicant[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return topApplicants;
}

export async function getCurrentUser(): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return currentUser;
}

export async function getSystemSettings(): Promise<SystemSettings> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return systemSettings;
}

export async function getDashboardData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    stats: dashboardStats,
    charts: dashboardCharts,
    tasks: dashboardTasks,
  };
}

// Helper function to format names from "last name, first name" to "first name last name"
function formatName(name: string): string {
  if (!name || name.trim() === "" || name === "N/A") {
    return name;
  }

  // Check if the name contains a comma (indicating "last, first" format)
  if (name.includes(",")) {
    const parts = name.split(",").map((part) => part.trim());
    if (parts.length === 2 && parts[0] && parts[1]) {
      // Return "first last" format
      return `${parts[1]} ${parts[0]}`;
    }
  }

  // If no comma or invalid format, return as is
  return name.trim();
}

/**
 * Shared function to fetch prospects from legacy system by report type
 * Eliminates code duplication between different prospect endpoints
 */
async function getProspectsByType(
  reportType: "Req.QuickApply" | "Req.QuickApplyBookmarked",
  functionName: string,
  shouldThrowError: boolean = false
): Promise<Prospect[]> {
  try {
    console.log(`🚀 === STARTING ${functionName} PROSPECTS EXTRACTION ===`);

    // First authenticate to get the session cookie
    const sessionCookie = await authenticateWithLegacySystem();

    // Build the prospects request URL
    const url = `${LEGACY_BASE_URL}/index.jsp?seq=requisitionApplicationsGridResults&applicationName=ConsolidatedJAFTestClientdsiRAT&locale=en_US&reportType=${reportType}&searchType=reqSearch&event=com.deploy.application.hmc.plugin.RequisitionApplicationsGrid.search`;

    // Fetch the prospects data
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        Connection: "keep-alive",
        Cookie: sessionCookie,
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
      },
      redirect: "manual",
    });

    // Check if we got redirected to login
    if (response.status === 302) {
      const location = response.headers.get("location");
      if (location?.includes("seq=login")) {
        throw new Error("Session expired, please try again");
      }
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch prospects: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();
    console.log(`📄 Received HTML response, length: ${html.length}`);

    // Use cross-platform HTML parser
    console.log(
      `🔧 Creating HTML parser instance for ${functionName.toLowerCase()} prospects`
    );

    const doc = parseHTML(html);
    console.log(`📋 Parsed HTML document successfully`);

    // Find the table containing prospect data
    const table = querySelector(doc, "table#data-table");
    if (!table) {
      console.log(
        `❌ No prospects table found in HTML response - likely no ${functionName.toLowerCase()} prospects available`
      );
      console.log("📄 HTML content preview:", html.substring(0, 1000));

      // Check for common "no data" indicators in the HTML
      const htmlText = html.toLowerCase();
      if (
        htmlText.includes("no records found") ||
        htmlText.includes("no data available") ||
        htmlText.includes("no prospects") ||
        htmlText.includes("no results")
      ) {
        console.log(
          `✅ Confirmed: Legacy system indicates no ${functionName.toLowerCase()} prospects available`
        );
      }

      return []; // Return empty array instead of throwing error
    }

    console.log(`✅ Found table with id 'data-table'`);

    // Get table headers dynamically
    const headerElements = querySelectorAll(
      table,
      "thead th, tr:first-child th, tr:first-child td"
    );
    console.log(`🏷️ Found ${headerElements.length} header elements`);

    const headers = headerElements.map((th: any, index: number) => {
      const headerText = (th.textContent || th.text || "").trim();
      console.log(`📋 Header ${index}: "${headerText}"`);
      return headerText;
    });
    console.log("🎯 Final headers array:", headers);

    // Extract data rows
    const rowElements = querySelectorAll(
      table,
      "tbody > tr, tr:not(:first-child)"
    );
    console.log(`📊 Found ${rowElements.length} data rows`);

    if (rowElements.length === 0) {
      console.log("ℹ️ No data rows found in table");
      return []; // No prospects found
    }

    // Process each row dynamically
    const prospects = rowElements.map((row: any, rowIndex: number) => {
      console.log(
        `\n🔄 === TRANSFORMING ${functionName} PROSPECT ROW ${rowIndex} ===`
      );

      // Create dynamic prospect object
      const prospect: any = {
        id: `row-${rowIndex}`,
        status: "New Lead",
        matchScore: Math.floor(Math.random() * 40) + 60, // Random between 60-100
        recruiter: "System", // Default value
        extractedFields: {},
      };

      console.log(`🏗️ Initial prospect object created for row ${rowIndex}`);

      const cells = querySelectorAll(row, "td, th");
      console.log(`📱 Row ${rowIndex} has ${cells.length} cells`);

      // Extract data for each header-cell pair
      headers.forEach((header: string, headerIndex: number) => {
        console.log(`\n  🔍 Processing header ${headerIndex}: "${header}"`);

        const cell = cells[headerIndex];
        const cellText = (cell?.textContent || cell?.text || "").trim();

        console.log(`    📝 Cell text: "${cellText}"`);
        console.log(`    🏷️ Header: "${header}" -> Cell: "${cellText}"`);

        // Validate header and cell text - skip if they contain messy content
        const isValidHeader =
          header &&
          header.length < 100 &&
          !header.includes("\r") &&
          !header.includes("\n") &&
          !header.includes("\t") &&
          header.trim().length > 0;

        const isValidCellText =
          cellText.length < 500 &&
          !cellText.includes("\r\n\t") &&
          !(
            cellText.includes("\r") &&
            cellText.includes("\n") &&
            cellText.includes("\t")
          );

        if (!isValidHeader) {
          console.log(
            `    ⚠️ Skipping invalid header: "${header.substring(0, 50)}..."`
          );
          return;
        }

        if (!isValidCellText) {
          console.log(`    ⚠️ Skipping messy cell text for header "${header}"`);
        } else {
          // Store the raw header-value mapping only if both are valid
          const headerKey = header.trim();
          const normalizedKey = headerKey
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

          console.log(`    🔄 Mapping: "${headerKey}" -> "${normalizedKey}"`);

          prospect[headerKey] = cellText;
          prospect[normalizedKey] = cellText;
          prospect.extractedFields[headerKey] = cellText;
          prospect.extractedFields[normalizedKey] = cellText;

          console.log(
            `    ✅ Stored: prospect["${headerKey}"] = "${cellText}"`
          );
          console.log(
            `    ✅ Stored: prospect["${normalizedKey}"] = "${cellText}"`
          );
        }

        // Extract ID from checkbox if this is the first column
        if (headerIndex === 0 && cell) {
          console.log(`    🔍 Checking first column for ID extraction`);
          const idInput = querySelector(cell, 'input[type="checkbox"]');
          if (idInput) {
            const extractedId =
              idInput.getAttribute?.("value") ||
              idInput.getAttribute?.("id") ||
              idInput.attrs?.value ||
              idInput.attrs?.id ||
              `prospect-${rowIndex + 1}`;
            console.log(
              `    🆔 Extracted ID: ${extractedId} (replacing ${prospect.id})`
            );
            prospect.id = extractedId;
          } else {
            console.log(`    🆔 Using default ID: ${prospect.id}`);
          }
        }

        // Map to standard Prospect fields based on header content
        if (isValidHeader && header.toLowerCase().includes("name")) {
          // Extract name from anchor tag if available
          const anchor = querySelector(cell, "a");
          if (anchor && (anchor.textContent || anchor.text)) {
            const anchorText = (anchor.textContent || anchor.text).trim();
            prospect.name = formatName(anchorText);
            console.log(
              `    🔗 Found clean name in anchor: "${prospect.name}"`
            );
          } else if (isValidCellText) {
            // Try to extract clean name from cell text
            const cleanCellText = cellText
              .replace(/[\r\n\t]+/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            prospect.name = formatName(cleanCellText) || "N/A";
            console.log(
              `    📝 Using cleaned cell text for name: "${prospect.name}"`
            );
          }

          // Extract additional details from detail containers
          if (cell) {
            const detailContainers = querySelectorAll(
              cell,
              ".dgDetail-inner, .jobDetailContainer, .dgDetailContainer"
            );
            if (detailContainers.length > 0) {
              console.log(
                `    🔍 Found ${detailContainers.length} detail containers in name cell`
              );

              detailContainers.forEach(
                (container: any, containerIndex: number) => {
                  console.log(
                    `      🔧 Processing detail container ${containerIndex}`
                  );

                  // Extract details using cross-platform approach
                  const containerHtml =
                    container.innerHTML || container.outerHTML || "";
                  console.log(
                    `      📄 Container HTML length: ${containerHtml.length}`
                  );

                  // Look for formRow divs
                  const formRows = querySelectorAll(container, ".formRow");
                  if (formRows && formRows.length > 0) {
                    console.log(
                      `      🏷️ Found ${formRows.length} form rows in container`
                    );

                    formRows.forEach((formRow: any, formRowIndex: number) => {
                      console.log(
                        `        🔄 Processing form row ${formRowIndex}`
                      );

                      const labelElement = querySelector(
                        formRow,
                        ".emphasized.label, label"
                      );
                      if (labelElement) {
                        const labelText = (
                          labelElement.textContent ||
                          labelElement.text ||
                          ""
                        )
                          .trim()
                          .replace(":", "")
                          .toLowerCase();
                        const rowText =
                          formRow.textContent || formRow.text || "";
                        const labelTextInRow = (
                          labelElement.textContent ||
                          labelElement.text ||
                          ""
                        ).trim();

                        let valueText = rowText
                          .replace(labelTextInRow, "")
                          .trim();
                        valueText = valueText.replace(/^\s*:\s*/, "").trim();

                        console.log(
                          `        🏷️ Label: "${labelText}", Value: "${valueText}"`
                        );

                        // Only process if label and value are valid
                        if (
                          labelText &&
                          labelText.length < 50 &&
                          valueText &&
                          valueText.length < 200
                        ) {
                          // Map to prospect fields
                          switch (labelText) {
                            case "name":
                              const cleanName = valueText
                                .replace(/[\r\n\t]+/g, " ")
                                .replace(/\s+/g, " ")
                                .trim();
                              if (cleanName && cleanName !== "--") {
                                prospect.name = formatName(cleanName);
                                console.log(
                                  `        👤 Set clean name from detail: "${prospect.name}"`
                                );
                              }
                              break;
                            case "phone":
                              prospect.phone =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        📞 Set phone: "${prospect.phone}"`
                              );
                              break;
                            case "email":
                              prospect.email =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        📧 Set email: "${prospect.email}"`
                              );
                              break;
                            case "city":
                              prospect.city =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        🏙️ Set city: "${prospect.city}"`
                              );
                              break;
                            case "state":
                              prospect.state =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        🗺️ Set state: "${prospect.state}"`
                              );
                              break;
                            case "generic source":
                              prospect.genericSource =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        🔗 Set generic source: "${prospect.genericSource}"`
                              );
                              break;
                            case "specific source":
                              prospect.specificSource =
                                valueText === "--" ? "" : valueText;
                              console.log(
                                `        🎯 Set specific source: "${prospect.specificSource}"`
                              );
                              break;
                            default:
                              // Only store valid field names and values
                              if (
                                labelText &&
                                valueText &&
                                valueText !== "--" &&
                                labelText.length < 30 &&
                                valueText.length < 100
                              ) {
                                const fieldName = labelText
                                  .replace(/\s+/g, "_")
                                  .replace(/[^a-z0-9_]/g, "");
                                if (
                                  fieldName &&
                                  fieldName.length > 0 &&
                                  fieldName.length < 30
                                ) {
                                  const cleanValue = valueText
                                    .replace(/[\r\n\t]+/g, " ")
                                    .replace(/\s+/g, " ")
                                    .trim();
                                  prospect[fieldName] = cleanValue;
                                  prospect.extractedFields[fieldName] =
                                    cleanValue;
                                  console.log(
                                    `        ➕ Set custom field: "${fieldName}" = "${cleanValue}"`
                                  );
                                }
                              }
                              break;
                          }
                        } else {
                          console.log(
                            `        ⚠️ Skipping invalid label/value: "${labelText}" / "${valueText.substring(
                              0,
                              50
                            )}..."`
                          );
                        }
                      }
                    });
                  }
                }
              );
            } else {
              console.log(`    ℹ️ No detail containers found in name cell`);
            }
          }
        } else if (
          isValidHeader &&
          (header.toLowerCase().includes("applied") ||
            header.toLowerCase().includes("date"))
        ) {
          if (isValidCellText) prospect.lastContact = cellText;
        } else if (isValidHeader && header.toLowerCase().includes("status")) {
          if (isValidCellText)
            prospect.status =
              cellText === "Pre-Screened" ? "New Lead" : cellText;
        } else if (
          isValidHeader &&
          (header.toLowerCase().includes("job") ||
            header.toLowerCase().includes("category") ||
            header.toLowerCase().includes("position"))
        ) {
          if (isValidCellText)
            prospect.potentialPosition = cellText || "Not specified";
        } else if (isValidHeader && header.toLowerCase().includes("source")) {
          if (isValidCellText) prospect.source = cellText;
        } else if (isValidHeader && header.toLowerCase().includes("location")) {
          if (isValidCellText) prospect.location = cellText || "N/A";
        }
      });

      // Set default values for required fields if not already set
      prospect.name = formatName(prospect.name || prospect.Name || "N/A");
      prospect.source =
        prospect.source ||
        prospect.Source ||
        prospect.specificSource ||
        prospect.genericSource ||
        "Unknown";
      prospect.potentialPosition =
        prospect.potentialPosition ||
        prospect["Job Category"] ||
        "Not specified";
      prospect.location = prospect.location || prospect.Location || "N/A";
      prospect.status = prospect.status || prospect.Status || "New Lead";
      prospect.lastContact = prospect.lastContact || prospect.Applied || "";

      // Final cleanup: Remove any messy field names that might have slipped through
      const cleanProspect: any = {
        id: prospect.id,
        name: prospect.name,
        source: prospect.source,
        potentialPosition: prospect.potentialPosition,
        location: prospect.location,
        status: prospect.status,
        matchScore: prospect.matchScore,
        lastContact: prospect.lastContact,
        recruiter: prospect.recruiter,
        extractedFields: {},
      };

      // Copy over only valid additional fields
      Object.keys(prospect).forEach((key) => {
        if (
          key !== "extractedFields" &&
          key.length < 50 &&
          !key.includes("\r") &&
          !key.includes("\n") &&
          !key.includes("\t") &&
          key.match(/^[a-zA-Z0-9_\s%\-\.]+$/)
        ) {
          const value = prospect[key];
          if (
            typeof value === "string" &&
            value.length < 200 &&
            !value.includes("\r\n\t") &&
            !(
              value.includes("\r") &&
              value.includes("\n") &&
              value.includes("\t")
            )
          ) {
            cleanProspect[key] = value;
          } else if (typeof value === "number") {
            cleanProspect[key] = value;
          }
        }
      });

      // Copy over valid extracted fields
      Object.keys(prospect.extractedFields || {}).forEach((key) => {
        if (
          key.length < 50 &&
          !key.includes("\r") &&
          !key.includes("\n") &&
          !key.includes("\t") &&
          key.match(/^[a-zA-Z0-9_\s%\-\.]+$/)
        ) {
          const value = prospect.extractedFields[key];
          if (
            typeof value === "string" &&
            value.length < 200 &&
            !value.includes("\r\n\t") &&
            !(
              value.includes("\r") &&
              value.includes("\n") &&
              value.includes("\t")
            )
          ) {
            cleanProspect.extractedFields[key] = value;
          }
        }
      });

      console.log(
        `\n🎯 FINAL ${functionName} PROSPECT DATA FOR ROW ${rowIndex}:`
      );
      console.log(`  🆔 ID: ${cleanProspect.id}`);
      console.log(`  👤 Name: ${cleanProspect.name}`);
      console.log(`  🔗 Source: ${cleanProspect.source}`);
      console.log(`  💼 Position: ${cleanProspect.potentialPosition}`);
      console.log(`  📊 Total fields: ${Object.keys(cleanProspect).length}`);

      return cleanProspect as Prospect;
    });

    console.log(`\n🎉 === ${functionName} PROSPECTS EXTRACTION COMPLETE ===`);
    console.log(
      `✅ Successfully parsed ${prospects.length} prospects with dynamic structure`
    );
    console.log(`📊 All extracted headers:`, headers);
    console.log(`🔍 Sample prospect structure (first prospect):`, prospects[0]);

    // Log summary of all extracted fields
    const allFieldNames = new Set<string>();
    prospects.forEach((prospect: any) => {
      Object.keys(prospect).forEach((key) => {
        if (
          key !== "extractedFields" &&
          key.length < 50 &&
          !key.includes("\r") &&
          !key.includes("\n") &&
          !key.includes("\t") &&
          key.match(/^[a-zA-Z0-9_\s%\-\.]+$/)
        ) {
          allFieldNames.add(key);
        }
      });
    });
    console.log(
      `🏷️ All unique clean field names extracted (${allFieldNames.size}):`,
      Array.from(allFieldNames).sort()
    );

    console.log("Successfully parsed prospects from legacy system:", prospects);
    return prospects;
  } catch (error) {
    console.error(
      `Error fetching ${functionName.toLowerCase()} prospects:`,
      error
    );
    if (shouldThrowError) {
      throw error;
    }
    // Return empty array instead of throwing error
    return [];
  }
}

export async function getProspectsData(): Promise<Prospect[]> {
  return getProspectsByType("Req.QuickApply", "All Prospects", false);
}

export async function getProspectBookmarks(): Promise<Prospect[]> {
  return getProspectsByType(
    "Req.QuickApplyBookmarked",
    "Prospect Bookmarks",
    false
  );
}

export async function getTextApplyProspects(): Promise<Prospect[]> {
  return getProspectsByType("Req.QuickApply", "Text Apply Prospects", false);
}
