'use client'

const riskConfig = {
  low: { label: 'Low Risk', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  low_moderate: { label: 'Low-Moderate', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  moderate: { label: 'Moderate Risk', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  high: { label: 'High Risk', color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' },
}

export default function RiskBadge({ level, size = 'sm' }: { level: string; size?: 'sm' | 'md' }) {
  const config = riskConfig[level as keyof typeof riskConfig] || riskConfig.moderate
  const sizeClass = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.color} ${sizeClass}`}>
      {config.label}
    </span>
  )
}
