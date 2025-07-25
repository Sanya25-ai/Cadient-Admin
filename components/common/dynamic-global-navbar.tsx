"use client"

import { usePathname } from "next/navigation"
import GlobalNavbar from "./global-navbar"
import { getSectionInfo } from "../helpers/section-helper"

export default function DynamicGlobalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on login page
  if (pathname === '/login') {
    return null
  }
  
  // Get section information based on current path
  const { title, section, sectionPath, pageTitle } = getSectionInfo(pathname || '')
  
  return (
    <GlobalNavbar 
      title={title}
      section={section}
      sectionPath={sectionPath}
      pageTitle={pageTitle}
    />
  )
}
