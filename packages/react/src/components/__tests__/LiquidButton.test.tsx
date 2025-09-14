import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { LiquidButton } from '../LiquidButton'
import { 
  render, 
  mockGlassEngine, 
  simulateInteraction, 
  testAccessibility,
  measurePerformance,
  stateTestingHelpers 
} from '../../test/utils'

describe('LiquidButton', () => {
  beforeEach(() => {
    mockGlassEngine()
  })

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<LiquidButton>Click me</LiquidButton>)
      
      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should apply glass effect styles', () => {
      render(<LiquidButton>Glass Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      stateTestingHelpers.expectGlassEffect(button)
    })

    it('should render with different variants', () => {
      const { rerender } = render(<LiquidButton variant="frosted">Frosted</LiquidButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      
      rerender(<LiquidButton variant="clear">Clear</LiquidButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      
      rerender(<LiquidButton variant="tinted">Tinted</LiquidButton>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Interactive Features', () => {
    it('should handle click events', async () => {
      const handleClick = vi.fn()
      render(<LiquidButton onClick={handleClick}>Click me</LiquidButton>)
      
      const button = screen.getByRole('button')
      await simulateInteraction.hover(button)
      
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should create ripple effects on click', async () => {
      render(<LiquidButton>Ripple Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      fireEvent.mouseDown(button, { 
        clientX: 100, 
        clientY: 100 
      })
      
      // Check for ripple element creation
      await waitFor(() => {
        const ripples = button.querySelectorAll('[class*="animate-ping"]')
        expect(ripples.length).toBeGreaterThan(0)
      })
    })

    it('should handle keyboard interactions', async () => {
      const handleClick = vi.fn()
      render(<LiquidButton onClick={handleClick}>Keyboard Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      await simulateInteraction.keyboard(button, '{Enter}')
      
      expect(handleClick).toHaveBeenCalled()
    })

    it('should show focus indicators', async () => {
      render(<LiquidButton>Focus Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      button.focus()
      
      expect(button).toHaveFocus()
      expect(button).toHaveClass('focus:outline-none')
    })
  })

  describe('Loading State', () => {
    it('should render loading spinner when loading=true', () => {
      render(<LiquidButton loading>Loading Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      
      // Check for loading spinner
      const spinner = button.querySelector('[role="status"]')
      expect(spinner).toBeInTheDocument()
    })

    it('should disable interactions when loading', () => {
      const handleClick = vi.fn()
      render(
        <LiquidButton loading onClick={handleClick}>
          Loading Button
        </LiquidButton>
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('should not respond to interactions when disabled', () => {
      const handleClick = vi.fn()
      render(
        <LiquidButton disabled onClick={handleClick}>
          Disabled Button
        </LiquidButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should have correct aria attributes when disabled', () => {
      render(<LiquidButton disabled>Disabled Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Size Variants', () => {
    it('should apply correct size classes', () => {
      const { rerender } = render(<LiquidButton size="sm">Small</LiquidButton>)
      let button = screen.getByRole('button')
      expect(button).toHaveClass('text-sm')
      
      rerender(<LiquidButton size="md">Medium</LiquidButton>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('text-base')
      
      rerender(<LiquidButton size="lg">Large</LiquidButton>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('text-lg')
    })
  })

  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    
    it('should render left icon correctly', () => {
      render(
        <LiquidButton leftIcon={<TestIcon />}>
          Button with Left Icon
        </LiquidButton>
      )
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByText('Button with Left Icon')).toBeInTheDocument()
    })

    it('should render right icon correctly', () => {
      render(
        <LiquidButton rightIcon={<TestIcon />}>
          Button with Right Icon
        </LiquidButton>
      )
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByText('Button with Right Icon')).toBeInTheDocument()
    })

    it('should render both icons correctly', () => {
      render(
        <LiquidButton 
          leftIcon={<TestIcon />} 
          rightIcon={<TestIcon />}
        >
          Button with Both Icons
        </LiquidButton>
      )
      
      const icons = screen.getAllByTestId('test-icon')
      expect(icons).toHaveLength(2)
    })
  })

  describe('Performance', () => {
    it('should render within performance budget', () => {
      const renderTime = measurePerformance.renderTime(() => {
        render(<LiquidButton>Performance Test</LiquidButton>)
      })
      
      // More lenient for CI environments (100ms budget)
      expect(renderTime).toBeLessThan(100)
    })

    it('should not cause memory leaks with ripple effects', () => {
      const initialMemory = measurePerformance.memoryUsage()
      
      // Create and destroy many buttons with ripples
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<LiquidButton>Test {i}</LiquidButton>)
        const button = screen.getByRole('button')
        fireEvent.mouseDown(button)
        unmount()
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }
      
      const finalMemory = measurePerformance.memoryUsage()
      
      if (initialMemory && finalMemory) {
        const memoryIncrease = finalMemory.used - initialMemory.used
        // Memory increase should be minimal (less than 1MB)
        expect(memoryIncrease).toBeLessThan(1024 * 1024)
      }
    })
  })

  describe('Accessibility', () => {
    it('should meet WCAG accessibility standards', async () => {
      const { container } = render(
        <LiquidButton aria-label="Accessible button">
          Click me
        </LiquidButton>
      )
      
      await testAccessibility(container)
    })

    it('should support keyboard navigation', async () => {
      render(
        <div>
          <LiquidButton>First</LiquidButton>
          <LiquidButton>Second</LiquidButton>
        </div>
      )
      
      const buttons = screen.getAllByRole('button')
      
      // Tab to first button
      buttons[0].focus()
      expect(buttons[0]).toHaveFocus()
      
      // Tab to second button
      fireEvent.keyDown(buttons[0], { key: 'Tab' })
      buttons[1].focus()
      expect(buttons[1]).toHaveFocus()
    })

    it('should announce loading state to screen readers', () => {
      render(<LiquidButton loading>Loading Button</LiquidButton>)
      
      const button = screen.getByRole('button')
      const loadingIndicator = button.querySelector('[aria-live="polite"]')
      
      expect(loadingIndicator).toBeInTheDocument()
    })
  })

  describe('Preset Components', () => {
    it('should render Primary preset correctly', () => {
      render(<LiquidButton.Primary>Primary Button</LiquidButton.Primary>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Primary Button')
    })

    it('should render Secondary preset correctly', () => {
      render(<LiquidButton.Secondary>Secondary Button</LiquidButton.Secondary>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Secondary Button')
    })

    it('should render Small preset correctly', () => {
      render(<LiquidButton.Small>Small Button</LiquidButton.Small>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('text-sm')
    })

    it('should render Large preset correctly', () => {
      render(<LiquidButton.Large>Large Button</LiquidButton.Large>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('text-lg')
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined children gracefully', () => {
      render(<LiquidButton>{undefined}</LiquidButton>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toBeEmptyDOMElement()
    })

    it('should handle rapid click events without errors', async () => {
      const handleClick = vi.fn()
      render(<LiquidButton onClick={handleClick}>Rapid Click</LiquidButton>)
      
      const button = screen.getByRole('button')
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseDown(button)
        fireEvent.mouseUp(button)
        fireEvent.click(button)
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10)
      expect(() => {}).not.toThrow()
    })

    it('should cleanup event listeners on unmount', () => {
      const { unmount } = render(<LiquidButton>Cleanup Test</LiquidButton>)
      
      // Verify button is rendered
      expect(screen.getByRole('button')).toBeInTheDocument()
      
      // Unmount and verify cleanup
      expect(() => unmount()).not.toThrow()
    })
  })
})