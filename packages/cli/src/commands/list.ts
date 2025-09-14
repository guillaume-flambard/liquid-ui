import chalk from 'chalk'
import { COMPONENTS_REGISTRY } from '../utils/registry'

export async function listCommand() {
  console.log(chalk.cyan('Available Liquid UI Components:'))
  console.log('')

  const components = Object.entries(COMPONENTS_REGISTRY)
    .filter(([, info]) => info.files.some(f => f.type === 'component'))
    .sort(([a], [b]) => a.localeCompare(b))

  const hooks = Object.entries(COMPONENTS_REGISTRY)
    .filter(([, info]) => info.files.some(f => f.type === 'hook'))
    .sort(([a], [b]) => a.localeCompare(b))

  const utils = Object.entries(COMPONENTS_REGISTRY)
    .filter(([, info]) => info.files.some(f => f.type === 'util'))
    .sort(([a], [b]) => a.localeCompare(b))

  if (components.length > 0) {
    console.log(chalk.yellow('Components:'))
    components.forEach(([name, info]) => {
      console.log(`  ${chalk.green(name.padEnd(20))} ${chalk.dim(info.description)}`)
    })
    console.log('')
  }

  if (hooks.length > 0) {
    console.log(chalk.yellow('Hooks:'))
    hooks.forEach(([name, info]) => {
      console.log(`  ${chalk.green(name.padEnd(20))} ${chalk.dim(info.description)}`)
    })
    console.log('')
  }

  if (utils.length > 0) {
    console.log(chalk.yellow('Utilities:'))
    utils.forEach(([name, info]) => {
      console.log(`  ${chalk.green(name.padEnd(20))} ${chalk.dim(info.description)}`)
    })
    console.log('')
  }

  console.log(chalk.dim('Usage:'))
  console.log(chalk.dim('  liquid-ui add <component>    Add a specific component'))
  console.log(chalk.dim('  liquid-ui add --all         Add all components'))
  console.log('')
  console.log(chalk.dim('Examples:'))
  console.log(chalk.cyan('  liquid-ui add liquid-button'))
  console.log(chalk.cyan('  liquid-ui add liquid-card liquid-input'))
  console.log(chalk.cyan('  liquid-ui add --all'))
}