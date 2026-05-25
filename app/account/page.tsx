'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, LogOut, FlaskConical, ArrowRight } from 'lucide-react'
import { useAuth } from '@/components/AuthContext'
import Link from 'next/link'

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="molecular-bg min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">My Account</h1>
          <p className="text-sm text-slate-400 mb-8">Manage your PeptideGuide account</p>

          {/* Profile Card */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex items-center justify-center">
                <User className="h-6 w-6 text-neon-teal" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{user.email}</h2>
                <p className="text-xs text-slate-500">PeptideGuide Member</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                <Mail className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm text-white">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Member since</p>
                  <p className="text-sm text-white">{createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/find"
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-4 w-4 text-neon-teal" />
                  <span className="text-sm text-slate-300">Take the Peptide Quiz</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  )
}
