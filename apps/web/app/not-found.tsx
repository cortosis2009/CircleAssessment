import type React from 'react'

import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Heading } from '@packages/components/heading'
import { Link } from '@packages/components/link'

const Custom404: React.FC = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Heading>
        <Heading.Label>404</Heading.Label>
        <Heading.Title>Page not found</Heading.Title>
        <Heading.Body>
          Sorry, we couldn’t find the page you’re looking for.
          <span className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" variant="button">
              Go back home
            </Link>
            <Link href="mailto:talent@circle.com" variant="link">
              Contact Us <ArrowRightIcon className="inline size-5" />
            </Link>
          </span>
        </Heading.Body>
      </Heading>
    </main>
  )
}

export default Custom404
