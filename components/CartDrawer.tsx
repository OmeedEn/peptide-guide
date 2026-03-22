'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from './CartContext'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, itemCount, total } = useCart()
  const router = useRouter()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-base-900 border-l border-white/5 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-neon-teal" />
                <h2 className="font-display text-lg font-bold text-white">Cart</h2>
                {itemCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-neon-teal text-base-950 text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-12 w-12 text-slate-700 mb-3" />
                  <p className="text-sm font-medium text-slate-500 mb-1">Your cart is empty</p>
                  <p className="text-xs text-slate-600 mb-4">Browse suppliers to add peptides</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-neon-teal hover:text-neon-cyan transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{item.productName}</p>
                          <p className="text-[10px] text-slate-500">{item.supplierName}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-white/5 border border-white/5">{item.variantSize}</span>
                          <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-white/5 border border-white/5">{item.form}</span>
                        </div>
                        <span className="text-sm font-bold text-neon-teal">${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium text-white w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-xs text-slate-400">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-xs text-slate-600 hover:text-rose-400 transition-colors py-2"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">Total</span>
                  <span className="font-display text-xl font-bold text-white">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => { setIsOpen(false); router.push('/checkout') }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all mb-2"
                >
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[10px] text-slate-600 text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
