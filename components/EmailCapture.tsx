'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    localStorage.setItem('peptide_user_email', email)
    setSubmitted(true)
    setError('')
  }

  const handleSkip = () => {
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="my-5 sm:my-6"
    >
      <div className="glass-card p-5 sm:p-6 border-neon-teal/15 bg-base-900/80 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-neon-teal/5 rounded-full blur-[60px] pointer-events-none" />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative text-center py-2"
            >
              <CheckCircle2 className="h-8 w-8 text-neon-teal mx-auto mb-2" />
              <p className="text-sm font-medium text-white">Results saved!</p>
              <p className="text-xs text-slate-500 mt-1">We&apos;ll notify you when new peptides are added.</p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }} className="relative">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-neon-teal" />
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">Save your results</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Enter your email to save your matches and get notified when we add new peptides
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="you@example.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all shrink-0"
                >
                  Save Results
                </button>
              </form>

              {error && <p className="text-xs text-red-400 mt-2 text-center">{error}</p>}

              <button
                onClick={handleSkip}
                className="block mx-auto mt-3 text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                Skip
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
