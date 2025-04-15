import type React from 'react'

import { HeadingBody } from './Heading.Body/Heading.Body'
import { HeadingProvider } from './Heading.Context/provider'
import { HeadingLabel } from './Heading.Label/Heading.Label'
import { HeadingTitle } from './Heading.Title/Heading.Title'

import type { HeadingProviderProps } from './Heading.Context/provider'

interface SubComponents {
  Body: typeof HeadingBody
  Label: typeof HeadingLabel
  Title: typeof HeadingTitle
}

export const Heading: React.FC<HeadingProviderProps> & SubComponents = ({
  children,
  ...props
}) => {
  return <HeadingProvider {...props}>{children}</HeadingProvider>
}

Heading.Body = HeadingBody
Heading.Label = HeadingLabel
Heading.Title = HeadingTitle
