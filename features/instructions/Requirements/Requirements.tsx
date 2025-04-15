'use client'

import type React from 'react'

import {
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'
import { Alert } from '@packages/components/alert'
import { FeatureGrid } from '@packages/components/feature-grid'
import { Heading } from '@packages/components/heading'
import { List } from '@packages/components/list'

export const Requirements: React.FC = () => {
  return (
    <>
      <Heading onDark>
        <Heading.Title as="h2">Requirements</Heading.Title>
        <Heading.Body>
          Please refer to the comprehensive list of requirements provided below
          to ensure your understanding of the project&#39;s objectives and
          deliverables.
        </Heading.Body>
      </Heading>
      <FeatureGrid onDark>
        <FeatureGrid.Primary icon={CurrencyDollarIcon} title="Payment Display">
          Present a list of the 25 most recent payments, updating reactively as
          new data is received.
          <p className="mt-2 font-semibold">
            Each payment entry should only display:
          </p>
          <List>
            <List.Item>Sender&#39;s name</List.Item>
            <List.Item>Receiver&#39;s name</List.Item>
            <List.Item>Amount</List.Item>
            <List.Item>Currency</List.Item>
          </List>
        </FeatureGrid.Primary>

        <FeatureGrid.Primary
          icon={MagnifyingGlassIcon}
          title="Search Functionality"
        >
          Implement a search bar that allows dynamic filtering of payments based
          on all fields returned by the API, not limited to the displayed
          fields.
        </FeatureGrid.Primary>

        <FeatureGrid.Primary icon={PlusCircleIcon} title="Creating Payments">
          Develop a user-friendly web form within the dashboard that enables
          users to submit new payment data to the POST /payments endpoint. The
          form should collect all necessary payment details and handle server
          responses effectively to ensure a seamless user experience.
        </FeatureGrid.Primary>
      </FeatureGrid>

      <Alert onDark>
        We have presented multiple ways to achieve the desired outcome. Please
        select the ways that best aligns with your preferences or requirements.
      </Alert>
    </>
  )
}
