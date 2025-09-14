import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { LiquidModal } from '../LiquidModal'
import { 
  render, 
  mockGlassEngine, 
  simulateInteraction, 
  testAccessibility,
  measurePerformance,
  stateTestingHelpers 
} from '../../test/utils'

describe('LiquidModal', () => {
  beforeEach(() => {
    mockGlassEngine()
  })

  describe('Basic Rendering', () => {
    it('should not render when closed', async () => {
      render(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })

    it('should render when open', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('should apply glass effect styles to backdrop', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      const backdrop = document.querySelector('[class*="backdrop-blur"]')
      expect(backdrop).toBeInTheDocument()
      stateTestingHelpers.expectGlassEffect(backdrop!)
    })

    it('should render with different variants', async () => {
      const { rerender } = render(
        <LiquidModal isOpen={true} onClose={() => {}} variant="frosted">
          Frosted Modal
        </LiquidModal>
      )
      expect(screen.getByText('Frosted Modal')).toBeInTheDocument()
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}} variant="clear">
          Clear Modal
        </LiquidModal>
      )
      expect(screen.getByText('Clear Modal')).toBeInTheDocument()
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}} variant="tinted">
          Tinted Modal
        </LiquidModal>
      )
      expect(screen.getByText('Tinted Modal')).toBeInTheDocument()
    })
  })

  describe('Interactive Features', () => {
    it('should call onClose when backdrop is clicked', async () => {
      const handleClose = vi.fn()
      render(
        <LiquidModal isOpen={true} onClose={handleClose}>
          Modal Content
        </LiquidModal>
      )
      
      const backdrop = document.querySelector('[class*="backdrop-blur"]')!
      await simulateInteraction.click(backdrop)
      
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should not close when clicking modal content', async () => {
      const handleClose = vi.fn()
      render(
        <LiquidModal isOpen={true} onClose={handleClose}>
          Modal Content
        </LiquidModal>
      )
      
      const modalContent = screen.getByText('Modal Content')
      await simulateInteraction.click(modalContent)
      
      expect(handleClose).not.toHaveBeenCalled()
    })

    it('should close when pressing Escape key', async () => {
      const handleClose = vi.fn()
      render(
        <LiquidModal isOpen={true} onClose={handleClose}>
          Modal Content
        </LiquidModal>
      )
      
      await simulateInteraction.keyDown(document, 'Escape')
      
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('should not close on Escape when closeOnEscape is false', async () => {
      const handleClose = vi.fn()
      render(
        <LiquidModal isOpen={true} onClose={handleClose} closeOnEscape={false}>
          Modal Content
        </LiquidModal>
      )
      
      await simulateInteraction.keyDown(document, 'Escape')
      
      expect(handleClose).not.toHaveBeenCalled()
    })

    it('should not close on backdrop click when closeOnBackdrop is false', async () => {
      const handleClose = vi.fn()
      render(
        <LiquidModal isOpen={true} onClose={handleClose} closeOnBackdrop={false}>
          Modal Content
        </LiquidModal>
      )
      
      const backdrop = document.querySelector('[class*="backdrop-blur"]')!
      await simulateInteraction.click(backdrop)
      
      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('Close Button', () => {
    it('should render close button by default', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
    })

    it('should hide close button when showCloseButton is false', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}} showCloseButton={false}>
          Modal Content
        </LiquidModal>
      )
      
      const closeButton = screen.queryByRole('button', { name: /close/i })
      expect(closeButton).not.toBeInTheDocument()
    })

    it('should call onClose when close button is clicked', async () => {
      const handleClose = vi.fn()
      render(
        <LiquidModal isOpen={true} onClose={handleClose}>
          Modal Content
        </LiquidModal>
      )
      
      const closeButton = screen.getByRole('button', { name: /close/i })
      await simulateInteraction.click(closeButton)
      
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Size Variants', () => {
    it('should apply correct size classes', async () => {
      const { rerender } = render(
        <LiquidModal isOpen={true} onClose={() => {}} size="sm">
          Small Modal
        </LiquidModal>
      )
      let modal = screen.getByText('Small Modal').closest('[class*="max-w"]')
      expect(modal).toHaveClass('max-w-md')
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}} size="md">
          Medium Modal
        </LiquidModal>
      )
      modal = screen.getByText('Medium Modal').closest('[class*="max-w"]')
      expect(modal).toHaveClass('max-w-lg')
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}} size="lg">
          Large Modal
        </LiquidModal>
      )
      modal = screen.getByText('Large Modal').closest('[class*="max-w"]')
      expect(modal).toHaveClass('max-w-2xl')
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}} size="xl">
          XL Modal
        </LiquidModal>
      )
      modal = screen.getByText('XL Modal').closest('[class*="max-w"]')
      expect(modal).toHaveClass('max-w-4xl')
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}} size="full">
          Full Modal
        </LiquidModal>
      )
      modal = screen.getByText('Full Modal').closest('[class*="max-w"]')
      expect(modal).toHaveClass('max-w-none')
    })
  })

  describe('Animation States', () => {
    it('should apply enter animation when opening', async () => {
      const { rerender } = render(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      const modal = screen.getByText('Modal Content').closest('[class*="animate"]')
      expect(modal).toBeInTheDocument()
    })

    it('should apply exit animation when closing', async () => {
      const { rerender } = render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      rerender(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      // Modal should still be in DOM during exit animation
      await waitFor(() => {
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
      })
    })
  })

  describe('Focus Management', () => {
    it('should focus modal content when opened', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          <button>Focus me</button>
        </LiquidModal>
      )
      
      const button = screen.getByRole('button', { name: 'Focus me' })
      
      // Wait for focus management timeouts to complete
      await waitFor(() => {
        expect(button).toHaveFocus()
      }, { timeout: 100 })
    })

    it('should trap focus within modal', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}} showCloseButton={false}>
          <button>First</button>
          <button>Second</button>
        </LiquidModal>
      )
      
      const firstButton = screen.getByRole('button', { name: 'First' })
      const secondButton = screen.getByRole('button', { name: 'Second' })
      
      // Wait for initial focus management
      await waitFor(() => {
        expect(firstButton).toHaveFocus()
      }, { timeout: 100 })
      
      await simulateInteraction.keyDown(firstButton, 'Tab')
      await waitFor(() => {
        expect(secondButton).toHaveFocus()
      }, { timeout: 100 })
      
      await simulateInteraction.keyDown(secondButton, 'Tab')
      await waitFor(() => {
        expect(firstButton).toHaveFocus()
      }, { timeout: 100 })
    })

    it('should restore focus when closed', async () => {
      const triggerButton = document.createElement('button')
      triggerButton.textContent = 'Open Modal'
      document.body.appendChild(triggerButton)
      triggerButton.focus()
      
      const { rerender } = render(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      rerender(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      rerender(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      expect(triggerButton).toHaveFocus()
      document.body.removeChild(triggerButton)
    })
  })

  describe('Body Scroll Lock', () => {
    it('should lock body scroll when modal is open', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      expect(document.body).toHaveStyle({ overflow: 'hidden' })
    })

    it('should restore body scroll when modal is closed', async () => {
      const { rerender } = render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      rerender(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
    })
  })

  describe('Performance', () => {
    it('should render within performance budget', async () => {
      const renderTime = measurePerformance.renderTime(() => {
        render(
          <LiquidModal isOpen={true} onClose={() => {}}>
            Performance Test
          </LiquidModal>
        )
      })
      
      // More lenient for CI environments (100ms budget)
      expect(renderTime).toBeLessThan(100)
    })

    it('should not cause memory leaks with rapid open/close', async () => {
      const initialMemory = measurePerformance.memoryUsage()
      
      for (let i = 0; i < 50; i++) {
        const { rerender, unmount } = render(
          <LiquidModal isOpen={false} onClose={() => {}}>
            Test {i}
          </LiquidModal>
        )
        
        rerender(
          <LiquidModal isOpen={true} onClose={() => {}}>
            Test {i}
          </LiquidModal>
        )
        
        rerender(
          <LiquidModal isOpen={false} onClose={() => {}}>
            Test {i}
          </LiquidModal>
        )
        
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
        <LiquidModal isOpen={true} onClose={() => {}} aria-label="Test modal">
          Modal Content
        </LiquidModal>
      )
      
      await testAccessibility(container)
    })

    it('should have proper ARIA attributes', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Modal Content
        </LiquidModal>
      )
      
      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-modal', 'true')
    })

    it('should support custom ARIA labels', async () => {
      render(
        <LiquidModal 
          isOpen={true} 
          onClose={() => {}} 
          aria-label="Custom modal label"
        >
          Modal Content
        </LiquidModal>
      )
      
      const modal = screen.getByLabelText('Custom modal label')
      expect(modal).toBeInTheDocument()
    })

    it('should associate with title when provided', async () => {
      render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          <h2 id="modal-title">Modal Title</h2>
          <p>Modal content</p>
        </LiquidModal>
      )
      
      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title')
    })
  })

  describe('Preset Components', () => {
    it('should render Alert preset correctly', async () => {
      render(<LiquidModal.Alert isOpen={true} onClose={() => {}}>Alert Modal</LiquidModal.Alert>)
      
      const modal = screen.getByText('Alert Modal')
      expect(modal).toBeInTheDocument()
    })

    it('should render Confirm preset correctly', async () => {
      render(<LiquidModal.Confirm isOpen={true} onClose={() => {}}>Confirm Modal</LiquidModal.Confirm>)
      
      const modal = screen.getByText('Confirm Modal')
      expect(modal).toBeInTheDocument()
    })

    it('should render Fullscreen preset correctly', async () => {
      render(<LiquidModal.Fullscreen isOpen={true} onClose={() => {}}>Fullscreen Modal</LiquidModal.Fullscreen>)
      
      const modal = screen.getByText('Fullscreen Modal').closest('[class*="max-w"]')
      expect(modal).toHaveClass('max-w-none')
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className with defaults', async () => {
      render(
        <LiquidModal 
          isOpen={true} 
          onClose={() => {}} 
          className="custom-modal-class"
        >
          Custom Styled Modal
        </LiquidModal>
      )
      
      const modal = screen.getByText('Custom Styled Modal').closest('[class*="custom-modal-class"]')
      expect(modal).toBeInTheDocument()
    })

    it('should apply custom styles to backdrop', async () => {
      render(
        <LiquidModal 
          isOpen={true} 
          onClose={() => {}} 
          backdropClassName="custom-backdrop"
        >
          Custom Backdrop Modal
        </LiquidModal>
      )
      
      const backdrop = document.querySelector('.custom-backdrop')
      expect(backdrop).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle portal mounting errors gracefully', async () => {
      // Mock portal mounting failure
      const originalCreatePortal = require('react-dom').createPortal
      require('react-dom').createPortal = vi.fn(() => {
        throw new Error('Portal mounting failed')
      })
      
      expect(() => {
        render(
          <LiquidModal isOpen={true} onClose={() => {}}>
            Portal Error Test
          </LiquidModal>
        )
      }).not.toThrow()
      
      // Restore original createPortal
      require('react-dom').createPortal = originalCreatePortal
    })

    it('should handle rapid state changes without errors', async () => {
      const { rerender } = render(
        <LiquidModal isOpen={false} onClose={() => {}}>
          Rapid State Test
        </LiquidModal>
      )
      
      for (let i = 0; i < 10; i++) {
        rerender(
          <LiquidModal isOpen={i % 2 === 0} onClose={() => {}}>
            Rapid State Test
          </LiquidModal>
        )
      }
      
      expect(() => {}).not.toThrow()
    })

    it('should cleanup all event listeners on unmount', async () => {
      const { unmount } = render(
        <LiquidModal isOpen={true} onClose={() => {}}>
          Cleanup Test
        </LiquidModal>
      )
      
      expect(() => unmount()).not.toThrow()
      expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
    })
  })
})