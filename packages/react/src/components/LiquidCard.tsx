import React, { forwardRef, useRef, useCallback, useState } from 'react'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidCardProps } from '../types'

/**
 * LiquidCard - The signature Liquid UI component
 * 
 * A beautiful glass card with Apple-style liquid glass effects, perfect physics,
 * and smooth animations. This is the cornerstone component of Liquid UI.
 */
export const LiquidCard = forwardRef<HTMLDivElement, LiquidCardProps>(
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
      as = 'div',
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
    const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseEnter()
      props.onMouseEnter?.(e)
    }, [handleMouseEnter, props.onMouseEnter])
    
    const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseLeave()
      props.onMouseLeave?.(e)
    }, [handleMouseLeave, props.onMouseLeave])
    
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseMove(e)
      props.onMouseMove?.(e)
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
    
    const Component = as
    
    return (
      <Component
        ref={(node: HTMLDivElement) => {
          // Handle both forwarded ref and internal ref
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          cardRef.current = node
        }}
        className={classes}
        style={combinedStyles}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

LiquidCard.displayName = 'LiquidCard'