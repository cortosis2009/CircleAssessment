'use client'

import type React from 'react'
import { useContext } from 'react'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import { FaqContext } from '../Faq.Context/context'

export interface FaqQuestionProps {
  /**
   * FAQ question.
   */
  question: string
  /**
   * FAQ answer.
   */
  answer: string
}

export const FaqQuestion: React.FC<FaqQuestionProps> = ({
  question,
  answer,
}) => {
  const { onDark } = useContext(FaqContext)

  return (
    <Disclosure as="div" className="py-6 first:pt-0 last:pb-0">
      <dt>
        <DisclosureButton
          className={classNames(
            'group flex w-full items-start justify-between text-left',
            {
              'text-white': onDark,
              'text-gray-900': !onDark,
            },
          )}
        >
          <span className="text-base/7 font-semibold">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            <PlusIcon
              aria-hidden="true"
              className="size-6 group-data-[open]:hidden"
            />
            <MinusIcon
              aria-hidden="true"
              className="size-6 group-[&:not([data-open])]:hidden"
            />
          </span>
        </DisclosureButton>
      </dt>
      <DisclosurePanel as="dd" className="mt-2 pr-12">
        <p
          className={classNames('text-base/7', {
            'text-gray-300': onDark,
            'text-gray-600': !onDark,
          })}
        >
          {answer}
        </p>
      </DisclosurePanel>
    </Disclosure>
  )
}
