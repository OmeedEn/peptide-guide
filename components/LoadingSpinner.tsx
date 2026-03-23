'use client'

import { FlaskConical } from 'lucide-react'

export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-neon-teal animate-spin" />
        <FlaskConical className="h-5 w-5 text-neon-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-sm text-slate-500 animate-pulse">{message}</p>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="flex-1">
          <div className="h-5 w-32 bg-white/5 rounded mb-2" />
          <div className="h-3 w-48 bg-white/[0.03] rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/[0.03] rounded" />
        <div className="h-3 w-3/4 bg-white/[0.03] rounded" />
      </div>
      <div className="flex gap-2 mt-3">
        <div className="h-5 w-16 bg-white/5 rounded-full" />
        <div className="h-5 w-20 bg-white/5 rounded-full" />
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 6, message }: { count?: number; message?: string }) {
  return (
    <div>
      {message && <p className="text-sm text-slate-500 animate-pulse mb-4">{message}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  )
}
