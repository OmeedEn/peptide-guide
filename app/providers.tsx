'use client'

import { CompareProvider } from '@/components/CompareContext'
import { CartProvider } from '@/components/CartContext'
import { AuthProvider } from '@/components/AuthContext'
import CartDrawer from '@/components/CartDrawer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CompareProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </CompareProvider>
    </AuthProvider>
  )
}
