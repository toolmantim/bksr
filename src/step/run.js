const debug = require('debug')('bksr')
const { spawn } = require('child_process')
const bootstrapEnv = require('../bootstrap/env')

const run = async (step) => {
  const env = await bootstrapEnv(step)

  debug('Running buildkite-agent bootstrap with ENV: %o', env)

  // Inherit the PATH that it was invoked with, so it picks up git, etc
  env.PATH = process.env.PATH

  const bootstrap = spawn('buildkite-agent', ['bootstrap'], {
    env,
    shell: true
  })

  bootstrap.stdout.pipe(process.stdout)
  bootstrap.stderr.pipe(process.stderr)

  bootstrap.on('close', (code) => {
    process.exit(code)
  })
}

module.exports = run
