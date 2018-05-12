var t = require('tap')
var stepMatchesBranchFilter = require('./branch-filters')

t.equal(stepMatchesBranchFilter({}, 'master'), false)

t.equal(stepMatchesBranchFilter({ branches: 'foo' }, 'master'), false)
t.equal(stepMatchesBranchFilter({ branches: 'master' }, 'master'), true)

t.equal(stepMatchesBranchFilter({ branches: 'foo bar' }, 'master'), false)
t.equal(stepMatchesBranchFilter({ branches: 'foor bar master' }, 'master'), true)

t.equal(stepMatchesBranchFilter({ branches: 'pr/*' }, 'pr/123'), true)
t.equal(stepMatchesBranchFilter({ branches: '*/pr' }, '123/pr'), true)

t.equal(stepMatchesBranchFilter({ branches: 'pr/*' }, 'moo'), false)
t.equal(stepMatchesBranchFilter({ branches: 'pr/*' }, 'hellopr/123'), false)
t.equal(stepMatchesBranchFilter({ branches: '*/pr' }, 'pr/123hello'), false)

t.equal(stepMatchesBranchFilter({ branches: 'pr/*/pr' }, 'pr/123/pr'), false)
