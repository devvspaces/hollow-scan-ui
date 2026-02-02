"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Lock, Key, Crown, Sparkles } from "lucide-react"

const utilities = [
  { icon: Sparkles, label: "Enhanced App Features", description: "Unlock premium automation tools" },
  { icon: Crown, label: "Ecosystem Status", description: "Recognition within the community" },
  { icon: Star, label: "Reward Cycle Eligibility", description: "Participate in seasonal rewards" },
  { icon: Key, label: "Priority Access", description: "First access to new tools & drops" },
  { icon: Lock, label: "Optional NFT Locking", description: "Deeper participation benefits" },
]

export function NFTUtilitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      setScrollY(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} data-section="nft" className="relative py-32 px-6 md:px-12 overflow-hidden bg-card/30">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,128,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,128,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: `translateY(${scrollY * 40}px)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">03</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">UTILITY</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              NFTs With <span className="text-accent">Real Utility</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Hollow Scan NFTs are utility-based digital assets, not investments. Each NFT unlocks 
              real features and benefits within the ecosystem.
            </p>

            {/* Key point callout */}
            <div className="p-6 border-l-2 border-accent bg-accent/5 mb-8">
              <p className="text-foreground font-medium">
                Holding an NFT is about commitment, access, and upside within the platform
                <span className="text-accent"> — not ownership or profit rights.</span>
              </p>
            </div>

            {/* Transparency notice */}
            <div className="flex items-start gap-4 p-4 bg-card/50 border border-border rounded">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Transparency First</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  NFTs do not represent equity, do not promise profits, and are not financial products. 
                  They are digital access keys to a powerful ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Utility cards with stagger animation */}
          <div className="relative">
            <div className="space-y-4">
              {utilities.map((utility, index) => {
                const Icon = utility.icon
                const delay = index * 0.1
                const translateY = isInView ? 0 : 40
                const opacity = isInView ? 1 : 0

                return (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-4 border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 hover:bg-card transition-all duration-500"
                    style={{
                      transform: `translateY(${translateY}px)`,
                      opacity,
                      transitionDelay: `${delay}s`,
                    }}
                  >
                    <div className="w-12 h-12 rounded border border-accent/30 bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {utility.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{utility.description}</p>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground/50">0{index + 1}</div>
                  </div>
                )
              })}
            </div>

            {/* Decorative element */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}
