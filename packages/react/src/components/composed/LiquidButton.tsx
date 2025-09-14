import React, { forwardRef } from 'react'
import { LiquidButtonProps } from '../../types'
import { LiquidInteractive } from '../primitives/LiquidInteractive'
import { LiquidContent } from '../primitives/LiquidContent'
import { LiquidSpinner } from '../primitives/LiquidSpinner'
import { LiquidText } from '../primitives/LiquidText'
import { cn } from '../../utils/cn'

/**
 * LiquidButton - Composed button component
 * Built using primitive components for maximum flexibility
 */
export const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ 
    children,
    className,
    variant = 'frosted',
    size = 'md',
    intensity = 'regular',
    disabled = false,
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    onClick,
    type = 'button',
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          'liquid-button',
          'relative',
          'rounded-lg',
          'border border-white/10',
          'shadow-lg',
          'backdrop-blur-md',
          'bg-white/10',
          sizeClasses[size],
          fullWidth && 'w-full',
          disabled && 'opacity-60 cursor-not-allowed',
          loading && 'cursor-wait',
          !disabled && !loading && [
            'hover:scale-105',
            'active:scale-95',
            'transition-transform',
            'duration-200'
          ],
          className
        )}
        {...props}
      >
        <LiquidInteractive
          disabled={disabled}
          loading={loading}
          className="w-full h-full -m-2 p-2"
        >
          <LiquidContent
            padding="none"
            className="flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LiquidSpinner size="sm" />
                <LiquidText variant="body" weight="medium">
                  Loading...
                </LiquidText>
              </>
            ) : (
              <>
                {leftIcon && <span className="liquid-button-icon">{leftIcon}</span>}
                <span className="liquid-button-content">{children}</span>
                {rightIcon && <span className="liquid-button-icon">{rightIcon}</span>}
              </>
            )}
          </LiquidContent>
        </LiquidInteractive>
      </button>
    )
  }
)

LiquidButton.displayName = 'LiquidButton'

// Preset variations using composition
export const LiquidButtonPrimary = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (props, ref) => (
    <LiquidButton
      ref={ref}
      variant="tinted"
      intensity="strong"
      {...props}
    />
  )
)

export const LiquidButtonGhost = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (props, ref) => (
    <LiquidButton
      ref={ref}
      variant="clear"
      intensity="light"
      className="border-0 shadow-none"
      {...props}
    />
  )
)

export const LiquidButtonIcon = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, ...props }, ref) => (
    <LiquidButton
      ref={ref}
      className={cn('p-2 aspect-square', className)}
      {...props}
    />
  )
)