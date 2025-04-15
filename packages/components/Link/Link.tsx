import type * as React from 'react'

import classNames from 'classnames'
import NextLink from 'next/link'

import type { LinkProps as NextLinkProps } from 'next/link'

import './Link.css'

interface LinkProps extends NextLinkProps {
  /**
   * Button Size.
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Link Intent.
   */
  variant: 'link' | 'button'
  /**
   * Button Intent.
   */
  intent?: 'bold' | 'soft'
  /**
   * Custom Style.
   */
  className?: string
  /**
   * React Children.
   */
  children: React.ReactNode
}

export const Link: React.FC<LinkProps> = ({
  size = 'md',
  variant = 'link',
  intent = 'bold',
  className,
  children,
  ...props
}) => {
  return (
    <NextLink
      className={classNames('ui-link', size, variant, intent, className)}
      {...props}
    >
      {children}
    </NextLink>
  )
}
