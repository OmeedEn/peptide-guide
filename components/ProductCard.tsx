'use client'

import Link from 'next/link'
import { CheckCircle2, Shield, FileText, AlertTriangle, Package } from 'lucide-react'
import type { Product } from '@/data/products'
import type { Supplier } from '@/data/suppliers'

const formLabels: Record<string, { label: string; color: string }> = {
  lyophilized: { label: 'Lyophilized', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  'pre-mixed': { label: 'Pre-Mixed', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  nasal_spray: { label: 'Nasal Spray', color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
  cream: { label: 'Cream', color: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
  capsule: { label: 'Capsule', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  tablet: { label: 'Tablet', color: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
}

interface ProductCardProps {
  product: Product
  supplier: Supplier
}

export default function ProductCard({ product, supplier }: ProductCardProps) {
  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0]
  const hasDiscount = product.variants.some((v) => v.originalPrice)
  const discountVariant = product.variants.find((v) => v.originalPrice)
  const form = formLabels[product.form] || formLabels.lyophilized

  return (
    <div className="glass-card p-4 sm:p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-white leading-snug truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-slate-400">{supplier.name}</span>
            {supplier.verified && (
              <CheckCircle2 className="h-3 w-3 text-neon-teal shrink-0" />
            )}
          </div>
        </div>
        {/* Stock indicator */}
        <div className={`shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
          product.inStock
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-rose-500/10 text-rose-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Form & Purity badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${form.color}`}>
          {form.label}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10">
          {product.purity} pure
        </span>
      </div>

      {/* Variants / Pricing */}
      <div className="space-y-1.5 mb-3 flex-1">
        {product.variants.map((v) => (
          <div key={v.id} className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{v.size}</span>
            <div className="flex items-center gap-1.5">
              {v.originalPrice && (
                <span className="text-slate-600 line-through">${v.originalPrice.toFixed(2)}</span>
              )}
              <span className="font-semibold text-white">${v.price.toFixed(2)}</span>
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
            <Shield className="h-2.5 w-2.5" /> 3rd Party
          </span>
        )}
        {product.requiresPrescription && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-2.5 w-2.5" /> Rx Required
          </span>
        )}
      </div>

      {/* Actions */}
      <Link
        href={`/suppliers/${supplier.id}`}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-neon-teal/10 border border-neon-teal/20 text-neon-teal text-xs font-medium hover:bg-neon-teal/20 transition-all"
      >
        <Package className="h-3.5 w-3.5" />
        View at {supplier.name}
      </Link>
    </div>
  )
}
