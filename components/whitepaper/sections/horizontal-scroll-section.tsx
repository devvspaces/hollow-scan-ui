"use client"

import { useRef, useState } from "react"
import { Lock, Clock, Gift, Wallet, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const flowSteps = [
  {
    icon: Wallet,
    title: "Acquire NFT",
    description: "Get your Hollow Scan NFT from the official collection",
  },
  {
    icon: Lock,
    title: "Lock Your NFT",
    description: "Choose a lock period to boost your participation level",
  },
  {
    icon: Clock,
    title: "Hold Period",
    description: "Longer locks unlock stronger multipliers and benefits",
  },
  {
    icon: Sparkles,
    title: "Earn Stars",
    description: "Accumulate Platform Credits based on your tier and duration",
  },
  {
    icon: Gift,
    title: "Use Credits",
    description: "Redeem for discounts, upgrades, and exclusive features",
  },
  {
    icon: ShoppingBag,
    title: "Access Perks",
    description: "Unlock subscription discounts and limited experiences",
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
      <div className="px-6 md:px-12 mb-10">
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

      {/* Navigation controls */}
      <div className="px-6 md:px-12 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {flowSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-accent w-12' : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(flowSteps.length - 1, activeIndex + 1))}
              disabled={activeIndex === flowSteps.length - 1}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {flowSteps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === activeIndex

          return (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[320px] snap-center"
            >
              <div className={`relative h-[360px] border bg-background/80 backdrop-blur-sm overflow-hidden group transition-all duration-300 ${
                isActive ? 'border-accent/50 scale-100' : 'border-border hover:border-accent/30 scale-[0.97]'
              }`}>
                {/* Step number */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  isActive ? 'border-accent bg-accent/20' : 'border-accent/30'
                }`}>
                  <span className="text-sm font-mono text-accent">0{index + 1}</span>
                </div>

                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 transition-opacity ${
                  isActive ? 'opacity-60' : 'opacity-30'
                }`} />

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded border bg-accent/10 flex items-center justify-center mb-6 transition-all ${
                    isActive ? 'border-accent bg-accent/20' : 'border-accent/30 group-hover:bg-accent/20'
                  }`}>
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                    isActive ? 'text-accent' : 'text-foreground group-hover:text-accent'
                  }`}>
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground flex-1">{step.description}</p>

                  {/* Connection line to next card */}
                  {index < flowSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                      <div className={`w-6 h-[2px] transition-colors ${isActive ? 'bg-accent' : 'bg-border'}`} />
                      <div className={`w-2 h-2 rotate-45 border-t-2 border-r-2 -ml-1 transition-colors ${isActive ? 'border-accent' : 'border-border'}`} />
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors ${
                  isActive ? 'bg-accent' : 'bg-accent/30 group-hover:bg-accent'
                }`} />
              </div>
            </div>
          )
        })}
        {/* Spacer for last card */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>

      {/* Warning notice */}
      <div className="px-6 md:px-12 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded">
            <span className="text-xs text-destructive-foreground font-mono">WARNING</span>
            <span className="text-sm text-muted-foreground">Early unlocks may reduce or cancel rewards</span>
          </div>
        </div>
      </div>
    </section>
  )
}
