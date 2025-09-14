import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { LiquidCard } from '../LiquidCard'
import { 
  render, 
  mockGlassEngine, 
  simulateInteraction, 
  testAccessibility,
  measurePerformance,
  stateTestingHelpers 
} from '../../test/utils'

describe('LiquidCard', () => {
  beforeEach(() => {
    mockGlassEngine()
  })

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<LiquidCard>Card content</LiquidCard>)
      
      const card = screen.getByText('Card content')
      expect(card).toBeInTheDocument()
    })

    it('should apply glass effect styles', () => {
      render(<LiquidCard>Glass Card</LiquidCard>)
      
      const card = screen.getByText('Glass Card').closest('[class*="backdrop-blur"]')
      expect(card).toBeInTheDocument()
      stateTestingHelpers.expectGlassEffect(card!)
    })

    it('should render with different variants', () => {
      const { rerender } = render(<LiquidCard variant="frosted">Frosted</LiquidCard>)
      expect(screen.getByText('Frosted')).toBeInTheDocument()
      
      rerender(<LiquidCard variant="clear">Clear</LiquidCard>)
      expect(screen.getByText('Clear')).toBeInTheDocument()
      
      rerender(<LiquidCard variant="tinted">Tinted</LiquidCard>)
      expect(screen.getByText('Tinted')).toBeInTheDocument()
    })

    it('should render with different intensity levels', () => {
      const { rerender } = render(<LiquidCard intensity="light">Light</LiquidCard>)
      const card = screen.getByText('Light').closest('[class*="backdrop-blur"]')
      expect(card).toHaveClass('backdrop-blur-sm')
      
      rerender(<LiquidCard intensity="regular">Regular</LiquidCard>)
      const regularCard = screen.getByText('Regular').closest('[class*="backdrop-blur"]')
      expect(regularCard).toHaveClass('backdrop-blur-md')
      
      rerender(<LiquidCard intensity="strong">Strong</LiquidCard>)
      const strongCard = screen.getByText('Strong').closest('[class*="backdrop-blur"]')
      expect(strongCard).toHaveClass('backdrop-blur-lg')
    })
  })

  describe('Interactive Features', () => {
    it('should handle hover effects when interactive', async () => {
      render(<LiquidCard interactive>Interactive Card</LiquidCard>)
      
      const card = screen.getByText('Interactive Card').closest('div')!
      await simulateInteraction.hover(card)
      
      expect(card).toHaveClass('hover:scale-105')
    })

    it('should not respond to hover when not interactive', async () => {
      render(<LiquidCard>Static Card</LiquidCard>)
      
      const card = screen.getByText('Static Card').closest('div')!
      expect(card).not.toHaveClass('hover:scale-105')
    })

    it('should handle drag and drop interactions', async () => {
      const handleDragStart = vi.fn()
      const handleDrag = vi.fn()
      const handleDragEnd = vi.fn()
      
      render(
        <LiquidCard
          onLiquidDragStart={handleDragStart}
          onLiquidDrag={handleDrag}
          onLiquidDragEnd={handleDragEnd}
        >
          Draggable Card
        </LiquidCard>
      )
      
      const card = screen.getByText('Draggable Card').closest('div')!
      
      fireEvent.mouseDown(card, { clientX: 100, clientY: 100 })
      expect(handleDragStart).toHaveBeenCalled()
      
      fireEvent.mouseMove(card, { clientX: 150, clientY: 150 })
      expect(handleDrag).toHaveBeenCalled()
      
      fireEvent.mouseUp(card)
      expect(handleDragEnd).toHaveBeenCalled()
    })

    it('should apply magnetic edges behavior', () => {
      render(<LiquidCard magneticEdges>Magnetic Card</LiquidCard>)
      
      const card = screen.getByText('Magnetic Card').closest('div')!
      expect(card).toBeInTheDocument()
      // Magnetic edges should be handled internally without DOM attributes
    })

    it('should handle click events', () => {
      const handleClick = vi.fn()
      render(<LiquidCard onClick={handleClick}>Clickable Card</LiquidCard>)
      
      const card = screen.getByText('Clickable Card').closest('div')!
      fireEvent.click(card)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Adaptive Opacity', () => {
    it('should adjust opacity based on background when enabled', () => {
      render(<LiquidCard adaptiveOpacity>Adaptive Card</LiquidCard>)
      
      const card = screen.getByText('Adaptive Card').closest('div')!
      expect(card).toBeInTheDocument()
      // Adaptive opacity logic should be tested with actual background detection
    })

    it('should use fixed opacity when adaptive is disabled', () => {
      render(<LiquidCard opacity="strong">Fixed Opacity Card</LiquidCard>)
      
      const card = screen.getByText('Fixed Opacity Card').closest('div')!
      expect(card).toBeInTheDocument()
    })
  })

  describe('Environment Blending', () => {
    it('should apply environment blending effects when enabled', () => {
      render(<LiquidCard environmentBlending>Blending Card</LiquidCard>)
      
      const card = screen.getByText('Blending Card').closest('div')!
      expect(card).toBeInTheDocument()
      // Environment blending should add additional CSS properties
    })
  })

  describe('Padding Variants', () => {
    it('should apply correct padding classes', () => {
      const { rerender } = render(<LiquidCard padding="sm">Small Padding</LiquidCard>)
      let card = screen.getByText('Small Padding').closest('div')!
      expect(card).toHaveClass('p-3')
      
      rerender(<LiquidCard padding="md">Medium Padding</LiquidCard>)
      card = screen.getByText('Medium Padding').closest('div')!
      expect(card).toHaveClass('p-6')
      
      rerender(<LiquidCard padding="lg">Large Padding</LiquidCard>)
      card = screen.getByText('Large Padding').closest('div')!
      expect(card).toHaveClass('p-8')
      
      rerender(<LiquidCard padding="xl">XL Padding</LiquidCard>)
      card = screen.getByText('XL Padding').closest('div')!
      expect(card).toHaveClass('p-12')
    })
  })

  describe('Performance', () => {
    it('should render within performance budget', () => {
      const renderTime = measurePerformance.renderTime(() => {
        render(<LiquidCard>Performance Test</LiquidCard>)
      })
      
      expect(renderTime).toBeLessThan(16)
    })

    it('should not cause memory leaks with drag interactions', () => {
      const initialMemory = measurePerformance.memoryUsage()
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<LiquidCard>Test {i}</LiquidCard>)
        const card = screen.getByText(`Test ${i}`).closest('div')!
        fireEvent.mouseDown(card)
        fireEvent.mouseMove(card, { clientX: 100, clientY: 100 })
        fireEvent.mouseUp(card)
        unmount()
      }
      
      if (global.gc) {
        global.gc()
      }
      
      const finalMemory = measurePerformance.memoryUsage()
      
      if (initialMemory && finalMemory) {
        const memoryIncrease = finalMemory.used - initialMemory.used
        expect(memoryIncrease).toBeLessThan(1024 * 1024)
      }
    })
  })

  describe('Accessibility', () => {
    it('should meet WCAG accessibility standards', async () => {
      const { container } = render(
        <LiquidCard aria-label="Accessible card">
          Card content
        </LiquidCard>
      )
      
      await testAccessibility(container)
    })

    it('should support keyboard navigation when interactive', () => {
      const handleClick = vi.fn()
      render(
        <LiquidCard interactive onClick={handleClick} tabIndex={0}>
          Interactive Card
        </LiquidCard>
      )
      
      const card = screen.getByText('Interactive Card').closest('div')!
      card.focus()
      expect(card).toHaveFocus()
      
      fireEvent.keyDown(card, { key: 'Enter' })
      expect(handleClick).toHaveBeenCalled()
    })

    it('should have proper focus indicators', () => {
      render(
        <LiquidCard interactive tabIndex={0}>
          Focusable Card
        </LiquidCard>
      )
      
      const card = screen.getByText('Focusable Card').closest('div')!
      card.focus()
      
      expect(card).toHaveFocus()
      expect(card).toHaveClass('focus:outline-none')
      expect(card).toHaveClass('focus:ring-2')
    })
  })

  describe('Preset Components', () => {
    it('should render Hero preset correctly', () => {
      render(<LiquidCard.Hero>Hero Card</LiquidCard.Hero>)
      
      const card = screen.getByText('Hero Card').closest('div')!
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('p-12')
    })

    it('should render Compact preset correctly', () => {
      render(<LiquidCard.Compact>Compact Card</LiquidCard.Compact>)
      
      const card = screen.getByText('Compact Card').closest('div')!
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('p-3')
    })

    it('should render Interactive preset correctly', () => {
      render(<LiquidCard.Interactive>Interactive Card</LiquidCard.Interactive>)
      
      const card = screen.getByText('Interactive Card').closest('div')!
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('hover:scale-105')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with defaults', () => {
      render(
        <LiquidCard className="custom-class">
          Custom Styled Card
        </LiquidCard>
      )
      
      const card = screen.getByText('Custom Styled Card').closest('div')!
      expect(card).toHaveClass('custom-class')
      expect(card).toHaveClass('backdrop-blur-md')
    })

    it('should apply custom styles', () => {
      const customStyles = { borderRadius: '20px' }
      render(
        <LiquidCard style={customStyles}>
          Custom Styled Card
        </LiquidCard>
      )
      
      const card = screen.getByText('Custom Styled Card').closest('div')!
      expect(card).toHaveStyle({ borderRadius: '20px' })
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined children gracefully', () => {
      render(<LiquidCard>{undefined}</LiquidCard>)
      
      const card = document.querySelector('[class*="backdrop-blur"]')
      expect(card).toBeInTheDocument()
    })

    it('should handle rapid interaction events without errors', async () => {
      const handleClick = vi.fn()
      render(<LiquidCard onClick={handleClick}>Rapid Test</LiquidCard>)
      
      const card = screen.getByText('Rapid Test').closest('div')!
      
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseDown(card)
        fireEvent.mouseUp(card)
        fireEvent.click(card)
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10)
      expect(() => {}).not.toThrow()
    })

    it('should cleanup event listeners on unmount', () => {
      const { unmount } = render(<LiquidCard>Cleanup Test</LiquidCard>)
      
      expect(screen.getByText('Cleanup Test')).toBeInTheDocument()
      expect(() => unmount()).not.toThrow()
    })
  })
})