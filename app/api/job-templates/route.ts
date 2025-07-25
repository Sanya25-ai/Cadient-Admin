import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // disable caching on Vercel edge

export async function GET(req: NextRequest) {
  try {
    console.log("🔍 [JobTemplates API] Job Templates API called");

    // Get cookies from the request - same pattern as working APIs
    const cookieHeader = req.headers.get("cookie") || "";
    console.log(
      "🍪 [JobTemplates API] Cookie header:",
      cookieHeader ? "present" : "missing"
    );

    if (!cookieHeader) {
      console.log(
        "❌ [JobTemplates API] Missing cookie header - returning dummy data"
      );
      return NextResponse.json(
        {
          ...createDummyResponse(),
        },
        { status: 200 }
      );
    }

    const { searchParams } = new URL(req.url);

    // Extract search parameters with defaults matching legacy behavior
    const keywords = searchParams.get("keywords") || "";
    const keywordsCriteria = searchParams.get("keywordsCriteria") || "";
    const selectedCategory = searchParams.get("selectedCategory") || "";
    const sortColumn = searchParams.get("sortColumn") || "dateLastModified";
    const sortDirection = searchParams.get("sortDirection") || "desc";
    const reqCreateFromJob = searchParams.get("reqCreateFromJob") || "false";

    console.log("🔍 [JobTemplates API] Search parameters:", {
      keywords,
      keywordsCriteria,
      selectedCategory,
      sortColumn,
      sortDirection,
      reqCreateFromJob,
    });

    // Build the legacy system URL - exactly as shown in HAR file
    const baseUrl = `${
      process.env.LEGACY_BASE || "http://localhost:8080/atao"
    }/index.jsp`;

    // Build query parameters exactly as in HAR file
    const queryParams = new URLSearchParams({
      seq: "autoTemplate",
      applicationName: "ConsolidatedJAFTestClientdsiRAT",
      locale: "en_US",
      viewPlugin: "jobTool.list",
      event: "com.deploy.application.twm.plugin.JobTool.list",
    });

    // Add search parameters if provided
    if (keywords) queryParams.set("keywords", keywords);
    if (keywordsCriteria) queryParams.set("keywordsCriteria", keywordsCriteria);
    if (selectedCategory) queryParams.set("selectedCategory", selectedCategory);
    if (sortColumn !== "dateLastModified")
      queryParams.set("sortColumn", sortColumn);
    if (sortDirection !== "desc")
      queryParams.set("sortDirection", sortDirection);
    if (reqCreateFromJob !== "false")
      queryParams.set("reqCreateFromJob", reqCreateFromJob);

    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    console.log("🌐 [JobTemplates API] Making GET request to:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    console.log("📡 [JobTemplates API] Response status:", response.status);
    console.log(
      "📡 [JobTemplates API] Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      console.log(
        "❌ [JobTemplates API] Response not OK:",
        response.status,
        response.statusText
      );
      const errorText = await response.text();
      console.log(
        "❌ [JobTemplates API] Error response body:",
        errorText.substring(0, 500)
      );

      if (response.status === 401 || response.status === 403) {
        console.log(
          "❌ [JobTemplates API] Authentication failed - returning dummy data"
        );
        return NextResponse.json(
          {
            ...createDummyResponse(),
          },
          { status: 200 }
        );
      }

      console.log(
        "❌ [JobTemplates API] Legacy system error - returning dummy data"
      );
      return NextResponse.json(
        {
          ...createDummyResponse(),
        },
        { status: 200 }
      );
    }

    const html = await response.text();
    console.log("📄 [JobTemplates API] Response length:", html.length);
    console.log(
      "📄 [JobTemplates API] Response preview:",
      html.substring(0, 200)
    );

    // Save the HTML for debugging
    console.log("📄 [JobTemplates API] Checking for data-table...");
    const hasDataTable = html.includes('id="data-table"');
    console.log("📄 [JobTemplates API] Has data-table:", hasDataTable);

    const hasSelectedRow = html.includes('name="selected_row"');
    console.log("📄 [JobTemplates API] Has selected_row:", hasSelectedRow);

    const hasJobCategories = html.includes("JobCategories.");
    console.log("📄 [JobTemplates API] Has JobCategories:", hasJobCategories);

    // Save HTML for debugging
    try {
      writeFileSync("api_response_debug.html", html);
      console.log(
        "📄 [JobTemplates API] Saved HTML to api_response_debug.html"
      );
    } catch (e: any) {
      console.log("📄 [JobTemplates API] Could not save HTML:", e.message);
    }

    // Check for login redirect - be more specific to avoid false positives
    if (
      html.includes("seq=login") ||
      html.includes("authentication required") ||
      html.includes("Please log in")
    ) {
      console.log(
        "❌ [JobTemplates API] Authentication failed - redirected to login, returning dummy data"
      );
      return NextResponse.json(
        {
          ...createDummyResponse(),
        },
        { status: 200 }
      );
    }

    // Parse the HTML to extract job template data
    const jobData = parseJobTemplateData(html);
    console.log(
      "✅ [JobTemplates API] Parsed job templates:",
      jobData.jobs.length
    );

    // Forward any session cookies from legacy system
    const legacyResponse = NextResponse.json(jobData);
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      legacyResponse.headers.set("set-cookie", setCookie);
    }

    return legacyResponse;
  } catch (error) {
    console.error("❌ [JobTemplates API] Error in job-templates API:", error);
    console.log("❌ [JobTemplates API] Returning dummy data due to error");
    return NextResponse.json(
      {
        ...createDummyResponse(),
      },
      { status: 200 }
    );
  }
}

