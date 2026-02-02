"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { MouseGradientBackground } from "@/components/mouse-gradient-background"
import { WhitepaperHero } from "./sections/whitepaper-hero"
import { WhatIsSection } from "./sections/what-is-section"
import { NFTUtilitySection } from "./sections/nft-utility-section"
import { NFTShowcaseSection } from "./sections/nft-showcase-section"
import { RewardCyclesSection } from "./sections/reward-cycles-section"
import { HorizontalScrollSection } from "./sections/horizontal-scroll-section"
import { TiersSection } from "./sections/tiers-section"
import { ChartSection } from "./sections/chart-section"
import { FinalSection } from "./sections/final-section"
import { WhitepaperNav } from "./whitepaper-nav"

interface WhitepaperContentProps {
  isVisible: boolean
}

export function WhitepaperContent({ isVisible }: WhitepaperContentProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)

      // Determine active section
      const sections = containerRef.current.querySelectorAll("[data-section]")
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main
      ref={containerRef}
      className={`relative min-h-screen transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <MouseGradientBackground />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-border/30">
        <div
          className="h-full bg-accent transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <WhitepaperNav activeSection={activeSection} />

      <div className="relative z-10">
        <WhitepaperHero />
        <WhatIsSection />
        <NFTUtilitySection />
        <NFTShowcaseSection />
        <RewardCyclesSection />
        <HorizontalScrollSection />
        <TiersSection />
        <ChartSection />
        <FinalSection />
      </div>
    </main>
  )
}
