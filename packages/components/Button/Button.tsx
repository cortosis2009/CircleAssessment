import type * as React from 'react'

import classNames from 'classnames'

import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button Size.
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Button Intent.
   */
  intent?: 'bold' | 'soft'
  /**
   * React Children.
   */
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  intent = 'bold',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames('ui-button', size, intent, className)}
      {...props}
    >
      {children}
    </button>
  )
}
