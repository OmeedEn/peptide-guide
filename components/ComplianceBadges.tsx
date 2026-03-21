'use client'

import {
  Shield, ShieldCheck, Building2, FileCheck, Microscope,
  Pill, AlertTriangle, BadgeCheck, Scale,
} from 'lucide-react'
import type { PharmacyCompliance, SupplierType } from '@/data/suppliers'

const typeLabels: Record<SupplierType, { label: string; color: string; icon: React.ReactNode }> = {
  compounding_pharmacy: {
    label: 'Licensed Compounding Pharmacy',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: <Pill className="h-3 w-3" />,
  },
  licensed_pharmacy: {
    label: 'Licensed Pharmacy',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: <Pill className="h-3 w-3" />,
  },
  research_supplier: {
    label: 'Research Supplier',
    color: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    icon: <Microscope className="h-3 w-3" />,
  },
  clinic: {
    label: 'Licensed Clinic',
    color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    icon: <Building2 className="h-3 w-3" />,
  },
}

export default function ComplianceBadges({
  compliance,
  size = 'sm',
}: {
  compliance: PharmacyCompliance
  size?: 'sm' | 'md'
}) {
  const typeInfo = typeLabels[compliance.type]
  const textSize = size === 'md' ? 'text-xs' : 'text-[10px]'
  const px = size === 'md' ? 'px-2.5 py-1' : 'px-2 py-0.5'

  const badges: { label: string; color: string; icon: React.ReactNode }[] = []

  // Type badge always shows
  badges.push({
    label: typeInfo.label,
    color: typeInfo.color,
    icon: typeInfo.icon,
  })

  if (compliance.fdaRegistered) {
    badges.push({
      label: 'FDA Registered',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <ShieldCheck className="h-3 w-3" />,
    })
  }

  if (compliance.nabpAccredited) {
    badges.push({
      label: 'NABP Accredited',
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      icon: <BadgeCheck className="h-3 w-3" />,
    })
  }

  if (compliance.deaRegistration) {
    badges.push({
      label: 'DEA Registered',
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      icon: <Shield className="h-3 w-3" />,
    })
  }

  if (compliance.usp797Compliant) {
    badges.push({
      label: 'USP 797',
      color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      icon: <FileCheck className="h-3 w-3" />,
    })
  }

  if (compliance.usp800Compliant) {
    badges.push({
      label: 'USP 800',
      color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      icon: <FileCheck className="h-3 w-3" />,
    })
  }

  if (compliance.compoundingLicense) {
    badges.push({
      label: `${compliance.compoundingLicense} Licensed`,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: <Scale className="h-3 w-3" />,
    })
  }

  if (compliance.legitScriptVerified) {
    badges.push({
      label: 'LegitScript Verified',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <BadgeCheck className="h-3 w-3" />,
    })
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`inline-flex items-center gap-1 ${px} rounded-md ${textSize} font-medium border ${badge.color}`}
        >
          {badge.icon}
          {badge.label}
        </span>
      ))}
    </div>
  )
}

export function MarketplaceDisclaimer({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 ${className}`}>
      <div className="flex items-start gap-2.5 sm:gap-3">
        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-semibold text-amber-400 mb-1">Marketplace Disclaimer</p>
          <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
            PeptideGuide is a marketplace platform. We verify supplier credentials but do not manufacture, compound, or
            dispense any products. Suppliers marked as &quot;Licensed Pharmacy&quot; or &quot;Compounding Pharmacy&quot; hold valid state
            pharmacy licenses. Research suppliers sell products labeled &quot;for research use only.&quot; Always verify that your
            purchase complies with your local laws and consult a healthcare provider before use. Products requiring a
            prescription cannot be dispensed without a valid prescription from a licensed provider.
          </p>
        </div>
      </div>
    </div>
  )
}

export function ComplianceSummary({ compliance }: { compliance: PharmacyCompliance }) {
  const isPharmacy = compliance.type === 'compounding_pharmacy' || compliance.type === 'licensed_pharmacy'

  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
      <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Regulatory Compliance</h4>
      <div className="space-y-2">
        {isPharmacy && compliance.statePharmacyLicense && (
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-slate-300">State Pharmacy License</p>
              <p className="text-[10px] text-slate-500">{compliance.statePharmacyLicense}</p>
            </div>
          </div>
        )}
        {compliance.fdaRegistered && (
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <p className="text-xs text-slate-300">FDA Registered Facility</p>
          </div>
        )}
        {compliance.deaRegistration && (
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <p className="text-xs text-slate-300">DEA Registered</p>
          </div>
        )}
        {compliance.nabpAccredited && (
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <p className="text-xs text-slate-300">NABP Accredited</p>
          </div>
        )}
        {compliance.usp797Compliant && (
          <div className="flex items-center gap-2">
            <FileCheck className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <p className="text-xs text-slate-300">USP 797 Compliant (Sterile Compounding)</p>
          </div>
        )}
        {compliance.usp800Compliant && (
          <div className="flex items-center gap-2">
            <FileCheck className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <p className="text-xs text-slate-300">USP 800 Compliant (Hazardous Drug Handling)</p>
          </div>
        )}
        {compliance.legitScriptVerified && (
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <p className="text-xs text-slate-300">LegitScript Verified</p>
          </div>
        )}
        {!isPharmacy && (
          <div className="flex items-start gap-2 mt-2 pt-2 border-t border-white/5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-400/80 leading-relaxed">
              This is a research supplier, not a licensed pharmacy. Products are sold for research purposes only and are not intended for human consumption.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
