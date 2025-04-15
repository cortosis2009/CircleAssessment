import globals from 'globals'

import { base } from './configs/base.js'
import { imports } from './configs/import.js'
import { prettier } from './configs/prettier.js'
import { promise } from './configs/promise.js'
import { reactHooks } from './configs/react-hooks.js'
import { react } from './configs/react.js'
import { tailwindcss } from './configs/tailwindcss.js'
import { typescript } from './configs/typescript.js'
import { vitest } from './configs/vitest.js'

export const configs = {
  /**
   * Circle ESLint Configs.
   * @type {import('eslint').Linter.Config[]}
   */
  recommended: [
    ...base,
    ...imports,
    ...prettier,
    ...promise,
    ...react,
    ...reactHooks,
    ...tailwindcss,
    ...typescript,
    ...vitest,
    {
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2021,
        },
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    {
      ignores: [
        '/node_modules/',
        '.turbo',
        '.next',
        '.swc',
        'build',
        'dist',
        'out',
      ],
    },
  ],
}
