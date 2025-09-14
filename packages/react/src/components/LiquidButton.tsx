import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidButtonProps, LiquidButtonComponent } from '../types'

interface RippleEffect {
  id: string
  x: number
  y: number
  size: number
}

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
    const [isHovered, setIsHovered] = useState(false)
    const [ripples, setRipples] = useState<RippleEffect[]>([])
    const [focusVisible, setFocusVisible] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const rippleTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map())
    
    // Generate glass styles
    const { glassStyles } = useLiquidGlass({
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
      enabled: interactive && !disabled && !loading,
      onHover: (hovered) => {
        setIsHovered(hovered)
      }
    })
    
    // Cleanup ripple timeouts on unmount
    useEffect(() => {
      return () => {
        rippleTimeouts.current.forEach(timeout => clearTimeout(timeout))
        rippleTimeouts.current.clear()
      }
    }, [])
    
    // Create ripple effect
    const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return
      
      const button = buttonRef.current
      if (!button) return
      
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2
      
      const ripple: RippleEffect = {
        id: Date.now().toString(),
        x,
        y,
        size
      }
      
      setRipples(prev => [...prev, ripple])
      
      // Remove ripple after animation
      const timeout = setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id))
        rippleTimeouts.current.delete(ripple.id)
      }, 600)
      
      rippleTimeouts.current.set(ripple.id, timeout)
    }, [disabled, loading])
    
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
      createRipple(e)
      props.onMouseDown?.(e)
    }, [props.onMouseDown, createRipple])
    
    const onMouseUp = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      props.onMouseUp?.(e)
    }, [props.onMouseUp])
    
    const onFocus = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
      setFocusVisible(true)
      props.onFocus?.(e)
    }, [props.onFocus])
    
    const onBlur = useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
      setFocusVisible(false)
      props.onBlur?.(e)
    }, [props.onBlur])
    
    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsPressed(true)
        // Create ripple effect for keyboard activation
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect()
          const mockEvent = {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2
          } as React.MouseEvent<HTMLButtonElement>
          createRipple(mockEvent)
        }
      }
      props.onKeyDown?.(e)
    }, [props.onKeyDown, createRipple])
    
    const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsPressed(false)
      }
      props.onKeyUp?.(e)
    }, [props.onKeyUp])
    
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
      focusVisible && [
        'ring-2',
        'ring-blue-500/50',
        'ring-offset-2',
        'ring-offset-transparent'
      ],
      'transform-gpu',
      
      // Size styles
      sizeClasses[size],
      
      // Width styles
      fullWidth && 'w-full',
      
      // State styles
      !disabled && !loading && [
        'hover:shadow-lg',
        'hover:shadow-blue-500/25',
        'active:scale-[0.98]',
        isPressed && 'scale-[0.98]',
        isHovered && [
          'shadow-xl',
          'shadow-blue-500/30',
          'brightness-110'
        ]
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
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="flex items-center justify-center"
      >
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
        <span className="sr-only">Loading...</span>
      </div>
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
        aria-disabled={disabled || loading}
        aria-busy={loading}
        aria-label={loading ? `${props['aria-label'] || children} - Loading` : props['aria-label']}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        type={props.type || 'button'}
        {...props}
      >
        {/* Ripple Effects - Only render when needed */}
        {(interactive && ripples.length > 0) && (
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
            {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-ping"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                animationDuration: '600ms',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
            ))}
          </div>
        )}
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