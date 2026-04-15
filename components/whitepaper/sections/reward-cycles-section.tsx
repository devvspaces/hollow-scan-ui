"use client"

import { useRef, useState, useEffect, useCallback, MouseEvent } from "react"
import Image from "next/image"

const TABS = [
  {
    key: "scale",
    label: "Multipliers",
    image: "/images/rewards/scale.png",
    imageAlt: "See How Rewards Scale — Multiplier Breakdown",
    headline: "Your rewards increase based on participation.",
    body: "More NFTs, longer locks, and referrals all increase your earning power.",
  },
  {
    key: "process",
    label: "Core Mechanics",
    image: "/images/rewards/process.png",
    imageAlt: "Stake NFTs, Earn Stars, Use Your Stars",
    headline: null,
    body: null,
  },
] as const

const PROCESS_CARDS = [
  { num: "01", title: "Stake NFTs", desc: "Activate rewards by staking your NFTs" },
  { num: "02", title: "Earn Stars", desc: "Earn based on your participation" },
  { num: "03", title: "Use Your Stars", desc: "Redeem rewards or enter raffles" },
]

const AUTO_INTERVAL_MS = 5000

// ── Reusable 3D Tilt Image Card ──────────────────────────────────────────────
function TiltImageCard({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [glowVisible, setGlowVisible] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    setTilt({ x: ((y / height) - 0.5) * -6, y: ((x / width) - 0.5) * 6 })
    setGlowPos({ x: (x / width) * 100, y: (y / height) * 100 })
    setGlowVisible(true)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowVisible(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full relative"
      style={{ perspective: "1400px" }}
    >
      <div
        className="w-full relative"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${glowVisible ? 1.01 : 1})`,
          transition: glowVisible
            ? "transform 0.08s ease-out"
            : "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
        />
        {/* Cursor spotlight — only visible area, no box */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glowVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(ellipse 320px 220px at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.05) 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  )
}

function UsageImageCard() {
  return (
    <TiltImageCard
      src="/images/rewards/usage.png"
      alt="How Stars Are Used"
      width={1600}
      height={1200}
    />
  )
}

function ReferImageCard() {
  return (
    <TiltImageCard
      src="/images/rewards/refer.png"
      alt="Refer & Earn — Powered by Real Revenue"
      width={1600}
      height={1000}
    />
  )
}

export function RewardCyclesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [glowVisible, setGlowVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const pausedRef = useRef(false)
  pausedRef.current = paused

  const advance = useCallback(() => {
    setActiveIdx(prev => (prev + 1) % TABS.length)
    setProgress(0)
    progressRef.current = 0
    startRef.current = performance.now()
  }, [])

  // Smooth RAF-based progress ticker
  useEffect(() => {
    startRef.current = performance.now()
    const tick = (now: number) => {
      if (!pausedRef.current) {
        const elapsed = now - startRef.current
        const pct = Math.min((elapsed / AUTO_INTERVAL_MS) * 100, 100)
        progressRef.current = pct
        setProgress(pct)
        if (pct >= 100) {
          setActiveIdx(prev => (prev + 1) % TABS.length)
          setProgress(0)
          progressRef.current = 0
          startRef.current = performance.now()
        }
      } else {
        // Freeze the clock
        startRef.current = now - (progressRef.current / 100) * AUTO_INTERVAL_MS
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [advance])

  // Mouse handlers for 3D tilt
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    setTilt({ x: ((y / height) - 0.5) * -8, y: ((x / width) - 0.5) * 8 })
    setGlowPos({ x: (x / width) * 100, y: (y / height) * 100 })
    setGlowVisible(true)
  }

  const handleMouseEnter = () => setPaused(true)

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowVisible(false)
    setPaused(false)
  }

  const handleTabClick = (idx: number) => {
    setPaused(true)
    setActiveIdx(idx)
    setProgress(0)
    progressRef.current = 0
    startRef.current = performance.now()
  }

  const tab = TABS[activeIdx]

  return (
    <section
      ref={sectionRef}
      data-section="rewards"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">04</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">REWARDS</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-10 md:mb-16 tracking-tight">
          Rewards <span className="text-accent underline decoration-white/10 underline-offset-4">Matrix</span>
        </h2>

        {/* ───────────────────────────────────── */}
        {/* BLOCK 1 — See How Rewards Scale       */}
        {/* ───────────────────────────────────── */}
        <div className="mb-28">

          {/* Sub-header + Tab toggle */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-border/40 pb-8">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1.5">
                See How Rewards Scale
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                Stake more. Lock longer. Earn more Stars.
              </p>
            </div>

            {/* Tab pills */}
            <div className="inline-flex items-center bg-card/50 border border-border/50 p-1 rounded-full backdrop-blur-sm self-start sm:self-auto shrink-0">
              {TABS.map((t, i) => {
                const isActive = activeIdx === i
                return (
                  <button
                    key={t.key}
                    onClick={() => handleTabClick(i)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-400 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${isActive
                        ? "bg-accent text-background shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {/* Subtle auto-progress fill on active tab only */}
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-white/[0.08] origin-left pointer-events-none"
                        style={{
                          transform: `scaleX(${progress / 100})`,
                          transformOrigin: "left center",
                          transition: "none",
                        }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-6">
            {TABS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                aria-label={`View tab ${i + 1}`}
                className={`relative h-[3px] rounded-full overflow-hidden transition-all duration-500 ${i === activeIdx ? "w-10 bg-border/60" : "w-3 bg-border/40 hover:bg-border/60"
                  }`}
              >
                {i === activeIdx && (
                  <span
                    className="absolute inset-y-0 left-0 bg-accent rounded-full"
                    style={{ width: `${paused ? 100 : progress}%`, transition: "none" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* 
            ─── 3D Interactive Image Stack ─── 
            STABILITY SYSTEM: Using an invisible copy of the tallest image (scale.png) 
            to define the height. This ensures the container is always exactly the right 
            size, preventing page jitter and overlap across all screen sizes.
          */}
          <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full relative mt-16 mb-10 group"
            style={{ perspective: "1400px" }}
          >
            {/* 1. GHOST SPACER: Keeps height perfectly steady without code-based Ratios */}
            <div className="w-full pointer-events-none invisible opacity-0 translate-z-0">
               <Image
                 src={TABS[0].image}
                 alt="spacer"
                 width={1600}
                 height={1000}
                 className="w-full h-auto"
                 priority
               />
            </div>

            {/* 2. THE FLOATING INTERACTIVE STACK */}
            <div
              className="absolute inset-x-0 top-0 bottom-0"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                alignItems: "center",
                justifyItems: "center",
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${glowVisible ? 1.01 : 1})`,
                transition: glowVisible
                  ? "transform 0.08s ease-out"
                  : "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                transformStyle: "preserve-3d",
              }}
            >
              {TABS.map((t, i) => (
                <div
                  key={t.key}
                  style={{
                    gridArea: "1 / 1",
                    opacity: i === activeIdx ? 1 : 0,
                    transition: "opacity 0.7s ease",
                    pointerEvents: i === activeIdx ? "auto" : "none",
                    backfaceVisibility: "hidden",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={t.image}
                    alt={t.imageAlt}
                    width={1600}
                    height={1000}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 
            ─── Tab-specific supporting text ─── 
            OPTIMIZED: Grid stacking for stability + mobile-first spacing.
          */}
          <div className="relative z-10">
            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
              {/* Scale supporting text */}
              <div
                style={{
                  gridArea: "1 / 1",
                  opacity: activeIdx === 0 ? 1 : 0,
                  transform: activeIdx === 0 ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  pointerEvents: activeIdx === 0 ? "auto" : "none",
                }}
              >
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Your rewards increase based on participation.
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    More NFTs, longer locks, and referrals all increase your earning power.
                  </p>
                </div>
              </div>

              {/* Process cards */}
              <div
                style={{
                  gridArea: "1 / 1",
                  opacity: activeIdx === 1 ? 1 : 0,
                  transform: activeIdx === 1 ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  pointerEvents: activeIdx === 1 ? "auto" : "none",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {PROCESS_CARDS.map((card) => (
                    <div
                      key={card.num}
                      className="group p-6 border border-border/30 rounded-2xl bg-card/10 backdrop-blur-sm hover:bg-card/30 hover:border-accent/30 transition-all duration-400"
                    >
                      <span className="text-[10px] font-mono text-accent/60 tracking-widest block mb-4">
                        {card.num}
                      </span>
                      <p className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {card.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────── */}
        {/* BLOCK 2 — What Are Stars?             */}
        {/* ───────────────────────────────────── */}
        <div className="border-t border-border/40 pt-20 mb-28">
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            What Are Stars?{" "}
            <span className="text-accent/80 animate-[pulse_2s_ease-in-out_infinite]">★</span>
          </p>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center mb-14">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Stars are the reward unit of the Hollow Scan ecosystem. You earn Stars by staking NFTs
              and increasing your participation through locking and referrals.
            </p>
            <div className="shrink-0 px-5 py-3 rounded-xl border border-accent/20 bg-accent/5">
              <span className="text-accent font-semibold text-base whitespace-nowrap">
                More participation = more Stars
              </span>
            </div>
          </div>

          {/* Usage infographic — with 3D tilt */}
          <UsageImageCard />

          <div className="mt-10">
            <p className="text-lg font-semibold text-foreground mb-1">
              Earn Stars through staking — then choose how to use them.
            </p>
            <p className="text-base text-muted-foreground">
              Redeem rewards, enter raffles, or save for bigger opportunities.
            </p>
          </div>
        </div>

        {/* ───────────────────────────────────── */}
        {/* BLOCK 3 — Powered by Real Revenue     */}
        {/* ───────────────────────────────────── */}
        <div className="border-t border-border/40 pt-20">
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Powered by Real Revenue
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-14">
            A portion of Hollow Scan subscription revenue is allocated to a monthly rewards pool.
            As the platform grows, the rewards grow.
          </p>

          {/* Refer & Earn infographic — with 3D tilt */}
          <ReferImageCard />

          <div className="mt-10">
            <p className="text-lg font-semibold text-foreground mb-1">
              Boost Your Rewards
            </p>
            <p className="text-base text-muted-foreground">
              Refer users and increase your reward power. Active referrals contribute to your overall earning potential.
            </p>
          </div>
        </div>

        {/* ───────────────────────────────────── */}
        {/* FOOTER — Important Notes & CTA        */}
        {/* ───────────────────────────────────── */}
        <div className="mt-32 pt-12 border-t border-border/40">
          {/* Legal/Important Notes */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-20">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono text-accent/50 tracking-widest uppercase block mb-4">
                Important Notes
              </span>
              <ul className="space-y-2">
                {[
                  "NFTs must be staked to earn rewards",
                  "Rewards are variable and not guaranteed",
                  "Stars have no fixed monetary value",
                  "Rewards are distributed from platform revenue",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-3 text-[11px] md:text-xs text-muted-foreground/60 leading-relaxed">
                    <span className="text-accent/40 mt-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hidden md:block text-right">
              <span className="text-[10px] font-mono text-muted-foreground/20 uppercase tracking-tighter">
                Hollow Scan Whitepaper v1.0
              </span>
            </div>
          </div>

          {/* Final CTA */}
          <div className="relative group overflow-hidden rounded-[2rem] bg-gradient-to-b from-card/30 to-transparent border border-border/50 p-12 md:p-24 text-center">
            {/* Background Accent Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h3 className="relative z-10 text-3xl md:text-5xl font-bold text-foreground mb-10 tracking-tight leading-tight">
              Own. Stake. Earn.<br />
              <span className="text-accent">Choose Your Rewards.</span>
            </h3>

            <div className="relative z-10 flex flex-col items-center gap-5">
              <button 
                disabled
                className="px-10 py-4 bg-accent/5 border border-accent/20 rounded-full text-accent font-bold text-xs tracking-[0.2em] uppercase transition-all hover:bg-accent/10 hover:border-accent/40 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                [ Mint Coming Soon ]
              </button>
              <p className="text-[10px] text-muted-foreground/40 font-mono tracking-widest uppercase">
                Stay tuned for minting details
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
