"use client"

export function MarqueeSection() {
  const items = Array(10).fill("DOWNLOAD THE APP")

  return (
    <a
      href="https://hollowscan.com/ios"
      target="_blank"
      rel="noopener noreferrer"
      className="block border-y border-border bg-foreground text-background overflow-hidden py-4 hover:bg-foreground/90 transition-colors"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-wider">
            ★ {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="mx-8 text-sm font-medium tracking-wider">
            ★ {item}
          </span>
        ))}
      </div>
    </a>
  )
}
