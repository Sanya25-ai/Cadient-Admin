"use client"

import { usePathname } from "next/navigation"
import ApplicationsNavbar from "./applications-navbar"

export default function DynamicApplicationsNavbar() {
  const pathname = usePathname()
  
  // Determine page title based on path
  let pageTitle = ""
  
  if (pathname.includes('/pool')) {
    pageTitle = "Application Pool: Passed Assessment"
  } else if (pathname.includes('/pre-screened/passed')) {
    pageTitle = "Pre-screened: Passed"
  } else if (pathname.includes('/pre-screened/failed')) {
    pageTitle = "Pre-screened: Did Not Pass"
  } else if (pathname.includes('/pre-screened')) {
    pageTitle = "Pre-screened Applications"
  } else if (pathname.includes('/tax-credit')) {
    pageTitle = "Tax Credit Eligible"
  } else if (pathname.includes('/hires')) {
    pageTitle = "Hires"
  } else if (pathname.includes('/failed-assessment')) {
    pageTitle = "Failed Assessment"
  } else if (pathname.includes('/incompletes')) {
    pageTitle = "Incompletes"
  } else if (pathname.includes('/bookmarks')) {
    pageTitle = "Your Bookmarks"
  } else if (pathname.includes('/top-applicants')) {
    pageTitle = "Top Applicants"
  }

  return (
    <ApplicationsNavbar pageTitle={pageTitle} />
  )
}
