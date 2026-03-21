'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles, FileText, Printer, Download, ArrowRight,
  CheckCircle2, AlertTriangle, Info, Stethoscope,
  Calendar, Syringe, Shield, Zap, Clock, ChevronRight,
  FlaskConical, User, Target, Gauge,
} from 'lucide-react'
import { type QuizAnswers } from '@/lib/quiz-logic'
import { generateReport, type PeptideReport } from '@/lib/report-generator'
import { categoryMap } from '@/data/categories'
import RiskBadge from '@/components/RiskBadge'
import EvidenceBar from '@/components/EvidenceBar'
import CategoryIcon from '@/components/CategoryIcon'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const experienceLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const adminLabels: Record<string, string> = {
  injection: 'Injection',
  nasal: 'Nasal Spray',
  oral: 'Oral / Pill',
  topical: 'Topical',
  no_preference: 'No Preference',
}

const riskToleranceLabels: Record<string, string> = {
  conservative: 'Conservative',
  moderate: 'Moderate',
  open: 'Open',
}

const severityColors: Record<string, string> = {
  mild: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  moderate: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  serious: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
}

const severityBg: Record<string, string> = {
  mild: 'bg-blue-500/5 border-blue-500/10',
  moderate: 'bg-amber-500/5 border-amber-500/10',
  serious: 'bg-rose-500/5 border-rose-500/10',
}

