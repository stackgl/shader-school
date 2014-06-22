var exercises = require('../exercises.json')
var progress = require('../lib/progress')
var menu = require('browser-menu')({
    x: 2, y: 2
  , bg: process.browser ? '#61FF90' : 'green'
  , fg: process.browser ? '#34363B' : 'black'
})

menu.reset()
menu.write('GLSLIFY WORKSHOP\n')
menu.write('------------------------------------------------------\n')
Object.keys(exercises).forEach(function(name, i) {
  var dir = exercises[name]

  if (progress.get(dir)) {
    name = name.replace('»', '✓')
  }

  menu.add(name)
})
menu.write('------------------------------------------------------\n')
menu.add('» EXIT')

menu.on('select', function(label) {
  label = '»' + label.slice(1)

  // TODO: use the exit command?
  if (!exercises[label]) return console.error(label)

  window.location = exercises[label]
})
