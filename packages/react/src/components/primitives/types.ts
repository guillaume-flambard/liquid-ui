import { ReactNode, HTMLAttributes, CSSProperties } from 'react'
import { GlassVariant, BlurIntensity, OpacityLevel } from '@liquid-ui/core'

export interface LiquidBaseProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export interface LiquidSurfaceProps extends LiquidBaseProps {
  variant?: GlassVariant
  intensity?: BlurIntensity
  opacity?: OpacityLevel
  interactive?: boolean
  adaptiveOpacity?: boolean
  environmentBlending?: boolean
  as?: keyof JSX.IntrinsicElements
}

export interface LiquidOverlayProps extends LiquidBaseProps {
  isOpen: boolean
  onClose?: () => void
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  variant?: GlassVariant
  intensity?: BlurIntensity
}

export interface LiquidContentProps extends LiquidBaseProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface LiquidInteractiveProps extends LiquidBaseProps {
  onPress?: () => void
  onPressStart?: () => void
  onPressEnd?: () => void
  onHover?: (isHovered: boolean) => void
  disabled?: boolean
  loading?: boolean
  tabIndex?: number
}

export interface LiquidTextProps extends LiquidBaseProps {
  variant?: 'display' | 'title' | 'body' | 'caption' | 'label'
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success'
  as?: keyof JSX.IntrinsicElements
}

export interface LiquidIconProps extends LiquidBaseProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  spin?: boolean
}

export interface LiquidSpinnerProps extends LiquidBaseProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

export interface LiquidPortalProps {
  children: ReactNode
  target?: HTMLElement | string
}