'use client'

import type React from 'react'

import {
  SquaresPlusIcon,
  AdjustmentsVerticalIcon,
  StarIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'
import { Alert } from '@packages/components/alert'
import { FeatureGrid } from '@packages/components/feature-grid'
import { Heading } from '@packages/components/heading'

export const Optional: React.FC = () => {
  return (
    <>
      <Heading>
        <Heading.Title as="h2">Optional</Heading.Title>
        <Heading.Body>
          The following features are optional enhancements designed to showcase
          additional possibilities for your dashboard. Given the time
          constraints, implementing these features are a great addition, but
          your primary focus should be on the required section above.
        </Heading.Body>
      </Heading>
      <FeatureGrid>
        <FeatureGrid.Primary icon={StarIcon} title="Design">
          Create a user-friendly and aesthetically pleasing interface by
          utilizing the pre-installed{' '}
          <a
            className="inline-block text-indigo-500"
            href="https://tailwindcss.com/"
            rel="noreferrer"
            target="_blank"
          >
            Tailwind CSS
          </a>{' '}
          framework in this Next.js application.
        </FeatureGrid.Primary>
        <FeatureGrid.Primary icon={SquaresPlusIcon} title="Responsiveness">
          Ensure the dashboard is responsive and functions seamlessly across
          various devices and screen sizes.
        </FeatureGrid.Primary>
        <FeatureGrid.Primary
          icon={AdjustmentsVerticalIcon}
          title="Advanced Search"
        >
          Enables users to conduct more targeted and precise searches by
          utilizing various filters and operators. This functionality allows for
          the narrowing down of search results based on specific criteria,
          enhancing the efficiency of information retrieval.
        </FeatureGrid.Primary>
        <FeatureGrid.Primary icon={TruckIcon} title="Unit Tests">
          Incorporating unit tests into your development process is an optional
          yet highly recommended practice to enhance code reliability and
          maintainability.
        </FeatureGrid.Primary>
      </FeatureGrid>

      <Alert>
        Feel free to explore these options as you see fit, keeping in mind that
        they are supplementary and not essential to achieving your project&#39;s
        primary objectives.
      </Alert>
    </>
  )
}
