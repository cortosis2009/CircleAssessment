import type React from 'react'

import { FaqProvider } from './Faq.Context/provider'
import { FaqQuestion } from './Faq.Question/Faq.Question'

import type { FaqProviderProps } from './Faq.Context/provider'

interface SubComponents {
  Question: typeof FaqQuestion
}

export const Faq: React.FC<FaqProviderProps> & SubComponents = ({
  children,
  ...props
}) => {
  return (
    <FaqProvider {...props}>
      <dl className="mt-16 divide-y divide-gray-900/10">{children}</dl>
    </FaqProvider>
  )
}

Faq.Question = FaqQuestion
