'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CheckCircle2, ArrowLeft, MapPin, Calendar, Truck,
  RotateCcw, ShieldCheck, FileText, AlertTriangle,
  Package, Star, ExternalLink,
} from 'lucide-react'
import { suppliers, supplierMap } from '@/data/suppliers'
import { products, getProductsBySupplier } from '@/data/products'
import { peptideMap } from '@/data/peptides'
import StarRating from '@/components/StarRating'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const formLabels: Record<string, { label: string; color: string }> = {
  lyophilized: { label: 'Lyophilized', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  'pre-mixed': { label: 'Pre-Mixed', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  nasal_spray: { label: 'Nasal Spray', color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
  cream: { label: 'Cream', color: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
  capsule: { label: 'Capsule', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  tablet: { label: 'Tablet', color: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
}

export default function SupplierDetail({ supplierId }: { supplierId: string }) {
  const supplier = supplierMap[supplierId]

  if (!supplier) {
    notFound()
  }

  const supplierProducts = getProductsBySupplier(supplier.id)

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/suppliers"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-teal transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Suppliers
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-5 sm:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
              {supplier.logo}
            </div>

            <div className="flex-1">
              {/* Name row */}
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {supplier.name}
                </h1>
                {supplier.verified && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-neon-teal/15 text-neon-teal border border-neon-teal/20">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={supplier.rating} size="md" />
                <span className="text-sm text-slate-500">
                  ({supplier.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {supplier.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  Est. {supplier.established}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-slate-500" />
                  {supplierProducts.length} products
                </span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {supplier.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neon-teal/8 text-neon-teal border border-neon-teal/15"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Long description */}
          <div className="mt-5 pt-5 border-t border-white/5">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {supplier.longDescription}
            </p>
          </div>
        </motion.div>

        {/* Products Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-5 sm:mb-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Products
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {supplierProducts.length} products available from {supplier.name}
            </p>
          </motion.div>

          {supplierProducts.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-slate-500 text-sm">No products listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {supplierProducts.map((product) => {
                const peptide = peptideMap[product.peptideId]
                const form = formLabels[product.form] || formLabels.lyophilized

                return (
                  <motion.div key={product.id} variants={fadeUp}>
                    <div className="glass-card p-4 sm:p-5 flex flex-col h-full">
                      {/* Peptide link + product name */}
                      <div className="mb-2">
                        {peptide && (
                          <Link
                            href={`/peptides/${peptide.id}`}
                            className="text-[10px] font-medium text-neon-teal hover:text-neon-cyan transition-colors uppercase tracking-wider"
                          >
                            {peptide.name}
                          </Link>
                        )}
                        <h3 className="text-sm sm:text-base font-semibold text-white leading-snug mt-0.5">
                          {product.name}
                        </h3>
                      </div>

                      {/* Form & Purity */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${form.color}`}>
                          {form.label}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10">
                          {product.purity} pure
                        </span>
                        {/* Stock indicator */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          product.inStock
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Variants / Pricing */}
                      <div className="space-y-1.5 mb-3 flex-1">
                        {product.variants.map((v) => (
                          <div key={v.id} className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">{v.size}</span>
                            <div className="flex items-center gap-1.5">
                              {v.originalPrice && (
                                <span className="text-slate-600 line-through">
                                  ${v.originalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="font-semibold text-white">
                                ${v.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Trust badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.coaAvailable && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-neon-teal/10 text-neon-teal border border-neon-teal/20">
                            <FileText className="h-2.5 w-2.5" /> COA
                          </span>
                        )}
                        {product.thirdPartyTested && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <ShieldCheck className="h-2.5 w-2.5" /> 3rd Party Tested
                          </span>
                        )}
                        {product.requiresPrescription && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <AlertTriangle className="h-2.5 w-2.5" /> Rx Required
                          </span>
                        )}
                      </div>

                      {/* Add to cart placeholder */}
                      <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-neon-teal/10 border border-neon-teal/20 text-neon-teal text-xs font-medium hover:bg-neon-teal/20 transition-all">
                        <Package className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Shipping & Returns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-4 mt-8 sm:mt-12"
        >
          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="h-5 w-5 text-neon-teal" />
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Shipping
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {supplier.shippingInfo}
            </p>
          </div>

          <div className="glass-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <RotateCcw className="h-5 w-5 text-neon-teal" />
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Return Policy
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {supplier.returnPolicy}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
