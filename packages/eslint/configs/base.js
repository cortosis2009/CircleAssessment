import js from '@eslint/js'
import globals from 'globals'

/**
 * Base Eqeqeq.
 * @type {import('eslint').Linter.Config}
 */
export const baseEqeqeq = {
  // Include the recommended configuration.
  ...js.configs.recommended,

  // Add more configurations.
  files: ['**/*.[jt]s?(x)'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.es2021,
    },
  },
  rules: {
    // Include the recommended ESLint rules.
    ...js.configs.recommended.rules,

    // Require typesafe `===` and `!==` except when comparing against `null`
    // https://eslint.org/docs/latest/rules/eqeqeq
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },
}

/**
 * Base Recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const base = [baseEqeqeq]
