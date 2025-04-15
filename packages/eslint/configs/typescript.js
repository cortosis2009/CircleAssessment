import { configs } from 'typescript-eslint'

/**
 * TypeScript Recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const typescriptRecommended = [
  ...configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts?(x)'],
  })),
]

/**
 * Override TypeScript rules.
 * @type {import('eslint').Linter.Config}
 */
export const typescriptOverride = {
  files: ['**/*.ts?(x)'],
  languageOptions: {
    // parserOptions: {
    //   project: 'tsconfig.json',
    // },
    parserOptions: {
      ecmaVersion: 'latest',
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname, // use __dirname for older Node.js versions
    },
  },
  rules: {
    // Disallow the `any` type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-explicit-any.mdx
    '@typescript-eslint/no-explicit-any': 'error',

    // Enforce consistent usage of type imports.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-imports.mdx
    '@typescript-eslint/consistent-type-imports': 'error',

    // Require explicit return types on functions and class methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.mdx
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Forbids usage of non-boolean types in expressions where a boolean is expected.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/strict-boolean-expressions.mdx
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: true,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],

    // Enforcing naming conventions to keep the codebase consistent.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.mdx
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
        filter: {
          regex: '^__typename$', // Exceptions should be placed here like this: ^(Property-Name-One|Property-Name-Two)$
          match: false,
        },
      },
    ],

    // Enforce unbound methods are called with their expected scope.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.mdx
    '@typescript-eslint/unbound-method': [
      'warn',
      {
        ignoreStatic: true,
      },
    ],

    // Disallow unused variables.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.mdx
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Check for unnecessary conditions such as optional chaining
    // https://typescript-eslint.io/rules/no-unnecessary-condition/
    '@typescript-eslint/no-unnecessary-condition': 'error',
  },
}

/**
 * TypeScript on Test files.
 * @type {import('eslint').Linter.Config}
 */
export const typescriptTest = {
  files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  rules: {
    // Turn off enforcing unbound methods for unit tests.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.mdx
    '@typescript-eslint/unbound-method': 'off',
  },
}

/**
 * TypeScript on JavaScript files.
 * @type {import('eslint').Linter.Config}
 */
export const typescriptJavaScript = {
  ...configs.disableTypeChecked,
  files: ['**/*.js'],
}

/**
 * TypeScript recommended.
 * @type {import('eslint').Linter.Config[]}
 */
export const typescript = [
  ...typescriptRecommended,
  typescriptOverride,
  typescriptTest,
  typescriptJavaScript,
]
