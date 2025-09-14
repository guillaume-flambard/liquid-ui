import React, { forwardRef } from 'react'
import { LiquidIconProps } from './types'
import { cn } from '../../utils/cn'

/**
 * LiquidIcon - Primitive for icon rendering
 * Provides consistent icon sizing and styling
 */
export const LiquidIcon = forwardRef<HTMLSpanElement, LiquidIconProps>(
  ({ 
    children,
    className,
    size = 'md',
    color,
    spin = false,
    style,
    ...props 
  }, ref) => {
    const sizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8'
    }

    return (
      <span
        ref={ref}
        className={cn(
          'liquid-icon',
          'inline-flex',
          'items-center',
          'justify-center',
          sizeClasses[size],
          spin && 'animate-spin',
          className
        )}
        style={{
          color,
          ...style
        }}
        aria-hidden="true"
        {...props}
      >
        {children}
      </span>
    )
  }
)

LiquidIcon.displayName = 'LiquidIcon'