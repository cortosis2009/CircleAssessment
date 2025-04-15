'use client'

import { createContext } from 'react'

export interface HeadingContextProps {
  /**
   * On dark background?
   */
  onDark?: boolean
}

export const HeadingContext = createContext<HeadingContextProps>({})
