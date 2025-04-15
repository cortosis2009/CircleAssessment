'use client'

import type React from 'react'
import { useContext } from 'react'

import classNames from 'classnames'

import { FeatureGridContext } from '../FeatureGrid.Context/context'

export interface FeatureGridPrimaryProps {
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

export const FeatureGridPrimary: React.FC<FeatureGridPrimaryProps> = ({
  icon: DynamicIcon,
  title,
  children,
}) => {
  const { onDark } = useContext(FeatureGridContext)

  return (
    <div className="flex flex-col">
      <dt
        className={classNames('text-base/7 font-semibold', {
          'text-white': onDark,
          'text-gray-900': !onDark,
        })}
      >
        <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
          <DynamicIcon aria-hidden="true" className="size-6 text-white" />
        </div>
        {title}
      </dt>
      <dd
        className={classNames(
          'mt-1 flex flex-auto flex-col text-base/7 text-gray-600',
          {
            'text-white': onDark,
            'text-gray-600': !onDark,
          },
        )}
      >
        <span className="flex-auto">{children}</span>
      </dd>
    </div>
  )
}
