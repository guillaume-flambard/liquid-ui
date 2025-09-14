import React, { forwardRef } from 'react'
import { LiquidTextProps } from './types'
import { cn } from '../../utils/cn'

/**
 * LiquidText - Primitive for typography
 * Provides consistent text styling across the design system
 */
export const LiquidText = forwardRef<HTMLElement, LiquidTextProps>(
  ({ 
    children,
    className,
    variant = 'body',
    weight = 'regular',
    align = 'left',
    color = 'primary',
    as,
    ...props 
  }, ref) => {
    // Determine the element based on variant
    const defaultElements = {
      display: 'h1',
      title: 'h2',
      body: 'p',
      caption: 'span',
      label: 'label'
    }

    const Component = (as || defaultElements[variant]) as any

    const variantClasses = {
      display: 'text-4xl md:text-5xl lg:text-6xl',
      title: 'text-2xl md:text-3xl lg:text-4xl',
      body: 'text-base',
      caption: 'text-sm',
      label: 'text-sm uppercase tracking-wider'
    }

    const weightClasses = {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }

    const colorClasses = {
      primary: 'text-gray-900 dark:text-white',
      secondary: 'text-gray-600 dark:text-gray-300',
      muted: 'text-gray-400 dark:text-gray-500',
      error: 'text-red-600 dark:text-red-400',
      success: 'text-green-600 dark:text-green-400'
    }

    return (
      <Component
        ref={ref}
        className={cn(
          'liquid-text',
          variantClasses[variant],
          weightClasses[weight],
          alignClasses[align],
          colorClasses[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

LiquidText.displayName = 'LiquidText'