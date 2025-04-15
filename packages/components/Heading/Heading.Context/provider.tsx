'use client'

import type React from 'react'

import { HeadingContext } from './context'

import type { HeadingContextProps } from './context'

export interface HeadingProviderProps extends HeadingContextProps {
  /**
   * React children.
   */
  children?: React.ReactNode
}

export const HeadingProvider: React.FC<HeadingProviderProps> = ({
  children,
  ...value
}) => {
  return (
    <HeadingContext.Provider value={value}>{children}</HeadingContext.Provider>
  )
}
