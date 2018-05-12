const stepName = (s) => (
  s.label ||
    s.name ||
    s.command ||
    (s.commands && s.commands.join(' && ')) ||
    undefined
)

const findStepWithName = (pipeline, name) => {
  const step = pipeline.steps
    .find(step => stepName(step) === name)

  if (!step) {
    throw new Error(`No step found named ${name}`)
  }

  return step
}

module.exports = {
  findStepWithName,
  stepName
}
