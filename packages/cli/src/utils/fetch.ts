import fs from 'fs-extra'
import path from 'path'

// Component source mappings
const COMPONENT_SOURCE_MAP: Record<string, string> = {
  'liquid-button': '../../react/src/components/LiquidButton.tsx',
  'liquid-card': '../../react/src/components/LiquidCard.tsx', 
  'liquid-input': '../../react/src/components/LiquidInput.tsx',
  'liquid-modal': '../../react/src/components/LiquidModal.tsx',
  'use-liquid-glass': '../../react/src/hooks/useLiquidGlass.ts',
  'use-interactive-glass': '../../react/src/hooks/useInteractiveGlass.ts'
}

export async function fetchComponentContent(componentName: string, fileName: string): Promise<string> {
  const sourcePath = COMPONENT_SOURCE_MAP[componentName]
  
  if (!sourcePath) {
    throw new Error(`No source mapping found for component: ${componentName}`)
  }

  try {
    // Get the absolute path to the source file
    const absolutePath = path.resolve(__dirname, sourcePath)
    
    if (await fs.pathExists(absolutePath)) {
      const content = await fs.readFile(absolutePath, 'utf8')
      return transformComponentForCLI(content, componentName)
    } else {
      throw new Error(`Source file not found: ${absolutePath}`)
    }
  } catch (error) {
    console.error(`Error reading source file for ${componentName}:`, error)
    
    // Fallback to template content
    return getTemplateContent(componentName, fileName)
  }
}

function transformComponentForCLI(content: string, componentName: string): string {
  // Transform imports to use relative paths and remove internal dependencies
  let transformedContent = content
  
  // Replace internal imports with relative imports
  transformedContent = transformedContent.replace(
    /from ['"]@liquid-ui\/core['"]/g,
    "from '@liquid-ui/core'"
  )
  
  // Replace relative imports with alias imports
  transformedContent = transformedContent.replace(
    /from ['"]\.\.\//g,
    "from '~/lib/"
  )
  
  // Replace internal hook imports
  transformedContent = transformedContent.replace(
    /from ['"]\.\.\/hooks\/([^'"]+)['"]/g,
    "from '~/hooks/$1'"
  )
  
  // Replace utility imports  
  transformedContent = transformedContent.replace(
    /from ['"]\.\.\/utils\/([^'"]+)['"]/g,
    "from '~/lib/$1'"
  )
  
  // Add proper imports for cn utility if clsx is used
  if (transformedContent.includes('clsx')) {
    transformedContent = transformedContent.replace(
      /import { clsx } from ['"]clsx['"]/g,
      "import { cn } from '~/lib/utils'"
    )
    
    // Replace clsx calls with cn calls
    transformedContent = transformedContent.replace(/clsx\(/g, 'cn(')
  }
  
  return transformedContent
}

function getTemplateContent(componentName: string, fileName: string): string {
  // Fallback templates for when source files aren't available
  const templates: Record<string, string> = {
    'liquid-button': `"use client"

import React, { forwardRef } from 'react'
import { cn } from '~/lib/utils'
import { useLiquidGlass } from '~/hooks/use-liquid-glass'

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'frosted' | 'clear' | 'tinted'
  intensity?: 'subtle' | 'regular' | 'strong'
  children: React.ReactNode
}

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant = 'frosted', intensity = 'regular', children, ...props }, ref) => {
    const { glassStyles } = useLiquidGlass({ variant, intensity })

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
          className
        )}
        style={glassStyles}
        {...props}
      >
        {children}
      </button>
    )
  }
)

LiquidButton.displayName = "LiquidButton"

export { LiquidButton }`,

    'use-liquid-glass': `import { useMemo } from 'react'
import type { GlassConfig } from '@liquid-ui/core'
import { LiquidGlassEngine } from '@liquid-ui/core'

interface UseLiquidGlassProps {
  variant?: 'frosted' | 'clear' | 'tinted'
  intensity?: 'subtle' | 'regular' | 'strong'
  opacity?: 'light' | 'regular' | 'strong'
}

export function useLiquidGlass({
  variant = 'frosted',
  intensity = 'regular', 
  opacity = 'regular'
}: UseLiquidGlassProps = {}) {
  const glassStyles = useMemo(() => {
    const engine = new LiquidGlassEngine()
    
    return engine.generateGlassCSS({
      variant,
      intensity,
      opacity
    })
  }, [variant, intensity, opacity])

  return {
    glassStyles,
    glassClasses: \`backdrop-blur-\${intensity} bg-white/\${opacity === 'light' ? '15' : opacity === 'regular' ? '25' : '85'}\`
  }
}`,

    'cn': `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
  }

  return templates[componentName] || `// Component template for ${componentName}\nexport {}`
}