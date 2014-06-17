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

var count = 0
var coords = []
for(var i=0; i<256; ++i) {
  for(var j=0; j<256; ++j) {
    coords.push(
      i, j,
      i+1, j,
      i, j+1,
      i+1, j+1,
      i, j+1,
      i+1, j)
    count += 6
  }
}

var buffer = createBuffer(gl, new Float32Array(coords))
var vao = createVAO(gl, [{
  "buffer": buffer,
  "size": 2
}])

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , compare: comparison
  , canvas: canvas
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader({
  vertex: "attribute vec2 uv;\
uniform mat4 view;\
uniform mat4 projection;\
varying float value;\
float func(float x, float y) {\
  return max(x, y);\
}\
void main() {\
  vec2 coord = (uv / 128.0) - 1.0;\
  float f = func(coord.x, coord.y);\
  gl_Position = projection * view * vec4(coord.x, f, coord.y, 1.0);\
  value = f;\
}",
  fragment: "varying highp float value;\
void main() {\
  gl_FragColor = vec4(value, value, value, 1.0);\
}",
  inline: true
})(gl)


var expectedShader = createShader({
    frag: './shaders/expected.frag'
  , vert: './shaders/expected.vert'
})(gl)

function render() {
  comparison.run()
  comparison.render()
}

function getCamera() {
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

  return {
    view: view,
    projection: projection
  }
}

function actual(fbo) {
  var camera = getCamera()
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  axes.draw(camera)

  actualShader.bind()
  actualShader.uniforms = camera
  
  vao.bind()
  vao.draw(gl.TRIANGLES, count)
}

function expected(fbo) {
  var camera = getCamera()
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  axes.draw(camera)

  expectedShader.bind()
  expectedShader.uniforms = camera

  vao.bind()
  vao.draw(gl.TRIANGLES, count)
}
