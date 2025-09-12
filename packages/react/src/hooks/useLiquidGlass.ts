import { useMemo } from 'react'
import { LiquidGlassEngine } from '@liquid-ui/core'
import type { GlassConfig } from '@liquid-ui/core'

/**
 * useLiquidGlass - Hook for generating liquid glass CSS styles
 * 
 * This hook provides the core liquid glass styling by leveraging the
 * LiquidGlassEngine to generate optimized CSS properties.
 */
export function useLiquidGlass(config: GlassConfig) {
  const engine = useMemo(() => LiquidGlassEngine.getInstance(), [])
  
  const styles = useMemo(() => {
    return engine.generateGlassCSS(config)
  }, [engine, config])
  
  return styles
}