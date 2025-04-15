'use client'

import { Heading } from '@packages/components/heading'

import type * as DashboardTypes from '@feature/ryansubmission/types'

type props = {
  payments: DashboardTypes.sendPaymentInfo[]
}
export const MostRecent = ({ payments }: props) => {
  return (
    <div className="mx-auto w-full md:w-1/4 lg:w-1/4">
      <Heading onDark>
        <Heading.Title as="h2">Recent Payments</Heading.Title>
      </Heading>
      <ul className="scrollbar-hide mt-4 h-[30rem] w-full divide-y divide-gray-200 overflow-y-auto rounded-xl border bg-white shadow-sm">
        {payments
          .slice(-25)
          .reverse()
          .map(
            (
              item,
              index, //only show most recent 25 and sort for most recent on top
            ) => (
              <li
                key={index}
                className="h-13 flex flex-col justify-between space-y-1 px-4 py-3 text-gray-800 hover:bg-gray-50"  // eslint-disable-line 
              >
                <div className="flex items-center gap-x-6 truncate">
                  <div className="text-xl font-semibold">
                    Amount:{' '}
                    <span className="font-bold text-blue-800">
                      {item.amount}
                    </span>{' '}
                    {item.currency}
                  </div>
                  <div className="block text-sm">
                    <div>Sender: {item.sender.name}</div>
                    <div>Receiver: {item.receiver.name}</div>
                  </div>
                </div>
              </li>
            ),
          )}
      </ul>
    </div>
  )
}
