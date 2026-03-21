'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search, CheckCircle2, ArrowRight, MapPin, Truck,
  Filter, Star, ShieldCheck, Store,
} from 'lucide-react'
import { suppliers } from '@/data/suppliers'
import { products } from '@/data/products'
import StarRating from '@/components/StarRating'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const allSpecialties = Array.from(
  new Set(suppliers.flatMap((s) => s.specialties))
).sort()

type FilterMode = 'all' | 'verified'

export default function SuppliersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterMode>('all')
  const [specialty, setSpecialty] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = [...suppliers]

    // Featured first
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    if (filter === 'verified') {
      list = list.filter((s) => s.verified)
    }

    if (specialty) {
      list = list.filter((s) => s.specialties.includes(specialty))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.specialties.some((sp) => sp.toLowerCase().includes(q))
      )
    }

    return list
  }, [search, filter, specialty])

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-teal/10 border border-neon-teal/20 mb-4">
            <Store className="h-3.5 w-3.5 text-neon-teal" />
            <span className="text-[11px] sm:text-xs font-medium text-neon-teal">
              {suppliers.length} verified suppliers
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Trusted <span className="gradient-text">Suppliers</span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto px-2">
            Verified peptide suppliers with third-party testing and certificates of analysis
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-3 sm:p-4 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-all ${
                  filter === 'all'
                    ? 'bg-neon-teal/15 border-neon-teal/30 text-neon-teal'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-all ${
                  filter === 'verified'
                    ? 'bg-neon-teal/15 border-neon-teal/30 text-neon-teal'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Only
              </button>

              {/* Specialty dropdown */}
              <select
                value={specialty || ''}
                onChange={(e) => setSpecialty(e.target.value || null)}
                className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-400 focus:outline-none focus:border-neon-teal/40 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Specialties</option>
                {allSpecialties.map((sp) => (
                  <option key={sp} value={sp}>
                    {sp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Supplier Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-slate-500 text-sm">No suppliers match your search.</p>
          </motion.div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filtered.map((supplier) => {
              const productCount = products.filter(
                (p) => p.supplierId === supplier.id
              ).length
              return (
                <motion.div key={supplier.id} variants={fadeUp}>
                  <div
                    className={`glass-card p-5 sm:p-6 flex flex-col h-full ${
                      supplier.featured
                        ? 'border-neon-teal/20 shadow-[0_0_30px_rgba(0,212,170,0.06)]'
                        : ''
                    }`}
                  >
                    {/* Featured badge */}
                    {supplier.featured && (
                      <div className="flex justify-end mb-2 -mt-1">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Top row: logo + name */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                        {supplier.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-display text-base sm:text-lg font-bold text-white truncate">
                            {supplier.name}
                          </h3>
                          {supplier.verified && (
                            <CheckCircle2 className="h-4 w-4 text-neon-teal shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRating rating={supplier.rating} size="sm" />
                          <span className="text-[10px] text-slate-500">
                            ({supplier.reviewCount.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3 line-clamp-2">
                      {supplier.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {supplier.specialties.map((sp) => (
                        <span
                          key={sp}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {supplier.certifications.slice(0, 3).map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-neon-teal/8 text-neon-teal/80 border border-neon-teal/15"
                        >
                          <ShieldCheck className="h-2.5 w-2.5" />
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Location & Shipping */}
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {supplier.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        {productCount} products
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/suppliers/${supplier.id}`}
                      className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-neon-teal/15 to-neon-cyan/10 border border-neon-teal/20 text-neon-teal text-xs sm:text-sm font-medium hover:from-neon-teal/25 hover:to-neon-cyan/15 transition-all group"
                    >
                      View Products
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Sell CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16"
        >
          <div className="glass-card p-6 sm:p-8 text-center border-neon-teal/10">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Are You a Supplier?
            </h3>
            <p className="text-sm text-slate-400 mb-5 max-w-md mx-auto">
              Join our verified marketplace and reach thousands of peptide buyers.
            </p>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
            >
              <Store className="h-4 w-4" />
              Sell on PeptideGuide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
