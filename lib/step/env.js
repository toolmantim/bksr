const debug = require('debug')('bksr')

const pluginsEnv = require('./plugins-env')

const stepEnv = async (step) => {
  debug(step)

  const env = {}

  // job/step specific envs

  env.BUILDKITE_ARTIFACT_PATHS = ''
  env.BUILDKITE_JOB_ID = 42
  env.BUILDKITE_COMMAND = step.command || (step.commands && step.commands.join('\n')) || ''
  env.BUILDKITE_SCRIPT_PATH = env.BUILDKITE_COMMAND
  env.BUILDKITE_PLUGINS = (step.plugins && pluginsEnv(step.plugins)) || ''
  env.BUILDKITE_LABEL = step.label || step.name || ''

  // todo: handle step envs

  return env
}

module.exports = stepEnv
