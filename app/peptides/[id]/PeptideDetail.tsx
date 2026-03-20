'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle, Info,
  Syringe, Clock, Scale, BookOpen, Layers,
} from 'lucide-react'
import { peptideMap, peptides } from '@/data/peptides'
import { categoryMap } from '@/data/categories'
import { stacks } from '@/data/stacks'
import CategoryIcon from '@/components/CategoryIcon'
import RiskBadge from '@/components/RiskBadge'
import EvidenceBar from '@/components/EvidenceBar'
import { useCompare } from '@/components/CompareContext'

function SeverityIcon({ severity }: { severity: 'mild' | 'moderate' | 'serious' }) {
  if (severity === 'serious') return <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
  if (severity === 'moderate') return <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
  return <Info className="h-4 w-4 text-blue-400 shrink-0" />
}

const severityBg: Record<string, string> = {
  mild: 'bg-blue-500/5 border-blue-500/10',
  moderate: 'bg-amber-500/5 border-amber-500/10',
  serious: 'bg-rose-500/5 border-rose-500/10',
}

export default function PeptideDetail({ id }: { id: string }) {
  const peptide = peptideMap[id]
  const { addToCompare, isInCompare, removeFromCompare } = useCompare()

  if (!peptide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-2xl font-bold text-white">Peptide Not Found</h1>
        <p className="text-slate-400">The peptide &quot;{id}&quot; doesn&apos;t exist in our database.</p>
        <Link
          href="/peptides"
          className="px-5 py-2.5 rounded-xl bg-neon-teal/10 border border-neon-teal/30 text-sm text-neon-teal hover:bg-neon-teal/20 transition-all inline-block"
        >
          Browse All Peptides
        </Link>
      </div>
    )
  }

  const relatedStacks = stacks.filter((s) => s.peptideIds.includes(peptide.id))
  const inCompare = isInCompare(peptide.id)

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link href="/peptides" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-neon-teal transition-colors mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Database
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{peptide.name}</h1>
                  {peptide.fdaApproved && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" /> FDA Approved
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400">{peptide.fullName}</p>
                {peptide.aliases.length > 0 && (
                  <p className="text-xs text-slate-600 mt-1">Also known as: {peptide.aliases.join(', ')}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <RiskBadge level={peptide.riskLevel} size="md" />
                <button
                  onClick={() => inCompare ? removeFromCompare(peptide.id) : addToCompare(peptide.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    inCompare
                      ? 'bg-neon-teal/10 border-neon-teal/30 text-neon-teal'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Scale className="h-3.5 w-3.5" />
                  {inCompare ? 'In Compare' : 'Compare'}
                </button>
              </div>
            </div>

            {/* Category tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {peptide.categories.map((catId) => {
                const cat = categoryMap[catId]
                return cat ? (
                  <span
                    key={catId}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                      border: `1px solid ${cat.color}30`,
                    }}
                  >
                    <CategoryIcon name={cat.icon} className="h-3 w-3" />
                    {cat.name}
                  </span>
                ) : null
              })}
            </div>

            <p className="text-slate-300 leading-relaxed">{peptide.description}</p>
          </div>

          {/* Benefits */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              Benefits
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {peptide.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Effects */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Side Effects &amp; Risks
            </h2>
            <div className="space-y-2">
              {peptide.sideEffects.map((se, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-lg border ${severityBg[se.severity] || ''}`}>
                  <SeverityIcon severity={se.severity} />
                  <span className="text-sm text-slate-300">{se.text}</span>
                  <span className={`ml-auto text-[10px] font-medium uppercase tracking-wider shrink-0 ${
                    se.severity === 'serious' ? 'text-rose-400' : se.severity === 'moderate' ? 'text-amber-400' : 'text-blue-400'
                  }`}>
                    {se.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dosing */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Syringe className="h-5 w-5 text-neon-cyan" />
              Dosing Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Typical Dose', value: peptide.dosing.typical, icon: 'syringe' },
                { label: 'Administration', value: peptide.dosing.method, icon: 'info' },
                { label: 'Cycle Length', value: peptide.dosing.cycle, icon: 'clock' },
                { label: 'Notes', value: peptide.dosing.notes, icon: 'book' },
              ].map((d) => (
                <div key={d.label} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    {d.icon === 'syringe' && <Syringe className="h-4 w-4" />}
                    {d.icon === 'info' && <Info className="h-4 w-4" />}
                    {d.icon === 'clock' && <Clock className="h-4 w-4" />}
                    {d.icon === 'book' && <BookOpen className="h-4 w-4" />}
                    {d.label}
                  </div>
                  <p className="text-sm text-slate-300">{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal + Evidence */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="glass-card p-6">
              <h2 className="font-display text-lg font-bold text-white mb-4">Legal Status</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">FDA Status</p>
                  <p className="text-sm text-slate-300">{peptide.legalStatus.fda}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Availability</p>
                  <p className="text-sm text-slate-300">{peptide.legalStatus.availability}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">WADA Status</p>
                  <p className={`text-sm ${peptide.legalStatus.wadaBanned ? 'text-amber-400' : 'text-slate-300'}`}>
                    {peptide.legalStatus.wadaBanned ? 'Banned by WADA (athletes beware)' : 'Not currently banned'}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-lg font-bold text-white mb-4">Evidence</h2>
              <EvidenceBar level={peptide.evidenceLevel} />
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">{peptide.evidenceNotes}</p>
            </div>
          </div>

          {/* Related Stacks */}
          {relatedStacks.length > 0 && (
            <div className="glass-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-neon-teal" />
                Works Well In These Stacks
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedStacks.map((stack) => (
                  <Link key={stack.id} href={`/stacks#${stack.id}`} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-neon-teal/20 transition-colors group">
                    <h3 className="font-display font-bold text-white group-hover:text-neon-teal transition-colors mb-1">{stack.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">{stack.purpose}</p>
                    <div className="flex flex-wrap gap-1">
                      {stack.peptideIds.map((pid) => {
                        const p = peptides.find((pp) => pp.id === pid)
                        return p ? (
                          <span key={pid} className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            pid === peptide.id ? 'bg-neon-teal/10 text-neon-teal border border-neon-teal/20' : 'bg-white/5 text-slate-400 border border-white/5'
                          }`}>
                            {p.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
