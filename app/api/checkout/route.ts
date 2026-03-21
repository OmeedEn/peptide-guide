import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

interface CheckoutRequestBody {
  quizAnswers: Record<string, string | string[]>
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody

    if (!body.quizAnswers || typeof body.quizAnswers !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid quizAnswers in request body' },
        { status: 400 }
      )
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await createCheckoutSession({
      quizAnswers: body.quizAnswers,
      origin,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout session creation failed:', error)

    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