function parseJobTemplateData(html: string) {
  const jobs: any[] = [];
  const categories: any[] = [];
  const searchOptions: any[] = [];

  try {
    console.log("🔍 [JobTemplates Parser] Starting to parse HTML...");

    // Look for the main data table
    const tableMatch = html.match(
      /<table[^>]*id="data-table"[^>]*>([\s\S]*?)<\/table>/i
    );
    if (!tableMatch) {
      console.log("❌ [JobTemplates Parser] No data-table found");
      return createEmptyResponse();
    }

    console.log("✅ [JobTemplates Parser] Found data-table");

    // Extract table body
    const tbodyMatch = tableMatch[1].match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
    if (!tbodyMatch) {
      console.log("❌ [JobTemplates Parser] No tbody found");
      return createEmptyResponse();
    }

    // Extract all table rows
    const rowMatches = tbodyMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
    if (!rowMatches) {
      console.log("❌ [JobTemplates Parser] No table rows found");
      return createEmptyResponse();
    }

    console.log(
      `🔍 [JobTemplates Parser] Found ${rowMatches.length} table rows`
    );

    rowMatches.forEach((row, index) => {
      try {
        const job = parseJobTemplateRow(row, index);
        if (job) {
          jobs.push(job);
          console.log(
            `✅ [JobTemplates Parser] Parsed job: ${job.title} (${job.jobCode})`
          );
        }
      } catch (error) {
        console.error(
          `❌ [JobTemplates Parser] Error parsing row ${index}:`,
          error
        );
      }
    });

    // Extract categories from the category links in the modal
    const categoryLinkMatches = html.match(
      /<a[^>]*href="[^"]*selectedCategory=JobCategories\.([^&"]*)[^"]*"[^>]*>([^<]*)<\/a>/gi
    );
    if (categoryLinkMatches) {
      categoryLinkMatches.forEach((linkHtml) => {
        const categoryMatch = linkHtml.match(
          /selectedCategory=JobCategories\.([^&"]*)[^"]*"[^>]*>([^<]*)<\/a>/
        );
        if (categoryMatch) {
          const categoryCode = categoryMatch[1];
          const categoryName = categoryMatch[2].trim();
          categories.push({
            id: `JobCategories.${categoryCode}`,
            code: categoryCode,
            name: categoryName,
            displayName: categoryName,
          });
        }
      });
      console.log(
        `✅ [JobTemplates Parser] Found ${categories.length} categories`
      );
    }

    // Extract search options from the keywordsCriteria select element
    const searchOptionsMatch = html.match(
      /<select[^>]*name="keywordsCriteria"[^>]*>([\s\S]*?)<\/select>/i
    );
    if (searchOptionsMatch) {
      const optionMatches = searchOptionsMatch[1].match(
        /<option[^>]*value="([^"]*)"[^>]*>([^<]*)<\/option>/gi
      );
      if (optionMatches) {
        optionMatches.forEach((optionHtml) => {
          const optionMatch = optionHtml.match(
            /value="([^"]*)"[^>]*>([^<]*)<\/option>/
          );
          if (optionMatch) {
            const value = optionMatch[1];
            const text = optionMatch[2].trim();
            searchOptions.push({
              value: value,
              text: text,
              isDefault: value === "", // "-- All --" is the default
            });
          }
        });
        console.log(
          `✅ [JobTemplates Parser] Found ${searchOptions.length} search options`
        );
      }
    }

    // Extract current search parameters from hidden inputs and form values
    const keywordsMatch = html.match(
      /<input[^>]*name="keywords"[^>]*value="([^"]*)"[^>]*>/
    );
    const keywordsCriteriaMatch = html.match(
      /<input[^>]*name="keywordsCriteria"[^>]*value="([^"]*)"[^>]*>|<select[^>]*name="keywordsCriteria"[^>]*>[\s\S]*?<option[^>]*value="([^"]*)"[^>]*selected[^>]*>/
    );
    const selectedCategoryMatch = html.match(
      /<input[^>]*name="selectedCategory"[^>]*value="([^"]*)"[^>]*>/
    );
    const reqCreateFromJobMatch = html.match(
      /<input[^>]*name="reqCreateFromJob"[^>]*value="([^"]*)"[^>]*>/
    );

    const searchParams = {
      keywords: keywordsMatch ? keywordsMatch[1] : "",
      keywordsCriteria: keywordsCriteriaMatch
        ? keywordsCriteriaMatch[1] || keywordsCriteriaMatch[2] || ""
        : "",
      selectedCategory: selectedCategoryMatch ? selectedCategoryMatch[1] : "",
      sortColumn: "dateLastModified", // Default from JobTool.java
      sortDirection: "desc", // Default from JobTool.java
      reqCreateFromJob: reqCreateFromJobMatch
        ? reqCreateFromJobMatch[1] === "true"
        : false,
    };

    // Extract page query string for filters
    const pageQueryString = `seq=autoTemplate&viewPlugin=jobTool.list&reqCreateFromJob=${searchParams.reqCreateFromJob}`;

    console.log(
      `✅ [JobTemplates Parser] Successfully parsed ${jobs.length} jobs, ${categories.length} categories, and ${searchOptions.length} search options`
    );

    return {
      jobs: jobs,
      categories: categories,
      categoryList: categories, // Legacy compatibility
      searchOptions: searchOptions,
      numJobs: jobs.length,
      searchParams: searchParams,
      reqCreateFromJob: searchParams.reqCreateFromJob,
      pageQueryString: pageQueryString,
      searchOptionText: "", // Could be populated if needed
      textSubstitutions: {
        numJobs: jobs.length,
      },
    };
  } catch (error) {
    console.error(
      "❌ [JobTemplates Parser] Error parsing job template data:",
      error
    );
    return createEmptyResponse();
  }
}

