const debug = require('debug')('bksr')
const readFile = require('util').promisify(require('fs').readFile)
const yaml = require('js-yaml')

const readPipeline = async () => {
  const pipelinePath = '.buildkite/pipeline.yml'
  const pipelineYaml = await readFile(pipelinePath, 'utf8')
  debug('Read pipeline YAML: %o', pipelineYaml)
  return yaml.safeLoad(pipelineYaml)
}

module.exports = readPipeline
