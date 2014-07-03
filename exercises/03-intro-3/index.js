var mouse        = require('mouse-position')()
var triangle     = require('a-big-triangle')
var throttle     = require('frame-debounce')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var compare      = require('gl-compare')
var createAxes   = require('gl-axes')
var createFBO    = require('gl-fbo')
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
var verifyFBO  = createFBO(gl, [512,512])

var testVectors = [
  [0,1],
  [1,0],
  [-1,0],
  [0,-1],
  [0.25,0.3],
  [-1,-1],
  [1,2],
  [0.4,8]
]

//Draw 3 arrows, format = 
//  weights
//  offset
var buffer = []
for(var i=0; i<3; ++i) {
  var x = [1e-6,1e-6,1e-6]
  x[i] = 1
  buffer.push(1e-6,1e-6,1e-6,1e-6)
  buffer.push(x[0],x[1],x[2],1e-6)
  buffer.push(x[0],x[1],x[2],1e-6)
  buffer.push(x[0],x[1],x[2], 0.1)
  buffer.push(x[0],x[1],x[2],1e-6)
  buffer.push(x[0],x[1],x[2], -0.1)
}
var vao = createVAO(gl, [{
  "buffer": createBuffer(gl, buffer),
  "size": 4
}])

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , dirname: process.env.dirname
  , compare: comparison
  , canvas: canvas
  , test: verify
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader({
    frag: 'void main() { gl_FragColor = vec4(1, 1, 1, 1); }'
  , vert: '\
precision mediump float;\
attribute vec4 vertexData;\
uniform vec2 aVector;\
uniform vec2 bVector;\n\
#pragma glslify: func = require(' + process.env.file_vectors_glsl + ')\n\
void main() {\
  vec2 base = vertexData.x * aVector +\
              vertexData.y * bVector +\
              vertexData.z * func(aVector, bVector);\
  float baseLen = length(base);\
  float offsetScale = vertexData.w;\
  vec2 headShift = offsetScale * normalize(vec2(-base.y, base.x)) - abs(offsetScale) * normalize(base);\
  gl_Position = vec4(base + headShift, 0.0, 1.0);\
}'
  , inline: true
})(gl)

var expectedShader = createShader({
    frag: './shaders/fragment.glsl'
  , vert: './shaders/vertex.glsl'
})(gl)

var verifyShader = createShader({
    frag: [
  'precision highp float;',
  '#pragma glslify: actualFunc=require(' + process.env.file_vectors_glsl + ')',
  '#pragma glslify: expectedFunc=require(./shaders/expected.glsl)',
  'uniform vec2 bVector;',
  'varying vec2 aVector;',
  'void main() {',
    'vec2 actual = actualFunc(aVector, bVector);',
    'vec2 expected = expectedFunc(aVector, bVector);',
    'if(distance(actual, expected) > 0.01) {',
      'gl_FragColor = vec4(1,1,1,1);',
    '} else {',
      'gl_FragColor = vec4(0,0,0,0);',
    '}',
  '}'].join('\n')
  , vert: [
  'attribute vec2 position;',
  'varying vec2 aVector;',
  'void main() {',
    'gl_Position = vec4(position,0,1);',
    'aVector = position;',
  '}'].join('\n')
  , inline: true
})(gl)

var aVector = [0,0]
var bVector = [0,0]

function render() {

  var theta = 0.0001 * now()
  aVector[0] = 0.5 * Math.cos(theta)
  aVector[1] = 0.5 * Math.sin(theta)

  bVector[0] = 2.0 * (mouse.x / canvas.width) - 1.0
  bVector[1] = 1.0 - 2.0 * (mouse.y / canvas.height)

  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  actualShader.bind()
  actualShader.uniforms.aVector = aVector
  actualShader.uniforms.bVector = bVector
  vao.bind()
  gl.lineWidth(4)
  vao.draw(gl.LINES, buffer.length / 4)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  expectedShader.bind()
  expectedShader.uniforms.aVector = aVector
  expectedShader.uniforms.bVector = bVector
  vao.bind()
  gl.lineWidth(4)
  vao.draw(gl.LINES, buffer.length / 4)
}

function verify(cb) {
  process.nextTick(function() {
    var buffer = new Uint8Array(512*512*4)
    verifyFBO.bind()
    verifyShader.bind()
    for(var i=0; i<testVectors.length; ++i) {
      verifyShader.uniforms.bVector = testVectors[i]
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      triangle(gl)
      gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, buffer)
      for(var j=0; j<buffer.length; ++j) {
        if(buffer[j]) {
          cb(null, null)
          return
        }
      }
    }
    cb(null, 'you got it!')
    return
  })
}