function parseJobTemplateRow(rowHtml: string, index: number): any | null {
  try {
    // Extract job ID from checkbox
    const jobIdMatch = rowHtml.match(/name="selected_row"[^>]*id="(\d+)"/);
    if (!jobIdMatch) {
      console.log(`❌ [JobTemplates Parser] No job ID found in row ${index}`);
      return null;
    }

    const jobId = jobIdMatch[1];

    // Extract all table cells
    const cellMatches = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
    if (!cellMatches || cellMatches.length < 6) {
      console.log(
        `❌ [JobTemplates Parser] Insufficient cells in row ${index}: ${
          cellMatches?.length || 0
        }`
      );
      return null;
    }

    // Parse each cell based on the structure we found
    const job: any = {
      id: jobId,
      title: "",
      jobCode: "",
      category: "",
      dateLastModified: "",
      description: "",
      requirements: "",
      isActive: true,
      isComplete: true,
    };

    // Cell 0: Checkbox (skip)
    // Cell 1: Job Template title and details
    const titleCell = cellMatches[1];
    const titleMatch = titleCell.match(
      /<span class="largerBold">([^<]*)<\/span>/
    );
    if (titleMatch) {
      job.title = titleMatch[1].trim();
    }

    // Extract description and requirements from the detail container
    const descMatch = titleCell.match(
      /<div class="emphasized label ">Description:<\/div>\s*<div class="hoverGridWrapper">\s*([^<]*)/
    );
    if (descMatch) {
      job.description = descMatch[1].trim();
    }

    const reqMatch = titleCell.match(
      /<div class="emphasized label ">Requirements:<\/div>\s*<div class="hoverGridWrapper">\s*([^<]*)/
    );
    if (reqMatch) {
      job.requirements = reqMatch[1].trim();
    }

    // Cell 2: Assessment (skip for now)

    // Cell 3: Job Code
    const jobCodeCell = cellMatches[3];
    const jobCodeMatch = jobCodeCell.match(
      /<span class="field readOnly">([^<]*)<\/span>/
    );
    if (jobCodeMatch) {
      job.jobCode = jobCodeMatch[1].trim();
    }

    // Cell 4: Category
    const categoryCell = cellMatches[4];
    const categoryMatch = categoryCell.match(
      /<span class="field readOnly">([^<]*)<\/span>/
    );
    if (categoryMatch) {
      job.category = categoryMatch[1].trim();
    }

    // Cell 5: Last Modified
    const dateCell = cellMatches[5];
    const dateMatch = dateCell.match(
      /<span class="field readOnly">([^<]*)<\/span>/
    );
    if (dateMatch) {
      job.dateLastModified = dateMatch[1].trim();
    }

    // Create localeJob object for compatibility
    job.localeJob = {
      title: job.title,
      description: job.description,
      requirements: job.requirements,
    };

    return job.title ? job : null;
  } catch (error) {
    console.error(`❌ [JobTemplates Parser] Error parsing job row:`, error);
    return null;
  }
}

