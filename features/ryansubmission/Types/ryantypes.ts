import type { Currencies } from '../../../packages/server/constants'
import type { User } from '../../../packages/server/users/users'

export type StringNumber = string & { __brand: 'StringNumber' }

export type userType = {
  id: number
  name: string
}

export type sendPaymentInfo = {
  id: string
  date: string
  sender: User
  receiver: User
  amount: string
  currency: Currencies
  memo: string
}

export type sortOptions =
  | 'Date asc'
  | 'Date desc'
  | 'Amount asc'
  | 'Amount desc'
  | 'Sender asc'
  | 'Sender desc'
  | 'Receiver asc'
  | 'Receiver desc'
  | ''
