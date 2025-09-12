import type { Point, Rect, DeviceCapabilities } from './types'

/**
 * Utility functions for liquid glass calculations and optimizations
 */

/**
 * Calculate distance between two points
 */
export function getDistanceFromCenter(point: Point, bounds: Rect): number {
  const centerX = bounds.x + bounds.width / 2
  const centerY = bounds.y + bounds.height / 2
  
  const deltaX = point.x - centerX
  const deltaY = point.y - centerY
  
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

/**
 * Normalize a value between 0 and 1
 */
export function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (value - min) / (max - min)))
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * Apply easing function to a normalized value (0-1)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Apply Apple's signature easing curve
 */
export function appleEasing(t: number): number {
  // Cubic bezier (0.23, 1, 0.32, 1) approximation
  return t * t * (3 - 2 * t)
}

/**
 * Calculate background luminance for adaptive opacity
 */
export function calculateLuminance(r: number, g: number, b: number): number {
  // Convert to relative luminance using sRGB coefficients
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for smooth animations
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Check if an element is in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Get element bounds relative to viewport
 */
export function getElementBounds(element: Element): Rect {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }
}

/**
 * Convert CSS color string to RGB values
 */
export function parseColor(colorString: string): { r: number; g: number; b: number } | null {
  // Handle rgba/rgb format
  const rgbaMatch = colorString.match(/rgba?\(([^)]+)\)/)
  if (rgbaMatch) {
    const values = rgbaMatch[1].split(',').map(v => parseInt(v.trim(), 10))
    if (values.length >= 3) {
      return { r: values[0], g: values[1], b: values[2] }
    }
  }
  
  // Handle hex format
  const hexMatch = colorString.match(/^#([a-f\d]{6})$/i)
  if (hexMatch) {
    const hex = hexMatch[1]
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }
  
  return null
}

/**
 * Generate CSS custom properties object from tokens
 */
export function generateCSSCustomProperties(tokens: Record<string, any>, prefix = '--liquid'): Record<string, string> {
  const properties: Record<string, string> = {}
  
  function flatten(obj: any, path: string[] = []): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key]
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flatten(value, currentPath)
      } else {
        const propertyName = `${prefix}-${currentPath.join('-')}`
        properties[propertyName] = String(value)
      }
    }
  }
  
  flatten(tokens)
  return properties
}

/**
 * Performance monitor for development
 */
export class PerformanceMonitor {
  private measurements: Map<string, number[]> = new Map()
  
  start(label: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-start`)
    }
  }
  
  end(label: string): number {
    if (typeof performance === 'undefined') return 0
    
    performance.mark(`${label}-end`)
    performance.measure(label, `${label}-start`, `${label}-end`)
    
    const entries = performance.getEntriesByName(label, 'measure')
    if (entries.length > 0) {
      const duration = entries[entries.length - 1].duration
      
      // Store measurement for analysis
      if (!this.measurements.has(label)) {
        this.measurements.set(label, [])
      }
      this.measurements.get(label)!.push(duration)
      
      return duration
    }
    
    return 0
  }
  
  getAverageTime(label: string): number {
    const times = this.measurements.get(label)
    if (!times || times.length === 0) return 0
    
    return times.reduce((sum, time) => sum + time, 0) / times.length
  }
  
  clear(label?: string): void {
    if (label) {
      this.measurements.delete(label)
    } else {
      this.measurements.clear()
    }
  }
}