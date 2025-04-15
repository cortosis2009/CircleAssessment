import { tailwindConfig } from '@packages/tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'

export default tailwindConfig({
  content: [
    './**/*.(ts|tsx)',
    '../../features/**/*.(ts|tsx)',
    '../../packages/**/*.(ts|tsx)',
    '!node_modules',
  ],
  plugins: [
    scrollbarHide
  ]
})


