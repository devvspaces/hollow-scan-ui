"use client"

import { useRef, useState } from "react"
import { Lock, Clock, Gift, Wallet, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const flowSteps = [
  {
    icon: Wallet,
    title: "Acquire NFT",
    description: "Secure your Hollow Scan NFT from the official collection to begin your journey.",
  },
  {
    icon: Lock,
    title: "Lock Your NFT",
    description: "Commit your assets to a lock period to scale your participation and tier ranking.",
  },
  {
    icon: Clock,
    title: "Hold Period",
    description: "Longer commitments unlock exponential multipliers and stronger Star yields.",
  },
  {
    icon: Sparkles,
    title: "Earn Stars",
    description: "Accumulate Stars boosted by your tier, lock duration, and referral network.",
  },
  {
    icon: ShoppingBag,
    title: "Access Perks",
    description: "Redeem Stars for subscription discounts, prize raffles, and exclusive platform utility.",
  },
]


export function HorizontalScrollSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = container.querySelector('div')?.offsetWidth || 320
    const gap = 24
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    })
    setActiveIndex(index)
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = container.querySelector('div')?.offsetWidth || 320
    const gap = 24
    const newIndex = Math.round(container.scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(newIndex, flowSteps.length - 1))
  }

  return (
    <section data-section="flow" className="relative bg-card/50 py-24">
      {/* Section header */}
      <div className="px-6 md:px-12 mb-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6 w-full max-w-xs">
            <span className="flex-1 h-[1px] bg-accent/30" />
            <span className="text-xs font-mono text-accent">STEP 05</span>
            <span className="flex-1 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Locking = <span className="text-accent">More Power</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            NFT holders can lock their NFTs for set periods to unlock higher participation levels. 
            This system rewards members who believe in the platform and stick around.
          </p>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="px-6 md:px-12 mb-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            {flowSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                  index === activeIndex ? "bg-accent shadow-[0_0_12px_oklch(var(--accent)/0.4)]" : "bg-border/40 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(flowSteps.length - 1, activeIndex + 1))}
              disabled={activeIndex === flowSteps.length - 1}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group"
              aria-label="Next step"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-8 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 justify-start xl:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {flowSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeIndex

            return (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[340px] snap-center pt-4"
              >
                <div className={`relative h-[400px] border rounded-2xl bg-card/10 backdrop-blur-md overflow-hidden group transition-all duration-500 ${
                  isActive ? "border-accent/40 shadow-[0_20px_40px_-15px_rgba(34,197,94,0.15)] scale-100" : "border-border/30 hover:border-accent/20 scale-[0.96] opacity-60 hover:opacity-100"
                }`}>
                  {/* Step number */}
                  <div className={`absolute top-6 right-6 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    isActive ? "border-accent bg-accent/10 rotate-[360deg]" : "border-accent/20"
                  }`}>
                    <span className="text-sm font-mono text-accent">0{index + 1}</span>
                  </div>

                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`} />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className={`w-14 h-14 rounded-xl border bg-accent/5 flex items-center justify-center mb-8 transition-all duration-500 ${
                      isActive ? "border-accent/40 bg-accent/10 scale-110" : "border-accent/20 group-hover:bg-accent/10"
                    }`}>
                      <Icon className="w-7 h-7 text-accent" />
                    </div>

                    <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {step.description}
                    </p>

                    {/* Connection line helper (only visible on big screens and if supported) */}
                    {index < flowSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                         <div className={`w-8 h-[1px] ${isActive ? "bg-accent/40" : "bg-border/20"}`} />
                      </div>
                    )}
                  </div>

                  {/* Top accent glow */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Warning notice */}
      <div className="px-6 md:px-12 mt-12">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-destructive/5 border border-destructive/20 rounded-full backdrop-blur-sm group hover:bg-destructive/10 transition-colors">
            <span className="text-[10px] font-mono font-bold text-destructive tracking-[0.2em] px-2 py-0.5 border border-destructive/30 rounded uppercase">WARNING</span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Early unlocks may reduce or cancel rewards</span>
          </div>
        </div>
      </div>
    </section>
  )
}
