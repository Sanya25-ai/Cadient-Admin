"use client"

import React, { createContext, useContext } from "react"
import { useSavedSearches } from "@/hooks/use-saved-searches"

type SavedSearchesContextType = ReturnType<typeof useSavedSearches>

const SavedSearchesContext = createContext<SavedSearchesContextType | undefined>(undefined)

export function SavedSearchesProvider({ children }: { children: React.ReactNode }) {
  const savedSearchesData = useSavedSearches()

  return (
    <SavedSearchesContext.Provider value={savedSearchesData}>
      {children}
    </SavedSearchesContext.Provider>
  )
}

export function useSavedSearchesContext() {
  const context = useContext(SavedSearchesContext)
  if (context === undefined) {
    throw new Error('useSavedSearchesContext must be used within a SavedSearchesProvider')
  }
  return context
}
