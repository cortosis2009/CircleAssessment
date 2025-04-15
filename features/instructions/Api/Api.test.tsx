import { render, screen } from '@testing-library/react'

import { Api } from './Api'

describe('Api', () => {
  it('should render Api successfully', () => {
    render(<Api />)

    // Check for heading
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Server Details',
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'API Endpoints',
    )

    // Check for endpoints
    expect(screen.getByText('GET /api/users')).toBeInTheDocument()
    expect(screen.getByText('GET /api/payments')).toBeInTheDocument()
    expect(screen.getByText('POST /api/payments')).toBeInTheDocument()
  })
})
