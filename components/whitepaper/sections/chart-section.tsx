"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, Star, Calendar, Globe, ArrowUpRight } from "lucide-react"

const LOCK_DURATION_DATA = [
  { duration: "Flexible", multiplier: "1.0x", percentage: 50 },
  { duration: "90 Days", multiplier: "1.25x", percentage: 62.5 },
  { duration: "180 Days", multiplier: "1.50x", percentage: 75 },
  { duration: "365 Days", multiplier: "2.0x", percentage: 100 },
  { duration: "24 Months", multiplier: "3.0x", percentage: 120 },
]

const STAR_USAGE_DATA = [
  { label: "Subscription Discounts", percentage: 40, color: "bg-chart-4", glow: "shadow-[0_0_15px_oklch(var(--chart-4)/0.4)]" },
  { label: "Raffle Entries", percentage: 30, color: "bg-chart-3", glow: "shadow-[0_0_15px_oklch(var(--chart-3)/0.4)]" },
  { label: "Limited Experiences", percentage: 20, color: "bg-accent", glow: "shadow-[0_0_15px_oklch(var(--accent)/0.4)]" },
  { label: "Redemption Events", percentage: 10, color: "bg-chart-2", glow: "shadow-[0_0_15px_oklch(var(--chart-2)/0.4)]" },
]

export function ChartSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<number[]>(LOCK_DURATION_DATA.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const steps = 60
    const stepDuration = duration / steps
    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 4) // Quartic ease out
      setAnimatedValues(LOCK_DURATION_DATA.map((item) => item.percentage * eased))
      if (step >= steps) clearInterval(interval)
    }, stepDuration)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section 
      ref={sectionRef} 
      data-section="data" 
      className="relative py-32 px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">07</span>
          <span className="flex-1 h-[1px] bg-white/10" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Analytics & Metrics</span>
        </div>

        <div className="mb-12 md:mb-20">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
            Operational <span className="text-accent underline decoration-white/10 underline-offset-8">Metrics</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Live visualization of ecosystem growth dynamics and utility distribution. All data is synchronized with the rewards multipliers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Chart 01: Lock Duration Multipliers */}
          <div className="group relative p-8 rounded-3xl bg-card/40 border border-white/5 hover:border-white/20 transition-all duration-500 backdrop-blur-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
              <Calendar className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10 flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Chart 01</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Lock Multipliers</h3>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Weight Impact</span>
                <span className="text-xs font-bold text-accent">SCALABLE</span>
              </div>
            </div>

            <div className="space-y-7 relative z-10">
              {LOCK_DURATION_DATA.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold text-white/80">{item.duration}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-muted-foreground">POWER</span>
                      <span className={`text-sm font-black ${item.multiplier.includes("3.0") ? "text-chart-3" : "text-accent"}`}>{item.multiplier}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-accent to-accent-foreground transition-all duration-1000 ease-out`}
                      style={{
                        width: `${animatedValues[index]}%`,
                        transitionDelay: `${index * 50}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
          </div>

          {/* Chart 02: Star Utility Distribution */}
          <div className="group relative p-8 rounded-3xl bg-card/40 border border-white/5 hover:border-white/20 transition-all duration-500 backdrop-blur-2xl overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
              <Star className="w-32 h-32 text-chart-4" />
            </div>

            <div className="relative z-10 flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-chart-4" />
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Chart 02</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Star Utility</h3>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Economy State</span>
                <span className="text-xs font-bold text-chart-4">HEALTHY</span>
              </div>
            </div>

            <div className="relative z-10 mb-10">
              <div className="h-14 rounded-2xl overflow-hidden flex border border-white/5 shadow-inner bg-white/5">
                {STAR_USAGE_DATA.map((item, index) => (
                  <div
                    key={index}
                    className={`${item.color} ${item.glow} transition-all duration-1000 ease-out border-r border-black/20 last:border-0`}
                    style={{
                      width: isInView ? `${item.percentage}%` : "0%",
                      transitionDelay: `${index * 150}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {STAR_USAGE_DATA.map((item, index) => (
                <div key={index} className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color} ${item.glow}`} />
                    <span className="text-sm font-medium text-white/70 group-hover/item:text-white transition-colors">{item.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white/40">{item.percentage}%</span>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
          </div>
        </div>

        {/* Global Site Coverage Stats */}
        <div className="p-6 border border-border bg-background/50 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center justify-between mb-6 p-4">
            <div>
              <p className="text-xs font-mono text-accent mb-1">CHART 03</p>
              <h3 className="text-xl font-bold text-foreground">Global Site Coverage</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-mono text-accent">100+ SITES</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { region: "UK", count: 55 },
              { region: "USA", count: 45 },
              { region: "Canada", count: 30 },
            ].map((region, index) => (
              <div
                key={index}
                className={`text-center p-6 border border-border bg-card/30 rounded-xl transition-all duration-700 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {/* Circular progress */}
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-muted/30"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="251"
                      strokeDashoffset={isInView ? 251 - (region.count / 100) * 251 : 251}
                      className="text-accent transition-all duration-1000"
                      style={{ transitionDelay: `${index * 200}ms` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-foreground">{region.count}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">{region.region}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">supported sites</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
