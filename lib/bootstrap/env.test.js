var t = require('tap')
var bootstrapEnv = require('./env')

bootstrapEnv({ command: 'ls' }, { checkout: false }).then(env => {
  t.same(env.BUILDKITE_AGENT_NAME, 'agent')
  t.same(env.BUILDKITE_BUILD_PATH, '/tmp/bksr/builds')
  t.same(env.BUILDKITE_PLUGINS_PATH, '/tmp/bksr/plugins')
  t.same(env.BUILDKITE_HOOKS_PATH, `${__dirname}/../../agent/hooks/local-build`)
  t.same(env.BUILDKITE_ORGANIZATION_SLUG, 'org')
  t.same(env.BUILDKITE_PIPELINE_PROVIDER, 'custom')
  t.same(env.BUILDKITE_BUILD_NUMBER, 42)
  t.same(env.BUILDKITE_JOB_ID, 42)
  t.same(env.BUILDKITE_COMMAND, 'ls')
  t.same(env.BUILDKITE_PLUGINS, '')
})

bootstrapEnv({ command: 'ls' }, { checkout: true }).then(env => {
  t.same(env.BUILDKITE_HOOKS_PATH, undefined)
})

bootstrapEnv({ commands: [ 'echo 1', 'echo 2' ] }, { checkout: false }).then(env => {
  t.same(env.BUILDKITE_COMMAND, 'echo 1\necho 2')
})

bootstrapEnv({ plugins: { 'docker-compose': { 'run': 'echo' } } }, { checkout: false }).then(env => {
  t.same(env.BUILDKITE_COMMAND, '')
  t.same(env.BUILDKITE_PLUGINS, '[{"github.com/buildkite-plugins/docker-compose-buildkite-plugin":{"run":"echo"}}]')
})

bootstrapEnv({ command: 'ls', plugins: { 'docker-compose': { 'run': 'echo' } } }, { checkout: false }).then(env => {
  t.same(env.BUILDKITE_COMMAND, 'ls')
  t.same(env.BUILDKITE_PLUGINS, '[{"github.com/buildkite-plugins/docker-compose-buildkite-plugin":{"run":"echo"}}]')
})
