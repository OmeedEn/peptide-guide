// Meta Pixel + Google Analytics event helpers
// Safe to call even if pixel/GA not loaded — checks window.fbq / window.gtag

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function trackQuizStart() {
  window.fbq?.('track', 'Lead', { content_name: 'Quiz Started' })
  window.gtag?.('event', 'quiz_start')
}

export function trackQuizComplete(matchCount: number) {
  window.fbq?.('track', 'CompleteRegistration', {
    content_name: 'Quiz Completed',
    value: matchCount,
  })
  window.gtag?.('event', 'quiz_complete', { match_count: matchCount })
}

export function trackInitiateCheckout() {
  window.fbq?.('track', 'InitiateCheckout', {
    content_name: 'Peptide Report',
    value: 6.99,
    currency: 'USD',
  })
  window.gtag?.('event', 'begin_checkout', { value: 6.99, currency: 'USD' })
}

export function trackPurchase() {
  window.fbq?.('track', 'Purchase', {
    content_name: 'Peptide Report',
    value: 6.99,
    currency: 'USD',
  })
  window.gtag?.('event', 'purchase', { value: 6.99, currency: 'USD' })
}
