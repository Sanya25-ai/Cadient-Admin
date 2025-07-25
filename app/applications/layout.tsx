import type React from "react"

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Note: This is a server component, so we need client components to handle dynamic content
  return (
    <div className="flex-1 overflow-auto" style={{
      height: "-webkit-fill-available"
    }}>
      {children}
    </div>
  )
}
