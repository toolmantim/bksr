const debug = require('debug')('bksr')
const readFile = require('util').promisify(require('fs').readFile)
const yaml = require('js-yaml')

const readPipeline = async (path) => {
  const pipelineYaml = await readFile(path, 'utf8')
  debug('Read pipeline YAML: %o', pipelineYaml)
  return yaml.safeLoad(pipelineYaml)
}

module.exports = readPipeline
