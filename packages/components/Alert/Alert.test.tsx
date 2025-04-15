import { render, screen } from '@testing-library/react'

import { Alert } from './Alert'

describe('Alert', () => {
  it('should render alert successfully', () => {
    render(<Alert>Example</Alert>)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Example')
  })

  it('should render light alert by default successfully', () => {
    render(<Alert>Example</Alert>)

    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50')
  })

  it('should render on dark alert successfully', () => {
    render(<Alert onDark>Example</Alert>)

    expect(screen.getByRole('alert')).toHaveClass('bg-blue-800')
  })
})
