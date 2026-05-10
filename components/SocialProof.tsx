'use client'

import { CheckCircle2, Shield, FlaskConical } from 'lucide-react'

const highlights = [
  {
    icon: <FlaskConical className="h-4 w-4 text-neon-teal" />,
    title: '110+ studies cited',
    desc: 'Every peptide profile backed by published research with PMID links',
  },
  {
    icon: <Shield className="h-4 w-4 text-neon-teal" />,
    title: 'Honest evidence ratings',
    desc: 'We flag weak evidence and failed trials — not just the hype',
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-neon-teal" />,
    title: 'Personalized protocol',
    desc: 'Dosing, stacks, and risk assessment tailored to your quiz answers',
  },
]

export default function SocialProof() {
  return (
    <div className="py-6 sm:py-8">
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="glass-card p-4 min-w-[260px] sm:min-w-0 snap-start shrink-0 sm:shrink"
          >
            <div className="mb-2">{h.icon}</div>
            <p className="text-sm font-semibold text-white mb-1">{h.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
