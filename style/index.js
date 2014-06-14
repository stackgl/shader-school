var auto    = require('autoprefixer')('last 2 versions')
var memoize = require('memoize-sync')
var rwnpm   = require('rework-npm')
var rework  = require('rework')
var fs      = require('fs')

module.exports = process.env.NODE_ENV === 'development'
  ? getCSS
  : memoize(getCSS, function(){})

function getCSS() {
  var css = fs.readFileSync(__dirname + '/index.css', 'utf8')

  css = rework(css)
    .use(rwnpm({ dir: __dirname }))
    .use(rework.ease())
    .use(rework.inline(__dirname + '/../assets'))
    .toString()

  css = auto.process(css).css

  return css
}
