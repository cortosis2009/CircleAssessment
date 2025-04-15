import * as tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import-x'
import globals from 'globals'

/**
 * Recommended import rules.
 * @type {import('eslint').Linter.Config}
 */
export const importRecommended = {
  ...importPlugin.flatConfigs.recommended,
  files: ['**/*.[jt]s?(x)'],
}

/**
 * Recommended import rules for TypeScript.
 * @type {import('eslint').Linter.Config}
 */
export const importTypescript = {
  ...importPlugin.flatConfigs.typescript,
  files: ['**/*.[jt]s?(x)'],
}

/**
 * Override import rules.
 * @type {import('eslint').Linter.Config}
 */
export const importOverride = {
  files: ['**/*.[jt]s?(x)'],
  languageOptions: {
    globals: {
      ...globals.es5,
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // Ensure consistent use of a file extension within the import path
    // https://github.com/antfu/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
    'import-x/extensions': [
      'error',
      'never',
      {
        js: 'ignorePackages',
        json: 'always',
      },
    ],

    // Disallow duplicate imports
    // https://github.com/antfu/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md
    'import-x/no-duplicates': 'error',

    // Reports use of an exported name as the locally imported name of a default export
    // https://github.com/antfu/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default.md
    'import-x/no-named-as-default': 'error',

    // Forbid cyclical dependencies between modules
    // https://github.com/antfu/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md
    'import-x/no-cycle': [
      'error',
      {
        maxDepth: 1,
      },
    ],

    // ensure absolute imports are above relative imports and that unassigned imports are ignored
    // https://github.com/antfu/eslint-plugin-import-x/blob/master/docs/rules/order.md
    'import-x/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],

        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '*.[p]css',

            patternOptions: {
              matchBase: true,
            },

            group: 'type',
            position: 'after',
          },
        ],

        warnOnUnassignedImports: false,
        pathGroupsExcludedImportTypes: ['builtin', 'react'],
        'newlines-between': 'always',

        alphabetize: {
          order: 'asc',
        },
      },
    ],

    // ensure no dev dependency imports in production code
    // https://github.com/antfu/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
    'import-x/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{ts,tsx,js,jsx}',
          '**/*.spec.{ts,tsx,js,jsx}',
          '*.config.{ts,js}',
          'vitest.*.{ts,js}',
        ],
      },
    ],
  },
}

/**
 * Import recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const imports = [importRecommended, importTypescript, importOverride]
