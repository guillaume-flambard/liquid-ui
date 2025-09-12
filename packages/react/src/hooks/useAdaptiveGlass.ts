import { useState, useEffect, useCallback, type RefObject } from 'react'
import { LiquidGlassEngine, calculateLuminance, parseColor, debounce } from '@liquid-ui/core'
import type { GlassConfig } from '@liquid-ui/core'

interface UseAdaptiveGlassProps {
  elementRef: RefObject<HTMLElement>
  config: GlassConfig
  enabled?: boolean
  debounceMs?: number
}

/**
 * useAdaptiveGlass - Hook for adaptive glass effects based on background
 * 
 * This hook analyzes the background behind the glass element and adjusts
 * opacity and tint automatically for optimal visual contrast and readability.
 */
export function useAdaptiveGlass({
  elementRef,
  config,
  enabled = true,
  debounceMs = 100
}: UseAdaptiveGlassProps) {
  const [adaptiveStyles, setAdaptiveStyles] = useState<Record<string, string>>({})
  const [backgroundLuminance, setBackgroundLuminance] = useState(0.5)
  
  // Analyze background and calculate adaptive styles
  const analyzeBackground = useCallback(
    debounce(() => {
      if (!enabled || !elementRef.current) return
      
      const element = elementRef.current
      const computedStyle = window.getComputedStyle(element.parentElement || element)
      const backgroundColor = computedStyle.backgroundColor
      
      // Parse background color and calculate luminance
      const colorData = parseColor(backgroundColor)
      if (colorData) {
        const luminance = calculateLuminance(colorData.r, colorData.g, colorData.b)
        setBackgroundLuminance(luminance)
        
        // Generate adaptive background using the engine
        const engine = LiquidGlassEngine.getInstance()
        const adaptiveBackground = engine.getAdaptiveBackground(config, luminance)
        
        setAdaptiveStyles({
          background: adaptiveBackground,
          // Adjust border opacity based on background
          borderColor: luminance > 0.5 
            ? 'rgba(0, 0, 0, 0.1)' 
            : 'rgba(255, 255, 255, 0.1)'
        })
      }
    }, debounceMs),
    [enabled, elementRef, config, debounceMs]
  )
  
  // Set up intersection observer to detect background changes
  useEffect(() => {
    if (!enabled || !elementRef.current) return
    
    const element = elementRef.current
    
    // Initial analysis
    analyzeBackground()
    
    // Create mutation observer to watch for style changes
    const observer = new MutationObserver((mutations) => {
      const hasStyleChanges = mutations.some(
        mutation => 
          mutation.type === 'attributes' && 
          mutation.attributeName === 'style'
      )
      
      if (hasStyleChanges) {
        analyzeBackground()
      }
    })
    
    // Observe parent elements for style changes
    let currentElement: HTMLElement | null = element.parentElement
    while (currentElement) {
      observer.observe(currentElement, {
        attributes: true,
        attributeFilter: ['style', 'class']
      })
      currentElement = currentElement.parentElement
    }
    
    // Also listen for window resize (might change background)
    window.addEventListener('resize', analyzeBackground)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', analyzeBackground)
    }
  }, [enabled, elementRef, analyzeBackground])
  
  // Re-analyze when config changes
  useEffect(() => {
    if (enabled) {
      analyzeBackground()
    }
  }, [config, analyzeBackground, enabled])
  
  return {
    adaptiveStyles,
    backgroundLuminance,
    reanalyze: analyzeBackground
  }
}