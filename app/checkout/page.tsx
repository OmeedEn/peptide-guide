'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Lock,
  CreditCard, Shield, Truck, CheckCircle2,
} from 'lucide-react'
import { useCart } from '@/components/CartContext'

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart, itemCount, total } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Pre-fill email if saved from quiz
    try {
      const saved = localStorage.getItem('peptide_user_email')
      if (saved) setEmail(saved)
    } catch {}
  }, [])

  if (!mounted) return null

  const handleCheckout = async () => {
    if (!email || items.length === 0) return
    setLoading(true)

    try {
      // Save email
      localStorage.setItem('peptide_user_email', email)

      // Call Stripe checkout API
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizAnswers: { type: 'marketplace_order' },
          cartItems: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            name: `${item.productName} (${item.variantSize})`,
            supplier: item.supplierName,
            price: item.price,
            quantity: item.quantity,
          })),
          email,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Stripe is not configured yet. Add your STRIPE_SECRET_KEY to environment variables.')
        setLoading(false)
      }
    } catch {
      alert('Stripe is not configured yet. Add your STRIPE_SECRET_KEY to environment variables.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="molecular-bg min-h-screen">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Your cart is empty</h1>
            <p className="text-sm text-slate-400 mb-6">Add peptides from our supplier marketplace</p>
            <Link
              href="/suppliers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
            >
              Browse Suppliers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Link href="/suppliers" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-neon-teal transition-colors mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Checkout</h1>
          <p className="text-sm text-slate-400 mb-6 sm:mb-8">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>

          <div className="grid lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">
            {/* Cart Items */}
            <div>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.variantId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5">{item.productName}</h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 mb-2">{item.supplierName}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-400 border border-white/5">
                            {item.variantSize}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-slate-400 border border-white/5">
                            {item.form}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <p className="text-base sm:text-lg font-bold text-neon-teal">${(item.price * item.quantity).toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-slate-500">${item.price.toFixed(2)} each</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium text-white w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={clearCart}
                className="mt-3 text-xs text-slate-600 hover:text-rose-400 transition-colors"
              >
                Clear all items
              </button>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="glass-card p-5 sm:p-6 sticky top-20">
                <h2 className="font-display text-lg font-bold text-white mb-4">Order Summary</h2>

                {/* Line items */}
                <div className="space-y-2 mb-4 pb-4 border-b border-white/5">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 truncate mr-2">
                        {item.productName} ({item.variantSize}) x{item.quantity}
                      </span>
                      <span className="text-slate-300 shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Subtotal</span>
                  <span className="text-sm text-slate-300">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                  <span className="text-sm text-slate-400">Shipping</span>
                  <span className="text-sm text-slate-500">Calculated at next step</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-base font-semibold text-white">Total</span>
                  <span className="font-display text-2xl font-bold text-white">${total.toFixed(2)}</span>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-xs text-slate-500 mb-1.5">Email for order confirmation</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                  />
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!email || loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Trust badges */}
                <div className="mt-4 space-y-2">
                  {[
                    { icon: <Lock className="h-3 w-3" />, text: 'Secure checkout powered by Stripe' },
                    { icon: <Shield className="h-3 w-3" />, text: 'Verified suppliers with COA' },
                    { icon: <Truck className="h-3 w-3" />, text: 'Shipping details on next step' },
                  ].map((badge) => (
                    <div key={badge.text} className="flex items-center gap-2 text-[10px] text-slate-500">
                      {badge.icon}
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
