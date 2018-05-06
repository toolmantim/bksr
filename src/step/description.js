const stepDescription = (s) =>
  s.label ||
    s.name ||
    s.command ||
    (s.commands && s.commands.join(' && '))

module.exports = stepDescription
