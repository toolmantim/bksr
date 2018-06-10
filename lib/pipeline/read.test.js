var t = require('tap')
var path = require('path')
var read = require('./read')

read({ path: path.join(__dirname, '../../test/pipeline.yml'), checkout: false }).then(p => {
  t.same(p, { steps: [ { command: 'ls' } ] })
})

read({ path: path.join(__dirname, '../../test/pipeline.json'), checkout: false }).then(p => {
  t.same(p, { steps: [ { command: 'ls' } ] })
})
