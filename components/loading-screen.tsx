"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "complete" | "exit">("loading")
  const [glitchText, setGlitchText] = useState("HOLLOW SCAN")

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"
    const target = "HOLLOW SCAN"
    let frame = 0
    const maxFrames = 20

    const glitchInterval = setInterval(() => {
      if (frame < maxFrames) {
        const newText = target
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            const probability = frame / maxFrames
            if (Math.random() < probability) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
        setGlitchText(newText)
        frame++
      } else {
        setGlitchText(target)
        clearInterval(glitchInterval)
      }
    }, 50)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const duration = 2500
    const interval = 30
    const steps = duration / interval
    let step = 0

    const timer = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      setProgress(Math.min(eased * 100, 100))

      if (step >= steps) {
        clearInterval(timer)
        setPhase("complete")
        setTimeout(() => {
          setPhase("exit")
          setTimeout(onComplete, 600)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-600 ${
        phase === "exit" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,128,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,128,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-[2px] bg-accent/30"
          style={{
            top: `${(progress * 0.8 + 10) % 100}%`,
            boxShadow: "0 0 20px rgba(0,255,128,0.5), 0 0 60px rgba(0,255,128,0.3)",
            transition: "top 0.1s linear",
          }}
        />
        <div
          className="absolute w-full h-[1px] bg-accent/20"
          style={{
            top: `${(progress * 1.2 + 30) % 100}%`,
            transition: "top 0.1s linear",
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animation */}
        <div className="relative mb-8">
          <div
            className="w-20 h-20 border-2 border-accent/50 rounded-sm flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow: "0 0 30px rgba(0,255,128,0.2), inset 0 0 20px rgba(0,255,128,0.1)",
            }}
          >
            {/* Scanning effect inside logo */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-transparent"
              style={{
                transform: `translateY(${(progress % 100) - 50}%)`,
                transition: "transform 0.1s linear",
              }}
            />
            <span className="text-3xl font-bold text-accent font-mono relative z-10">HS</span>
          </div>

          {/* Orbiting dots */}
          <div
            className="absolute -inset-4"
            style={{ animation: "spin 3s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full" />
          </div>
          <div
            className="absolute -inset-6"
            style={{ animation: "spin 4s linear infinite reverse" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent/50 rounded-full" />
          </div>
        </div>

        {/* Glitch text */}
        <h1 className="text-2xl md:text-3xl font-mono font-bold tracking-widest mb-6 text-foreground">
          {glitchText}
        </h1>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-[2px] bg-border/50 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-accent transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>

        {/* Progress percentage */}
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span>INITIALIZING SYSTEMS</span>
          <span className="text-accent">{Math.floor(progress)}%</span>
        </div>

        {/* Status indicators */}
        <div className="mt-8 flex gap-6 text-[10px] font-mono text-muted-foreground/60">
          <div className={`flex items-center gap-2 transition-colors ${progress > 25 ? "text-accent" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${progress > 25 ? "bg-accent" : "bg-muted-foreground/30"}`} />
            CORE
          </div>
          <div className={`flex items-center gap-2 transition-colors ${progress > 50 ? "text-accent" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${progress > 50 ? "bg-accent" : "bg-muted-foreground/30"}`} />
            DATA
          </div>
          <div className={`flex items-center gap-2 transition-colors ${progress > 75 ? "text-accent" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${progress > 75 ? "bg-accent" : "bg-muted-foreground/30"}`} />
            RENDER
          </div>
          <div className={`flex items-center gap-2 transition-colors ${progress >= 100 ? "text-accent" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 100 ? "bg-accent" : "bg-muted-foreground/30"}`} />
            READY
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-muted-foreground/40">
        <div>SYS.INIT</div>
        <div>v2.0.1</div>
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-muted-foreground/40 text-right">
        <div>PLATFORM</div>
        <div>2025</div>
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-muted-foreground/40">
        <div>||||||||||||||||</div>
        <div>HS-WP-001</div>
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-muted-foreground/40 text-right">
        <div>SECURE</div>
        <div>ENCRYPTED</div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
