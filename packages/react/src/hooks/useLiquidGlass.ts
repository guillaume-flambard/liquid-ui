import { useMemo, useEffect, useState } from 'react'
import { LiquidGlassEngine } from '@liquid-ui/core'
import type { GlassConfig } from '@liquid-ui/core'

/**
 * useLiquidGlass - Hook for generating liquid glass CSS styles
 * 
 * This hook provides the core liquid glass styling by leveraging the
 * LiquidGlassEngine to generate optimized CSS properties.
 * 
 * Includes hydration safety to prevent SSR/client mismatches.
 */
export function useLiquidGlass(config: GlassConfig) {
  const [isClient, setIsClient] = useState(false)
  const engine = useMemo(() => LiquidGlassEngine.getInstance(), [])
  
  // Hydration safety: only enable client-specific features after mounting
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const styles = useMemo(() => {
    // Force server-side compatible rendering until client mount
    const serverSafeConfig = isClient ? config : { ...config, interactive: false }
    return engine.generateGlassCSS(serverSafeConfig)
  }, [engine, config, isClient])
  
  return styles
}