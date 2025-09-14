import React, { useEffect, useCallback } from 'react'
import { LiquidOverlayProps } from './types'
import { LiquidPortal } from './LiquidPortal'
import { useLiquidGlass } from '../../hooks/useLiquidGlass'
import { cn } from '../../utils/cn'

/**
 * LiquidOverlay - Primitive for modal backdrops and overlays
 * Provides glass-effect overlays with interaction handling
 */
export const LiquidOverlay: React.FC<LiquidOverlayProps> = ({
  isOpen,
  onClose,
  closeOnBackdrop = true,
  closeOnEscape = true,
  variant = 'frosted',
  intensity = 'strong',
  children,
  className,
  ...props
}) => {
  const { glassClasses } = useLiquidGlass({
    variant,
    intensity,
    opacity: 'strong'
  })

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape || !onClose) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Handle body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdrop && onClose && e.target === e.currentTarget) {
      onClose()
    }
  }, [closeOnBackdrop, onClose])

  if (!isOpen) return null

  return (
    <LiquidPortal>
      <div
        className={cn(
          'liquid-overlay',
          'fixed inset-0 z-50',
          'flex items-center justify-center',
          'animate-in fade-in duration-200',
          glassClasses.base,
          glassClasses.blur,
          'bg-black/40',
          className
        )}
        onClick={handleBackdropClick}
        {...props}
      >
        {children}
      </div>
    </LiquidPortal>
  )
}