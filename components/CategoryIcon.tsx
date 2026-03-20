'use client'

import {
  Heart, Dumbbell, Flame, Hourglass, Sparkles, Brain,
  Moon, HeartPulse, Shield, Zap, TrendingUp, FlaskConical,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  Heart, Dumbbell, Flame, Hourglass, Sparkles, Brain,
  Moon, HeartPulse, Shield, Zap, TrendingUp, FlaskConical,
}

export default function CategoryIcon({
  name,
  className = 'h-5 w-5',
  style,
}: {
  name: string
  className?: string
  style?: React.CSSProperties
}) {
  const Icon = iconMap[name] || FlaskConical
  return <Icon className={className} style={style} />
}
