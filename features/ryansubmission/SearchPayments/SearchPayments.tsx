'use client'

import { useState, useEffect } from 'react'

import { Heading } from '@packages/components/heading'

import type { Currencies } from '../../../packages/server/constants'
import type * as DashboardTypes from '@feature/ryansubmission/types'

type props = {
  payments: DashboardTypes.sendPaymentInfo[]
}

export const SearchPayments = ({ payments }: props) => {
  const [searchItem, setSearchItem] = useState<string>('')
  const [filteredPayments, setFilteredPayments] = useState(
    Array<DashboardTypes.sendPaymentInfo>,
  )
  const [sortOrder, setSortOrder] = useState<DashboardTypes.sortOptions>('')
  const [currFilter, setCurrFilter] = useState<Currencies | ''>('')

  const currencies: Currencies[] = ['JPY', 'EUR', 'BTC', 'GBP', 'USD']

  useEffect(() => {
    setFilteredPayments(
      payments.filter((item) => recursiveSearch(item, searchItem)), // I see the lint error here, but recursiveSearch does return a true or false  Possibly due to null option
    )
  }, [searchItem])

  const recursiveSearch = (obj: any, searchItem: string) => {
    if (!searchItem) {
      setCurrFilter('')
      setSortOrder('') //reset the two filters
      return null //no results with no searching
    }
    //the search results have nested objects, so some recursive searching was needed
    if (typeof obj !== 'object' || obj === null) {
      //if we're down to a non-object, compare search item to data
      return obj.toString().toLowerCase().includes(searchItem.toLowerCase())
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        //if object, loop through keys
        if (recursiveSearch(obj[key], searchItem)) {
          //if another object
          return true
        }
      }
    }
    return false
  }

  const handleSortClick = (sortVal: DashboardTypes.sortOptions) => {
    setSortOrder(sortVal) //for value in <select/>

    const sortedList = [...filteredPayments].sort(
      (
        a: DashboardTypes.sendPaymentInfo,
        b: DashboardTypes.sendPaymentInfo,
      ) => {
        switch (sortVal) {
          case 'Amount asc':
            return parseFloat(a.amount) - parseFloat(b.amount)
          case 'Amount desc':
            return parseFloat(b.amount) - parseFloat(a.amount)
          case 'Date asc':
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          case 'Date desc':
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          case 'Receiver asc':
            return a.receiver.name.localeCompare(b.receiver.name)
          case 'Receiver desc':
            return b.receiver.name.localeCompare(a.receiver.name)
          case 'Sender asc':
            return a.sender.name.localeCompare(b.sender.name)
          case 'Sender desc':
            return b.sender.name.localeCompare(a.sender.name)
          default:
            return 0 //no sort
        }
      },
    )
    setFilteredPayments(sortedList)
  }

  const handleCurrFilter = (curr: Currencies) => {
    setCurrFilter(curr)
    

    const filteredList = [...payments].filter(
      (item) => item.currency === curr,
    )

    setFilteredPayments(filteredList)
  }

  return (
    <div className="mx-auto w-full md:w-1/4 lg:w-1/4">
      <Heading onDark>
        <Heading.Title as="h2">Search Payments</Heading.Title>
      </Heading>
      <div className="mt-4 flex w-full flex-col gap-4 text-sm text-white md:flex-row md:items-center">
        <input
          className="w-full rounded-lg border border-gray-300 p-4 text-lg text-black transition placeholder:text-gray-500 focus:ring-4 focus:ring-blue-300 md:flex-1"
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search payment history"
          type="text"
        />
        <select
          className="h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black focus:border-blue-800 focus:ring focus:ring-blue-800 md:w-1/4"
          onChange={(e) =>
            handleSortClick(e.target.value as DashboardTypes.sortOptions)
          }
          value={sortOrder}
        >
          <option value="" disabled>
            Sort by
          </option>
          <option>Amount asc</option>
          <option>Amount desc</option>
          <option>Date asc</option>
          <option>Date desc</option>
          <option>Receiver asc</option>
          <option>Receiver desc</option>
          <option>Sender asc</option>
          <option>Sender desc</option>
        </select>
        <select
          className="h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black focus:border-blue-800 focus:ring focus:ring-blue-800 md:w-1/4"
          onChange={(e) => handleCurrFilter(e.target.value as Currencies)}
          value={currFilter}
        >
          <option value="">
            Currency
          </option>
          {currencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <ul className="scrollbar-hide mt-6 h-[24.75rem] w-full divide-y divide-gray-200 overflow-y-auto rounded-xl bg-white shadow-lg">
        {filteredPayments.length === 0 ? (
          <li className="p-4 text-center text-gray-500">
            Type in the search bar to see results
          </li> //placeholder so it's not just empty
        ) : (
          filteredPayments.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-y-2 p-4 hover:bg-blue-50 "
            >
              <div className="flex items-center gap-6">
                <div className="text-xl font-semibold">
                  Amount:{' '}
                  <span className="font-bold text-blue-800">{item.amount}</span>{' '}
                  {item.currency}
                </div>
                <div className="text-sm text-gray-500">
                  <div>Sender: {item.sender.name}</div>
                  <div>Receiver: {item.receiver.name}</div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
