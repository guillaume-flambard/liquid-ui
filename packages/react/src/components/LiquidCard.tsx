import React, { forwardRef, useRef, useCallback, useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { useLiquidGlass } from '../hooks/useLiquidGlass'
import { useInteractiveGlass } from '../hooks/useInteractiveGlass'
import type { LiquidCardProps, LiquidCardComponent } from '../types'

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

interface MagneticEffect {
  x: number
  y: number
  intensity: number
}

/**
 * LiquidCard - The signature Liquid UI component
 * 
 * A beautiful glass card with Apple-style liquid glass effects, perfect physics,
 * and smooth animations. This is the cornerstone component of Liquid UI.
 */
const LiquidCardBase = forwardRef<HTMLDivElement, LiquidCardProps>(
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
      padding = 'md',
      className,
      children,
      onHover,
      onLiquidDragStart,
      onLiquidDrag,
      onLiquidDragEnd,
      draggable = false,
      magneticEdges = false,
      magneticStrength = 0.3,
      style,
      ...rest
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)
    const [dragState, setDragState] = useState<DragState>({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    })
    const [magneticEffect, setMagneticEffect] = useState<MagneticEffect>({ x: 0, y: 0, intensity: 0 })
    const [shadowDepth, setShadowDepth] = useState(0)
    const cardRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Use our custom hooks for glass effects
    const { glassStyles } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    })
    
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: cardRef,
      enabled: interactive && hover && !dragState.isDragging,
      onHover: (hovered) => {
        setIsHovered(hovered)
        onHover?.(hovered)
        if (hovered) {
          setShadowDepth(1)
        } else {
          setShadowDepth(0)
        }
      }
    })
    
    // Magnetic edges effect
    useEffect(() => {
      if (!magneticEdges || !isHovered || dragState.isDragging) return
      
      const handleMagneticMove = (e: MouseEvent) => {
        const card = cardRef.current
        if (!card) return
        
        const rect = card.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const maxDistance = Math.max(rect.width, rect.height) / 2
        
        if (distance < maxDistance) {
          const intensity = (1 - distance / maxDistance) * magneticStrength
          setMagneticEffect({
            x: deltaX * intensity * 0.1,
            y: deltaY * intensity * 0.1,
            intensity
          })
        } else {
          setMagneticEffect({ x: 0, y: 0, intensity: 0 })
        }
      }
      
      document.addEventListener('mousemove', handleMagneticMove)
      return () => document.removeEventListener('mousemove', handleMagneticMove)
    }, [magneticEdges, isHovered, dragState.isDragging, magneticStrength])
    
    // Drag functionality
    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
      if (!draggable) return
      
      e.preventDefault()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      setDragState({
        isDragging: true,
        startX: clientX,
        startY: clientY,
        currentX: 0,
        currentY: 0
      })
      
      setShadowDepth(2)
      onLiquidDragStart?.(e)
    }, [draggable, onLiquidDragStart])
    
    const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
      if (!dragState.isDragging) return
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      const deltaX = clientX - dragState.startX
      const deltaY = clientY - dragState.startY
      
      setDragState(prev => ({
        ...prev,
        currentX: deltaX,
        currentY: deltaY
      }))
      
      onLiquidDrag?.(e, { x: deltaX, y: deltaY })
    }, [dragState.isDragging, dragState.startX, dragState.startY, onLiquidDrag])
    
    const handleDragEnd = useCallback((e: MouseEvent | TouchEvent) => {
      if (!dragState.isDragging) return
      
      setDragState({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
      })
      
      setShadowDepth(0)
      setMagneticEffect({ x: 0, y: 0, intensity: 0 })
      onLiquidDragEnd?.(e)
    }, [dragState.isDragging, onLiquidDragEnd])
    
    // Global drag event listeners
    useEffect(() => {
      if (dragState.isDragging) {
        document.addEventListener('mousemove', handleDragMove)
        document.addEventListener('mouseup', handleDragEnd)
        document.addEventListener('touchmove', handleDragMove)
        document.addEventListener('touchend', handleDragEnd)
        
        return () => {
          document.removeEventListener('mousemove', handleDragMove)
          document.removeEventListener('mouseup', handleDragEnd)
          document.removeEventListener('touchmove', handleDragMove)
          document.removeEventListener('touchend', handleDragEnd)
        }
      }
    }, [dragState.isDragging, handleDragMove, handleDragEnd])
    
    // Combine all mouse event handlers
    const onMouseEnter = useCallback((e: React.MouseEvent) => {
      if (!dragState.isDragging) {
        handleMouseEnter()
      }
      rest.onMouseEnter?.(e as any)
    }, [handleMouseEnter, rest.onMouseEnter, dragState.isDragging])
    
    const onMouseLeave = useCallback((e: React.MouseEvent) => {
      if (!dragState.isDragging) {
        handleMouseLeave()
        setMagneticEffect({ x: 0, y: 0, intensity: 0 })
      }
      rest.onMouseLeave?.(e as any)
    }, [handleMouseLeave, rest.onMouseLeave, dragState.isDragging])
    
    const onMouseMove = useCallback((e: React.MouseEvent) => {
      if (!dragState.isDragging) {
        handleMouseMove(e as React.MouseEvent<HTMLDivElement>)
      }
      rest.onMouseMove?.(e as any)
    }, [handleMouseMove, rest.onMouseMove, dragState.isDragging])
    
    const onMouseDown = useCallback((e: React.MouseEvent) => {
      handleDragStart(e)
      rest.onMouseDown?.(e as any)
    }, [handleDragStart, rest.onMouseDown])
    
    const onTouchStart = useCallback((e: React.TouchEvent) => {
      handleDragStart(e)
      rest.onTouchStart?.(e as any)
    }, [handleDragStart, rest.onTouchStart])
    
    // Padding classes
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12'
    }
    
    // Build CSS classes
    const classes = clsx(
      // Base glass card styles
      'liquid-card',
      'relative',
      'overflow-hidden',
      'transition-all',
      'duration-200',
      'ease-out',
      'rounded-xl',
      
      // Padding styles
      paddingClasses[padding],
      
      // Border styles
      border && 'border border-white/10',
      
      // Dynamic shadow styles based on depth
      shadow && [
        shadowDepth === 0 && 'shadow-lg',
        shadowDepth === 1 && 'shadow-xl',
        shadowDepth === 2 && 'shadow-2xl',
        dragState.isDragging && 'shadow-2xl shadow-blue-500/25'
      ],
      
      // Interactive styles
      interactive && [
        !dragState.isDragging && 'cursor-pointer',
        'transform-gpu',
        !dragState.isDragging && 'transition-all',
        !dragState.isDragging && 'duration-300',
        !dragState.isDragging && 'ease-out',
        hover && 'hover:scale-105'
      ],
      
      // Draggable styles
      draggable && [
        'select-none',
        dragState.isDragging && [
          'cursor-grabbing',
          'z-50'
        ],
        !dragState.isDragging && draggable && 'cursor-grab'
      ],
      
      // Custom className
      className
    )
    
    // Merge styles with transforms
    const transformStyles = {
      transform: dragState.isDragging 
        ? `translate3d(${dragState.currentX + magneticEffect.x}px, ${dragState.currentY + magneticEffect.y}px, 0px)` 
        : magneticEffect.intensity > 0 
        ? `translate3d(${magneticEffect.x}px, ${magneticEffect.y}px, 0px) ${isHovered ? 'scale(1.02)' : ''}`
        : isHovered && !dragState.isDragging ? 'scale(1.02)' : 'none',
      filter: [
        (glassStyles as any).filter || '',
        dragState.isDragging ? 'brightness(1.1)' : '',
        magneticEffect.intensity > 0 ? `hue-rotate(${magneticEffect.intensity * 10}deg)` : ''
      ].filter(Boolean).join(' '),
      transition: dragState.isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1), filter 0.2s ease',
      willChange: dragState.isDragging ? 'transform' : 'auto'
    }
    
    const combinedStyles = {
      ...glassStyles,
      ...transformStyles,
      ...style
    }
    
    return (
      <div
        ref={(node: HTMLDivElement | null) => {
          // Handle both forwarded ref and internal ref
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
          if (cardRef.current !== node) {
            (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
        }}
        className={classes}
        style={combinedStyles}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        draggable={false}
        {...rest}
      >
        {/* Magnetic field visualization */}
        {magneticEdges && magneticEffect.intensity > 0 && (
          <div 
            className="absolute inset-0 rounded-inherit pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, 
                rgba(59, 130, 246, ${magneticEffect.intensity * 0.1}) 0%, 
                transparent 70%
              )`,
              opacity: magneticEffect.intensity
            }}
          />
        )}
        
        {/* Drag indicator */}
        {draggable && isHovered && !dragState.isDragging && (
          <div className="absolute top-2 right-2 opacity-50 pointer-events-none">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        )}
        {children}
      </div>
    )
  }
)

LiquidCardBase.displayName = 'LiquidCard'

// Create the main component with proper typing
export const LiquidCard = LiquidCardBase as LiquidCardComponent

// Preset components for easier usage
LiquidCard.Frosted = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    variant="frosted"
    intensity="regular"
    interactive
    hover
    shadow
    {...props}
  />
))
LiquidCard.Frosted.displayName = 'LiquidCard.Frosted'

LiquidCard.Clear = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'variant' | 'opacity' | 'interactive' | 'hover'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    variant="clear"
    opacity="light"
    interactive
    hover
    {...props}
  />
))
LiquidCard.Clear.displayName = 'LiquidCard.Clear'

LiquidCard.Tinted = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    variant="tinted"
    intensity="regular"
    interactive
    hover
    shadow
    {...props}
  />
))
LiquidCard.Tinted.displayName = 'LiquidCard.Tinted'

LiquidCard.Interactive = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow' | 'border'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    interactive
    hover
    shadow
    border
    {...props}
  />
))
LiquidCard.Interactive.displayName = 'LiquidCard.Interactive'

LiquidCard.Static = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    interactive={false}
    hover={false}
    shadow={false}
    {...props}
  />
))
LiquidCard.Static.displayName = 'LiquidCard.Static'

LiquidCard.Hero = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'padding' | 'variant' | 'intensity'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    padding="xl"
    variant="frosted"
    intensity="strong"
    {...props}
  />
))
LiquidCard.Hero.displayName = 'LiquidCard.Hero'

LiquidCard.Compact = forwardRef<HTMLDivElement, Omit<LiquidCardProps, 'padding' | 'variant'>>((props, ref) => (
  <LiquidCardBase
    ref={ref}
    padding="sm"
    variant="clear"
    {...props}
  />
))
LiquidCard.Compact.displayName = 'LiquidCard.Compact'