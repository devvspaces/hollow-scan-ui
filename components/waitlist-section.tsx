"use client"

import Image from "next/image"

export function WaitlistSection() {
  return (
    <section id="download" className="px-6 py-24 md:px-12 md:py-32 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Now Live</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Available on iOS &amp; Android
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hollowscan is live. Download the app and start dominating every restock, drop, and release — right from your phone.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* QR Code */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative p-3 bg-white rounded-2xl shadow-[0_0_40px_rgba(120,80,255,0.25)]">
              <Image
                src="/qr-code.png"
                alt="Scan to download Hollowscan"
                width={180}
                height={180}
                className="rounded-xl"
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono tracking-widest">SCAN TO DOWNLOAD</p>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-border" />
            <span className="text-xs text-muted-foreground font-mono">OR</span>
            <div className="w-px h-16 bg-border" />
          </div>
          <div className="flex lg:hidden items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-mono">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Store Buttons */}
          <div className="flex flex-col gap-4">
            <a
              href="https://hollowscan.com/ios"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-8 py-5 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(120,80,255,0.3)] min-w-[220px]"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div className="text-xs opacity-70 font-mono leading-none mb-0.5">Download on the</div>
                <div className="text-base font-semibold leading-tight">App Store</div>
              </div>
            </a>

            <a
              href="https://hollowscan.com/android"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-8 py-5 border border-border bg-card/40 text-foreground rounded-xl hover:border-accent hover:text-accent transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(120,80,255,0.15)] min-w-[220px]"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.528c.6-.3.917-.8.917-1.57s-.317-1.27-.917-1.57l-3.074-1.527-3.246 3.244 3.246 3.951zM4.609 3.791a2.2 2.2 0 0 0-.109.75v15.908c0 .274.039.52.109.743l8.34-8.34-8.34-9.061zm7.955 8.633-8.34 8.342c.52.374 1.113.326 1.746-.016l10.553-5.835-3.959-2.491z" />
              </svg>
              <div>
                <div className="text-xs opacity-70 font-mono leading-none mb-0.5">Get it on</div>
                <div className="text-base font-semibold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
