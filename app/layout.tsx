import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Providers } from './providers'
import AnalyticsProvider from '@/components/AnalyticsProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://peptideguide.com'),
  title: 'PeptideGuide — Find Your Perfect Peptide',
  description: 'Discover which peptides are right for your health goals. Research-backed data on 18+ peptides with interactive recommendations.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'PeptideGuide — Find Your Perfect Peptide',
    description: 'Discover which peptides are right for your health goals. Research-backed data on 18+ peptides with interactive recommendations.',
    type: 'website',
    siteName: 'PeptideGuide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeptideGuide — Find Your Perfect Peptide',
    description: 'Discover which peptides are right for your health goals. Research-backed data on 18+ peptides with interactive recommendations.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050810',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise-overlay min-h-screen flex flex-col">
        <Providers>
          <AnalyticsProvider />
          <Navigation />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
