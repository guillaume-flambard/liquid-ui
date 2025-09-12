import { useCallback, useRef, type RefObject } from 'react'
import { LiquidGlassEngine, throttle } from '@liquid-ui/core'
import type { Point } from '@liquid-ui/core'

interface UseInteractiveGlassProps {
  elementRef: RefObject<HTMLElement>
  enabled?: boolean
  onHover?: (isHovered: boolean) => void
  throttleMs?: number
}

/**
 * useInteractiveGlass - Hook for interactive glass physics effects
 * 
 * This hook handles mouse interactions and applies Apple's liquid glass
 * physics calculations for realistic refraction and hover effects.
 */
export function useInteractiveGlass({
  elementRef,
  enabled = true,
  onHover,
  throttleMs = 16 // ~60fps
}: UseInteractiveGlassProps) {
  const engine = useRef(LiquidGlassEngine.getInstance())
  const isHoveredRef = useRef(false)
  
  // Throttled mouse move handler for performance
  const throttledMouseMove = useCallback(
    throttle((mousePosition: Point) => {
      if (!enabled || !elementRef.current) return
      
      const element = elementRef.current
      const bounds = element.getBoundingClientRect()
      
      // Calculate refraction intensity using Apple's formula
      const refraction = engine.current.calculateRefraction(
        mousePosition,
        {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height
        }
      )
      
      // Apply subtle transform based on refraction
      const transformX = (mousePosition.x - bounds.left - bounds.width / 2) / bounds.width * 10
      const transformY = (mousePosition.y - bounds.top - bounds.height / 2) / bounds.height * 10
      
      // Update element style with physics-based transforms
      element.style.transform = `perspective(1000px) rotateX(${-transformY * refraction}deg) rotateY(${transformX * refraction}deg) translateZ(${refraction * 5}px)`
    }, throttleMs),
    [enabled, elementRef, throttleMs]
  )
  
  const handleMouseEnter = useCallback(() => {
    if (!enabled) return
    
    isHoveredRef.current = true
    onHover?.(true)
    
    if (elementRef.current) {
      elementRef.current.style.transition = 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
    }
  }, [enabled, onHover, elementRef])
  
  const handleMouseLeave = useCallback(() => {
    if (!enabled) return
    
    isHoveredRef.current = false
    onHover?.(false)
    
    if (elementRef.current) {
      // Reset transform with smooth transition
      elementRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      
      // Clean up transition after animation
      setTimeout(() => {
        if (elementRef.current && !isHoveredRef.current) {
          elementRef.current.style.transition = ''
        }
      }, 200)
    }
  }, [enabled, onHover, elementRef])
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enabled) return
    
    const mousePosition: Point = {
      x: e.clientX,
      y: e.clientY
    }
    
    throttledMouseMove(mousePosition)
  }, [enabled, throttledMouseMove])
  
  return {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  }
}