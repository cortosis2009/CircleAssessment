import tailwindPlugin from 'eslint-plugin-tailwindcss'

/**
 * TailwindCSS Recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const tailwindcssRecommended = [
  ...tailwindPlugin.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.[jt]s?(x)'],
  })),
]

/**
 * Override TailwindCSS rules.
 * @type {import('eslint').Linter.Config}
 */
export const tailwindcssOverride = {
  files: ['**/*.[jt]s?(x)'],
  settings: {
    tailwindcss: {
      cssFiles: [
        '**/*.css',
        '!**/node_modules',
        '!**/.*',
        '!**/dist',
        '!**/lib',
        '!**/build',
      ],
    },
  },
  rules: {
    // Detect classnames which do not exist
    // https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-custom-classname.md
    'tailwindcss/no-custom-classname': 'error',

    // Warn about contradictions in the classnames you are attaching to an element.
    // https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-contradicting-classname.md
    'tailwindcss/no-contradicting-classname': 'error',
  },
}

/**
 * TailwindCSS recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const tailwindcss = [...tailwindcssRecommended, tailwindcssOverride]
