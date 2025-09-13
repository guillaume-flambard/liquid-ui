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
      intensity = 'subtle',
      opacity = 'regular',
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
      color: error ? '#ef4444' : isFocused ? '#3b82f6' : 'rgba(255, 255, 255, 0.9)',
      transition: 'color 0.2s ease',
    }
    
    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '12px',
      border: `1px solid ${error ? 'rgba(239, 68, 68, 0.5)' : isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
      transition: 'all 0.2s ease',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.5 : 1,
      transform: interactive && !disabled ? 'translateZ(0)' : 'none',
      boxShadow: isFocused 
        ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, 0 8px 32px rgba(0, 0, 0, 0.12)` 
        : '0 4px 16px rgba(0, 0, 0, 0.08)',
      ...glassStyles,
    }
    
    const inputStyle: React.CSSProperties = {
      width: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '12px 16px',
      paddingLeft: leftIcon ? '44px' : '16px',
      paddingRight: rightIcon ? '44px' : '16px',
      fontSize: '15px',
      lineHeight: '1.4',
      color: 'rgba(255, 255, 255, 0.95)',
      fontFamily: 'inherit',
      borderRadius: '12px',
    }
    
    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '18px',
      height: '18px',
      color: 'rgba(255, 255, 255, 0.6)',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    
    const leftIconStyle: React.CSSProperties = {
      ...iconStyle,
      left: '14px',
    }
    
    const rightIconStyle: React.CSSProperties = {
      ...iconStyle,
      right: '14px',
    }
    
    const helperStyle: React.CSSProperties = {
      fontSize: '12px',
      marginTop: '6px',
      color: error ? '#ef4444' : 'rgba(255, 255, 255, 0.6)',
      lineHeight: '1.4',
    }
    
    return (
      <div style={containerStyle} className={`liquid-input ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
          </label>
        )}
        
        <div
          ref={wrapperRef}
          style={{...wrapperStyle, ...style}}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        >
          {/* Left icon */}
          {leftIcon && (
            <div style={leftIconStyle}>
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
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
              }
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
            }}
            id={inputId}
            style={inputStyle}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={errorId || helperId || undefined}
            {...props}
          />
          
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
            id={errorId || helperId}
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
    intensity="subtle"
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
    intensity="subtle"
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
    intensity="subtle"
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
    intensity="subtle"
    interactive
    {...props}
  />
))
LiquidInput.Search.displayName = 'LiquidInput.Search'