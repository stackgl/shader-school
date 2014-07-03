var exercises = require('../exercises.json')
var progress = require('../lib/progress')
var sidenote = require('sidenote')
var menu = require('browser-menu')({
    x: 0, y: 0
  , bg: process.browser ? '#61FF90' : 'green'
  , fg: process.browser ? '#34363B' : 'black'
})

var line = '---------------------------------------------'

menu.reset()
menu.write('<strong>SHADER SCHOOL</strong>\n')
menu.element.style.margin = '2em'

var lcat = null
var cats = []
var keys = Object.keys(exercises)
var rows = sidenote(keys.map(function(name, i) {
  var dir = exercises[name]
  var parts = name.match(/^(.*?)([A-Z][^\:]+\:)(.*?)$/)
  var category = cats[i] = parts[2].slice(0, -1)

  var newname = parts
    .slice(1, 2)
    .concat(parts.slice(3))
    .join('')
    .replace(/\s+/, ' ')

  exercises[newname] = exercises[name]

  return [ newname
    , progress.get(dir)
    ? '[COMPLETE]'
    : '          '
  ]
}), {
  distance: 10
}).map(function(row, i) {
  var cat = cats[i]

  if (lcat !== cat) {
    var line = '------------------------------------------'

    line = '- <span><span>' + cat + '</span></span> ' + line.slice(cat.length)
    menu.write(line + '\n')
    lcat = cat
  }

  return menu.add(row), row
})

menu.on('select', function(label) {
  var label = keys[rows.indexOf(label)]

  // TODO: use the exit command?
  if (!exercises[label]) return console.error(label)

  window.location = exercises[label]
})
