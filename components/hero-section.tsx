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
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono hidden sm:block"
          >
            View Features
          </a>
          <a
            href="#download"
            className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded hover:bg-foreground/90 transition-colors"
          >
            Download
          </a>
        </nav>
      </header>

      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Small tagline */}
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8 animate-pulse">
            The fastest app for securing
          </p>

          {/* Main headline with typing effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
            THE APP for securing
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

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://hollowscan.com/ios"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background font-medium rounded hover:bg-foreground/90 transition-all hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>
                <span className="text-xs font-mono opacity-70 block leading-none">Download on the</span>
                App Store
              </span>
            </a>
            <a
              href="https://hollowscan.com/android"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-4 border border-border text-foreground hover:border-accent hover:text-accent font-medium rounded transition-all hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.528c.6-.3.917-.8.917-1.57s-.317-1.27-.917-1.57l-3.074-1.527-3.246 3.244 3.246 3.951zM4.609 3.791a2.2 2.2 0 0 0-.109.75v15.908c0 .274.039.52.109.743l8.34-8.34-8.34-9.061zm7.955 8.633-8.34 8.342c.52.374 1.113.326 1.746-.016l10.553-5.835-3.959-2.491z" />
              </svg>
              <span>
                <span className="text-xs font-mono opacity-70 block leading-none">Get it on</span>
                Google Play
              </span>
            </a>
          </div>

          {/* QR Code hint */}
          <p className="text-xs text-muted-foreground font-mono tracking-widest">
            ↓ SCAN TO DOWNLOAD
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground font-mono">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  )
}
