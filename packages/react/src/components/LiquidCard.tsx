import React, { forwardRef, useRef, useCallback, useState } from 'react'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidCardProps, LiquidCardComponent } from '../types'

/**
 * LiquidCard - The signature Liquid UI component
 * 
 * A beautiful glass card with Apple-style liquid glass effects, perfect physics,
 * and smooth animations. This is the cornerstone component of Liquid UI.
 */
const LiquidCardBase = forwardRef<HTMLDivElement, LiquidCardProps>(
  (
    {
      variant = 'frosted',
      intensity = 'regular',
      opacity = 'regular',
      interactive = true,
      adaptiveOpacity = false,
      environmentBlending = false,
      hover = true,
      shadow = true,
      border = true,
      className,
      children,
      onHover,
      style,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    
    // Use our custom hooks for glass effects
    const glassStyles = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    })
    
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: cardRef,
      enabled: interactive && hover,
      onHover: (hovered) => {
        setIsHovered(hovered)
        onHover?.(hovered)
      }
    })
    
    // Combine all mouse event handlers
    const onMouseEnter = useCallback((e: React.MouseEvent) => {
      handleMouseEnter()
      props.onMouseEnter?.(e as any)
    }, [handleMouseEnter, props.onMouseEnter])
    
    const onMouseLeave = useCallback((e: React.MouseEvent) => {
      handleMouseLeave()
      props.onMouseLeave?.(e as any)
    }, [handleMouseLeave, props.onMouseLeave])
    
    const onMouseMove = useCallback((e: React.MouseEvent) => {
      handleMouseMove(e as React.MouseEvent<HTMLDivElement>)
      props.onMouseMove?.(e as any)
    }, [handleMouseMove, props.onMouseMove])
    
    // Build CSS classes
    const classes = clsx(
      // Base glass card styles
      'liquid-card',
      'relative',
      'overflow-hidden',
      'transition-all',
      'duration-200',
      'ease-out',
      
      // Border styles
      border && 'border border-white/10',
      
      // Shadow styles
      shadow && [
        'shadow-lg',
        isHovered && interactive && 'shadow-xl'
      ],
      
      // Interactive styles
      interactive && [
        'cursor-pointer',
        'transform-gpu',
        hover && 'hover:scale-[1.02]',
        isHovered && 'scale-[1.02]'
      ],
      
      // Custom className
      className
    )
    
    // Merge styles
    const combinedStyles = {
      ...glassStyles,
      ...style
    }
    
    return (
      <div
        ref={(node: HTMLDivElement | null) => {
          // Handle both forwarded ref and internal ref
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
          if (cardRef.current !== node) {
            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
        }}
        className={classes}
        style={combinedStyles}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        {...props}
      >
        {children}
      </div>
    )
  }
)

LiquidCardBase.displayName = 'LiquidCard'

// Create the main component with proper typing
export const LiquidCard = LiquidCardBase as LiquidCardComponent

// Preset components for easier usage
LiquidCard.Frosted = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    variant="frosted"
    intensity="regular"
    interactive
    hover
    shadow
    {...props}
  />
))
LiquidCard.Frosted.displayName = 'LiquidCard.Frosted'

LiquidCard.Clear = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'variant' | 'opacity' | 'interactive' | 'hover'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    variant="clear"
    opacity="light"
    interactive
    hover
    {...props}
  />
))
LiquidCard.Clear.displayName = 'LiquidCard.Clear'

LiquidCard.Tinted = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    variant="tinted"
    intensity="regular"
    interactive
    hover
    shadow
    {...props}
  />
))
LiquidCard.Tinted.displayName = 'LiquidCard.Tinted'

LiquidCard.Interactive = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow' | 'border'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    interactive
    hover
    shadow
    border
    {...props}
  />
))
LiquidCard.Interactive.displayName = 'LiquidCard.Interactive'

LiquidCard.Static = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    interactive={false}
    hover={false}
    shadow={false}
    {...props}
  />
))
LiquidCard.Static.displayName = 'LiquidCard.Static'