export interface Stack {
  id: string
  name: string
  peptideIds: string[]
  purpose: string
  description: string
  icon: string
}

export const stacks: Stack[] = [
  {
    id: 'wolverine',
    name: 'Wolverine Stack',
    peptideIds: ['bpc-157', 'tb-500'],
    purpose: 'Maximum healing and injury recovery',
    description: 'The most popular peptide stack. BPC-157 and TB-500 use complementary mechanisms for synergistic tissue repair — BPC-157 targets local healing while TB-500 works systemically.',
    icon: 'Zap',
  },
  {
    id: 'gh-optimization',
    name: 'GH Optimization',
    peptideIds: ['cjc-1295', 'ipamorelin'],
    purpose: 'Growth hormone release, muscle growth, fat loss',
    description: 'The gold standard GH stack. CJC-1295 (GHRH analog) + Ipamorelin (ghrelin mimetic) produce a 3-5x increase in GH release compared to either alone, with minimal side effects.',
    icon: 'TrendingUp',
  },
  {
    id: 'anti-aging',
    name: 'Anti-Aging Protocol',
    peptideIds: ['epithalon', 'ghk-cu', 'ss-31'],
    purpose: 'Multi-pathway approach to cellular aging',
    description: 'Epithalon extends telomeres, GHK-Cu boosts collagen and reduces inflammation, and SS-31 repairs mitochondria. Three complementary angles on age reversal.',
    icon: 'Hourglass',
  },
  {
    id: 'cognitive',
    name: 'Cognitive Stack',
    peptideIds: ['semax', 'selank'],
    purpose: 'Enhanced cognition without anxiety',
    description: 'Semax sharpens focus and upregulates BDNF while Selank calms anxiety via GABA modulation — complementary mechanisms for "calm focus" without sedation.',
    icon: 'Brain',
  },
  {
    id: 'body-recomp',
    name: 'Body Recomp',
    peptideIds: ['cjc-1295', 'ipamorelin', 'aod-9604'],
    purpose: 'Simultaneous muscle gain and fat loss',
    description: 'GH stimulation from CJC-1295/Ipamorelin drives muscle growth while AOD-9604 adds targeted fat metabolism without affecting blood sugar.',
    icon: 'Flame',
  },
  {
    id: 'metabolic',
    name: 'Metabolic Optimization',
    peptideIds: ['mots-c', 'ss-31'],
    purpose: 'Mitochondrial health and exercise performance',
    description: 'MOTS-c acts as an exercise mimetic via AMPK activation while SS-31 directly repairs mitochondrial membranes — complementary pathways for cellular energy.',
    icon: 'Zap',
  },
]
