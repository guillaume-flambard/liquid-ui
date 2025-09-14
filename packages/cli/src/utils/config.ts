import { z } from 'zod'
import { cosmiconfig } from 'cosmiconfig'
import path from 'path'
import fs from 'fs-extra'

export const configSchema = z.object({
  style: z.enum(['default', 'new-york']).default('default'),
  rsc: z.boolean().default(false),
  tsx: z.boolean().default(true),
  tailwind: z.object({
    config: z.string(),
    css: z.string(),
    baseColor: z.enum(['slate', 'gray', 'zinc', 'neutral', 'stone']).default('slate'),
    cssVariables: z.boolean().default(true)
  }),
  aliases: z.object({
    components: z.string().default('~/components'),
    utils: z.string().default('~/lib/utils'),
    ui: z.string().default('~/components/ui'),
    lib: z.string().default('~/lib'),
    hooks: z.string().default('~/hooks')
  })
})

export type Config = z.infer<typeof configSchema>

const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json']
})

export async function getConfig(cwd?: string): Promise<Config | null> {
  const searchPath = cwd || process.cwd()
  
  try {
    const result = await explorer.search(searchPath)
    
    if (!result) {
      return null
    }

    return configSchema.parse(result.config)
  } catch (error) {
    throw new Error(`Invalid configuration found at ${searchPath}/components.json`)
  }
}

export async function resolveConfigPaths(cwd: string, config: Config) {
  return {
    cwd,
    tailwindConfig: path.resolve(cwd, config.tailwind.config),
    tailwindCss: path.resolve(cwd, config.tailwind.css),
    utils: path.resolve(cwd, config.aliases.utils.replace(/^~\//, '')),
    components: path.resolve(cwd, config.aliases.components.replace(/^~\//, '')),
    ui: path.resolve(cwd, config.aliases.ui.replace(/^~\//, '')),
    lib: path.resolve(cwd, config.aliases.lib.replace(/^~\//, '')),
    hooks: path.resolve(cwd, config.aliases.hooks.replace(/^~\//, ''))
  }
}

export async function writeConfig(cwd: string, config: Config) {
  const configPath = path.resolve(cwd, 'components.json')
  await fs.writeJSON(configPath, config, { spaces: 2 })
  return configPath
}

export const DEFAULT_CONFIG: Config = {
  style: 'default',
  rsc: false,
  tsx: true,
  tailwind: {
    config: 'tailwind.config.js',
    css: 'app/globals.css',
    baseColor: 'slate',
    cssVariables: true
  },
  aliases: {
    components: '~/components',
    utils: '~/lib/utils', 
    ui: '~/components/ui',
    lib: '~/lib',
    hooks: '~/hooks'
  }
}