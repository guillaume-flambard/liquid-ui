import { existsSync } from 'fs'
import fs from 'fs-extra'
import path from 'path'

export async function detectFramework(cwd: string): Promise<string | null> {
  // Check for Next.js
  if (existsSync(path.resolve(cwd, 'next.config.js')) || 
      existsSync(path.resolve(cwd, 'next.config.ts')) ||
      existsSync(path.resolve(cwd, 'next.config.mjs'))) {
    return 'next'
  }

  // Check for Vite
  if (existsSync(path.resolve(cwd, 'vite.config.js')) ||
      existsSync(path.resolve(cwd, 'vite.config.ts'))) {
    return 'vite'
  }

  // Check package.json for framework indicators
  try {
    const packageJsonPath = path.resolve(cwd, 'package.json')
    if (existsSync(packageJsonPath)) {
      const packageJson = await fs.readJSON(packageJsonPath)
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

      if (deps['next']) return 'next'
      if (deps['vite']) return 'vite'
      if (deps['@remix-run/dev']) return 'remix'
      if (deps['gatsby']) return 'gatsby'
      if (deps['@angular/core']) return 'angular'
      if (deps['vue']) return 'vue'
      if (deps['svelte']) return 'svelte'
    }
  } catch (error) {
    // Ignore errors reading package.json
  }

  return null
}

export async function detectTailwind(cwd: string): Promise<boolean> {
  // Check for Tailwind config files
  const configFiles = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.mjs',
    'tailwind.config.cjs'
  ]

  for (const file of configFiles) {
    if (existsSync(path.resolve(cwd, file))) {
      return true
    }
  }

  // Check package.json for Tailwind
  try {
    const packageJsonPath = path.resolve(cwd, 'package.json')
    if (existsSync(packageJsonPath)) {
      const packageJson = await fs.readJSON(packageJsonPath)
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

      if (deps['tailwindcss']) return true
    }
  } catch (error) {
    // Ignore errors reading package.json
  }

  return false
}