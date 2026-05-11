'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, ArrowLeft, CheckCircle2, Sparkles,
  ShieldAlert, CircleSlash, DollarSign,
  Syringe, FlaskConical, Pill,
  FileText, Zap, Calendar, Stethoscope, Lock,
  Shield, Clock,
} from 'lucide-react'
import { categories } from '@/data/categories'
import {
  scorePeptides, defaultAnswers, goalDeepDive, situationOptions, priorityOptions,
  type QuizAnswers, type ScoredPeptide,
} from '@/lib/quiz-logic'
import CategoryIcon from '@/components/CategoryIcon'
import EmailCapture from '@/components/EmailCapture'
import { trackQuizStart, trackQuizComplete, trackInitiateCheckout } from '@/lib/tracking'

const FREE_RESULTS = 3

const situationIcons: Record<string, React.ReactNode> = {
  Syringe: <Syringe className="h-4 w-4" />,
  FlaskConical: <FlaskConical className="h-4 w-4" />,
  Pill: <Pill className="h-4 w-4" />,
  ShieldAlert: <ShieldAlert className="h-4 w-4" />,
  CircleSlash: <CircleSlash className="h-4 w-4" />,
  DollarSign: <DollarSign className="h-4 w-4" />,
}

export default function FindPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({ ...defaultAnswers })
  const [results, setResults] = useState<ScoredPeptide[] | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const totalSteps = 5

  const canNext = () => {
    if (step === 0) return !!answers.primaryGoal
    if (step === 1) return !!answers.ageRange
    if (step === 2) return !!answers.specificFocus
    return true
  }

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1)
    else {
      const scored = scorePeptides(answers)
      setResults(scored)
      trackQuizComplete(scored.length)
    }
  }

  const prev = () => {
    if (results) { setResults(null) }
    else if (step > 0) setStep(step - 1)

  }

  const maxScore = results?.[0]?.score ?? 1
  const deepDive = goalDeepDive[answers.primaryGoal]

  const stepLabels = ['Your Goal', 'About You', deepDive?.question?.split('?')[0] || 'Details', 'Your Situation', 'Priorities']

  // ===== RESULTS VIEW =====
  if (results) {
    const topResults = results.slice(0, FREE_RESULTS)
    const lockedCount = results.length - FREE_RESULTS

    const handleUnlockReport = async () => {
      setCheckoutLoading(true)
      trackInitiateCheckout()
      localStorage.setItem('peptide_quiz_answers', JSON.stringify(answers))
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quizAnswers: answers }),
        })
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
        } else {
          setCheckoutLoading(false)
        }
      } catch {
        setCheckoutLoading(false)
      }
    }

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
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Your Top Recommendations</h1>
              <p className="text-sm sm:text-base text-slate-400">Personalized for your goals, age, and preferences</p>
            </div>

            {/* TOP 3 FREE RESULTS - Name + Match % only */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-neon-teal" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">Your Top Matches</h2>
                  <p className="text-[10px] sm:text-xs text-slate-500">Based on your specific answers</p>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {topResults.map((result, i) => {
                  const pct = Math.round((result.score / maxScore) * 100)
                  return (
                    <motion.div key={result.peptide.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <div className="glass-card p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex flex-col items-center justify-center">
                          <span className="text-sm sm:text-base font-bold text-neon-teal">{pct}%</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h3 className="font-display text-base sm:text-lg font-bold text-white">{result.peptide.name}</h3>
                            {i === 0 && <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-neon-teal/15 text-neon-teal border border-neon-teal/30">BEST MATCH</span>}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{result.peptide.primaryUse}</p>
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-600 font-medium shrink-0">#{i + 1}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Locked remaining matches */}
              {lockedCount > 0 && (
                <div className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <Lock className="h-3.5 w-3.5 text-slate-600" />
                  <p className="text-xs text-slate-500">+ {lockedCount} more matches in your full report</p>
                </div>
              )}
            </div>

            {/* LOCKED PROTOCOL SECTIONS */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-3.5 w-3.5 text-slate-500" />
                <p className="text-sm text-slate-400 font-medium">Unlock your personalized protocol</p>
              </div>

              {/* Locked section previews */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
                {[
                  { icon: <Zap className="h-5 w-5" />, label: 'Custom Stacks', desc: 'Synergistic combos tailored to your goals' },
                  { icon: <Syringe className="h-5 w-5" />, label: 'Dosing Protocol', desc: 'Exact doses, timing, and cycle length' },
                  { icon: <Stethoscope className="h-5 w-5" />, label: 'Doctor Guide', desc: 'Talking points for your physician' },
                  { icon: <Calendar className="h-5 w-5" />, label: 'Cycle Calendar', desc: '4-week visual schedule' },
                ].map((section) => (
                  <div key={section.label} className="glass-card p-4 sm:p-5 relative overflow-hidden">
                    <div className="absolute top-2.5 right-2.5">
                      <Lock className="h-3 w-3 text-slate-600" />
                    </div>
                    <div className="text-slate-500 mb-2">{section.icon}</div>
                    <p className="text-xs sm:text-sm font-semibold text-white mb-0.5">{section.label}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 leading-snug">{section.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="glass-card p-5 sm:p-7 border-neon-teal/20 bg-gradient-to-br from-neon-teal/[0.03] to-neon-cyan/[0.03]">
                <div className="text-center">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">Get Your Full Protocol</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-5 max-w-md mx-auto">
                    Dosing protocols, stack recommendations, risk assessment, and a doctor discussion guide — personalized to your answers.
                  </p>

                  <button
                    onClick={handleUnlockReport}
                    disabled={checkoutLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-neon-teal/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px]"
                  >
                    {checkoutLoading ? (
                      <div className="w-5 h-5 border-2 border-base-950/30 border-t-base-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Unlock Full Report — $6.99
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4">
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                      <Shield className="h-3 w-3" /> One-time payment
                    </span>
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                      <Zap className="h-3 w-3" /> Instant access
                    </span>
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                      <Clock className="h-3 w-3" /> Print-ready
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WHAT'S INCLUDED */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-6 sm:mb-8">
              <div className="glass-card p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-neon-teal" />
                  <p className="text-sm font-semibold text-white">What&apos;s in the full report?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Personalized stack combinations for your goals',
                    'Exact dosing, timing, and cycle protocols',
                    'Side effect risk assessment by severity',
                    'Talking points to bring to your doctor',
                    '4-week visual cycle calendar',
                    'Print-ready format',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-neon-teal shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <EmailCapture />

          </motion.div>
        </div>

        {/* STICKY MOBILE CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-base-950/95 backdrop-blur-md border-t border-white/5 sm:hidden z-50">
          <button
            onClick={handleUnlockReport}
            disabled={checkoutLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-bold text-sm hover:shadow-lg hover:shadow-neon-teal/25 transition-all disabled:opacity-70 min-h-[48px]"
          >
            {checkoutLoading ? (
              <div className="w-5 h-5 border-2 border-base-950/30 border-t-base-950 rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Unlock Full Report — $6.99
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // ===== QUIZ STEPS =====
  return (
    <div className="mesh-bg min-h-screen flex items-start sm:items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10 w-full">
        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs text-slate-500">Step {step + 1} of {totalSteps}</span>
            <span className="text-[11px] sm:text-xs text-slate-500">{stepLabels[step]}</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-neon-teal to-neon-cyan" animate={{ width: `${((step + 1) / totalSteps) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>

            {/* STEP 0: Primary Goal */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">What&apos;s your primary goal?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Choose the one area that matters most right now</p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {categories.map((cat) => {
                    const selected = answers.primaryGoal === cat.id
                    return (
                      <button key={cat.id} onClick={() => { trackQuizStart(); setAnswers({ ...answers, primaryGoal: cat.id, specificFocus: '' }) }}
                        className={`glass-card p-3 sm:p-4 text-left transition-all duration-200 relative ${selected ? 'border-neon-teal bg-neon-teal/15 ring-2 ring-neon-teal/40 shadow-lg shadow-neon-teal/10 scale-[1.02]' : 'hover:border-white/20'}`}>
                        {selected && <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-neon-teal" />}
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-1.5 sm:mb-2" style={{ backgroundColor: `${cat.color}15` }}>
                          <CategoryIcon name={cat.icon} className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: cat.color }} />
                        </div>
                        <p className={`text-xs sm:text-sm font-medium leading-tight ${selected ? 'text-neon-teal' : 'text-white'}`}>{cat.name}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 1: About You */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Tell us about yourself</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">This helps us tailor recommendations to your biology</p>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Age Range</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(['18-25', '26-35', '36-45', '46-55', '56+'] as const).map((age) => {
                      const selected = answers.ageRange === age
                      return (
                        <button key={age} onClick={() => setAnswers({ ...answers, ageRange: age })}
                          className={`glass-card p-3 text-center transition-all duration-200 ${selected ? 'border-neon-teal bg-neon-teal/15 ring-2 ring-neon-teal/40 shadow-lg shadow-neon-teal/10 scale-[1.03]' : 'hover:border-white/20'}`}>
                          <p className={`text-sm font-bold ${selected ? 'text-neon-teal' : 'text-white font-medium'}`}>{age}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Gender <span className="text-slate-600 normal-case font-normal">(affects hormone-related recommendations)</span></p>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { v: 'male' as const, l: 'Male' },
                      { v: 'female' as const, l: 'Female' },
                      { v: 'other' as const, l: 'Prefer not to say' },
                    ]).map((g) => {
                      const selected = answers.gender === g.v
                      return (
                        <button key={g.v} onClick={() => setAnswers({ ...answers, gender: g.v })}
                          className={`glass-card p-3 text-center transition-all duration-200 ${selected ? 'border-neon-teal bg-neon-teal/15 ring-2 ring-neon-teal/40 shadow-lg shadow-neon-teal/10 scale-[1.03]' : 'hover:border-white/20'}`}>
                          <p className={`text-xs sm:text-sm ${selected ? 'font-bold text-neon-teal' : 'font-medium text-white'}`}>{g.l}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Adaptive Deep-Dive */}
            {step === 2 && deepDive && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">{deepDive.question}</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">This narrows down the best peptides for your specific need</p>
                <div className="space-y-2.5 sm:space-y-3">
                  {deepDive.options.map((opt) => {
                    const selected = answers.specificFocus === opt.id
                    return (
                      <button key={opt.id} onClick={() => setAnswers({ ...answers, specificFocus: opt.id })}
                        className={`glass-card p-4 sm:p-5 w-full text-left transition-all duration-200 relative ${selected ? 'border-neon-teal bg-neon-teal/15 ring-2 ring-neon-teal/40 shadow-lg shadow-neon-teal/10 scale-[1.01]' : 'hover:border-white/20'}`}>
                        {selected && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-neon-teal" />}
                        <p className={`font-medium text-sm sm:text-base mb-0.5 ${selected ? 'text-neon-teal font-semibold' : 'text-white'}`}>{opt.label}</p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-snug">{opt.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Your Situation */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Does any of this apply?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Select all that apply — or skip if none do</p>
                <div className="space-y-2.5 sm:space-y-3">
                  {situationOptions.map((opt) => {
                    const selected = answers.situationFlags.includes(opt.id)
                    return (
                      <button key={opt.id}
                        onClick={() => setAnswers({
                          ...answers,
                          situationFlags: selected
                            ? answers.situationFlags.filter(f => f !== opt.id)
                            : [...answers.situationFlags, opt.id],
                        })}
                        className={`glass-card p-4 w-full text-left flex items-center gap-3 transition-all duration-200 ${selected ? 'border-neon-teal bg-neon-teal/15 ring-2 ring-neon-teal/40 shadow-lg shadow-neon-teal/10 scale-[1.01]' : 'hover:border-white/20'}`}>
                        <div className={`shrink-0 ${selected ? 'text-neon-teal' : 'text-slate-400'}`}>{situationIcons[opt.icon]}</div>
                        <p className={`text-sm font-medium flex-1 ${selected ? 'text-neon-teal' : 'text-white'}`}>{opt.label}</p>
                        {selected && <CheckCircle2 className="h-5 w-5 text-neon-teal shrink-0" />}</button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Priorities */}
            {step === 4 && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">What matters most to you?</h2>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">Pick up to 2 priorities</p>
                <div className="space-y-2.5 sm:space-y-3">
                  {priorityOptions.map((opt) => {
                    const selected = answers.priorities.includes(opt.id)
                    const atMax = answers.priorities.length >= 2 && !selected
                    return (
                      <button key={opt.id}
                        onClick={() => {
                          if (atMax) return
                          setAnswers({
                            ...answers,
                            priorities: selected
                              ? answers.priorities.filter(p => p !== opt.id)
                              : [...answers.priorities, opt.id],
                          })
                        }}
                        className={`glass-card p-4 sm:p-5 w-full text-left transition-all duration-200 relative ${
                          selected ? 'border-neon-teal bg-neon-teal/15 ring-2 ring-neon-teal/40 shadow-lg shadow-neon-teal/10 scale-[1.01]' : atMax ? 'opacity-40 cursor-not-allowed' : 'hover:border-white/20'
                        }`}>
                        {selected && <CheckCircle2 className="h-5 w-5 text-neon-teal absolute top-4 right-4" />}
                        <p className={`font-medium text-sm sm:text-base mb-0.5 ${selected ? 'text-neon-teal font-semibold' : 'text-white'}`}>{opt.label}</p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-snug">{opt.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6 sm:mt-8 sticky bottom-0 py-4 sm:py-0 sm:static bg-base-950/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-white/5 sm:border-none">
          <button onClick={prev} disabled={step === 0} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button onClick={next} disabled={!canNext()} className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-teal/20 transition-all">
            {step === totalSteps - 1 ? 'See Results' : 'Continue'} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
