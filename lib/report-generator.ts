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
  experience: string
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
  riskTolerance: string
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
  if ((answers as any).experience === 'beginner' || answers.situationFlags?.length === 0) {
    points.push('Ask about starting with the lowest effective dose and a conservative cycle length')
  }

  // Follow-up
  points.push('Establish a follow-up schedule for monitoring progress and side effects')

  return points
}

// Parse dosing frequency from peptide data into a schedule pattern
function parseDosingSchedule(peptide: Peptide): { activeDays: number[]; timing: string } {
  const typical = peptide.dosing.typical.toLowerCase()
  const method = peptide.dosing.method.toLowerCase()
  const notes = peptide.dosing.notes.toLowerCase()
  const cycle = peptide.dosing.cycle.toLowerCase()

  // Determine timing (when in the day)
  let timing = ''
  if (notes.includes('before bed') || notes.includes('at night') || notes.includes('before sleep') || notes.includes('nocturnal')) {
    timing = 'PM'
  } else if (notes.includes('morning')) {
    timing = 'AM'
  } else if (notes.includes('before meal') || notes.includes('before morning') || notes.includes('within 60 min')) {
    timing = 'AM'
  } else if (typical.includes('before bedtime') || typical.includes('before bed')) {
    timing = 'PM'
  }

  // Weekly injections (GLP-1s, some GHRPs)
  if (typical.includes('once weekly') || typical.includes('once/week') || typical.includes('mg weekly') || method.includes('weekly')) {
    return { activeDays: [0], timing: timing || 'AM' } // Monday
  }

  // Twice weekly
  if (typical.includes('twice weekly') || typical.includes('twice/week') || typical.includes('2 times weekly')
      || typical.includes('twice per week') || cycle.includes('twice weekly')) {
    return { activeDays: [0, 3], timing: timing || 'AM' } // Mon/Thu
  }

  // 2-3 times per week
  if (typical.includes('2-3 times per week') || typical.includes('2-3 times weekly')
      || typical.includes('2-3 injections') || typical.includes('2-3x/week')
      || typical.includes('2-3 times') || cycle.includes('3 times per week')) {
    return { activeDays: [0, 2, 4], timing: timing || 'AM' } // Mon/Wed/Fri
  }

  // 3 times weekly
  if (typical.includes('three times') || typical.includes('3 times') || typical.includes('3x')) {
    return { activeDays: [0, 2, 4], timing: timing || 'AM' } // Mon/Wed/Fri
  }

  // As-needed (PT-141 etc.)
  if (typical.includes('as-needed') || typical.includes('per dose') || cycle.includes('as needed')) {
    return { activeDays: [2, 5], timing: timing || 'PM' } // Wed/Sat (example)
  }

  // Topical - daily including weekends
  if (method.includes('topical') || method.includes('cream') || method.includes('serum')) {
    return { activeDays: [0, 1, 2, 3, 4, 5, 6], timing: timing || 'AM' } // Every day
  }

  // Oral daily (MK-677, Noopept, etc.)
  if (method.includes('oral') && !typical.includes('weekly')) {
    return { activeDays: [0, 1, 2, 3, 4, 5, 6], timing: timing || 'PM' } // Every day
  }

  // Intranasal daily
  if (method.includes('intranasal') || method.includes('nasal')) {
    return { activeDays: [0, 1, 2, 3, 4, 5, 6], timing: timing || 'AM' } // Every day
  }

  // Daily injections (BPC-157, Ipamorelin, etc.) — 5 on 2 off
  if (typical.includes('daily') || typical.includes('1-2x daily') || typical.includes('1-3 times daily')
      || typical.includes('once daily') || typical.includes('mcg daily')) {
    return { activeDays: [0, 1, 2, 3, 4], timing: timing || 'AM' } // Mon-Fri, rest weekends
  }

  // Default: Mon-Fri
  return { activeDays: [0, 1, 2, 3, 4], timing: timing || 'AM' }
}

function buildCycleCalendar(topPeptides: ScoredPeptide[]): CycleWeek[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const top = topPeptides.slice(0, 3) // Show top 3 peptides

  const schedules = top.map((sp, idx) => {
    const { activeDays, timing } = parseDosingSchedule(sp.peptide)
    return {
      name: sp.peptide.name,
      color: PEPTIDE_COLORS[idx] || '#00d4aa',
      activeDays,
      timing,
    }
  })

  const weeks: CycleWeek[] = []
  for (let w = 1; w <= 4; w++) {
    const weekDays = days.map((day, dayIdx) => ({
      day,
      peptides: schedules
        .filter((s) => s.activeDays.includes(dayIdx))
        .map((s) => ({ name: `${s.name} (${s.timing})`, color: s.color })),
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

  // Derive experience/risk from new quiz format
  const experience = (answers as any).experience || (answers.situationFlags?.includes('used_peptides') ? 'intermediate' : 'beginner')
  const riskTolerance = (answers as any).riskTolerance || (answers.priorities?.includes('low_side_effects') ? 'conservative' : answers.priorities?.includes('strong_evidence') ? 'conservative' : 'moderate')

  const dosingProtocol = buildDosingProtocol(allMatches, experience)
  const riskAssessment = buildRiskAssessment(allMatches, riskTolerance)
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
