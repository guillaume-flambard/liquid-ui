import React, { forwardRef, useRef, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidButtonProps, LiquidButtonComponent } from '../types'

/**
 * LiquidButton - Interactive glass button component
 * 
 * A beautiful button with liquid glass effects, perfect for CTAs and interactive elements.
 * Includes loading states, icons, and responsive design.
 */
const LiquidButtonBase = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      variant = 'frosted',
      intensity = 'regular',
      opacity = 'regular',
      interactive = true,
      adaptiveOpacity = false,
      environmentBlending = false,
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    
    // Generate glass styles
    const glassStyles = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    })
    
    // Interactive physics effects
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: buttonRef,
      enabled: interactive && !disabled && !loading
    })
    
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm min-h-[2rem]',
      md: 'px-4 py-2 text-base min-h-[2.5rem]',
      lg: 'px-6 py-3 text-lg min-h-[3rem]'
    }
    
    // Handle mouse events
    const onMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      handleMouseEnter()
      props.onMouseEnter?.(e)
    }, [handleMouseEnter, props.onMouseEnter])
    
    const onMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      handleMouseLeave()
      setIsPressed(false)
      props.onMouseLeave?.(e)
    }, [handleMouseLeave, props.onMouseLeave])
    
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      handleMouseMove(e)
      props.onMouseMove?.(e)
    }, [handleMouseMove, props.onMouseMove])
    
    const onMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true)
      props.onMouseDown?.(e)
    }, [props.onMouseDown])
    
    const onMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      props.onMouseUp?.(e)
    }, [props.onMouseUp])
    
    // Build classes
    const classes = clsx(
      // Base button styles
      'liquid-button',
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'rounded-lg',
      'border',
      'border-white/10',
      'transition-all',
      'duration-200',
      'ease-out',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500/50',
      'transform-gpu',
      
      // Size styles
      sizeClasses[size],
      
      // Width styles
      fullWidth && 'w-full',
      
      // State styles
      !disabled && !loading && [
        'hover:shadow-lg',
        'active:scale-[0.98]',
        isPressed && 'scale-[0.98]'
      ],
      
      // Disabled styles
      (disabled || loading) && [
        'opacity-50',
        'cursor-not-allowed',
        'pointer-events-none'
      ],
      
      // Interactive styles
      interactive && !disabled && !loading && 'cursor-pointer',
      
      className
    )
    
    // Combine styles
    const combinedStyles = {
      ...glassStyles,
      ...style
    }
    
    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )
    
    return (
      <button
        ref={(node) => {
          // Handle both forwarded ref and internal ref
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
          }
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
        }}
        className={classes}
        style={combinedStyles}
        disabled={disabled || loading}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        
        {children && (
          <span className={loading ? 'opacity-0' : undefined}>
            {children}
          </span>
        )}
        
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

LiquidButtonBase.displayName = 'LiquidButton'

// Create the main component with proper typing
export const LiquidButton = LiquidButtonBase as LiquidButtonComponent

// Preset components for easier usage
LiquidButton.Primary = forwardRef<HTMLButtonElement, Omit<LiquidButtonProps, 'variant' | 'intensity' | 'interactive'>>((props, ref) => (
  <LiquidButtonBase
    ref={ref}
    variant="frosted"
    intensity="regular"
    interactive
    {...props}
  />
))
LiquidButton.Primary.displayName = 'LiquidButton.Primary'

LiquidButton.Secondary = forwardRef<HTMLButtonElement, Omit<LiquidButtonProps, 'variant' | 'opacity' | 'interactive'>>((props, ref) => (
  <LiquidButtonBase
    ref={ref}
    variant="clear"
    opacity="light"
    interactive
    {...props}
  />
))
LiquidButton.Secondary.displayName = 'LiquidButton.Secondary'

LiquidButton.Tinted = forwardRef<HTMLButtonElement, Omit<LiquidButtonProps, 'variant' | 'intensity' | 'interactive'>>((props, ref) => (
  <LiquidButtonBase
    ref={ref}
    variant="tinted"
    intensity="regular"
    interactive
    {...props}
  />
))
LiquidButton.Tinted.displayName = 'LiquidButton.Tinted'

LiquidButton.Small = forwardRef<HTMLButtonElement, Omit<LiquidButtonProps, 'size'>>((props, ref) => (
  <LiquidButtonBase
    ref={ref}
    size="sm"
    {...props}
  />
))
LiquidButton.Small.displayName = 'LiquidButton.Small'

LiquidButton.Large = forwardRef<HTMLButtonElement, Omit<LiquidButtonProps, 'size'>>((props, ref) => (
  <LiquidButtonBase
    ref={ref}
    size="lg"
    {...props}
  />
))
LiquidButton.Large.displayName = 'LiquidButton.Large'