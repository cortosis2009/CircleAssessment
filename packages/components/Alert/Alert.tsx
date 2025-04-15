import type React from 'react'

import classNames from 'classnames'

export interface AlertProps {
  /**
   * On dark background?
   */
  onDark?: boolean
  /**
   * React children.
   */
  children: React.ReactNode
}

export const Alert: React.FC<AlertProps> = ({ onDark = false, children }) => {
  return (
    <div
      className={classNames('mt-10 rounded-md p-4', {
        'bg-blue-800': onDark,
        'bg-blue-50': !onDark,
      })}
      role="alert"
    >
      <div className="flex">
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p
            className={classNames('text-sm', {
              'text-blue-200': onDark,
              'text-blue-700': !onDark,
            })}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}
