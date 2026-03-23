import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-4 w-32 bg-white/5 rounded mb-6 animate-pulse" />
        <div className="glass-card p-6 sm:p-8 mb-6 animate-pulse">
          <div className="h-8 w-40 bg-white/5 rounded mb-3" />
          <div className="h-4 w-64 bg-white/[0.03] rounded mb-5" />
          <div className="flex gap-2 mb-5">
            <div className="h-6 w-20 bg-white/5 rounded-lg" />
            <div className="h-6 w-24 bg-white/5 rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-white/[0.03] rounded" />
            <div className="h-3 w-5/6 bg-white/[0.03] rounded" />
            <div className="h-3 w-4/6 bg-white/[0.03] rounded" />
          </div>
        </div>
        <LoadingSpinner message="Loading peptide details..." />
      </div>
    </div>
  )
}
