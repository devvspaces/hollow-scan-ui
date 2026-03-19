"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqContent = [
  {
    heading: "General",
    questions: [
      {
        q: "What is HollowScan?",
        a: "HollowScan is a powerful arbitrage tool that helps you discover underpriced products across multiple regions (US, UK, CA) for resale profit.",
      },
      {
        q: "How often are deals updated?",
        a: "Our scanners run 24/7. New deals appear in your feed within seconds of being detected on retailer sites.",
      },
      {
        q: "Why are some prices 'Check on Site'?",
        a: "We fetch live data, but sometimes retailers hide prices or require a cart addition. Always verify the final price on the retailer's site before buying.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach us anytime at support@hollowscan.com for account issues, bug reports, or feedback.",
      },
    ],
  },
  {
    heading: "Account & Premium",
    questions: [
      {
        q: "How do I link my Telegram Account to the Mobile App?",
        a: "It's easy! Open the installed HollowScan app on your device > Go to Profile > Telegram Bot, tap 'Open @HollowScan_Bot', and send the pre-filled /start command. Your accounts will link instantly!",
      },
      {
        q: "What are the benefits of Telegram linking?",
        a: "Linking enables real-time push alerts via Telegram, allows you to sync your Premium status across platforms, and gives you access to exclusive bot commands.",
      },
      {
        q: "How does Premium work?",
        a: "Premium removes the daily limit, giving you unlimited access to our real-time feed and allowing you to see high-value deals immediately across all regions.",
      },
    ],
  },
]

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <div
      className={`border border-border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-card/60 border-accent/30 shadow-[0_0_20px_rgba(120,80,255,0.07)]" : "bg-card/20 hover:bg-card/40 hover:border-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-accent/60 w-5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`text-sm md:text-base font-medium transition-colors duration-200 ${
              isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
            }`}
          >
            {question}
          </span>
        </div>
        <div
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? "bg-accent border-accent text-background rotate-0"
              : "bg-transparent border-border text-muted-foreground group-hover:border-accent/50"
          }`}
        >
          {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pl-[3.75rem]">
              <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({
    General: null,
    "Account & Premium": null,
  })

  const toggleItem = (heading: string, index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [heading]: prev[heading] === index ? null : index,
    }))
  }

  let globalIndex = 0

  return (
    <section id="faq" className="px-6 py-24 md:px-12 md:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Help Center</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Can&apos;t find an answer?{" "}
            <a
              href="mailto:support@hollowscan.com"
              className="text-accent hover:underline underline-offset-4 transition-all"
            >
              Reach out to support
            </a>
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {faqContent.map((group) => {
            const groupStartIndex = globalIndex
            globalIndex += group.questions.length
            return (
              <div key={group.heading}>
                {/* Group label */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">{group.heading}</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {group.questions.map((item, i) => {
                    const absIndex = groupStartIndex + i
                    return (
                      <AccordionItem
                        key={i}
                        question={item.q}
                        answer={item.a}
                        isOpen={openItems[group.heading] === i}
                        onToggle={() => toggleItem(group.heading, i)}
                        index={absIndex}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
