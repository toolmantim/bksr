const debug = require('debug')('bksr')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)
const pluginsEnv = require('./plugins-env')

// Returns the envs that `buildkite-agent bootstrap` requires
// For more info, see `buildkite-agent bootstrap --help`
const bootstrapEnv = async (step, { checkout }) => {
  debug(step)

  const env = {}

  const repo = process.cwd()
  const pipeline = path.basename(repo)
  const commit = (await exec('git rev-parse HEAD')).stdout.trim()
  const branch = (await exec(`git rev-parse --abbrev-ref HEAD`)).stdout.trim()

  // agent envs

  env.BUILDKITE_AGENT_NAME = 'agent'
  env.BUILDKITE_BUILD_PATH = '/tmp/bksr/builds'
  env.BUILDKITE_PLUGINS_PATH = '/tmp/bksr/plugins'

  if (!checkout) {
    env.BUILDKITE_HOOKS_PATH = `${__dirname}/../../agent/hooks/local-build`
  }

  // pipeline envs

  env.BUILDKITE_ORGANIZATION_SLUG = 'org'
  env.BUILDKITE_PIPELINE_SLUG = pipeline
  env.BUILDKITE_PIPELINE_PROVIDER = 'custom'

  // build envs

  env.BUILDKITE_BUILD_NUMBER = 42
  env.BUILDKITE_REPO = process.cwd()
  env.BUILDKITE_COMMIT = commit
  env.BUILDKITE_BRANCH = branch

  // job/step specific envs

  env.BUILDKITE_JOB_ID = 42
  env.BUILDKITE_COMMAND = step.command || (step.commands && step.commands.join('\n')) || ''

  env.BUILDKITE_PLUGINS = (step.plugins && pluginsEnv(step.plugins)) || ''

  // todo: handle step envs

  return env
}

module.exports = bootstrapEnv
