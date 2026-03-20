'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, CheckCircle2, Layers, Search, Beaker } from 'lucide-react'
import { categories } from '@/data/categories'
import { peptides } from '@/data/peptides'
import { stacks } from '@/data/stacks'
import CategoryIcon from '@/components/CategoryIcon'
import RiskBadge from '@/components/RiskBadge'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}

export default function HomePage() {
  const topPeptides = [...peptides].sort((a, b) => a.trendingRank - b.trendingRank).slice(0, 5)

  return (
    <div className="mesh-bg">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-neon-teal/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-neon-cyan/8 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-teal/10 border border-neon-teal/20 mb-5 sm:mb-6">
              <Beaker className="h-3.5 w-3.5 text-neon-teal" />
              <span className="text-[11px] sm:text-xs font-medium text-neon-teal">18 peptides researched &amp; analyzed</span>
            </div>

            <h1 className="font-display text-[2.5rem] leading-[1.1] sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              Find Your<br />
              <span className="gradient-text">Perfect Peptide</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-400 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
              Navigate the peptide landscape with confidence. Research-backed profiles, risk assessments, and personalized recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/find"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
              >
                <Search className="h-4 w-4" />
                Take the Quiz
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/peptides"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:border-neon-teal/30 hover:text-white transition-all"
              >
                Browse Database
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">What&apos;s Your Goal?</h2>
            <p className="text-sm sm:text-base text-slate-400">Explore peptides by what they do best</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link
                  href={`/peptides?category=${cat.id}`}
                  className="glass-card p-3 sm:p-4 text-center block group"
                >
                  <div
                    className="mx-auto w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                  >
                    <CategoryIcon name={cat.icon} className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: cat.color }} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">{cat.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trending Peptides */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Trending Now</h2>
              <p className="text-sm sm:text-base text-slate-400">Most popular peptides by search volume</p>
            </div>
            <Link href="/peptides" className="flex items-center gap-1 text-xs sm:text-sm text-neon-teal hover:text-neon-cyan transition-colors shrink-0 ml-4">
              View all <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>
          </motion.div>

          <div className="grid gap-2.5 sm:gap-3">
            {topPeptides.map((peptide, i) => (
              <motion.div key={peptide.id} variants={fadeUp}>
                <Link href={`/peptides/${peptide.id}`} className="glass-card p-3.5 sm:p-5 flex items-center gap-3 sm:gap-6 group">
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-neon-teal">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-neon-teal transition-colors truncate">{peptide.name}</h3>
                      {peptide.fdaApproved && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                          <CheckCircle2 className="h-2.5 w-2.5" /> FDA
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{peptide.primaryUse}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <RiskBadge level={peptide.riskLevel} />
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 group-hover:text-neon-teal transition-colors hidden sm:block" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Stacks */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Popular Stacks</h2>
              <p className="text-sm sm:text-base text-slate-400">Proven peptide combinations</p>
            </div>
            <Link href="/stacks" className="flex items-center gap-1 text-xs sm:text-sm text-neon-teal hover:text-neon-cyan transition-colors shrink-0 ml-4">
              View all <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {stacks.slice(0, 3).map((stack) => (
              <motion.div key={stack.id} variants={fadeUp}>
                <Link href={`/stacks#${stack.id}`} className="glass-card p-5 sm:p-6 block group h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex items-center justify-center shrink-0">
                      <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-neon-teal" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-neon-teal transition-colors">{stack.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 leading-relaxed">{stack.purpose}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.peptideIds.map((id) => {
                      const p = peptides.find((pp) => pp.id === id)
                      return p ? (
                        <span key={id} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10">
                          {p.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="border-t border-b border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-10 text-center">
            {[
              { n: '18+', l: 'Peptides Profiled' },
              { n: '200+', l: 'Studies Referenced' },
              { n: '10', l: 'Health Categories' },
              { n: '4', l: 'FDA-Approved' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-xl sm:text-2xl font-bold gradient-text">{s.n}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Not sure where to start?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-lg mx-auto px-2">
            Our guided quiz matches your goals, experience, and preferences to the peptides best suited for you.
          </p>
          <Link
            href="/find"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
          >
            Find Your Peptide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
