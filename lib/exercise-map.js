var exercises = require('../exercises.json')
var zfill     = require('zfill')

var titles = Object.keys(exercises)
var values = titles.map(function(key) {
  return exercises[key]
})

module.exports = values.reduce(function(map, name, i) {
  map[name] = zfill(i, 2) + '-' + name
  return map
}, {})
