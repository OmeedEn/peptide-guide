'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CompareContextType {
  compareIds: string[]
  addToCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
}

const CompareContext = createContext<CompareContextType>({
  compareIds: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false,
})

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([])

  const addToCompare = (id: string) => {
    setCompareIds((prev) => (prev.length < 3 && !prev.includes(id) ? [...prev, id] : prev))
  }

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((i) => i !== id))
  }

  const clearCompare = () => setCompareIds([])
  const isInCompare = (id: string) => compareIds.includes(id)

  return (
    <CompareContext.Provider value={{ compareIds, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
