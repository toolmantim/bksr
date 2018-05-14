const debug = require('debug')('bksr')
const readFile = require('util').promisify(require('fs').readFile)
const yaml = require('js-yaml')
const getStdin = require('get-stdin')

const readPipeline = async (path) => {
  let pipelineYaml

  if (path === '' || path === '-') {
    pipelineYaml = await getStdin()
  } else {
    pipelineYaml = await readFile(path, 'utf8')
  }

  debug('Read pipeline YAML: %o', pipelineYaml)

  return yaml.safeLoad(pipelineYaml)
}

module.exports = readPipeline
