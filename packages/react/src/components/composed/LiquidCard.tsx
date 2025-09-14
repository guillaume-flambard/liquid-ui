import React, { forwardRef } from 'react'
import { LiquidCardProps } from '../../types'
import { LiquidSurface } from '../primitives/LiquidSurface'
import { LiquidContent } from '../primitives/LiquidContent'
import { cn } from '../../utils/cn'

/**
 * LiquidCard - Composed card component
 * Built using primitive components for glass effect cards
 */
export const LiquidCard = forwardRef<HTMLDivElement, LiquidCardProps>(
  ({ 
    children,
    className,
    variant = 'frosted',
    intensity = 'regular',
    opacity = 'regular',
    interactive = false,
    adaptiveOpacity = false,
    environmentBlending = false,
    padding = 'md',
    onClick,
    ...props 
  }, ref) => {
    return (
      <LiquidSurface
        ref={ref as any}
        variant={variant}
        intensity={intensity}
        opacity={opacity}
        interactive={interactive}
        adaptiveOpacity={adaptiveOpacity}
        environmentBlending={environmentBlending}
        className={cn(
          'liquid-card',
          'rounded-xl',
          'border border-white/10',
          'shadow-lg',
          interactive && 'hover:shadow-xl',
          className
        )}
        onClick={onClick}
        {...props}
      >
        <LiquidContent padding={padding}>
          {children}
        </LiquidContent>
      </LiquidSurface>
    )
  }
)

LiquidCard.displayName = 'LiquidCard'

// Preset variations
export const LiquidCardHero = forwardRef<HTMLDivElement, LiquidCardProps>(
  (props, ref) => (
    <LiquidCard
      ref={ref}
      variant="frosted"
      intensity="strong"
      padding="xl"
      className="min-h-[400px]"
      {...props}
    />
  )
)

export const LiquidCardCompact = forwardRef<HTMLDivElement, LiquidCardProps>(
  (props, ref) => (
    <LiquidCard
      ref={ref}
      variant="clear"
      intensity="light"
      padding="sm"
      {...props}
    />
  )
)

export const LiquidCardInteractive = forwardRef<HTMLDivElement, LiquidCardProps>(
  (props, ref) => (
    <LiquidCard
      ref={ref}
      interactive
      className="hover:scale-105 transition-transform duration-300"
      {...props}
    />
  )
)