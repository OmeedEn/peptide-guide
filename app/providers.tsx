'use client'

import { CompareProvider } from '@/components/CompareContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <CompareProvider>{children}</CompareProvider>
}
