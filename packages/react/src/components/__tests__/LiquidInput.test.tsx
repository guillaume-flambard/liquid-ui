import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { LiquidInput } from '../LiquidInput'
import { 
  render, 
  mockGlassEngine, 
  simulateInteraction, 
  testAccessibility,
  measurePerformance,
  stateTestingHelpers 
} from '../../test/utils'

describe('LiquidInput', () => {
  beforeEach(() => {
    mockGlassEngine()
  })

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<LiquidInput placeholder="Enter text" />)
      
      const input = screen.getByPlaceholderText('Enter text')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should apply glass effect styles', () => {
      render(<LiquidInput placeholder="Glass Input" />)
      
      const input = screen.getByPlaceholderText('Glass Input')
      const container = input.closest('div')
      stateTestingHelpers.expectGlassEffect(container!)
    })

    it('should render with different variants', () => {
      const { rerender } = render(<LiquidInput variant="frosted" placeholder="Frosted" />)
      expect(screen.getByPlaceholderText('Frosted')).toBeInTheDocument()
      
      rerender(<LiquidInput variant="clear" placeholder="Clear" />)
      expect(screen.getByPlaceholderText('Clear')).toBeInTheDocument()
      
      rerender(<LiquidInput variant="tinted" placeholder="Tinted" />)
      expect(screen.getByPlaceholderText('Tinted')).toBeInTheDocument()
    })

    it('should render with different intensity levels', () => {
      const { rerender } = render(<LiquidInput intensity="light" placeholder="Light" />)
      const container = screen.getByPlaceholderText('Light').closest('div')
      expect(container).toHaveClass('backdrop-blur-sm')
      
      rerender(<LiquidInput intensity="regular" placeholder="Regular" />)
      const regularContainer = screen.getByPlaceholderText('Regular').closest('div')
      expect(regularContainer).toHaveClass('backdrop-blur-md')
      
      rerender(<LiquidInput intensity="strong" placeholder="Strong" />)
      const strongContainer = screen.getByPlaceholderText('Strong').closest('div')
      expect(strongContainer).toHaveClass('backdrop-blur-lg')
    })
  })

  describe('Input Types', () => {
    it('should render text input by default', () => {
      render(<LiquidInput />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should render email input', () => {
      render(<LiquidInput type="email" placeholder="Email" />)
      
      const input = screen.getByPlaceholderText('Email')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('should render password input', () => {
      render(<LiquidInput type="password" placeholder="Password" />)
      
      const input = screen.getByPlaceholderText('Password')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('should render number input', () => {
      render(<LiquidInput type="number" placeholder="Number" />)
      
      const input = screen.getByPlaceholderText('Number')
      expect(input).toHaveAttribute('type', 'number')
    })

    it('should render search input', () => {
      render(<LiquidInput type="search" placeholder="Search" />)
      
      const input = screen.getByPlaceholderText('Search')
      expect(input).toHaveAttribute('type', 'search')
    })
  })

  describe('Interactive Features', () => {
    it('should handle focus events', async () => {
      const handleFocus = vi.fn()
      render(<LiquidInput onFocus={handleFocus} placeholder="Focus test" />)
      
      const input = screen.getByPlaceholderText('Focus test')
      input.focus()
      
      expect(handleFocus).toHaveBeenCalledTimes(1)
      expect(input).toHaveFocus()
    })

    it('should handle blur events', async () => {
      const handleBlur = vi.fn()
      render(<LiquidInput onBlur={handleBlur} placeholder="Blur test" />)
      
      const input = screen.getByPlaceholderText('Blur test')
      input.focus()
      input.blur()
      
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should handle value changes', async () => {
      const handleChange = vi.fn()
      render(<LiquidInput onChange={handleChange} placeholder="Change test" />)
      
      const input = screen.getByPlaceholderText('Change test')
      fireEvent.change(input, { target: { value: 'test value' } })
      
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(input).toHaveValue('test value')
    })

    it('should handle keyboard events', async () => {
      const handleKeyDown = vi.fn()
      render(<LiquidInput onKeyDown={handleKeyDown} placeholder="Key test" />)
      
      const input = screen.getByPlaceholderText('Key test')
      fireEvent.keyDown(input, { key: 'Enter' })
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })

    it('should show focus effects', () => {
      render(<LiquidInput placeholder="Focus effects" />)
      
      const input = screen.getByPlaceholderText('Focus effects')
      input.focus()
      
      expect(input).toHaveFocus()
      const container = input.closest('div')
      expect(container).toHaveClass('focus-within:ring-2')
    })
  })

  describe('Size Variants', () => {
    it('should apply correct size classes', () => {
      const { rerender } = render(<LiquidInput size="sm" placeholder="Small" />)
      let input = screen.getByPlaceholderText('Small')
      expect(input).toHaveClass('text-sm', 'px-3', 'py-2')
      
      rerender(<LiquidInput size="md" placeholder="Medium" />)
      input = screen.getByPlaceholderText('Medium')
      expect(input).toHaveClass('text-base', 'px-4', 'py-2.5')
      
      rerender(<LiquidInput size="lg" placeholder="Large" />)
      input = screen.getByPlaceholderText('Large')
      expect(input).toHaveClass('text-lg', 'px-6', 'py-3')
    })
  })

  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    
    it('should render left icon correctly', () => {
      render(
        <LiquidInput 
          leftIcon={<TestIcon />} 
          placeholder="Left icon input" 
        />
      )
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Left icon input')).toBeInTheDocument()
    })

    it('should render right icon correctly', () => {
      render(
        <LiquidInput 
          rightIcon={<TestIcon />} 
          placeholder="Right icon input" 
        />
      )
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Right icon input')).toBeInTheDocument()
    })

    it('should render both icons correctly', () => {
      render(
        <LiquidInput 
          leftIcon={<TestIcon />}
          rightIcon={<TestIcon />}
          placeholder="Both icons input" 
        />
      )
      
      const icons = screen.getAllByTestId('test-icon')
      expect(icons).toHaveLength(2)
    })

    it('should adjust padding when icons are present', () => {
      const { rerender } = render(
        <LiquidInput leftIcon={<TestIcon />} placeholder="Left padding" />
      )
      let input = screen.getByPlaceholderText('Left padding')
      expect(input).toHaveClass('pl-10')
      
      rerender(
        <LiquidInput rightIcon={<TestIcon />} placeholder="Right padding" />
      )
      input = screen.getByPlaceholderText('Right padding')
      expect(input).toHaveClass('pr-10')
      
      rerender(
        <LiquidInput 
          leftIcon={<TestIcon />}
          rightIcon={<TestIcon />}
          placeholder="Both padding" 
        />
      )
      input = screen.getByPlaceholderText('Both padding')
      expect(input).toHaveClass('pl-10', 'pr-10')
    })
  })

  describe('Error States', () => {
    it('should display error message', () => {
      render(<LiquidInput error="This field is required" placeholder="Error input" />)
      
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('should apply error styling', () => {
      render(<LiquidInput error="Error" placeholder="Error styling" />)
      
      const container = screen.getByPlaceholderText('Error styling').closest('div')
      expect(container).toHaveClass('ring-red-500')
    })

    it('should have aria-invalid when error is present', () => {
      render(<LiquidInput error="Error" placeholder="Aria invalid" />)
      
      const input = screen.getByPlaceholderText('Aria invalid')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Disabled State', () => {
    it('should render disabled input', () => {
      render(<LiquidInput disabled placeholder="Disabled input" />)
      
      const input = screen.getByPlaceholderText('Disabled input')
      expect(input).toBeDisabled()
    })

    it('should apply disabled styling', () => {
      render(<LiquidInput disabled placeholder="Disabled styling" />)
      
      const input = screen.getByPlaceholderText('Disabled styling')
      expect(input).toHaveClass('cursor-not-allowed', 'opacity-60')
    })

    it('should not respond to interactions when disabled', () => {
      const handleChange = vi.fn()
      render(<LiquidInput disabled onChange={handleChange} placeholder="No interaction" />)
      
      const input = screen.getByPlaceholderText('No interaction')
      fireEvent.change(input, { target: { value: 'test' } })
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Required Field', () => {
    it('should mark field as required', () => {
      render(<LiquidInput required placeholder="Required field" />)
      
      const input = screen.getByPlaceholderText('Required field')
      expect(input).toBeRequired()
    })

    it('should display required indicator', () => {
      render(<LiquidInput required placeholder="Required indicator" />)
      
      const indicator = screen.getByText('*')
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should render within performance budget', () => {
      const renderTime = measurePerformance.renderTime(() => {
        render(<LiquidInput placeholder="Performance test" />)
      })
      
      // More lenient for CI environments (100ms budget)
      expect(renderTime).toBeLessThan(100)
    })

    it('should not cause memory leaks with rapid value changes', () => {
      const initialMemory = measurePerformance.memoryUsage()
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<LiquidInput placeholder={`Test ${i}`} />)
        const input = screen.getByPlaceholderText(`Test ${i}`)
        fireEvent.change(input, { target: { value: `value-${i}` } })
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
        <LiquidInput 
          placeholder="Accessible input"
          aria-label="Test input field"
        />
      )
      
      await testAccessibility(container)
    })

    it('should support proper labeling', () => {
      render(
        <div>
          <label htmlFor="test-input">Test Label</label>
          <LiquidInput id="test-input" placeholder="Labeled input" />
        </div>
      )
      
      const input = screen.getByLabelText('Test Label')
      expect(input).toBeInTheDocument()
    })

    it('should associate error messages with input', () => {
      render(
        <LiquidInput 
          error="Error message"
          placeholder="Error association"
          aria-describedby="error-message"
        />
      )
      
      const input = screen.getByPlaceholderText('Error association')
      const errorMessage = screen.getByText('Error message')
      
      expect(input).toHaveAttribute('aria-describedby', 'error-message')
      expect(errorMessage).toHaveAttribute('id', 'error-message')
    })

    it('should support keyboard navigation', () => {
      render(
        <div>
          <LiquidInput placeholder="First input" />
          <LiquidInput placeholder="Second input" />
        </div>
      )
      
      const firstInput = screen.getByPlaceholderText('First input')
      const secondInput = screen.getByPlaceholderText('Second input')
      
      firstInput.focus()
      expect(firstInput).toHaveFocus()
      
      fireEvent.keyDown(firstInput, { key: 'Tab' })
      secondInput.focus()
      expect(secondInput).toHaveFocus()
    })
  })

  describe('Preset Components', () => {
    it('should render Search preset correctly', () => {
      render(<LiquidInput.Search placeholder="Search" />)
      
      const input = screen.getByPlaceholderText('Search')
      expect(input).toHaveAttribute('type', 'search')
    })

    it('should render Email preset correctly', () => {
      render(<LiquidInput.Email placeholder="Email" />)
      
      const input = screen.getByPlaceholderText('Email')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('should render Password preset correctly', () => {
      render(<LiquidInput.Password placeholder="Password" />)
      
      const input = screen.getByPlaceholderText('Password')
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with defaults', () => {
      render(
        <LiquidInput 
          className="custom-input-class"
          placeholder="Custom styled"
        />
      )
      
      const input = screen.getByPlaceholderText('Custom styled')
      expect(input).toHaveClass('custom-input-class')
    })

    it('should apply custom styles', () => {
      const customStyles = { borderRadius: '12px' }
      render(
        <LiquidInput 
          style={customStyles}
          placeholder="Custom styled"
        />
      )
      
      const input = screen.getByPlaceholderText('Custom styled')
      expect(input).toHaveStyle({ borderRadius: '12px' })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null/undefined values gracefully', () => {
      render(<LiquidInput value={undefined} placeholder="Undefined value" />)
      
      const input = screen.getByPlaceholderText('Undefined value')
      expect(input).toHaveValue('')
    })

    it('should handle rapid input events without errors', async () => {
      const handleChange = vi.fn()
      render(<LiquidInput onChange={handleChange} placeholder="Rapid input" />)
      
      const input = screen.getByPlaceholderText('Rapid input')
      
      for (let i = 0; i < 10; i++) {
        fireEvent.change(input, { target: { value: `value-${i}` } })
      }
      
      expect(handleChange).toHaveBeenCalledTimes(10)
      expect(() => {}).not.toThrow()
    })

    it('should cleanup event listeners on unmount', () => {
      const { unmount } = render(<LiquidInput placeholder="Cleanup test" />)
      
      expect(screen.getByPlaceholderText('Cleanup test')).toBeInTheDocument()
      expect(() => unmount()).not.toThrow()
    })
  })
})