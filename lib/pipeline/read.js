const debug = require('debug')('bksr')
const readFile = require('util').promisify(require('fs').readFile)
const { spawn } = require('child_process')
const getStdin = require('get-stdin')

const buildEnv = require('../build/env')

const readPipeline = ({ path, checkout }) => {
  return new Promise(async (resolve, reject) => {
    let pipelineYaml

    if (path === '' || path === '-') {
      pipelineYaml = await getStdin()
    } else {
      pipelineYaml = await readFile(path, 'utf8')
    }

    debug('Read pipeline YAML: %o', pipelineYaml)

    const pipelineUpload = spawn('buildkite-agent', ['pipeline', 'upload', '--dry-run'], {
      env: Object.assign(await buildEnv({ checkout }), { PATH: process.env.PATH })
    })

    pipelineUpload.stdin.setEncoding('utf8')
    pipelineUpload.stdin.write(pipelineYaml)
    pipelineUpload.stdin.end()

    const pipelineStdout = []
    pipelineUpload.stdout.on('data', (data) => {
      pipelineStdout.push(data)
    })

    const pipelineStderr = []
    pipelineUpload.stderr.on('data', (data) => {
      pipelineStderr.push(data)
    })

    pipelineUpload.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(Buffer.concat(pipelineStdout)))
      } else {
        // Only output stderr if there's a problem, because for success it
        // includes an 'INFO' output line that's just noisy. And there's no
        // command line argument to supress it.
        if (Buffer.isBuffer(pipelineStdout[0])) {
          console.log(String(Buffer.concat(pipelineStdout)))
        }
        if (Buffer.isBuffer(pipelineStderr[0])) {
          console.log(String(Buffer.concat(pipelineStderr)))
        }
        reject(new Error(`buildkite-agent pipeline upload --dry-run failed. Is your buildkite-agent up-to-date?`))
      }
    })
  })
}

module.exports = readPipeline
