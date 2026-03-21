'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, Store, Users, BarChart3,
  ListChecks, ShieldCheck, Rocket, ClipboardList, Send,
  Sparkles,
} from 'lucide-react'
import { suppliers } from '@/data/suppliers'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const productTypes = [
  'Research Peptides',
  'Compounded Peptides',
  'GLP-1 Agonists',
  'Nootropics',
  'Anti-Aging',
  'Healing / Recovery',
  'Topical / Creams',
  'Other',
]

export default function SellPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    website: '',
    productTypes: [] as string[],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function toggleProductType(type: string) {
    setFormData((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(type)
        ? prev.productTypes.filter((t) => t !== type)
        : [...prev.productTypes, type],
    }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('supplier_inquiry') || '[]')
    existing.push({ ...formData, submittedAt: new Date().toISOString() })
    localStorage.setItem('supplier_inquiry', JSON.stringify(existing))
    setSubmitted(true)
  }

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Hero */}
        <section className="relative overflow-hidden mb-12 sm:mb-16">
          <div className="absolute top-10 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-neon-teal/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-neon-cyan/8 rounded-full blur-[80px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto relative"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-teal/10 border border-neon-teal/20 mb-5">
              <Store className="h-3.5 w-3.5 text-neon-teal" />
              <span className="text-[11px] sm:text-xs font-medium text-neon-teal">
                Supplier Marketplace
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Reach <span className="gradient-text">Peptide Buyers</span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto px-2">
              List your products on the largest peptide education and marketplace platform.
              Connect with thousands of informed buyers actively researching peptides.
            </p>
          </motion.div>
        </section>

        {/* Benefits Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-16"
        >
          {[
            {
              icon: <ShieldCheck className="h-6 w-6 text-neon-teal" />,
              title: 'Verified Marketplace',
              desc: 'Build trust with verified supplier badges and certification displays.',
            },
            {
              icon: <Users className="h-6 w-6 text-neon-teal" />,
              title: 'Targeted Audience',
              desc: 'Reach buyers actively researching peptides — high intent, informed customers.',
            },
            {
              icon: <ListChecks className="h-6 w-6 text-neon-teal" />,
              title: 'Easy Listing',
              desc: 'Simple product listing with variant pricing, COA badges, and form types.',
            },
            {
              icon: <BarChart3 className="h-6 w-6 text-neon-teal" />,
              title: 'Analytics Dashboard',
              desc: 'Track views, clicks, and conversions. Understand your customer base.',
            },
          ].map((benefit, i) => (
            <motion.div key={benefit.title} variants={fadeUp}>
              <div className="glass-card p-5 sm:p-6 h-full relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider text-slate-600 bg-white/5 border border-white/10">
                    Coming Soon
                  </span>
                </div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-teal/15 to-neon-cyan/15 border border-neon-teal/20 flex items-center justify-center mb-3">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Four simple steps to start selling on PeptideGuide
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                icon: <ClipboardList className="h-6 w-6 text-neon-teal" />,
                title: 'Apply',
                desc: 'Fill out the inquiry form with your business details and product types.',
              },
              {
                step: '02',
                icon: <ShieldCheck className="h-6 w-6 text-neon-teal" />,
                title: 'Get Verified',
                desc: 'Our team reviews your certifications, COAs, and manufacturing standards.',
              },
              {
                step: '03',
                icon: <ListChecks className="h-6 w-6 text-neon-teal" />,
                title: 'List Products',
                desc: 'Add your peptide products with pricing, variants, and documentation.',
              },
              {
                step: '04',
                icon: <Rocket className="h-6 w-6 text-neon-teal" />,
                title: 'Start Selling',
                desc: 'Go live and reach thousands of qualified peptide buyers.',
              },
            ].map((step) => (
              <motion.div key={step.step} variants={fadeUp}>
                <div className="glass-card p-5 sm:p-6 h-full relative overflow-hidden">
                  <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-3">
                    Step {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-teal/15 to-neon-cyan/15 border border-neon-teal/20 flex items-center justify-center mb-3">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Get Started
            </h2>
            <p className="text-sm text-slate-400">
              Tell us about your business and we&apos;ll be in touch.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 sm:p-10 text-center border-neon-teal/20"
            >
              <div className="w-14 h-14 rounded-full bg-neon-teal/15 border border-neon-teal/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-7 w-7 text-neon-teal" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                Application Received!
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Thank you for your interest in selling on PeptideGuide.
                Our team will review your application and reach out within 2-3 business days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 border-neon-teal/10">
              <div className="space-y-4 sm:space-y-5">
                {/* Business Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                    placeholder="Your Company Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, website: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all"
                    placeholder="https://yourcompany.com"
                  />
                </div>

                {/* Product Types */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Product Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {productTypes.map((type) => {
                      const selected = formData.productTypes.includes(type)
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleProductType(type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            selected
                              ? 'bg-neon-teal/15 border-neon-teal/30 text-neon-teal'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {selected && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal/40 focus:ring-1 focus:ring-neon-teal/20 transition-all resize-none"
                    placeholder="Tell us about your products, certifications, and why you'd be a great fit..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
                >
                  <Send className="h-4 w-4" />
                  Submit Application
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-6 sm:p-8 border-neon-teal/10 max-w-xl mx-auto">
            <Sparkles className="h-6 w-6 text-neon-teal mx-auto mb-3" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
              Join {suppliers.length} Suppliers Already on PeptideGuide
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Verified suppliers with proven track records and quality certifications.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              {suppliers.filter((s) => s.featured).map((s) => (
                <div
                  key={s.id}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg"
                  title={s.name}
                >
                  {s.logo}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
