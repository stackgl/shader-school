var matchFBO     = require('../../lib/match-fbo')
var conway       = require('conway-hart')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createBuffer = require('gl-buffer')
var createVAO    = require('gl-vao')
var createShader = require('glslify')
var fs           = require('fs')
var now          = require('right-now')
var glm          = require('gl-matrix')
var mat4         = glm.mat4

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

//Construct a test polytope
var polytope = conway('I')

var vertexData = []
for(var i=0; i<polytope.cells.length; ++i) {
  var loop = polytope.cells[i]
  for(var j=0; j<loop.length; ++j) {
    vertexData.push.apply(vertexData, polytope.positions[loop[j]])
    vertexData.push.apply(vertexData, polytope.positions[loop[(j+1)%loop.length]])
  }
}

var vertexBuffer = createBuffer(gl, vertexData)
var vertexArray = createVAO(gl, [
  {
    "buffer": vertexBuffer,
    "size": 3
  }])

var actualShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: process.env.file_transforms_glsl
})(gl)

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)


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

  var model = mat4.create()
  mat4.rotateX(model, model, t * 2.9 + 0.1)

  return {
    view: view,
    projection: projection,
    model: model
  }
}

var camera
function render() {
  camera = getCamera()
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)

  actualShader.bind()
  actualShader.uniforms = camera
  
  vertexArray.bind()
  vertexArray.draw(gl.LINES, vertexData.length / 3)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT)

  expectedShader.bind()
  expectedShader.uniforms = camera

  vertexArray.bind()
  vertexArray.draw(gl.LINES, vertexData.length / 3)
}