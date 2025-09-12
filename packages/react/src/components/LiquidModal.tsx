import React, { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import type { LiquidModalProps } from '../types'

/**
 * LiquidModal - Glass modal and overlay component
 * 
 * A beautiful modal with liquid glass effects, perfect for dialogs and overlays.
 * Includes backdrop blur, keyboard navigation, and accessibility features.
 */
export const LiquidModal: React.FC<LiquidModalProps> = ({
  open,
  onClose,
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = 'md',
  centered = true,
  variant = 'frosted',
  intensity = 'strong',
  opacity = 'regular',
  interactive = false,
  adaptiveOpacity = false,
  environmentBlending = true,
  className,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  
  // Generate glass styles for the modal content
  const glassStyles = useLiquidGlass({
    variant,
    intensity,
    opacity,
    interactive,
    adaptiveOpacity,
    environmentBlending
  })
  
  // Generate backdrop glass styles
  const backdropGlassStyles = useLiquidGlass({
    variant: 'dark',
    intensity: 'regular',
    opacity: 'light',
    interactive: false,
    adaptiveOpacity: false,
    environmentBlending: true
  })
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  
  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, closeOnEscape, onClose])
  
  // Handle focus management
  useEffect(() => {
    if (!open) return
    
    const previousActiveElement = document.activeElement as HTMLElement
    
    // Focus the modal when opened
    if (modalRef.current) {
      modalRef.current.focus()
    }
    
    // Restore focus when closed
    return () => {
      if (previousActiveElement && previousActiveElement.focus) {
        previousActiveElement.focus()
      }
    }
  }, [open])
  
  // Handle body scroll lock
  useEffect(() => {
    if (!open) return
    
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [open])
  
  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === backdropRef.current) {
      onClose()
    }
  }, [closeOnBackdropClick, onClose])
  
  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose()
  }, [onClose])
  
  if (!open) return null
  
  const modalContent = (
    <div
      ref={backdropRef}
      className={clsx(
        'liquid-modal-backdrop',
        'fixed',
        'inset-0',
        'z-50',
        'flex',
        'items-center',
        'justify-center',
        'p-4',
        'min-h-screen',
        centered ? 'items-center' : 'items-start pt-16'
      )}
      style={backdropGlassStyles}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={clsx(
          'liquid-modal',
          'relative',
          'w-full',
          sizeClasses[size],
          'max-h-[90vh]',
          'overflow-hidden',
          'rounded-xl',
          'border',
          'border-white/10',
          'shadow-2xl',
          'transform',
          'transition-all',
          'duration-300',
          'ease-out',
          'animate-in',
          'fade-in-0',
          'zoom-in-95',
          className
        )}
        style={glassStyles}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="liquid-modal-header flex items-center justify-between p-6 border-b border-white/10">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-white">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                type="button"
                className={clsx(
                  'flex',
                  'items-center',
                  'justify-center',
                  'w-8',
                  'h-8',
                  'rounded-full',
                  'text-gray-400',
                  'hover:text-white',
                  'hover:bg-white/10',
                  'transition-colors',
                  'duration-200'
                )}
                onClick={handleCloseClick}
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="liquid-modal-content overflow-y-auto max-h-full">
          {children}
        </div>
      </div>
    </div>
  )
  
  // Render modal in a portal
  return createPortal(modalContent, document.body)
}

LiquidModal.displayName = 'LiquidModal'