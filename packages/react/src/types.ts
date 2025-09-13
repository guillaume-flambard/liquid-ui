import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react'
import type { GlassVariant, BlurIntensity, OpacityLevel } from '@liquid-ui/core'

// Base props for all liquid components
export interface BaseLiquidProps {
  variant?: GlassVariant
  intensity?: BlurIntensity
  opacity?: OpacityLevel
  interactive?: boolean
  adaptiveOpacity?: boolean
  environmentBlending?: boolean
  className?: string
  children?: ReactNode
}

// LiquidCard component props
export interface LiquidCardProps extends BaseLiquidProps, Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  hover?: boolean
  shadow?: boolean
  border?: boolean
  onHover?: (isHovered: boolean) => void
}

// LiquidButton component props
export interface LiquidButtonProps extends BaseLiquidProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

// LiquidInput component props
export interface LiquidInputProps extends BaseLiquidProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

// LiquidModal component props
export interface LiquidModalProps extends BaseLiquidProps {
  open: boolean
  onClose: () => void
  title?: string
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
}

// Component types with static presets
export type LiquidCardComponent = ForwardRefExoticComponent<LiquidCardProps & RefAttributes<HTMLDivElement>> & {
  Frosted: ForwardRefExoticComponent<Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'> & RefAttributes<HTMLDivElement>>
  Clear: ForwardRefExoticComponent<Omit<LiquidCardProps, 'variant' | 'opacity' | 'interactive' | 'hover'> & RefAttributes<HTMLDivElement>>
  Tinted: ForwardRefExoticComponent<Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'> & RefAttributes<HTMLDivElement>>
  Interactive: ForwardRefExoticComponent<Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow' | 'border'> & RefAttributes<HTMLDivElement>>
  Static: ForwardRefExoticComponent<Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow'> & RefAttributes<HTMLDivElement>>
}

export type LiquidButtonComponent = ForwardRefExoticComponent<LiquidButtonProps & RefAttributes<HTMLButtonElement>> & {
  Primary: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLButtonElement>>
  Secondary: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'variant' | 'opacity' | 'interactive'> & RefAttributes<HTMLButtonElement>>
  Tinted: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLButtonElement>>
  Small: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'size'> & RefAttributes<HTMLButtonElement>>
  Large: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'size'> & RefAttributes<HTMLButtonElement>>
}

export type LiquidInputComponent = ForwardRefExoticComponent<LiquidInputProps & RefAttributes<HTMLInputElement>> & {
  Default: ForwardRefExoticComponent<Omit<LiquidInputProps, 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>
  Clear: ForwardRefExoticComponent<Omit<LiquidInputProps, 'variant' | 'opacity' | 'interactive'> & RefAttributes<HTMLInputElement>>
  Email: ForwardRefExoticComponent<Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>
  Password: ForwardRefExoticComponent<Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>
  Search: ForwardRefExoticComponent<Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>
}