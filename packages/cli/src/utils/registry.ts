export interface ComponentInfo {
  name: string
  description: string
  dependencies?: string[]
  devDependencies?: string[]
  files: {
    name: string
    content: string
    type: 'component' | 'hook' | 'util' | 'style'
  }[]
  registryDependencies?: string[]
}

export const REGISTRY_URL = 'https://liquid-ui.strayeye.com/registry'

export const COMPONENTS_REGISTRY: Record<string, ComponentInfo> = {
  'liquid-button': {
    name: 'liquid-button',
    description: 'Interactive glass button with Apple-style liquid effects',
    dependencies: ['clsx', '@liquid-ui/core'],
    files: [
      {
        name: 'components/ui/liquid-button.tsx',
        type: 'component',
        content: '' // Will be populated from actual component files
      }
    ],
    registryDependencies: ['use-liquid-glass', 'use-interactive-glass']
  },
  'liquid-card': {
    name: 'liquid-card',
    description: 'Signature glass card with perfect physics and smooth animations',
    dependencies: ['clsx', '@liquid-ui/core'],
    files: [
      {
        name: 'components/ui/liquid-card.tsx',
        type: 'component',
        content: ''
      }
    ],
    registryDependencies: ['use-liquid-glass', 'use-interactive-glass']
  },
  'liquid-input': {
    name: 'liquid-input',
    description: 'Glass input field with validation and focus effects',
    dependencies: ['clsx', '@liquid-ui/core'],
    files: [
      {
        name: 'components/ui/liquid-input.tsx',
        type: 'component',
        content: ''
      }
    ],
    registryDependencies: ['use-liquid-glass']
  },
  'liquid-modal': {
    name: 'liquid-modal',
    description: 'Glass modal with backdrop blur and smooth animations',
    dependencies: ['clsx', '@liquid-ui/core', '@radix-ui/react-dialog'],
    files: [
      {
        name: 'components/ui/liquid-modal.tsx',
        type: 'component',
        content: ''
      }
    ],
    registryDependencies: ['use-liquid-glass', 'liquid-portal']
  },
  'use-liquid-glass': {
    name: 'use-liquid-glass',
    description: 'Core hook for generating Apple-style glass effects',
    dependencies: ['@liquid-ui/core'],
    files: [
      {
        name: 'hooks/use-liquid-glass.ts',
        type: 'hook',
        content: ''
      }
    ]
  },
  'use-interactive-glass': {
    name: 'use-interactive-glass',
    description: 'Hook for interactive glass physics and hover effects',
    dependencies: ['@liquid-ui/core'],
    files: [
      {
        name: 'hooks/use-interactive-glass.ts',
        type: 'hook',
        content: ''
      }
    ]
  },
  'liquid-portal': {
    name: 'liquid-portal',
    description: 'Portal component for modals and overlays',
    dependencies: ['@radix-ui/react-portal'],
    files: [
      {
        name: 'components/ui/liquid-portal.tsx',
        type: 'component',
        content: ''
      }
    ]
  },
  'cn': {
    name: 'cn',
    description: 'Utility for merging CSS classes',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        name: 'lib/utils.ts',
        type: 'util',
        content: `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
      }
    ]
  }
}