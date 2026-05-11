import { Peptide, peptides } from '@/data/peptides'
import { stacks } from '@/data/stacks'

// ===== TYPES =====

export interface QuizAnswers {
  // Step 1: Primary goal
  primaryGoal: string
  // Step 2: About you
  ageRange: '18-25' | '26-35' | '36-45' | '46-55' | '56+' | ''
  gender: 'male' | 'female' | 'other' | ''
  // Step 3: Adaptive deep-dive (changes per goal)
  specificFocus: string
  // Step 4: Your situation (multi-select)
  situationFlags: string[]
  // Step 5: What matters most (pick top 2)
  priorities: string[]
}

export const defaultAnswers: QuizAnswers = {
  primaryGoal: '',
  ageRange: '',
  gender: '',
  specificFocus: '',
  situationFlags: [],
  priorities: [],
}

// Adaptive sub-questions per primary goal
export const goalDeepDive: Record<string, { question: string; options: { id: string; label: string; desc: string }[] }> = {
  healing_recovery: {
    question: 'What are you trying to heal?',
    options: [
      { id: 'tendon_ligament', label: 'Tendon / Ligament', desc: 'ACL, rotator cuff, tennis elbow, etc.' },
      { id: 'muscle_tissue', label: 'Muscle Injury', desc: 'Tears, strains, post-surgery recovery' },
      { id: 'joint', label: 'Joint / Cartilage', desc: 'Knee, hip, shoulder joint pain' },
      { id: 'gut', label: 'Gut / Digestive', desc: 'Leaky gut, IBS, ulcers, inflammation' },
      { id: 'nerve', label: 'Nerve Damage', desc: 'Neuropathy, nerve regeneration' },
      { id: 'general_recovery', label: 'General Recovery', desc: 'Post-workout, overall faster healing' },
    ],
  },
  muscle_growth: {
    question: 'What\'s your muscle-building focus?',
    options: [
      { id: 'lean_muscle', label: 'Lean Muscle', desc: 'Build muscle without excess bulk' },
      { id: 'mass', label: 'Maximum Size', desc: 'Prioritize muscle mass and volume' },
      { id: 'recovery', label: 'Recovery', desc: 'Faster recovery between workouts' },
      { id: 'strength', label: 'Strength', desc: 'Increase raw strength and power' },
      { id: 'body_recomp', label: 'Body Recomposition', desc: 'Gain muscle and lose fat simultaneously' },
    ],
  },
  fat_loss: {
    question: 'What\'s your metabolic health focus?',
    options: [
      { id: 'moderate_loss', label: 'Body Composition', desc: 'Optimizing body composition' },
      { id: 'significant_loss', label: 'Weight Management', desc: 'Researching clinical weight management options' },
      { id: 'major_loss', label: 'Clinical Options', desc: 'Exploring FDA-approved metabolic therapies' },
      { id: 'stubborn_fat', label: 'Targeted Support', desc: 'Focused body composition research' },
      { id: 'metabolic', label: 'Metabolic Optimization', desc: 'Blood sugar, insulin sensitivity' },
    ],
  },
  anti_aging: {
    question: 'What\'s your anti-aging priority?',
    options: [
      { id: 'skin_appearance', label: 'Skin & Appearance', desc: 'Wrinkles, collagen, skin elasticity' },
      { id: 'energy_vitality', label: 'Energy & Vitality', desc: 'Feel younger, more energetic' },
      { id: 'longevity', label: 'Cellular Longevity', desc: 'Telomeres, mitochondria, DNA repair' },
      { id: 'hormonal', label: 'Hormonal Decline', desc: 'GH, testosterone, or hormone optimization' },
      { id: 'brain_aging', label: 'Brain Health', desc: 'Cognitive decline prevention, neuroprotection' },
    ],
  },
  skin_hair: {
    question: 'What\'s your primary concern?',
    options: [
      { id: 'wrinkles', label: 'Anti-Wrinkle', desc: 'Fine lines, skin texture, collagen' },
      { id: 'hair_growth', label: 'Hair Growth', desc: 'Thinning hair, hair loss prevention' },
      { id: 'wound_healing', label: 'Wound / Scar Healing', desc: 'Scars, wound repair, skin damage' },
      { id: 'complexion', label: 'Overall Complexion', desc: 'Glow, firmness, skin tone' },
    ],
  },
  cognitive: {
    question: 'What cognitive area do you want to improve?',
    options: [
      { id: 'focus', label: 'Focus & Concentration', desc: 'Staying on task, deep work sessions' },
      { id: 'memory', label: 'Memory & Learning', desc: 'Retention, recall, learning speed' },
      { id: 'anxiety', label: 'Anxiety & Calm', desc: 'Reduce anxiety without sedation' },
      { id: 'neuroprotection', label: 'Brain Protection', desc: 'Long-term neuroprotection, TBI recovery' },
    ],
  },
  sleep_wellness: {
    question: 'What\'s your sleep challenge?',
    options: [
      { id: 'falling_asleep', label: 'Falling Asleep', desc: 'Takes too long to fall asleep' },
      { id: 'staying_asleep', label: 'Staying Asleep', desc: 'Wake up during the night' },
      { id: 'deep_sleep', label: 'Deep Sleep Quality', desc: 'Not feeling rested, light sleeper' },
      { id: 'recovery_sleep', label: 'Recovery Sleep', desc: 'Sleep for athletic recovery' },
    ],
  },
  sexual_health: {
    question: 'What\'s your primary concern?',
    options: [
      { id: 'libido', label: 'Libido / Desire', desc: 'Increase sexual desire and arousal' },
      { id: 'fertility', label: 'Fertility', desc: 'Sperm quality, egg health, TRT fertility' },
      { id: 'performance', label: 'Performance', desc: 'Erectile function, stamina' },
      { id: 'hormonal_balance', label: 'Hormonal Balance', desc: 'Testosterone, estrogen, LH/FSH' },
    ],
  },
  immune: {
    question: 'What\'s your immune goal?',
    options: [
      { id: 'general_immunity', label: 'General Immunity', desc: 'Get sick less often' },
      { id: 'recovery_illness', label: 'Recovery from Illness', desc: 'Bounce back faster' },
      { id: 'inflammation', label: 'Reduce Inflammation', desc: 'Chronic inflammation, autoimmune' },
      { id: 'immune_modulation', label: 'Immune Modulation', desc: 'Balance overactive/underactive immunity' },
    ],
  },
  mitochondrial: {
    question: 'What draws you to mitochondrial peptides?',
    options: [
      { id: 'exercise_performance', label: 'Exercise Performance', desc: 'Endurance, stamina, VO2 max' },
      { id: 'energy_levels', label: 'Daily Energy', desc: 'Chronic fatigue, brain fog' },
      { id: 'cellular_aging', label: 'Cellular Anti-Aging', desc: 'Mitochondrial repair and renewal' },
      { id: 'metabolic_health', label: 'Metabolic Optimization', desc: 'Insulin sensitivity, fat oxidation' },
    ],
  },
}

