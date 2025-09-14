import React, { forwardRef, useRef, useState, useCallback, useId, useEffect } from 'react'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidInputProps, LiquidInputComponent } from '../types'

/**
 * LiquidInput - Glass form input component
 * 
 * A beautiful input field with liquid glass effects, perfect for forms and data entry.
 * Includes labels, error states, helper text, and icons.
 */
const LiquidInputBase = forwardRef<HTMLInputElement, LiquidInputProps>(
  (
    {
      variant = 'frosted',
      intensity = 'light',
      opacity = 'regular',
      interactive = true,
      adaptiveOpacity = false,
      environmentBlending = false,
      size = 'md',
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
    const [isFloating, setIsFloating] = useState(false)
    const [validationState, setValidationState] = useState<'valid' | 'invalid' | 'neutral'>('neutral')
    const [showValidation, setShowValidation] = useState(false)
    
    // Generate CSS classes for glass effects based on intensity
    const getGlassClasses = () => {
      const blurClasses = {
        light: 'backdrop-blur-sm',
        regular: 'backdrop-blur-md', 
        strong: 'backdrop-blur-lg'
      }
      
      const focusClasses = 'focus-within:ring-2 focus-within:ring-blue-400 focus:outline-none'
      
      return `${blurClasses[intensity]} ${focusClasses}`
    }

    // Add CSS styles for placeholder on client side only
    useEffect(() => {
      if (typeof document === 'undefined') return

      const styleId = 'liquid-input-styles'
      if (document.getElementById(styleId)) return

      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .liquid-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease;
        }
        .liquid-input input:focus::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .liquid-input input:disabled::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        .liquid-input input::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease;
        }
        .liquid-input input:focus::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .liquid-input input::-moz-placeholder {
          color: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: color 0.2s ease;
        }
        .liquid-input input:focus::-moz-placeholder {
          color: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }
        .liquid-input input:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .liquid-input input:focus:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      `
      document.head.appendChild(style)
    }, [])
    const [hasValue, setHasValue] = useState(Boolean(props.value || props.defaultValue))
    const [inputValue, setInputValue] = useState(props.value || props.defaultValue || '')
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    
    // Enhanced validation patterns
    const validationPatterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^[\+]?[1-9][\d]{0,3}?[\s\-\(]?[\d]{3}[\s\-\)]?[\d]{3}[\s\-]?[\d]{4}$/,
      url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      number: /^[0-9]+$/,
      decimal: /^[0-9]+\.?[0-9]*$/
    }
    
    // Auto-validation based on type and patterns
    const validateInput = useCallback((value: string) => {
      if (!value || !showValidation) {
        setValidationState('neutral')
        return
      }
      
      // Type-based validation
      if (props.type === 'email' && !validationPatterns.email.test(value)) {
        setValidationState('invalid')
        return
      }
      
      // Custom validation via props
      if (props.pattern && !new RegExp(props.pattern).test(value)) {
        setValidationState('invalid')
        return
      }
      
      // Min/max length validation
      if (props.minLength && value.length < props.minLength) {
        setValidationState('invalid')
        return
      }
      
      if (props.maxLength && value.length > props.maxLength) {
        setValidationState('invalid')
        return
      }
      
      // Required field validation
      if (props.required && !value.trim()) {
        setValidationState('invalid')
        return
      }
      
      setValidationState('valid')
    }, [props.type, props.pattern, props.minLength, props.maxLength, props.required, showValidation])
    
    const id = useId()
    const inputId = props.id || `liquid-input-${id}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined
    
    // Generate glass styles for the wrapper
    const { glassStyles } = useLiquidGlass({
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
    
    // Handle floating label animation
    useEffect(() => {
      setIsFloating(hasValue || isFocused)
    }, [hasValue, isFocused])
    
    // Handle validation on value change
    useEffect(() => {
      validateInput(String(inputValue))
    }, [inputValue, validateInput])
    
    // Handle input events
    const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      setShowValidation(true)
      props.onFocus?.(e)
    }, [props.onFocus])
    
    const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }, [props.onBlur])
    
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      // Don't process change events if disabled
      if (disabled) {
        e.preventDefault()
        return
      }
      
      const value = e.target.value
      setHasValue(Boolean(value))
      setInputValue(value)
      
      // Auto-formatting based on type
      if (props.type === 'tel') {
        // Simple phone number formatting (US format)
        const cleaned = value.replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?([2-9]\d{2})([2-9]\d{2})(\d{4})$/)
        if (match) {
          const formatted = `${match[1] ? '+1 ' : ''}(${match[2]}) ${match[3]}-${match[4]}`
          e.target.value = formatted
          setInputValue(formatted)
        }
      }
      
      if (!disabled) {
        props.onChange?.(e)
      }
    }, [props.onChange, props.type, disabled])
    
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
    
    // Size-based configurations
    const sizeConfig = {
      sm: {
        fontSize: '14px',
        padding: label ? '12px 12px 6px 12px' : '8px 12px',
        paddingLeft: (hasLeftIcon: boolean, hasLabel: boolean) => hasLeftIcon ? (hasLabel ? '36px' : '36px') : (hasLabel ? '12px' : '12px'),
        paddingRight: (hasRightIcon: boolean, hasValidation: boolean) => hasRightIcon ? '36px' : hasValidation ? '36px' : '12px',
        iconSize: '16px',
        iconOffset: '10px'
      },
      md: {
        fontSize: '15px',
        padding: label ? '16px 16px 8px 16px' : '12px 16px',
        paddingLeft: (hasLeftIcon: boolean, hasLabel: boolean) => hasLeftIcon ? (hasLabel ? '44px' : '44px') : (hasLabel ? '16px' : '16px'),
        paddingRight: (hasRightIcon: boolean, hasValidation: boolean) => hasRightIcon ? '44px' : hasValidation ? '44px' : '16px',
        iconSize: '18px',
        iconOffset: '14px'
      },
      lg: {
        fontSize: '16px',
        padding: label ? '20px 20px 10px 20px' : '16px 20px',
        paddingLeft: (hasLeftIcon: boolean, hasLabel: boolean) => hasLeftIcon ? (hasLabel ? '52px' : '52px') : (hasLabel ? '20px' : '20px'),
        paddingRight: (hasRightIcon: boolean, hasValidation: boolean) => hasRightIcon ? '52px' : hasValidation ? '52px' : '20px',
        iconSize: '20px',
        iconOffset: '16px'
      }
    }
    
    const currentSizeConfig = sizeConfig[size]
    
    // Base styles
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }
    
    const labelStyle: React.CSSProperties = {
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '6px',
      color: error ? '#ef4444' : validationState === 'valid' ? '#10b981' : validationState === 'invalid' ? '#ef4444' : isFocused ? '#3b82f6' : 'rgba(255, 255, 255, 0.9)',
      transition: 'color 0.2s ease',
    }
    
    const floatingLabelStyle: React.CSSProperties = {
      position: 'absolute',
      left: leftIcon ? '44px' : '16px',
      fontSize: isFloating ? '12px' : '15px',
      fontWeight: 500,
      color: error ? '#ef4444' : validationState === 'valid' ? '#10b981' : validationState === 'invalid' ? '#ef4444' : isFocused ? '#3b82f6' : 'rgba(255, 255, 255, 0.6)',
      transition: 'all 0.2s ease',
      transform: isFloating ? 'translateY(-22px)' : 'translateY(0px)',
      transformOrigin: 'left center',
      pointerEvents: 'none',
      background: isFloating ? 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 80%, transparent 100%)' : 'none',
      padding: isFloating ? '0 4px' : '0',
      zIndex: 1,
    }
    
    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '12px',
      border: `2px solid ${error ? 'rgba(239, 68, 68, 0.5)' : validationState === 'valid' ? 'rgba(16, 185, 129, 0.5)' : validationState === 'invalid' ? 'rgba(239, 68, 68, 0.5)' : isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
      transition: 'all 0.3s ease',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.5 : 1,
      transform: interactive && !disabled ? 'translateZ(0)' : 'none',
      boxShadow: isFocused 
        ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.1)' : validationState === 'valid' ? 'rgba(16, 185, 129, 0.1)' : validationState === 'invalid' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, 0 8px 32px rgba(0, 0, 0, 0.12)` 
        : validationState === 'valid' ? '0 4px 16px rgba(16, 185, 129, 0.08)' : validationState === 'invalid' ? '0 4px 16px rgba(239, 68, 68, 0.08)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
      // Apply glass styles
      ...glassStyles,
    }
    
    // Get CSS classes for input based on size
    const getInputClasses = () => {
      const baseClasses = {
        sm: 'text-sm py-2',
        md: 'text-base py-2.5', 
        lg: 'text-lg py-3'
      }
      
      // Handle padding based on icons
      let paddingClass = ''
      if (leftIcon && rightIcon) {
        paddingClass = size === 'sm' ? 'pl-10 pr-10' : size === 'lg' ? 'pl-12 pr-12' : 'pl-10 pr-10'
      } else if (leftIcon) {
        paddingClass = size === 'sm' ? 'pl-10 pr-3' : size === 'lg' ? 'pl-12 pr-6' : 'pl-10 pr-4'
      } else if (rightIcon) {
        paddingClass = size === 'sm' ? 'pl-3 pr-10' : size === 'lg' ? 'pl-6 pr-12' : 'pl-4 pr-10'
      } else {
        paddingClass = size === 'sm' ? 'px-3' : size === 'lg' ? 'px-6' : 'px-4'
      }
      
      return `${baseClasses[size]} ${paddingClass}`
    }
    
    const inputStyle: React.CSSProperties = {
      width: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: currentSizeConfig.padding,
      paddingLeft: currentSizeConfig.paddingLeft(!!leftIcon, !!label),
      paddingRight: currentSizeConfig.paddingRight(!!rightIcon, validationState !== 'neutral'),
      fontSize: currentSizeConfig.fontSize,
      lineHeight: '1.4',
      color: 'rgba(255, 255, 255, 0.95)',
      fontFamily: 'inherit',
      borderRadius: '10px',
    }
    
    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: currentSizeConfig.iconSize,
      height: currentSizeConfig.iconSize,
      color: 'rgba(255, 255, 255, 0.6)',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    
    const leftIconStyle: React.CSSProperties = {
      ...iconStyle,
      left: currentSizeConfig.iconOffset,
    }
    
    const rightIconStyle: React.CSSProperties = {
      ...iconStyle,
      right: currentSizeConfig.iconOffset,
    }
    
    const validationIconStyle: React.CSSProperties = {
      ...iconStyle,
      right: rightIcon ? (size === 'sm' ? '36px' : size === 'lg' ? '52px' : '44px') : currentSizeConfig.iconOffset,
      color: validationState === 'valid' ? '#10b981' : validationState === 'invalid' ? '#ef4444' : 'rgba(255, 255, 255, 0.6)',
    }
    
    const helperStyle: React.CSSProperties = {
      fontSize: '12px',
      marginTop: '6px',
      color: error ? '#ef4444' : validationState === 'valid' ? '#10b981' : validationState === 'invalid' ? '#ef4444' : 'rgba(255, 255, 255, 0.6)',
      lineHeight: '1.4',
      transition: 'color 0.2s ease',
    }
    
    // Auto-suggestion styles
    const suggestionStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      zIndex: 10,
      marginTop: '4px',
      borderRadius: '8px',
      overflow: 'hidden',
      ...glassStyles,
    }
    
    return (
      <div style={containerStyle} className={`liquid-input ${className || ''}`}>
        {label && !props.placeholder && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
            {props.required && (
              <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
            )}
          </label>
        )}
        
        <div
          ref={wrapperRef}
          className={`${getGlassClasses()} ${error ? 'ring-red-500' : ''}`}
          style={wrapperStyle}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          {/* Floating label */}
          {label && props.placeholder && (
            <label htmlFor={inputId} style={floatingLabelStyle}>
              {label}
              {props.required && (
                <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
              )}
            </label>
          )}
          
          {/* Left icon */}
          {leftIcon && (
            <div style={leftIconStyle}>
              {leftIcon}
            </div>
          )}
          
          {/* Required indicator when no label */}
          {!label && props.required && (
            <span style={{ position: 'absolute', top: '-8px', right: '8px', color: '#ef4444', fontSize: '16px', fontWeight: 'bold' }}>*</span>
          )}
          
          {/* Input field */}
          <input
            ref={(node) => {
              // Handle both forwarded ref and internal ref
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
              }
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            id={inputId}
            type={props.type || 'text'}
            className={`${getInputClasses()} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className || ''}`}
            style={{...inputStyle, ...style}}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'error-message' : helperId || undefined}
            {...props}
            onChange={disabled ? undefined : onChange}
          />
          
          {/* Validation icon */}
          {validationState !== 'neutral' && showValidation && (
            <div style={validationIconStyle}>
              {validationState === 'valid' ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )}
          
          {/* Right icon */}
          {rightIcon && (
            <div style={rightIconStyle}>
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <div
            id={error ? 'error-message' : helperId}
            style={helperStyle}
          >
            {error || helperText}
          </div>
        )}
      </div>
    )
  }
)

