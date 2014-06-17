var description = require('../lib/description')
var sidebar     = require('gl-compare-sidebar')
var fonts       = require('google-fonts')
var marked      = require('marked')
var fs          = require('fs')

module.exports = function(opts) {
  opts = opts || {}

  fonts.add({
    'Source Code Pro': [200, 600]
  })

  if (opts.compare) {
    var compare = sidebar(opts.compare)

    if (opts.description) {
      compare.content.innerHTML = marked(opts.description)
    }
  }

  // if (opts.description) document.body.appendChild(
  //   description(marked(opts.description))
  // )
}
