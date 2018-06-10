const os = require('os')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)

// Returns the envs that `buildkite-agent bootstrap` requires
// For more info, see `buildkite-agent bootstrap --help`
const buildEnv = async ({ checkout }) => {
  const env = {}

  const repo = process.cwd()
  const pipeline = path.basename(repo)
  const commit = (await exec('git rev-parse HEAD')).stdout.trim()
  const branch = (await exec(`git rev-parse --abbrev-ref HEAD`)).stdout.trim()

  // agent envs

  env.BUILDKITE_AGENT_NAME = 'agent'
  env.BUILDKITE_BUILD_PATH = path.join(os.homedir(), '.bksr', 'builds')
  env.BUILDKITE_PLUGINS_PATH = path.join(os.homedir(), '.bksr', 'plugins')

  if (!checkout) {
    env.BUILDKITE_HOOKS_PATH = `${__dirname}/../../agent/hooks/local-build`
  }

  // standard envs
  env.BUILDKITE = 'true'
  env.CI = 'true'

  // pipeline envs

  env.BUILDKITE_ORGANIZATION_SLUG = 'org'
  env.BUILDKITE_PIPELINE_SLUG = pipeline
  env.BUILDKITE_PIPELINE_PROVIDER = 'custom'
  env.BUILDKITE_PIPELINE_DEFAULT_BRANCH = 'master'

  // build envs

  env.BUILDKITE_BUILD_NUMBER = 42
  env.BUILDKITE_REPO = process.cwd()
  env.BUILDKITE_COMMIT = commit
  env.BUILDKITE_BRANCH = branch
  env.BUILDKITE_BUILD_CREATOR = 'Admiral Hopper'
  env.BUILDKITE_BUILD_CREATOR_EMAIL = 'grace@hopper.com'
  env.BUILDKITE_BUILD_ID = '123'
  env.BUILDKITE_BUILD_URL = `https://bksr.localhost/${env.BUILDKITE_ORGANIZATION_SLUG}/${env.BUILDKITE_PIPELINE_SLUG}/builds/${env.BUILDKITE_BUILD_NUMBER}`
  env.BUILDKITE_PULL_REQUEST = 'false'
  env.BUILDKITE_PULL_REQUEST_BASE_BRANCH = ''
  env.BUILDKITE_PULL_REQUEST_REPO = ''
  env.BUILDKITE_REBUILT_FROM_BUILD_ID = ''
  env.BUILDKITE_REBUILT_FROM_BUILD_NUMBER = ''
  env.BUILDKITE_RETRY_COUNT = '0'
  env.BUILDKITE_SOURCE = 'ui'
  env.BUILDKITE_TAG = ''
  env.BUILDKITE_TIMEOUT = 'false'
  env.BUILDKITE_TRIGGERED_FROM_BUILD_ID = ''

  return env
}

module.exports = buildEnv
