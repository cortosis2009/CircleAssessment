'use client'

import type React from 'react'
import { useContext } from 'react'

import classNames from 'classnames'

import { HeadingContext } from '../Heading.Context/context'

export interface HeadingBodyProps {
  /**
   * HTML tag.
   */
  as?: keyof Pick<React.JSX.IntrinsicElements, 'div' | 'p' | 'span'>
  /**
   * React children.
   */
  children: React.ReactNode
}

export const HeadingBody: React.FC<HeadingBodyProps> = ({
  as: DynamicTag = 'p',
  children,
}) => {
  const { onDark } = useContext(HeadingContext)

  return (
    <DynamicTag
      className={classNames('mt-6 text-lg/8', {
        'text-gray-600': !onDark,
        'text-gray-300': onDark,
      })}
    >
      {children}
    </DynamicTag>
  )
}
