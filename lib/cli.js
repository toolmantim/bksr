const inquirer = require('inquirer')

const readPipeline = require('../lib/pipeline/read')
const runnableStep = require('../lib/step/runnable')
const runStep = require('../lib/step/run')
const { stepName, findStepWithName } = require('../lib/step/name')
const matchesBranchFilter = require('../lib/step/branch-filters')

const stepChoice = (step) => {
  if (runnableStep(step)) {
    return {
      name: stepName(step),
      value: step,
      short: stepName(step)
    }
  } else {
    return new inquirer.Separator()
  }
}

const promptForStep = (pipeline) => (
  inquirer.prompt([{
    type: 'list',
    choices: pipeline.steps.map(stepChoice),
    message: 'Choose a pipeline step to run',
    name: 'step'
  }]).then(i => i.step)
)

const cli = ({ pipeline: pipelinePath, step: stepNameArg, all, branch, checkout }) => (

  readPipeline(pipelinePath)
    .then(pipeline => {
      if (all && !branch) {
        return pipeline.steps.filter(runnableStep).filter((step) => !step.branches)
      } else if (branch) {
        return pipeline.steps.filter(runnableStep).filter((step) => matchesBranchFilter(step, branch))
      } else if (stepNameArg) {
        return [findStepWithName(pipeline, stepNameArg)]
      } else {
        return promptForStep(pipeline).then(s => [s])
      }
    })
    .then(async steps => {
      console.log(`Running ${steps.length} step${steps.length === 1 ? '' : 's'}${steps.length !== 0 && ':'}`)
      console.log(steps.map(stepName).map(s => '  - ' + s).join('\n'))
      // Run each of the steps in serial
      for (let step of steps) {
        console.log(`\nRunning step: '${stepName(step)}'`)
        await runStep(step, { checkout })
      }
    })
)

module.exports = cli
