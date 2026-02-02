"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useLoading } from "@/contexts/loading-context"
import { LoadingScreen } from "@/components/loading-screen"

interface GlobalLoadingWrapperProps {
  children: ReactNode
}

export function GlobalLoadingWrapper({ children }: GlobalLoadingWrapperProps) {
  const { hasLoadedOnce, setHasLoadedOnce, isLoading, setIsLoading } = useLoading()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // If already loaded once, show content immediately
    if (hasLoadedOnce) {
      setShowContent(true)
      setIsLoading(false)
    }
  }, [hasLoadedOnce, setIsLoading])

  const handleLoadingComplete = () => {
    setHasLoadedOnce(true)
    setIsLoading(false)
    setShowContent(true)
  }

  // Show loading screen only if we haven't loaded before
  if (!hasLoadedOnce && isLoading) {
    return (
      <>
        <LoadingScreen onComplete={handleLoadingComplete} />
        <div className="opacity-0 pointer-events-none">{children}</div>
      </>
    )
  }

  return (
    <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  )
}
