import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LoadingProvider } from "@/contexts/loading-context"
import { GlobalLoadingWrapper } from "@/components/global-loading-wrapper"
import { PromotionalFloatingCapsule } from "@/components/promotional"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hollowscan - Never Miss a Restock",
  description:
    "Next-generation automation platform for limited-edition products. Dominate every drop with precision-engineered speed.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Hollowscan - Never Miss a Restock",
    description:
      "Next-generation automation platform for limited-edition products. Dominate every drop with precision-engineered speed.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Hollowscan Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hollowscan - Never Miss a Restock",
    description:
      "Next-generation automation platform for limited-edition products. Dominate every drop with precision-engineered speed.",
    images: ["/og-image.png"],
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#171717",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LoadingProvider>
          <GlobalLoadingWrapper>
            {children}
          </GlobalLoadingWrapper>
        </LoadingProvider>
        <PromotionalFloatingCapsule />
        <Analytics />
      </body>
    </html>
  )
}
