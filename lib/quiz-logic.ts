import { Peptide, peptides } from '@/data/peptides'

export interface QuizAnswers {
  primaryGoal: string
  secondaryGoals: string[]
  experience: 'beginner' | 'intermediate' | 'advanced'
  administration: 'injection' | 'nasal' | 'oral' | 'topical' | 'no_preference'
  riskTolerance: 'conservative' | 'moderate' | 'open'
}

export interface ScoredPeptide {
  peptide: Peptide
  score: number
  matchReasons: string[]
}

export function scorePeptides(answers: QuizAnswers): ScoredPeptide[] {
  return peptides
    .map((peptide) => {
      let score = 0
      const matchReasons: string[] = []

      // Primary goal match (highest weight)
      if (peptide.categories.includes(answers.primaryGoal)) {
        score += 40
        matchReasons.push('Matches your primary goal')
      }

      // Secondary goal matches
      answers.secondaryGoals.forEach((goal) => {
        if (peptide.categories.includes(goal)) {
          score += 15
          matchReasons.push('Matches secondary goal')
        }
      })

      // Administration preference
      if (answers.administration !== 'no_preference') {
        if (peptide.administrationMethods.includes(answers.administration)) {
          score += 10
          matchReasons.push('Available in preferred form')
        } else {
          score -= 15
        }
      }

      // Risk tolerance matching
      const riskScores: Record<string, Record<string, number>> = {
        conservative: { low: 15, low_moderate: 5, moderate: -10, high: -30 },
        moderate: { low: 10, low_moderate: 10, moderate: 5, high: -15 },
        open: { low: 5, low_moderate: 8, moderate: 10, high: 5 },
      }
      const riskAdj = riskScores[answers.riskTolerance]?.[peptide.riskLevel] ?? 0
      score += riskAdj
      if (riskAdj > 0) matchReasons.push('Fits your risk comfort level')

      // Evidence bonus
      const evidenceBonus: Record<string, number> = {
        very_high: 12, high: 10, moderate_high: 8, moderate: 5, low_moderate: 2, low: 0,
      }
      score += evidenceBonus[peptide.evidenceLevel] ?? 0

      // Experience-based adjustments
      if (answers.experience === 'beginner') {
        if (peptide.riskLevel === 'low') score += 8
        if (peptide.fdaApproved) score += 10
        if (peptide.administrationMethods.includes('oral') || peptide.administrationMethods.includes('topical') || peptide.administrationMethods.includes('nasal')) {
          score += 5
          matchReasons.push('Beginner-friendly administration')
        }
      } else if (answers.experience === 'advanced') {
        // Advanced users may prefer more potent options
        if (peptide.trendingRank <= 5) score += 5
      }

      // FDA approved bonus for everyone
      if (peptide.fdaApproved) {
        score += 8
        matchReasons.push('FDA-approved')
      }

      // Trending bonus
      if (peptide.trendingRank <= 3) score += 5

      // Deduplicate reasons
      const uniqueReasons = Array.from(new Set(matchReasons))

      return { peptide, score, matchReasons: uniqueReasons }
    })
    .filter((sp) => sp.score > 0)
    .sort((a, b) => b.score - a.score)
}
