import chalk from 'chalk'
import { existsSync } from 'fs'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import ora from 'ora'
import path from 'path'
import { z } from 'zod'
import { getConfig, resolveConfigPaths } from '../utils/config'
import { getPackageManager, installPackages } from '../utils/package-manager'
import { COMPONENTS_REGISTRY } from '../utils/registry'
import { fetchComponentContent } from '../utils/fetch'
import { transformImports } from '../utils/transform'

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional().default([]),
  yes: z.boolean().optional().default(false),
  overwrite: z.boolean().optional().default(false),
  cwd: z.string().optional(),
  all: z.boolean().optional().default(false)
})

export async function addCommand(components: string[], opts: unknown) {
  try {
    const options = addOptionsSchema.parse({
      components,
      ...opts
    })

    const cwd = path.resolve(options.cwd || process.cwd())

    // Check if project is initialized
    const config = await getConfig(cwd)
    if (!config) {
      console.log(chalk.red('Project not initialized. Run `liquid-ui init` first.'))
      process.exit(1)
    }

    const paths = await resolveConfigPaths(cwd, config)

    let selectedComponents: string[] = []

    if (options.all) {
      selectedComponents = Object.keys(COMPONENTS_REGISTRY)
    } else if (options.components.length === 0) {
      // Interactive selection
      const choices = Object.entries(COMPONENTS_REGISTRY).map(([key, info]) => ({
        name: `${key} - ${info.description}`,
        value: key,
        short: key
      }))

      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'components',
          message: 'Which components would you like to add?',
          choices,
          validate: (input) => input.length > 0 || 'Please select at least one component'
        }
      ])

      selectedComponents = answers.components
    } else {
      selectedComponents = options.components
    }

    // Validate component names
    const invalidComponents = selectedComponents.filter(
      (name) => !COMPONENTS_REGISTRY[name]
    )

    if (invalidComponents.length > 0) {
      console.log(chalk.red(`Invalid component(s): ${invalidComponents.join(', ')}`))
      console.log(chalk.dim('Run `liquid-ui list` to see all available components.'))
      process.exit(1)
    }

    // Resolve dependencies
    const componentsWithDeps = resolveDependencies(selectedComponents)
    
    if (!options.yes && componentsWithDeps.length !== selectedComponents.length) {
      const additionalComponents = componentsWithDeps.filter(
        (name) => !selectedComponents.includes(name)
      )

      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: `This will also install dependencies: ${additionalComponents.join(', ')}. Continue?`,
          default: true
        }
      ])

      if (!proceed) {
        process.exit(0)
      }
    }

    const spinner = ora('Adding components...').start()

    try {
      // Install npm dependencies
      const allDependencies = new Set<string>()
      const allDevDependencies = new Set<string>()

      for (const componentName of componentsWithDeps) {
        const component = COMPONENTS_REGISTRY[componentName]
        
        component.dependencies?.forEach((dep) => allDependencies.add(dep))
        component.devDependencies?.forEach((dep) => allDevDependencies.add(dep))
      }

      const packageManager = await getPackageManager(cwd)

      if (allDependencies.size > 0) {
        spinner.text = 'Installing dependencies...'
        await installPackages(packageManager, Array.from(allDependencies), cwd)
      }

      if (allDevDependencies.size > 0) {
        spinner.text = 'Installing dev dependencies...'
        await installPackages(packageManager, Array.from(allDevDependencies), cwd, true)
      }

      // Create component files
      for (const componentName of componentsWithDeps) {
        spinner.text = `Adding ${componentName}...`
        
        const component = COMPONENTS_REGISTRY[componentName]
        
        for (const file of component.files) {
          const filePath = path.resolve(cwd, file.name)
          
          // Check if file exists
          if (existsSync(filePath) && !options.overwrite) {
            if (!options.yes) {
              const { overwrite } = await inquirer.prompt([
                {
                  type: 'confirm',
                  name: 'overwrite',
                  message: `${file.name} already exists. Overwrite?`,
                  default: false
                }
              ])

              if (!overwrite) {
                continue
              }
            } else {
              continue
            }
          }

          // Ensure directory exists
          await fs.ensureDir(path.dirname(filePath))

          // Get component content (fetch from source or use inline)
          const content = await getComponentContent(componentName, file.name, config)
          
          // Transform imports based on config
          const transformedContent = transformImports(content, config)
          
          // Write file
          await fs.writeFile(filePath, transformedContent, 'utf8')
        }
      }

      spinner.succeed('Components added successfully!')

      console.log('')
      console.log(chalk.green('✨ Components added! ✨'))
      console.log('')
      console.log('Added components:')
      componentsWithDeps.forEach((name) => {
        console.log(chalk.cyan(`  ${name}`))
      })
      console.log('')
      console.log('You can now import them in your project:')
      console.log('')
      componentsWithDeps
        .filter((name) => COMPONENTS_REGISTRY[name].files.some((f) => f.type === 'component'))
        .forEach((name) => {
          const componentName = name
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
          console.log(chalk.dim(`  import { ${componentName} } from '${config.aliases.ui}/${name}'`))
        })

    } catch (error) {
      spinner.fail('Failed to add components')
      console.error(error)
      process.exit(1)
    }

  } catch (error) {
    console.error(chalk.red('Error:'), error)
    process.exit(1)
  }
}

function resolveDependencies(components: string[]): string[] {
  const resolved = new Set<string>()
  const stack = [...components]

  while (stack.length > 0) {
    const current = stack.pop()!
    
    if (resolved.has(current)) {
      continue
    }

    resolved.add(current)

    const component = COMPONENTS_REGISTRY[current]
    if (component?.registryDependencies) {
      stack.push(...component.registryDependencies)
    }
  }

  return Array.from(resolved)
}

async function getComponentContent(componentName: string, fileName: string, config: any): Promise<string> {
  // For now, return inline content or fetch from registry
  const component = COMPONENTS_REGISTRY[componentName]
  const file = component.files.find(f => f.name === fileName)
  
  if (file?.content) {
    return file.content
  }

  // In a real implementation, this would fetch from the registry URL
  // For now, we'll read from the existing source files
  try {
    return await fetchComponentContent(componentName, fileName)
  } catch (error) {
    throw new Error(`Failed to get content for ${componentName}/${fileName}`)
  }
}