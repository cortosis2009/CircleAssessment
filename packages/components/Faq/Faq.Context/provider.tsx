'use client'

import type React from 'react'

import { FaqContext } from './context'

import type { FaqContextProps } from './context'

export interface FaqProviderProps extends FaqContextProps {
  /**
   * React children.
   */
  children?: React.ReactNode
}

export const FaqProvider: React.FC<FaqProviderProps> = ({
  children,
  ...value
}) => {
  return <FaqContext.Provider value={value}>{children}</FaqContext.Provider>
}
