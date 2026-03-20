import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'PeptideGuide — Find Your Perfect Peptide',
  description: 'Discover which peptides are right for your health goals. Research-backed data on 18+ peptides with interactive recommendations.',
  icons: {
    icon: '/peptide-guide/favicon.svg',
    apple: '/peptide-guide/favicon.svg',
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
          <Navigation />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
