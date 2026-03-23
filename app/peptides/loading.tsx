import { LoadingGrid } from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="animate-pulse mb-8">
          <div className="h-8 w-48 bg-white/5 rounded mb-2" />
          <div className="h-4 w-72 bg-white/[0.03] rounded" />
        </div>
        <LoadingGrid count={6} message="Loading peptides..." />
      </div>
    </div>
  )
}
