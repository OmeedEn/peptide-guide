'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Package, ArrowRight, Mail } from 'lucide-react'
import { useCart } from '@/components/CartContext'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="mesh-bg min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Order Confirmed!</h1>
          <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
            Your payment was successful. The supplier will process your order and send shipping details to your email.
          </p>

          <div className="glass-card p-5 mb-8 text-left space-y-3">
            {[
              { icon: <Mail className="h-4 w-4 text-neon-teal" />, text: 'Order confirmation sent to your email' },
              { icon: <Package className="h-4 w-4 text-neon-teal" />, text: 'Supplier will ship within 1-3 business days' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/suppliers"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
