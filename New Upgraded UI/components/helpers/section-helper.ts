/**
 * Helper functions to determine section titles and paths based on current path
 */

interface SectionInfo {
  title: string;
  section: string;
  sectionPath: string;
  pageTitle: string;
}

/**
 * Get section information based on the current pathname
 */
export function getSectionInfo(pathname: string): SectionInfo {
  // Default values
  const defaultInfo: SectionInfo = {
    title: "Cadient",
    section: "",
    sectionPath: "",
    pageTitle: "",
  };
  
  // Applications section
  if (pathname.includes('/applications')) {
    const info: SectionInfo = {
      ...defaultInfo,
      title: "Applications",
      section: "Applications",
      sectionPath: "/applications",
    };
    
    if (pathname.includes('/pool')) {
      info.pageTitle = "Application Pool: Passed Assessment";
    } else if (pathname.includes('/pre-screened/passed')) {
      info.pageTitle = "Pre-screened: Passed";
    } else if (pathname.includes('/pre-screened/failed')) {
      info.pageTitle = "Pre-screened: Did Not Pass";
    } else if (pathname.includes('/pre-screened')) {
      info.pageTitle = "Pre-screened Applications";
    } else if (pathname.includes('/tax-credit')) {
      info.pageTitle = "Tax Credit Eligible";
    } else if (pathname.includes('/hires')) {
      info.pageTitle = "Hires";
    } else if (pathname.includes('/failed-assessment')) {
      info.pageTitle = "Failed Assessment";
    } else if (pathname.includes('/incompletes')) {
      info.pageTitle = "Incompletes";
    } else if (pathname.includes('/bookmarks')) {
      info.pageTitle = "Your Bookmarks";
    } else if (pathname === '/applications') {
      // Main applications page - no breadcrumb
      info.section = "";
      info.sectionPath = "";
    }
    
    return info;
  } 
  // Prospects section
  else if (pathname.includes('/prospects')) {
    const info: SectionInfo = {
      ...defaultInfo,
      title: "Prospects",
    };
    
    if (pathname !== '/prospects') {
      info.section = "Prospects";
      info.sectionPath = "/prospects";
      info.pageTitle = "Prospect Details";
    }
    
    return info;
  }
  // Dashboard section
  else if (pathname.includes('/dashboard')) {
    return {
      ...defaultInfo,
      title: "Dashboard"
    };
  }
  // Availability Matched section
  else if (pathname.includes('/availability-matched')) {
    return {
      ...defaultInfo,
      title: "Availability Matched"
    };
  }
  // Applicant profiles
  else if (pathname.includes('/applicant')) {
    return {
      ...defaultInfo,
      title: "Applicant Profile",
      section: "Applications",
      sectionPath: "/applications",
      pageTitle: "Applicant Details"
    };
  }
  
  // Default return
  return defaultInfo;
}
