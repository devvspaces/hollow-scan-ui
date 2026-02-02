import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Main Footer Links */}
      <div className="px-6 py-16 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Resources */}
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Resources</p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Socials</p>
            <ul className="space-y-3">
              <li>
                <a href="https://x.com/Holowscan" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                  X
                </a>
              </li>
              <li>
                <a href="http://t.me/Hollowscan_bot" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="border-t border-border px-6 py-8 md:px-12">
        <p className="text-center text-sm text-muted-foreground italic max-w-2xl mx-auto">
          There is a certain beauty in speed, in the milliseconds that matter.
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/hollowscan-logo.png" alt="Hollowscan logo" width={24} height={24} className="rounded" />
            <span className="text-sm font-medium text-foreground">Hollowscan</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">© 2026 Hollowscan. All rights reserved.</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border px-6 py-8 md:px-12">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto">
          Hollowscan is an automation tool for personal use. Users are responsible for compliance with retailer terms of
          service. Automated purchasing may be restricted on certain platforms. Use responsibly and at your own risk.
        </p>
      </div>
    </footer>
  )
}
