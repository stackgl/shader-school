var matchFBO     = require('../../lib/match-fbo')
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createShader = require('glslify')
var fs           = require('fs')
var now          = require('right-now')

var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, render)
var comparison = compare(gl, actual, expected)

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , compare: comparison
  , canvas: canvas
  , dirname: process.env.dirname
  , test: matchFBO(comparison, 0.99)
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader({
    frag: process.env.file_fragment_glsl
  , vert: './shaders/vertex.glsl'
})(gl)

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

var clearColor = [0,0,0,0]

function render() {
  var t = 0.0001 * now()
  clearColor[0] = 0.5 + 0.5 * Math.cos(t)
  clearColor[1] = 0.5 + 0.5 * Math.cos(2.3*t + 1.8)
  clearColor[2] = 0.5 + 0.5 * Math.cos(0.7*t + 3)
  clearColor[3] = 1.0

  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [512, 512]
  fbo.bind()
  gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3])
  gl.clear(gl.COLOR_BUFFER_BIT)
  actualShader.bind()
  triangle(gl)
}

function expected(fbo) {
  fbo.shape = [512, 512]
  fbo.bind()
  gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3])
  gl.clear(gl.COLOR_BUFFER_BIT)
  expectedShader.bind()
  triangle(gl)
}