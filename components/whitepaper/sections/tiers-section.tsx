"use client"

import { useEffect, useRef, useState } from "react"
import { Unlock, Zap, Crown } from "lucide-react"
import Image from "next/image"

const tiers = [
  {
    icon: Unlock,
    name: "ACCESS",
    tagline: "Entry Level",
    nftImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sd.png-I0l88FPdJgvjIWGtjBcHf6eTj0CixP.jpeg",
    features: [
      "Broad ecosystem entry",
      "Reward cycle eligibility",
      "Standard app perks",
      "Community membership",
    ],
    note: "Lock longer → unlock more utility",
    multiplier: "1x",
    gradient: "from-muted-foreground/20",
  },
  {
    icon: Zap,
    name: "PRO",
    tagline: "Enhanced Level",
    nftImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.png-q1huZNHg4uoR4Y0cb5q0143WpXbYEP.jpeg",
    features: [
      "Enhanced platform access",
      "Higher participation rates",
      "Priority releases",
      "Advanced tools",
    ],
    note: "Built for users who want more control",
    multiplier: "2.5x",
    gradient: "from-accent/30",
    featured: true,
  },
  {
    icon: Crown,
    name: "ELITE",
    tagline: "Maximum Level",
    nftImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.png-OMWpjQy0QuYxL5kvPGtXSLzuJ16niD.jpeg",
    features: [
      "Maximum ecosystem access",
      "Exclusive privileges",
      "Long-term alignment rewards",
      "Governance participation",
    ],
    note: "For the core members shaping the future",
    multiplier: "5x",
    gradient: "from-chart-4/30",
  },
]

export function TiersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredTier, setHoveredTier] = useState<number | null>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tiers.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 200)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} data-section="tiers" className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">06</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">TIERS</span>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            NFT <span className="text-accent">Tiers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your level of commitment and unlock corresponding benefits within the ecosystem.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            const isVisible = visibleItems.includes(index)
            const isHovered = hoveredTier === index

            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <div
                  className={`relative h-full border bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 ${
                    tier.featured
                      ? "border-accent shadow-lg shadow-accent/10"
                      : isHovered
                      ? "border-accent/50"
                      : "border-border"
                  }`}
                >
                  {/* Featured badge */}
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-background text-xs font-mono">
                      RECOMMENDED
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} to-transparent opacity-30 transition-opacity ${
                      isHovered ? "opacity-50" : ""
                    }`}
                  />

                  <div className="relative z-10">
                    {/* NFT Avatar */}
                    <div className="relative mb-6">
                      <div
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          tier.featured
                            ? "border-accent shadow-lg shadow-accent/20"
                            : isHovered
                            ? "border-accent/50"
                            : "border-border"
                        }`}
                      >
                        <Image
                          src={tier.nftImage}
                          alt={`${tier.name} tier NFT`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                      </div>
                      {/* Icon badge */}
                      <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center ${
                          tier.featured
                            ? "bg-accent text-background"
                            : "bg-card border border-border text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Name and tagline */}
                    <h3
                      className={`text-2xl font-bold mb-1 ${
                        tier.featured ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">{tier.tagline}</p>

                    {/* Multiplier */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-mono font-bold text-foreground">{tier.multiplier}</span>
                      <span className="text-sm text-muted-foreground">multiplier</span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full ${tier.featured ? "bg-accent" : "bg-muted-foreground"}`} />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Note */}
                    <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                      {tier.note}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
