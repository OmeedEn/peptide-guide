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
  {
    id: 'deep-sleep',
    name: 'Deep Sleep & Recovery',
    peptideIds: ['dsip', 'selank', 'mk-677'],
    purpose: 'Optimized sleep architecture and overnight recovery',
    description: 'DSIP normalizes sleep stages and enhances delta wave activity, Selank reduces anxiety-driven insomnia via GABA modulation, and MK-677 boosts nocturnal GH pulses for tissue repair during sleep.',
    icon: 'Moon',
  },
  {
    id: 'immune-shield',
    name: 'Immune Defense Protocol',
    peptideIds: ['thymosin-alpha-1', 'kpv', 'll-37'],
    purpose: 'Comprehensive innate and adaptive immune support',
    description: 'Thymosin Alpha-1 enhances T-cell maturation and adaptive immunity, KPV modulates NF-kB to reduce chronic inflammation, and LL-37 provides broad-spectrum antimicrobial defense — three layers of immune optimization.',
    icon: 'Shield',
  },
  {
    id: 'skin-rejuvenation',
    name: 'Skin Rejuvenation Stack',
    peptideIds: ['ghk-cu', 'matrixyl', 'argireline'],
    purpose: 'Multi-target skin repair and wrinkle reduction',
    description: 'GHK-Cu stimulates collagen synthesis and wound repair at the cellular level, Matrixyl promotes collagen I/III/IV production, and Argireline relaxes expression lines by modulating SNAP-25 — addressing skin aging from structure, production, and muscle tension.',
    icon: 'Sparkles',
  },
  {
    id: 'fertility-support',
    name: 'Fertility & Hormone Support',
    peptideIds: ['gonadorelin', 'kisspeptin'],
    purpose: 'HPG axis stimulation and reproductive hormone optimization',
    description: 'Gonadorelin directly stimulates pituitary LH and FSH release to maintain gonadal function, while Kisspeptin acts upstream on hypothalamic GnRH neurons — a dual-level approach to restoring natural reproductive hormone signaling.',
    icon: 'HeartPulse',
  },
]
