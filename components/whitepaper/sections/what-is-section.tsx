"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Globe, Users, Shield } from "lucide-react"
import Image from "next/image"

const nftPreviews = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.png-q1huZNHg4uoR4Y0cb5q0143WpXbYEP.jpeg", alt: "Purple Hair NFT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sd.png-I0l88FPdJgvjIWGtjBcHf6eTj0CixP.jpeg", alt: "Explorer NFT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wer.png-f7HHVcb6D70ecHGiYp55MUzGWzKEyB.jpeg", alt: "Fire Samurai NFT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.png-OMWpjQy0QuYxL5kvPGtXSLzuJ16niD.jpeg", alt: "King Frog NFT" },
]

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Alerts",
    description: "Real-time restock and drop notifications that reach you before anyone else.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Automated monitoring across hundreds of sites in North America, Europe, and Asia.",
  },
  {
    icon: Users,
    title: "Member-Only Tools",
    description: "Exclusive features and automation reserved for serious users.",
  },
  {
    icon: Shield,
    title: "Gated Ecosystem",
    description: "A protected environment built for committed members seeking an edge.",
  },
]

export function WhatIsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const [textProgress, setTextProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 200)
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height * 0.3) / viewportHeight))
      setTextProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} data-section="what" className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Background text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[15vw] font-bold text-foreground/[0.02] pointer-events-none whitespace-nowrap"
        style={{
          transform: `translateX(${-textProgress * 30}%) translateY(-50%)`,
          transition: "transform 0.1s linear",
        }}
      >
        WHAT IS HOLLOW SCAN
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">02</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">OVERVIEW</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          What Is <span className="text-accent">Hollow Scan</span>?
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-16 leading-relaxed">
          Hollow Scan is a subscription-based automation and alert platform designed for resellers, 
          collectors, and digital entrepreneurs who want to dominate limited releases across global retailers.
        </p>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleItems.includes(index)

            return (
              <div
                key={index}
                className={`group relative p-8 border border-border bg-card/30 backdrop-blur-sm transition-all duration-700 hover:border-accent/50 hover:bg-card/50 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Number indicator */}
                <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/40">
                  0{index + 1}
                </span>

                <div className="flex items-start gap-4">
                  <div className="p-3 border border-accent/30 rounded bg-accent/5 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
                </div>
              </div>
            )
          })}
        </div>

        {/* NFT introduction teaser */}
        <div className="mt-16 p-8 border border-accent/30 bg-accent/5 backdrop-blur-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <p className="text-xs font-mono text-accent mb-2">ECOSYSTEM EXPANSION</p>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                NFT Collection Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                A limited NFT collection designed to reward long-term community members with enhanced access, 
                perks, and participation opportunities inside the ecosystem.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-mono text-accent">IN DEVELOPMENT</span>
              </div>
            </div>
            
            {/* NFT Preview Stack */}
            <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative h-32 w-64 md:w-80">
                {nftPreviews.map((nft, index) => (
                  <div
                    key={index}
                    className="absolute w-24 md:w-28 aspect-square rounded-lg overflow-hidden border-2 border-accent/30 shadow-xl transition-all duration-500 hover:z-50 hover:scale-110 hover:border-accent"
                    style={{
                      left: `${index * 45}px`,
                      top: `${index % 2 === 0 ? 0 : 20}px`,
                      zIndex: nftPreviews.length - index,
                      transform: `rotate(${-5 + index * 4}deg)`,
                    }}
                  >
                    <Image src={nft.src} alt={nft.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
