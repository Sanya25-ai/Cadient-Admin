import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Extract filter parameters from request URL
    const { searchParams } = new URL(request.url)
    
    console.log("🔍 TEST: Received filter parameters:", Object.fromEntries(searchParams.entries()))
    
    // Check if we have any filter parameters
    const hasFilters = Array.from(searchParams.keys()).some(key => 
      key !== 'seq' && key !== 'applicationName' && key !== 'locale' && key !== 'reportType'
    )
    
    // Construct the URL for the legacy system
    const legacyUrl = new URL("http://localhost:8080/atao/index.jsp")
    
    if (hasFilters) {
      // When filters are applied, use the search event like the legacy system
      legacyUrl.searchParams.append("seq", "applicantGrid")
      legacyUrl.searchParams.append("applicationName", "ConsolidatedJAFTestClientdsiRAT")
      legacyUrl.searchParams.append("locale", "en_US")
      legacyUrl.searchParams.append("reportType", "AllApplicants")
      legacyUrl.searchParams.append("event", "com.deploy.application.hmc.plugin.ApplicantGrid.search")
      
      // Add filter parameters in the exact format expected by legacy system
      // Status filter - maps to hmcBidStatus
      const status = searchParams.get("status")
      if (status && status !== "all") {
        legacyUrl.searchParams.append("search.hmcBidStatus.value", status)
        legacyUrl.searchParams.append("search.hmcBidStatus.field", "hmcBidStatus")
        legacyUrl.searchParams.append("search.hmcBidStatus.op", "eq")
      }

      // Location filter - maps to bidLocation  
      const location = searchParams.get("location")
      if (location && location !== "all") {
        legacyUrl.searchParams.append("search.bidLocation.value", location)
        legacyUrl.searchParams.append("search.bidLocation.field", "location.id")
        legacyUrl.searchParams.append("search.bidLocation.op", "eq")
      }

      // Position filter - maps to posting.jobOpening.id
      const position = searchParams.get("position")
      if (position && position !== "all") {
        legacyUrl.searchParams.append("search.jobOpeningId.value", position)
        legacyUrl.searchParams.append("search.jobOpeningId.field", "posting.jobOpening.id")
        legacyUrl.searchParams.append("search.jobOpeningId.op", "eq")
      }

      // Application date filters - use bidDate
      const appliedFrom = searchParams.get("appliedFrom")
      if (appliedFrom) {
        legacyUrl.searchParams.append("search.appliedFrom.value", appliedFrom)
        legacyUrl.searchParams.append("search.appliedFrom.field", "bidDate")
        legacyUrl.searchParams.append("search.appliedFrom.op", "dt_ge_st")
      }

      const appliedTo = searchParams.get("appliedTo")
      if (appliedTo) {
        legacyUrl.searchParams.append("search.appliedTo.value", appliedTo)
        legacyUrl.searchParams.append("search.appliedTo.field", "bidDate")
        legacyUrl.searchParams.append("search.appliedTo.op", "dt_le_ed")
      }

      // Work preference filter
      const workPreference = searchParams.get("workPreference")
      if (workPreference && workPreference !== "all") {
        legacyUrl.searchParams.append("search.workPreference.value", workPreference)
        legacyUrl.searchParams.append("search.workPreference.field", "workPreference")
        legacyUrl.searchParams.append("search.workPreference.op", "eq")
      }

      // Application type filter - maps to isExternal
      const applicationType = searchParams.get("applicationType")
      if (applicationType && applicationType !== "all") {
        // Convert UI values to legacy system values
        const isExternalValue = applicationType === "external" ? "true" : "false"
        legacyUrl.searchParams.append("search.isExternal.value", isExternalValue)
        legacyUrl.searchParams.append("search.isExternal.field", "isExternal")
        legacyUrl.searchParams.append("search.isExternal.op", "eq")
      }
    } else {
      // No filters - just load the basic applicant grid
      legacyUrl.searchParams.append("seq", "applicantGrid")
      legacyUrl.searchParams.append("applicationName", "ConsolidatedJAFTestClientdsiRAT")
      legacyUrl.searchParams.append("locale", "en_US")
      legacyUrl.searchParams.append("reportType", "AllApplicants")
    }

    return NextResponse.json({
      hasFilters,
      receivedParams: Object.fromEntries(searchParams.entries()),
      constructedUrl: legacyUrl.toString(),
      urlParams: Object.fromEntries(legacyUrl.searchParams.entries())
    })
    
  } catch (error) {
    console.error("Error in test filter API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
