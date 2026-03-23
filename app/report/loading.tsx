import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="molecular-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <LoadingSpinner message="Generating your report..." />
      </div>
    </div>
  )
}
