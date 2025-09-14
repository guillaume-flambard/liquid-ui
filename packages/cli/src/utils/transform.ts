import { Config } from './config'

export function transformImports(content: string, config: Config): string {
  let transformedContent = content

  // Transform alias imports based on config
  const aliasMap = {
    '~/components': config.aliases.components,
    '~/lib': config.aliases.lib,
    '~/hooks': config.aliases.hooks,
    '~/utils': config.aliases.utils,
    '~/components/ui': config.aliases.ui
  }

  // Replace aliases with configured paths
  Object.entries(aliasMap).forEach(([alias, configPath]) => {
    const regex = new RegExp(`from ['"]${alias.replace('~/', '')}([^'"]*?)['"]`, 'g')
    transformedContent = transformedContent.replace(regex, `from "${configPath}$1"`)
  })

  // Handle TypeScript/JavaScript file extensions
  if (!config.tsx) {
    // Convert to .js/.jsx if tsx is false
    transformedContent = transformedContent.replace(/\.tsx?(?=['"])/g, config.rsc ? '.js' : '.jsx')
  }

  // Add "use client" directive for RSC if needed
  if (config.rsc && !transformedContent.includes('"use client"') && 
      (transformedContent.includes('useState') || 
       transformedContent.includes('useEffect') ||
       transformedContent.includes('onClick') ||
       transformedContent.includes('onMouseEnter'))) {
    transformedContent = `"use client"\n\n${transformedContent}`
  }

  return transformedContent
}

export function transformComponentName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

export function getComponentFileName(name: string, config: Config): string {
  const extension = config.tsx ? '.tsx' : (config.rsc ? '.js' : '.jsx')
  return `${name}${extension}`
}