export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export const categories: Category[] = [
  { id: 'healing_recovery', name: 'Healing & Recovery', description: 'Tissue repair, injury recovery, and inflammation reduction', icon: 'Heart', color: '#f43f5e' },
  { id: 'muscle_growth', name: 'Muscle Growth', description: 'Muscle building, strength, and athletic performance', icon: 'Dumbbell', color: '#8b5cf6' },
  { id: 'fat_loss', name: 'Metabolic Health', description: 'Metabolic optimization and body composition research', icon: 'Flame', color: '#f97316' },
  { id: 'anti_aging', name: 'Anti-Aging', description: 'Cellular renewal, telomere support, and longevity', icon: 'Hourglass', color: '#06b6d4' },
  { id: 'skin_hair', name: 'Skin & Hair', description: 'Collagen production, skin repair, and hair growth', icon: 'Sparkles', color: '#ec4899' },
  { id: 'cognitive', name: 'Cognitive', description: 'Focus, memory, neuroprotection, and mental clarity', icon: 'Brain', color: '#6366f1' },
  { id: 'sleep_wellness', name: 'Sleep & Wellness', description: 'Sleep quality, stress reduction, and overall wellbeing', icon: 'Moon', color: '#8b5cf6' },
  { id: 'sexual_health', name: 'Hormonal & Sexual Health', description: 'Hormone optimization and reproductive wellness research', icon: 'HeartPulse', color: '#f43f5e' },
  { id: 'immune', name: 'Immune Support', description: 'Immune modulation and defense enhancement', icon: 'Shield', color: '#10b981' },
  { id: 'mitochondrial', name: 'Mitochondrial Energy', description: 'Cellular energy production and mitochondrial optimization', icon: 'Zap', color: '#eab308' },
]

export const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))
