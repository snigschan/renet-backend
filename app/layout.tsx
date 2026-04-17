import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Renet ME - Real Estate Experts Network Middle East",
  description:
    "The premier professional networking platform connecting real estate experts across the Middle East - UAE, Saudi Arabia, Qatar, Kuwait, and beyond",
  generator: "Renet ME",
  keywords: "real estate Middle East, وظائف عقارية, Dubai real estate, Saudi Vision 2030, Qatar property, UAE agents",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSansArabic.variable}`} suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
