'use client'

import type React from 'react'

import { Faq } from '@packages/components/faq'
import { Heading } from '@packages/components/heading'

const faqs = [
  {
    question: '1. What is the objective of this assignment?',
    answer:
      'The goal is to develop a web dashboard that displays real-time peer-to-peer payment data. The dashboard should showcase the 25 most recent payments, updating reactively as new data is received, and include a search functionality to filter payments based on all available fields.',
  },
  {
    question: '2. Which technologies are required for building the dashboard?',
    answer:
      'You are required to use React.js integrated within the current Next.js application. While integrating additional tools like state management libraries such as React Redux is permitted, using entirely different reactive frameworks like Angular.js is not allowed.',
  },
  {
    question: '3. How does the provided server function?',
    answer:
      'The server offers a GET /payments endpoint that returns a new JSON object every second, each representing a unique peer-to-peer payment. Querying multiple times within the same second yields the same payment data. Once a second has passed, the previous payment data becomes inaccessible. Modification of the server code or using an alternative server is prohibited.',
  },
  {
    question: '4. What specific information should each payment entry display?',
    answer:
      "Each payment entry should display the sender's name, receiver's name, amount, and currency.",
  },
  {
    question: '5. How should the search functionality operate?',
    answer:
      'The search bar should dynamically filter payments based on all fields returned by the API, not just the display names, amount, and currency.',
  },
  {
    question: '6. Are there any design requirements for the user interface?',
    answer:
      'Yes, the dashboard should have a reasonably attractive user interface. Utilizing pre-built components from libraries like Bootstrap is acceptable and encouraged to enhance the design.',
  },
  {
    question: '7. How should I handle the payment data on the client side?',
    answer:
      'You need to maintain client-side state to track and display historical payments, ensuring the list updates automatically with new payments. Introducing intermediary servers is not allowed; all operations should be handled within the browser. Persistence of payment data across page refreshes is not required.',
  },
  {
    question: '8. What should be included in the deliverables?',
    answer:
      'You should provide a tarball containing the complete web dashboard application and a README file detailing setup instructions and any notable design decisions.',
  },
  {
    question: '9. How much time is expected to complete this assignment?',
    answer:
      'The assignment is designed to be completed within approximately 5-7 hours. Please manage your time accordingly.',
  },
  {
    question:
      '10. Who should I contact if I have questions during the assignment?',
    answer:
      'If you have any questions about the exercise, please contact your recruiter for assistance.',
  },
]

export const FrequentlyAsked: React.FC = () => {
  return (
    <>
      <Heading>
        <Heading.Label>FAQ</Heading.Label>
        <Heading.Title>Frequently asked questions</Heading.Title>
        <Heading.Body>
          Below, you&#39;ll find a compilation of frequently asked questions
          (FAQs) designed to address common inquiries and provide clarity on
          various topics.
        </Heading.Body>
      </Heading>
      <Faq>
        {faqs.map((faq) => (
          <Faq.Question
            key={faq.question}
            answer={faq.answer}
            question={faq.question}
          />
        ))}
      </Faq>
    </>
  )
}
