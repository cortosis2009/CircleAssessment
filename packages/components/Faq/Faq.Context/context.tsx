'use client'

import { createContext } from 'react'

export interface FaqContextProps {
  /**
   * On dark background?
   */
  onDark?: boolean
}

export const FaqContext = createContext<FaqContextProps>({})
