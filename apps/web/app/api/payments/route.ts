import { Payments } from '@packages/server/payments'
import { NextResponse } from 'next/server'

/**
 * Payments GET route.
 * @constructor
 */
export function GET() {
  return NextResponse.json({ data: Payments.getPayment() })
}

/**
 * Payments POST route.
 * @param request
 * @constructor
 */
export async function POST(request: Request) {
  // Parse the incoming request body as JSON
  const payment: unknown = await request.json()

  // Create the payment
  const response = Payments.createPayment(payment)

  // Return the response based on the status
  switch (response.status) {
    case 400:
    case 409:
    case 500:
      return NextResponse.json(
        { error: response.message },
        { status: response.status },
      )
    case 201:
      return NextResponse.json(
        { message: response.message },
        { status: response.status },
      )
  }
}
