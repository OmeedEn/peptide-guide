'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md'
}

export default function StarRating({ rating, size = 'sm' }: StarRatingProps) {
  const sizeClass = size === 'md' ? 'h-4 w-4' : 'h-3 w-3'
  const textClass = size === 'md' ? 'text-sm' : 'text-xs'

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating)
          const partial = !filled && star === Math.ceil(rating) && rating % 1 >= 0.3
          return (
            <Star
              key={star}
              className={`${sizeClass} ${
                filled
                  ? 'text-amber-400 fill-amber-400'
                  : partial
                  ? 'text-amber-400 fill-amber-400/50'
                  : 'text-slate-600'
              }`}
            />
          )
        })}
      </div>
      <span className={`${textClass} font-medium text-slate-300`}>{rating.toFixed(1)}</span>
    </div>
  )
}
