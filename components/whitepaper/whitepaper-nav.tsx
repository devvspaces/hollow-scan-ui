"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const sections = [
  { id: "hero", label: "INTRO" },
  { id: "what", label: "WHAT" },
  { id: "nft", label: "NFT" },
  { id: "rewards", label: "REWARDS" },
  { id: "flow", label: "FLOW" },
  { id: "tiers", label: "TIERS" },
  { id: "data", label: "DATA" },
  { id: "final", label: "FINAL" },
]

interface WhitepaperNavProps {
  activeSection: string
  onSectionClick: (id: string) => void
}

export function WhitepaperNav({ activeSection, onSectionClick }: WhitepaperNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll the active pill into view on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const activePill = scrollRef.current.querySelector(`[data-active="true"]`)
      if (activePill) {
        activePill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [activeSection])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex flex-col">
        {/* Top Row: Logo & Back Button */}
        <div className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/5 md:border-b-0">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/images/hollowscan-logo.png" alt="Hollowscan logo" width={28} height={28} className="rounded" />
            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
               <span className="text-sm font-semibold tracking-tight text-foreground">Hollowscan</span>
               <span className="text-[10px] md:text-xs font-mono text-accent border border-accent/30 px-2 py-0.5 rounded w-fit">WHITEPAPER</span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            [ BACK ]
          </Link>
        </div>

        {/* Bottom Row (Mobile) / Integrated Row (Desktop): Navigation Pills */}
        <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div 
            ref={scrollRef}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar px-6 py-3 md:p-0 mask-fade-edges md:mask-none"
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  data-active={isActive}
                  onClick={() => onSectionClick(section.id)}
                  className={`px-4 py-1.5 md:px-3 md:py-1 text-[10px] font-mono transition-all duration-300 rounded whitespace-nowrap outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                    isActive
                      ? "text-accent bg-accent/10 shadow-[inset_0_0_0_1px_rgba(var(--accent-rgb),0.2)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </header>
  )
}
