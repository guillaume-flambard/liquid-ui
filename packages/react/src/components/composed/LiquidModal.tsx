import React, { forwardRef, useEffect, useRef } from 'react'
import { LiquidModalProps } from '../../types'
import { LiquidOverlay } from '../primitives/LiquidOverlay'
import { LiquidSurface } from '../primitives/LiquidSurface'
import { LiquidContent } from '../primitives/LiquidContent'
import { LiquidInteractive } from '../primitives/LiquidInteractive'
import { cn } from '../../utils/cn'

/**
 * LiquidModal - Composed modal component
 * Built using primitive components for overlays and dialogs
 */
export const LiquidModal = forwardRef<HTMLDivElement, LiquidModalProps>(
  ({ 
    children,
    className,
    isOpen,
    onClose,
    variant = 'frosted',
    intensity = 'strong',
    size = 'md',
    closeOnEscape = true,
    closeOnBackdrop = true,
    showCloseButton = true,
    ...props 
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // Focus management
    useEffect(() => {
      if (isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus()
        }
      }
    }, [isOpen])

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-none w-[95vw]'
    }

    return (
      <LiquidOverlay
        isOpen={isOpen || false}
        onClose={onClose}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        variant={variant}
        intensity={intensity}
      >
        <LiquidSurface
          ref={modalRef}
          variant={variant}
          intensity={intensity}
          className={cn(
            'liquid-modal',
            'relative',
            'rounded-2xl',
            'border border-white/20',
            'shadow-2xl',
            'animate-in',
            'zoom-in-95',
            'duration-200',
            sizeClasses[size],
            'max-h-[90vh]',
            'overflow-auto',
            className
          )}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {showCloseButton && (
            <LiquidInteractive
              onPress={onClose}
              className="absolute top-4 right-4 z-10"
              aria-label="Close modal"
            >
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-black/10 transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
            </LiquidInteractive>
          )}
          
          <LiquidContent padding="lg">
            {children}
          </LiquidContent>
        </LiquidSurface>
      </LiquidOverlay>
    )
  }
)

LiquidModal.displayName = 'LiquidModal'

// Preset variations
export const LiquidModalAlert = forwardRef<HTMLDivElement, LiquidModalProps>(
  (props, ref) => (
    <LiquidModal
      ref={ref}
      size="sm"
      closeOnBackdrop={false}
      closeOnEscape={false}
      {...props}
    />
  )
)

export const LiquidModalConfirm = forwardRef<HTMLDivElement, LiquidModalProps>(
  (props, ref) => (
    <LiquidModal
      ref={ref}
      size="sm"
      closeOnBackdrop={false}
      {...props}
    />
  )
)

export const LiquidModalFullscreen = forwardRef<HTMLDivElement, LiquidModalProps>(
  (props, ref) => (
    <LiquidModal
      ref={ref}
      size="full"
      className="h-[95vh]"
      {...props}
    />
  )
)