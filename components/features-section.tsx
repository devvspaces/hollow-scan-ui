"use client"

import { Zap, Globe, BarChart3, Layers } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Zap,
    title: "Sub-50ms Execution",
    description: "Lightning-fast automated checkout that secures items before they sell out.",
  },
  {
    icon: Globe,
    title: "100+ Site Coverage",
    description: "Support for major retailers across North America, Europe, and Asia.",
  },
  {
    icon: Layers,
    title: "Multi-Task Support",
    description: "Run multiple tasks simultaneously and secure more than one item per release.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track task success rates and checkout performance to optimize results.",
  },
]

export function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="px-6 py-24 md:px-12 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Built for Speed.
            <br />
            Designed to Win.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 md:p-10 bg-background hover:bg-card transition-all duration-500 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <feature.icon
                className="w-5 h-5 text-muted-foreground mb-6 group-hover:text-accent group-hover:scale-110 transition-all"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
