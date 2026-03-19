import { HeroSection } from "@/components/hero-section"
import { SlideshowSection } from "@/components/slideshow-section"
import { StatsSection } from "@/components/stats-section"
import { MarqueeSection } from "@/components/marquee-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { WaitlistSection } from "@/components/waitlist-section"
import { FaqSection } from "@/components/faq-section"
import { TradingCardSection } from "@/components/trading-card-section"
import { Footer } from "@/components/footer"
import { MouseGradientBackground } from "@/components/mouse-gradient-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <MouseGradientBackground />
      <div className="relative z-10">
        <HeroSection />
        <SlideshowSection />
        <StatsSection />
        <TradingCardSection />
        <MarqueeSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FaqSection />
        <WaitlistSection />
        <Footer />
      </div>
    </main>
  )
}
