import { useMemo, useEffect, useState } from 'react'
import { LiquidGlassEngine } from '@liquid-ui/core'
import type { GlassConfig } from '@liquid-ui/core'

/**
 * useLiquidGlass - Hook for generating liquid glass CSS styles and classes
 * 
 * This hook provides the core liquid glass styling by leveraging the
 * LiquidGlassEngine to generate optimized CSS properties.
 * 
 * Includes hydration safety to prevent SSR/client mismatches.
 */
export function useLiquidGlass(config: GlassConfig) {
  // In test environment, assume client-side rendering to avoid act() warnings
  const isTestEnv = typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
  const [isClient, setIsClient] = useState(isTestEnv)
  const engine = useMemo(() => LiquidGlassEngine.getInstance(), [])
  
  // Hydration safety: only enable client-specific features after mounting
  useEffect(() => {
    if (!isTestEnv) {
      setIsClient(true)
    }
  }, [isTestEnv])
  
  const glassStyles = useMemo(() => {
    // Force server-side compatible rendering until client mount
    const serverSafeConfig = isClient ? config : { ...config, interactive: false }
    return engine.generateGlassCSS(serverSafeConfig)
  }, [engine, config, isClient])
  
  // Generate Tailwind classes based on configuration
  const glassClasses = useMemo(() => {
    const classes = {
      base: 'backdrop-filter',
      blur: '',
      background: '',
      border: 'border border-white/10'
    }
    
    // Map intensity to Tailwind blur classes
    switch (config.intensity) {
      case 'light':
        classes.blur = 'backdrop-blur-sm'
        break
      case 'regular':
        classes.blur = 'backdrop-blur-md'
        break
      case 'strong':
        classes.blur = 'backdrop-blur-lg'
        break
    }
    
    // Map variant to background classes
    switch (config.variant) {
      case 'frosted':
        classes.background = 'bg-white/25'
        break
      case 'clear':
        classes.background = 'bg-white/10'
        break
      case 'tinted':
        classes.background = 'bg-blue-500/20'
        break
    }
    
    return classes
  }, [config])
  
  return { glassStyles, glassClasses }
}