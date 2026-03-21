import Stripe from 'stripe'
import { PRICE_AMOUNT, PRICE_CURRENCY, PRODUCT_NAME } from './constants'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, {})
  }
  return _stripe
}

export const priceId = process.env.STRIPE_PRICE_ID

interface CheckoutSessionParams {
  quizAnswers: Record<string, unknown>
  origin: string
}

export async function createCheckoutSession({ quizAnswers, origin }: CheckoutSessionParams) {
  const stripe = getStripe()

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = priceId
    ? { price: priceId, quantity: 1 }
    : {
        price_data: {
          currency: PRICE_CURRENCY,
          product_data: { name: PRODUCT_NAME },
          unit_amount: PRICE_AMOUNT,
        },
        quantity: 1,
      }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [lineItem],
    metadata: {
      quizAnswers: JSON.stringify(quizAnswers),
    },
    success_url: `${origin}/report?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/find`,
  })

  return session
}
