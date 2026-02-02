"use client"

import { useEffect, useRef, useState } from "react"

const lockDurationData = [
  { duration: "1 Month", multiplier: 1.0, percentage: 20 },
  { duration: "3 Months", multiplier: 1.5, percentage: 30 },
  { duration: "6 Months", multiplier: 2.5, percentage: 50 },
  { duration: "12 Months", multiplier: 4.0, percentage: 80 },
  { duration: "24 Months", multiplier: 5.0, percentage: 100 },
]

const creditUsageData = [
  { label: "Subscription Discounts", percentage: 35, color: "bg-accent" },
  { label: "In-App Upgrades", percentage: 25, color: "bg-chart-2" },
  { label: "Exclusive Features", percentage: 20, color: "bg-chart-3" },
  { label: "Limited Drops", percentage: 15, color: "bg-chart-4" },
  { label: "Redemption Events", percentage: 5, color: "bg-chart-5" },
]

const supportedSites = [
  { region: "North America", count: 45 },
  { region: "Europe", count: 35 },
  { region: "Asia", count: 20 },
]

export function ChartSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<number[]>(lockDurationData.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)

      setAnimatedValues(
        lockDurationData.map((item) => Math.round(item.percentage * eased))
      )

      if (step >= steps) clearInterval(interval)
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={sectionRef} data-section="charts" className="relative py-32 px-6 md:px-12 bg-card/30 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">07</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">ANALYTICS</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Platform <span className="text-accent">Metrics</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          Visualizing the ecosystem dynamics and credit utility distribution.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Lock Duration Chart */}
          <div className="p-6 border border-border bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-accent mb-1">CHART 01</p>
                <h3 className="text-xl font-semibold text-foreground">Lock Duration Multipliers</h3>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                RELATIVE POWER
              </div>
            </div>

            <div className="space-y-4">
              {lockDurationData.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">{item.duration}</span>
                    <span className="text-sm font-mono text-accent">{item.multiplier}x</span>
                  </div>
                  <div className="relative h-8 bg-muted/30 rounded overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/70 transition-all duration-1000 rounded flex items-center justify-end pr-3"
                      style={{
                        width: `${animatedValues[index]}%`,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="text-xs font-mono text-background font-semibold">
                        {animatedValues[index]}%
                      </span>
                    </div>
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {[25, 50, 75].map((pos) => (
                        <div
                          key={pos}
                          className="absolute top-0 bottom-0 w-[1px] bg-border/50"
                          style={{ left: `${pos}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Usage Pie Chart Alternative */}
          <div className="p-6 border border-border bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-accent mb-1">CHART 02</p>
                <h3 className="text-xl font-semibold text-foreground">Credit Utility Distribution</h3>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                USAGE BREAKDOWN
              </div>
            </div>

            {/* Stacked bar representation */}
            <div className="mb-6">
              <div className="h-12 rounded overflow-hidden flex">
                {creditUsageData.map((item, index) => (
                  <div
                    key={index}
                    className={`${item.color} transition-all duration-1000 flex items-center justify-center`}
                    style={{
                      width: isInView ? `${item.percentage}%` : "0%",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {item.percentage >= 15 && (
                      <span className="text-xs font-mono text-background font-semibold">
                        {item.percentage}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {creditUsageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Coverage Stats */}
        <div className="p-6 border border-border bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-mono text-accent mb-1">CHART 03</p>
              <h3 className="text-xl font-semibold text-foreground">Global Site Coverage</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-mono text-accent">100+ SITES</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportedSites.map((region, index) => (
              <div
                key={index}
                className={`text-center p-6 border border-border bg-card/30 transition-all duration-700 ${
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
                      strokeDasharray={`${isInView ? (region.count / 100) * 251 : 0} 251`}
                      className="text-accent transition-all duration-1000"
                      style={{ transitionDelay: `${index * 200}ms` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-foreground">{region.count}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">{region.region}</p>
                <p className="text-xs text-muted-foreground">supported sites</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
