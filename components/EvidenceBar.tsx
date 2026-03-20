'use client'

import { motion } from 'framer-motion'

const levels: Record<string, { width: string; label: string; color: string }> = {
  low: { width: '15%', label: 'Low', color: 'from-rose-500 to-rose-400' },
  low_moderate: { width: '30%', label: 'Low-Moderate', color: 'from-amber-500 to-amber-400' },
  moderate: { width: '50%', label: 'Moderate', color: 'from-amber-400 to-yellow-400' },
  moderate_high: { width: '65%', label: 'Moderate-High', color: 'from-emerald-500 to-emerald-400' },
  high: { width: '80%', label: 'High', color: 'from-emerald-400 to-teal-400' },
  very_high: { width: '95%', label: 'Very High', color: 'from-teal-400 to-cyan-400' },
}

export default function EvidenceBar({ level }: { level: string }) {
  const config = levels[level] || levels.moderate

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-500 font-medium">Evidence Level</span>
        <span className="text-xs font-semibold text-slate-300">{config.label}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: config.width }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${config.color}`}
        />
      </div>
    </div>
  )
}