LiquidInputBase.displayName = 'LiquidInput'

// Create the main component with proper typing
export const LiquidInput = LiquidInputBase as LiquidInputComponent

// Preset components for easier usage
LiquidInput.Default = forwardRef<HTMLInputElement, Omit<LiquidInputProps, 'variant' | 'intensity' | 'interactive'>>((props, ref) => (
  <LiquidInputBase
    ref={ref}
    variant="frosted"
    intensity="light"
    interactive
    {...props}
  />
))
LiquidInput.Default.displayName = 'LiquidInput.Default'

LiquidInput.Clear = forwardRef<HTMLInputElement, Omit<LiquidInputProps, 'variant' | 'opacity' | 'interactive'>>((props, ref) => (
  <LiquidInputBase
    ref={ref}
    variant="clear"
    opacity="light"
    interactive
    {...props}
  />
))
LiquidInput.Clear.displayName = 'LiquidInput.Clear'

LiquidInput.Email = forwardRef<HTMLInputElement, Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'>>((props, ref) => (
  <LiquidInputBase
    ref={ref}
    type="email"
    variant="frosted"
    intensity="light"
    interactive
    {...props}
  />
))
LiquidInput.Email.displayName = 'LiquidInput.Email'

LiquidInput.Password = forwardRef<HTMLInputElement, Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'>>((props, ref) => (
  <LiquidInputBase
    ref={ref}
    type="password"
    variant="frosted"
    intensity="light"
    interactive
    {...props}
  />
))
LiquidInput.Password.displayName = 'LiquidInput.Password'

LiquidInput.Search = forwardRef<HTMLInputElement, Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'>>((props, ref) => (
  <LiquidInputBase
    ref={ref}
    type="search"
    variant="clear"
    intensity="light"
    interactive
    {...props}
  />
))
LiquidInput.Search.displayName = 'LiquidInput.Search'