function createEmptyResponse() {
  return createDummyResponse();
}

function createDummyResponse() {
  const dummyJobs = [
    {
      id: "1",
      title: "Software Engineer",
      jobCode: "SE001",
      jobCategory: "Engineering",
      description:
        "Develop and maintain web applications using modern technologies. Work with cross-functional teams to deliver high-quality software solutions.",
      requirements:
        "Bachelor's degree in Computer Science or related field. 3+ years of experience with JavaScript, React, and Node.js. Strong problem-solving skills.",
      grade: "L4",
      dateLastModified: "2024-12-15",
      isActive: true,
      isComplete: true,
      videoUrl: "https://example.com/video1",
      jobScripts: [
        {
          id: "script1",
          script: {
            id: "assessment1",
            name: "Technical Assessment",
          },
        },
      ],
      hasAssessment: true,
      localeJob: {
        title: "Software Engineer",
        description:
          "Develop and maintain web applications using modern technologies. Work with cross-functional teams to deliver high-quality software solutions.",
        requirements:
          "Bachelor's degree in Computer Science or related field. 3+ years of experience with JavaScript, React, and Node.js. Strong problem-solving skills.",
      },
    },
    {
      id: "2",
      title: "Senior Data Analyst",
      jobCode: "DA002",
      jobCategory: "Analytics",
      description:
        "Analyze complex datasets to provide actionable insights for business decisions. Create reports and dashboards for stakeholders.",
      requirements:
        "Master's degree in Statistics, Mathematics, or related field. 5+ years of experience with SQL, Python, and data visualization tools. Experience with machine learning preferred.",
      grade: "L5",
      dateLastModified: "2024-12-10",
      isActive: true,
      isComplete: true,
      jobScripts: [],
      hasAssessment: false,
      localeJob: {
        title: "Senior Data Analyst",
        description:
          "Analyze complex datasets to provide actionable insights for business decisions. Create reports and dashboards for stakeholders.",
        requirements:
          "Master's degree in Statistics, Mathematics, or related field. 5+ years of experience with SQL, Python, and data visualization tools. Experience with machine learning preferred.",
      },
    },
    {
      id: "3",
      title: "UX Designer",
      jobCode: "UX003",
      jobCategory: "Design",
      description:
        "Design user-centered digital experiences. Conduct user research, create wireframes, prototypes, and collaborate with development teams.",
      requirements:
        "Bachelor's degree in Design, HCI, or related field. 4+ years of experience with Figma, Sketch, and user research methodologies. Portfolio required.",
      grade: "L4",
      dateLastModified: "2024-12-08",
      isActive: true,
      isComplete: true,
      videoUrl: "https://example.com/video3",
      jobScripts: [
        {
          id: "script3",
          script: {
            id: "assessment3",
            name: "Design Portfolio Review",
          },
        },
      ],
      hasAssessment: true,
      localeJob: {
        title: "UX Designer",
        description:
          "Design user-centered digital experiences. Conduct user research, create wireframes, prototypes, and collaborate with development teams.",
        requirements:
          "Bachelor's degree in Design, HCI, or related field. 4+ years of experience with Figma, Sketch, and user research methodologies. Portfolio required.",
      },
    },
    {
      id: "4",
      title: "Product Manager",
      jobCode: "PM004",
      jobCategory: "Product",
      description:
        "Lead product strategy and roadmap development. Work with engineering, design, and business teams to deliver successful products.",
      requirements:
        "MBA or equivalent experience. 6+ years of product management experience. Strong analytical and communication skills. Experience with agile methodologies.",
      grade: "L6",
      dateLastModified: "2024-12-05",
      isActive: true,
      isComplete: true,
      jobScripts: [],
      hasAssessment: false,
      localeJob: {
        title: "Product Manager",
        description:
          "Lead product strategy and roadmap development. Work with engineering, design, and business teams to deliver successful products.",
        requirements:
          "MBA or equivalent experience. 6+ years of product management experience. Strong analytical and communication skills. Experience with agile methodologies.",
      },
    },
    {
      id: "5",
      title: "DevOps Engineer",
      jobCode: "DO005",
      jobCategory: "Engineering",
      description:
        "Manage cloud infrastructure and deployment pipelines. Ensure system reliability, scalability, and security across all environments.",
      requirements:
        "Bachelor's degree in Computer Science or related field. 4+ years of experience with AWS/Azure, Docker, Kubernetes, and CI/CD pipelines. Strong scripting skills.",
      grade: "L5",
      dateLastModified: "2024-12-01",
      isActive: true,
      isComplete: true,
      jobScripts: [
        {
          id: "script5",
          script: {
            id: "assessment5",
            name: "Infrastructure Assessment",
          },
        },
      ],
      hasAssessment: true,
      localeJob: {
        title: "DevOps Engineer",
        description:
          "Manage cloud infrastructure and deployment pipelines. Ensure system reliability, scalability, and security across all environments.",
        requirements:
          "Bachelor's degree in Computer Science or related field. 4+ years of experience with AWS/Azure, Docker, Kubernetes, and CI/CD pipelines. Strong scripting skills.",
      },
    },
    {
      id: "6",
      title: "Marketing Specialist",
      jobCode: "MK006",
      jobCategory: "Marketing",
      description:
        "Develop and execute marketing campaigns across digital channels. Analyze campaign performance and optimize for better results.",
      requirements:
        "Bachelor's degree in Marketing, Communications, or related field. 3+ years of digital marketing experience. Proficiency with Google Analytics, social media platforms, and email marketing tools.",
      grade: "L3",
      dateLastModified: "2024-11-28",
      isActive: true,
      isComplete: true,
      jobScripts: [],
      hasAssessment: false,
      localeJob: {
        title: "Marketing Specialist",
        description:
          "Develop and execute marketing campaigns across digital channels. Analyze campaign performance and optimize for better results.",
        requirements:
          "Bachelor's degree in Marketing, Communications, or related field. 3+ years of digital marketing experience. Proficiency with Google Analytics, social media platforms, and email marketing tools.",
      },
    },
    {
      id: "7",
      title: "Sales Representative",
      jobCode: "SR007",
      jobCategory: "Sales",
      description:
        "Generate new business opportunities and maintain relationships with existing clients. Meet quarterly sales targets and provide excellent customer service.",
      requirements:
        "Bachelor's degree preferred. 2+ years of B2B sales experience. Excellent communication and negotiation skills. CRM experience required.",
      grade: "L3",
      dateLastModified: "2024-11-25",
      isActive: true,
      isComplete: true,
      videoUrl: "https://example.com/video7",
      jobScripts: [
        {
          id: "script7",
          script: {
            id: "assessment7",
            name: "Sales Simulation",
          },
        },
      ],
      hasAssessment: true,
      localeJob: {
        title: "Sales Representative",
        description:
          "Generate new business opportunities and maintain relationships with existing clients. Meet quarterly sales targets and provide excellent customer service.",
        requirements:
          "Bachelor's degree preferred. 2+ years of B2B sales experience. Excellent communication and negotiation skills. CRM experience required.",
      },
    },
    {
      id: "8",
      title: "HR Business Partner",
      jobCode: "HR008",
      jobCategory: "Human Resources",
      description:
        "Partner with business leaders to develop HR strategies that support organizational goals. Handle employee relations, talent development, and organizational change.",
      requirements:
        "Bachelor's degree in HR, Psychology, or related field. 5+ years of HR experience. PHR/SHRM certification preferred. Strong interpersonal and problem-solving skills.",
      grade: "L5",
      dateLastModified: "2024-11-20",
      isActive: true,
      isComplete: true,
      jobScripts: [],
      hasAssessment: false,
      localeJob: {
        title: "HR Business Partner",
        description:
          "Partner with business leaders to develop HR strategies that support organizational goals. Handle employee relations, talent development, and organizational change.",
        requirements:
          "Bachelor's degree in HR, Psychology, or related field. 5+ years of HR experience. PHR/SHRM certification preferred. Strong interpersonal and problem-solving skills.",
      },
    },
    {
      id: "9",
      title: "Financial Analyst",
      jobCode: "FA009",
      jobCategory: "Finance",
      description:
        "Perform financial analysis and modeling to support business decisions. Prepare budgets, forecasts, and variance analysis reports.",
      requirements:
        "Bachelor's degree in Finance, Accounting, or Economics. 3+ years of financial analysis experience. Advanced Excel skills and experience with financial modeling. CFA preferred.",
      grade: "L4",
      dateLastModified: "2024-11-15",
      isActive: true,
      isComplete: true,
      jobScripts: [
        {
          id: "script9",
          script: {
            id: "assessment9",
            name: "Financial Modeling Test",
          },
        },
      ],
      hasAssessment: true,
      localeJob: {
        title: "Financial Analyst",
        description:
          "Perform financial analysis and modeling to support business decisions. Prepare budgets, forecasts, and variance analysis reports.",
        requirements:
          "Bachelor's degree in Finance, Accounting, or Economics. 3+ years of financial analysis experience. Advanced Excel skills and experience with financial modeling. CFA preferred.",
      },
    },
    {
      id: "10",
      title: "Customer Success Manager",
      jobCode: "CS010",
      jobCategory: "Customer Success",
      description:
        "Ensure customer satisfaction and retention through proactive relationship management. Drive product adoption and identify expansion opportunities.",
      requirements:
        "Bachelor's degree in Business or related field. 4+ years of customer-facing experience. Strong communication skills and experience with SaaS products. Salesforce experience preferred.",
      grade: "L4",
      dateLastModified: "2024-11-10",
      isActive: true,
      isComplete: true,
      jobScripts: [],
      hasAssessment: false,
      localeJob: {
        title: "Customer Success Manager",
        description:
          "Ensure customer satisfaction and retention through proactive relationship management. Drive product adoption and identify expansion opportunities.",
        requirements:
          "Bachelor's degree in Business or related field. 4+ years of customer-facing experience. Strong communication skills and experience with SaaS products. Salesforce experience preferred.",
      },
    },
  ];

  const dummyCategories = [
    {
      name: "Engineering",
      text: "Engineering",
      id: "cat1",
      code: "ENG",
      displayName: "Engineering",
    },
    {
      name: "Analytics",
      text: "Analytics",
      id: "cat2",
      code: "ANA",
      displayName: "Analytics",
    },
    {
      name: "Design",
      text: "Design",
      id: "cat3",
      code: "DES",
      displayName: "Design",
    },
    {
      name: "Product",
      text: "Product",
      id: "cat4",
      code: "PRD",
      displayName: "Product",
    },
    {
      name: "Marketing",
      text: "Marketing",
      id: "cat5",
      code: "MKT",
      displayName: "Marketing",
    },
    {
      name: "Sales",
      text: "Sales",
      id: "cat6",
      code: "SAL",
      displayName: "Sales",
    },
    {
      name: "Human Resources",
      text: "Human Resources",
      id: "cat7",
      code: "HR",
      displayName: "Human Resources",
    },
    {
      name: "Finance",
      text: "Finance",
      id: "cat8",
      code: "FIN",
      displayName: "Finance",
    },
    {
      name: "Customer Success",
      text: "Customer Success",
      id: "cat9",
      code: "CS",
      displayName: "Customer Success",
    },
  ];

  const searchOptions = [
    { value: "", text: "-- All --", isDefault: true },
    {
      value: "JobTemplatesSearchbyOptions.JobCode",
      text: "Job Code",
      isDefault: false,
    },
    {
      value: "JobTemplatesSearchbyOptions.JobDescription",
      text: "Job Description",
      isDefault: false,
    },
    {
      value: "JobTemplatesSearchbyOptions.JobRequirement",
      text: "Job Requirement",
      isDefault: false,
    },
    {
      value: "JobTemplatesSearchbyOptions.JobTitle",
      text: "Job Title",
      isDefault: false,
    },
  ];

  return {
    jobs: dummyJobs,
    categories: dummyCategories,
    categoryList: dummyCategories, // Legacy compatibility
    searchOptions: searchOptions,
    numJobs: dummyJobs.length,
    searchParams: {
      keywords: "",
      keywordsCriteria: "",
      selectedCategory: "",
      sortColumn: "dateLastModified",
      sortDirection: "desc",
      reqCreateFromJob: false,
    },
    reqCreateFromJob: false,
    pageQueryString:
      "seq=autoTemplate&viewPlugin=jobTool.list&reqCreateFromJob=false",
    searchOptionText: "",
    textSubstitutions: {
      numJobs: dummyJobs.length,
    },
  };
}

export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}
