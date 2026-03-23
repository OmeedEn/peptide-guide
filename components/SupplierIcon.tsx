'use client'

import {
  Microscope, Pill, FlaskConical, Mountain, Zap, Brain,
  Building2, Beaker, ShieldCheck,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Microscope, Pill, FlaskConical, Mountain, Zap, Brain,
  Building2, Beaker, ShieldCheck,
}

export default function SupplierIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] || FlaskConical
  return <Icon className={className} />
}
