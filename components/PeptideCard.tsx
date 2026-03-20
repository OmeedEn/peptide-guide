'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react'
import type { Peptide } from '@/data/peptides'
import { categoryMap } from '@/data/categories'
import RiskBadge from './RiskBadge'
import EvidenceBar from './EvidenceBar'

export default function PeptideCard({ peptide, index = 0 }: { peptide: Peptide; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/peptides/${peptide.id}`} className="block glass-card p-4 sm:p-5 h-full group">
        <div className="flex items-start justify-between mb-2.5 sm:mb-3 gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-neon-teal transition-colors truncate">
              {peptide.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">{peptide.fullName}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {peptide.fdaApproved && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-2.5 w-2.5" />
                FDA
              </span>
            )}
            {peptide.trendingRank <= 5 && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-neon-teal/10 text-neon-teal border border-neon-teal/20">
                <TrendingUp className="h-2.5 w-2.5" />
                #{peptide.trendingRank}
              </span>
            )}
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
          {peptide.categories.map((catId) => {
            const cat = categoryMap[catId]
            return cat ? (
              <span
                key={catId}
                className="px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium"
                style={{
                  backgroundColor: `${cat.color}15`,
                  color: cat.color,
                  border: `1px solid ${cat.color}30`,
                }}
              >
                {cat.name}
              </span>
            ) : null
          })}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
          {peptide.primaryUse}
        </p>

        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <RiskBadge level={peptide.riskLevel} />
          {peptide.legalStatus.wadaBanned && (
            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-amber-500">
              <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              WADA Banned
            </span>
          )}
        </div>

        <EvidenceBar level={peptide.evidenceLevel} />

        <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] text-slate-600 uppercase tracking-wider truncate mr-2">
            {peptide.dosing.method.split('(')[0].trim()}
          </span>
          <span className="text-[10px] sm:text-xs text-neon-teal/70 font-medium group-hover:text-neon-teal transition-colors shrink-0">
            Details &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
