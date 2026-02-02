import Image from "next/image"

const steps = [
  {
    step: "01",
    title: "Monitor",
    description: "Continuous scanning of 100+ sites for restocks and drops in real-time.",
    image: "/images/scanner-bots.png",
  },
  {
    step: "02",
    title: "Execute",
    description: "Sub-50ms automated checkout secures items before they sell out.",
    image: "/images/checkout.png",
  },
  {
    step: "03",
    title: "Deliver",
    description: "Your items are secured and shipped directly to you.",
    image: "/images/delivery.png",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">From Drop to Doorstep</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {steps.map((step) => (
            <div key={step.step} className="bg-background">
              <div className="aspect-[4/3] relative overflow-hidden bg-card">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="text-xs text-muted-foreground font-mono">{step.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
