"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const nftImages = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wer.png-f7HHVcb6D70ecHGiYp55MUzGWzKEyB.jpeg", alt: "Fire Samurai NFT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.png-OMWpjQy0QuYxL5kvPGtXSLzuJ16niD.jpeg", alt: "King Frog NFT" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-9cZb6er7zhuVmx481t6P7ruDTbQJ3y.jpeg", alt: "Hoverboard NFT" },
]

export function WhitepaperHero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      data-section="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Large floating typography background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <span className="text-[20vw] font-bold text-foreground/[0.02] select-none whitespace-nowrap">
          WHITEPAPER
        </span>
      </div>

      {/* Floating NFT Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {nftImages.map((nft, index) => {
          const positions = [
            { left: "5%", top: "20%", rotate: -12, scale: 0.9 },
            { right: "8%", top: "15%", rotate: 8, scale: 0.85 },
            { left: "10%", bottom: "20%", rotate: 6, scale: 0.75 },
          ]
          const pos = positions[index]
          const parallaxX = (mousePos.x - 0.5) * (30 + index * 10)
          const parallaxY = (mousePos.y - 0.5) * (20 + index * 8)

          return (
            <div
              key={index}
              className={`absolute w-32 md:w-44 lg:w-52 aspect-square opacity-0 ${isVisible ? 'opacity-100' : ''}`}
              style={{
                left: pos.left,
                right: pos.right,
                top: pos.top,
                bottom: pos.bottom,
                transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                transition: "transform 0.4s ease-out, opacity 1s ease-out",
                transitionDelay: `${0.3 + index * 0.2}s`,
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-accent/20 shadow-2xl shadow-accent/10 group">
                <Image
                  src={nft.src}
                  alt={nft.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-[8px] md:text-[10px] font-mono text-accent/80 bg-background/60 backdrop-blur-sm px-2 py-1 rounded">
                    NFT #{String(index + 1).padStart(4, "0")}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Version badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">DOCUMENT v1.0</span>
          <span className="text-xs font-mono text-accent">2024</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
          <span className="block">HOLLOW</span>
          <span className="block text-accent">SCAN</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
          Never Miss a Restock. Never Miss a Release.
        </p>
        <p className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Dominate Every Time.
        </p>

        {/* Stats preview */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-mono font-bold text-accent">&lt;50ms</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">EXECUTION</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-mono font-bold text-foreground">100+</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">RETAILERS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-mono font-bold text-foreground">24/7</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">MONITORING</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground font-mono">SCROLL TO EXPLORE</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-24 left-6 md:left-12 text-[10px] font-mono text-muted-foreground/40">
        <div className="flex items-center gap-2">
          <span className="w-8 h-[1px] bg-muted-foreground/40" />
          <span>01</span>
        </div>
      </div>
      <div className="absolute top-24 right-6 md:right-12 text-[10px] font-mono text-muted-foreground/40 text-right">
        <div className="flex items-center gap-2 justify-end">
          <span>INTRODUCTION</span>
          <span className="w-8 h-[1px] bg-muted-foreground/40" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
