/**
 * LIQUID UI Design Tokens
 *
 * Authentic Apple Liquid Glass specifications based on official Apple design system
 * All values are derived from Apple's Human Interface Guidelines and iOS specifications
 */
declare const appleColors: {
    readonly systemBlue: "rgb(0, 122, 255)";
    readonly systemGreen: "rgb(52, 199, 89)";
    readonly systemIndigo: "rgb(88, 86, 214)";
    readonly systemOrange: "rgb(255, 149, 0)";
    readonly systemPink: "rgb(255, 45, 85)";
    readonly systemPurple: "rgb(175, 82, 222)";
    readonly systemRed: "rgb(255, 59, 48)";
    readonly systemTeal: "rgb(90, 200, 250)";
    readonly systemYellow: "rgb(255, 204, 0)";
    readonly systemGray: "rgb(142, 142, 147)";
    readonly systemGray2: "rgb(174, 174, 178)";
    readonly systemGray3: "rgb(199, 199, 204)";
    readonly systemGray4: "rgb(209, 209, 214)";
    readonly systemGray5: "rgb(229, 229, 234)";
    readonly systemGray6: "rgb(242, 242, 247)";
    readonly label: "rgba(0, 0, 0, 1)";
    readonly secondaryLabel: "rgba(60, 60, 67, 0.6)";
    readonly tertiaryLabel: "rgba(60, 60, 67, 0.3)";
    readonly quaternaryLabel: "rgba(60, 60, 67, 0.18)";
    readonly glassMaterial: "rgba(255, 255, 255, 0.25)";
    readonly glassBorder: "rgba(255, 255, 255, 0.3)";
    readonly glassHighlight: "rgba(255, 255, 255, 0.5)";
};
declare const appleColorsDark: {
    readonly systemBlue: "rgb(10, 132, 255)";
    readonly systemGreen: "rgb(48, 209, 88)";
    readonly systemIndigo: "rgb(94, 92, 230)";
    readonly systemOrange: "rgb(255, 159, 10)";
    readonly systemPink: "rgb(255, 55, 95)";
    readonly systemPurple: "rgb(191, 90, 242)";
    readonly systemRed: "rgb(255, 69, 58)";
    readonly systemTeal: "rgb(100, 210, 255)";
    readonly systemYellow: "rgb(255, 214, 10)";
    readonly systemGray: "rgb(142, 142, 147)";
    readonly systemGray2: "rgb(99, 99, 102)";
    readonly systemGray3: "rgb(72, 72, 74)";
    readonly systemGray4: "rgb(58, 58, 60)";
    readonly systemGray5: "rgb(44, 44, 46)";
    readonly systemGray6: "rgb(28, 28, 30)";
    readonly label: "rgba(255, 255, 255, 1)";
    readonly secondaryLabel: "rgba(235, 235, 245, 0.6)";
    readonly tertiaryLabel: "rgba(235, 235, 245, 0.3)";
    readonly quaternaryLabel: "rgba(235, 235, 245, 0.18)";
    readonly glassMaterial: "rgba(0, 0, 0, 0.3)";
    readonly glassBorder: "rgba(255, 255, 255, 0.1)";
    readonly glassHighlight: "rgba(255, 255, 255, 0.2)";
};
declare const appleGlassSpecs: {
    readonly frosted: {
        readonly blur: "12px";
        readonly background: "rgba(255, 255, 255, 0.25)";
        readonly border: "1px solid rgba(255, 255, 255, 0.3)";
        readonly saturation: "180%";
        readonly brightness: "110%";
    };
    readonly strong: {
        readonly blur: "20px";
        readonly background: "rgba(255, 255, 255, 0.15)";
        readonly border: "1px solid rgba(255, 255, 255, 0.4)";
        readonly saturation: "200%";
        readonly brightness: "120%";
    };
    readonly clear: {
        readonly blur: "8px";
        readonly background: "rgba(255, 255, 255, 0.08)";
        readonly border: "1px solid rgba(255, 255, 255, 0.15)";
        readonly saturation: "150%";
    };
    readonly tinted: {
        readonly blur: "12px";
        readonly background: "rgba(0, 122, 255, 0.12)";
        readonly border: "1px solid rgba(0, 122, 255, 0.25)";
        readonly saturation: "180%";
    };
    readonly dark: {
        readonly blur: "12px";
        readonly background: "rgba(0, 0, 0, 0.3)";
        readonly border: "1px solid rgba(255, 255, 255, 0.1)";
        readonly saturation: "120%";
        readonly brightness: "80%";
    };
};
declare const appleTypography: {
    readonly fontFamily: {
        readonly system: "-apple-system, BlinkMacSystemFont, \"SF Pro Display\", \"SF Pro Text\", system-ui, sans-serif";
    };
    readonly fontSize: {
        readonly caption2: "11px";
        readonly caption1: "12px";
        readonly footnote: "13px";
        readonly subheadline: "15px";
        readonly callout: "16px";
        readonly body: "17px";
        readonly headline: "17px";
        readonly title3: "20px";
        readonly title2: "22px";
        readonly title1: "28px";
        readonly largeTitle: "34px";
    };
    readonly fontWeight: {
        readonly ultraLight: 100;
        readonly thin: 200;
        readonly light: 300;
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
        readonly heavy: 800;
        readonly black: 900;
    };
    readonly lineHeight: {
        readonly tight: 1.2;
        readonly normal: 1.4;
        readonly relaxed: 1.6;
    };
};
declare const appleSpacing: {
    readonly xs: "4px";
    readonly sm: "8px";
    readonly md: "16px";
    readonly lg: "20px";
    readonly xl: "24px";
    readonly xxl: "32px";
    readonly buttonPadding: {
        readonly sm: "8px 16px";
        readonly md: "12px 20px";
        readonly lg: "16px 24px";
    };
    readonly cardPadding: {
        readonly sm: "12px";
        readonly md: "16px";
        readonly lg: "20px";
    };
};
declare const applePhysics: {
    readonly spring: {
        readonly tension: 300;
        readonly friction: 30;
        readonly mass: 1;
    };
    readonly easing: {
        readonly standard: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly deceleration: "cubic-bezier(0.23, 1, 0.32, 1)";
        readonly acceleration: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        readonly sharp: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
    readonly duration: {
        readonly fast: "0.15s";
        readonly normal: "0.25s";
        readonly slow: "0.35s";
        readonly springy: "0.6s";
    };
};
declare const accessibilitySpecs: {
    readonly contrast: {
        readonly minimum: 4.5;
        readonly enhanced: 7;
    };
    readonly focusIndicator: {
        readonly width: "2px";
        readonly color: "rgb(0, 122, 255)";
        readonly offset: "2px";
        readonly borderRadius: "inherit";
        readonly boxShadow: "0 0 0 2px rgba(0, 122, 255, 0.5), 0 0 0 4px rgba(0, 122, 255, 0.2)";
    };
    readonly reducedMotion: {
        readonly respectPreference: true;
        readonly fallbackDuration: "0.01s";
        readonly essentialMotion: readonly ["focus-indicator", "loading-spinner"];
    };
};
declare const glassLayers: {
    readonly background: {
        readonly zIndex: 1;
        readonly blur: "20px";
        readonly opacity: 0.1;
    };
    readonly content: {
        readonly zIndex: 10;
        readonly blur: "12px";
        readonly opacity: 0.25;
    };
    readonly interactive: {
        readonly zIndex: 20;
        readonly blur: "8px";
        readonly opacity: 0.35;
        readonly scale: "1.02";
    };
    readonly overlay: {
        readonly zIndex: 50;
        readonly blur: "15px";
        readonly opacity: 0.4;
    };
    readonly modal: {
        readonly zIndex: 100;
        readonly blur: "25px";
        readonly opacity: 0.5;
    };
};
declare const performanceBudgets: {
    readonly bundle: {
        readonly core: "15kb";
        readonly react: "35kb";
        readonly total: "50kb";
    };
    readonly runtime: {
        readonly renderTime: 16;
        readonly memoryOverhead: number;
        readonly firstPaint: 100;
    };
};
declare const liquidTokens: {
    readonly colors: {
        readonly light: {
            readonly systemBlue: "rgb(0, 122, 255)";
            readonly systemGreen: "rgb(52, 199, 89)";
            readonly systemIndigo: "rgb(88, 86, 214)";
            readonly systemOrange: "rgb(255, 149, 0)";
            readonly systemPink: "rgb(255, 45, 85)";
            readonly systemPurple: "rgb(175, 82, 222)";
            readonly systemRed: "rgb(255, 59, 48)";
            readonly systemTeal: "rgb(90, 200, 250)";
            readonly systemYellow: "rgb(255, 204, 0)";
            readonly systemGray: "rgb(142, 142, 147)";
            readonly systemGray2: "rgb(174, 174, 178)";
            readonly systemGray3: "rgb(199, 199, 204)";
            readonly systemGray4: "rgb(209, 209, 214)";
            readonly systemGray5: "rgb(229, 229, 234)";
            readonly systemGray6: "rgb(242, 242, 247)";
            readonly label: "rgba(0, 0, 0, 1)";
            readonly secondaryLabel: "rgba(60, 60, 67, 0.6)";
            readonly tertiaryLabel: "rgba(60, 60, 67, 0.3)";
            readonly quaternaryLabel: "rgba(60, 60, 67, 0.18)";
            readonly glassMaterial: "rgba(255, 255, 255, 0.25)";
            readonly glassBorder: "rgba(255, 255, 255, 0.3)";
            readonly glassHighlight: "rgba(255, 255, 255, 0.5)";
        };
        readonly dark: {
            readonly systemBlue: "rgb(10, 132, 255)";
            readonly systemGreen: "rgb(48, 209, 88)";
            readonly systemIndigo: "rgb(94, 92, 230)";
            readonly systemOrange: "rgb(255, 159, 10)";
            readonly systemPink: "rgb(255, 55, 95)";
            readonly systemPurple: "rgb(191, 90, 242)";
            readonly systemRed: "rgb(255, 69, 58)";
            readonly systemTeal: "rgb(100, 210, 255)";
            readonly systemYellow: "rgb(255, 214, 10)";
            readonly systemGray: "rgb(142, 142, 147)";
            readonly systemGray2: "rgb(99, 99, 102)";
            readonly systemGray3: "rgb(72, 72, 74)";
            readonly systemGray4: "rgb(58, 58, 60)";
            readonly systemGray5: "rgb(44, 44, 46)";
            readonly systemGray6: "rgb(28, 28, 30)";
            readonly label: "rgba(255, 255, 255, 1)";
            readonly secondaryLabel: "rgba(235, 235, 245, 0.6)";
            readonly tertiaryLabel: "rgba(235, 235, 245, 0.3)";
            readonly quaternaryLabel: "rgba(235, 235, 245, 0.18)";
            readonly glassMaterial: "rgba(0, 0, 0, 0.3)";
            readonly glassBorder: "rgba(255, 255, 255, 0.1)";
            readonly glassHighlight: "rgba(255, 255, 255, 0.2)";
        };
    };
    readonly glass: {
        readonly frosted: {
            readonly blur: "12px";
            readonly background: "rgba(255, 255, 255, 0.25)";
            readonly border: "1px solid rgba(255, 255, 255, 0.3)";
            readonly saturation: "180%";
            readonly brightness: "110%";
        };
        readonly strong: {
            readonly blur: "20px";
            readonly background: "rgba(255, 255, 255, 0.15)";
            readonly border: "1px solid rgba(255, 255, 255, 0.4)";
            readonly saturation: "200%";
            readonly brightness: "120%";
        };
        readonly clear: {
            readonly blur: "8px";
            readonly background: "rgba(255, 255, 255, 0.08)";
            readonly border: "1px solid rgba(255, 255, 255, 0.15)";
            readonly saturation: "150%";
        };
        readonly tinted: {
            readonly blur: "12px";
            readonly background: "rgba(0, 122, 255, 0.12)";
            readonly border: "1px solid rgba(0, 122, 255, 0.25)";
            readonly saturation: "180%";
        };
        readonly dark: {
            readonly blur: "12px";
            readonly background: "rgba(0, 0, 0, 0.3)";
            readonly border: "1px solid rgba(255, 255, 255, 0.1)";
            readonly saturation: "120%";
            readonly brightness: "80%";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly system: "-apple-system, BlinkMacSystemFont, \"SF Pro Display\", \"SF Pro Text\", system-ui, sans-serif";
        };
        readonly fontSize: {
            readonly caption2: "11px";
            readonly caption1: "12px";
            readonly footnote: "13px";
            readonly subheadline: "15px";
            readonly callout: "16px";
            readonly body: "17px";
            readonly headline: "17px";
            readonly title3: "20px";
            readonly title2: "22px";
            readonly title1: "28px";
            readonly largeTitle: "34px";
        };
        readonly fontWeight: {
            readonly ultraLight: 100;
            readonly thin: 200;
            readonly light: 300;
            readonly regular: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
            readonly heavy: 800;
            readonly black: 900;
        };
        readonly lineHeight: {
            readonly tight: 1.2;
            readonly normal: 1.4;
            readonly relaxed: 1.6;
        };
    };
    readonly spacing: {
        readonly xs: "4px";
        readonly sm: "8px";
        readonly md: "16px";
        readonly lg: "20px";
        readonly xl: "24px";
        readonly xxl: "32px";
        readonly buttonPadding: {
            readonly sm: "8px 16px";
            readonly md: "12px 20px";
            readonly lg: "16px 24px";
        };
        readonly cardPadding: {
            readonly sm: "12px";
            readonly md: "16px";
            readonly lg: "20px";
        };
    };
    readonly physics: {
        readonly spring: {
            readonly tension: 300;
            readonly friction: 30;
            readonly mass: 1;
        };
        readonly easing: {
            readonly standard: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            readonly deceleration: "cubic-bezier(0.23, 1, 0.32, 1)";
            readonly acceleration: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            readonly sharp: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
        readonly duration: {
            readonly fast: "0.15s";
            readonly normal: "0.25s";
            readonly slow: "0.35s";
            readonly springy: "0.6s";
        };
    };
    readonly accessibility: {
        readonly contrast: {
            readonly minimum: 4.5;
            readonly enhanced: 7;
        };
        readonly focusIndicator: {
            readonly width: "2px";
            readonly color: "rgb(0, 122, 255)";
            readonly offset: "2px";
            readonly borderRadius: "inherit";
            readonly boxShadow: "0 0 0 2px rgba(0, 122, 255, 0.5), 0 0 0 4px rgba(0, 122, 255, 0.2)";
        };
        readonly reducedMotion: {
            readonly respectPreference: true;
            readonly fallbackDuration: "0.01s";
            readonly essentialMotion: readonly ["focus-indicator", "loading-spinner"];
        };
    };
    readonly layers: {
        readonly background: {
            readonly zIndex: 1;
            readonly blur: "20px";
            readonly opacity: 0.1;
        };
        readonly content: {
            readonly zIndex: 10;
            readonly blur: "12px";
            readonly opacity: 0.25;
        };
        readonly interactive: {
            readonly zIndex: 20;
            readonly blur: "8px";
            readonly opacity: 0.35;
            readonly scale: "1.02";
        };
        readonly overlay: {
            readonly zIndex: 50;
            readonly blur: "15px";
            readonly opacity: 0.4;
        };
        readonly modal: {
            readonly zIndex: 100;
            readonly blur: "25px";
            readonly opacity: 0.5;
        };
    };
    readonly performance: {
        readonly bundle: {
            readonly core: "15kb";
            readonly react: "35kb";
            readonly total: "50kb";
        };
        readonly runtime: {
            readonly renderTime: 16;
            readonly memoryOverhead: number;
            readonly firstPaint: 100;
        };
    };
};
type LiquidTokens = typeof liquidTokens;
type GlassVariant = keyof typeof appleGlassSpecs;
type AppleColor = keyof typeof appleColors;
type SpacingSize = keyof typeof appleSpacing;
type BlurIntensity = 'light' | 'regular' | 'strong';
type OpacityLevel = 'light' | 'regular' | 'strong';

interface Point {
    x: number;
    y: number;
}
interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface GlassConfig {
    variant: GlassVariant;
    intensity: BlurIntensity;
    opacity: OpacityLevel;
    interactive?: boolean;
    adaptiveOpacity?: boolean;
    environmentBlending?: boolean;
}
interface LiquidGlassStyles {
    backdropFilter: string;
    background: string;
    border?: string;
    boxShadow?: string;
    borderRadius?: string;
}
interface PhysicsConfig {
    tension: number;
    friction: number;
    mass?: number;
    velocity?: number;
}
interface HoverEffectConfig {
    enabled: boolean;
    intensity: number;
    duration: string;
    easing: string;
}
interface DeviceCapabilities {
    supportsBackdropFilter: boolean;
    performanceLevel: 'low' | 'medium' | 'high';
    reducedMotion: boolean;
}

/**
 * LiquidGlassEngine - The core engine for Apple-style liquid glass effects
 *
 * This class implements Apple's exact liquid glass specifications including:
 * - Real-time refraction physics based on mouse position
 * - Adaptive opacity based on background luminance
 * - Performance-optimized CSS generation
 * - Cross-browser fallbacks
 */
declare class LiquidGlassEngine {
    private static instance;
    private deviceCapabilities;
    constructor();
    static getInstance(): LiquidGlassEngine;
    /**
     * Calculate refraction intensity based on mouse position
     * Uses Apple's official formula: 1.0 - normalizedDist²
     */
    calculateRefraction(mousePosition: Point, elementBounds: Rect): number;
    /**
     * Generate optimized CSS properties for liquid glass effect
     */
    generateGlassCSS(config: GlassConfig): LiquidGlassStyles;
    /**
     * Get adaptive background based on environment luminance
     */
    getAdaptiveBackground(config: GlassConfig, backgroundLuminance: number): string;
    /**
     * Detect device capabilities for performance optimization
     * Returns consistent values for SSR compatibility
     */
    private detectDeviceCapabilities;
    private detectPerformanceLevel;
    private getBlurValue;
    private getBackgroundValue;
    private getBorderValue;
    private getShadowValue;
    private getFallbackBackground;
    private adjustOpacity;
    private extractOpacityFromBackground;
}

/**
 * Utility functions for liquid glass calculations and optimizations
 */
/**
 * Calculate distance between two points
 */
declare function getDistanceFromCenter(point: Point, bounds: Rect): number;
/**
 * Normalize a value between 0 and 1
 */
declare function normalize(value: number, min: number, max: number): number;
/**
 * Linear interpolation between two values
 */
declare function lerp(start: number, end: number, t: number): number;
/**
 * Apply easing function to a normalized value (0-1)
 */
declare function easeOutCubic(t: number): number;
/**
 * Apply Apple's signature easing curve
 */
declare function appleEasing(t: number): number;
/**
 * Calculate background luminance for adaptive opacity
 */
declare function calculateLuminance(r: number, g: number, b: number): number;
/**
 * Debounce function for performance optimization
 */
declare function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function for smooth animations
 */
declare function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Check if an element is in viewport
 */
declare function isInViewport(element: Element): boolean;
/**
 * Get element bounds relative to viewport
 */
declare function getElementBounds(element: Element): Rect;
/**
 * Convert CSS color string to RGB values
 */
declare function parseColor(colorString: string): {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Generate CSS custom properties object from tokens
 */
declare function generateCSSCustomProperties(tokens: Record<string, any>, prefix?: string): Record<string, string>;
/**
 * Performance monitor for development
 */
declare class PerformanceMonitor {
    private measurements;
    start(label: string): void;
    end(label: string): number;
    getAverageTime(label: string): number;
    clear(label?: string): void;
}

export { type AppleColor, type BlurIntensity, type DeviceCapabilities, type GlassConfig, type GlassVariant, type HoverEffectConfig, LiquidGlassEngine, type LiquidGlassStyles, type LiquidTokens, type OpacityLevel, PerformanceMonitor, type PhysicsConfig, type Point, type Rect, type SpacingSize, accessibilitySpecs, appleColors, appleColorsDark, appleEasing, appleGlassSpecs, applePhysics, appleSpacing, appleTypography, calculateLuminance, debounce, easeOutCubic, generateCSSCustomProperties, getDistanceFromCenter, getElementBounds, glassLayers, isInViewport, lerp, liquidTokens, normalize, parseColor, performanceBudgets, throttle };
