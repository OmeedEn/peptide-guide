'use client'

import { CompareProvider } from '@/components/CompareContext'
import { CartProvider } from '@/components/CartContext'
import CartDrawer from '@/components/CartDrawer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CompareProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </CompareProvider>
  )
}
