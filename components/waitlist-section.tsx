"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <section id="waitlist" className="px-6 py-24 md:px-12 md:py-32 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Early Access</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Get Early Access</h2>
          <p className="text-muted-foreground">
            Be the first to know when Hollowscan launches. Join our waitlist for exclusive early access.
          </p>
        </div>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-border">
            <div className="w-6 h-6 bg-accent/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-accent" />
            </div>
            <span className="text-foreground text-sm">{"You're on the list. We'll be in touch."}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-4 bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-muted-foreground"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Join Waitlist"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-6 font-mono">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
