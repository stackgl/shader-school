var exercises = require('../exercises.json')
var progress = require('../lib/progress')
var sidenote = require('sidenote')
var menu = require('browser-menu')({
    x: 2, y: 2
  , bg: process.browser ? '#61FF90' : 'green'
  , fg: process.browser ? '#34363B' : 'black'
})

menu.reset()
menu.write('SHADER SCHOOL\n')
menu.write('------------------------------------------------------\n')

var keys = Object.keys(exercises)
var rows = sidenote(keys.map(function(name, i) {
  var dir = exercises[name]

  return [ name
    , progress.get(dir)
    ? '[COMPLETE]'
    : '          '
  ]
}), {
  distance: 10
}).map(function(row) {
  return menu.add(row), row
})

menu.write('------------------------------------------------------\n')
menu.add('» EXIT')

menu.on('select', function(label) {
  var label = keys[rows.indexOf(label)]

  // TODO: use the exit command?
  if (!exercises[label]) return console.error(label)

  window.location = exercises[label]
})
