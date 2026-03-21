'use client'

import { Star, BarChart3 } from 'lucide-react'

const testimonials = [
  {
    quote: 'Finally understood which peptides matched my goals. The dosing protocol alone was worth it.',
    name: 'Mike R.',
  },
  {
    quote: 'Showed the doctor guide to my physician and it led to a great conversation about BPC-157.',
    name: 'Sarah K.',
  },
  {
    quote: 'Saved me hours of research. The stack recommendation was exactly what I needed.',
    name: 'James T.',
  },
]

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function SocialProof() {
  return (
    <div className="py-6 sm:py-8">
      {/* Counter */}
      <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
        <BarChart3 className="h-3.5 w-3.5 text-slate-500" />
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          <span className="text-slate-400">2,847</span> reports generated
        </p>
      </div>

      {/* Testimonials */}
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass-card p-4 min-w-[260px] sm:min-w-0 snap-start shrink-0 sm:shrink"
          >
            <Stars />
            <p className="text-xs text-slate-400 leading-relaxed mt-2.5 mb-3">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-[11px] text-slate-600 font-medium">&mdash; {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
