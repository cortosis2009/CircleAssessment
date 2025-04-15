import { Users } from '../users/users'

import { Payments } from './payments'

import type { Payment } from './payments'

// Increased ID for payments
let increasedId = 0

/**
 * Generates a payment with the given override.
 * @param override
 */
function generatePayment(override: Partial<Payment> = {}) {
  // Generate seed
  const { prng, now } = Payments.generateSeed()

  // Pick 2 users
  const [sender, receiver] = Users.pickUsers(prng)

  // Return the payment with the given override
  return {
    id: (increasedId += 1).toString(),
    date: now.toISOString(),
    amount: '100',
    currency: 'USD',
    sender,
    receiver,
    ...override,
  }
}

// Invalid payments to test
const invalidPayments = [
  {
    override: {
      id: '1',
    },
    result: {
      message: 'That payment id has already been used!',
      status: 409,
    },
  },
  {
    override: {
      date: 'invalid',
    },
    result: {
      message: 'Invalid date',
      status: 400,
    },
  },
  {
    override: {
      sender: {
        id: 1,
        name: 'Bob Money',
      },
    },
    result: {
      message: 'Invalid sender',
      status: 400,
    },
  },
  {
    override: {
      receiver: {
        id: 1,
        name: 'Bob Money',
      },
    },
    result: {
      message: 'Invalid receiver',
      status: 400,
    },
  },
  {
    override: {
      currency: 'invalid',
    },
    result: {
      message: 'Invalid currency',
      status: 400,
    },
  },
]

describe('PaymentManager', () => {
  it('should generate the same payment', () => {
    // Get payments in less than 1 second
    const payment1 = Payments.getPayment()
    const payment2 = Payments.getPayment()

    // Check that the payments are the same
    expect(payment1).toMatchObject(payment2)
  })

  it('should generate different payments', () => {
    // Enable Vitest fake timers
    vi.useFakeTimers()

    // Get the first payment
    const payment1 = Payments.getPayment()

    // Fast-forward time by 1 second
    vi.advanceTimersByTime(1000)

    // Get the second payment
    const payment2 = Payments.getPayment()

    // Check that the payments are different
    expect(payment1).not.toMatchObject(payment2)

    // Restore real timers after the test
    vi.useRealTimers()
  })

  it('should create a payment successfully', () => {
    // Generate payment
    const payment = generatePayment()

    // Make sure it will randomly succeed
    vi.spyOn(Math, 'random').mockReturnValue(0.8)

    // Create a payment
    const response = Payments.createPayment(payment)

    // Check the payment creation successes
    expect(response).toEqual({
      message: 'Payment created successfully.',
      status: 201,
    })
  })

  it('should create a payment randomly fail', () => {
    // Generate payment
    const payment = generatePayment({
      id: '2',
    })

    // Make sure it will randomly fail
    vi.spyOn(Math, 'random').mockReturnValue(0.2)

    // Create a payment
    const response = Payments.createPayment(payment)

    // Check the payment creation fail
    expect(response).toEqual({
      message: 'Payment failed. Please try again later.',
      status: 500,
    })
  })

  it.each(invalidPayments)(
    'should fail to create payment with $result.message',
    ({ override, result }) => {
      // Generate payment
      // @ts-expect-error expect invalid values for testing
      const payment = generatePayment(override)

      // Make sure it will randomly succeed
      vi.spyOn(Math, 'random').mockReturnValue(0.8)

      // Create a payment
      const response = Payments.createPayment(payment)

      // Check the payment creation successes
      expect(response).toEqual(result)
    },
  )
})
