#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { listCommand } from './commands/list'

const program = new Command()

program
  .name('liquid-ui')
  .description('Add Apple-style liquid glass components to your project')
  .version('1.0.0')

program
  .command('init')
  .description('Initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompts')
  .option('-c, --cwd <cwd>', 'the working directory')
  .action(initCommand)

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompts')
  .option('-o, --overwrite', 'overwrite existing files')
  .option('-c, --cwd <cwd>', 'the working directory')
  .option('-a, --all', 'add all available components')
  .action(addCommand)

program
  .command('list')
  .description('List all available components')
  .action(listCommand)

program
  .command('diff')
  .description('Check for updates to installed components')
  .argument('[component]', 'the component to check')
  .action(() => {
    console.log(chalk.yellow('Coming soon: Check for component updates'))
  })

program.parse()