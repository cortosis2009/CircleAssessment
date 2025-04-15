import type React from 'react'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Payment Dashboard',
  description: 'Circle Take-Home Assignment',
}

export interface RootLayoutProps {
  /**
   * React Children.
   */
  children?: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
