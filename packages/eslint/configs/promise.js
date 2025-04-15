import pluginPromise from 'eslint-plugin-promise'

/**
 * Promise Recommended.
 * @type {import('eslint').Linter.Config}
 */
export const promiseRecommended = {
  ...pluginPromise.configs['flat/recommended'],
  files: ['**/*.[tj]s?(x)'],
}

/**
 * Promise recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const promise = [promiseRecommended]
