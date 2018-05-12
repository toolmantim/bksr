var t = require('tap')
var path = require('path')
var read = require('./read')

read(path.join(__dirname, '../../test/pipeline.yml')).then(p => {
  t.same(p, { steps: [ { command: 'ls' } ] })
})

read(path.join(__dirname, '../../test/pipeline.json')).then(p => {
  t.same(p, { steps: [ { command: 'ls' } ] })
})
