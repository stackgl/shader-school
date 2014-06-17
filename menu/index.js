var exercises = require('../exercises.json')
var menu = require('browser-menu')({
    x: 2, y: 2
  , bg: process.browser ? '#61FF90' : 'green'
  , fg: process.browser ? '#34363B' : 'black'
})

menu.reset()
menu.write('GLSLIFY WORKSHOP\n')
menu.write('------------------------------------------------------\n')
Object.keys(exercises).forEach(function(name) {
  menu.add(name)
})
menu.write('------------------------------------------------------\n')
menu.add('» EXIT')

menu.on('select', function(label) {
  // TODO: use the exit command?
  if (!exercises[label]) return console.error(label)

  window.location = exercises[label]
})
