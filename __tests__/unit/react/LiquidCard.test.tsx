import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders, glass, a11y, performance } from '../../../tools/testing/src'
import { LiquidCard } from '../../../packages/react/src/components/LiquidCard'

describe('LiquidCard', () => {
  it('should render with default props', () => {
    const { container } = renderWithProviders(
      <LiquidCard>Test content</LiquidCard>
    )
    
    const card = container.firstChild as HTMLElement
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('liquid-card')
    expect(card).toHaveTextContent('Test content')
  })

  it('should apply glass effects', () => {
    const { container } = renderWithProviders(
      <LiquidCard variant="frosted" intensity="regular">
        Glass card
      </LiquidCard>
    )
    
    const card = container.firstChild as HTMLElement
    expect(glass.hasBackdropFilter(card)).toBe(true)
    expect(glass.hasGlassOpacity(card)).toBe(true)
  })

  it('should handle interactive props', () => {
    const onHover = vi.fn()
    const { container } = renderWithProviders(
      <LiquidCard interactive hover onHover={onHover}>
        Interactive card
      </LiquidCard>
    )
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('cursor-pointer')
    
    // Test hover
    card.dispatchEvent(new MouseEvent('mouseenter'))
    expect(onHover).toHaveBeenCalledWith(true)
    
    card.dispatchEvent(new MouseEvent('mouseleave'))
    expect(onHover).toHaveBeenCalledWith(false)
  })

  it('should support different variants', () => {
    const variants = ['clear', 'frosted', 'tinted', 'dark'] as const
    
    variants.forEach(variant => {
      const { container } = renderWithProviders(
        <LiquidCard variant={variant}>
          {variant} card
        </LiquidCard>
      )
      
      const card = container.firstChild as HTMLElement
      expect(card).toBeInTheDocument()
      expect(glass.hasBackdropFilter(card)).toBe(true)
    })
  })

  it('should be accessible', () => {
    const { container } = renderWithProviders(
      <LiquidCard role="article" aria-label="Product card">
        Accessible card
      </LiquidCard>
    )
    
    const card = container.firstChild as HTMLElement
    expect(a11y.hasProperAria(card)).toBe(true)
    expect(card).toHaveRole('article')
    expect(card).toHaveAccessibleName('Product card')
  })

  it('should render within performance limits', async () => {
    const renderTime = await performance.measureRender(() => {
      renderWithProviders(
        <LiquidCard interactive>
          Performance test
        </LiquidCard>
      )
    })
    
    // Should render within 16ms (60fps target)
    expect(renderTime).toBeLessThan(16)
  })

  it('should support custom className', () => {
    const { container } = renderWithProviders(
      <LiquidCard className="custom-class">
        Custom styled card
      </LiquidCard>
    )
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('liquid-card')
    expect(card).toHaveClass('custom-class')
  })

  it('should handle mouse physics correctly', () => {
    const { container } = renderWithProviders(
      <LiquidCard interactive>
        Physics card
      </LiquidCard>
    )
    
    const card = container.firstChild as HTMLElement
    const bounds = { x: 0, y: 0, width: 100, height: 100 }
    
    // Test center position (should give maximum refraction)
    const centerRefraction = glass.testPhysics(
      { x: 50, y: 50 }, 
      bounds
    )
    expect(centerRefraction).toBe(1.0)
    
    // Test corner position (should give minimum refraction)
    const cornerRefraction = glass.testPhysics(
      { x: 100, y: 100 }, 
      bounds
    )
    expect(cornerRefraction).toBe(0.0)
  })
})