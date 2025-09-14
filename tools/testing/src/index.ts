/**
 * Testing utilities for Liquid UI components
 */

import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Mock CSS.supports for testing environments
if (typeof CSS === 'undefined' || !CSS.supports) {
  global.CSS = {
    supports: (property: string, value: string) => {
      // Mock backdrop-filter support as true for consistent testing
      if (property === 'backdrop-filter') return true
      return false
    }
  } as any
}

// Mock ResizeObserver for testing environments
if (!global.ResizeObserver) {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
}

// Mock MutationObserver for testing environments  
if (!global.MutationObserver) {
  global.MutationObserver = class MutationObserver {
    constructor(callback: MutationCallback) {}
    observe() {}
    disconnect() {}
    takeRecords() { return [] }
  } as any
}

// Custom render function with common providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    ...options,
  })
}

// Performance testing utilities
export const performanceUtils = {
  /**
   * Measure rendering time of a component
   */
  measureRender: async (renderFn: () => void): Promise<number> => {
    const start = globalThis.performance.now()
    renderFn()
    await new Promise(resolve => requestAnimationFrame(resolve))
    const end = globalThis.performance.now()
    return end - start
  },

  /**
   * Test that animations maintain 60fps
   */
  testFrameRate: async (animationFn: () => void, duration = 1000): Promise<boolean> => {
    let frameCount = 0
    const start = globalThis.performance.now()
    
    const animate = () => {
      frameCount++
      animationFn()
      
      if (globalThis.performance.now() - start < duration) {
        requestAnimationFrame(animate)
      }
    }
    
    return new Promise(resolve => {
      requestAnimationFrame(animate)
      setTimeout(() => {
        const actualFPS = frameCount / (duration / 1000)
        resolve(actualFPS >= 58) // Allow slight tolerance for 60fps
      }, duration + 100)
    })
  }
}

// Accessibility testing utilities
export const a11y = {
  /**
   * Check if element has proper ARIA attributes
   */
  hasProperAria: (element: HTMLElement): boolean => {
    const role = element.getAttribute('role')
    const ariaLabel = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby')
    
    return Boolean(role && ariaLabel)
  },

  /**
   * Check if element is keyboard accessible
   */
  isKeyboardAccessible: (element: HTMLElement): boolean => {
    const tabIndex = element.tabIndex
    const isInteractive = ['button', 'link', 'input', 'select', 'textarea'].includes(
      element.tagName.toLowerCase()
    )
    
    return tabIndex >= 0 || isInteractive
  }
}

// Glass effect testing utilities
export const glass = {
  /**
   * Check if element has backdrop-filter applied
   */
  hasBackdropFilter: (element: HTMLElement): boolean => {
    const style = window.getComputedStyle(element)
    return style.backdropFilter !== 'none' && style.backdropFilter !== ''
  },

  /**
   * Check if element has proper glass opacity
   */
  hasGlassOpacity: (element: HTMLElement): boolean => {
    const style = window.getComputedStyle(element)
    const background = style.background || style.backgroundColor
    
    // Check if background includes rgba with alpha < 1
    const rgbaMatch = background.match(/rgba?\([^)]+,\s*([0-9.]+)\)/)
    if (rgbaMatch) {
      const alpha = parseFloat(rgbaMatch[1])
      return alpha > 0 && alpha < 1
    }
    
    return false
  },

  /**
   * Test physics calculations
   */
  testPhysics: (
    mousePos: { x: number; y: number },
    elementBounds: { x: number; y: number; width: number; height: number }
  ): number => {
    const centerX = elementBounds.x + elementBounds.width / 2
    const centerY = elementBounds.y + elementBounds.height / 2
    
    const deltaX = mousePos.x - centerX
    const deltaY = mousePos.y - centerY
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = Math.sqrt(
      (elementBounds.width / 2) ** 2 + (elementBounds.height / 2) ** 2
    )
    
    const normalizedDistance = Math.min(distance / maxDistance, 1)
    
    // Apple's refraction formula: 1.0 - normalizedDist²
    return 1.0 - Math.pow(normalizedDistance, 2)
  }
}

// Export everything for easy importing
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'