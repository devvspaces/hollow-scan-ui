"use client"

import { useEffect, useRef, useState } from "react"
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
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-section="${id}"]`)
    const header = document.querySelector("header")
    if (element) {
      const navHeight = header ? header.offsetHeight : 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)

      // Determine active section based on proximity to center of viewport
      const sections = containerRef.current.querySelectorAll("[data-section]")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionId = section.getAttribute("data-section")
        
        // If the section is currently occupying the middle of the screen
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          if (sectionId) setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Run once on mount
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
      <WhitepaperNav 
        activeSection={activeSection} 
        onSectionClick={scrollToSection} 
      />

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
