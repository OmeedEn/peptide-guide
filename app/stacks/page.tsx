'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Layers, ArrowRight } from 'lucide-react'
import { stacks } from '@/data/stacks'
import { peptideMap } from '@/data/peptides'
import { categoryMap } from '@/data/categories'
import RiskBadge from '@/components/RiskBadge'

export default function StacksPage() {
  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">Popular Stacks</h1>
          <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-10">Proven peptide combinations for synergistic effects</p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {stacks.map((stack, i) => {
            const stackPeptides = stack.peptideIds.map((id) => peptideMap[id]).filter(Boolean)

            return (
              <motion.div
                key={stack.id}
                id={stack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 sm:p-6 lg:p-8 scroll-mt-20"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex items-center justify-center shrink-0">
                    <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-neon-teal" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{stack.name}</h2>
                    <p className="text-xs sm:text-sm text-neon-teal/80 font-medium">{stack.purpose}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed mb-4 sm:mb-6">{stack.description}</p>

                <div className="space-y-2 sm:space-y-3">
                  {stackPeptides.map((peptide) => (
                    <Link
                      key={peptide.id}
                      href={`/peptides/${peptide.id}`}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-neon-teal/20 active:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                          <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-neon-teal transition-colors">{peptide.name}</h3>
                          <div className="flex gap-1 flex-wrap">
                            {peptide.categories.slice(0, 2).map((catId) => {
                              const cat = categoryMap[catId]
                              return cat ? (
                                <span
                                  key={catId}
                                  className="px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-medium"
                                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                                >
                                  {cat.name}
                                </span>
                              ) : null
                            })}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 truncate">{peptide.primaryUse}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <RiskBadge level={peptide.riskLevel} />
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 group-hover:text-neon-teal transition-colors hidden sm:block" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
