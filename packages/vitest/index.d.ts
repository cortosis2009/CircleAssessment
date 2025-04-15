import type { InlineConfig } from 'vitest/node'

interface VitestConfig {
  /**
   * Inline Test Config.
   */
  test: InlineConfig
}

export declare const withVitestConfig: (config?: VitestConfig) => VitestConfig
