import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="mesh-bg min-h-screen flex items-center justify-center">
      <LoadingSpinner message="Preparing your quiz..." />
    </div>
  )
}
