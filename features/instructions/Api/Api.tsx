'use client'

import type React from 'react'

import { ArrowRightIcon, BoltIcon } from '@heroicons/react/20/solid'
import { Alert } from '@packages/components/alert'
import { FeatureGrid } from '@packages/components/feature-grid'
import { Heading } from '@packages/components/heading'

const features = [
  {
    name: 'GET /api/users',
    description:
      'This endpoint retrieves a predefined list of 20 users generated when the server initializes. These users serve as the potential senders and receivers in the payments endpoint, ensuring consistency in payment data representation.',
    href: '/api/users',
  },
  {
    name: 'GET /api/payments',
    description:
      'Every second it returns a different JSON object describing a single peer-to-peer payment. If you query it multiple times within the same clock second, it will return the same sample payment. Once the clock second has passed the endpoint will return a new sample payment, and you will be unable to retrieve the previous payment from the server again.',
    href: '/api/payments',
  },
  {
    name: 'POST /api/payments',
    description:
      'Allows you to record a new payment on the server. This endpoint is intentionally flaky, and it will respond with an error code indicating success or failure. Please note that even if the payment is successful, it will not show up on the GET /payments endpoint.',
  },
]

export const Api: React.FC = () => {
  return (
    <>
      <Heading onDark>
        <Heading.Label as="h3">Server Details</Heading.Label>
        <Heading.Title as="h2">API Endpoints</Heading.Title>
        <Heading.Body>
          In this Next.js application, the server API is designed to manage
          payment data, offering several endpoints to facilitate data retrieval
          and submission. This architecture enables efficient handling and
          processing of payment information within the application.
        </Heading.Body>
      </Heading>
      <FeatureGrid onDark>
        {features.map((feature) => (
          <FeatureGrid.Secondary
            key={feature.name}
            icon={BoltIcon}
            title={feature.name}
          >
            <p className="flex-auto">{feature.description}</p>
            <p className="mt-6">
              {feature.href && (
                <a
                  className="text-sm/6 font-semibold text-indigo-400"
                  href={feature.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open <ArrowRightIcon className="inline size-5" />
                </a>
              )}
            </p>
          </FeatureGrid.Secondary>
        ))}
      </FeatureGrid>

      <Alert onDark>
        You are required to implement the solution without modifying the
        provided API route handlers. Modifying the provided server&#39;s code,
        replacing it with a different server, or introducing any intermediary
        servers is strictly prohibited. This approach aligns with the
        client-server architectural constraint, ensuring that client
        applications and server applications can evolve independently without
        dependencies on each other.
      </Alert>
    </>
  )
}
