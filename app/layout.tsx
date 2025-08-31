import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Google Business Profile Suspended? Get Reinstated Fast | Max Market Pros",
  description:
    "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process. Call (888) 401-4221 for expert help.",
  keywords:
    "Google Business Profile suspended, GMB suspension, Google My Business reinstatement, suspended business profile, Google listing suspended, GMB appeal, business profile restoration",
  authors: [{ name: "Max Market Pros" }],
  creator: "Max Market Pros",
  publisher: "Max Market Pros",
  robots: "index, follow",
  openGraph: {
    title: "Google Business Profile Suspended? Get Reinstated Fast",
    description:
      "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Business Profile Suspended? Get Reinstated Fast",
    description:
      "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
