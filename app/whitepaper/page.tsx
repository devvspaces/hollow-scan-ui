"use client"

import { useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { WhitepaperContent } from "@/components/whitepaper/whitepaper-content"

export default function WhitepaperPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <WhitepaperContent isVisible={!isLoading} />
    </>
  )
}
