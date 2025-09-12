import React, { forwardRef, useRef, useState, useCallback, useId } from 'react'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidInputProps } from '../types'

/**
 * LiquidInput - Glass form input component
 * 
 * A beautiful input field with liquid glass effects, perfect for forms and data entry.
 * Includes labels, error states, helper text, and icons.
 */
export const LiquidInput = forwardRef<HTMLInputElement, LiquidInputProps>(
  (
    {
      variant = 'frosted',
      intensity = 'subtle',
      opacity = 'light',
      interactive = true,
      adaptiveOpacity = false,
      environmentBlending = false,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(Boolean(props.value || props.defaultValue))
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    
    const id = useId()
    const inputId = props.id || `liquid-input-${id}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined
    
    // Generate glass styles for the wrapper
    const glassStyles = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    })
    
    // Interactive effects on the wrapper
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: wrapperRef,
      enabled: interactive && !disabled
    })
    
    // Handle input events
    const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }, [props.onFocus])
    
    const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }, [props.onBlur])
    
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value))
      props.onChange?.(e)
    }, [props.onChange])
    
    // Handle wrapper mouse events
    const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseEnter()
    }, [handleMouseEnter])
    
    const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseLeave()
    }, [handleMouseLeave])
    
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseMove(e)
    }, [handleMouseMove])
    
    // Wrapper classes
    const wrapperClasses = clsx(
      'liquid-input-wrapper',
      'relative',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'ease-out',
      
      // Border and shadow states
      error ? 'border-red-500/50' : 'border-white/10',
      isFocused && !error && 'border-blue-500/50 ring-1 ring-blue-500/20',
      
      // Interactive styles
      interactive && !disabled && [
        'transform-gpu',
        'hover:shadow-lg'
      ],
      
      // Disabled styles
      disabled && 'opacity-50 cursor-not-allowed',
      
      // Width
      fullWidth && 'w-full'
    )
    
    // Input classes
    const inputClasses = clsx(
      'liquid-input',
      'w-full',
      'bg-transparent',
      'px-3',
      'py-2',
      'text-sm',
      'placeholder-gray-400',
      'border-none',
      'outline-none',
      'rounded-lg',
      
      // Padding adjustments for icons
      leftIcon && 'pl-10',
      rightIcon && 'pr-10'
    )
    
    // Label classes
    const labelClasses = clsx(
      'block',
      'text-sm',
      'font-medium',
      'mb-1',
      'transition-colors',
      'duration-200',
      
      error ? 'text-red-400' : 'text-gray-300',
      isFocused && !error && 'text-blue-400'
    )
    
    // Helper/error text classes
    const helperClasses = clsx(
      'mt-1',
      'text-xs',
      error ? 'text-red-400' : 'text-gray-400'
    )
    
    // Icon classes
    const iconClasses = clsx(
      'absolute',
      'top-1/2',
      '-translate-y-1/2',
      'w-4',
      'h-4',
      'text-gray-400',
      'pointer-events-none'
    )
    
    return (
      <div className={clsx('liquid-input-container', fullWidth && 'w-full', className)}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        
        <div
          ref={wrapperRef}
          className={wrapperClasses}
          style={{ ...glassStyles, ...style }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          {/* Left icon */}
          {leftIcon && (
            <div className={clsx(iconClasses, 'left-3')}>
              {leftIcon}
            </div>
          )}
          
          {/* Input field */}
          <input
            ref={(node) => {
              // Handle both forwarded ref and internal ref
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
              inputRef.current = node
            }}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={clsx(errorId, helperId).trim() || undefined}
            {...props}
          />
          
          {/* Right icon */}
          {rightIcon && (
            <div className={clsx(iconClasses, 'right-3')}>
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <div
            id={errorId || helperId}
            className={helperClasses}
          >
            {error || helperText}
          </div>
        )}
      </div>
    )
  }
)

LiquidInput.displayName = 'LiquidInput'