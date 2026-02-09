"use client"

import { useEffect, useState } from "react"

export function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] = useState("introduction")

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "information-we-collect", label: "Information We Collect" },
    { id: "how-we-use", label: "How We Use Your Information" },
    { id: "sharing", label: "Sharing of Information" },
    { id: "your-choices", label: "Your Choices" },
    { id: "security", label: "Security" },
    { id: "contact", label: "Contact Us" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-12 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 mb-6">
            <span className="text-xs font-mono text-accent">Effective Date: February 9, 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            HollowScan is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and
            share information about you when you use our mobile application and services.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-12">
            {/* Table of Contents - Desktop Only */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-8">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Contents</p>
                <nav className="space-y-2">
                  {sections.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        activeSection === id
                          ? "bg-accent/10 text-accent font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Privacy Policy Content */}
            <main className="flex-1 max-w-3xl">
              <div className="space-y-12">
                {/* Section 1: Information We Collect */}
                <section id="information-we-collect" className="scroll-mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">1. Information We Collect</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Personal Information</h3>
                      <ul className="space-y-2 text-muted-foreground leading-relaxed">
                        <li>
                          <strong className="text-foreground">Account Data:</strong> When you register for an account,
                          we collect your email address and password.
                        </li>
                        <li>
                          <strong className="text-foreground">Profile Data:</strong> You may choose to provide
                          additional information such as a bio or location in your profile settings.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Automatically Collected Information</h3>
                      <ul className="space-y-2 text-muted-foreground leading-relaxed">
                        <li>
                          <strong className="text-foreground">Device Information:</strong> We collect information about
                          your mobile device, including the hardware model, operating system and version, unique device
                          identifiers, and mobile network information.
                        </li>
                        <li>
                          <strong className="text-foreground">Usage Information:</strong> We collect information about
                          your activity in our app, such as the products you view or save.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2: How We Use Your Information */}
                <section id="how-we-use" className="scroll-mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc list-inside">
                    <li>Provide, maintain, and improve our services.</li>
                    <li>Process and complete transactions (if applicable).</li>
                    <li>Send you technical notices, updates, security alerts, and support messages.</li>
                    <li>Respond to your comments, questions, and requests.</li>
                    <li>
                      Monitor and analyze trends, usage, and activities in connection with our services.
                    </li>
                  </ul>
                </section>

                {/* Section 3: Sharing of Information */}
                <section id="sharing" className="scroll-mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">3. Sharing of Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not share your personal information with third parties except in the following circumstances:
                  </p>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li>
                      <strong className="text-foreground">With Your Consent:</strong> We may share information with your
                      consent or at your direction.
                    </li>
                    <li>
                      <strong className="text-foreground">For Legal Reasons:</strong> We may share information if we
                      believe disclosure is in accordance with, or required by, any applicable law or legal process.
                    </li>
                    <li>
                      <strong className="text-foreground">Service Providers:</strong> We may share information with
                      vendors, consultants, and other service providers who need access to such information to carry out
                      work on our behalf.
                    </li>
                  </ul>
                </section>

                {/* Section 4: Your Choices */}
                <section id="your-choices" className="scroll-mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">4. Your Choices</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Account Information</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You may update or correct your account information at any time by logging into your in-app
                        account.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Push Notifications</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        With your consent, we may send push notifications to your mobile device. You can deactivate
                        these messages at any time by changing the notification settings on your mobile device.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 5: Security */}
                <section id="security" className="scroll-mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">5. Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We take reasonable measures to help protect information about you from loss, theft, misuse, and
                    unauthorized access, disclosure, alteration, and destruction.
                  </p>
                </section>

                {/* Section 6: Contact Us */}
                <section id="contact" className="scroll-mt-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 font-mono">6. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="bg-muted/30 border border-border rounded-lg px-6 py-4">
                    <p className="text-sm text-muted-foreground font-mono mb-1">Email</p>
                    <a
                      href="mailto:support@hollowscan.com"
                      className="text-foreground hover:text-accent transition-colors font-medium"
                    >
                      support@hollowscan.com
                    </a>
                  </div>
                </section>
              </div>

              {/* Bottom Note */}
              <div className="mt-16 pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground italic">
                  This privacy policy was last updated on February 9, 2026. We may update this policy from time to
                  time. Please review it periodically for any changes.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
