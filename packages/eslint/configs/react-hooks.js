import reactHooksPlugins from 'eslint-plugin-react-hooks'

/**
 * React Hooks Recommended.
 * @type {import('eslint').Linter.Config}
 */
export const reactHooksRecommended = {
  files: ['**/*.[jt]s?(x)'],
  plugins: {
    'react-hooks': reactHooksPlugins,
  },
  rules: {
    ...reactHooksPlugins.configs.recommended.rules,

    // Enforce hook dependencies containing all external variables used inside hook
    // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md
    'react-hooks/exhaustive-deps': 'error',
  },
}

/**
 * React Hooks recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const reactHooks = [reactHooksRecommended]
