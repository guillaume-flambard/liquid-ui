import { describe, it, expect, beforeEach } from 'vitest'
import { LiquidGlassEngine } from '../../../packages/core/src/engine'
import type { Point, Rect, GlassConfig } from '../../../packages/core/src/types'

describe('LiquidGlassEngine', () => {
  let engine: LiquidGlassEngine

  beforeEach(() => {
    engine = LiquidGlassEngine.getInstance()
  })

  describe('calculateRefraction', () => {
    it('should return 1.0 when mouse is at center', () => {
      const mousePosition: Point = { x: 50, y: 50 }
      const elementBounds: Rect = { x: 0, y: 0, width: 100, height: 100 }
      
      const refraction = engine.calculateRefraction(mousePosition, elementBounds)
      
      expect(refraction).toBe(1.0)
    })

    it('should return 0.0 when mouse is at maximum distance', () => {
      const mousePosition: Point = { x: 100, y: 100 }
      const elementBounds: Rect = { x: 0, y: 0, width: 100, height: 100 }
      
      const refraction = engine.calculateRefraction(mousePosition, elementBounds)
      
      expect(refraction).toBe(0.0)
    })

    it('should follow Apple\'s formula: 1.0 - normalizedDist²', () => {
      const mousePosition: Point = { x: 75, y: 50 }
      const elementBounds: Rect = { x: 0, y: 0, width: 100, height: 100 }
      
      const refraction = engine.calculateRefraction(mousePosition, elementBounds)
      
      // Calculate expected value manually
      const centerX = 50, centerY = 50
      const distance = Math.sqrt((75 - centerX) ** 2 + (50 - centerY) ** 2) // 25
      const maxDistance = Math.sqrt((50) ** 2 + (50) ** 2) // ~70.71
      const normalizedDistance = distance / maxDistance // ~0.354
      const expected = 1.0 - Math.pow(normalizedDistance, 2) // ~0.875
      
      expect(refraction).toBeCloseTo(expected, 3)
    })
  })

  describe('generateGlassCSS', () => {
    it('should generate proper CSS properties', () => {
      const config: GlassConfig = {
        variant: 'frosted',
        intensity: 'regular',
        opacity: 'regular',
        interactive: true,
        adaptiveOpacity: false,
        environmentBlending: false
      }
      
      const styles = engine.generateGlassCSS(config)
      
      expect(styles.backdropFilter).toBe('blur(12px)')
      expect(styles.background).toContain('rgba')
    })

    it('should provide fallbacks for unsupported browsers', () => {
      // Mock unsupported backdrop-filter
      const originalSupports = CSS.supports
      CSS.supports = () => false
      
      const config: GlassConfig = {
        variant: 'frosted',
        intensity: 'regular',
        opacity: 'regular',
        interactive: false,
        adaptiveOpacity: false,
        environmentBlending: false
      }
      
      const styles = engine.generateGlassCSS(config)
      
      expect(styles.background).toContain('rgba')
      
      // Restore original
      CSS.supports = originalSupports
    })
  })
})