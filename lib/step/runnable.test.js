var t = require('tap')
var isRunnableStep = require('./runnable')

t.equal(isRunnableStep({ command: 'ls' }), true)

// Wait steps
t.equal(isRunnableStep('wait'), false)
t.equal(isRunnableStep({ wait: { continue_on_failure: true } }), false)

// Trigger steps
t.equal(isRunnableStep({ trigger: 'slug' }), false)

// Block steps
t.equal(isRunnableStep({ block: 'Block prompt', prompt: 'Continue pipeline?' }), false)
