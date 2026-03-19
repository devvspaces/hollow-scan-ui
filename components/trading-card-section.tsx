"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useSpring, useTransform } from "framer-motion"

export function TradingCardSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  // Raw mouse position (0-1 range relative to card)
  const mouseX = useSpring(0.5, { stiffness: 120, damping: 20 })
  const mouseY = useSpring(0.5, { stiffness: 120, damping: 20 })

  // 3D rotation from mouse
  const rotateY = useTransform(mouseX, [0, 1], [-22, 22])
  const rotateX = useTransform(mouseY, [0, 1], [16, -16])

  // Holographic shimmer position
  const shimmerX = useTransform(mouseX, [0, 1], ["-40%", "140%"])
  const shimmerY = useTransform(mouseY, [0, 1], ["-40%", "140%"])

  // Gloss overlay opacity
  const glossX = useTransform(mouseX, [0, 0.5, 1], ["0%", "50%", "100%"])
  const glossY = useTransform(mouseY, [0, 0.5, 1], ["0%", "50%", "100%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsHovered(false)
  }

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32 border-t border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-4">1st Edition · #001 · GM MT 10</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              The Rarest Card<br />
              <span className="text-accent">In The Game</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              HollowScan EX — 310 HP. The tool that never misses. Built for drops, designed to dominate. Every restock is a prize card waiting to be claimed.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="px-5 py-3 bg-card/40 border border-border rounded-xl text-center">
                <p className="text-xs text-muted-foreground font-mono mb-1">EDITION</p>
                <p className="text-sm font-bold text-foreground">1ST — 2026</p>
              </div>
              <div className="px-5 py-3 bg-card/40 border border-border rounded-xl text-center">
                <p className="text-xs text-muted-foreground font-mono mb-1">GRADE</p>
                <p className="text-sm font-bold text-accent">GM MT 10</p>
              </div>
              <div className="px-5 py-3 bg-card/40 border border-border rounded-xl text-center">
                <p className="text-xs text-muted-foreground font-mono mb-1">CERT</p>
                <p className="text-sm font-bold text-foreground">32426365</p>
              </div>
            </div>

            <p className="mt-8 text-xs text-muted-foreground font-mono tracking-wider">
              ← DRAG YOUR CURSOR OVER THE CARD
            </p>
          </div>

          {/* Right — Interactive Card */}
          <div className="order-1 lg:order-2 flex flex-col items-center gap-5">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped((f) => !f)}
              className="relative cursor-pointer select-none"
              style={{ perspective: "1000px" }}
              title="Hover to tilt • Click to flip"
            >
              <motion.div
                style={{
                  rotateX: isFlipped ? 0 : rotateX,
                  rotateY: isFlipped ? 180 : rotateY,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  scale: isHovered ? 1.04 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-[280px] md:w-[320px]"
              >
                {/* Front */}
                <div style={{ backfaceVisibility: "hidden" }} className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/hollowscan-card.png"
                    alt="HollowScan EX Trading Card"
                    width={320}
                    height={440}
                    className="w-full h-auto block"
                    priority
                    draggable={false}
                  />

                  {/* Holographic shimmer layer */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse 60% 60% at ${shimmerX} ${shimmerY},
                          rgba(168,85,247,0.35) 0%,
                          rgba(99,102,241,0.25) 30%,
                          rgba(34,211,238,0.15) 60%,
                          transparent 80%)`,
                        mixBlendMode: "screen",
                      }}
                    />
                  )}

                  {/* Gloss reflection */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg,
                          rgba(255,255,255,0.12) 0%,
                          rgba(255,255,255,0.04) 40%,
                          rgba(255,255,255,0) 60%)`,
                        backgroundPositionX: glossX,
                        backgroundPositionY: glossY,
                        mixBlendMode: "overlay",
                      }}
                    />
                  )}
                </div>

                {/* Back face */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900 flex items-center justify-center border border-violet-500/30 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)]"
                >
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 border border-accent/40">
                      <span className="text-2xl">👁</span>
                    </div>
                    <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">HollowScan</p>
                    <p className="text-white font-bold text-lg">ALL SCAN</p>
                    <p className="text-violet-300 text-xs mt-2 font-mono">Never miss. Never settle.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card shadow / glow on floor */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0.4,
                  scaleX: isHovered ? 1 : 0.85,
                }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-accent/20 rounded-full blur-xl pointer-events-none"
              />
            </div>

            <p className="text-xs text-muted-foreground font-mono tracking-widest">
              {isFlipped ? "CLICK TO FLIP BACK" : "CLICK TO FLIP · HOVER TO TILT"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
