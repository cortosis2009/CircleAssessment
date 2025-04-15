import type React from 'react'

import { Api } from '@feature/instructions/api'
import { FrequentlyAsked } from '@feature/instructions/faq'
import { Optional } from '@feature/instructions/optional'
import { Requirements } from '@feature/instructions/requirements'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Heading } from '@packages/components/heading'
import { Link } from '@packages/components/link'
import { Section } from '@packages/components/section'

const Instructions: React.FC = () => {
  return (
    <main>
      <Section>
        <div className="lg:max-w-lg">
          <Heading>
            <Heading.Label>Circle Internet Financial</Heading.Label>
            <Heading.Title>Payments Dashboard</Heading.Title>
            <Heading.Body>
              Develop a single-page web dashboard using this Next.js app that
              displays real-time peer-to-peer payment data. The dashboard should
              showcase the 25 most recent payments, updating reactively as new
              data is received, and include search functionality to filter
              payments based on all available fields.
            </Heading.Body>
          </Heading>
          <div className="mt-10 flex items-center gap-x-4">
            <Link href="#requirements" variant="button">
              Requirements
            </Link>
            <Link href="#apiendpoints" intent="soft" variant="button">
              Api Endpoints
            </Link>
            <Link href="#faq" variant="link">
              FAQ <ArrowRightIcon className="inline size-5" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-900" id="requirements">
        <Requirements />
      </Section>

      <Section className="bg-white" id="optional">
        <Optional />
      </Section>

      <Section className="bg-gray-900" id="apiendpoints">
        <Api />
      </Section>

      <Section className="bg-white" id="faq">
        <FrequentlyAsked />
      </Section>
    </main>
  )
}

export default Instructions
