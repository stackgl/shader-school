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

//Draw 3 arrows, format = 
//  weights
//  offset
var buffer = [
  1e-6, 1e-6, 1e-6, 1e-6,
  1, 1e-6, 1, 1e-6,

  1e-6, 1e-6, 1e-6, 1e-6,
  1e-6, 1, 1, 1e-6,

  1, 1e-6, 1, 1e-6,
  1e-6, 1, 1, 1e-6,

  1e-6, 1, 0.1, -0.1,
  1e-6, 1, 0.1, 1e-6,

  1, 1e-6, 0.1, 0.1,
  1, 1e-6, 0.1, 1e-6
]

var vao = createVAO(gl, [{
  "buffer": createBuffer(gl, buffer),
  "size": 4
}])

comparison.mode = 'slide'
comparison.amount = 0.5

require('../common')({
    description: readme
  , compare: comparison
  , dirname: process.env.dirname
  , canvas: canvas
  , test: verify
})

window.addEventListener('resize', fit(canvas), false)

var actualShader = createShader({
    frag: 'void main() { gl_FragColor = vec4(1, 1, 1, 1); }'
  , vert: '\
precision mediump float;\
attribute vec4 vertexData;\
uniform highp float angle;\n\
#pragma glslify: sides=require('+process.env.file_sides_glsl+')\n\
void main() {\
  float op=0.5, adj=0.5;\
  sides(1.5, angle, op, adj);\
  vec2 aVector = vec2(0, op);\
  vec2 bVector = vec2(adj, 0);\
  vec2 direction = vertexData.x * aVector + vertexData.y * bVector;\
  vec2 shift = vertexData.w * normalize(vec2(-direction.y, direction.x)) - vertexData.z * normalize(direction);\
  if(vertexData.w + vertexData.z > 0.5) {\
    shift *= length(direction);\
  } else {\
    shift.x = -min(0.8*abs(adj), abs(shift.x));\
    shift.y = -min(0.8*abs(op), abs(shift.y));\
  }\
  gl_Position = vec4(vec2(-0.5, -0.5) - shift, 0.0, 1.0);\
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
  '#pragma glslify: actualFunc=require(' + process.env.file_sides_glsl + ')',
  '#pragma glslify: expectedFunc=require(./shaders/expected.glsl)',
  'varying float theta;',
  'varying float radius;',
  'void main() {',
    'float op_actual=0.0, adj_actual=0.0;',
    'actualFunc(radius, theta, op_actual, adj_actual);',
    'float op_expect=0.0, adj_expect=0.0;',
    'expectedFunc(radius, theta, op_expect, adj_expect);',
    'if(abs(op_actual - op_expect) > 0.01 || abs(adj_actual - adj_expect) > 0.01) {',
      'gl_FragColor = vec4(1,1,1,1);',
    '} else {',
      'gl_FragColor = vec4(0,0,0,0);',
    '}',
  '}'].join('\n')
  , vert: [
  'attribute vec2 position;',
  'varying float theta;',
  'varying float radius;',
  'void main() {',
    'theta=45.0*(position.x+1.0);',
    'radius=position.y+1.5;',
    'gl_Position = vec4(position,0,1);',
  '}'].join('\n')
  , inline: true
})(gl)

var angle

function render() {
  angle = 45.0 * Math.cos(0.001 * now()) + 45.0;
  comparison.run()
  comparison.render()
}

function actual(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  actualShader.bind()
  actualShader.uniforms.angle = angle
  vao.bind()
  gl.lineWidth(4)
  vao.draw(gl.LINES, buffer.length / 4)
}

function expected(fbo) {
  fbo.shape = [canvas.height, canvas.width]
  fbo.bind()
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  expectedShader.bind()
  expectedShader.uniforms.angle = angle;
  vao.bind()
  gl.lineWidth(4)
  vao.draw(gl.LINES, buffer.length / 4)
}

function verify(cb) {
  process.nextTick(function() {
    var buffer = new Uint8Array(512*512*4)
    verifyFBO.bind()
    verifyShader.bind()
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    triangle(gl)
    gl.readPixels(0, 0, 512, 512, gl.RGBA, gl.UNSIGNED_BYTE, buffer)
    for(var j=0; j<buffer.length; ++j) {
      if(buffer[j]) {
        cb(null, null)
        return
      }
    }
    cb(null, 'you got it!')
    return
  })
}