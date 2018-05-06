#!/usr/bin/env node

const inquirer = require('inquirer')

const readPipeline = require('../src/pipeline/read')
const stepDescription = require('../src/step/description')
const runnableStep = require('../src/step/runnable')
const runStep = require('../src/step/run')

const stepChoice = (step) => {
  if (runnableStep(step)) {
    return {
      name: stepDescription(step),
      value: step,
      short: stepDescription(step)
    }
  } else {
    return new inquirer.Separator()
  }
}

readPipeline()
  .then(pipeline => (
    inquirer.prompt([{
      type: 'list',
      choices: pipeline.steps.map(stepChoice),
      message: 'Choose a pipeline step to run',
      name: 'step'
    }])
  ))
  .then((i) => runStep(i.step))

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
