// Primitives - Low-level building blocks
export * from './components/primitives'

// Composed Components - High-level components
export * from './components/composed'

// Legacy exports for backward compatibility
export { LiquidCard } from './components/LiquidCard'
export { LiquidButton } from './components/LiquidButton'
export { LiquidInput } from './components/LiquidInput'
export { LiquidModal } from './components/LiquidModal'

// Hooks
export { useLiquidGlass } from './hooks/useLiquidGlass'
export { useInteractiveGlass } from './hooks/useInteractiveGlass'
export { useAdaptiveGlass } from './hooks/useAdaptiveGlass'

// Types (re-export from core + component-specific)
export type {
  GlassConfig,
  GlassVariant,
  BlurIntensity,
  OpacityLevel,
  Point,
  Rect,
  LiquidGlassStyles
} from '@liquid-ui/core'

export type {
  LiquidCardProps,
  LiquidButtonProps,
  LiquidInputProps,
  LiquidModalProps
} from './types'