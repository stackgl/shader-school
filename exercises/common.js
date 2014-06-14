var description = require('../lib/description')
var diffui      = require('../lib/diff-ui')
var fonts       = require('google-fonts')
var marked      = require('marked')
var fs          = require('fs')

module.exports = function(opts) {
  opts = opts || {}

  fonts.add({
    'Source Code Pro': [200, 600]
  })

  if (opts.compare) diffui(opts.compare)
  if (opts.description) document.body.appendChild(
    description(marked(opts.description))
  )
}
