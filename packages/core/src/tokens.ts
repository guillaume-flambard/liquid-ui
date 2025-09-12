/**
 * Liquid UI Design Tokens
 * Based on Apple's Liquid Glass specifications
 */

export const liquidTokens = {
  glass: {
    blur: {
      subtle: '5px',    // Light blur for subtle glass effects
      regular: '12px',  // Standard Apple glass blur
      strong: '20px',   // Maximum blur for dramatic effects
      none: '0px'       // Disable blur (fallback)
    },
    opacity: {
      light: 0.15,      // 15% - Apple minimum for glass
      regular: 0.25,    // 25% - Balanced transparency
      medium: 0.45,     // 45% - More solid appearance
      strong: 0.85      // 85% - Apple maximum for glass
    },
    physics: {
      // Official Apple refraction formula: 1.0 - normalizedDist²
      refraction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      spring: {
        tension: 300,
        friction: 30
      },
      hover: {
        duration: '0.2s',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    },
    colors: {
      // Glass tint colors for different variants
      clear: 'rgba(255, 255, 255, 0)',
      frosted: 'rgba(255, 255, 255, 0.1)',
      tinted: 'rgba(0, 122, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.1)'
    },
    border: {
      subtle: '1px solid rgba(255, 255, 255, 0.1)',
      regular: '1px solid rgba(255, 255, 255, 0.2)',
      strong: '1px solid rgba(255, 255, 255, 0.3)'
    },
    shadow: {
      subtle: '0 4px 16px rgba(0, 0, 0, 0.1)',
      regular: '0 8px 32px rgba(0, 0, 0, 0.15)',
      strong: '0 16px 64px rgba(0, 0, 0, 0.2)'
    }
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem'      // 48px
  },
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    xxl: '1.5rem',   // 24px
    full: '9999px'
  },
  typography: {
    fontFamily: {
      system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  }
} as const

// Type helpers for better TypeScript support
export type LiquidTokens = typeof liquidTokens
export type GlassVariant = 'clear' | 'frosted' | 'tinted' | 'dark'
export type BlurIntensity = 'subtle' | 'regular' | 'strong' | 'none'
export type OpacityLevel = 'light' | 'regular' | 'medium' | 'strong'