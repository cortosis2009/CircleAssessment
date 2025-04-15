import { configs } from './index.js'

/** @type {import("eslint").Linter.Config} */
export default [
  ...configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
