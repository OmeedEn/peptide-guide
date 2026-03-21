import { type QuizAnswers, type ScoredPeptide, scorePeptides } from '@/lib/quiz-logic'
import { type Peptide } from '@/data/peptides'
import { type Stack, stacks } from '@/data/stacks'
import { categoryMap } from '@/data/categories'

export interface DosingEntry {
  peptideId: string
  peptideName: string
  dose: string
  method: string
  frequency: string
  cycleLength: string
  notes: string
  experienceNote: string
}

export interface RiskEntry {
  peptideId: string
  peptideName: string
  riskLevel: string
  sideEffects: { text: string; severity: 'mild' | 'moderate' | 'serious' }[]
}

export interface CycleWeek {
  week: number
  days: { day: string; peptides: { name: string; color: string }[] }[]
}

export interface PeptideReport {
  generatedAt: string
  answers: QuizAnswers
  allMatches: ScoredPeptide[]
  recommendedStacks: Stack[]
  dosingProtocol: DosingEntry[]
  riskAssessment: RiskEntry[]
  doctorGuide: string[]
  cycleCalendar: CycleWeek[]
}

const PEPTIDE_COLORS: Record<string, string> = {
  0: '#00d4aa',
  1: '#0ea5e9',
  2: '#8b5cf6',
  3: '#f97316',
  4: '#ec4899',
}

function buildDosingProtocol(
  topPeptides: ScoredPeptide[],
  experience: QuizAnswers['experience']
): DosingEntry[] {
  return topPeptides.slice(0, 3).map((sp) => {
    const p = sp.peptide
    const dosing = p.dosing

    let experienceNote = ''
    let dose = dosing.typical

    if (experience === 'beginner') {
      // Extract the lower end of the dose range for beginners
      const lowerMatch = dosing.typical.match(/^[\d.]+/)
      if (lowerMatch) {
        experienceNote = `Start at the low end (${lowerMatch[0]} range) for 1-2 weeks before increasing. Monitor for side effects closely.`
      } else {
        experienceNote = 'Start with the minimum recommended dose. Increase gradually over 2 weeks only if well tolerated.'
      }
    } else if (experience === 'intermediate') {
      experienceNote = 'Standard dosing range. Adjust based on your response and tolerance from previous cycles.'
    } else {
      experienceNote = 'Full dosing range appropriate. Consider stacking protocols for enhanced results.'
    }

    // Parse frequency from the dosing info
    let frequency = 'As directed'
    if (dosing.typical.includes('daily')) frequency = 'Daily'
    else if (dosing.typical.includes('weekly') || dosing.typical.includes('week')) frequency = 'Weekly'
    else if (dosing.typical.includes('2x') || dosing.typical.includes('twice')) frequency = 'Twice daily'
    else if (dosing.typical.includes('1-2x')) frequency = '1-2 times daily'
    else if (dosing.typical.includes('1-3')) frequency = '1-3 times daily'
    else if (dosing.typical.includes('per dose')) frequency = 'As needed'

    return {
      peptideId: p.id,
      peptideName: p.name,
      dose,
      method: dosing.method,
      frequency,
      cycleLength: dosing.cycle,
      notes: dosing.notes,
      experienceNote,
    }
  })
}

function buildRiskAssessment(
  topPeptides: ScoredPeptide[],
  riskTolerance: QuizAnswers['riskTolerance']
): RiskEntry[] {
  return topPeptides.slice(0, 5).map((sp) => {
    const p = sp.peptide
    let sideEffects = [...p.sideEffects]

    if (riskTolerance === 'conservative') {
      // Sort serious ones first for conservative users
      sideEffects.sort((a, b) => {
        const order = { serious: 0, moderate: 1, mild: 2 }
        return order[a.severity] - order[b.severity]
      })
    }

    return {
      peptideId: p.id,
      peptideName: p.name,
      riskLevel: p.riskLevel,
      sideEffects,
    }
  })
}

