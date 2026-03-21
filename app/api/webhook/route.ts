import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import crypto from 'crypto'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      const quizAnswersRaw = session.metadata?.quizAnswers
      if (!quizAnswersRaw) {
        console.warn('No quizAnswers found in session metadata', session.id)
        break
      }

      try {
        const quizAnswers = JSON.parse(quizAnswersRaw)
        const token = crypto.randomUUID()

        // MVP: Log the completed payment and generated token.
        // TODO: Replace with Supabase storage when ready.
        console.log('Payment completed:', {
          sessionId: session.id,
          token,
          quizAnswers,
          customerEmail: session.customer_details?.email,
          amountTotal: session.amount_total,
        })
      } catch (parseError) {
        console.error('Failed to parse quizAnswers from metadata:', parseError)
      }

      break
    }
    default:
      // Unhandled event type — log but don't error
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
