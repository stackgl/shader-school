var matchFBO     = require('../../lib/match-fbo')
var mouse        = require('mouse-position')()
var throttle     = require('frame-debounce')
var triangle     = require('a-big-triangle')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createBuffer = require('gl-buffer')
var ndarray      = require('ndarray')
var createVAO    = require('gl-vao')
var createFBO    = require('gl-fbo')
var createShader = require('glslify')
var fs           = require('fs')
var now          = require('right-now')
var glm          = require('gl-matrix')
var mat4         = glm.mat4

var SIZE       = 64
var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, render)
var comparison = compare(gl, expected, expected)
var particles  = new Float32Array(SIZE * SIZE * 2)

var i = 0
for (var x = 0; x < SIZE; x++)
for (var y = 0; y < SIZE; y++) {
  particles[i++] = x
  particles[i++] = y
}

particles = createVAO(gl, [{
  buffer: createBuffer(gl, particles)
  , size: 2
}])

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

var posdata = new Float32Array(SIZE * SIZE * 4)
for (var i = 0; i < posdata.length;) {
  posdata[i++] = Math.random()
  posdata[i++] = Math.random()
  posdata[i++] = Math.random()
  posdata[i++] = 1
}

var speeddata = new Float32Array(SIZE * SIZE * 4)
for (var i = 0; i < speeddata.length;) {
  speeddata[i++] = Math.random() * 0.001 - 0.0005
  speeddata[i++] = Math.random() * 0.001 - 0.0005
  speeddata[i++] = Math.random() * 0.001 - 0.0005
  speeddata[i++] = 1
}

var positions = {
    prev: createFBO(gl, [SIZE, SIZE], { float: true })
  , next: createFBO(gl, [SIZE, SIZE], { float: true })
}

var speeds    = {
    prev: createFBO(gl, [SIZE, SIZE], { float: true })
  , next: createFBO(gl, [SIZE, SIZE], { float: true })
}

positions.prev.color[0].setPixels(ndarray(posdata, [SIZE, SIZE, 4]))
positions.next.color[0].setPixels(ndarray(posdata, [SIZE, SIZE, 4]))
speeds.prev.color[0].setPixels(ndarray(speeddata, [SIZE, SIZE, 4]))
speeds.next.color[0].setPixels(ndarray(speeddata, [SIZE, SIZE, 4]))

var updateSpeed = createShader({
    frag: process.env.file_speed_glsl
  , vert: process.env.file_triangle_glsl
})(gl)
var updatePos   = createShader({
    frag: process.env.file_position_glsl
  , vert: process.env.file_triangle_glsl
})(gl)
var renderShader = createShader({
    frag: process.env.file_render_frag
  , vert: process.env.file_render_vert
})(gl)

function render() {
  var t = now() * 0.001
  comparison.run()
  comparison.render()
}

function expected(fbo) {
  speeds.next.bind()
  gl.viewport(0, 0, SIZE, SIZE)
  updateSpeed.bind()
  updateSpeed.uniforms.positions = positions.prev.color[0].bind(0)
  updateSpeed.uniforms.speeds    = speeds.prev.color[0].bind(1)
  triangle(gl)

  positions.next.bind()
  gl.viewport(0, 0, SIZE, SIZE)
  updatePos.bind()
  updatePos.uniforms.positions = positions.prev.color[0].bind(0)
  updatePos.uniforms.speeds    = speeds.prev.color[0].bind(1)
  triangle(gl)

  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.disable(gl.DEPTH_TEST)

  renderShader.bind()
  renderShader.uniforms.speeds    = speeds.next.color[0].bind(0)
  renderShader.uniforms.positions = positions.next.color[0].bind(1)
  renderShader.uniforms.screenSize = [canvas.width, canvas.height]

  ping(speeds)
  ping(positions)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE)
  particles.bind()
  particles.draw(gl.POINTS, SIZE * SIZE)
  particles.unbind()
  gl.disable(gl.BLEND)
}

function ping(pong) {
  var next = pong.next
  var prev = pong.prev
  pong.next = prev
  pong.prev = next
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.disable(gl.DEPTH_TEST)
}
