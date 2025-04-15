'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Alert } from '@packages/components/alert'
import { Heading } from '@packages/components/heading'
import axios from 'axios'
import seedrandom from 'seedrandom'

import type { Currencies } from '../../../packages/server/constants'
import type { User } from '../../../packages/server/users/users'
import type * as DashboardTypes from '@feature/ryansubmission/types'

type props = {
  setPayments: (newPayment: DashboardTypes.sendPaymentInfo) => void
}
export const PaymentForm = ({ setPayments }: props) => {
  const [users, setUsers] = useState<DashboardTypes.userType[]>([])
  const currencies: Currencies[] = ['JPY', 'EUR', 'BTC', 'GBP', 'USD']
  const [receiverList, setReceiverList] = useState<DashboardTypes.userType[]>(
    [],
  )
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSender, setSelectedSender] = useState<string>('')
  const [selectedReceiver, setSelectedReceiver] = useState<string>('')
  const [selectedAmount, setSelectedAmount] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<Currencies | ''>('') // \ "" is so a blank default selection can exist
  const [showAPIError, setShowAPIError] = useState(false)

  useEffect(() => {
    getUserData()
    const today = new Date()
    today.setHours(0, 0, 0, 0) //the conversion to ISO was messing with the date, depending on the time of day
    setSelectedDate(today.toISOString())
  }, [])

  const getUserData = async () => {
    await axios.get('/api/users')
      .then(response => {
        setUsers(response.data.data)
      })
      .catch(err => {
        console.log('Error getting users fromm /api/users: ' + err)
      })
  }

  const handleSenderSelection = (user: string) => {
    //ensure user can't send themselves money
    const currentSelection =
      users.find((userList) => userList.name === user) || '' //parse to user type

    if (currentSelection) {
      setSelectedSender(currentSelection.name)
    }
    const remainingUsers = users.filter((userList) => userList.name !== user)
    setReceiverList(remainingUsers)
  }

  const handleReceiverSelection = (user: string) => {
    const currentSelection =
      users.find((userList) => userList.name === user) || '' //parse to user type

    if (currentSelection) { //eslint doesn't like this, but I see/use this very frequently. Checks for not null
      setSelectedReceiver(currentSelection.name)
    }
  }

  const handleCurrencySelection = (currency: string) => {
    const currentSelection =
      currencies.find((currencyList) => currencyList === currency) || ''
    if (currentSelection) setSelectedCurrency(currentSelection)
  }

  const getUserId = (name: string) => {
    const submittedUser = users.find((user) => user.name === name)
    return submittedUser?.id
  }

  const generatePaymentID = (seed: string) => {
    const prng = seedrandom(seed)
    return Math.round(prng.quick() * 1e16)
      .toString()
      .padStart(16, '0')
  }

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault() //stop default page refresh

    if (selectedReceiver && selectedSender && selectedCurrency) {
      const sendingID = getUserId(selectedSender)
      const receivingID = getUserId(selectedReceiver)

      if (sendingID && receivingID) {
        const sendingUser: User = {
          name: selectedSender,
          id: sendingID,
        }

        const receivingUser: User = {
          name: selectedReceiver,
          id: receivingID,
        }

        const data: DashboardTypes.sendPaymentInfo = {
          id: generatePaymentID(Date.now().toString()),
          date: selectedDate,
          sender: sendingUser,
          receiver: receivingUser,
          amount: selectedAmount,
          currency: selectedCurrency,
          memo: 'HELLO',
        }

        await axios
          .post(`/api/payments`, data)
          .then(() => {
            setPayments(data) //send to parent state to add to list
            return
          })
          .catch((err) => {
            handleToastMessage() //show popup to user with some info
            console.log('Error calling /api/payments: ' + err.status)
          })
      }
    }
  }

  const handleToastMessage = () => {
    setShowAPIError(true)

    setTimeout(() => {
      setShowAPIError(false)
    }, 5000) //remove message after 5 seconds
  }

  return (
    <div className="mx-auto w-full md:w-[25%] lg:w-[25%]">
      <Heading onDark>
        <Heading.Title as="h2">Submit Payment</Heading.Title>
      </Heading>

      <form
        className="mt-4 h-[30rem] w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
        onSubmit={handleFormSubmission}
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          <i></i> Payment Details
        </h2>

        <div className="space-y-6">
          <div className="flex space-x-2">
            <div className="w-1/2 ">
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="date"
              >
                Payment Date
              </label>
              <input
                className="h-10 w-[99%] rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-800 focus:ring focus:ring-blue-800"
                onChange={(e) => setSelectedDate(e.target.value)}
                type="date"
                value={selectedDate.split('T')[0]}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="sender"
              >
                Sender
              </label>
              <select
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-800 focus:ring focus:ring-blue-800"
                onChange={(e) => handleSenderSelection(e.target.value)}
                value={selectedSender}
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((item) => (
                  <option key={item.id.toString()} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="receiver"
              >
                Receiver
              </label>
              <select
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-800 focus:ring focus:ring-blue-800"
                onChange={(e) => handleReceiverSelection(e.target.value)}
                value={selectedReceiver}
              >
                <option value="" disabled>
                  Select a user
                </option>
                {receiverList.map((item) => (
                  <option key={item.id.toString()} value={item.name.toString()}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="h-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-800 focus:ring focus:ring-blue-800"
                onChange={(e) => setSelectedAmount(e.target.value)}
                placeholder="Enter amount"
                step="0.01"
                type="number"
              />
            </div>
            <div className="flex-1">
              <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor="currency"
              >
                Currency
              </label>
              <select
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-800 focus:ring focus:ring-blue-800"
                onChange={(e) => handleCurrencySelection(e.target.value)}
                value={selectedCurrency}
              >
                <option value="" disabled>
                  Select a currency
                </option>
                {currencies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-4 text-right">
            <button
              className="inline-block rounded-lg bg-blue-800 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {showAPIError ? (
        <div
          aria-atomic="true"
          aria-live="assertive"
          className="fixed bottom-[23%] z-50 w-96 "
          role="alert"
        >
          <Alert onDark>
            An error has occurred submitting your payment. Please try again and
            contact support if the issue persists.
          </Alert>
        </div>
      ) : null}
    </div>
  )
}
