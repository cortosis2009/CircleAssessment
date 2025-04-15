'use client'

import { createContext } from 'react'

export interface FeatureGridContextProps {
  /**
   * On dark background?
   */
  onDark?: boolean
}

export const FeatureGridContext = createContext<FeatureGridContextProps>({})
