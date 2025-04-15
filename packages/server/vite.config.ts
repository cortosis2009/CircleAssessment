import { withVitestConfig } from '@packages/vitest'

export default withVitestConfig({
  test: {
    environment: 'node',
  },
})
