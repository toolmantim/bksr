// GitHub plugins need the 'github.com' added to them
const expandedName = (name) => {
  let match

  // 'official-plugin' and 'official-plugin#v2'
  match = name.match(/^([A-Za-z0-9-]+)(#.+)?$/)
  if (match) {
    return `github.com/buildkite-plugins/${match[1]}-buildkite-plugin${match[2]}`
  }

  // 'some-org/some-plugin' and 'some-org/some-plugin#v2'
  match = name.match(/^([A-Za-z0-9-]+\/[A-Za-z0-9-]+)(#.+)?$/)
  if (match) {
    return `github.com/${match[1]}-buildkite-plugin${match[2]}`
  }

  return name
}

// The bootstrap expects an array of plugins, but the pipeline is defined as
// an object. So we have to convert from:
//   {"plugin1#v1.0.0":{...}, "plugin2#v1.0.0":{...}}
// to:
//   [{"plugin1#v1.0.0":{...}}, {"plugin2#v1.0.0":{...}}]
//
// We also have to add the automatic github.com prefixes
const pluginsEnv = (plugins) => {
  const array = Object.entries(plugins).map(([ name, config ]) => {
    const p = {}
    p[expandedName(name)] = config
    return p
  })

  return JSON.stringify(array)
}

module.exports = pluginsEnv
