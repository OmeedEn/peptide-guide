import { FlaskConical, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Medical Disclaimer */}
        <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-amber-400 mb-1">Medical Disclaimer</p>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                This information is for educational purposes only and is not medical advice. Peptides carry real risks and many are not FDA-approved for the uses described. Always consult a qualified healthcare provider before using any peptide.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-neon-teal" />
              <span className="font-display text-base sm:text-lg font-bold text-white">
                Peptide<span className="text-neon-teal">Guide</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Data sourced from published research, FDA databases, and clinical trials.
            </p>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 sm:mb-3">Explore</p>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2">
              {[
                { href: '/find', label: 'Find Your Peptide' },
                { href: '/peptides', label: 'Peptide Database' },
                { href: '/stacks', label: 'Popular Stacks' },
                { href: '/compare', label: 'Compare Peptides' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-xs sm:text-sm text-slate-500 hover:text-neon-teal transition-colors py-1">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 sm:mb-3">Resources</p>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
              Compiled from peer-reviewed studies, FDA filings, WHO guidelines, and clinical resources. Evidence levels reflect quality and quantity of human research.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-slate-600">&copy; {new Date().getFullYear()} PeptideGuide. For educational purposes only.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-[10px] sm:text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-[10px] sm:text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
