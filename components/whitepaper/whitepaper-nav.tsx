"use client"

import Image from "next/image"
import Link from "next/link"

const sections = [
  { id: 0, label: "INTRO" },
  { id: 1, label: "WHAT" },
  { id: 2, label: "NFT" },
  { id: 3, label: "REWARDS" },
  { id: 4, label: "FLOW" },
  { id: 5, label: "TIERS" },
  { id: 6, label: "DATA" },
  { id: 7, label: "FINAL" },
]

interface WhitepaperNavProps {
  activeSection: number
}

export function WhitepaperNav({ activeSection }: WhitepaperNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/images/hollowscan-logo.png" alt="Hollowscan logo" width={28} height={28} className="rounded" />
          <span className="text-sm font-semibold tracking-tight text-foreground">Hollowscan</span>
          <span className="text-xs font-mono text-accent border border-accent/30 px-2 py-0.5 rounded">WHITEPAPER</span>
        </Link>

        {/* Section indicators - hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`px-2 py-1 text-[10px] font-mono transition-all duration-300 ${
                activeSection === section.id
                  ? "text-accent bg-accent/10 rounded"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {section.label}
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          [ BACK ]
        </Link>
      </div>
    </header>
  )
}
