import type React from 'react'

import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Heading } from '@packages/components/heading'
import { Link } from '@packages/components/link'
import { Section } from '@packages/components/section'

const Home: React.FC = () => {
  return (
    <main>
      <Section>
        <div className="lg:max-w-lg">
          <Heading>
            <Heading.Label>Circle Internet Financial</Heading.Label>
            <Heading.Title>Take-Home Assignment</Heading.Title>
            <Heading.Body>
              <span className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">
                This task is designed to showcase your skills and
                problem-solving abilities. Please review the instructions
                carefully before starting. If you have any questions, feel free
                to reach out to our team.
              </span>
              <span className="mt-10 flex items-center gap-x-6">
                <Link href="/instructions" variant="button">
                  View Instructions
                </Link>
                <Link href="mailto:talent@circle.com" variant="link">
                  Contact Us <ArrowRightIcon className="inline size-5" />
                </Link>
                <Link href="/ryansubmission" variant="button">
                View Ryan's Submission
                </Link>
              </span>
            </Heading.Body>
          </Heading>
        </div>
      </Section>
    </main>
  )
}

export default Home