export const situationOptions = [
  { id: 'on_trt', label: 'On TRT / hormone therapy', icon: 'Syringe' },
  { id: 'used_peptides', label: 'Have used peptides before', icon: 'FlaskConical' },
  { id: 'on_medication', label: 'Taking prescription meds', icon: 'Pill' },
  { id: 'drug_tested', label: 'Subject to drug testing', icon: 'ShieldAlert' },
  { id: 'needle_phobic', label: 'Prefer to avoid needles', icon: 'CircleSlash' },
  { id: 'budget_conscious', label: 'Budget: under $50/month', icon: 'DollarSign' },
]

export const priorityOptions = [
  { id: 'strong_evidence', label: 'Strong research evidence', desc: 'Proven in clinical trials' },
  { id: 'low_side_effects', label: 'Minimal side effects', desc: 'Well-tolerated, low risk' },
  { id: 'easy_to_use', label: 'Easy to administer', desc: 'No complex protocols' },
  { id: 'fast_results', label: 'Fastest results', desc: 'Noticeable effects quickly' },
  { id: 'affordable', label: 'Most affordable', desc: 'Best value for the price' },
  { id: 'fda_preferred', label: 'FDA-approved preferred', desc: 'Regulatory confidence' },
]

// ===== SCORING =====

export interface ScoredPeptide {
  peptide: Peptide
  score: number
  matchReasons: string[]
}

