#!/usr/bin/env node

const cli = require('../lib/cli')
const pkg = require('../package.json')

require('update-notifier')({pkg}).notify()

const argv = require('yargs')
  .usage('$0', pkg.description)
  .option('step', {
    describe: 'Label of the step to run',
    type: 'string',
    alias: 's'
  })
  .option('all', {
    describe: 'Run steps that don’t use branch filters',
    type: 'boolean',
    alias: 'a'
  })
  .option('branch', {
    describe: 'Run all steps matching the given branch',
    type: 'string',
    alias: 'b'
  })
  .option('pipeline', {
    describe: 'Path to the pipeline file, or "-" to read from STDIN',
    type: 'string',
    alias: 'p',
    default: '.buildkite/pipeline.yml'
  })
  .option('checkout', {
    describe: 'Run steps in a fresh checkout',
    type: 'boolean',
    alias: 'c',
    default: false
  })
  .check(yargs => {
    if (yargs.step && yargs.all) {
      throw new Error(`You can't specify both --step and --all`)
    }
    if (yargs.step && yargs.branch) {
      throw new Error(`You can't specify both --step and --branch`)
    }
    return true
  })
  .env('BKSR')
  .example('$0 --all', 'Runs all the steps')
  .example('$0 --step ":npm: Tests"', 'Runs a single step')
  .example('$0 --branch pr123', 'Runs the steps that match branch pr123')
  .example('pipeline.sh | $0 --pipeline \'-\'', 'Runs a dynamic pipeline')
  .version(pkg.version)
  .help()
  .argv

cli(argv)

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
