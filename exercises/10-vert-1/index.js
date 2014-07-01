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


var vertexData = [0, 0.5, -0.5, -0.5, 0.5, -0.5]
var vertexBuffer = createBuffer(gl, vertexData)
var vertexArray = createVAO(gl, [
  {
    "buffer": vertexBuffer,
    "size": 2
  }])

var actualShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: process.env.file_vertex_glsl
})(gl)

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)


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
  actualShader.uniforms.theta = theta
  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, 3)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)
  expectedShader.bind()
  expectedShader.uniforms.theta = theta
  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, 3)
}