// Maps specific focus → which peptide IDs get bonus points
const focusBonuses: Record<string, Record<string, string[]>> = {
  healing_recovery: {
    tendon_ligament: ['bpc-157', 'tb-500', 'ghk-cu'],
    muscle_tissue: ['bpc-157', 'tb-500', 'ghk-cu', 'mgf'],
    joint: ['bpc-157', 'tb-500', 'teriparatide'],
    gut: ['bpc-157', 'kpv', 'linaclotide'],
    nerve: ['bpc-157', 'semax', 'cerebrolysin'],
    general_recovery: ['bpc-157', 'tb-500', 'ipamorelin'],
  },
  muscle_growth: {
    lean_muscle: ['cjc-1295', 'ipamorelin', 'tesamorelin'],
    mass: ['cjc-1295', 'ipamorelin', 'follistatin', 'igf-1-lr3', 'mk-677'],
    recovery: ['bpc-157', 'tb-500', 'ipamorelin', 'mgf'],
    strength: ['follistatin', 'cjc-1295', 'ipamorelin', 'mk-677'],
    body_recomp: ['cjc-1295', 'ipamorelin', 'aod-9604', 'tesamorelin'],
  },
  fat_loss: {
    moderate_loss: ['semaglutide', 'tirzepatide', 'aod-9604', 'tesamorelin'],
    significant_loss: ['semaglutide', 'tirzepatide', 'retatrutide'],
    major_loss: ['semaglutide', 'tirzepatide', 'retatrutide', 'setmelanotide'],
    stubborn_fat: ['aod-9604', 'mots-c', 'tesamorelin', 'cjc-1295'],
    metabolic: ['mots-c', 'semaglutide', 'tirzepatide', 'survodutide'],
  },
  anti_aging: {
    skin_appearance: ['ghk-cu', 'epithalon', 'matrixyl', 'copper-tripeptide-1'],
    energy_vitality: ['ss-31', 'mots-c', 'cjc-1295', 'humanin'],
    longevity: ['epithalon', 'ss-31', 'mots-c', 'foxo4-dri', 'humanin'],
    hormonal: ['cjc-1295', 'ipamorelin', 'kisspeptin', 'sermorelin'],
    brain_aging: ['semax', 'selank', 'ss-31', 'cerebrolysin', 'noopept'],
  },
  skin_hair: {
    wrinkles: ['ghk-cu', 'matrixyl', 'argireline', 'snap-8'],
    hair_growth: ['ghk-cu', 'copper-tripeptide-1', 'acetyl-tetrapeptide-3'],
    wound_healing: ['bpc-157', 'ghk-cu', 'tb-500', 'copper-tripeptide-1'],
    complexion: ['ghk-cu', 'matrixyl', 'palmitoyl-tripeptide-1', 'tetrapeptide-30'],
  },
  cognitive: {
    focus: ['semax', 'selank', 'noopept', 'na-semax-amidate'],
    memory: ['semax', 'selank', 'noopept', 'cerebrolysin'],
    anxiety: ['selank', 'na-selank-amidate', 'pe-22-28'],
    neuroprotection: ['semax', 'selank', 'ss-31', 'cerebrolysin', 'noopept'],
  },
  sleep_wellness: {
    falling_asleep: ['dsip', 'selank', 'mk-677', 'pinealon'],
    staying_asleep: ['dsip', 'mk-677', 'ipamorelin'],
    deep_sleep: ['mk-677', 'ipamorelin', 'cjc-1295', 'dsip'],
    recovery_sleep: ['mk-677', 'ipamorelin', 'cjc-1295'],
  },
  sexual_health: {
    libido: ['pt-141', 'kisspeptin', 'melanotan-ii'],
    fertility: ['kisspeptin', 'gonadorelin'],
    performance: ['pt-141'],
    hormonal_balance: ['kisspeptin', 'gonadorelin', 'cjc-1295', 'ipamorelin'],
  },
  immune: {
    general_immunity: ['thymosin-alpha-1', 'selank', 'thymulin'],
    recovery_illness: ['thymosin-alpha-1', 'selank', 'bpc-157', 'll-37'],
    inflammation: ['bpc-157', 'kpv', 'selank', 'ghk-cu'],
    immune_modulation: ['thymosin-alpha-1', 'selank', 'thymulin', 'thymopentin'],
  },
  mitochondrial: {
    exercise_performance: ['mots-c', 'ss-31', 'carnosine'],
    energy_levels: ['ss-31', 'mots-c', 'humanin'],
    cellular_aging: ['ss-31', 'epithalon', 'mots-c', 'humanin'],
    metabolic_health: ['mots-c', 'ss-31'],
  },
}

