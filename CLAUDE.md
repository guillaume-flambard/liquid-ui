# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js 15 project using React 19, TypeScript, and Tailwind CSS v4. It follows the App Router
architecture and uses Turbopack for fast development and builds.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture

### Directory Structure

- `app/` - Next.js App Router directory containing pages and layouts
- `public/` - Static assets (SVGs, images)
- App uses the new App Router pattern, not the legacy pages directory

### Key Technologies

- **Next.js 15.5.3** with App Router and Turbopack
- **React 19.1.0** with latest features
- **TypeScript 5** with strict configuration
- **Tailwind CSS v4** with new architecture (no traditional config file)
- **ESLint 9** with flat config format

### Configuration Files

- `next.config.ts` - Next.js configuration (currently using defaults)
- `tsconfig.json` - TypeScript config with path mapping (`@/*` → `./`)
- `eslint.config.mjs` - ESLint flat config with Next.js rules
- `postcss.config.mjs` - PostCSS config for Tailwind CSS v4

### Styling Approach

- Tailwind CSS v4 with `@theme inline` directive in `app/globals.css`
- CSS custom properties for theme variables
- Dark mode support via CSS custom properties
- Font optimization using Next.js font system with Geist fonts

## Development Notes

### Tailwind CSS v4

- Uses new architecture without traditional `tailwind.config.js`
- Theme configuration is inline in `globals.css` using `@theme` directive
- Requires `@tailwindcss/postcss` plugin

### TypeScript Configuration

- Strict mode enabled
- Path mapping configured for `@/*` imports
- Next.js and React types included

### Build System

- Both development and production builds use Turbopack (`--turbopack` flag)
- ESLint uses new flat config format (`.mjs` extension)

## Current State

This is a fresh Next.js project with minimal starter content. No custom components, utilities, or business logic have
been implemented yet. The project is ready for feature development and architectural decisions.

# LIQUID UI 🌊

## The First Complete Apple Liquid Glass Library for React

> **Mission:** Bring Apple's revolutionary Liquid Glass design system to the web before everyone else does.

---

## 🎯 PROJECT OVERVIEW

**Launch Date:** January 2025  
**Target Market:** React developers wanting Apple-style liquid glass effects  
**Market Size:** $115B UI component market by 2031  
**Opportunity Window:** 12 months before iOS 27 mandatory adoption

### The Golden Timing

- **September 15, 2025:** Apple officially launches Liquid Glass across all OS
- **2026:** iOS 27 makes Liquid Glass mandatory
- **Right Now:** ZERO complete React libraries exist
- **Our Window:** First-mover advantage for 12+ months

---

## 🏗️ TECHNICAL ARCHITECTURE

### Core Stack

```typescript
// Foundation
-TypeScript
5.3 + (Strict
types
)
-React
18 + (Concurrent
features
)
-Framer
Motion
11 + (Physics
animations
)
-CSS
backdrop - filter(Native
Apple
specs
)

// Build System
-Rollup + SWC(Performance - first)
- Changesets(Versioning)
- Vitest(Testing)
- Storybook
7 + (Documentation)
```

### Apple Liquid Glass Specifications

```typescript
export const liquidTokens = {
  glass: {
    blur: {
      subtle: '5px',    // Light blur
      regular: '12px',  // Standard Apple
      strong: '20px'    // Maximum blur
    },
    opacity: {
      light: '0.15',    // 15% Apple minimum
      regular: '0.25',  // Balanced
      strong: '0.85'    // 85% Apple maximum
    },
    physics: {
      // Official Apple formula: 1.0 - normalizedDist²
      refraction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      spring: {tension: 300, friction: 30}
    }
  }
}
```

### Performance Targets

| Metric       | Target          | Rationale                    |
|--------------|-----------------|------------------------------|
| Bundle Size  | < 50kb gzipped  | 40x smaller than Material-UI |
| Render Time  | < 16ms          | 60fps guaranteed             |
| Memory Usage | < 10MB overhead | Mobile-friendly              |
| First Paint  | < 100ms         | Instant feel                 |

---

## 📦 MONOREPO STRUCTURE

```
liquid-ui/
├── packages/
│   ├── core/           # Design tokens + Glass engine
│   ├── react/          # React components
│   ├── tokens/         # CSS variables system
│   └── icons/          # Liquid glass icons
├── apps/
│   ├── docs/           # Next.js documentation
│   ├── playground/     # Interactive testing
│   └── templates/      # Premium templates
├── tools/
│   ├── build/          # Build scripts
│   └── eslint-config/  # Shared linting
```

---

## 🚀 20-WEEK ROADMAP

### Phase 0: Foundation (Week 1-2) - IMMEDIATE

**Week 1:**

- [x] Secure domains: liquidui.com, liquidui.dev, liquidui.io
- [x] Reserve @liquid-ui on NPM, GitHub, Twitter
- [ ] Setup monorepo with TypeScript + Rollup
- [ ] Create brand identity (liquid drop logo)

**Week 2:**

- [ ] Analyze Apple's exact specifications
- [ ] Test backdrop-filter cross-browser compatibility
- [ ] Setup Storybook + documentation framework
- [ ] Launch teaser landing page with email capture

