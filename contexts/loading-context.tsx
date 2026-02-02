"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LoadingContextType {
  hasLoadedOnce: boolean
  setHasLoadedOnce: (value: boolean) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check sessionStorage on mount
    const loaded = sessionStorage.getItem("hollowscan_loaded")
    if (loaded === "true") {
      setHasLoadedOnce(true)
      setIsLoading(false)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    // Persist to sessionStorage when loading completes
    if (hasLoadedOnce) {
      sessionStorage.setItem("hollowscan_loaded", "true")
    }
  }, [hasLoadedOnce])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <LoadingContext.Provider value={{ hasLoadedOnce, setHasLoadedOnce, isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
