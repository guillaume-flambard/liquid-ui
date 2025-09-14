/**
 * LIQUID UI Design Tokens
 * 
 * Authentic Apple Liquid Glass specifications based on official Apple design system
 * All values are derived from Apple's Human Interface Guidelines and iOS specifications
 */

// Apple System Colors (Light Mode)
export const appleColors = {
  // Primary System Colors
  systemBlue: 'rgb(0, 122, 255)',
  systemGreen: 'rgb(52, 199, 89)',
  systemIndigo: 'rgb(88, 86, 214)',
  systemOrange: 'rgb(255, 149, 0)',
  systemPink: 'rgb(255, 45, 85)',
  systemPurple: 'rgb(175, 82, 222)',
  systemRed: 'rgb(255, 59, 48)',
  systemTeal: 'rgb(90, 200, 250)',
  systemYellow: 'rgb(255, 204, 0)',
  
  // System Grays
  systemGray: 'rgb(142, 142, 147)',
  systemGray2: 'rgb(174, 174, 178)',
  systemGray3: 'rgb(199, 199, 204)',
  systemGray4: 'rgb(209, 209, 214)',
  systemGray5: 'rgb(229, 229, 234)',
  systemGray6: 'rgb(242, 242, 247)',
  
  // Label Colors
  label: 'rgba(0, 0, 0, 1)',
  secondaryLabel: 'rgba(60, 60, 67, 0.6)',
  tertiaryLabel: 'rgba(60, 60, 67, 0.3)',
  quaternaryLabel: 'rgba(60, 60, 67, 0.18)',
  
  // Glass Materials
  glassMaterial: 'rgba(255, 255, 255, 0.25)',
  glassBorder: 'rgba(255, 255, 255, 0.3)',
  glassHighlight: 'rgba(255, 255, 255, 0.5)',
} as const

// Apple System Colors (Dark Mode)
export const appleColorsDark = {
  // Primary System Colors (Dark Mode)
  systemBlue: 'rgb(10, 132, 255)',
  systemGreen: 'rgb(48, 209, 88)',
  systemIndigo: 'rgb(94, 92, 230)',
  systemOrange: 'rgb(255, 159, 10)',
  systemPink: 'rgb(255, 55, 95)',
  systemPurple: 'rgb(191, 90, 242)',
  systemRed: 'rgb(255, 69, 58)',
  systemTeal: 'rgb(100, 210, 255)',
  systemYellow: 'rgb(255, 214, 10)',
  
  // System Grays (Dark Mode)
  systemGray: 'rgb(142, 142, 147)',
  systemGray2: 'rgb(99, 99, 102)',
  systemGray3: 'rgb(72, 72, 74)',
  systemGray4: 'rgb(58, 58, 60)',
  systemGray5: 'rgb(44, 44, 46)',
  systemGray6: 'rgb(28, 28, 30)',
  
  // Label Colors (Dark Mode)
  label: 'rgba(255, 255, 255, 1)',
  secondaryLabel: 'rgba(235, 235, 245, 0.6)',
  tertiaryLabel: 'rgba(235, 235, 245, 0.3)',
  quaternaryLabel: 'rgba(235, 235, 245, 0.18)',
  
  // Glass Materials (Dark Mode)
  glassMaterial: 'rgba(0, 0, 0, 0.3)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassHighlight: 'rgba(255, 255, 255, 0.2)',
} as const

// Apple Glass Specifications
export const appleGlassSpecs = {
  frosted: {
    blur: '12px',
    background: 'rgba(255, 255, 255, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    saturation: '180%', // Apple standard
    brightness: '110%'
  },
  strong: {
    blur: '20px', 
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    saturation: '200%',
    brightness: '120%'
  },
  clear: {
    blur: '8px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    saturation: '150%'
  },
  tinted: {
    blur: '12px',
    background: 'rgba(0, 122, 255, 0.12)', // Apple blue
    border: '1px solid rgba(0, 122, 255, 0.25)',
    saturation: '180%'
  },
  dark: {
    blur: '12px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    saturation: '120%',
    brightness: '80%'
  }
} as const

