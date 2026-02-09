"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

const targetAudience = [
  { icon: "👟", label: "Sneakerheads", description: "Chasing limited releases" },
  { icon: "📦", label: "Resellers", description: "Scaling efficiently" },
  { icon: "🎴", label: "Collectors", description: "Securing retail prices" },
  { icon: "💻", label: "Entrepreneurs", description: "Building income through automation" },
]

export function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const fullText = "Dominate Every Time."

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={sectionRef} data-section="final" className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">08</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">CONCLUSION</span>
        </div>

        {/* Who it's for */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Who <span className="text-accent">Hollow Scan</span> Is For
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetAudience.map((item, index) => (
              <div
                key={index}
                className={`group p-6 border border-border bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50 transition-all duration-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <p className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-muted-foreground mt-8 text-center">
            If speed matters to you — <span className="text-accent font-semibold">you belong here.</span>
          </p>
        </div>

        {/* Final statement */}
        <div className="text-center py-16 border-t border-b border-border">
          <p className="text-sm font-mono text-accent mb-4">FINAL WORD</p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Technology. Speed.<br />Opportunity.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're here for the app, the NFTs, or both — this ecosystem is built to reward 
            commitment, consistency, and action.
          </p>

          {/* Animated tagline */}
          <div className="h-12 flex items-center justify-center mb-12">
            <p className="text-2xl md:text-3xl font-bold text-accent">
              {displayText}
              <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
            </p>
          </div>

          {/* Mantras */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-muted-foreground">
            <span className="px-4 py-2 border border-border bg-card/30 hover:border-accent/50 hover:text-accent transition-colors">
              Never miss again.
            </span>
            <span className="px-4 py-2 border border-border bg-card/30 hover:border-accent/50 hover:text-accent transition-colors">
              Never settle.
            </span>
            <span className="px-4 py-2 border border-accent bg-accent/10 text-accent">
              Dominate every time.
            </span>
          </div>
        </div>

        {/* CTA section */}
        <div className="py-16 text-center">
          <p className="text-sm font-mono text-muted-foreground mb-6">READY TO BEGIN?</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/#waitlist"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-semibold rounded hover:bg-accent/90 transition-all hover:scale-105"
            >
              JOIN WAITLIST
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-4 border border-border text-muted-foreground font-mono hover:text-foreground hover:border-accent transition-all"
            >
              [ BACK TO HOME ]
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/hollowscan-logo.png"
                alt="Hollowscan logo"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="text-sm text-muted-foreground">Hollowscan Whitepaper v1.0</span>
            </div>
            <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
              <span>DOCUMENT: HS-WP-001</span>
              <span>2024</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
