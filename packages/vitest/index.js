import react from '@vitejs/plugin-react'
import deepmerge from 'deepmerge'

export const withVitestConfig = (config) => {
  return deepmerge.all([
    {
      plugins: [react()],
      test: {
        globals: true,
        clearMocks: true,
        setupFiles: ['@packages/vitest/setup/index.ts'],
      },
    },
    config,
  ])
}
