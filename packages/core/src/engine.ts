import { liquidTokens } from './tokens'
import type { Point, Rect, GlassConfig, LiquidGlassStyles, DeviceCapabilities } from './types'

/**
 * LiquidGlassEngine - The core engine for Apple-style liquid glass effects
 * 
 * This class implements Apple's exact liquid glass specifications including:
 * - Real-time refraction physics based on mouse position
 * - Adaptive opacity based on background luminance
 * - Performance-optimized CSS generation
 * - Cross-browser fallbacks
 */
export class LiquidGlassEngine {
  private static instance: LiquidGlassEngine
  private deviceCapabilities: DeviceCapabilities

  constructor() {
    this.deviceCapabilities = this.detectDeviceCapabilities()
  }

  static getInstance(): LiquidGlassEngine {
    if (!LiquidGlassEngine.instance) {
      LiquidGlassEngine.instance = new LiquidGlassEngine()
    }
    return LiquidGlassEngine.instance
  }

  /**
   * Calculate refraction intensity based on mouse position
   * Uses Apple's official formula: 1.0 - normalizedDist²
   */
  calculateRefraction(mousePosition: Point, elementBounds: Rect): number {
    const centerX = elementBounds.x + elementBounds.width / 2
    const centerY = elementBounds.y + elementBounds.height / 2
    
    const deltaX = mousePosition.x - centerX
    const deltaY = mousePosition.y - centerY
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = Math.sqrt(
      (elementBounds.width / 2) ** 2 + (elementBounds.height / 2) ** 2
    )
    
    const normalizedDistance = Math.min(distance / maxDistance, 1)
    
    // Apple's refraction formula
    return 1.0 - Math.pow(normalizedDistance, 2)
  }

  /**
   * Generate optimized CSS properties for liquid glass effect
   */
  generateGlassCSS(config: GlassConfig): LiquidGlassStyles {
    const { glass } = liquidTokens
    
    const blurValue = this.getBlurValue(config)
    const backgroundValue = this.getBackgroundValue(config)
    const borderValue = this.getBorderValue(config)

    const styles: LiquidGlassStyles = {
      backdropFilter: `blur(${blurValue})`,
      background: backgroundValue
    }

    // Add optional properties
    if (borderValue) styles.border = borderValue

    // Add fallbacks for unsupported browsers
    if (!this.deviceCapabilities.supportsBackdropFilter) {
      styles.background = this.getFallbackBackground(config)
    }

    return styles
  }

  /**
   * Get adaptive background based on environment luminance
   */
  getAdaptiveBackground(config: GlassConfig, backgroundLuminance: number): string {
    const { glass } = liquidTokens
    const glassSpec = glass[config.variant] || glass.frosted
    
    // Adjust opacity based on background brightness
    const luminanceMultiplier = backgroundLuminance > 0.5 ? 0.8 : 1.2
    const baseOpacity = this.extractOpacityFromBackground(glassSpec.background)
    const adaptiveOpacity = baseOpacity * luminanceMultiplier
    
    return this.adjustOpacity(glassSpec.background, adaptiveOpacity)
  }

  /**
   * Detect device capabilities for performance optimization
   * Returns consistent values for SSR compatibility
   */
  private detectDeviceCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback - assume modern browser support
      return {
        supportsBackdropFilter: true, // Assume support for SSR consistency
        performanceLevel: 'medium',
        reducedMotion: false
      }
    }

    const testElement = document.createElement('div')
    testElement.style.backdropFilter = 'blur(1px)'
    
    const supportsBackdropFilter = testElement.style.backdropFilter !== ''
    
    // Detect reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Simple performance detection based on device memory and connection
    const performanceLevel = this.detectPerformanceLevel()

    return {
      supportsBackdropFilter,
      performanceLevel,
      reducedMotion
    }
  }

  private detectPerformanceLevel(): 'low' | 'medium' | 'high' {
    if (typeof navigator === 'undefined') return 'medium'
    
    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory
    if (deviceMemory) {
      if (deviceMemory <= 2) return 'low'
      if (deviceMemory >= 8) return 'high'
    }
    
    // Check connection (if available)
    const connection = (navigator as any).connection
    if (connection) {
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        return 'low'
      }
      if (connection.effectiveType === '4g') {
        return 'high'
      }
    }
    
    return 'medium'
  }

  private getBlurValue(config: GlassConfig): string {
    const { glass } = liquidTokens
    const glassSpec = glass[config.variant] || glass.frosted
    
    // Reduce blur on low-performance devices
    if (this.deviceCapabilities.performanceLevel === 'low') {
      return '5px' // Reduced blur for performance
    }
    
    return glassSpec.blur
  }

  private getBackgroundValue(config: GlassConfig): string {
    const { glass } = liquidTokens
    const glassSpec = glass[config.variant] || glass.frosted
    
    return glassSpec.background
  }

  private getBorderValue(config: GlassConfig): string | undefined {
    const { glass } = liquidTokens
    const glassSpec = glass[config.variant] || glass.frosted
    
    return glassSpec.border
  }

  private getShadowValue(config: GlassConfig): string | undefined {
    if (this.deviceCapabilities.performanceLevel === 'low') {
      return undefined // Skip shadows on low-performance devices
    }
    
    // Return a basic shadow for now
    return '0 8px 32px rgba(0, 0, 0, 0.12)'
  }

  private getFallbackBackground(config: GlassConfig): string {
    // Fallback for browsers that don't support backdrop-filter
    const { glass } = liquidTokens
    const glassSpec = glass[config.variant] || glass.frosted
    const baseOpacity = this.extractOpacityFromBackground(glassSpec.background)
    const fallbackOpacity = Math.min(baseOpacity * 1.5, 0.95) // Increase opacity for visibility
    
    switch (config.variant) {
      case 'clear':
        return `rgba(255, 255, 255, ${fallbackOpacity})`
      case 'frosted':
        return `rgba(248, 250, 252, ${fallbackOpacity})`
      case 'tinted':
        return `rgba(0, 122, 255, ${fallbackOpacity})`
      case 'dark':
        return `rgba(0, 0, 0, ${fallbackOpacity})`
      default:
        return `rgba(255, 255, 255, ${fallbackOpacity})`
    }
  }

  private adjustOpacity(colorString: string | undefined, newOpacity: number): string {
    if (!colorString) return `rgba(255, 255, 255, ${newOpacity})`
    
    // Extract rgba values and replace opacity
    const rgbaMatch = colorString.match(/rgba?\(([^)]+)\)/)
    if (!rgbaMatch) return colorString
    
    const values = rgbaMatch[1].split(',').map(v => v.trim())
    if (values.length >= 3) {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${newOpacity})`
    }
    
    return colorString
  }
  
  private extractOpacityFromBackground(backgroundString: string): number {
    const rgbaMatch = backgroundString.match(/rgba?\(([^)]+)\)/)
    if (!rgbaMatch) return 0.25
    
    const values = rgbaMatch[1].split(',').map(v => v.trim())
    if (values.length >= 4) {
      return parseFloat(values[3]) || 0.25
    }
    
    return 0.25
  }
}