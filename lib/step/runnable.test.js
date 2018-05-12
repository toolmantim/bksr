var t = require('tap')
var isRunnableStep = require('./runnable')

t.equal(isRunnableStep('wait'), false)
t.equal(isRunnableStep({ wait: { continue_on_failure: true } }), false)

t.equal(isRunnableStep({ trigger: 'slug' }), false)

t.equal(isRunnableStep({ command: 'ls' }), true)
