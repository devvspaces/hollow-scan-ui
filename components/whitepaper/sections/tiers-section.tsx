"use client"

import { useRef, useState, MouseEvent } from "react"
import { Shield, Zap, Crown, Info, Sparkles, Activity, LucideIcon } from "lucide-react"
import Image from "next/image"

interface TierStats {
  lock: string
  lockPct: number // Normalized to 2.0x max
  multiplier: string
  wallet: string
  walletPct: number // Normalized to 1.15x max
  referrals: string
  weight: string
  earnings: string
}

interface Tier {
  key: string
  name: string
  label: string
  nftCount: string
  nftImage: string
  icon: LucideIcon
  colorClass: string
  stats: TierStats
  recommended?: boolean
  bgGradient: string
  borderHighlight: string
  textHighlight: string
  glowColor: string
}

const TIERS: Tier[] = [
  {
    key: "starter",
    name: "STARTER",
    label: "TIER 01",
    nftCount: "1 NFT",
    nftImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sd.png-I0l88FPdJgvjIWGtjBcHf6eTj0CixP.jpeg",
    icon: Shield,
    colorClass: "text-accent",
    glowColor: "var(--accent)",
    stats: {
      lock: "Flexible",
      lockPct: 50, // 1.0x out of 2.0x
      multiplier: "1.0x",
      wallet: "1.0x",
      walletPct: 0, // No bonus
      referrals: "0",
      weight: "1.00",
      earnings: "~10 STARS",
    },
    bgGradient: "from-accent/10 to-transparent",
    borderHighlight: "border-accent/30",
    textHighlight: "text-accent",
  },
  {
    key: "core",
    name: "CORE USER",
    label: "TIER 02",
    nftCount: "5 NFTs",
    nftImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.png-q1huZNHg4uoR4Y0cb5q0143WpXbYEP.jpeg",
    icon: Zap,
    colorClass: "text-chart-4",
    glowColor: "var(--chart-4)",
    recommended: true,
    stats: {
      lock: "90 Days",
      lockPct: 62.5, // 1.25x out of 2.0x
      multiplier: "1.25x",
      wallet: "1.1x",
      walletPct: 66, // (1.1 - 1.0) / (1.15 - 1.0)
      referrals: "0",
      weight: "6.875",
      earnings: "~69 STARS",
    },
    bgGradient: "from-chart-4/10 to-transparent",
    borderHighlight: "border-chart-4/30",
    textHighlight: "text-chart-4",
  },
  {
    key: "power",
    name: "POWER USER",
    label: "TIER 03",
    nftCount: "10 NFTs",
    nftImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.png-OMWpjQy0QuYxL5kvPGtXSLzuJ16niD.jpeg",
    icon: Crown,
    colorClass: "text-chart-3",
    glowColor: "var(--chart-3)",
    stats: {
      lock: "365 Days",
      lockPct: 100, // 2.0x max
      multiplier: "2.0x",
      wallet: "1.15x",
      walletPct: 100, // 1.15x max
      referrals: "10 Active (+1.0)",
      weight: "24.00",
      earnings: "~240 STARS",
    },
    bgGradient: "from-chart-3/10 to-transparent",
    borderHighlight: "border-chart-3/30",
    textHighlight: "text-chart-3",
  },
]

