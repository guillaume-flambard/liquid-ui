/**
 * Shared build configuration for Liquid UI packages
 */
import type { Options } from 'tsup'

export const baseConfig: Options = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom'],
  target: 'es2020',
}

export const packageConfig = (overrides: Partial<Options> = {}): Options => ({
  ...baseConfig,
  ...overrides,
})

export const componentConfig = (overrides: Partial<Options> = {}): Options => ({
  ...baseConfig,
  external: ['react', 'react-dom', '@liquid-ui/core'],
  ...overrides,
})

export const appConfig = (overrides: Partial<Options> = {}): Options => ({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: false,
  splitting: true,
  target: 'es2020',
  ...overrides,
})

// Bundle size limits (in bytes, gzipped)
export const BUNDLE_SIZE_LIMITS = {
  '@liquid-ui/core': 20 * 1024,      // 20kb
  '@liquid-ui/react': 30 * 1024,     // 30kb  
  '@liquid-ui/tokens': 5 * 1024,     // 5kb
  '@liquid-ui/icons': 15 * 1024,     // 15kb
} as const

// Performance targets
export const PERFORMANCE_TARGETS = {
  renderTime: 16,        // 16ms per frame (60fps)
  firstPaint: 100,       // 100ms first paint
  memoryOverhead: 10,    // 10MB max overhead
} as const

export type PackageName = keyof typeof BUNDLE_SIZE_LIMITS