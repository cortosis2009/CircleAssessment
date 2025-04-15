import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/**
 * Prettier Recommended.
 * @type {import('eslint').Linter.Config}
 */
export const prettierRecommended = {
  ...eslintPluginPrettierRecommended,
}

/**
 * Override Prettier rules.
 * @type {import('eslint').Linter.Config}
 */
export const prettierOverride = {
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        semi: false,
        arrowParens: 'always',
        singleQuote: true,
        proseWrap: 'never',
      },
    ],
  },
}

/**
 * Prettier recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const prettier = [prettierRecommended, prettierOverride]
