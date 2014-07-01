var matchFBO     = require('../../lib/match-fbo')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createBuffer = require('gl-buffer')
var createVAO    = require('gl-vao')
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
  , test: matchFBO(comparison, 0.99)
  , dirname: process.env.dirname
})

window.addEventListener('resize', fit(canvas), false)


var vertexBuffer = createBuffer(gl, [0, 0.5, 0, 1, -0.5, -0.5, 0, 1, 0.5, -0.5, 0, 1])
var colorBuffer = createBuffer(gl, [1,0,0,0,1,0,0,0,1])
var vertexArray = createVAO(gl, [
  {
    "buffer": vertexBuffer,
    "size": 4
  },
  {
    "buffer": colorBuffer,
    "size": 3
  }
  ])

var actualShader = createShader({
    frag: process.env.file_fragment_glsl
  , vert: process.env.file_vertex_glsl
})(gl)

actualShader.attributes.position.location = 0
actualShader.attributes.color.location = 1

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

expectedShader.attributes.position.location = 0
expectedShader.attributes.color.location = 1

var theta = 0.0

function render() {
  theta = 0.0001 * now()
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)
  actualShader.bind()
  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, 3)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)
  expectedShader.bind()
  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, 3)
}