function buildDoctorGuide(
  topPeptides: ScoredPeptide[],
  answers: QuizAnswers
): string[] {
  const points: string[] = []
  const goalName = categoryMap[answers.primaryGoal]?.name ?? answers.primaryGoal

  // General opening
  points.push(`Discuss your interest in peptide therapy for ${goalName.toLowerCase()}`)

  // Top peptide specific points
  const top3 = topPeptides.slice(0, 3)
  top3.forEach((sp) => {
    points.push(`Ask about ${sp.peptide.name} for ${sp.peptide.primaryUse.toLowerCase()}`)
  })

  // Side effect monitoring
  const seriousSideEffects = top3.flatMap((sp) =>
    sp.peptide.sideEffects
      .filter((se) => se.severity === 'serious')
      .map((se) => ({ peptide: sp.peptide.name, effect: se.text }))
  )
  if (seriousSideEffects.length > 0) {
    points.push(
      `Discuss monitoring for ${seriousSideEffects.map((s) => s.effect.replace('SERIOUS: ', '').replace('Rare: ', '')).join(', ')}`
    )
  }

  // Interactions
  points.push('Ask about interactions with any current medications or supplements you take')

  // Lab work
  points.push('Request baseline blood work before starting (hormone panel, metabolic panel, liver/kidney function)')

  // Experience-based
  if (answers.experience === 'beginner') {
    points.push('Ask about starting with the lowest effective dose and a conservative cycle length')
  }

  // Follow-up
  points.push('Establish a follow-up schedule for monitoring progress and side effects')

  return points
}

function buildCycleCalendar(topPeptides: ScoredPeptide[]): CycleWeek[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const top = topPeptides.slice(0, 2)

  // Determine schedule for each peptide based on dosing info
  const schedules: { name: string; color: string; activeDays: number[] }[] = []

  top.forEach((sp, idx) => {
    const dosing = sp.peptide.dosing
    const typical = dosing.typical.toLowerCase()
    const cycle = dosing.cycle.toLowerCase()
    let activeDays: number[] = []

    if (typical.includes('daily') || typical.includes('1-2x daily') || typical.includes('1-3 times daily')) {
      // Daily: all weekdays, rest on weekends
      activeDays = [0, 1, 2, 3, 4] // Mon-Fri
    } else if (typical.includes('twice/week') || typical.includes('2-3 times per week') || typical.includes('2-3 injections')) {
      // Mon/Wed/Fri
      activeDays = [0, 2, 4]
    } else if (typical.includes('weekly') || typical.includes('once/week')) {
      // Weekly: Monday only
      activeDays = [0]
    } else if (typical.includes('per dose') || typical.includes('as-needed')) {
      // As needed: show 2-3 times per week
      activeDays = [1, 4]
    } else {
      // Default: daily Mon-Fri
      activeDays = [0, 1, 2, 3, 4]
    }

    schedules.push({
      name: sp.peptide.name,
      color: PEPTIDE_COLORS[idx] || '#00d4aa',
      activeDays,
    })
  })

  const weeks: CycleWeek[] = []
  for (let w = 1; w <= 4; w++) {
    const weekDays = days.map((day, dayIdx) => ({
      day,
      peptides: schedules
        .filter((s) => s.activeDays.includes(dayIdx))
        .map((s) => ({ name: s.name, color: s.color })),
    }))
    weeks.push({ week: w, days: weekDays })
  }

  return weeks
}

export function generateReport(answers: QuizAnswers): PeptideReport {
  const allMatches = scorePeptides(answers)
  const topIds = allMatches.slice(0, 5).map((sp) => sp.peptide.id)

  // Filter stacks where at least 1 peptide is in user's top 5
  const recommendedStacks = stacks.filter((stack) =>
    stack.peptideIds.some((pid) => topIds.includes(pid))
  )

  const dosingProtocol = buildDosingProtocol(allMatches, answers.experience)
  const riskAssessment = buildRiskAssessment(allMatches, answers.riskTolerance)
  const doctorGuide = buildDoctorGuide(allMatches, answers)
  const cycleCalendar = buildCycleCalendar(allMatches)

  return {
    generatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    answers,
    allMatches,
    recommendedStacks,
    dosingProtocol,
    riskAssessment,
    doctorGuide,
    cycleCalendar,
  }
}
