import type { GlassVariant, BlurIntensity, OpacityLevel } from './tokens'

export interface Point {
  x: number
  y: number
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface GlassConfig {
  variant: GlassVariant
  intensity: BlurIntensity
  opacity: OpacityLevel
  interactive?: boolean
  adaptiveOpacity?: boolean
  environmentBlending?: boolean
}

export interface LiquidGlassStyles {
  backdropFilter: string
  background: string
  border?: string
  boxShadow?: string
  borderRadius?: string
}

export interface PhysicsConfig {
  tension: number
  friction: number
  mass?: number
  velocity?: number
}

export interface HoverEffectConfig {
  enabled: boolean
  intensity: number
  duration: string
  easing: string
}

export interface DeviceCapabilities {
  supportsBackdropFilter: boolean
  performanceLevel: 'low' | 'medium' | 'high'
  reducedMotion: boolean
}