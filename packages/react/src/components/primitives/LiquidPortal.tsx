import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { LiquidPortalProps } from './types'

/**
 * LiquidPortal - Primitive for rendering content in a portal
 * Used by overlays and modals to render outside the component tree
 */
export const LiquidPortal: React.FC<LiquidPortalProps> = ({
  children,
  target
}) => {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof target === 'string') {
      containerRef.current = document.querySelector(target)
    } else if (target instanceof HTMLElement) {
      containerRef.current = target
    } else {
      containerRef.current = document.body
    }
  }, [target])

  if (!containerRef.current) {
    containerRef.current = document.body
  }

  return createPortal(children, containerRef.current)
}