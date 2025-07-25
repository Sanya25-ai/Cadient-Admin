import { NextRequest, NextResponse } from "next/server";

// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    firstName: "Giancarlo",
    lastName: "Berger",
    email: "gberger@yahoo1.com",
    location: "Atlanta, GA 30309",
    source: "Web Site",
    experience: "No work experience provided",
    applications: [
      { position: "Marine Carpenter (341)", date: "1/27/2022" },
      { position: "Marine Carpenter (321)", date: "1/26/2022" },
    ],
    initials: "GB",
    backgroundColor: "#FF8C00",
  },
  {
    id: 2,
    firstName: "Tim",
    lastName: "Collins",
    email: "tcollins@email.com",
    location: "Jackson County",
    source: "Web Site",
    experience: "Payroll Admin",
    applications: [{ position: "Pharmacist (664)", date: "4/3/2025" }],
    initials: "TC",
    backgroundColor: "#FF8C00",
  },
  {
    id: 3,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sjohnson@email.com",
    location: "Miami, FL 33101",
    source: "LinkedIn",
    experience: "Software Engineer with 5 years experience",
    applications: [
      { position: "Senior Developer (445)", date: "3/15/2025" },
      { position: "Tech Lead (446)", date: "3/10/2025" },
    ],
    initials: "SJ",
    backgroundColor: "#4CAF50",
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Davis",
    email: "mdavis@email.com",
    location: "Austin, TX 78701",
    source: "Indeed",
    experience: "Marketing Manager with 8 years experience",
    applications: [{ position: "Marketing Director (789)", date: "2/28/2025" }],
    initials: "MD",
    backgroundColor: "#2196F3",
  },
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract search parameters
    const keywords = formData.get("keywords")?.toString() || "";
    const firstName = formData.get("firstName")?.toString() || "";
    const lastName = formData.get("lastName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const generalSource = formData.get("generalSource")?.toString() || "";
    const candidateType = formData.get("candidateType")?.toString() || "";

    // Filter candidates based on search criteria
    let filteredCandidates = mockCandidates;

    if (firstName) {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.firstName.toLowerCase().includes(firstName.toLowerCase())
      );
    }

    if (lastName) {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.lastName.toLowerCase().includes(lastName.toLowerCase())
      );
    }

    if (email) {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    if (generalSource && generalSource !== "Choose one") {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.source.toLowerCase().includes(generalSource.toLowerCase())
      );
    }

    if (keywords) {
      filteredCandidates = filteredCandidates.filter(
        (candidate) =>
          candidate.experience.toLowerCase().includes(keywords.toLowerCase()) ||
          candidate.firstName.toLowerCase().includes(keywords.toLowerCase()) ||
          candidate.lastName.toLowerCase().includes(keywords.toLowerCase())
      );
    }

    // Return the filtered results as JSON
    return NextResponse.json({
      success: true,
      candidates: filteredCandidates,
      totalCandidates: filteredCandidates.length,
      totalApplications: filteredCandidates.reduce(
        (sum, candidate) => sum + candidate.applications.length,
        0
      ),
    });
  } catch (error) {
    console.error("Error in advanced search:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
