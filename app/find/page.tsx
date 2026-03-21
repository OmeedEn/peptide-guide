'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, ArrowLeft, CheckCircle2, Sparkles,
  Syringe, Wind, Pill, Droplets, CircleDot,
  ShieldCheck, ShieldAlert, ShieldOff, Lock,
  FileText, Zap, Calendar, Stethoscope, Download,
} from 'lucide-react'
import { categories } from '@/data/categories'
import { scorePeptides, type QuizAnswers, type ScoredPeptide } from '@/lib/quiz-logic'
import CategoryIcon from '@/components/CategoryIcon'
import RiskBadge from '@/components/RiskBadge'

const steps = ['Primary Goal', 'Secondary Goals', 'Experience', 'Administration', 'Risk Tolerance']

const FREE_RESULTS = 3

export default function FindPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    primaryGoal: '',
    secondaryGoals: [],
    experience: 'beginner',
    administration: 'no_preference',
    riskTolerance: 'moderate',
  })
  const [results, setResults] = useState<ScoredPeptide[] | null>(null)

  const canNext = () => {
    if (step === 0) return !!answers.primaryGoal
    return true
  }

  const next = () => {
    if (step < 4) setStep(step + 1)
    else setResults(scorePeptides(answers))
  }

  const prev = () => {
    if (results) setResults(null)
    else if (step > 0) setStep(step - 1)
  }

  const maxScore = results?.[0]?.score ?? 1

  // Results view
  if (results) {
    const freeResults = results.slice(0, FREE_RESULTS)
    const lockedResults = results.slice(FREE_RESULTS)

    return (
      <div className="molecular-bg min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <button onClick={prev} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-neon-teal transition-colors mb-5 sm:mb-6">
            <ArrowLeft className="h-3.5 w-3.5" /> Retake Quiz
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-teal/10 border border-neon-teal/20 mb-3 sm:mb-4">
                <Sparkles className="h-3.5 w-3.5 text-neon-teal" />
                <span className="text-xs font-medium text-neon-teal">{results.length} matches found</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Your Peptide Matches</h1>
              <p className="text-sm sm:text-base text-slate-400">Ranked by compatibility with your goals</p>
            </div>

            {/* Free results */}
            <div className="space-y-3 sm:space-y-4">
              {freeResults.map((result, i) => {
                const pct = Math.round((result.score / maxScore) * 100)
                return (
                  <motion.div
                    key={result.peptide.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link href={`/peptides/${result.peptide.id}`} className="glass-card p-4 sm:p-5 block group">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex flex-col items-center justify-center">
                          <span className="text-base sm:text-lg font-bold text-neon-teal">{pct}%</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 flex-wrap">
                            <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-neon-teal transition-colors">
                              {result.peptide.name}
                            </h3>
                            {i === 0 && (
                              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-neon-teal/15 text-neon-teal border border-neon-teal/30">
                                BEST MATCH
                              </span>
                            )}
                            {result.peptide.fdaApproved && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                                <CheckCircle2 className="h-2.5 w-2.5" /> FDA
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-400 mb-1.5 line-clamp-1">{result.peptide.primaryUse}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <RiskBadge level={result.peptide.riskLevel} />
                            {result.matchReasons.slice(0, 2).map((r, ri) => (
                              <span key={ri} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] bg-white/5 text-slate-500 border border-white/5 hidden sm:inline-block">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-neon-teal transition-colors shrink-0 mt-1 hidden sm:block" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Locked results - blurred teaser */}
            {lockedResults.length > 0 && (
              <div className="relative mt-4">
                {/* Blurred preview of locked results */}
                <div className="space-y-3 sm:space-y-4 select-none pointer-events-none">
                  {lockedResults.slice(0, 3).map((result, i) => {
                    const pct = Math.round((result.score / maxScore) * 100)
                    return (
                      <motion.div
                        key={result.peptide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="blur-[6px]"
                      >
                        <div className="glass-card p-4 sm:p-5">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <span className="text-base sm:text-lg font-bold text-slate-500">{pct}%</span>
                            </div>
                            <div className="flex-1">
                              <div className="h-5 w-32 bg-white/10 rounded mb-1.5" />
                              <div className="h-4 w-48 bg-white/5 rounded mb-1.5" />
                              <div className="h-5 w-20 bg-white/5 rounded" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Gradient fade overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-950/60 to-base-950 pointer-events-none" />

                {/* Unlock CTA overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="glass-card p-6 sm:p-8 max-w-md mx-4 text-center border-neon-teal/20 bg-base-900/95">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-5 w-5 text-neon-teal" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                      +{lockedResults.length} more matches
                    </h3>
                    <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                      Unlock your full personalized report with all matches, custom stack recommendations, dosing protocols, and a doctor discussion guide.
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all mb-3">
                      <FileText className="h-4 w-4" />
                      Get Full Report — $3
                    </button>
                    <p className="text-[10px] text-slate-600">One-time payment. Instant access. No subscription.</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* What's included in the report */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 sm:mt-14"
            >
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 text-center">What&apos;s in your report?</h2>
              <p className="text-sm text-slate-400 text-center mb-6">A personalized guide built from your quiz answers</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Sparkles className="h-5 w-5" />, title: 'All Matches Ranked', desc: 'Complete list with match scores and reasoning' },
                  { icon: <Zap className="h-5 w-5" />, title: 'Stack Recommendations', desc: 'Custom peptide combos for your specific goals' },
                  { icon: <Syringe className="h-5 w-5" />, title: 'Dosing Protocols', desc: 'Tailored to your experience level' },
                  { icon: <ShieldCheck className="h-5 w-5" />, title: 'Risk Assessment', desc: 'Side effects matched to your tolerance' },
                  { icon: <Stethoscope className="h-5 w-5" />, title: 'Doctor Guide', desc: '"What to ask your doctor" talking points' },
                  { icon: <Calendar className="h-5 w-5" />, title: 'Cycle Calendar', desc: 'Weekly protocol template to follow' },
                ].map((item) => (
                  <div key={item.title} className="glass-card p-3.5 sm:p-4">
                    <div className="text-neon-teal/70 mb-2">{item.icon}</div>
                    <p className="text-xs sm:text-sm font-semibold text-white mb-0.5 leading-tight">{item.title}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all">
                  <Download className="h-4 w-4" />
                  Get Your Report — $3
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz steps
  return (
    <div className="mesh-bg min-h-screen flex items-start sm:items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10 w-full">
        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs text-slate-500">Step {step + 1} of 5</span>
            <span className="text-[11px] sm:text-xs text-slate-500">{steps[step]}</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-teal to-neon-cyan"
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">What&apos;s your primary goal?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Choose what matters most to you right now</p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setAnswers({ ...answers, primaryGoal: cat.id })}
                      className={`glass-card p-3 sm:p-4 text-left transition-all ${
                        answers.primaryGoal === cat.id ? 'border-neon-teal/40 bg-neon-teal/10 ring-1 ring-neon-teal/20' : ''
                      }`}
                    >
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <CategoryIcon name={cat.icon} className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: cat.color }} />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-white leading-tight">{cat.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Any secondary goals?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Select all that apply (optional)</p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {categories.filter((c) => c.id !== answers.primaryGoal).map((cat) => {
                    const selected = answers.secondaryGoals.includes(cat.id)
                    return (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            secondaryGoals: selected
                              ? answers.secondaryGoals.filter((g) => g !== cat.id)
                              : [...answers.secondaryGoals, cat.id],
                          })
                        }
                        className={`glass-card p-3 sm:p-4 text-left transition-all ${
                          selected ? 'border-neon-teal/40 bg-neon-teal/10 ring-1 ring-neon-teal/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon name={cat.icon} className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: cat.color }} />
                          <p className="text-xs sm:text-sm font-medium text-white flex-1 leading-tight">{cat.name}</p>
                          {selected && <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neon-teal shrink-0" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Your experience level?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Helps us recommend the right starting point</p>
                <div className="space-y-2.5 sm:space-y-3">
                  {[
                    { v: 'beginner' as const, l: 'Beginner', d: 'New to peptides. Prefer well-studied, easy-to-use options.', icon: <ShieldCheck className="h-5 w-5 text-emerald-400" /> },
                    { v: 'intermediate' as const, l: 'Intermediate', d: 'Some experience. Comfortable with injections and cycling.', icon: <ShieldAlert className="h-5 w-5 text-amber-400" /> },
                    { v: 'advanced' as const, l: 'Advanced', d: 'Extensive experience. Open to complex protocols.', icon: <ShieldOff className="h-5 w-5 text-neon-cyan" /> },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => setAnswers({ ...answers, experience: opt.v })}
                      className={`glass-card p-4 sm:p-5 w-full text-left flex items-center gap-3 sm:gap-4 transition-all ${
                        answers.experience === opt.v ? 'border-neon-teal/40 bg-neon-teal/10 ring-1 ring-neon-teal/20' : ''
                      }`}
                    >
                      <div className="shrink-0">{opt.icon}</div>
                      <div>
                        <p className="font-medium text-white text-sm sm:text-base">{opt.l}</p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-snug">{opt.d}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Preferred method?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">How would you prefer to take your peptide?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    { v: 'injection' as const, l: 'Injection', icon: <Syringe className="h-5 w-5" /> },
                    { v: 'nasal' as const, l: 'Nasal Spray', icon: <Wind className="h-5 w-5" /> },
                    { v: 'oral' as const, l: 'Oral / Pill', icon: <Pill className="h-5 w-5" /> },
                    { v: 'topical' as const, l: 'Topical', icon: <Droplets className="h-5 w-5" /> },
                    { v: 'no_preference' as const, l: 'No Preference', icon: <CircleDot className="h-5 w-5" /> },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => setAnswers({ ...answers, administration: opt.v })}
                      className={`glass-card p-4 sm:p-5 text-center transition-all ${
                        answers.administration === opt.v ? 'border-neon-teal/40 bg-neon-teal/10 ring-1 ring-neon-teal/20' : ''
                      }`}
                    >
                      <div className="text-slate-400 mb-2 flex justify-center">{opt.icon}</div>
                      <p className="text-xs sm:text-sm font-medium text-white">{opt.l}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Risk tolerance?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">How do you feel about experimental peptides?</p>
                <div className="space-y-2.5 sm:space-y-3">
                  {[
                    { v: 'conservative' as const, l: 'Conservative', d: 'FDA-approved or well-studied only.' },
                    { v: 'moderate' as const, l: 'Moderate', d: 'Open to well-tolerated peptides with moderate evidence.' },
                    { v: 'open' as const, l: 'Open', d: 'Willing to try cutting-edge peptides with emerging research.' },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => setAnswers({ ...answers, riskTolerance: opt.v })}
                      className={`glass-card p-4 sm:p-5 w-full text-left transition-all ${
                        answers.riskTolerance === opt.v ? 'border-neon-teal/40 bg-neon-teal/10 ring-1 ring-neon-teal/20' : ''
                      }`}
                    >
                      <p className="font-medium text-white text-sm sm:text-base mb-0.5 sm:mb-1">{opt.l}</p>
                      <p className="text-xs sm:text-sm text-slate-400 leading-snug">{opt.d}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 sm:mt-8 sticky bottom-0 py-4 sm:py-0 sm:static bg-base-950/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-white/5 sm:border-none">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={next}
            disabled={!canNext()}
            className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
          >
            {step === 4 ? 'See Results' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
