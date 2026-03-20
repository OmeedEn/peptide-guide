'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { peptides } from '@/data/peptides'
import { categories } from '@/data/categories'
import PeptideCard from '@/components/PeptideCard'
import CategoryIcon from '@/components/CategoryIcon'

export default function PeptidesPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [riskFilter, setRiskFilter] = useState('')
  const [evidenceFilter, setEvidenceFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) setSelectedCategory(cat)
  }, [])

  const filtered = useMemo(() => {
    return peptides.filter((p) => {
      if (search) {
        const q = search.toLowerCase()
        const match =
          p.name.toLowerCase().includes(q) ||
          p.fullName.toLowerCase().includes(q) ||
          p.aliases.some((a) => a.toLowerCase().includes(q)) ||
          p.primaryUse.toLowerCase().includes(q)
        if (!match) return false
      }
      if (selectedCategory && !p.categories.includes(selectedCategory)) return false
      if (riskFilter && p.riskLevel !== riskFilter) return false
      if (evidenceFilter && p.evidenceLevel !== evidenceFilter) return false
      return true
    })
  }, [search, selectedCategory, riskFilter, evidenceFilter])

  const hasActiveFilters = selectedCategory || riskFilter || evidenceFilter

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white mb-1.5 sm:mb-2">Peptide Database</h1>
          <p className="text-sm sm:text-base text-slate-400 mb-5 sm:mb-8">Explore all {peptides.length} peptides with detailed profiles</p>
        </motion.div>

        {/* Search + Filter Toggle */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search peptides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm font-medium transition-all shrink-0 ${
              showFilters || hasActiveFilters
                ? 'bg-neon-teal/10 border-neon-teal/30 text-neon-teal'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-neon-teal text-base-950 text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                {[selectedCategory, riskFilter, evidenceFilter].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card p-4 sm:p-5 mb-4 sm:mb-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xs sm:text-sm font-semibold text-white">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={() => { setSelectedCategory(''); setRiskFilter(''); setEvidenceFilter('') }}
                  className="flex items-center gap-1 text-[11px] sm:text-xs text-neon-teal hover:text-neon-cyan"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            {/* Categories - horizontally scrollable on mobile */}
            <div className="mb-4 sm:mb-5">
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Category</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all ${
                      selectedCategory === cat.id
                        ? 'border-neon-teal/40 bg-neon-teal/10 text-neon-teal'
                        : 'border-white/10 bg-white/5 text-slate-400 active:bg-white/10'
                    }`}
                  >
                    <CategoryIcon name={cat.icon} className="h-3 w-3" />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk + Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Risk Level</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    { v: 'low', l: 'Low' },
                    { v: 'low_moderate', l: 'Low-Mod' },
                    { v: 'moderate', l: 'Moderate' },
                    { v: 'high', l: 'High' },
                  ].map((r) => (
                    <button
                      key={r.v}
                      onClick={() => setRiskFilter(riskFilter === r.v ? '' : r.v)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all ${
                        riskFilter === r.v
                          ? 'border-neon-teal/40 bg-neon-teal/10 text-neon-teal'
                          : 'border-white/10 bg-white/5 text-slate-400 active:bg-white/10'
                      }`}
                    >
                      {r.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Evidence</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    { v: 'very_high', l: 'Very High' },
                    { v: 'high', l: 'High' },
                    { v: 'moderate', l: 'Moderate' },
                    { v: 'low_moderate', l: 'Low-Mod' },
                    { v: 'low', l: 'Low' },
                  ].map((e) => (
                    <button
                      key={e.v}
                      onClick={() => setEvidenceFilter(evidenceFilter === e.v ? '' : e.v)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all ${
                        evidenceFilter === e.v
                          ? 'border-neon-teal/40 bg-neon-teal/10 text-neon-teal'
                          : 'border-white/10 bg-white/5 text-slate-400 active:bg-white/10'
                      }`}
                    >
                      {e.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
          Showing {filtered.length} of {peptides.length} peptides
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((p, i) => (
              <PeptideCard key={p.id} peptide={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 sm:py-20">
            <p className="text-slate-500 text-base sm:text-lg mb-2">No peptides match your filters</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory(''); setRiskFilter(''); setEvidenceFilter('') }}
              className="text-sm text-neon-teal hover:text-neon-cyan"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
