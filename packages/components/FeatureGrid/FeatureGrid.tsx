import type React from 'react'

import { FeatureGridProvider } from './FeatureGrid.Context/provider'
import { FeatureGridPrimary } from './FeatureGrid.Primary/FeatureGrid.Primary'
import { FeatureGridSecondary } from './FeatureGrid.Secondary/FeatureGrid.Secondary'

import type { FeatureGridProviderProps } from './FeatureGrid.Context/provider'

interface SubComponents {
  Primary: typeof FeatureGridPrimary
  Secondary: typeof FeatureGridSecondary
}

export const FeatureGrid: React.FC<FeatureGridProviderProps> &
  SubComponents = ({ children, ...props }) => {
  return (
    <FeatureGridProvider {...props}>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {children}
        </dl>
      </div>
    </FeatureGridProvider>
  )
}

FeatureGrid.Primary = FeatureGridPrimary
FeatureGrid.Secondary = FeatureGridSecondary
