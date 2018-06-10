const debug = require('debug')('bksr')
const { spawn } = require('child_process')
const compareVersions = require('compare-versions')

// TODO: Replace with a version that includes:
// https://github.com/buildkite/agent/pull/781
const minimumBuildkiteAgentVersion = '3.2.0'

const checkForBuildkiteAgent = () => {
  return new Promise(async (resolve, reject) => {
    const agentVersion = spawn('buildkite-agent', ['--version'])

    const stdout = []
    agentVersion.stdout.on('data', (data) => {
      stdout.push(data)
    })

    const stderr = []
    agentVersion.stderr.on('data', (data) => {
      stderr.push(data)
    })

    agentVersion.on('close', (code) => {
      if (code === 0) {
        const versionString = String(Buffer.concat(stdout))
        const match = versionString.match(/version (.*),/)
        const version = match && match[1]
        if (version) {
          debug(`buildkite-agent version: ${version}`)
          debug(`${compareVersions(version, minimumBuildkiteAgentVersion)}`)
          if (compareVersions(version, minimumBuildkiteAgentVersion) < 0) {
            reject(new Error(`Only buildkite-agent version ${minimumBuildkiteAgentVersion} and above is supported. Please update your buildkite-agent version from ${version}`))
          } else {
            resolve()
          }
        } else {
          reject(new Error(`Unknown 'buildkite-agent --version' string: ${versionString}`))
        }
      } else {
        reject(new Error(String(Buffer.concat(stderr))))
      }
    })

    agentVersion.on('error', (err) => {
      if (err.code === 'ENOENT') {
        reject(new Error(`No buildkite-agent found in $PATH (${process.env.PATH}). Is Buildkite Agent installed? https://buildkite.com/docs/agent/installation`))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = checkForBuildkiteAgent
