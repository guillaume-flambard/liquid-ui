import chalk from 'chalk'
import { Command } from 'commander'
import { existsSync, promises as fs } from 'fs'
import inquirer from 'inquirer'
import ora from 'ora'
import path from 'path'
import { z } from 'zod'
import { DEFAULT_CONFIG, writeConfig } from '../utils/config'
import { getPackageManager, installPackages } from '../utils/package-manager'
import { detectFramework, detectTailwind } from '../utils/detect'

const initOptionsSchema = z.object({
  cwd: z.string().optional(),
  yes: z.boolean().optional()
})

export async function initCommand(opts: unknown) {
  try {
    const options = initOptionsSchema.parse(opts)
    const cwd = path.resolve(options.cwd || process.cwd())

    console.log(chalk.cyan('Welcome to Liquid UI! 🌊'))
    console.log('')
    
    // Check if already initialized
    if (existsSync(path.resolve(cwd, 'components.json'))) {
      console.log(chalk.yellow('This project has already been initialized.'))
      process.exit(1)
    }

    const packageManager = await getPackageManager(cwd)
    const framework = await detectFramework(cwd)
    const hasTailwind = await detectTailwind(cwd)

    console.log(chalk.dim('Detected configuration:'))
    console.log(chalk.dim(`  Framework: ${framework || 'Unknown'}`))
    console.log(chalk.dim(`  Package Manager: ${packageManager}`))
    console.log(chalk.dim(`  Tailwind CSS: ${hasTailwind ? 'Yes' : 'No'}`))
    console.log('')

    if (!hasTailwind) {
      console.log(chalk.red('Tailwind CSS is required for Liquid UI components.'))
      console.log(chalk.dim('Please install Tailwind CSS first: https://tailwindcss.com/docs/installation'))
      process.exit(1)
    }

    let config = { ...DEFAULT_CONFIG }

    if (!options.yes) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'style',
          message: 'Which style would you like to use?',
          choices: [
            { name: 'Default', value: 'default' },
            { name: 'New York', value: 'new-york' }
          ],
          default: 'default'
        },
        {
          type: 'list',
          name: 'baseColor',
          message: 'Which color would you like to use as base color?',
          choices: [
            { name: 'Slate', value: 'slate' },
            { name: 'Gray', value: 'gray' },
            { name: 'Zinc', value: 'zinc' },
            { name: 'Neutral', value: 'neutral' },
            { name: 'Stone', value: 'stone' }
          ],
          default: 'slate'
        },
        {
          type: 'input',
          name: 'globalCss',
          message: 'Where is your global CSS file?',
          default: framework === 'next' ? 'app/globals.css' : 'src/index.css',
          validate: (input) => input.length > 0
        },
        {
          type: 'confirm',
          name: 'rsc',
          message: 'Would you like to use React Server Components?',
          default: false,
          when: () => framework === 'next'
        },
        {
          type: 'input',
          name: 'importAlias',
          message: 'Configure the import alias for components?',
          default: '~/components',
          validate: (input) => input.length > 0
        },
        {
          type: 'input',
          name: 'utilsAlias',
          message: 'Configure the import alias for utils?',
          default: '~/lib/utils',
          validate: (input) => input.length > 0
        }
      ])

      config = {
        ...config,
        style: answers.style,
        rsc: answers.rsc || false,
        tailwind: {
          ...config.tailwind,
          css: answers.globalCss,
          baseColor: answers.baseColor
        },
        aliases: {
          ...config.aliases,
          components: answers.importAlias,
          utils: answers.utilsAlias
        }
      }
    }

    const spinner = ora('Initializing project...').start()

    try {
      // Write configuration
      await writeConfig(cwd, config)
      spinner.text = 'Configuration created'

      // Install required dependencies
      spinner.text = 'Installing dependencies...'
      
      const dependencies = [
        'clsx',
        'tailwind-merge',
        '@liquid-ui/core'
      ]

      await installPackages(packageManager, dependencies, cwd)

      // Create directories
      const paths = {
        components: path.resolve(cwd, config.aliases.components.replace(/^~\//, '')),
        ui: path.resolve(cwd, config.aliases.ui.replace(/^~\//, '')),
        lib: path.resolve(cwd, config.aliases.lib.replace(/^~\//, '')),
        hooks: path.resolve(cwd, config.aliases.hooks.replace(/^~\//, ''))
      }

      await fs.mkdir(paths.components, { recursive: true })
      await fs.mkdir(paths.ui, { recursive: true })
      await fs.mkdir(paths.lib, { recursive: true })
      await fs.mkdir(paths.hooks, { recursive: true })

      // Create utils file
      const utilsContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
      await fs.writeFile(path.resolve(paths.lib, 'utils.ts'), utilsContent)

      spinner.succeed('Project initialized successfully!')

      console.log('')
      console.log(chalk.green('✨ Project initialized! ✨'))
      console.log('')
      console.log('Now you can add components:')
      console.log('')
      console.log(chalk.cyan('  npx liquid-ui add button'))
      console.log(chalk.cyan('  npx liquid-ui add card'))
      console.log(chalk.cyan('  npx liquid-ui add input'))
      console.log('')
      console.log('Or add all components:')
      console.log('')
      console.log(chalk.cyan('  npx liquid-ui add --all'))
      console.log('')

    } catch (error) {
      spinner.fail('Failed to initialize project')
      console.error(error)
      process.exit(1)
    }

  } catch (error) {
    console.error(chalk.red('Failed to initialize project:'), error)
    process.exit(1)
  }
}