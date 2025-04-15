import type React from 'react'

import { ListItem } from './List.Item/List.Item'

interface SubComponents {
  Item: typeof ListItem
}

export interface ListProps {
  /**
   * React children.
   */
  children: React.ReactNode
}

export const List: React.FC<ListProps> & SubComponents = ({ children }) => {
  return <ul className="mt-2 space-y-2">{children}</ul>
}

List.Item = ListItem
