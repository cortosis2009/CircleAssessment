'use client'

import type React from 'react'
import { useContext } from 'react'

import classNames from 'classnames'

import { FeatureGridContext } from '../FeatureGrid.Context/context'

export interface FeatureGridSecondaryProps {
  /**
   * Icon component.
   */
  icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>
  /**
   * Feature Title.
   */
  title: string
  /**
   * Feature Content.
   */
  children: React.ReactNode
}

export const FeatureGridSecondary: React.FC<FeatureGridSecondaryProps> = ({
  icon: DynamicIcon,
  title,
  children,
}) => {
  const { onDark } = useContext(FeatureGridContext)

  return (
    <div className="flex flex-col">
      <dt
        className={classNames(
          'flex items-center gap-x-3 text-base/7 font-semibold',
          {
            'text-white': onDark,
            'text-gray-900': !onDark,
          },
        )}
      >
        <DynamicIcon
          aria-hidden="true"
          className="size-5 flex-none text-indigo-400"
        />
        {title}
      </dt>
      <dd
        className={classNames(
          'mt-4 flex flex-auto flex-col text-base/7 text-gray-300',
          {
            'text-gray-300': onDark,
            'text-gray-900': !onDark,
          },
        )}
      >
        {children}
      </dd>
    </div>
  )
}
