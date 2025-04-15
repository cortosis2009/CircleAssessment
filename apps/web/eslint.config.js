import { configs } from '@packages/eslint'

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import("eslint").Linter.Config[]} */
export default [...configs.recommended, ...compat.config({
  extends: ['plugin:@next/next/recommended']
})]
