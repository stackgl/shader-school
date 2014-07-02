var matchFBO     = require('../../lib/match-fbo')
var mouse        = require('mouse-position')()
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

var numPoints = 1024

var vertexPositions = new Float32Array(numPoints*3)
var vertexColors    = new Float32Array(numPoints*3)
var vertexSizes     = new Float32Array(numPoints)
var vertexFreqs     = new Float32Array(numPoints*3)
var vertexPhases    = new Float32Array(numPoints*3)

var colorArray = [
  [1,1,1],
  [0.3451, 1.0, 0.5450],
  [1.0, 0.4313, 0.3411],
  [1.0, 0.8862, 0.3725],
  [0.3804, 0.7647, 1.0]
]

var pointer = 0
for(var i=0; i<1024; ++i) {
  var c = colorArray[(Math.random()*colorArray.length)|0]
  vertexSizes[i] = 1.0 + Math.random()*32.0;
  for(var j=0; j<3; ++j) {
    vertexPhases[pointer] = Math.random()*2.0*Math.PI
    vertexFreqs[pointer] = Math.random() * 32.0
    vertexColors[pointer] = c[j]
    pointer += 1
  }
}

var vertexPBuffer = createBuffer(gl, vertexPositions)
var vertexCBuffer = createBuffer(gl, vertexColors)
var vertexSBuffer = createBuffer(gl, vertexSizes)
var vertexArray = createVAO(gl, [
{
  "buffer": vertexPBuffer,
  "size": 3
},
{
  "buffer": vertexCBuffer,
  "size": 3
},
{
  "buffer": vertexSBuffer,
  "size": 1
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

var actualShader = createShader({
    frag: process.env.file_fragment_glsl
  , vert: process.env.file_vertex_glsl
})(gl)

actualShader.attributes.position.location = 0
actualShader.attributes.color.location = 1
actualShader.attributes.size.location = 2

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

expectedShader.attributes.position.location = 0
expectedShader.attributes.color.location = 1
expectedShader.attributes.size.location = 1

var cameraParams = {
  projection: mat4.create(),
  view: mat4.create(),
  model: mat4.create()
}

function render() {

  var t = now() * 0.00001
  for(var i=0; i<3*numPoints; ++i) {
    vertexPositions[i] = Math.cos(t * vertexFreqs[i] + vertexPhases[i])
  }
  vertexPBuffer.update(vertexPositions)

  mat4.perspective(
    cameraParams.projection,
    Math.PI/4.0,
    canvas.width/canvas.height,
    0.01,
    1000.0)

  mat4.lookAt(
    cameraParams.view,
    [3.0*(1.0-2.0 * (mouse.x / canvas.width)), 3.0*(2.0 * (mouse.y / canvas.height) - 1.0), 3.0 ],
    [0,0,0],
    [0,1,0])

  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  actualShader.bind()
  actualShader.uniforms = cameraParams
  vertexArray.bind()
  vertexArray.draw(gl.POINTS, numPoints)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  expectedShader.bind()
  expectedShader.uniforms = cameraParams
  vertexArray.bind()
  vertexArray.draw(gl.POINTS, numPoints)
}