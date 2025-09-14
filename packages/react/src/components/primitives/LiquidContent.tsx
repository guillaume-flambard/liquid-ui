import React, { forwardRef } from 'react'
import { LiquidContentProps } from './types'
import { cn } from '../../utils/cn'

/**
 * LiquidContent - Primitive for content containers
 * Provides consistent padding, alignment, and max-width constraints
 */
export const LiquidContent = forwardRef<HTMLDivElement, LiquidContentProps>(
  ({ 
    children,
    className,
    padding = 'md',
    centered = false,
    maxWidth = 'full',
    ...props 
  }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12'
    }

    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'liquid-content',
          paddingClasses[padding],
          maxWidthClasses[maxWidth],
          centered && [
            'mx-auto',
            'text-center',
            'flex',
            'flex-col',
            'items-center',
            'justify-center'
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

LiquidContent.displayName = 'LiquidContent'