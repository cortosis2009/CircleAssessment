import vitestPlugin from '@vitest/eslint-plugin'
import testingLibrary from 'eslint-plugin-testing-library'

/**
 * Vitest Recommended.
 * @type {import('eslint').Linter.Config}
 */
export const vitestRecommended = {
  ...vitestPlugin.configs.recommended,
  files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}

/**
 * Vitest React.
 * @type {import('eslint').Linter.Config}
 */
export const vitestReact = {
  ...testingLibrary.configs['flat/react'],
  files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}

/**
 * Override Vitest rules.
 * @type {import('eslint').Linter.Config}
 */
export const vitestOverride = {
  files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  rules: {
    // Prefer using userEvent over fireEvent for simulating user interactions
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md
    'testing-library/prefer-user-event': 'error',
  },
}

/**
 * Vitest recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const vitest = [vitestRecommended, vitestReact, vitestOverride]
