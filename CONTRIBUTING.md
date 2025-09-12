# Contributing to Liquid UI 🌊

We love your input! We want to make contributing to Liquid UI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, track issues and feature requests, as well as accept pull requests.

### Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** for any new functionality
4. **Run the test suite** to ensure everything passes
5. **Update documentation** if needed
6. **Submit a pull request** with a clear description

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/liquid-ui.git
cd liquid-ui

# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm run test

# Check linting
npm run lint
```

## Code Standards

### TypeScript First
- All code must be written in TypeScript
- Use strict type checking
- Provide proper type definitions for all public APIs

### Code Style
- Use Prettier for formatting (runs automatically)
- Follow ESLint rules (configured in the project)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Component Guidelines
- Follow the established component patterns
- Use the liquid glass engine from `@liquid-ui/core`
- Ensure 60fps performance
- Support graceful fallbacks for older browsers
- Follow accessibility best practices (WCAG AA)

### Testing
- Write unit tests for all utilities and engine functions
- Write integration tests for components
- Test cross-browser compatibility
- Include visual regression tests when possible

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```
feat(core): add liquid glass physics engine
fix(react): resolve card hover animation bug
docs: update installation instructions
```

## File Structure

```
packages/
├── core/              # Core engine and tokens
│   ├── src/
│   │   ├── engine.ts  # Main glass engine
│   │   ├── tokens.ts  # Design tokens
│   │   ├── types.ts   # Type definitions
│   │   └── utils.ts   # Utility functions
│   └── package.json
├── react/             # React components
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── package.json
└── tokens/            # CSS variables
    └── src/
```

## Issue Reporting

### Bug Reports

Use the bug report template and include:

- **Environment**: OS, browser, versions
- **Steps to reproduce**: Clear step-by-step instructions
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Code example**: Minimal reproduction case
- **Screenshots**: If applicable

### Feature Requests

Use the feature request template and include:

- **Problem**: What problem does this solve?
- **Solution**: Describe your proposed solution
- **Alternatives**: What other solutions did you consider?
- **Examples**: Similar features in other libraries
- **Use cases**: Real-world scenarios where this would help

## Component Development Guidelines

### Performance Requirements
- Maintain 60fps animations
- Bundle size impact < 5kb per component
- Support for low-end devices
- Efficient memory usage

### Accessibility Requirements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Reduced motion respect

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Graceful degradation for older browsers

### Design System Compliance
- Use tokens from `@liquid-ui/core`
- Follow Apple's liquid glass specifications
- Consistent API patterns across components
- Proper TypeScript interfaces

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management:

1. Create a changeset for your changes:
   ```bash
   npm run changeset
   ```

2. Describe your changes and select the appropriate version bump

3. Commit the changeset file with your PR

4. Maintainers will handle the release process

## Community Guidelines

### Code of Conduct

- **Be respectful**: Treat everyone with respect and kindness
- **Be collaborative**: Work together to improve the project
- **Be inclusive**: Welcome newcomers and diverse perspectives
- **Be constructive**: Provide helpful feedback and suggestions

### Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat and community support
- **Twitter**: Follow [@liquidui](https://twitter.com/liquidui) for updates

## Recognition

Contributors are recognized in:
- The README.md contributors section
- Release notes for significant contributions
- Our Hall of Fame page (coming soon)

## Questions?

Don't hesitate to ask! You can:
- Open a [GitHub Discussion](https://github.com/liquid-ui/liquid-ui/discussions)
- Join our [Discord server](https://discord.gg/liquidui)
- Reach out on [Twitter](https://twitter.com/liquidui)

---

**Thank you for contributing to Liquid UI!** 🙏

Every contribution, no matter how small, helps make the React ecosystem more beautiful and performant.