"use client"

import { useEffect, useState, useRef } from "react"

export function StatsSection() {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [sitesCount, setSitesCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const launchDate = new Date("2025-06-01T00:00:00Z")

    const updateTimer = () => {
      const now = new Date()
      const diff = now.getTime() - launchDate.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setElapsed({ days, hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && sitesCount < 100) {
      const timeout = setTimeout(() => {
        setSitesCount((prev) => Math.min(prev + 2, 100))
      }, 20)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, sitesCount])

  const formatNumber = (n: number) => n.toString().padStart(2, "0")

  return (
    <section ref={sectionRef} className="border-t border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {/* Timer */}
        <div className="p-6 md:p-8 border-r border-b lg:border-b-0 border-border group hover:bg-card/50 transition-colors">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">SINCE DEVELOPMENT</p>
          <p className="text-2xl md:text-3xl font-mono text-foreground group-hover:text-accent transition-colors">
            {formatNumber(elapsed.days)}:{formatNumber(elapsed.hours)}:{formatNumber(elapsed.minutes)}:
            <span className="text-accent">{formatNumber(elapsed.seconds)}</span>
          </p>
        </div>

        {/* Speed Stats */}
        <div className="p-6 md:p-8 border-r-0 lg:border-r border-b lg:border-b-0 border-border group hover:bg-card/50 transition-colors">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">SPEED</p>
          <div className="space-y-1">
            <p className="text-sm text-foreground flex items-center gap-2">
              Execution
              <span className="text-accent font-mono">&lt;50ms</span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            </p>
            <p className="text-sm text-foreground">
              Response<span className="text-muted-foreground ml-2">Instant</span>
            </p>
          </div>
        </div>

        {/* Coverage */}
        <div className="p-6 md:p-8 border-r border-border group hover:bg-card/50 transition-colors">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">COVERAGE</p>
          <div className="space-y-1">
            <p className="text-sm text-foreground">
              Sites<span className="text-accent font-mono ml-2">{sitesCount}+</span>
            </p>
            <p className="text-sm text-foreground">
              Regions<span className="text-muted-foreground ml-2">Global</span>
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="p-6 md:p-8 group hover:bg-card/50 transition-colors">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">STATUS</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm text-foreground">Development</span>
          </div>
        </div>
      </div>
    </section>
  )
}
