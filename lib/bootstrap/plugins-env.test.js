var t = require('tap')
var pluginsEnv = require('./plugins-env')

t.same(
  pluginsEnv({ 'detect-clowns': null }),
  '[{"github.com/buildkite-plugins/detect-clowns-buildkite-plugin":null}]'
)

t.same(
  pluginsEnv({ 'detect-clowns': [null] }),
  '[{"github.com/buildkite-plugins/detect-clowns-buildkite-plugin":null}]'
)

t.same(
  pluginsEnv({ 'docker-compose': { 'run': 'echo' } }),
  '[{"github.com/buildkite-plugins/docker-compose-buildkite-plugin":{"run":"echo"}}]'
)

t.same(
  pluginsEnv({ 'my-org/docker-compose': { 'run': 'echo' } }),
  '[{"github.com/my-org/docker-compose-buildkite-plugin":{"run":"echo"}}]'
)

t.same(
  pluginsEnv({ 'docker-compose#v1.0.0': { 'run': 'echo' } }),
  '[{"github.com/buildkite-plugins/docker-compose-buildkite-plugin#v1.0.0":{"run":"echo"}}]'
)

t.same(
  pluginsEnv({ 'my-org/docker-compose#v1.0.0': { 'run': 'echo' } }),
  '[{"github.com/my-org/docker-compose-buildkite-plugin#v1.0.0":{"run":"echo"}}]'
)

t.same(
  pluginsEnv({ 'git@myserver/repo.git': { 'run': 'echo' } }),
  '[{"git@myserver/repo.git":{"run":"echo"}}]'
)

t.same(
  pluginsEnv({ 'git@myserver/repo.git#v123': { 'run': 'echo' } }),
  '[{"git@myserver/repo.git#v123":{"run":"echo"}}]'
)
