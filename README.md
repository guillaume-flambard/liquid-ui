# Liquid UI 🌊

> The first complete Apple Liquid Glass library for React - Authentic glass morphism effects with environmental blending

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

**Liquid UI** brings Apple's revolutionary Liquid Glass design system to React with physics-based animations, perfect performance, and an amazing developer experience.

## ✨ Features

- 🎨 **Apple-Perfect Glass Effects** - Authentic liquid glass components with real physics
- ⚡ **Performance First** - 60fps animations, <50kb bundle size
- 🔧 **Developer Experience** - TypeScript-first, excellent IntelliSense
- 🌐 **Cross-Browser** - Works everywhere with graceful fallbacks
- ♿ **Accessible** - WCAG AA compliant out of the box
- 🎯 **Customizable** - Extensive theming and configuration options

## 🚀 Quick Start

```bash
npm install @liquid-ui/react
```

```tsx
import { LiquidCard } from '@liquid-ui/react'

function App() {
  return (
    <LiquidCard variant="frosted" interactive>
      <h2>Hello Liquid UI! 🌊</h2>
      <p>Beautiful glass effects with zero effort.</p>
    </LiquidCard>
  )
}
```

## 📦 Packages

This monorepo contains several packages:

### Core Packages (Open Source)
- **[@liquid-ui/core](./packages/core)** - Core glass engine and design tokens
- **[@liquid-ui/react](./packages/react)** - React components
- **[@liquid-ui/tokens](./packages/tokens)** - Design tokens and CSS variables
- **[@liquid-ui/icons](./packages/icons)** - Liquid glass icons

### Apps
- **[demo](./apps/demo)** - Live demonstration of authentic Apple Liquid Glass effects
- **[docs](./apps/docs)** - Documentation website
- **[playground](./apps/playground)** - Interactive component playground
- **[templates](./apps/templates)** - Starter templates

### Tools
- **[build](./tools/build)** - Build configuration
- **[eslint-config](./tools/eslint-config)** - Shared ESLint configuration

## 🏗️ Architecture

```
liquid-ui/
├── packages/
│   ├── core/           # Glass engine + tokens
│   ├── react/          # React components
│   ├── tokens/         # CSS variables
│   └── icons/          # Icon set
├── apps/
│   ├── demo/           # Live demo
│   ├── docs/           # Documentation
│   ├── playground/     # Testing
│   └── templates/      # Examples
└── tools/              # Shared tooling
```

## 🎨 Components

### Available Components
- **LiquidCard** - The signature glass card component
- **LiquidButton** - Interactive glass buttons
- **LiquidInput** - Glass form fields
- **LiquidModal** - Blur overlays and modals

### Coming Soon
- LiquidNavbar, LiquidSidebar, LiquidTabs
- LiquidToast, LiquidDropdown, LiquidProgress
- And many more...

## 💻 Development

```bash
# Clone the repository
git clone https://github.com/guillaume-flambard/liquid-ui.git
cd liquid-ui

# Install dependencies
npm install

# Start demo development server
cd apps/demo && npm run dev

# Build all packages
npm run build

# Run tests
npm run test
```

## 🤝 Contributing

We love contributions! Please check out our [Contributing Guide](./CONTRIBUTING.md) to get started.

### Quick Contributing Steps
1. Fork this repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run `npm run test` and `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🌟 Support

- ⭐ **Star this repo** if you find it helpful
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/guillaume-flambard/liquid-ui/issues)
- 💡 **Request features** via [GitHub Discussions](https://github.com/guillaume-flambard/liquid-ui/discussions)

## 🚀 Roadmap

- [x] Core glass engine
- [x] Essential components (Card, Button, Input, Modal)
- [x] Live demo with authentic Apple Liquid Glass effects
- [ ] Navigation components (Navbar, Sidebar, Tabs)
- [ ] Feedback components (Toast, Dropdown, Progress)
- [ ] Vue.js support
- [ ] Svelte support
- [ ] Premium templates and extensions

---

**Made with ❤️ and lots of ☕ by the Liquid UI team**

*Building the future of React UI, one glass component at a time.* ✨
