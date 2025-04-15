import type React from 'react'
import type { HtmlHTMLAttributes } from 'react'

export interface SectionProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * React children.
   */
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ children, ...props }) => {
  return (
    <section {...props}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto lg:mx-0">{children}</div>
      </div>
    </section>
  )
}
