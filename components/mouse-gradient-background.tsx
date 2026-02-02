"use client"

import { useEffect, useRef } from "react"

export function MouseGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    let animationId: number

    const animate = () => {
      timeRef.current += 0.02

      // Smooth interpolation towards target
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05

      const { x, y } = mouseRef.current
      const w = canvas.width
      const h = canvas.height
      const t = timeRef.current

      // Clear canvas
      ctx.fillStyle = "#050505"
      ctx.fillRect(0, 0, w, h)

      const pulse = 0.9 + Math.sin(t * 2) * 0.1
      const pulse2 = 0.9 + Math.cos(t * 1.5) * 0.1

      const gradient = ctx.createRadialGradient(x * w, y * h, 0, x * w, y * h, Math.max(w, h) * 0.7)

      gradient.addColorStop(0, `rgba(0, 255, 128, ${0.4 * pulse})`)
      gradient.addColorStop(0.2, `rgba(0, 255, 180, ${0.25 * pulse})`)
      gradient.addColorStop(0.4, `rgba(0, 230, 150, ${0.15 * pulse})`)
      gradient.addColorStop(0.7, `rgba(0, 200, 120, ${0.05 * pulse})`)
      gradient.addColorStop(1, "rgba(5, 5, 5, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      const gradient2 = ctx.createRadialGradient(
        (1 - x) * w * 0.7 + Math.sin(t) * 50,
        (1 - y) * h * 0.7 + Math.cos(t) * 50,
        0,
        (1 - x) * w * 0.7,
        (1 - y) * h * 0.7,
        Math.max(w, h) * 0.5,
      )

      gradient2.addColorStop(0, `rgba(0, 255, 200, ${0.2 * pulse2})`)
      gradient2.addColorStop(0.3, `rgba(0, 255, 170, ${0.1 * pulse2})`)
      gradient2.addColorStop(0.6, `rgba(0, 200, 140, ${0.04 * pulse2})`)
      gradient2.addColorStop(1, "rgba(5, 5, 5, 0)")

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, w, h)

      const gradient3 = ctx.createRadialGradient(
        w * 0.5 + Math.sin(t * 0.7) * w * 0.3,
        h * 0.5 + Math.cos(t * 0.5) * h * 0.3,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.4,
      )

      gradient3.addColorStop(0, `rgba(100, 255, 200, ${0.08 * pulse})`)
      gradient3.addColorStop(0.5, `rgba(50, 255, 180, ${0.03 * pulse})`)
      gradient3.addColorStop(1, "rgba(5, 5, 5, 0)")

      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#050505" }} />

      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden opacity-[0.12]">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Scattered postal elements */}
        <div className="absolute top-[10%] left-[5%] font-mono text-[10px] text-white/70 rotate-[-5deg]">
          <div>TRACKING: RM742681925GB</div>
          <div className="mt-1">PRIORITY MAIL</div>
        </div>

        <div className="absolute top-[15%] right-[10%] font-mono text-[8px] text-white/50 rotate-[3deg]">
          <div>||||||||||||||||||||||||</div>
          <div>9 400 111 899 223 456 781</div>
        </div>

        <div className="absolute top-[30%] left-[15%] font-mono text-[9px] text-white/60 rotate-[-2deg]">
          <div>SHIP DATE: 2024-12-15</div>
          <div>WEIGHT: 0.5 KG</div>
        </div>

        <div className="absolute top-[25%] right-[20%] font-mono text-[11px] text-white/50 rotate-[8deg]">
          <div className="border border-white/30 px-2 py-1">EXPRESS</div>
        </div>

        <div className="absolute top-[45%] left-[8%] font-mono text-[8px] text-white/50 rotate-[5deg]">
          <div>POSTAGE PAID</div>
          <div>ROYAL MAIL</div>
          <div className="mt-1">||||||||||||||||</div>
        </div>

        <div className="absolute top-[50%] right-[5%] font-mono text-[10px] text-white/60 rotate-[-4deg]">
          <div>PARCEL ID</div>
          <div>JJD0001234567890</div>
        </div>

        <div className="absolute top-[60%] left-[25%] font-mono text-[7px] text-white/40 rotate-[2deg]">
          <div>CUSTOMS DECLARATION</div>
          <div>CONTENTS: MERCHANDISE</div>
          <div>VALUE: £49.99</div>
        </div>

        <div className="absolute top-[65%] right-[15%] font-mono text-[9px] text-white/50 rotate-[-6deg]">
          <div>FRAGILE</div>
          <div className="text-[20px] leading-none">⬡</div>
        </div>

        <div className="absolute top-[75%] left-[10%] font-mono text-[8px] text-white/60 rotate-[4deg]">
          <div>||| |||| ||| |||| |||</div>
          <div>SCAN FOR DELIVERY</div>
        </div>

        <div className="absolute top-[80%] right-[25%] font-mono text-[10px] text-white/50 rotate-[-3deg]">
          <div>ZONE: UK-01</div>
          <div>CLASS: 1ST</div>
        </div>

        <div className="absolute top-[85%] left-[30%] font-mono text-[6px] text-white/40 rotate-[1deg]">
          <div>SPECIAL DELIVERY GUARANTEED</div>
          <div>SIGNATURE REQUIRED</div>
        </div>

        <div className="absolute bottom-[10%] right-[8%] font-mono text-[9px] text-white/50 rotate-[7deg]">
          <div>REF: HS-2024-001</div>
          <div>BATCH: A7X9K2</div>
        </div>

        {/* Stamp-like elements */}
        <div className="absolute top-[20%] left-[40%] w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center rotate-[-15deg]">
          <div className="text-[6px] text-white/50 text-center font-mono">
            <div>VERIFIED</div>
            <div>AUTHENTIC</div>
          </div>
        </div>

        <div className="absolute top-[70%] right-[35%] w-12 h-12 border border-dashed border-white/30 flex items-center justify-center rotate-[10deg]">
          <div className="text-[5px] text-white/40 font-mono">INSPECTED</div>
        </div>

        <div className="absolute top-[5%] left-[60%] font-mono text-[8px] text-white/50 rotate-[12deg]">
          <div>AIR MAIL</div>
          <div>PAR AVION</div>
        </div>

        <div className="absolute top-[40%] right-[40%] font-mono text-[7px] text-white/45 rotate-[-8deg]">
          <div>|||| ||| |||| ||| ||||</div>
          <div>HOLLOWSCAN-001</div>
        </div>

        <div className="absolute bottom-[25%] left-[45%] w-20 h-20 border border-white/25 flex items-center justify-center rotate-[5deg]">
          <div className="text-[8px] text-white/50 font-mono text-center">
            <div>SCANNED</div>
            <div className="text-[16px] mt-1">✓</div>
          </div>
        </div>

        <div className="absolute top-[55%] left-[50%] font-mono text-[6px] text-white/35 rotate-[-1deg]">
          <div>DELIVERY CONFIRMATION</div>
          <div>STATUS: ACTIVE</div>
        </div>
      </div>

      {/* Noise grain overlay */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </>
  )
}
