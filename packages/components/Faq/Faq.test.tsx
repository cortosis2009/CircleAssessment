import { render, screen } from '@testing-library/react'

import { Faq } from './Faq'

describe('Faq', () => {
  it('should render FAQ successfully', () => {
    render(
      <Faq>
        <Faq.Question answer="Answer" question="Question 1" />
        <Faq.Question answer="Answer" question="Question 2" />
      </Faq>,
    )

    expect(screen.getAllByRole('term')).toHaveLength(2)
  })
})
