import React, { forwardRef, useState, useCallback } from 'react'
import { LiquidInteractiveProps } from './types'
import { cn } from '../../utils/cn'

/**
 * LiquidInteractive - Primitive for interactive elements
 * Handles press, hover, and focus states with consistent behavior
 */
export const LiquidInteractive = forwardRef<HTMLDivElement, LiquidInteractiveProps>(
  ({ 
    children,
    className,
    onPress,
    onPressStart,
    onPressEnd,
    onHover,
    disabled = false,
    loading = false,
    tabIndex = 0,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseDown = useCallback(() => {
      if (disabled || loading) return
      setIsPressed(true)
      onPressStart?.()
    }, [disabled, loading, onPressStart])

    const handleMouseUp = useCallback(() => {
      if (disabled || loading) return
      setIsPressed(false)
      onPressEnd?.()
    }, [disabled, loading, onPressEnd])

    const handleClick = useCallback(() => {
      if (disabled || loading) return
      onPress?.()
    }, [disabled, loading, onPress])

    const handleMouseEnter = useCallback(() => {
      if (disabled || loading) return
      setIsHovered(true)
      onHover?.(true)
    }, [disabled, loading, onHover])

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false)
      setIsPressed(false)
      onHover?.(false)
    }, [onHover])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled || loading) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsPressed(true)
        onPressStart?.()
      }
    }, [disabled, loading, onPressStart])

    const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
      if (disabled || loading) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsPressed(false)
        onPressEnd?.()
        onPress?.()
      }
    }, [disabled, loading, onPressEnd, onPress])

    return (
      <div
        ref={ref}
        className={cn(
          'liquid-interactive',
          'relative',
          'select-none',
          'outline-none',
          !disabled && !loading && [
            'cursor-pointer',
            'transition-transform',
            'duration-150',
            'ease-out',
            isPressed && 'scale-95',
            isHovered && !isPressed && 'scale-[1.02]'
          ],
          disabled && [
            'cursor-not-allowed',
            'opacity-60'
          ],
          loading && [
            'cursor-wait',
            'pointer-events-none'
          ],
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-blue-500/50',
          'focus:ring-offset-2',
          'focus:ring-offset-transparent',
          className
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={disabled || loading ? -1 : tabIndex}
        role="button"
        aria-disabled={disabled}
        aria-busy={loading}
        {...props}
      >
        {children}
      </div>
    )
  }
)

LiquidInteractive.displayName = 'LiquidInteractive'