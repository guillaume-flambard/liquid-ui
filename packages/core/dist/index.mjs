// src/tokens.ts
var appleColors = {
  // Primary System Colors
  systemBlue: "rgb(0, 122, 255)",
  systemGreen: "rgb(52, 199, 89)",
  systemIndigo: "rgb(88, 86, 214)",
  systemOrange: "rgb(255, 149, 0)",
  systemPink: "rgb(255, 45, 85)",
  systemPurple: "rgb(175, 82, 222)",
  systemRed: "rgb(255, 59, 48)",
  systemTeal: "rgb(90, 200, 250)",
  systemYellow: "rgb(255, 204, 0)",
  // System Grays
  systemGray: "rgb(142, 142, 147)",
  systemGray2: "rgb(174, 174, 178)",
  systemGray3: "rgb(199, 199, 204)",
  systemGray4: "rgb(209, 209, 214)",
  systemGray5: "rgb(229, 229, 234)",
  systemGray6: "rgb(242, 242, 247)",
  // Label Colors
  label: "rgba(0, 0, 0, 1)",
  secondaryLabel: "rgba(60, 60, 67, 0.6)",
  tertiaryLabel: "rgba(60, 60, 67, 0.3)",
  quaternaryLabel: "rgba(60, 60, 67, 0.18)",
  // Glass Materials
  glassMaterial: "rgba(255, 255, 255, 0.25)",
  glassBorder: "rgba(255, 255, 255, 0.3)",
  glassHighlight: "rgba(255, 255, 255, 0.5)"
};
var appleColorsDark = {
  // Primary System Colors (Dark Mode)
  systemBlue: "rgb(10, 132, 255)",
  systemGreen: "rgb(48, 209, 88)",
  systemIndigo: "rgb(94, 92, 230)",
  systemOrange: "rgb(255, 159, 10)",
  systemPink: "rgb(255, 55, 95)",
  systemPurple: "rgb(191, 90, 242)",
  systemRed: "rgb(255, 69, 58)",
  systemTeal: "rgb(100, 210, 255)",
  systemYellow: "rgb(255, 214, 10)",
  // System Grays (Dark Mode)
  systemGray: "rgb(142, 142, 147)",
  systemGray2: "rgb(99, 99, 102)",
  systemGray3: "rgb(72, 72, 74)",
  systemGray4: "rgb(58, 58, 60)",
  systemGray5: "rgb(44, 44, 46)",
  systemGray6: "rgb(28, 28, 30)",
  // Label Colors (Dark Mode)
  label: "rgba(255, 255, 255, 1)",
  secondaryLabel: "rgba(235, 235, 245, 0.6)",
  tertiaryLabel: "rgba(235, 235, 245, 0.3)",
  quaternaryLabel: "rgba(235, 235, 245, 0.18)",
  // Glass Materials (Dark Mode)
  glassMaterial: "rgba(0, 0, 0, 0.3)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  glassHighlight: "rgba(255, 255, 255, 0.2)"
};
var appleGlassSpecs = {
  frosted: {
    blur: "12px",
    background: "rgba(255, 255, 255, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    saturation: "180%",
    // Apple standard
    brightness: "110%"
  },
  strong: {
    blur: "20px",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    saturation: "200%",
    brightness: "120%"
  },
  clear: {
    blur: "8px",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    saturation: "150%"
  },
  tinted: {
    blur: "12px",
    background: "rgba(0, 122, 255, 0.12)",
    // Apple blue
    border: "1px solid rgba(0, 122, 255, 0.25)",
    saturation: "180%"
  },
  dark: {
    blur: "12px",
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    saturation: "120%",
    brightness: "80%"
  }
};
var appleTypography = {
  fontFamily: {
    system: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif'
  },
  fontSize: {
    caption2: "11px",
    // iOS Caption 2
    caption1: "12px",
    // iOS Caption 1  
    footnote: "13px",
    // iOS Footnote
    subheadline: "15px",
    // iOS Subheadline
    callout: "16px",
    // iOS Callout
    body: "17px",
    // iOS Body (default)
    headline: "17px",
    // iOS Headline (semibold)
    title3: "20px",
    // iOS Title 3
    title2: "22px",
    // iOS Title 2
    title1: "28px",
    // iOS Title 1
    largeTitle: "34px"
    // iOS Large Title
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
};
var appleSpacing = {
  xs: "4px",
  // Minimal spacing
  sm: "8px",
  // Small spacing  
  md: "16px",
  // Standard iOS margin
  lg: "20px",
  // Large spacing
  xl: "24px",
  // Extra large
  xxl: "32px",
  // Maximum standard
  // Component-specific
  buttonPadding: {
    sm: "8px 16px",
    md: "12px 20px",
    lg: "16px 24px"
  },
  cardPadding: {
    sm: "12px",
    md: "16px",
    lg: "20px"
  }
};
var applePhysics = {
  spring: {
    // Apple's standard spring configuration
    tension: 300,
    friction: 30,
    mass: 1
  },
  easing: {
    standard: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    // Apple standard
    deceleration: "cubic-bezier(0.23, 1, 0.32, 1)",
    // Apple deceleration
    acceleration: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    // Apple acceleration
    sharp: "cubic-bezier(0.4, 0, 0.2, 1)"
    // Material sharp (fallback)
  },
  duration: {
    fast: "0.15s",
    // Quick state changes
    normal: "0.25s",
    // Standard animations  
    slow: "0.35s",
    // Complex transitions
    springy: "0.6s"
    // Spring-based animations
  }
};
var accessibilitySpecs = {
  contrast: {
    minimum: 4.5,
    // WCAG AA standard
    enhanced: 7
    // WCAG AAA standard
  },
  focusIndicator: {
    width: "2px",
    color: "rgb(0, 122, 255)",
    // Apple blue
    offset: "2px",
    borderRadius: "inherit",
    boxShadow: "0 0 0 2px rgba(0, 122, 255, 0.5), 0 0 0 4px rgba(0, 122, 255, 0.2)"
  },
  reducedMotion: {
    respectPreference: true,
    fallbackDuration: "0.01s",
    // Near-instant for reduced motion
    essentialMotion: ["focus-indicator", "loading-spinner"]
    // Never disable these
  }
};
var glassLayers = {
  background: {
    zIndex: 1,
    blur: "20px",
    opacity: 0.1
  },
  content: {
    zIndex: 10,
    blur: "12px",
    opacity: 0.25
  },
  interactive: {
    zIndex: 20,
    blur: "8px",
    opacity: 0.35,
    scale: "1.02"
    // Subtle lift on hover
  },
  overlay: {
    zIndex: 50,
    blur: "15px",
    opacity: 0.4
  },
  modal: {
    zIndex: 100,
    blur: "25px",
    opacity: 0.5
  }
};
var performanceBudgets = {
  bundle: {
    core: "15kb",
    // gzipped
    react: "35kb",
    // gzipped
    total: "50kb"
    // gzipped
  },
  runtime: {
    renderTime: 16,
    // milliseconds (60fps)
    memoryOverhead: 10 * 1024 * 1024,
    // 10MB
    firstPaint: 100
    // milliseconds
  }
};
var liquidTokens = {
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
};

// src/engine.ts
var LiquidGlassEngine = class _LiquidGlassEngine {
  constructor() {
    this.deviceCapabilities = this.detectDeviceCapabilities();
  }
  static getInstance() {
    if (!_LiquidGlassEngine.instance) {
      _LiquidGlassEngine.instance = new _LiquidGlassEngine();
    }
    return _LiquidGlassEngine.instance;
  }
  /**
   * Calculate refraction intensity based on mouse position
   * Uses Apple's official formula: 1.0 - normalizedDist²
   */
  calculateRefraction(mousePosition, elementBounds) {
    const centerX = elementBounds.x + elementBounds.width / 2;
    const centerY = elementBounds.y + elementBounds.height / 2;
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(
      (elementBounds.width / 2) ** 2 + (elementBounds.height / 2) ** 2
    );
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    return 1 - Math.pow(normalizedDistance, 2);
  }
  /**
   * Generate optimized CSS properties for liquid glass effect
   */
  generateGlassCSS(config) {
    const { glass } = liquidTokens;
    const blurValue = this.getBlurValue(config);
    const backgroundValue = this.getBackgroundValue(config);
    const borderValue = this.getBorderValue(config);
    const styles = {
      backdropFilter: `blur(${blurValue})`,
      background: backgroundValue
    };
    if (borderValue) styles.border = borderValue;
    if (!this.deviceCapabilities.supportsBackdropFilter) {
      styles.background = this.getFallbackBackground(config);
    }
    return styles;
  }
  /**
   * Get adaptive background based on environment luminance
   */
  getAdaptiveBackground(config, backgroundLuminance) {
    const { glass } = liquidTokens;
    const glassSpec = glass[config.variant] || glass.frosted;
    const luminanceMultiplier = backgroundLuminance > 0.5 ? 0.8 : 1.2;
    const baseOpacity = this.extractOpacityFromBackground(glassSpec.background);
    const adaptiveOpacity = baseOpacity * luminanceMultiplier;
    return this.adjustOpacity(glassSpec.background, adaptiveOpacity);
  }
  /**
   * Detect device capabilities for performance optimization
   * Returns consistent values for SSR compatibility
   */
  detectDeviceCapabilities() {
    if (typeof window === "undefined") {
      return {
        supportsBackdropFilter: true,
        // Assume support for SSR consistency
        performanceLevel: "medium",
        reducedMotion: false
      };
    }
    const testElement = document.createElement("div");
    testElement.style.backdropFilter = "blur(1px)";
    const supportsBackdropFilter = testElement.style.backdropFilter !== "";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const performanceLevel = this.detectPerformanceLevel();
    return {
      supportsBackdropFilter,
      performanceLevel,
      reducedMotion
    };
  }
  detectPerformanceLevel() {
    if (typeof navigator === "undefined") return "medium";
    const deviceMemory = navigator.deviceMemory;
    if (deviceMemory) {
      if (deviceMemory <= 2) return "low";
      if (deviceMemory >= 8) return "high";
    }
    const connection = navigator.connection;
    if (connection) {
      if (connection.effectiveType === "2g" || connection.effectiveType === "slow-2g") {
        return "low";
      }
      if (connection.effectiveType === "4g") {
        return "high";
      }
    }
    return "medium";
  }
  getBlurValue(config) {
    const { glass } = liquidTokens;
    const glassSpec = glass[config.variant] || glass.frosted;
    if (this.deviceCapabilities.performanceLevel === "low") {
      return "5px";
    }
    return glassSpec.blur;
  }
  getBackgroundValue(config) {
    const { glass } = liquidTokens;
    const glassSpec = glass[config.variant] || glass.frosted;
    return glassSpec.background;
  }
  getBorderValue(config) {
    const { glass } = liquidTokens;
    const glassSpec = glass[config.variant] || glass.frosted;
    return glassSpec.border;
  }
  getShadowValue(config) {
    if (this.deviceCapabilities.performanceLevel === "low") {
      return void 0;
    }
    return "0 8px 32px rgba(0, 0, 0, 0.12)";
  }
  getFallbackBackground(config) {
    const { glass } = liquidTokens;
    const glassSpec = glass[config.variant] || glass.frosted;
    const baseOpacity = this.extractOpacityFromBackground(glassSpec.background);
    const fallbackOpacity = Math.min(baseOpacity * 1.5, 0.95);
    switch (config.variant) {
      case "clear":
        return `rgba(255, 255, 255, ${fallbackOpacity})`;
      case "frosted":
        return `rgba(248, 250, 252, ${fallbackOpacity})`;
      case "tinted":
        return `rgba(0, 122, 255, ${fallbackOpacity})`;
      case "dark":
        return `rgba(0, 0, 0, ${fallbackOpacity})`;
      default:
        return `rgba(255, 255, 255, ${fallbackOpacity})`;
    }
  }
  adjustOpacity(colorString, newOpacity) {
    if (!colorString) return `rgba(255, 255, 255, ${newOpacity})`;
    const rgbaMatch = colorString.match(/rgba?\(([^)]+)\)/);
    if (!rgbaMatch) return colorString;
    const values = rgbaMatch[1].split(",").map((v) => v.trim());
    if (values.length >= 3) {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${newOpacity})`;
    }
    return colorString;
  }
  extractOpacityFromBackground(backgroundString) {
    const rgbaMatch = backgroundString.match(/rgba?\(([^)]+)\)/);
    if (!rgbaMatch) return 0.25;
    const values = rgbaMatch[1].split(",").map((v) => v.trim());
    if (values.length >= 4) {
      return parseFloat(values[3]) || 0.25;
    }
    return 0.25;
  }
};

// src/utils.ts
function getDistanceFromCenter(point, bounds) {
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;
  const deltaX = point.x - centerX;
  const deltaY = point.y - centerY;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
function normalize(value, min, max) {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}
function lerp(start, end, t) {
  return start + (end - start) * t;
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function appleEasing(t) {
  return t * t * (3 - 2 * t);
}
function calculateLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function getElementBounds(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  };
}
function parseColor(colorString) {
  const rgbaMatch = colorString.match(/rgba?\(([^)]+)\)/);
  if (rgbaMatch) {
    const values = rgbaMatch[1].split(",").map((v) => parseInt(v.trim(), 10));
    if (values.length >= 3) {
      return { r: values[0], g: values[1], b: values[2] };
    }
  }
  const hexMatch = colorString.match(/^#([a-f\d]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    };
  }
  return null;
}
function generateCSSCustomProperties(tokens, prefix = "--liquid") {
  const properties = {};
  function flatten(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        flatten(value, currentPath);
      } else {
        const propertyName = `${prefix}-${currentPath.join("-")}`;
        properties[propertyName] = String(value);
      }
    }
  }
  flatten(tokens);
  return properties;
}
var PerformanceMonitor = class {
  constructor() {
    this.measurements = /* @__PURE__ */ new Map();
  }
  start(label) {
    if (typeof performance !== "undefined") {
      performance.mark(`${label}-start`);
    }
  }
  end(label) {
    if (typeof performance === "undefined") return 0;
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    const entries = performance.getEntriesByName(label, "measure");
    if (entries.length > 0) {
      const duration = entries[entries.length - 1].duration;
      if (!this.measurements.has(label)) {
        this.measurements.set(label, []);
      }
      this.measurements.get(label).push(duration);
      return duration;
    }
    return 0;
  }
  getAverageTime(label) {
    const times = this.measurements.get(label);
    if (!times || times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }
  clear(label) {
    if (label) {
      this.measurements.delete(label);
    } else {
      this.measurements.clear();
    }
  }
};
export {
  LiquidGlassEngine,
  PerformanceMonitor,
  accessibilitySpecs,
  appleColors,
  appleColorsDark,
  appleEasing,
  appleGlassSpecs,
  applePhysics,
  appleSpacing,
  appleTypography,
  calculateLuminance,
  debounce,
  easeOutCubic,
  generateCSSCustomProperties,
  getDistanceFromCenter,
  getElementBounds,
  glassLayers,
  isInViewport,
  lerp,
  liquidTokens,
  normalize,
  parseColor,
  performanceBudgets,
  throttle
};
