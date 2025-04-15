'use client'

import type React from 'react'

import { FeatureGridContext } from './context'

import type { FeatureGridContextProps } from './context'

export interface FeatureGridProviderProps extends FeatureGridContextProps {
  /**
   * React children.
   */
  children?: React.ReactNode
}

export const FeatureGridProvider: React.FC<FeatureGridProviderProps> = ({
  children,
  ...value
}) => {
  return (
    <FeatureGridContext.Provider value={value}>
      {children}
    </FeatureGridContext.Provider>
  )
}