export default function ReportPage() {
  const [report, setReport] = useState<PeptideReport | null>(null)
  const [noAnswers, setNoAnswers] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('peptide_quiz_answers')
      if (!stored) {
        setNoAnswers(true)
        return
      }
      const answers: QuizAnswers = JSON.parse(stored)
      if (!answers.primaryGoal) {
        setNoAnswers(true)
        return
      }
      setReport(generateReport(answers))
    } catch {
      setNoAnswers(true)
    }
  }, [])

  if (noAnswers) {
    return (
      <div className="molecular-bg min-h-screen flex items-center justify-center">
        <motion.div {...fadeUp} className="glass-card p-8 sm:p-12 max-w-md mx-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex items-center justify-center mx-auto mb-5">
            <FlaskConical className="h-6 w-6 text-neon-teal" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-3">No Quiz Results Found</h1>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Take the peptide finder quiz first to generate your personalized report.
          </p>
          <Link
            href="/find"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
          >
            Take the Quiz <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="molecular-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-neon-teal/30 border-t-neon-teal rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400">Generating your report...</p>
        </div>
      </div>
    )
  }

  const maxScore = report.allMatches[0]?.score ?? 1
  const goalName = categoryMap[report.answers.primaryGoal]?.name ?? report.answers.primaryGoal
  const goalIcon = categoryMap[report.answers.primaryGoal]?.icon ?? 'FlaskConical'
  const goalColor = categoryMap[report.answers.primaryGoal]?.color ?? '#00d4aa'

  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ===== SECTION 1: HEADER ===== */}
        <motion.div {...fadeUp} className="mb-10 sm:mb-14">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-teal/10 border border-neon-teal/20 mb-3 sm:mb-4">
              <Sparkles className="h-3.5 w-3.5 text-neon-teal" />
              <span className="text-xs font-medium text-neon-teal">Personalized Report</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              Your Personalized Peptide Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Generated {report.generatedAt}
            </p>
          </div>

          {/* Quiz summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="glass-card p-3 sm:p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target className="h-3.5 w-3.5 text-neon-teal" />
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Primary Goal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CategoryIcon name={goalIcon} className="h-3.5 w-3.5" style={{ color: goalColor }} />
                <p className="text-xs sm:text-sm font-semibold text-white truncate">{goalName}</p>
              </div>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <User className="h-3.5 w-3.5 text-neon-teal" />
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Experience</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white">{experienceLabels[report.answers.experience]}</p>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Syringe className="h-3.5 w-3.5 text-neon-teal" />
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Preferred Method</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white">{adminLabels[report.answers.administration]}</p>
            </div>
            <div className="glass-card p-3 sm:p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Gauge className="h-3.5 w-3.5 text-neon-teal" />
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Risk Tolerance</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white">{riskToleranceLabels[report.answers.riskTolerance]}</p>
            </div>
          </div>
        </motion.div>

        {/* ===== SECTION 2: COMPLETE RANKINGS ===== */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-neon-teal" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Complete Rankings</h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {report.allMatches.map((result, i) => {
              const pct = Math.round((result.score / maxScore) * 100)
              return (
                <motion.div
                  key={result.peptide.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * Math.min(i, 10) }}
                >
                  <Link href={`/peptides/${result.peptide.id}`} className="glass-card p-3.5 sm:p-4 block group">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-neon-teal/20 to-neon-cyan/20 border border-neon-teal/20 flex flex-col items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-slate-500 font-medium leading-none">#{i + 1}</span>
                        <span className="text-sm sm:text-base font-bold text-neon-teal leading-none">{pct}%</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-neon-teal transition-colors">
                            {result.peptide.name}
                          </h3>
                          {i === 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-neon-teal/15 text-neon-teal border border-neon-teal/30">
                              BEST MATCH
                            </span>
                          )}
                          {result.peptide.fdaApproved && (
                            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="h-2.5 w-2.5" /> FDA
                            </span>
                          )}
                          <RiskBadge level={result.peptide.riskLevel} />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {result.matchReasons.join(' \u00B7 ')}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-neon-teal transition-colors shrink-0 hidden sm:block" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ===== SECTION 3: RECOMMENDED STACKS ===== */}
        {report.recommendedStacks.length > 0 && (
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 rounded-lg bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-neon-teal" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Recommended Stacks</h2>
            </div>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {report.recommendedStacks.map((stack) => {
                const stackPeptideNames = stack.peptideIds
                  .map((pid) => report.allMatches.find((m) => m.peptide.id === pid)?.peptide.name ?? pid)
                return (
                  <motion.div
                    key={stack.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <CategoryIcon name={stack.icon} className="h-5 w-5 text-neon-teal" />
                      <h3 className="font-display text-base sm:text-lg font-bold text-white">{stack.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed">{stack.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stackPeptideNames.map((name) => (
                        <span
                          key={name}
                          className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-neon-teal/10 text-neon-teal border border-neon-teal/20"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-2.5">{stack.purpose}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ===== SECTION 4: DOSING PROTOCOL ===== */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
              <Syringe className="h-4 w-4 text-neon-teal" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Dosing Protocol</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {report.dosingProtocol.map((entry, i) => (
              <motion.div
                key={entry.peptideId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass-card p-4 sm:p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-neon-teal/15 text-neon-teal text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">{entry.peptideName}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3">
                  <div className="bg-white/[0.03] rounded-lg p-2.5 sm:p-3 border border-white/5">
                    <p className="text-[10px] sm:text-xs text-slate-500 mb-0.5">Dose</p>
                    <p className="text-xs sm:text-sm font-medium text-white">{entry.dose}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5 sm:p-3 border border-white/5">
                    <p className="text-[10px] sm:text-xs text-slate-500 mb-0.5">Method</p>
                    <p className="text-xs sm:text-sm font-medium text-white">{entry.method}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5 sm:p-3 border border-white/5">
                    <p className="text-[10px] sm:text-xs text-slate-500 mb-0.5">Frequency</p>
                    <p className="text-xs sm:text-sm font-medium text-white">{entry.frequency}</p>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5 sm:p-3 border border-white/5">
                    <p className="text-[10px] sm:text-xs text-slate-500 mb-0.5">Cycle</p>
                    <p className="text-xs sm:text-sm font-medium text-white">{entry.cycleLength}</p>
                  </div>
                </div>

                <div className="bg-neon-teal/5 rounded-lg p-3 border border-neon-teal/10">
                  <div className="flex items-start gap-2">
                    <Info className="h-3.5 w-3.5 text-neon-teal mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-neon-teal font-medium mb-0.5">
                        {report.answers.experience === 'beginner' ? 'Beginner Note' : report.answers.experience === 'intermediate' ? 'Protocol Note' : 'Advanced Note'}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">{entry.experienceNote}</p>
                    </div>
                  </div>
                </div>

                {entry.notes && (
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-2.5 italic">{entry.notes}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== SECTION 5: RISK ASSESSMENT ===== */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
              <Shield className="h-4 w-4 text-neon-teal" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Risk Assessment</h2>
          </div>

          {report.answers.riskTolerance === 'conservative' && (
            <div className="glass-card p-4 sm:p-5 border-amber-500/20 bg-amber-500/5 mb-4 sm:mb-5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-400 mb-1">Conservative Risk Profile</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Based on your conservative preference, serious side effects are highlighted prominently below.
                    Discuss any concerns with your healthcare provider before starting any protocol.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {report.riskAssessment.map((entry) => {
              const grouped = {
                mild: entry.sideEffects.filter((se) => se.severity === 'mild'),
                moderate: entry.sideEffects.filter((se) => se.severity === 'moderate'),
                serious: entry.sideEffects.filter((se) => se.severity === 'serious'),
              }

              return (
                <div key={entry.peptideId} className="glass-card p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">{entry.peptideName}</h3>
                    <RiskBadge level={entry.riskLevel} />
                  </div>

                  <div className="space-y-2.5">
                    {/* Serious first if conservative */}
                    {(report.answers.riskTolerance === 'conservative'
                      ? ['serious', 'moderate', 'mild'] as const
                      : ['mild', 'moderate', 'serious'] as const
                    ).map((severity) => {
                      const items = grouped[severity]
                      if (items.length === 0) return null
                      return (
                        <div key={severity} className={`rounded-lg p-3 border ${severityBg[severity]}`}>
                          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5"
                            style={{
                              color: severity === 'mild' ? '#60a5fa' : severity === 'moderate' ? '#fbbf24' : '#fb7185',
                            }}
                          >
                            {severity} {severity === 'serious' && report.answers.riskTolerance === 'conservative' ? '-- IMPORTANT' : ''}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((se, idx) => (
                              <span key={idx} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${severityColors[severity]}`}>
                                {se.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ===== SECTION 6: DOCTOR DISCUSSION GUIDE ===== */}
        <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-neon-teal" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Doctor Discussion Guide</h2>
          </div>

          <div className="glass-card p-5 sm:p-6 print:border print:border-slate-300">
            <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
              Bring this list to your next appointment. These talking points are tailored to your goals and the peptides recommended for you.
            </p>
            <ol className="space-y-3">
              {report.doctorGuide.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center text-xs font-bold text-neon-teal">
                    {i + 1}
                  </span>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-0.5">{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* ===== SECTION 7: CYCLE CALENDAR ===== */}
        <motion.div {...fadeUp} transition={{ delay: 0.6 }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-neon-teal/10 border border-neon-teal/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-neon-teal" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">4-Week Cycle Calendar</h2>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {report.allMatches.slice(0, 2).map((sp, i) => (
              <div key={sp.peptide.id} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: ['#00d4aa', '#0ea5e9'][i] }}
                />
                <span className="text-xs text-slate-400">{sp.peptide.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-white/10" />
              <span className="text-xs text-slate-500">Rest day</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {report.cycleCalendar.map((week) => (
              <div key={week.week} className="glass-card p-3.5 sm:p-4">
                <p className="text-xs font-semibold text-slate-500 mb-2.5">Week {week.week}</p>
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {week.days.map((d) => (
                    <div key={d.day} className="text-center">
                      <p className="text-[9px] sm:text-[10px] text-slate-600 font-medium mb-1">{d.day}</p>
                      <div
                        className={`rounded-lg p-1.5 sm:p-2 min-h-[40px] sm:min-h-[52px] flex flex-col items-center justify-center gap-0.5 border ${
                          d.peptides.length > 0
                            ? 'bg-white/[0.03] border-white/10'
                            : 'bg-white/[0.01] border-white/5'
                        }`}
                      >
                        {d.peptides.length > 0 ? (
                          d.peptides.map((p, pi) => (
                            <span
                              key={pi}
                              className="w-full rounded px-0.5 py-0.5 text-[7px] sm:text-[9px] font-semibold text-center truncate"
                              style={{
                                backgroundColor: `${p.color}20`,
                                color: p.color,
                              }}
                            >
                              {p.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-[8px] sm:text-[10px] text-slate-600">Rest</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== ACTION BUTTONS ===== */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10 print:hidden"
        >
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-teal to-neon-cyan text-base-950 font-semibold text-sm hover:shadow-lg hover:shadow-neon-teal/20 transition-all"
          >
            <Printer className="h-4 w-4" />
            Print Report
          </button>
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-semibold text-sm cursor-not-allowed opacity-60"
          >
            <Download className="h-4 w-4" />
            Download PDF (Coming Soon)
          </button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div {...fadeUp} transition={{ delay: 0.8 }} className="text-center mb-6">
          <p className="text-[10px] sm:text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            This report is for informational purposes only and does not constitute medical advice.
            Always consult a qualified healthcare professional before starting any peptide protocol.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