export function scorePeptides(answers: QuizAnswers): ScoredPeptide[] {
  const {
    primaryGoal, ageRange, gender, specificFocus,
    situationFlags, priorities,
  } = answers

  return peptides
    .map((peptide) => {
      let score = 0
      const matchReasons: string[] = []

      // === PRIMARY GOAL (40 pts) ===
      if (peptide.categories.includes(primaryGoal)) {
        score += 40
        matchReasons.push('Matches your primary goal')
      }

      // === SPECIFIC FOCUS BONUS (25 pts) ===
      const bonusPeptides = focusBonuses[primaryGoal]?.[specificFocus] || []
      if (bonusPeptides.includes(peptide.id)) {
        score += 25
        const deepDive = goalDeepDive[primaryGoal]
        const focusLabel = deepDive?.options.find(o => o.id === specificFocus)?.label
        if (focusLabel) matchReasons.push(`Best for ${focusLabel.toLowerCase()}`)
      }

      // === AGE-BASED ADJUSTMENTS ===
      if (ageRange === '46-55' || ageRange === '56+') {
        // Older users benefit more from anti-aging, mitochondrial, GH peptides
        if (peptide.categories.includes('anti_aging')) score += 8
        if (peptide.categories.includes('mitochondrial')) score += 6
        if (['cjc-1295', 'ipamorelin', 'epithalon', 'ss-31'].includes(peptide.id)) {
          score += 5
          matchReasons.push('Recommended for your age group')
        }
      }
      if (ageRange === '18-25' || ageRange === '26-35') {
        // Younger users: recovery, performance focus
        if (peptide.categories.includes('healing_recovery')) score += 3
        if (peptide.categories.includes('muscle_growth')) score += 3
      }

      // === GENDER-BASED ADJUSTMENTS ===
      if (gender === 'male') {
        if (peptide.id === 'kisspeptin') { score += 8; matchReasons.push('Supports male hormone health') }
        if (peptide.id === 'pt-141') score += 3
      }
      if (gender === 'female') {
        if (peptide.id === 'pt-141') { score += 5; matchReasons.push('FDA-approved for women (HSDD)') }
        if (peptide.id === 'kisspeptin') { score += 5; matchReasons.push('Studied for female fertility (IVF)') }
        if (peptide.id === 'ghk-cu') score += 3
      }

      // === SITUATION FLAGS ===
      if (situationFlags.includes('on_trt') && peptide.id === 'kisspeptin') {
        score += 15
        matchReasons.push('Supports fertility during TRT')
      }

      if (situationFlags.includes('drug_tested') && peptide.legalStatus.wadaBanned) {
        score -= 40 // Heavy penalty — can't use WADA-banned substances
        matchReasons.push('WADA banned — not suitable for tested athletes')
      }

      if (situationFlags.includes('needle_phobic')) {
        if (peptide.administrationMethods.includes('nasal') || peptide.administrationMethods.includes('oral') || peptide.administrationMethods.includes('topical')) {
          score += 12
          matchReasons.push('No injection needed')
        } else {
          score -= 15
        }
      }

      if (situationFlags.includes('budget_conscious')) {
        // FDA-approved drugs are expensive, research peptides cheaper
        if (peptide.fdaApproved && (peptide.id === 'semaglutide' || peptide.id === 'tirzepatide')) {
          score -= 10
        } else if (!peptide.fdaApproved) {
          score += 3
        }
      }

      if (situationFlags.includes('used_peptides')) {
        // Experienced users can handle more complex protocols
        if (peptide.riskLevel === 'low_moderate' || peptide.riskLevel === 'moderate') score += 5
      }

      if (situationFlags.includes('on_medication')) {
        // Prefer well-studied peptides with known interaction profiles
        if (peptide.fdaApproved) score += 8
        if (peptide.evidenceLevel === 'very_high' || peptide.evidenceLevel === 'high') score += 5
        matchReasons.push(peptide.fdaApproved ? 'Well-studied drug interactions' : '')
      }

      // === PRIORITIES ===
      if (priorities.includes('strong_evidence')) {
        const evidenceBonus: Record<string, number> = {
          very_high: 18, high: 14, moderate_high: 10, moderate: 5, low_moderate: 0, low: -8,
        }
        score += evidenceBonus[peptide.evidenceLevel] ?? 0
        if ((evidenceBonus[peptide.evidenceLevel] ?? 0) >= 10) matchReasons.push('Strong research backing')
      }

      if (priorities.includes('low_side_effects')) {
        const riskBonus: Record<string, number> = { low: 15, low_moderate: 8, moderate: 0, high: -20 }
        score += riskBonus[peptide.riskLevel] ?? 0
        if (peptide.riskLevel === 'low') matchReasons.push('Very low side effect profile')
      }

      if (priorities.includes('easy_to_use')) {
        if (peptide.administrationMethods.includes('oral') || peptide.administrationMethods.includes('topical')) {
          score += 12
          matchReasons.push('Easy administration')
        } else if (peptide.administrationMethods.includes('nasal')) {
          score += 8
          matchReasons.push('Simple nasal spray')
        }
      }

      if (priorities.includes('fast_results')) {
        // Peptides known for quick onset
        if (['semaglutide', 'tirzepatide', 'pt-141', 'bpc-157', 'selank'].includes(peptide.id)) {
          score += 10
          matchReasons.push('Noticeable results quickly')
        }
      }

      if (priorities.includes('affordable')) {
        if (!peptide.fdaApproved) score += 5
        if (peptide.id === 'semaglutide' || peptide.id === 'tirzepatide') score -= 8
      }

      if (priorities.includes('fda_preferred')) {
        if (peptide.fdaApproved) {
          score += 20
          matchReasons.push('FDA-approved')
        } else {
          score -= 10
        }
      }

      // === BASE BONUSES ===
      if (peptide.fdaApproved) score += 5
      if (peptide.trendingRank <= 3) score += 3

      // Clean up empty reasons and deduplicate
      const uniqueReasons = Array.from(new Set(matchReasons.filter(Boolean)))

      return { peptide, score, matchReasons: uniqueReasons }
    })
    .filter((sp) => sp.score > 0)
    .sort((a, b) => b.score - a.score)
}

// Generate recommended stacks based on results
export function getRecommendedStacks(topPeptideIds: string[]) {
  return stacks.filter(stack =>
    stack.peptideIds.some(id => topPeptideIds.includes(id))
  )
}
