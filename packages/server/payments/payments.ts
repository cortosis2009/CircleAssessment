import seedrandom from 'seedrandom'

import { CURRENCIES, DRINKS, FOODS } from '../constants'
import { Core } from '../core/core'
import { Users } from '../users/users'

import type { Currencies } from '../constants'
import type { User } from '../users/users'

/**
 * Interface representing a payment.
 */
export interface Payment {
  /**
   * Payment ID.
   */
  id: string
  /**
   * Payment Date.
   */
  date: string
  /**
   * Payment Sender.
   */
  sender: User
  /**
   * Payment Receiver.
   */
  receiver: User
  /**
   * Payment Currency.
   */
  currency: Currencies
  /**
   * Payment Amount.
   */
  amount: string
  /**
   * Payment Memo.
   */
  memo?: string
}

/**
 * Class responsible for handling payments.
 */
class PaymentManager extends Core {
  // Optimized: Using a Set for O(1) lookup
  private paymentIds: Record<string, boolean> = {}

  /**
   * Generates a new PRNG seeded with the current epoch time.
   */
  public generateSeed() {
    const nowMS: Date = new Date()
    const epochSeconds: number = Math.round(nowMS.getTime() / 1000)
    return {
      prng: seedrandom(epochSeconds.toString()),
      now: new Date(epochSeconds * 1000),
    }
  }

  /**
   * Generates a new payment transaction with randomized values.
   * @returns A new Payment object.
   */
  public getPayment(): Payment {
    const { now, prng } = this.generateSeed()

    // Pick sender and receiver
    const [sender, receiver] = Users.pickUsers(prng)
    const food = this.seededSample(prng, FOODS)
    const drink = this.seededSample(prng, DRINKS)

    return {
      id: Math.round(prng.quick() * 1e16).toString(),
      date: now.toISOString(),
      sender,
      receiver,
      amount: this.seededRange(prng, 0, 1e4, 2).toString(),
      currency: this.seededSample(prng, [...CURRENCIES]),
      memo: `${food} and ${drink}`,
    }
  }

  /**
   * Processes an incoming payment request.
   * @param payment - Payment object.
   */
  public createPayment(payment: unknown) {
    // Check if the payment is valid
    if (!this.isPaymentType(payment)) {
      return {
        message: 'Invalid payment format',
        status: 400,
      }
    }

    // Check if the payment is valid
    const isValid = this.isValidPayment(payment)

    // When the payment is invalid,
    // return an error message
    if (isValid !== true) {
      return {
        message: isValid,
        status: 400,
      }
    }

    // Ensure the payment ID is unique
    if (this.paymentIds[payment.id]) {
      return {
        message: 'That payment id has already been used!',
        status: 409,
      }
    }

    // Simulate random success or failure
    if (Math.random() < 0.5) {
      return {
        message: 'Payment failed. Please try again later.',
        status: 500,
      }
    }

    // Mark the payment ID as used and return success
    this.paymentIds[payment.id] = true
    return {
      message: 'Payment created successfully.',
      status: 201,
    }
  }

  /**
   * Validates whether an object is a correctly formatted Payment.
   * @param obj - The object to validate.
   * @returns True if valid, otherwise false.
   */
  public isValidPayment(obj: Payment) {
    // Check if the date is valid
    if (isNaN(Date.parse(obj.date))) {
      return 'Invalid date'
    }

    // Check if the sender and receiver are the same
    if (obj.sender.id === obj.receiver.id) {
      return 'Sender and receiver are the same'
    }

    // Check if the sender user exists
    if (!Users.isValidUser(obj.sender)) {
      return 'Invalid sender'
    }

    // Check if the receiver user exists
    if (!Users.isValidUser(obj.receiver)) {
      return 'Invalid receiver'
    }

    // Check for a valid amount
    if (isNaN(parseFloat(obj.amount))) {
      return 'Invalid amount'
    }

    // Check for a valid currency
    if (!CURRENCIES.includes(obj.currency)) {
      return 'Invalid currency'
    }

    // The payment is valid
    return true
  }

  /**
   * Type guard to determine if an object adheres to the Payment interface.
   * @param obj - The object to evaluate.
   * @returns True if the object matches the Payment structure; otherwise, false.
   */
  private isPaymentType(obj: unknown): obj is Payment {
    // Check if obj is an object and not null
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    // Define an array of property names and their expected types
    const properties: { key: keyof Payment; type: string }[] = [
      { key: 'id', type: 'string' },
      { key: 'date', type: 'string' },
      { key: 'sender', type: 'object' },
      { key: 'receiver', type: 'object' },
      { key: 'amount', type: 'string' },
      { key: 'currency', type: 'string' },
    ]

    // Iterate over the properties to check for existence and type
    for (const prop of properties) {
      // Use the 'in' operator to check if the property exists in the object
      if (!(prop.key in obj)) {
        return false
      }
      // Check the type of the property
      if (typeof (obj as Record<string, unknown>)[prop.key] !== prop.type) {
        return false
      }
    }

    // All checks passed; obj matches the Payment interface
    return true
  }
}

// Create a singleton instance of PaymentManager.
const Payments = Object.freeze(new PaymentManager())

// Export an instance of PaymentService.
export { Payments }