function TierCard({ tier }: { tier: Tier }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -6
    const rotateY = ((x / rect.width) - 0.5) * 6
    setTilt({ x: rotateX, y: rotateY })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 })
        setIsHovered(false)
      }}
      className="relative flex flex-col h-full transition-all duration-500"
      style={{ perspective: "1500px" }}
    >
      <div 
        className={`relative flex flex-col h-full bg-card/60 backdrop-blur-3xl border ${tier.borderHighlight} rounded-3xl overflow-hidden transition-all duration-500 ${isHovered ? "shadow-2xl shadow-black/80 border-white/20" : "shadow-xl border-white/5"}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Tier Accent Glow (Fixed Opacity for clarity) */}
        <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${tier.bgGradient} opacity-60 pointer-events-none`} />

        {/* Card Header */}
        <div className="p-8 pb-0 flex justify-between items-start z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">{tier.label}</span>
            <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{tier.name}</h3>
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
             <span className="text-xs font-bold text-white">{tier.nftCount}</span>
          </div>
        </div>

        {/* Main Visual */}
        <div className="px-8 pt-8 relative z-10">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
            <Image 
              src={tier.nftImage} 
              alt={tier.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {tier.recommended && (
              <div className="absolute bottom-4 left-4 z-20">
                <div className="px-4 py-1.5 bg-accent text-background rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
          </div>
        </div>

        {/* Performance Specs */}
        <div className="p-8 flex-1 flex flex-col z-10">
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-x-8 items-end">
               <div className="space-y-1.5">
                  <span className="block text-[8px] font-mono uppercase text-muted-foreground tracking-widest leading-none">Lock Duration</span>
                  <p className="text-sm font-bold text-white leading-none">{tier.stats.lock}</p>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-end text-[9px] font-mono uppercase text-muted-foreground mb-1">
                     <span>Multiplier</span>
                     <span className={`${tier.textHighlight} font-bold`}>{tier.stats.multiplier}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor] ${tier.colorClass.startsWith("text-chart-4") ? "bg-chart-4" : tier.colorClass.startsWith("text-chart-3") ? "bg-chart-3" : "bg-accent"}`} style={{ width: isHovered ? `${tier.stats.lockPct}%` : "0%", color: tier.glowColor }} />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 items-end">
               <div className="space-y-1.5">
                  <span className="block text-[8px] font-mono uppercase text-muted-foreground tracking-widest leading-none">Wallet Bonus</span>
                  <p className="text-sm font-bold text-white leading-none">{tier.stats.wallet}</p>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-end text-[9px] font-mono uppercase text-muted-foreground mb-1">
                     <span>Synergy</span>
                     <span className={`${tier.textHighlight} font-bold`}>{tier.stats.walletPct > 0 ? `+${tier.stats.walletPct}%` : "BASE"}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor] ${tier.colorClass.startsWith("text-chart-4") ? "bg-chart-4" : tier.colorClass.startsWith("text-chart-3") ? "bg-chart-3" : "bg-accent"}`} style={{ width: isHovered ? `${tier.stats.walletPct}%` : "0%", color: tier.glowColor }} />
                  </div>
               </div>
            </div>

            <div className="flex justify-between items-center py-3 border-y border-white/10">
                <span className="text-[9px] font-mono uppercase text-muted-foreground tracking-widest">Growth Loop (Refs)</span>
                <span className={`text-[11px] font-bold ${tier.stats.referrals.includes("+") ? tier.textHighlight : "text-white/40"}`}>
                  {tier.stats.referrals}
                </span>
            </div>
          </div>

          {/* Matrix Power System */}
          <div className="mt-auto pt-4 space-y-5">
            <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/30 transition-all overflow-hidden shadow-inner font-mono">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] uppercase text-muted-foreground mb-1">Final Matrix Power</span>
                  <span className="text-4xl font-black text-white tracking-widest">{tier.stats.weight}</span>
                </div>
                <Activity className={`w-7 h-7 animate-pulse ${tier.colorClass}`} />
              </div>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            </div>

            <div className="flex items-center justify-between px-2">
               <div className="space-y-1">
                  <span className="block text-[8px] font-mono uppercase text-muted-foreground tracking-widest">Yield Forecast</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className={`text-2xl font-black tracking-tighter italic ${tier.textHighlight}`}>{tier.stats.earnings}</span>
                  </div>
               </div>
               <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-help group/info">
                <Info className="w-4 h-4 text-muted-foreground/40 group-hover:text-white transition-colors" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TiersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section 
      ref={sectionRef} 
      data-section="tiers" 
      className="relative py-28 md:py-40 px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-full h-full bg-accent/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-full h-full bg-chart-4/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="h-[1px] w-12 bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded border border-accent/30 text-[10px] font-mono text-accent">06</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.4em]">Synergy Tiers</span>
          </div>
          <div className="h-[1px] w-12 bg-white/10" />
        </div>

        <div className="text-center mb-16 md:mb-28 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-none">
            NFT <span className="text-accent underline decoration-white/20 underline-offset-8">TIERS</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
            Select your operational tier to lock in reward multipliers and stabilize your 
            long-term yielding position in the ecosystem.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-stretch">
          {TIERS.map((tier) => (
            <TierCard key={tier.key} tier={tier} />
          ))}
        </div>

        {/* Professional Footer */}
        <div className="mt-32 flex flex-col items-center gap-6 text-center">
            <div className="h-[1px] w-32 bg-white/10" />
            <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.5em] max-w-sm leading-loose">
              Reward metrics verified against core platform liquidity and protocol lock cycles.
            </p>
        </div>
      </div>
    </section>
  )
}
