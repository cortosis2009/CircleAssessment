'use client'

import type React from 'react'
import { useContext } from 'react'

import classNames from 'classnames'

import { HeadingContext } from '../Heading.Context/context'

export interface HeadingLabelProps {
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

export const HeadingLabel: React.FC<HeadingLabelProps> = ({
  as: DynamicTag = 'h2',
  children,
}) => {
  const { onDark } = useContext(HeadingContext)

  return (
    <DynamicTag
      className={classNames('text-base/7 font-semibold', {
        'text-gray-400': !onDark,
        'text-indigo-400': onDark,
      })}
    >
      {children}
    </DynamicTag>
  )
}
