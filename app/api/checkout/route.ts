import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { PRODUCT_NAME } from '@/lib/constants'
import Stripe from 'stripe'

interface CartItem {
  productId: string
  variantId: string
  name: string
  supplier: string
  price: number
  quantity: number
}

interface CheckoutRequestBody {
  quizAnswers?: Record<string, unknown>
  cartItems?: CartItem[]
  email?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const stripe = getStripe()

    // Cart checkout (marketplace purchases)
    if (body.cartItems && body.cartItems.length > 0) {
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = body.cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `Supplier: ${item.supplier}`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }))

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: lineItems,
        customer_email: body.email || undefined,
        metadata: {
          type: 'marketplace_order',
          cartItems: JSON.stringify(body.cartItems),
        },
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout`,
      })

      return NextResponse.json({ url: session.url })
    }

    // Report checkout (quiz personalized report)
    if (body.quizAnswers) {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: PRODUCT_NAME },
              unit_amount: 300,
            },
            quantity: 1,
          },
        ],
        customer_email: body.email || undefined,
        metadata: {
          type: 'report',
          quizAnswers: JSON.stringify(body.quizAnswers),
        },
        success_url: `${origin}/report?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/find`,
      })

      return NextResponse.json({ url: session.url })
    }

    return NextResponse.json({ error: 'No cart items or quiz answers provided' }, { status: 400 })
  } catch (error) {
    console.error('Checkout session creation failed:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
