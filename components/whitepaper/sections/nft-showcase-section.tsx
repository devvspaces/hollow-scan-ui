"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const nftCollection = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wer.png-f7HHVcb6D70ecHGiYp55MUzGWzKEyB.jpeg",
    name: "Fire Samurai",
    rarity: "Legendary",
    traits: ["Flame Face", "Dreadlocks", "Katana"],
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.png-q1huZNHg4uoR4Y0cb5q0143WpXbYEP.jpeg",
    name: "Night Warrior",
    rarity: "Epic",
    traits: ["Purple Spikes", "Cross Earring", "Fierce"],
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sd.png-I0l88FPdJgvjIWGtjBcHf6eTj0CixP.jpeg",
    name: "Explorer",
    rarity: "Rare",
    traits: ["Safari Hat", "Rainbow Eye", "Tentacle"],
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.png-9cZb6er7zhuVmx481t6P7ruDTbQJ3y.jpeg",
    name: "Cosmic Rider",
    rarity: "Legendary",
    traits: ["WIF Beanie", "Hoverboard", "Galaxy Mouth"],
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.png-OMWpjQy0QuYxL5kvPGtXSLzuJ16niD.jpeg",
    name: "Frog King",
    rarity: "Mythic",
    traits: ["Golden Crown", "Royal Rose", "Elegant"],
  },
]

const rarityColors: Record<string, string> = {
  Mythic: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Legendary: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  Epic: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  Rare: "text-blue-400 bg-blue-400/10 border-blue-400/30",
}

export function NFTShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(2)
  const [isInView, setIsInView] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-rotate
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nftCollection.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-background via-card/30 to-background"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--accent) / 0.15), transparent 50%)`,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-accent">04</span>
          <span className="flex-1 h-[1px] bg-border" />
          <span className="text-xs font-mono text-muted-foreground">COLLECTION</span>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The <span className="text-accent">Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unique digital assets that unlock your place in the Hollow Scan ecosystem.
            Each NFT is a key to exclusive features and rewards.
          </p>
        </div>

        {/* 3D Carousel Gallery */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-1000">
          {nftCollection.map((nft, index) => {
            const offset = index - activeIndex
            const absOffset = Math.abs(offset)
            const isActive = index === activeIndex
            
            // Calculate 3D positioning
            const translateX = offset * 180
            const translateZ = isActive ? 100 : -absOffset * 100
            const rotateY = offset * -15
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3
            const scale = isActive ? 1.1 : 1 - absOffset * 0.1

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`absolute cursor-pointer transition-all duration-700 ease-out ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: nftCollection.length - absOffset,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className={`relative w-56 md:w-72 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isActive
                      ? "border-accent shadow-2xl shadow-accent/30"
                      : "border-border/50 hover:border-accent/50"
                  }`}
                >
                  <Image
                    src={nft.src}
                    alt={nft.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* NFT Info - Only show on active */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                      isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-foreground">{nft.name}</h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${rarityColors[nft.rarity]}`}
                      >
                        {nft.rarity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {nft.traits.map((trait, tIndex) => (
                        <span
                          key={tIndex}
                          className="text-[9px] font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Shine effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {nftCollection.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? "w-8 h-2 bg-accent"
                  : "w-2 h-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`View NFT ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { value: "5,000", label: "Total Supply" },
            { value: "5", label: "Unique Rarities" },
            { value: "100+", label: "Trait Combos" },
            { value: "3", label: "Tier Levels" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 border border-border bg-card/30 backdrop-blur-sm"
            >
              <p className="text-2xl md:text-3xl font-mono font-bold text-accent">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}
