"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Rocket, Trophy, Star, Zap, Crown, Sparkles, TrendingUp } from "lucide-react"

const iconForType = (type: string) => {
  switch (type) {
    case "LAUNCH":
      return Rocket
    case "EVENT":
      return Trophy
    case "MILESTONE":
      return Star
    case "UPDATE":
      return Zap
    case "ANNOUNCEMENT":
      return Crown
    case "ALERT":
      return Sparkles
    default:
      return TrendingUp
  }
}

export function PromotionalFloatingCapsule() {
  const items = [
    {
      id: "capsule-1",
      type: "LAUNCH",
      title: "WIN THE 1ST EDITION CHARIZARD",
      subtitle: "Own one of the rarest collectibles in history. A BGS 7.5 Near Mint+ First Edition Charizard Holo. Valued at $26,000.00. Verified on-chain, exclusively on HollowScan.",
      image: "https://raffle.hollowscan.com/charizard_bgs_back.jpg",
      icon: iconForType("LAUNCH"),
      url: "https://raffle.hollowscan.com/",
      actionLabel: "Explore",
    },
  ]

  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [index, setIndex] = useState(0)
  const timeShownRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const t = setTimeout(() => {
      if (!timeShownRef.current) {
        timeShownRef.current = true
        setVisible(true)
      }
    }, 3000)
    const onScroll = () => {
      if (window.scrollY > 600 && !timeShownRef.current) {
        timeShownRef.current = true
        setVisible(true)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (!visible || items.length <= 1) return
    const rotator = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 10000)
    return () => clearInterval(rotator)
  }, [visible, items.length])

  if (!items.length || !visible) return null

  const current = items[index]
  const Icon = current.icon as any

  return (
    <div className="promotional-floating-capsule fixed z-50 md:right-6 md:bottom-6 right-3 left-3 bottom-3 pointer-events-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-auto"
      >
        <div
          className={[
            expanded
              ? "glass-card border border-border bg-background/60 rounded-2xl overflow-hidden shadow-2xl"
              : "glass-card border border-border bg-background/75 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10",
            "backdrop-blur-md",
            expanded ? "md:w-[420px] w-full" : "md:w-[360px] w-full",
          ].join(" ")}
        >
          <div className="relative">
            <AnimatePresence initial={false} mode="wait">
              {expanded ? (
                <motion.div
                  key={`expanded-${current.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0">
                      <img
                        src={current.image || "/logo.svg"}
                        alt={current.title}
                        className="w-full h-40 object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
                    </div>
                    <div className="relative p-4">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-amber-300" />
                        </div>
                        <button
                          aria-label="Dismiss"
                          onClick={() => {
                            setVisible(false)
                          }}
                          className="p-2 rounded-lg hover:bg-white/10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-20" />
                      <div className="space-y-2">
                        <div className="text-lg font-semibold">{current.title}</div>
                        {current.subtitle ? (
                          <div className="text-sm text-white/80 leading-relaxed">{current.subtitle}</div>
                        ) : null}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        {current.url ? (
                          <a
                            href={current.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500">
                              {current.actionLabel}
                            </Button>
                          </a>
                        ) : null}
                        <Button
                          variant="outline"
                          className="glass-card border-white/10"
                          onClick={() => setExpanded(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key={`collapsed-${current.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setExpanded(true)}
                  className="w-full flex items-start gap-4 px-4 py-4"
                >
                  <div className="relative">
                    <img
                      src={current.image || "/logo.svg"}
                      alt={current.title}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-amber-300" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{current.title}</div>
                    {current.subtitle ? (
                      <div className="mt-1 text-xs text-left text-white/80 leading-snug line-clamp-3">
                        {current.subtitle}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={(e) => {
                      e.stopPropagation()
                      sessionStorage.setItem("promotional_capsule_dismissed", "1")
                      setVisible(false)
                    }}
                    className="p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
