"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const words = ["RESTOCKS", "RELEASES", "DROPS", "ITEMS"]

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const [displayedChars, setDisplayedChars] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const word = words[currentWord]

    if (isTyping) {
      if (displayedChars.length < word.length) {
        const timeout = setTimeout(() => {
          setDisplayedChars(word.slice(0, displayedChars.length + 1))
        }, 80)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1500)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayedChars.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedChars(displayedChars.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setCurrentWord((prev) => (prev + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [currentWord, displayedChars, isTyping])

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 md:px-12 border-b border-border">
        <div className="flex items-center gap-3">
          <Image src="/images/hollowscan-logo.png" alt="Hollowscan logo" width={32} height={32} className="rounded" />
          <span className="text-lg font-semibold tracking-tight text-foreground">Hollowscan</span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="/whitepaper"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            Whitepaper
          </a>
          <a
            href="#waitlist"
            className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-foreground/90 transition-colors"
          >
            Join Waitlist
          </a>
        </nav>
      </header>

      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Small tagline */}
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8 animate-pulse">
            The fastest bot for securing
          </p>

          {/* Main headline with typing effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
            THE BOT for securing
            <br />
            <span className="inline-block text-accent min-w-[280px] md:min-w-[400px] text-left">
              {displayedChars}
              <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            The only automation platform offering unified monitoring across restocks, drops, and releases. From the team
            that pioneered automated checkout technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded hover:bg-foreground/90 transition-all hover:scale-105"
            >
              JOIN WAITLIST
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-4 border border-border text-muted-foreground text-sm font-mono hover:text-foreground hover:border-accent transition-all hover:scale-105"
            >
              [ VIEW FEATURES ]
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground font-mono">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  )
}