// Apple Typography System
export const appleTypography = {
  fontFamily: {
    system: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif'
  },
  fontSize: {
    caption2: '11px',   // iOS Caption 2
    caption1: '12px',   // iOS Caption 1  
    footnote: '13px',   // iOS Footnote
    subheadline: '15px', // iOS Subheadline
    callout: '16px',    // iOS Callout
    body: '17px',       // iOS Body (default)
    headline: '17px',   // iOS Headline (semibold)
    title3: '20px',     // iOS Title 3
    title2: '22px',     // iOS Title 2
    title1: '28px',     // iOS Title 1
    largeTitle: '34px'  // iOS Large Title
  },
  fontWeight: {
    ultraLight: 100,
    thin: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
    black: 900
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6
  }
} as const

// Apple Spacing System (iOS Standard Margins)
export const appleSpacing = {
  xs: '4px',    // Minimal spacing
  sm: '8px',    // Small spacing  
  md: '16px',   // Standard iOS margin
  lg: '20px',   // Large spacing
  xl: '24px',   // Extra large
  xxl: '32px',  // Maximum standard
  
  // Component-specific
  buttonPadding: {
    sm: '8px 16px',
    md: '12px 20px', 
    lg: '16px 24px'
  },
  cardPadding: {
    sm: '12px',
    md: '16px',
    lg: '20px'
  }
} as const

// Apple Physics and Animation System
export const applePhysics = {
  spring: {
    // Apple's standard spring configuration
    tension: 300,
    friction: 30,
    mass: 1
  },
  easing: {
    standard: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Apple standard
    deceleration: 'cubic-bezier(0.23, 1, 0.32, 1)',   // Apple deceleration
    acceleration: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Apple acceleration
    sharp: 'cubic-bezier(0.4, 0, 0.2, 1)'              // Material sharp (fallback)
  },
  duration: {
    fast: '0.15s',     // Quick state changes
    normal: '0.25s',   // Standard animations  
    slow: '0.35s',     // Complex transitions
    springy: '0.6s'    // Spring-based animations
  }
} as const

// Accessibility Specifications (WCAG AA)
export const accessibilitySpecs = {
  contrast: {
    minimum: 4.5, // WCAG AA standard
    enhanced: 7.0  // WCAG AAA standard
  },
  focusIndicator: {
    width: '2px',
    color: 'rgb(0, 122, 255)', // Apple blue
    offset: '2px',
    borderRadius: 'inherit',
    boxShadow: '0 0 0 2px rgba(0, 122, 255, 0.5), 0 0 0 4px rgba(0, 122, 255, 0.2)'
  },
  reducedMotion: {
    respectPreference: true,
    fallbackDuration: '0.01s', // Near-instant for reduced motion
    essentialMotion: ['focus-indicator', 'loading-spinner'] // Never disable these
  }
} as const

// Glass Depth Layers
export const glassLayers = {
  background: {
    zIndex: 1,
    blur: '20px',
    opacity: 0.1
  },
  content: {
    zIndex: 10,
    blur: '12px', 
    opacity: 0.25
  },
  interactive: {
    zIndex: 20,
    blur: '8px',
    opacity: 0.35,
    scale: '1.02' // Subtle lift on hover
  },
  overlay: {
    zIndex: 50,
    blur: '15px',
    opacity: 0.4
  },
  modal: {
    zIndex: 100,
    blur: '25px',
    opacity: 0.5
  }
} as const

// Performance Budgets
export const performanceBudgets = {
  bundle: {
    core: '15kb', // gzipped
    react: '35kb', // gzipped
    total: '50kb' // gzipped
  },
  runtime: {
    renderTime: 16, // milliseconds (60fps)
    memoryOverhead: 10 * 1024 * 1024, // 10MB
    firstPaint: 100 // milliseconds
  }
} as const

// Export unified token object
export const liquidTokens = {
  colors: {
    light: appleColors,
    dark: appleColorsDark
  },
  glass: appleGlassSpecs,
  typography: appleTypography,
  spacing: appleSpacing,
  physics: applePhysics,
  accessibility: accessibilitySpecs,
  layers: glassLayers,
  performance: performanceBudgets
} as const

export type LiquidTokens = typeof liquidTokens
export type GlassVariant = keyof typeof appleGlassSpecs
export type AppleColor = keyof typeof appleColors
export type SpacingSize = keyof typeof appleSpacing
export type BlurIntensity = 'light' | 'regular' | 'strong'
export type OpacityLevel = 'light' | 'regular' | 'strong'