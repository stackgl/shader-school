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


var vertexPositions = []
for(var i=0; i<128; ++i) {
  for(var j=0; j<128; ++j) {
    vertexPositions.push(i, j, 
                         i+1, j, 
                         i, j+1,

                         i, j+1, 
                         i+1, j, 
                         i+1, j+1)
  }
}

var vertexPBuffer = createBuffer(gl, new Float32Array(vertexPositions))
var vertexArray = createVAO(gl, [
{
  "buffer": vertexPBuffer,
  "size": 2
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
  , vert: './shaders/vertex.glsl'
})(gl)
actualShader.attributes.position.location = 0

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)
expectedShader.attributes.position.location = 0

var cameraParams = {
  projection: mat4.create(),
  view: mat4.create(),
  model: mat4.create(),
  theta: 0.0,
  frontColor: [1.0, 0.4313, 0.3411],
  backColor: [0.3451, 1.0, 0.5450]
}

function render() {

  var t = now() * 0.001
 
  mat4.perspective(
    cameraParams.projection,
    Math.PI/4.0,
    canvas.width/canvas.height,
    0.01,
    1000.0)

  mat4.lookAt(
    cameraParams.view,
    [3.0*(1.0-2.0 * (mouse.x / canvas.width)), 3.0*(2.0 * (mouse.y / canvas.height) - 1.0), 8.0 ],
    [0,0,0],
    [0,1,0])

  cameraParams.theta = t % (4.0*Math.PI)

  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  actualShader.bind()
  actualShader.uniforms = cameraParams
  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, vertexPositions.length/3)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  expectedShader.bind()
  expectedShader.uniforms = cameraParams
  vertexArray.bind()
  vertexArray.draw(gl.TRIANGLES, vertexPositions.length/3)
}