const debug = require('debug')('bksr')
const { spawn } = require('child_process')

const buildEnv = require('../build/env')
const stepEnv = require('../step/env')
const { stepName } = require('../step/name')

const run = (step, { checkout }) => {
  return new Promise(async (resolve, reject) => {
    let env = {}
    env = Object.assign(await buildEnv({ checkout }), env)
    env = Object.assign(await stepEnv(step), env)

    debug('Running buildkite-agent bootstrap with ENV: %o', env)

    // Inherit the PATH that it was invoked with, so it picks up git, etc
    env.PATH = process.env.PATH

    const bootstrap = spawn('buildkite-agent', ['bootstrap'], {
      env,
      stdio: 'inherit'
    })

    bootstrap.on('close', (code) => {
      // We want it to fail the node process if any step fails
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`'${stepName(step)}' failed with exit code ${code}`))
      }
    })
  })
}

module.exports = run
