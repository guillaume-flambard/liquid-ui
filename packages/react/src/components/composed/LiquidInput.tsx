import React, { forwardRef } from 'react'
import { LiquidInputProps } from '../../types'
import { LiquidSurface } from '../primitives/LiquidSurface'
import { LiquidText } from '../primitives/LiquidText'
import { cn } from '../../utils/cn'

/**
 * LiquidInput - Composed input component
 * Built using primitive components for form inputs
 */
export const LiquidInput = forwardRef<HTMLInputElement, LiquidInputProps>(
  ({ 
    className,
    variant = 'frosted',
    intensity = 'light',
    size = 'md',
    error,
    leftIcon,
    rightIcon,
    required,
    disabled,
    type = 'text',
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-4 py-2.5',
      lg: 'text-lg px-6 py-3'
    }

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    return (
      <div className="liquid-input-wrapper space-y-1">
        {required && (
          <span className="text-red-500 text-sm ml-1">*</span>
        )}
        
        <LiquidSurface
          variant={variant}
          intensity={intensity}
          className={cn(
            'liquid-input-container',
            'relative',
            'rounded-lg',
            'border',
            error ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-white/10',
            'shadow-sm',
            'focus-within:ring-2',
            'focus-within:ring-blue-500/30',
            'transition-all duration-200',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          <div className="relative flex items-center">
            {leftIcon && (
              <span className={cn(
                'absolute left-3 pointer-events-none',
                iconSizeClasses[size],
                'text-gray-500'
              )}>
                {leftIcon}
              </span>
            )}
            
            <input
              ref={ref}
              type={type}
              className={cn(
                'w-full',
                'bg-transparent',
                'outline-none',
                'placeholder:text-gray-500',
                sizeClasses[size],
                leftIcon && 'pl-10',
                rightIcon && 'pr-10',
                disabled && 'cursor-not-allowed',
                className
              )}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={error ? 'error-message' : undefined}
              {...props}
            />
            
            {rightIcon && (
              <span className={cn(
                'absolute right-3 pointer-events-none',
                iconSizeClasses[size],
                'text-gray-500'
              )}>
                {rightIcon}
              </span>
            )}
          </div>
        </LiquidSurface>
        
        {error && (
          <LiquidText
            id="error-message"
            variant="caption"
            color="error"
            className="ml-1"
          >
            {error}
          </LiquidText>
        )}
      </div>
    )
  }
)

LiquidInput.displayName = 'LiquidInput'

// Preset variations
export const LiquidInputSearch = forwardRef<HTMLInputElement, LiquidInputProps>(
  (props, ref) => {
    const SearchIcon = () => (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
    
    return (
      <LiquidInput
        ref={ref}
        type="search"
        leftIcon={<SearchIcon />}
        placeholder="Search..."
        {...props}
      />
    )
  }
)

export const LiquidInputEmail = forwardRef<HTMLInputElement, LiquidInputProps>(
  (props, ref) => (
    <LiquidInput
      ref={ref}
      type="email"
      placeholder="email@example.com"
      {...props}
    />
  )
)

export const LiquidInputPassword = forwardRef<HTMLInputElement, LiquidInputProps>(
  (props, ref) => (
    <LiquidInput
      ref={ref}
      type="password"
      placeholder="Enter password"
      {...props}
    />
  )
)