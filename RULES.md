# Liquid UI Development Rules

## Core Principles

### 1. Apple Authenticity
- **Formula Compliance**: Always use Apple's exact liquid glass formula: `1.0 - normalizedDist²`
- **Physics First**: All animations must follow real physics principles
- **Performance Target**: Maintain 60fps at all times

### 2. Component Standards

#### Naming Conventions
```typescript
// Components: PascalCase with "Liquid" prefix
export const LiquidCard = () => {}
export const LiquidButton = () => {}

// Hooks: camelCase with "use" prefix
export const useLiquidGlass = () => {}
export const useInteractiveGlass = () => {}

// Types: PascalCase with descriptive suffixes
export interface LiquidCardProps {}
export type GlassVariant = 'clear' | 'frosted' | 'tinted' | 'dark'
```

#### Props API Design
```typescript
// Always include these base props
interface BaseLiquidProps {
  variant?: GlassVariant           // Visual style
  intensity?: BlurIntensity        // Blur level
  opacity?: OpacityLevel          // Transparency
  interactive?: boolean           // Physics effects
  className?: string              // Custom styling
}

// Extend for specific components
interface LiquidCardProps extends BaseLiquidProps {
  // Component-specific props only
  hover?: boolean
  shadow?: boolean
  border?: boolean
}
```

### 3. Performance Requirements

#### Bundle Size Limits
- **Core package**: < 20kb gzipped
- **React package**: < 30kb gzipped  
- **Individual components**: < 5kb each
- **Total library**: < 50kb gzipped

#### Animation Standards
- **Frame Rate**: Consistent 60fps
- **Render Time**: < 16ms per frame
- **Memory Usage**: < 10MB overhead
- **First Paint**: < 100ms

#### Optimization Rules
```typescript
// ✅ Good: Throttled mouse events
const throttledHandler = throttle(handleMouseMove, 16)

// ❌ Bad: Unthrottled events
element.addEventListener('mousemove', handleMouseMove)

// ✅ Good: Memoized calculations  
const glassStyles = useMemo(() => engine.generate(config), [config])

// ❌ Bad: Recalculating on every render
const glassStyles = engine.generate(config)
```

### 4. Accessibility Requirements

#### WCAG AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio
- **Keyboard Navigation**: Full support required
- **Screen Readers**: Proper ARIA attributes
- **Reduced Motion**: Respect user preferences

#### Implementation Standards
```typescript
// ✅ Required ARIA attributes
<LiquidButton
  role="button"
  aria-label="Close modal"
  aria-pressed={isPressed}
>

// ✅ Keyboard support
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick()
  }
}

// ✅ Reduced motion support
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

### 5. Browser Support

#### Minimum Support
- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile Safari**: 14+

#### Graceful Degradation
```typescript
// ✅ Feature detection
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)')

if (!supportsBackdropFilter) {
  // Provide solid background fallback
  styles.background = getFallbackBackground()
}
```

### 6. Testing Standards

#### Test Coverage Requirements
- **Unit Tests**: > 90% coverage
- **Integration Tests**: All component interactions
- **Visual Regression**: Automated screenshot comparison
- **Performance Tests**: Frame rate validation

#### Test Structure
```
__tests__/
├── unit/
│   ├── core/
│   └── react/
├── integration/
│   ├── components/
│   └── hooks/
├── visual/
│   ├── screenshots/
│   └── comparisons/
└── performance/
    ├── benchmarks/
    └── metrics/
```

### 7. Code Quality Rules

#### TypeScript Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### ESLint Configuration
```javascript
module.exports = {
  extends: [
    '@liquid-ui/eslint-config',
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': 'error',
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error'
  }
}
```

#### Import Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Third-party imports
import { clsx } from 'clsx'

// 3. Internal imports (absolute paths)
import { LiquidGlassEngine } from '@liquid-ui/core'
import { useLiquidGlass } from '../hooks/useLiquidGlass'

// 4. Relative imports
import type { LiquidCardProps } from './types'
```

### 8. Documentation Standards

#### Component Documentation
```typescript
/**
 * LiquidCard - The signature Liquid UI component
 * 
 * A beautiful glass card with Apple-style liquid glass effects, perfect physics,
 * and smooth animations. This is the cornerstone component of Liquid UI.
 * 
 * @example
 * ```tsx
 * <LiquidCard variant="frosted" interactive>
 *   <h2>Hello Liquid UI!</h2>
 * </LiquidCard>
 * ```
 */
export const LiquidCard: React.FC<LiquidCardProps> = ({ ... }) => {
```

#### Storybook Requirements
- **All components** must have Storybook stories
- **Multiple variants** showcased
- **Interactive controls** for all props
- **Usage examples** with code snippets

### 9. Git Workflow

#### Commit Message Format
```
type(scope): description

feat(core): add liquid glass physics engine
fix(react): resolve card hover animation bug
docs: update installation instructions
perf(engine): optimize blur calculations
```

#### Branch Naming
```
feature/liquid-card-component
fix/button-focus-state
docs/storybook-setup
perf/engine-optimization
```

#### Pull Request Requirements
- **Tests pass**: All CI checks green
- **Coverage maintained**: No decrease in test coverage
- **Performance validated**: Benchmarks within limits
- **Documentation updated**: README, Storybook, and API docs
- **Changelog entry**: Added to unreleased section

### 10. Release Process

#### Versioning (Semantic Versioning)
- **Major**: Breaking API changes
- **Minor**: New features (backwards compatible)  
- **Patch**: Bug fixes and performance improvements

#### Release Checklist
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Changelog completed
- [ ] Version bumped
- [ ] NPM packages published
- [ ] GitHub release created
- [ ] Community notified

### 11. Security Standards

#### Package Security
```json
// package.json
{
  "files": ["dist", "README.md"],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

#### Code Security
- **No secrets** in code or commits
- **Dependency scanning** with automated updates
- **Security audits** before releases
- **CSP compliance** for web applications

---

## Enforcement

These rules are enforced through:
- **Automated testing** in CI/CD
- **ESLint and Prettier** for code quality
- **Husky pre-commit hooks** for validation
- **Code review** process for all changes

## Questions?

For questions about these rules, please:
- Open a [GitHub Discussion](https://github.com/liquid-ui/liquid-ui/discussions)
- Ask in our [Discord server](https://discord.gg/liquidui)
- Check the [Contributing Guide](./CONTRIBUTING.md)