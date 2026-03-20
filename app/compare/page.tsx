'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, Plus, Scale, CheckCircle2, AlertTriangle } from 'lucide-react'
import { peptides, peptideMap } from '@/data/peptides'
import { categoryMap } from '@/data/categories'
import { useCompare } from '@/components/CompareContext'
import RiskBadge from '@/components/RiskBadge'
import EvidenceBar from '@/components/EvidenceBar'
import { useState } from 'react'

export default function ComparePage() {
  const { compareIds, removeFromCompare, addToCompare, clearCompare } = useCompare()
  const [showPicker, setShowPicker] = useState(false)

  const selected = compareIds.map((id) => peptideMap[id]).filter(Boolean)
  const available = peptides.filter((p) => !compareIds.includes(p.id))

  const rows = [
    {
      label: 'Categories',
      render: (p: typeof selected[0]) => (
        <div className="flex flex-wrap gap-1">
          {p.categories.map((catId) => {
            const cat = categoryMap[catId]
            return cat ? (
              <span key={catId} className="px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                {cat.name}
              </span>
            ) : null
          })}
        </div>
      ),
    },
    {
      label: 'Risk Level',
      render: (p: typeof selected[0]) => <RiskBadge level={p.riskLevel} />,
    },
    {
      label: 'Evidence',
      render: (p: typeof selected[0]) => <EvidenceBar level={p.evidenceLevel} />,
    },
    {
      label: 'Benefits',
      render: (p: typeof selected[0]) => (
        <div className="space-y-1">
          {p.benefits.slice(0, 4).map((b, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-300">{b}</span>
            </div>
          ))}
          {p.benefits.length > 4 && (
            <span className="text-[10px] text-slate-500">+{p.benefits.length - 4} more</span>
          )}
        </div>
      ),
    },
    {
      label: 'Side Effects',
      render: (p: typeof selected[0]) => (
        <div className="space-y-1">
          {p.sideEffects.slice(0, 3).map((se, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <AlertTriangle className={`h-3 w-3 shrink-0 mt-0.5 ${
                se.severity === 'serious' ? 'text-rose-400' : se.severity === 'moderate' ? 'text-amber-400' : 'text-blue-400'
              }`} />
              <span className="text-[11px] text-slate-300">{se.text}</span>
            </div>
          ))}
          {p.sideEffects.length > 3 && (
            <span className="text-[10px] text-slate-500">+{p.sideEffects.length - 3} more</span>
          )}
        </div>
      ),
    },
    {
      label: 'Dosing',
      render: (p: typeof selected[0]) => <span className="text-xs text-slate-300">{p.dosing.typical}</span>,
    },
    {
      label: 'Method',
      render: (p: typeof selected[0]) => <span className="text-xs text-slate-300">{p.dosing.method}</span>,
    },
    {
      label: 'FDA Status',
      render: (p: typeof selected[0]) => (
        <span className={`text-xs ${p.fdaApproved ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
          {p.fdaApproved ? 'FDA Approved' : 'Not Approved'}
        </span>
      ),
    },
    {
      label: 'WADA',
      render: (p: typeof selected[0]) => (
        <span className={`text-xs ${p.legalStatus.wadaBanned ? 'text-amber-400' : 'text-slate-400'}`}>
          {p.legalStatus.wadaBanned ? 'Banned' : 'Not Banned'}
        </span>
      ),
    },
  ]

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Compare Peptides</h1>
              <p className="text-sm text-slate-400">Select up to 3 peptides side-by-side</p>
            </div>
            {selected.length > 0 && (
              <button onClick={clearCompare} className="text-xs sm:text-sm text-slate-500 hover:text-rose-400 transition-colors shrink-0 ml-4 mt-1">
                Clear all
              </button>
            )}
          </div>

          {/* Selected slots */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {[0, 1, 2].map((slot) => {
              const peptide = selected[slot]
              if (peptide) {
                return (
                  <div key={peptide.id} className="glass-card p-3 sm:p-4 relative">
                    <button
                      onClick={() => removeFromCompare(peptide.id)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 rounded-lg bg-white/5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                      <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </button>
                    <Link href={`/peptides/${peptide.id}`} className="block group">
                      <h3 className="font-display text-sm sm:text-lg font-bold text-white group-hover:text-neon-teal transition-colors mb-0.5 sm:mb-1 pr-6">{peptide.name}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 mb-1.5 sm:mb-2 line-clamp-1">{peptide.primaryUse}</p>
                      <RiskBadge level={peptide.riskLevel} />
                    </Link>
                  </div>
                )
              }
              return (
                <button
                  key={slot}
                  onClick={() => setShowPicker(true)}
                  className="glass-card p-3 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 min-h-[80px] sm:min-h-[100px] text-slate-600 hover:text-neon-teal hover:border-neon-teal/20 transition-all"
                >
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-[10px] sm:text-xs font-medium">Add</span>
                </button>
              )
            })}
          </div>

          {/* Picker */}
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-3 sm:p-4 mb-6 sm:mb-8 max-h-64 sm:max-h-80 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-semibold text-white">Select a peptide</h3>
                <button onClick={() => setShowPicker(false)} className="text-slate-500 hover:text-white p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {available.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { addToCompare(p.id); setShowPicker(false) }}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-neon-teal/20 text-left transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">{p.name}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">{p.primaryUse}</p>
                    </div>
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comparison — Card layout on mobile, table on desktop */}
          {selected.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Desktop table */}
              <div className="hidden sm:block glass-card overflow-hidden">
                {rows.map((row, ri) => (
                  <div key={row.label} className={`grid ${
                    selected.length === 2 ? 'grid-cols-[120px_1fr_1fr]' : 'grid-cols-[120px_1fr_1fr_1fr]'
                  } ${ri % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <div className="p-4 flex items-start">
                      <span className="text-xs font-medium text-slate-500">{row.label}</span>
                    </div>
                    {selected.map((p) => (
                      <div key={p.id} className="p-4 border-l border-white/5">
                        {row.render(p)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Mobile: stacked card comparison */}
              <div className="sm:hidden space-y-3">
                {rows.map((row) => (
                  <div key={row.label} className="glass-card p-3.5">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">{row.label}</p>
                    <div className="grid grid-cols-2 gap-2.5" style={selected.length === 3 ? { gridTemplateColumns: 'repeat(3, 1fr)' } : undefined}>
                      {selected.map((p) => (
                        <div key={p.id} className="min-w-0">
                          <p className="text-[10px] text-neon-teal/70 font-medium mb-1 truncate">{p.name}</p>
                          {row.render(p)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {selected.length < 2 && (
            <div className="text-center py-12 sm:py-16">
              <Scale className="h-10 w-10 sm:h-12 sm:w-12 text-slate-700 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-500 mb-1.5 sm:mb-2">Select at least 2 peptides</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-5 sm:mb-6">Add peptides using the slots above</p>
              <Link href="/peptides" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 hover:text-white hover:border-white/20 transition-all">
                Browse Database
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
