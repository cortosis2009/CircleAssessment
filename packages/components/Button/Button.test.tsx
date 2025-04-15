import { render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('should render button successfully', () => {
    render(<Button>Click Me</Button>)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
  })
})
