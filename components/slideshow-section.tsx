"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

interface SlideItem {
  src: string
  alt: string
}

const slides: SlideItem[] = [
  { src: "/images/slideshow-1.webp", alt: "Pokemon Center Tokyo DX" },
  { src: "/images/slideshow-3.png", alt: "Product Listing" },
  { src: "/images/slideshow-4.webp", alt: "Pokemon Center London" },
]

export function SlideshowSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const advanceSlide = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
      setIsTransitioning(false)
    }, 500)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      advanceSlide()
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentIndex, advanceSlide])

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  return (
    <section className="w-full border-b border-border">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-background/50">
        {/* Slides Container */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 ${index === currentIndex ? "block" : "hidden"}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#00ff88] w-6"
                  : "bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30">
          <div
            className="h-full bg-[#00ff88] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 font-mono text-xs text-foreground/60 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded border border-border">
          <span className="text-[#00ff88]">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  )
}
