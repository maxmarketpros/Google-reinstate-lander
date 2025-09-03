import type React from "react"
import type { Metadata, Viewport } from "next"
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
  metadataBase: new URL('https://maxmarketpros.com'), // Replace with actual domain
  title: "Google Business Profile Suspended? Get Reinstated Fast | Max Market Pros",
  description:
    "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process. Call (888) 401-4221 for expert help.",
  keywords:
    "Google Business Profile suspended, GMB suspension, Google My Business reinstatement, suspended business profile, Google listing suspended, GMB appeal, business profile restoration",
  authors: [{ name: "Max Market Pros" }],
  creator: "Max Market Pros",
  publisher: "Max Market Pros",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/favicon.ico'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Google Business Profile Suspended? Get Reinstated Fast | Max Market Pros",
    description:
      "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process.",
    type: "website",
    locale: "en_US",
    url: "https://maxmarketpros.com", // Replace with actual domain
    siteName: "Max Market Pros",
    images: [
      {
        url: "/GBP-Suspension_Hero-Image - Edited.png",
        width: 1200,
        height: 630,
        alt: "Google Business Profile Suspension - Professional Reinstatement Service"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@maxmarketpros", // Replace with actual Twitter handle
    creator: "@maxmarketpros",
    title: "Google Business Profile Suspended? Get Reinstated Fast",
    description:
      "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process.",
    images: ["/GBP-Suspension_Hero-Image - Edited.png"]
  },
  alternates: {
    canonical: "https://maxmarketpros.com", // Replace with actual domain
  },
  category: "Business Services",
  classification: "Professional Services",
  generator: "Next.js",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://maxmarketpros.com/#organization",
        "name": "Max Market Pros",
        "url": "https://maxmarketpros.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://maxmarketpros.com/max-market-pros-logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-888-401-4221",
          "contactType": "customer service",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "Service",
        "@id": "https://maxmarketpros.com/#service",
        "name": "Google Business Profile Reinstatement",
        "description": "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process.",
        "provider": {
          "@id": "https://maxmarketpros.com/#organization"
        },
        "serviceType": "Business Profile Reinstatement",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Google Business Profile Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "GMB Suspension Appeal",
                "description": "Professional appeal service for suspended Google My Business profiles"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Profile Restoration",
                "description": "Complete restoration service for Google Business Profile listings"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://maxmarketpros.com/#website",
        "url": "https://maxmarketpros.com",
        "name": "Max Market Pros - Google Business Profile Reinstatement",
        "description": "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly.",
        "publisher": {
          "@id": "https://maxmarketpros.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://maxmarketpros.com/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://maxmarketpros.com/#webpage",
        "url": "https://maxmarketpros.com",
        "name": "Google Business Profile Suspended? Get Reinstated Fast | Max Market Pros",
        "isPartOf": {
          "@id": "https://maxmarketpros.com/#website"
        },
        "about": {
          "@id": "https://maxmarketpros.com/#organization"
        },
        "description": "Professional Google Business Profile reinstatement service. Get your suspended GMB listing back online quickly with our proven process.",
        "breadcrumb": {
          "@id": "https://maxmarketpros.com/#breadcrumb"
        }
      }
    ]
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