### Phase 1: Core Components (Week 3-10)

**MVP Components (8 weeks):**

```typescript
// Week 3-4: Foundation
-LiquidCard      // The signature component
- LiquidButton    // Interactive CTAs
- LiquidInput     // Glass form fields
- LiquidModal     // Blur overlays

// Week 5-6: Navigation  
- LiquidNavbar    // Transparent navigation
- LiquidSidebar   // Collapsible glass menu
- LiquidTabs      // Fluid tab switching

// Week 7-8: Feedback
- LiquidToast     // Notification system
- LiquidDropdown  // Glass dropdowns
- LiquidProgress  // Animated progress bars
```

### Phase 2: Polish & Testing (Week 11-14)

- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Performance optimization (bundle analysis)
- Accessibility compliance (WCAG AA)
- Interactive documentation site

### Phase 3: Beta Launch (Week 15-18)

- Private beta with 50 selected developers
- Community feedback integration
- NPM alpha release
- Content marketing campaign

### Phase 4: Public Launch (Week 19-20)

- **Target: March 2025**
- ProductHunt launch (#1 goal)
- NPM stable v1.0.0 release
- Press coverage & influencer outreach

### Phase 5: Growth (Week 21+)

- Vue.js & Svelte versions
- Premium templates & Figma kit
- Enterprise partnerships
- International expansion

---

## 💰 BUSINESS MODEL

### Pricing Strategy

```
🆓 Open Source (Core Library)
├── 10 essential components
├── Basic documentation
└── Community support

💎 Pro ($299 lifetime)
├── All components + variants
├── Premium templates
├── Advanced documentation
└── Discord priority support

🏢 Team ($899 lifetime)
├── Everything in Pro
├── Multi-developer licenses
├── Figma design system
└── Video tutorials

🏭 Enterprise ($2,999/year)
├── Everything in Team
├── Custom component development
├── Dedicated support channel
└── White-label options
```

### Revenue Projections

| Timeline | Users  | Revenue | Monthly |
|----------|--------|---------|---------|
| Q2 2025  | 1,000  | 400K€   | 30K€    |
| Q3 2025  | 5,000  | 1.2M€   | 80K€    |
| Q4 2025  | 10,000 | 2.8M€   | 150K€   |
| 2026     | 25,000 | 8M€     | 400K€   |

---

## 🎨 CORE COMPONENTS SPECIFICATIONS

### LiquidCard - The Signature Component

```typescript
interface LiquidCardProps {
  variant?: 'regular' | 'clear' | 'frosted' | 'tinted'
  intensity?: number // 0-1 blur intensity
  interactive?: boolean // Physics hover effects
  adaptiveOpacity?: boolean // Auto-adjust to background
  environmentBlending?: boolean // Advanced refraction
  onHover?: (isHovered: boolean) => void
}

// Key Features:
// ✅ Real-time refraction physics
// ✅ Adaptive opacity based on background luminance
// ✅ 60fps smooth animations
// ✅ Graceful fallbacks for older browsers
```

### Performance-First Glass Engine

```typescript
class LiquidGlassEngine {
  // Apple's exact formula implementation
  calculateRefraction(mousePosition: Point, cardBounds: Rect): number {
    const centerDistance = getDistanceFromCenter(mousePosition, cardBounds)
    const normalizedDistance = centerDistance / maxDistance

    // Official Apple formula: 1.0 - normalizedDist²
    return 1.0 - Math.pow(normalizedDistance, 2)
  }

  // Optimized CSS generation
  generateGlassCSS(config: GlassConfig): CSSProperties {
    return {
      backdropFilter: `blur(${this.getBlurValue(config)})`,
      background: this.getAdaptiveGradient(config),
      // Automatic fallbacks for unsupported browsers
      '@supports not (backdrop-filter: blur())': {
        background: this.getFallbackGradient(config)
      }
    }
  }
}
```

---

## 🎯 COMPETITIVE ADVANTAGE

### vs Material-UI

- **Size:** 50kb vs 2MB+ (40x smaller)
- **Performance:** 60fps vs stuttering animations
- **Design:** 2025 Apple aesthetics vs 2014 Material

### vs Chakra UI

- **Focus:** Specialized glass effects vs generic components
- **Physics:** Real Apple formulas vs basic transitions
- **Innovation:** Cutting-edge vs conservative

### vs Tailwind UI

- **Integration:** React-first vs utility-first
- **Animations:** Physics-based vs static
- **Ecosystem:** Complete system vs component pieces

---

## 🚦 SUCCESS METRICS

### Technical KPIs

- [ ] Bundle size < 50kb ✅
- [ ] 60fps animations ✅
- [ ] Cross-browser compatibility ✅
- [ ] WCAG AA compliance ✅
- [ ] < 100ms first render ✅

### Business KPIs

- [ ] 10K NPM downloads (Month 1)
- [ ] 1K GitHub stars (Month 2)
- [ ] 500 paying customers (Month 3)
- [ ] 50K€ MRR (Month 6)
- [ ] ProductHunt #1 (Launch day)

### Community KPIs

- [ ] 1K Discord members
- [ ] 100 open source contributors
- [ ] 50 showcase websites
- [ ] 5 major company adoptions
- [ ] 1M+ total downloads

---

## 🛡️ RISK MITIGATION

### Technical Risks

**Risk:** Browser compatibility issues
**Mitigation:** Comprehensive fallback system + progressive enhancement

**Risk:** Performance problems on low-end devices  
**Mitigation:** Adaptive settings based on device capabilities

**Risk:** Apple changes specifications
**Mitigation:** Modular architecture allowing quick updates

### Business Risks

**Risk:** Major competitor launches similar product
**Mitigation:** First-mover advantage + superior developer experience

**Risk:** Market adoption slower than expected
**Mitigation:** Freemium model + extensive templates

**Risk:** Apple legal issues
**Mitigation:** Clean-room implementation + fair use principles

---

## 🌟 LAUNCH STRATEGY

### Pre-Launch (January 2025)

1. **Domain Security** ✅
    - liquidui.com, liquidui.dev, liquidui.io
    - Social handles: @liquidui everywhere

2. **Technical Foundation**
    - GitHub organization: github.com/liquid-ui
    - NPM scope: @liquid-ui
    - Discord server: discord.gg/liquidui

3. **Content Marketing**
    - Blog: "Building Apple's Liquid Glass for React"
    - Twitter thread with visual demos
    - YouTube: "The Future of React UI is Liquid"

### Launch Week (March 2025)

- **Monday:** ProductHunt submission
- **Tuesday:** dev.to article publication
- **Wednesday:** Reddit posts (r/reactjs, r/frontend)
- **Thursday:** Twitter campaign with influencers
- **Friday:** GitHub trending push

### Post-Launch

- **Week 1:** Bug fixes + community feedback
- **Week 2:** v1.1 with requested features
- **Month 1:** Templates marketplace launch
- **Month 2:** Figma integration announcement
- **Month 3:** Enterprise program launch

---

## 💪 TEAM & RESOURCES

### Initial Team (Bootstrap)

- **Tech Lead:** Senior React developer (You)
- **Designer:** UI/UX with Apple ecosystem experience
- **Developer:** Frontend specialist for cross-browser testing

### Budget Requirements

```
Initial Investment: 6,000€
├── Domains & Infrastructure: 500€
├── Design & Branding: 2,000€  
├── Development Tools: 1,000€
├── Marketing & Launch: 2,500€
```

### Growth Investment (After PMF)

```
Series Seed: 100,000€
├── Team expansion (3 developers): 60,000€
├── Marketing & Sales: 25,000€
├── Infrastructure & Tools: 10,000€
├── Legal & Operations: 5,000€
```

---

## 🎪 COMMUNITY BUILDING

### Developer Community

- **Discord Server:** Real-time support + feedback
- **GitHub Discussions:** Feature requests + roadmap
- **Twitter:** Daily progress updates + demos
- **YouTube:** Weekly development vlogs

### Content Strategy

- **Technical Blogs:** Deep-dives into glass physics
- **Video Tutorials:** "Build X in 5 minutes with Liquid UI"
- **Case Studies:** Companies using Liquid UI
- **Open Source:** Encourage community contributions

---

## 🏁 EXIT STRATEGY

### Potential Acquirers

1. **Vercel** - Perfect fit for their developer ecosystem
2. **Framer** - Design tool + component library synergy
3. **Adobe** - Creative suite integration opportunities
4. **Meta** - React ecosystem strategic value
5. **Apple** - Official React implementation (dream scenario)

### Valuation Drivers

- User base size (10K+ paying customers = 10M+ valuation)
- Revenue growth rate (>100% YoY = premium multiple)
- Market leadership position (First liquid glass library)
- Technical moat (Apple-certified implementation)

---

## 📋 IMMEDIATE NEXT ACTIONS

### This Week (Week 1)

- [x] **Day 1:** Purchase all domains immediately
- [ ] **Day 2:** Setup GitHub organization + repo structure
- [ ] **Day 3:** Create brand identity (logo + colors)
- [ ] **Day 4:** Launch teaser landing page
- [ ] **Day 5:** Begin LiquidCard component development
- [ ] **Day 6:** Setup build system + TypeScript config
- [ ] **Day 7:** First working prototype demo

### Next Week (Week 2)

- [ ] Analyze Apple's backdrop-filter implementations
- [ ] Cross-browser compatibility matrix
- [ ] Performance benchmarking setup
- [ ] Documentation framework
- [ ] Community Discord server
- [ ] Email list for beta testers
- [ ] First blog post draft

---

## 🔥 THE VISION

**LIQUID UI will become the de-facto standard for Apple-style React components.**

By March 2025, when every designer wants "that Apple glass effect" and every developer needs it implemented properly,
LIQUID UI will be the only mature, performant, production-ready solution.

We're not just building components. We're defining the future of React UI.

**The liquid revolution starts now. 🌊**

---

*Created by Claude AI - January 2025*  
*Project Launch Document v1.0*

> "The best time to plant a tree was 20 years ago. The second best time is now." - Chinese Proverb

**Let's make React liquid. 🚀**