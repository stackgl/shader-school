var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createAxes   = require('gl-axes')
var glm          = require('gl-matrix')
var createBuffer = require('gl-buffer')
var createVAO    = require('gl-vao')
var createShader = require('glslify')
var fs           = require('fs')
var now          = require('right-now')
var mat4         = glm.mat4

var container  = document.getElementById('container')
var canvas     = container.appendChild(document.createElement('canvas'))
var readme     = fs.readFileSync(__dirname + '/README.md', 'utf8')
var gl         = getContext(canvas, render)
var comparison = compare(gl, actual, expected)
var axes       = createAxes(gl, {
  bounds: [[-1,-1,-1], [1,1,1]],
  axesColors: [[1,1,1], [1,1,1], [1,1,1]],
  gridColor: [1,1,1],
  labels: [ "x", "f(x,y)", "y" ]
})

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , compare: comparison
  , canvas: canvas
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)


var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)


var camera

function render() {

  var projection = mat4.perspective(
    mat4.create(),
    Math.PI/4.0,
    canvas.width/canvas.height,
    0.0001,
    1000.0)

  var t = now() * 0.0001
  var view = mat4.lookAt(
    mat4.create(),
    [4*Math.cos(t), 4.5, 4*Math.sin(t)],
    [0,0,0],
    [0,1,0])

  camera = {
    view: view,
    projection: projection
  }

  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  axes.draw(camera)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  axes.draw(camera)
}
