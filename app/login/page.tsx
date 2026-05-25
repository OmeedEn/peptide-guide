'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, FlaskConical, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setSuccess('Check your email for a confirmation link to complete your sign up.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        // Save email to localStorage for backward compat
        localStorage.setItem('peptide_user_email', email)
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="molecular-bg min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative">
              <FlaskConical className="h-8 w-8 text-neon-teal transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-lg bg-neon-teal/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Peptide<span className="text-neon-teal">Guide</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8 border-white/10">
          {/* Tabs */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess('') }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); setSuccess('') }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <h1 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            {mode === 'login'
              ? 'Sign in to access your saved results and reports.'
              : 'Sign up to save your quiz results and get personalized recommendations.'}
          </p>

          {/* Error / Success messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-sm text-rose-400"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-neon-teal/10 border border-neon-teal/20 text-sm text-neon-teal flex items-start gap-2"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              {success}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Create a password (min 6 chars)' : 'Your password'}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => { setMode('signup'); setError(''); setSuccess('') }}
                    className="text-neon-teal hover:underline font-medium"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                    className="text-neon-teal hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-[10px] text-slate-600 mt-4">
          By continuing, you agree to our{' '}
          <Link href="/privacy" className="text-slate-500 hover:text-slate-400">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  )
}
