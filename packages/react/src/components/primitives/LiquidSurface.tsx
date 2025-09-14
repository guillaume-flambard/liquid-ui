import React, { forwardRef } from 'react'
import { LiquidSurfaceProps } from './types'
import { useLiquidGlass } from '../../hooks/useLiquidGlass'
import { cn } from '../../utils/cn'

/**
 * LiquidSurface - Base primitive for all glass surfaces
 * Provides the fundamental glass effect layer that other components build upon
 */
export const LiquidSurface = forwardRef<HTMLElement, LiquidSurfaceProps>(
  ({ 
    children,
    className,
    variant = 'frosted',
    intensity = 'regular',
    opacity = 'regular',
    interactive = false,
    adaptiveOpacity = false,
    environmentBlending = false,
    as: Component = 'div',
    style,
    ...props 
  }, ref) => {
    const { glassStyles, glassClasses } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    })

    // Type assertion for dynamic component
    const Element = Component as any

    return (
      <Element
        ref={ref}
        className={cn(
          'liquid-surface',
          'relative',
          'overflow-hidden',
          glassClasses.base,
          glassClasses.blur,
          glassClasses.background,
          interactive && [
            'cursor-pointer',
            'transition-all',
            'duration-300',
            'ease-out',
            'hover:scale-[1.02]',
            'active:scale-[0.98]'
          ],
          className
        )}
        style={{
          ...glassStyles,
          ...style
        }}
        {...props}
      >
        {/* Glass effect overlay */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className={cn(
            'absolute inset-0',
            'bg-gradient-to-br',
            'from-white/10',
            'to-transparent'
          )} />
        </div>
        
        {/* Content layer */}
        <div className="relative z-10">
          {children}
        </div>
      </Element>
    )
  }
)

LiquidSurface.displayName = 'LiquidSurface'