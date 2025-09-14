import React, { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { vi } from 'vitest'

// Add jest-axe matcher
expect.extend(toHaveNoViolations)

// Default liquid configuration for testing
const testLiquidConfig = {
  variant: 'frosted' as const,
  intensity: 'regular' as const,
  opacity: 'regular' as const,
  interactive: true,
  adaptiveOpacity: false,
  environmentBlending: false,
}

// Test wrapper component that provides liquid context
interface LiquidTestProviderProps {
  children: ReactNode
  config?: Partial<typeof testLiquidConfig>
}

const LiquidTestProvider = ({ children, config = {} }: LiquidTestProviderProps) => {
  const mergedConfig = { ...testLiquidConfig, ...config }
  
  return (
    <div data-testid="liquid-test-provider" data-config={JSON.stringify(mergedConfig)}>
      {children}
    </div>
  )
}

// Custom render function with liquid provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  liquidConfig?: Partial<typeof testLiquidConfig>
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { liquidConfig, ...renderOptions } = options
  
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <LiquidTestProvider config={liquidConfig}>
      {children}
    </LiquidTestProvider>
  )

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

// Mock glass engine for consistent testing
export const mockGlassEngine = () => {
  const mockStyles = {
    backdropFilter: 'blur(12px)',
    background: 'rgba(255, 255, 255, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  }

  vi.mock('@liquid-ui/core', () => ({
    LiquidGlassEngine: {
      getInstance: () => ({
        generateGlassCSS: vi.fn().mockReturnValue(mockStyles),
        calculateRefraction: vi.fn().mockReturnValue(0.5),
        getAdaptiveBackground: vi.fn().mockReturnValue('rgba(255, 255, 255, 0.25)')
      })
    },
    liquidTokens: {
      colors: {
        light: {
          systemBlue: 'rgb(0, 122, 255)',
          glassMaterial: 'rgba(255, 255, 255, 0.25)'
        }
      },
      glass: {
        frosted: {
          blur: '12px',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }
      },
      physics: {
        easing: {
          standard: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        },
        duration: {
          normal: '0.25s'
        }
      }
    }
  }))

  return mockStyles
}

// Simulate interactive behaviors
export const simulateInteraction = {
  hover: async (element: HTMLElement) => {
    const user = userEvent.setup()
    await user.hover(element)
  },
  
  unhover: async (element: HTMLElement) => {
    const user = userEvent.setup()
    await user.unhover(element)
  },
  
  drag: async (element: HTMLElement, options: { x: number; y: number }) => {
    const user = userEvent.setup()
    await user.pointer([
      { keys: '[MouseLeft>]', target: element },
      { coords: { x: options.x, y: options.y } }
    ])
  },
  
  keyboard: async (element: HTMLElement, key: string) => {
    const user = userEvent.setup()
    element.focus()
    await user.keyboard(key)
  }
}

// Accessibility testing utilities
export const testAccessibility = async (container: HTMLElement) => {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
  
  return results
}

// Performance testing utilities
export const measurePerformance = {
  renderTime: (renderFn: () => void) => {
    const start = performance.now()
    renderFn()
    const end = performance.now()
    return end - start
  },
  
  memoryUsage: () => {
    if (performance.memory) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      }
    }
    return null
  }
}

// Visual regression testing helpers
export const visualTestingHelpers = {
  captureComponent: (element: HTMLElement) => {
    // Mock implementation for visual testing
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      styles: window.getComputedStyle(element)
    }
  },
  
  compareSnapshots: (current: any, baseline: any) => {
    // Mock implementation for snapshot comparison
    return {
      isMatch: JSON.stringify(current) === JSON.stringify(baseline),
      difference: 0
    }
  }
}

// Component state testing utilities
export const stateTestingHelpers = {
  expectGlassEffect: (element: HTMLElement) => {
    const styles = window.getComputedStyle(element)
    expect(styles.backdropFilter).toMatch(/blur\(\d+px\)/)
    expect(styles.background).toMatch(/rgba?\(/)
  },
  
  expectInteractiveState: (element: HTMLElement, isInteractive: boolean) => {
    if (isInteractive) {
      expect(element).toHaveStyle('cursor: pointer')
    } else {
      expect(element).not.toHaveStyle('cursor: pointer')
    }
  }
}

// Export everything
export * from '@testing-library/react'
export { customRender as render, userEvent }
export { axe, toHaveNoViolations }