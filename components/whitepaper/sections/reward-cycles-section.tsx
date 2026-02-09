"use client"

import { useEffect, useRef, useState } from "react"

const seasons = [
  { name: "SEASON 1", status: "UPCOMING", color: "accent" },
  { name: "SEASON 2", status: "PLANNED", color: "muted" },
  { name: "SEASON 3", status: "PLANNED", color: "muted" },
  { name: "SEASON 4", status: "PLANNED", color: "muted" },
]

const factors = [
  { label: "NFT Tier", value: "Base multiplier", icon: "◆" },
  { label: "Lock Duration", value: "Time commitment", icon: "◇" },
  { label: "Engagement", value: "Optional boost", icon: "○" },
]

export function RewardCyclesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={sectionRef} data-section="rewards" className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">04</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">REWARDS</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Reward <span className="text-accent">Cycles</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
          The Hollow Scan ecosystem runs in seasons. During each season, eligible NFT holders 
          can earn Platform Credits ("Stars") based on multiple factors.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Season timeline */}
          <div>
            <p className="text-xs font-mono text-accent mb-6">SEASON ROADMAP</p>
            <div className="space-y-4">
              {seasons.map((season, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-4 p-4 border transition-all duration-500 ${
                    activeIndex === index
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card/30"
                  }`}
                >
                  {/* Timeline connector */}
                  {index < seasons.length - 1 && (
                    <div className="absolute left-7 top-full w-[2px] h-4 bg-border z-10" />
                  )}

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
                      activeIndex === index
                        ? "bg-accent text-background"
                        : "bg-card border border-border text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold transition-colors ${
                      activeIndex === index ? "text-accent" : "text-foreground"
                    }`}>
                      {season.name}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
                      activeIndex === index
                        ? "text-accent bg-accent/20"
                        : "text-muted-foreground bg-card"
                    }`}
                  >
                    {season.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Credit factors */}
          <div>
            <p className="text-xs font-mono text-accent mb-6">CREDIT FACTORS</p>
            <div className="space-y-6">
              {factors.map((factor, index) => (
                <div
                  key={index}
                  className={`group p-6 border border-border bg-card/30 hover:border-accent/50 hover:bg-card/50 transition-all duration-500 ${
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl text-accent">{factor.icon}</span>
                    <span className="text-xs font-mono text-muted-foreground">FACTOR 0{index + 1}</span>
                  </div>
                  <p className="text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {factor.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{factor.value}</p>
                </div>
              ))}
            </div>

            {/* Important notice */}
            <div className="mt-8 p-4 border border-border/50 bg-background/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-accent font-semibold">Important:</span> Credits have no fixed value, 
                are not guaranteed, and are designed for platform utility, not speculation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
