import type React from 'react'

import { ChevronRightIcon } from '@heroicons/react/20/solid'

export interface ListItemProps {
  /**
   * React children.
   */
  children: React.ReactNode
}

export const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <li className="flex items-center gap-x-1">
      <ChevronRightIcon aria-hidden="true" className="size-5 flex-none" />
      {children}
    </li>
  )
}
