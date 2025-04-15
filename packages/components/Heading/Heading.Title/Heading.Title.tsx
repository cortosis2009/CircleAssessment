'use client'

import type React from 'react'
import { useContext } from 'react'

import classNames from 'classnames'

import { HeadingContext } from '../Heading.Context/context'

export interface HeadingTitleProps {
  /**
   * HTML tag.
   */
  as?: keyof Pick<
    React.JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  >
  /**
   * React children.
   */
  children: React.ReactNode
}

export const HeadingTitle: React.FC<HeadingTitleProps> = ({
  as: DynamicTag = 'h1',
  children,
}) => {
  const { onDark } = useContext(HeadingContext)

  return (
    <DynamicTag
      className={classNames(
        'mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl',
        {
          'text-gray-900': !onDark,
          'text-white': onDark,
        },
      )}
    >
      {children}
    </DynamicTag>
  )
}
