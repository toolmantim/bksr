var t = require('tap')
var { stepName, findStepWithName } = require('./name')

t.same(stepName({}), undefined)
t.same(stepName({ label: 'description' }), 'description')
t.same(stepName({ name: 'description' }), 'description')

t.same(stepName({ command: 'ls' }), 'ls')
t.same(stepName({ commands: ['ls1'] }), 'ls1')
t.same(stepName({ commands: ['ls1', 'ls2'] }), 'ls1 && ls2')

t.same(stepName({}), undefined)

t.same(findStepWithName({steps: [{ label: 'Foo' }]}, 'Foo'), { label: 'Foo' })
t.same(findStepWithName({steps: [{ label: 'Foo' }, { label: 'Bar' }]}, 'Foo'), { label: 'Foo' })
t.same(findStepWithName({steps: [{ label: 'Foo' }, { label: 'Bar' }]}, 'Bar'), { label: 'Bar' })

t.throws(() => { findStepWithName({steps: [{ label: 'Foo' }]}, 'Bar') })
