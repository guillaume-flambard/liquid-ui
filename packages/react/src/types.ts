import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
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
  as?: keyof JSX.IntrinsicElements
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