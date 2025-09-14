import { existsSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

export async function getPackageManager(cwd: string): Promise<PackageManager> {
  // Check for lock files
  if (existsSync(path.resolve(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm'
  }

  if (existsSync(path.resolve(cwd, 'yarn.lock'))) {
    return 'yarn'
  }

  if (existsSync(path.resolve(cwd, 'bun.lockb'))) {
    return 'bun'
  }

  if (existsSync(path.resolve(cwd, 'package-lock.json'))) {
    return 'npm'
  }

  // Check for package manager in npm_config_user_agent
  const userAgent = process.env.npm_config_user_agent

  if (userAgent) {
    if (userAgent.startsWith('pnpm')) return 'pnpm'
    if (userAgent.startsWith('yarn')) return 'yarn'
    if (userAgent.startsWith('bun')) return 'bun'
  }

  return 'npm'
}

export async function installPackages(
  packageManager: PackageManager,
  packages: string[],
  cwd: string,
  dev = false
): Promise<void> {
  const devFlag = dev ? (packageManager === 'npm' ? '--save-dev' : '-D') : ''
  
  const commands = {
    npm: `npm install ${devFlag} ${packages.join(' ')}`,
    pnpm: `pnpm add ${devFlag} ${packages.join(' ')}`,
    yarn: `yarn add ${devFlag} ${packages.join(' ')}`,
    bun: `bun add ${devFlag} ${packages.join(' ')}`
  }

  const command = commands[packageManager]
  
  execSync(command, {
    cwd,
    stdio: 'inherit'
  })
}