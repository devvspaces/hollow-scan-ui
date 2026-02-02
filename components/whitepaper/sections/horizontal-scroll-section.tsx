"use client"

import { useEffect, useRef, useState } from "react"
import { Lock, Clock, Gift, Wallet, ShoppingBag, Sparkles } from "lucide-react"

const flowSteps = [
  {
    icon: Wallet,
    title: "Acquire NFT",
    description: "Get your Hollow Scan NFT from the official collection",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Lock,
    title: "Lock Your NFT",
    description: "Choose a lock period to boost your participation level",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Clock,
    title: "Hold Period",
    description: "Longer locks unlock stronger multipliers and benefits",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Sparkles,
    title: "Earn Stars",
    description: "Accumulate Platform Credits based on your tier and duration",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Gift,
    title: "Use Credits",
    description: "Redeem for discounts, upgrades, and exclusive features",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: ShoppingBag,
    title: "Access Perks",
    description: "Unlock subscription discounts and limited experiences",
    color: "from-accent/20 to-accent/5",
  },
]

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight

      // Calculate progress (0 to 1) as the section scrolls through the viewport
      const start = rect.top
      const end = rect.bottom - windowHeight
      const totalScrollableDistance = sectionHeight - windowHeight

      if (totalScrollableDistance > 0) {
        const progress = Math.max(0, Math.min(1, -start / totalScrollableDistance))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate horizontal translate based on scroll progress
  const totalCards = flowSteps.length
  const cardWidth = 340 // Card width + gap
  const translateX = scrollProgress * (totalCards - 1) * cardWidth

  return (
    <section
      ref={sectionRef}
      data-section="flow"
      className="relative bg-card/50"
      style={{ height: `${200 + totalCards * 60}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Section header */}
        <div className="px-6 md:px-12 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono text-accent">05</span>
              <span className="flex-1 h-[1px] bg-border" />
              <span className="text-xs font-mono text-muted-foreground">LOCKING FLOW</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Locking = <span className="text-accent">More Power</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              NFT holders can lock their NFTs for set periods to unlock higher participation levels. 
              This system rewards members who believe in the platform and stick around.
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="px-6 md:px-12 mb-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">FLOW</span>
              <div className="flex-1 h-[2px] bg-border/50 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-accent transition-all duration-100"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-accent">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling cards */}
        <div ref={containerRef} className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 px-6 md:px-12 transition-transform duration-100"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {flowSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = scrollProgress >= index / (totalCards - 1) - 0.1

              return (
                <div
                  key={index}
                  className={`flex-shrink-0 w-[300px] md:w-[320px] transition-all duration-500 ${
                    isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"
                  }`}
                >
                  <div className="relative h-[360px] border border-border bg-background/80 backdrop-blur-sm overflow-hidden group hover:border-accent/50 transition-colors">
                    {/* Step number */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center">
                      <span className="text-sm font-mono text-accent">0{index + 1}</span>
                    </div>

                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-50`} />

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      <div className="w-16 h-16 rounded border border-accent/30 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-muted-foreground flex-1">{step.description}</p>

                      {/* Arrow indicator */}
                      {index < flowSteps.length - 1 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-accent/50 text-2xl z-20">
                          →
                        </div>
                      )}
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent/30 group-hover:bg-accent transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Warning notice */}
        <div className="px-6 md:px-12 mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded">
              <span className="text-xs text-destructive-foreground font-mono">WARNING</span>
              <span className="text-sm text-muted-foreground">Early unlocks may reduce or cancel rewards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
